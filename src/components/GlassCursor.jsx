import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { isReducedMotion } from '../lib/motion'
import './GlassCursor.css'

/**
 * GlassCursor — a frosted "liquid glass" lens that trails the pointer, plus a
 * precise neon dot. The lens stretches with speed, grows over interactive
 * elements, and shows a label over anything marked `data-cursor="view"`
 * (optionally `data-cursor-label="Open"`).
 *
 * Only runs on devices with a real mouse (hover + fine pointer); touch devices
 * keep their native behaviour.
 */

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], input, textarea, select, label, summary'

const SCALE = { default: 1, hover: 1.75, view: 2.7, press: 0.8 }

const GlassCursor = () => {
  const rootRef = useRef(null)
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const html = document.documentElement
    html.classList.add('has-glass-cursor')

    const root = rootRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current

    const pos = { mx: -200, my: -200, rx: -200, ry: -200 }
    let scale = 1
    let targetScale = SCALE.default
    let pressed = false
    let mode = 'default'
    let shown = false

    const setMode = (next, text) => {
      if (next === mode && !text) return
      mode = next
      targetScale = SCALE[next]
      ring.classList.toggle('is-hover', next === 'hover')
      ring.classList.toggle('is-view', next === 'view')
      dot.classList.toggle('is-hidden', next === 'view')
      label.textContent = next === 'view' ? text || 'View' : ''
      label.classList.toggle('is-visible', next === 'view')
    }

    const show = (visible) => {
      shown = visible
      root.style.opacity = visible ? '1' : '0'
    }

    const onMove = (e) => {
      pos.mx = e.clientX
      pos.my = e.clientY
      if (!shown) {
        pos.rx = pos.mx
        pos.ry = pos.my
        show(true)
      }
    }

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null
      if (!el) return setMode('default')
      if (el.dataset.cursor === 'view') return setMode('view', el.dataset.cursorLabel)
      setMode('hover')
    }

    const onDown = () => (pressed = true)
    const onUp = () => (pressed = false)
    const onLeaveWindow = () => show(false)

    const tick = () => {
      const reduce = isReducedMotion() // read live so the menu switch applies immediately
      const follow = reduce ? 1 : 0.2
      const dx = pos.mx - pos.rx
      const dy = pos.my - pos.ry
      pos.rx += dx * follow
      pos.ry += dy * follow

      const goal = pressed ? targetScale * SCALE.press : targetScale
      scale += (goal - scale) * (reduce ? 1 : 0.16)

      // Stretch along the direction of travel for a liquid feel
      const speed = Math.hypot(dx, dy)
      const stretch = reduce ? 0 : Math.min(speed / 160, 0.28)
      const angle = Math.atan2(dy, dx)

      root.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`
      ring.style.transform = `rotate(${angle}rad) scale(${scale * (1 + stretch)}, ${scale * (1 - stretch * 0.6)})`
      dot.style.transform = `translate3d(${pos.mx - pos.rx}px, ${pos.my - pos.ry}px, 0)`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    html.addEventListener('pointerleave', onLeaveWindow)
    gsap.ticker.add(tick)

    return () => {
      html.classList.remove('has-glass-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      html.removeEventListener('pointerleave', onLeaveWindow)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div ref={rootRef} className="glass-cursor" aria-hidden="true">
      <div ref={ringRef} className="glass-cursor__lens" />
      <div ref={dotRef} className="glass-cursor__dot" />
      <span ref={labelRef} className="glass-cursor__label" />
    </div>
  )
}

export default GlassCursor
