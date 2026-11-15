import { useEffect, useRef } from 'react'
import { markBackgroundReady } from '../../lib/intro'
import { useReducedMotion } from '../../lib/motion'

/**
 * GridBackground — the animated perspective grid behind the whole site.
 *
 * Same look as the original React Bits "GridScan", but drawn with ~200 lines of plain WebGL
 * instead of three.js + postprocessing. That removes ~580 KB of JavaScript and — because the
 * shader is compiled off the main thread where the browser allows it — the stutter the old
 * version caused during the intro.
 *
 * Performance guards: device-pixel-ratio capped, ~30 fps on touch devices, paused while the
 * tab is hidden, one static frame when the visitor has switched animations off, and it
 * recovers from a lost WebGL context.
 */

const CONFIG = {
  linesColor: '#2A2B2F',
  scanColor: '#a0a0a0',
  lineThickness: 1,
  gridScale: 0.1,
  lineJitter: 0.1,
  scanOpacity: 0.25,
  scanGlow: 0.5,
  scanSoftness: 2,
  scanPhaseTaper: 0.49,
  scanDuration: 2,
  scanDelay: 2,
  noise: 0.01,
  halo: 0.6,
  gain: 1.0,
  // pointer response (how far the grid leans toward the cursor, and how quickly)
  skew: 0.137,
  skewYBoost: 1.42,
  smoothTime: 0.27,
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// The grid is a box seen from the inside: four planes (floor/ceiling at y=±0.2, walls at
// x=±0.5), a ray per pixel, anti-aliased grid lines, and a soft "scan" band sweeping in depth.
const FRAG = `
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uLineThickness;
uniform float uGridScale;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
uniform float uNoise;
uniform float uHalo;
uniform float uGain;
varying vec2 vUv;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float gridLines(vec2 uv, float halfPx, out vec2 a, out vec2 w){
  vec2 f = fract(uv);
  a = min(f, 1.0 - f);
  w = fwidth(uv);
  vec2 t = halfPx * w;
  vec2 l = 1.0 - smoothstep(t, t + w, a);
  return max(l.x, l.y);
}

void main(){
  vec2 fragCoord = vUv * iResolution;
  vec2 p = (2.0 * fragCoord - iResolution) / iResolution.y;

  vec3 rd = normalize(vec3(p, 2.0));
  vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
  rd.xy += skew * rd.z;

  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
  vec2 gridUV = vec2(0.0);
  float hitIsY = 1.0;

  for (int i = 0; i < 4; i++) {
    float isY = float(i < 2);
    float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
    float den = isY * rd.y + (1.0 - isY) * rd.x;
    float t = pos / den;
    vec3 h = rd * t;
    float depthBoost = smoothstep(0.0, 3.0, h.z);
    h.xy += skew * 0.15 * depthBoost;
    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
  }

  vec3 hit = rd * minT;
  float dist = length(hit);
  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  float halfPx = max(0.0, uLineThickness) * 0.5;

  // primary grid on the plane that was hit
  gridUV += vec2(sin(gridUV.y * 2.7 + iTime * 1.8), cos(gridUV.x * 2.3 - iTime * 1.6)) * (0.15 * jitterAmt);
  vec2 a; vec2 w;
  float primaryMask = gridLines(gridUV, halfPx, a, w);

  // second grid that only shows near the box edges (gives the corners their depth)
  vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
  gridUV2 += vec2(cos(gridUV2.y * 2.1 - iTime * 1.4), sin(gridUV2.x * 2.5 + iTime * 1.7)) * (0.15 * jitterAmt);
  vec2 a2; vec2 w2;
  float altMask = gridLines(gridUV2, halfPx, a2, w2);
  float edgeDistX = min(abs(hit.x + 0.5), abs(hit.x - 0.5));
  float edgeDistY = min(abs(hit.y + 0.2), abs(hit.y - 0.2));
  float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
  altMask *= 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);

  float lineMask = max(primaryMask, altMask);
  float fade = exp(-dist * 2.0);

  // scan band: travels into the distance and back (ping-pong), fading in and out at the ends
  float dur = max(0.05, uScanDuration);
  float del = max(0.0, uScanDelay);
  float sigma = max(0.001, 0.18 * max(0.1, uScanGlow) * uScanSoftness);
  float sigmaA = sigma * 2.0;
  float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
  float phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
  float dz = abs(hit.z - phase * 2.0);
  float taper = clamp(uPhaseTaper, 0.0, 0.49);
  float phaseWindow = smoother01(0.0, taper, phase) * (1.0 - smoother01(1.0 - taper, 1.0, phase));
  float scanOpacity = clamp(uScanOpacity, 0.0, 1.0);
  float pulse = exp(-0.5 * (dz * dz) / (sigma * sigma)) * phaseWindow * scanOpacity;
  float aura = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA)) * 0.25 * phaseWindow * scanOpacity;

  vec3 color = uLinesColor * lineMask * fade + uScanColor * (pulse + aura);
  float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898, 78.233))) * 43758.5453123);
  color += (n - 0.5) * uNoise;
  color = clamp(color, 0.0, 1.0);

  float alpha = clamp(max(lineMask, pulse), 0.0, 1.0);
  vec2 g = 1.0 - smoothstep(halfPx * w * 2.0, halfPx * w * 2.0 + w * 2.0, a);
  alpha = max(alpha, max(g.x, g.y) * fade * clamp(uHalo, 0.0, 1.0));

  // Premultiplied output, deliberately left in linear values (no sRGB encode): that is what
  // the original three.js version produced, and it is what makes the lines read as subtle
  // dark grooves slightly darker than the page with a faint haze around them.
  gl_FragColor = vec4(color * alpha * uGain, alpha);
}
`

const hexToLinear = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
}

// Critically damped spring (same response curve the original used for the pointer follow)
const smoothDamp = (current, target, vel, smoothTime, dt) => {
  const omega = 2 / Math.max(0.0001, smoothTime)
  const x = omega * dt
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = current - target
  const temp = (vel.v + omega * change) * dt
  vel.v = (vel.v - omega * temp) * exp
  let out = target + (change + temp) * exp
  if (target - current > 0 === out > target) {
    out = target
    vel.v = 0
  }
  return out
}

function createRenderer(canvas, { onReady }) {
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const lowEnd = coarse || (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
  const attrs = { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: true, powerPreference: 'high-performance' }

  let gl = canvas.getContext('webgl2', attrs)
  const isGL2 = !!gl
  if (!gl) gl = canvas.getContext('webgl', attrs)
  if (!gl) return null
  if (!isGL2 && !gl.getExtension('OES_standard_derivatives')) return null

  // Extensions are invalidated by a context loss, so setup() (re)acquires them every time
  let parallel = null
  const highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0
  const vertSrc = (isGL2 ? '#version 300 es\n#define attribute in\n#define varying out\n' : '') + VERT
  const fragSrc =
    (isGL2 ? '#version 300 es\n' : '#extension GL_OES_standard_derivatives : enable\n') +
    `precision ${highp ? 'highp' : 'mediump'} float;\n` +
    (isGL2 ? '#define varying in\nout vec4 fragOut;\n#define gl_FragColor fragOut\n' : '') +
    FRAG

  let program = null
  let uniforms = {}
  let ready = false
  let disposed = false
  let staticMode = false
  let raf = 0
  let pollRaf = 0
  let last = 0
  let acc = 0
  const frameInterval = coarse ? 1 / 30 : 0
  const look = { x: 0, y: 0, tx: 0, ty: 0, vx: { v: 0 }, vy: { v: 0 } }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1 : 1.25)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    gl.viewport(0, 0, w, h)
  }

  const draw = (timeSec) => {
    if (!ready || gl.isContextLost()) return
    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height)
    gl.uniform1f(uniforms.iTime, timeSec)
    gl.uniform2f(uniforms.uSkew, look.x * CONFIG.skew, -look.y * CONFIG.skewYBoost * CONFIG.skew)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.max(0, Math.min(0.1, (now - last) / 1000))
    last = now
    acc += dt
    if (acc < frameInterval) return
    const step = acc
    acc = 0
    look.x = smoothDamp(look.x, look.tx, look.vx, CONFIG.smoothTime, step)
    look.y = smoothDamp(look.y, look.ty, look.vy, CONFIG.smoothTime, step)
    draw(now / 1000)
  }

  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }
  const start = () => {
    if (raf || !ready || disposed || document.hidden) return
    if (staticMode) {
      look.x = look.y = 0
      draw(1.5)
      return
    }
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  const finishSetup = () => {
    if (disposed) return
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (import.meta.env.DEV) console.warn('GridBackground: shader failed to link', gl.getProgramInfoLog(program))
      onReady(false)
      return
    }
    gl.useProgram(program)
    const names = ['iResolution', 'iTime', 'uSkew', 'uLinesColor', 'uScanColor', 'uLineThickness', 'uGridScale', 'uLineJitter',
      'uScanOpacity', 'uScanGlow', 'uScanSoftness', 'uPhaseTaper', 'uScanDuration', 'uScanDelay', 'uNoise', 'uHalo', 'uGain']
    uniforms = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(program, n)]))
    gl.uniform3fv(uniforms.uLinesColor, hexToLinear(CONFIG.linesColor))
    gl.uniform3fv(uniforms.uScanColor, hexToLinear(CONFIG.scanColor))
    gl.uniform1f(uniforms.uLineThickness, CONFIG.lineThickness)
    gl.uniform1f(uniforms.uGridScale, CONFIG.gridScale)
    gl.uniform1f(uniforms.uLineJitter, CONFIG.lineJitter)
    gl.uniform1f(uniforms.uScanOpacity, CONFIG.scanOpacity)
    gl.uniform1f(uniforms.uScanGlow, CONFIG.scanGlow)
    gl.uniform1f(uniforms.uScanSoftness, CONFIG.scanSoftness)
    gl.uniform1f(uniforms.uPhaseTaper, CONFIG.scanPhaseTaper)
    gl.uniform1f(uniforms.uScanDuration, CONFIG.scanDuration)
    gl.uniform1f(uniforms.uScanDelay, CONFIG.scanDelay)
    gl.uniform1f(uniforms.uNoise, CONFIG.noise)
    gl.uniform1f(uniforms.uHalo, CONFIG.halo)
    gl.uniform1f(uniforms.uGain, CONFIG.gain)

    const loc = gl.getAttribLocation(program, 'aPos')
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    // one oversized triangle covers the screen (no diagonal seam, one less vertex than a quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.disable(gl.BLEND)
    gl.disable(gl.DEPTH_TEST)

    ready = true
    resize()
    draw(staticMode ? 1.5 : performance.now() / 1000)
    onReady(true)
    start()
  }

  const setup = () => {
    ready = false
    cancelAnimationFrame(pollRaf)
    if (!isGL2 && !gl.getExtension('OES_standard_derivatives')) {
      onReady(false)
      return
    }
    parallel = gl.getExtension('KHR_parallel_shader_compile')
    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    program = gl.createProgram()
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc))
    gl.linkProgram(program)

    // Where supported, wait for the driver to finish compiling without blocking the page
    if (parallel) {
      const pending = program
      const poll = () => {
        if (disposed || gl.isContextLost() || pending !== program) return
        if (gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) finishSetup()
        else pollRaf = requestAnimationFrame(poll)
      }
      poll()
    } else {
      finishSetup()
    }
  }

  const onPointer = (e) => {
    if (e.pointerType === 'touch') return
    look.tx = (e.clientX / window.innerWidth) * 2 - 1
    look.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  const onLeave = () => {
    look.tx = 0
    look.ty = 0
  }
  const onVisibility = () => (document.hidden ? stop() : start())
  const onResize = () => {
    if (!ready) return
    resize()
    if (staticMode || !raf) draw(staticMode ? 1.5 : performance.now() / 1000)
  }
  const onLost = (e) => {
    e.preventDefault() // allows the browser to restore the context
    stop()
    cancelAnimationFrame(pollRaf)
    ready = false
  }
  const onRestored = () => setup()

  window.addEventListener('pointermove', onPointer, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('resize', onResize, { passive: true })
  canvas.addEventListener('webglcontextlost', onLost)
  canvas.addEventListener('webglcontextrestored', onRestored)

  setup()

  return {
    setStatic(value) {
      staticMode = value
      stop()
      start()
    },
    destroy() {
      disposed = true
      stop()
      cancelAnimationFrame(pollRaf)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}

const GridBackground = () => {
  const hostRef = useRef(null)
  const rendererRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    // A fresh canvas per mount: a canvas whose context was released cannot be reused
    // (matters for React Strict Mode's mount → unmount → mount in development).
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = 'display:block;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease-out'
    host.appendChild(canvas)

    let renderer = null
    try {
      renderer = createRenderer(canvas, {
        onReady: (ok) => {
          if (ok) canvas.style.opacity = '1' // fades in once the first frame exists
          markBackgroundReady()
        },
      })
    } catch {
      renderer = null
    }
    // No WebGL: the plain dark background stays, and nothing waits for us
    if (!renderer) markBackgroundReady()
    rendererRef.current = renderer

    return () => {
      renderer?.destroy()
      rendererRef.current = null
      canvas.remove()
    }
  }, [])

  useEffect(() => {
    rendererRef.current?.setStatic(reduced)
  }, [reduced])

  return <div ref={hostRef} className="h-full w-full" />
}

export default GridBackground
