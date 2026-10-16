import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { lockScroll, prefersReducedMotion } from '../hooks/useLenis.jsx'
import { backgroundReady, blockReveals, releaseReveals, unblockReveals } from '../lib/intro'
import { site } from '../data/site'

gsap.registerPlugin(useGSAP)

/**
 * Intro shown once per full page load.
 *
 *  1. Corner details fade in and the counter starts while the font/background load;
 *     then the name rises letter by letter as an outline.
 *  2. The counter runs to 100 while the outline fills with green, left to right,
 *     and the tagline rolls through Design → Build → Ship.
 *  3. The name glows and lifts away; the columns wipe up from the centre, each with a
 *     neon edge, revealing the site — the hero starts animating as they lift.
 *
 * Built with useGSAP so React Strict Mode's mount → unmount → mount cycle reverts
 * cleanly (the old version left the letters stuck off-screen in development).
 * Waits (max ~1s) for the Anton font so the name never flashes in a fallback font.
 */

let hasPlayed = false

const NAME = site.firstName.toUpperCase()
const WORDS = ['Design', 'Build', 'Ship']

const NameRow = ({ fill = false }) => (
  <p
    aria-hidden="true"
    data-fill={fill || undefined}
    className={`flex overflow-hidden py-[0.06em] font-anton text-[clamp(3.25rem,19vw,12rem)] uppercase leading-none tracking-tight ${
      fill ? 'absolute inset-0 text-neon' : 'text-transparent [-webkit-text-stroke:1.2px_rgba(237,237,237,0.32)]'
    }`}
  >
    {NAME.split('').map((ch, i) => (
      <span key={i} data-l data-i={i} className="inline-block will-change-transform">
        {ch}
      </span>
    ))}
  </p>
)

const Preloader = () => {
  const [done, setDone] = useState(() => hasPlayed || prefersReducedMotion())
  const [columns] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 5 : 8))
  const rootRef = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      if (done) return
      hasPlayed = true
      lockScroll(true)
      blockReveals()

      const root = rootRef.current
      const q = gsap.utils.selector(root)
      const letters = q('[data-l]')
      const fill = q('[data-fill]')[0]
      const bar = q('[data-bar]')[0]
      const counter = q('[data-counter]')[0]
      const roller = q('[data-roller]')[0]
      let cancelled = false
      let finished = false

      // Starting state — applied before the first paint
      gsap.set(letters, { yPercent: 118 })
      gsap.set(fill, { clipPath: 'inset(-25% 100% -25% -10%)' })
      gsap.set(q('[data-meta]'), { autoAlpha: 0, y: 14 })
      gsap.set(q('[data-tagline]'), { autoAlpha: 0, y: 14 })
      gsap.set(bar, { scaleX: 0 })

      const progress = { v: 0 }
      const render = () => {
        const v = progress.v
        counter.textContent = String(Math.round(v)).padStart(3, '0')
        bar.style.transform = `scaleX(${v / 100})`
        fill.style.clipPath = `inset(-25% ${100 - v * 1.1}% -25% -10%)`
      }

      // While the font / background load: corner details arrive and the counter starts
      // ticking, so the screen is alive from the very first frame.
      gsap.to(q('[data-meta]'), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
      const warmup = gsap.to(progress, { v: 18, duration: 1.4, ease: 'power1.out', onUpdate: render })

      const play = contextSafe(() => {
        if (cancelled) return
        warmup.kill()
        const byIndex = (step) => (i, el) => Number(el.dataset.i) * step

        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          // 1 — the name rises as an outline
          .to(letters, { yPercent: 0, duration: 1.05, stagger: byIndex(0.05) }, 0)
          .to(q('[data-tagline]'), { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
          // 2 — counter, bar and the green fill move together to 100
          .to(progress, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: render }, 0.1)
          .to(roller, { yPercent: -100 / 3, duration: 0.6, ease: 'expo.inOut' }, 0.6)
          .to(roller, { yPercent: -200 / 3, duration: 0.6, ease: 'expo.inOut' }, 1.05)
          // 3 — a glow when it completes
          .to(fill, { textShadow: '0 0 42px rgba(46, 240, 106, 0.55)', duration: 0.3, ease: 'power2.out' }, 1.5)
          .to(fill, { textShadow: '0 0 0px rgba(46, 240, 106, 0)', duration: 0.4, ease: 'power2.in' }, 1.8)
          // 4 — exit: the name lifts away, then the columns wipe up
          .addLabel('exit', 1.85)
          .to(letters, { yPercent: -118, duration: 0.55, ease: 'expo.in', stagger: byIndex(0.028) }, 'exit')
          .to(q('[data-meta], [data-tagline]'), { autoAlpha: 0, y: -12, duration: 0.35, ease: 'power2.in', stagger: 0.025 }, 'exit')
          .call(
            () => {
              root.style.pointerEvents = 'none'
              lockScroll(false)
              releaseReveals(300) // the hero starts as the columns lift
            },
            null,
            'exit+=0.3'
          )
          // each column carries a thin neon edge, so a green line sweeps up the screen
          .to(q('[data-col]'), { yPercent: -104, duration: 0.95, ease: 'power4.inOut', stagger: { each: 0.05, from: 'center' } }, 'exit+=0.28')
          .call(() => {
            finished = true
            setDone(true)
          })
      })

      // Start once the display font is loaded and the WebGL background has compiled
      // (so its one-off freeze happens before anything big moves) — or after 1.2s at most.
      const fontReady = document.fonts?.load ? document.fonts.load('400 100px Anton').catch(() => {}) : Promise.resolve()
      Promise.race([Promise.all([fontReady, backgroundReady]), new Promise((r) => setTimeout(r, 1200))]).then(play)

      return () => {
        cancelled = true
        if (!finished) {
          lockScroll(false)
          // Let anything queued run on the next frame — unless a re-mount (React Strict Mode)
          // has blocked reveals again by then, in which case the new intro will release them.
          unblockReveals()
          requestAnimationFrame(() => releaseReveals(0, { unlessBlocked: true }))
        }
      }
    },
    { scope: rootRef, dependencies: [done] }
  )

  if (done) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[300] select-none overflow-hidden" aria-hidden="true">
      {/* Dark columns — each with a neon bottom edge that sweeps up on exit */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} data-col className="relative -mx-px h-full flex-1 bg-ink">
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-neon shadow-[0_0_18px_rgba(46,240,106,0.6)]" />
          </div>
        ))}
      </div>

      {/* Ambient glow + faint grid */}
      <div
        data-meta
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(46,240,106,0.07),transparent_70%)]"
      />
      <div
        data-meta
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="absolute inset-0 flex flex-col">
        {/* Top corners */}
        <div className="container-page flex h-[68px] items-center justify-between md:h-[72px]">
          <span data-meta className="flex items-center gap-2 font-anton text-[26px] leading-none tracking-tight text-white">
            SA
            <span className="h-2 w-2 rounded-full bg-neon" />
          </span>
          <span data-meta className="eyebrow !text-[10px] sm:!text-[11px]">
            Portfolio © {new Date().getFullYear()}
          </span>
        </div>

        {/* Name + tagline */}
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="relative">
            <NameRow />
            <NameRow fill />
          </div>

          <div
            data-tagline
            className="mt-5 flex flex-col items-center gap-2 font-roboto-flex text-[11px] font-semibold uppercase tracking-[0.24em] text-muted sm:mt-7 sm:flex-row sm:gap-4 sm:text-[13px]"
          >
            <span>{site.role}</span>
            <span className="hidden h-px w-10 bg-white/20 sm:block" />
            <span className="relative block h-[1.3em] overflow-hidden">
              <span data-roller className="flex flex-col text-neon">
                {WORDS.map((w) => (
                  <span key={w} className="block h-[1.3em] leading-[1.3em]">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>

        {/* Bottom corners */}
        <div className="container-page flex items-end justify-between pb-6 sm:pb-8">
          <div data-meta className="flex flex-col gap-1.5 text-[11px] text-muted sm:text-[12px]">
            <span className="flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-neon" />
              {site.location}
            </span>
            <span className="hidden sm:block">Loading the experience</span>
          </div>
          <div data-meta className="flex items-start font-anton leading-none text-white">
            <span data-counter className="text-[clamp(2.75rem,8vw,5.5rem)] tabular-nums">
              000
            </span>
            <span className="ml-1 mt-1 text-[clamp(1rem,2vw,1.5rem)] text-neon">%</span>
          </div>
        </div>
      </div>

      {/* Progress line */}
      <div data-meta className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <div data-bar className="h-full origin-left bg-neon" />
      </div>
    </div>
  )
}

export default Preloader
