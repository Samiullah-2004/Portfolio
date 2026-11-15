import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { lockScroll } from '../hooks/useLenis.jsx'
import { backgroundReady, blockReveals, releaseReveals, unblockReveals } from '../lib/intro'
import { isReducedMotion } from '../lib/motion'
import { site } from '../data/site'

gsap.registerPlugin(useGSAP)

/**
 * The intro. It plays on EVERY full page load — first visit, refresh, deep link, and when the
 * page comes back from the browser's back/forward cache — regardless of the operating system's
 * "reduce motion" flag (see lib/motion for why). It never plays on in-app navigation.
 *
 *  1. Corner details and the progress counter appear at once (index.html already shows a
 *     loading line before any JavaScript has arrived, so there is never a blank screen).
 *  2. Once the display font is ready the name rises letter by letter as an outline and fills
 *     with green while the counter runs to 100; the tagline rolls Design → Build → Ship.
 *  3. The name glows and lifts away; columns with a neon edge wipe up from the centre and the
 *     hero animates in underneath.
 *
 * Visitors who switched animations off get a calm version (fades only). A click or key press
 * speeds the intro up, and a watchdog guarantees it can never stay stuck on screen.
 */

let hasPlayed = false

const NAME = site.firstName.toUpperCase()
const WORDS = ['Design', 'Build', 'Ship']
const WATCHDOG_MS = 9000 // counted only while the tab is visible
const BOOT_PROGRESS = 18 // matches the green segment of the loading line in index.html

const NameRow = ({ fill = false }) => (
  <p
    aria-hidden="true"
    data-fill={fill || undefined}
    className={`flex overflow-hidden py-[0.06em] font-anton text-[clamp(3.25rem,min(19vw,36svh),12rem)] uppercase leading-none tracking-tight ${
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
  const [active, setActive] = useState(() => !hasPlayed)
  const [run, setRun] = useState(0) // bumped to replay after a back/forward-cache restore
  const [columns] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 5 : 8))
  const rootRef = useRef(null)

  // The page was restored from the back/forward cache: to the visitor that is "opening the
  // site" again, so the intro plays again.
  useEffect(() => {
    const onPageShow = (e) => {
      if (!e.persisted) return
      setRun((n) => n + 1)
      setActive(true)
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  useGSAP(
    (context, contextSafe) => {
      if (!active) return
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
      const calm = isReducedMotion()
      let cancelled = false
      let finished = false
      let released = false
      let timeline = null

      // index.html's boot line already shows 18% — continue from there instead of snapping back
      const progress = { v: BOOT_PROGRESS }
      const render = () => {
        const v = progress.v
        counter.textContent = String(Math.round(v)).padStart(3, '0')
        bar.style.transform = `scaleX(${v / 100})`
        fill.style.clipPath = `inset(-25% ${100 - v * 1.1}% -25% -10%)`
      }

      const release = (afterMs) => {
        if (released) return
        released = true
        root.style.pointerEvents = 'none'
        lockScroll(false)
        releaseReveals(afterMs)
      }

      // ── Watchdog: whatever happens, the intro leaves. Only visible time counts, so a tab
      //    opened in the background still shows the full intro when the visitor arrives.
      let budget = WATCHDOG_MS
      let armedAt = 0
      let watchdog = 0
      const hurry = () => timeline?.timeScale(2.6) // a click, tap or key press fast-forwards
      const detach = () => {
        window.clearTimeout(watchdog)
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pointerdown', hurry)
        window.removeEventListener('keydown', hurry)
      }
      const onVisibility = () => {
        window.clearTimeout(watchdog)
        if (document.hidden) budget -= performance.now() - armedAt
        else arm()
      }
      const finish = () => {
        if (finished) return
        finished = true
        detach()
        release(0)
        setActive(false)
      }
      const arm = () => {
        armedAt = performance.now()
        watchdog = window.setTimeout(finish, Math.max(0, budget))
      }
      document.addEventListener('visibilitychange', onVisibility)
      if (!document.hidden) arm()
      window.addEventListener('pointerdown', hurry, { passive: true })
      window.addEventListener('keydown', hurry)

      // ── Starting state — applied before the first paint
      gsap.set(fill, { clipPath: 'inset(-25% 100% -25% -10%)' })
      gsap.set(q('[data-meta]'), { autoAlpha: 0, y: calm ? 0 : 14 })
      gsap.set(q('[data-tagline]'), { autoAlpha: 0, y: calm ? 0 : 14 })
      render()
      if (calm) gsap.set(q('[data-name]'), { autoAlpha: 0 })
      else gsap.set(letters, { yPercent: 118 })

      // While the font / background get ready: details arrive and the counter starts ticking
      gsap.to(q('[data-meta]'), { autoAlpha: 1, y: 0, duration: 0.7, stagger: calm ? 0 : 0.06, ease: 'power3.out' })
      const warmup = gsap.to(progress, { v: 30, duration: 1.4, ease: 'power1.out', onUpdate: render })

      const play = contextSafe(() => {
        if (cancelled || finished) return
        warmup.kill()
        const byIndex = (step) => (i, el) => Number(el.dataset.i) * step
        timeline = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: finish })

        if (calm) {
          timeline
            .to(q('[data-name]'), { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0)
            .to(q('[data-tagline]'), { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0.15)
            .to(progress, { v: 100, duration: 1.2, ease: 'power1.inOut', onUpdate: render }, 0.1)
            .call(() => release(250), null, 1.55)
            .to(root, { autoAlpha: 0, duration: 0.5, ease: 'power1.inOut' }, 1.55)
          return
        }

        timeline
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
          // 4 — exit: the name lifts away, then the columns wipe up from the centre
          .addLabel('exit', 1.85)
          .to(letters, { yPercent: -118, duration: 0.55, ease: 'expo.in', stagger: byIndex(0.028) }, 'exit')
          .to(q('[data-meta], [data-tagline]'), { autoAlpha: 0, y: -12, duration: 0.35, ease: 'power2.in', stagger: 0.025 }, 'exit')
          .call(() => release(300), null, 'exit+=0.3') // the hero starts as the columns lift
          // each column carries a thin neon edge, so a green line sweeps up the screen
          .to(q('[data-col]'), { yPercent: -104, duration: 0.95, ease: 'power4.inOut', stagger: { each: 0.05, from: 'center' } }, 'exit+=0.28')
      })

      // Start when the display font is loaded and the background has compiled, but never
      // wait longer than 1.2 s for them.
      const fontReady = document.fonts?.load ? document.fonts.load('400 100px Anton').catch(() => {}) : Promise.resolve()
      Promise.race([Promise.all([fontReady, backgroundReady]), new Promise((r) => setTimeout(r, 1200))]).then(play)

      return () => {
        cancelled = true
        detach()
        if (!finished) {
          lockScroll(false)
          // Let anything queued run on the next frame — unless a re-mount (React Strict Mode)
          // has blocked reveals again by then, in which case the new intro will release them.
          unblockReveals()
          requestAnimationFrame(() => releaseReveals(0, { unlessBlocked: true }))
        }
      }
    },
    { scope: rootRef, dependencies: [active, run] }
  )

  if (!active) return null

  return (
    <div ref={rootRef} data-preloader className="fixed inset-0 z-[300] select-none overflow-hidden" aria-hidden="true">
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
        <div className="container-page flex h-[68px] shrink-0 items-center justify-between md:h-[72px]">
          <span data-meta className="flex items-center gap-2 font-anton text-[26px] leading-none tracking-tight text-white">
            SA
            <span className="h-2 w-2 rounded-full bg-neon" />
          </span>
          <span data-meta className="eyebrow !text-[10px] sm:!text-[11px]">
            Portfolio © {new Date().getFullYear()}
          </span>
        </div>

        {/* Name + tagline */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
          <div data-name className="relative">
            <NameRow />
            <NameRow fill />
          </div>

          <div
            data-tagline
            className="mt-[clamp(0.75rem,3svh,1.75rem)] flex flex-col items-center gap-2 font-roboto-flex text-[11px] font-semibold uppercase tracking-[0.24em] text-muted sm:flex-row sm:gap-4 sm:text-[13px]"
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
        <div className="container-page flex shrink-0 items-end justify-between pb-[clamp(0.75rem,3.5svh,2rem)]">
          <div data-meta className="flex flex-col gap-1.5 text-[11px] text-muted sm:text-[12px]">
            <span className="flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-neon" />
              {site.location}
            </span>
            <span className="hidden sm:block">Loading the experience</span>
          </div>
          <div data-meta className="flex items-start font-anton leading-none text-white">
            <span data-counter className="text-[clamp(2.5rem,min(8vw,13svh),5.5rem)] tabular-nums">
              000
            </span>
            <span className="ml-1 mt-1 text-[clamp(1rem,2vw,1.5rem)] text-neon">%</span>
          </div>
        </div>
      </div>

      {/* Progress line (continues the loading line index.html shows before JavaScript arrives) */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <div data-bar className="h-full origin-left bg-neon" />
      </div>
    </div>
  )
}

export default Preloader
