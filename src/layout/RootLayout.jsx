import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Emailbar from '../components/Emailbar'
import ScrollProgress from '../components/ScrollProgress'
import Preloader from '../components/Preloader'
import Contact from '../sections/Contact'
import { TransitionContext } from '../components/TransitionLink'
import { scrollToTarget } from '../hooks/useLenis.jsx'
import { isReducedMotion } from '../lib/motion'
import { MotionHint } from '../components/MotionControls'
import { site } from '../data/site'
import { holdRevealsFor } from '../lib/intro'
import { getProject } from '../data/projects'
import { getExperience } from '../data/experience'

gsap.registerPlugin(ScrollTrigger)

const curtainLabel = (pathname) => {
  if (pathname === '/') return 'Home'
  if (pathname === '/all-projects') return 'All Projects'
  const slug = pathname.replace(/^\/+|\/+$/g, '')
  return getProject(slug)?.title ?? getExperience(slug)?.company ?? ''
}

const RootLayout = () => {
  const location = useLocation()
  const navType = useNavigationType()
  const navigate = useNavigate()

  const greenRef = useRef(null)
  const darkRef = useRef(null)
  const labelRef = useRef(null)
  const busy = useRef(false)
  const covered = useRef(false)
  const positions = useRef(new Map())
  const currentKey = useRef(location.key)
  const firstLoad = useRef(true)
  const failsafe = useRef(0)
  const [label, setLabel] = useState('')

  // ── Remember the scroll position of every history entry ──────────────────
  useEffect(() => {
    let raf = 0
    const save = () => {
      raf = 0
      positions.current.set(currentKey.current, window.scrollY)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(save)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // ── Curtain: cover → navigate → (new page renders) → reveal ──────────────
  const reveal = useCallback(() => {
    window.clearTimeout(failsafe.current)
    covered.current = false // lifting now; a second call must not start another lift
    gsap
      .timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          gsap.set([greenRef.current, darkRef.current], { visibility: 'hidden' })
          busy.current = false
        },
      })
      .to(labelRef.current, { yPercent: -60, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 0.05)
      .to(darkRef.current, { yPercent: -100, duration: 0.75 }, 0.2)
      .to(greenRef.current, { yPercent: -100, duration: 0.75 }, 0.32)
  }, [])

  const cover = useCallback((text, after) => {
    if (busy.current) return
    if (isReducedMotion()) {
      after()
      return
    }
    busy.current = true
    setLabel(text)
    gsap
      .timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          covered.current = true
          holdRevealsFor(550)
          after()
          // If the navigation never lands (it always should), don't leave the curtain down
          window.clearTimeout(failsafe.current)
          failsafe.current = window.setTimeout(() => covered.current && reveal(), 2000)
        },
      })
      .set([greenRef.current, darkRef.current], { yPercent: 100, visibility: 'visible' })
      .set(labelRef.current, { yPercent: 60, autoAlpha: 0 })
      .to(greenRef.current, { yPercent: 0, duration: 0.6 })
      .to(darkRef.current, { yPercent: 0, duration: 0.6 }, '-=0.45')
      .to(labelRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'expo.out' }, '-=0.25')
  }, [reveal])

  const go = useCallback(
    (to) => {
      if (to === -1) {
        const idx = window.history.state?.idx ?? 0
        if (idx > 0) {
          cover('', () => navigate(-1))
          return
        }
        to = '/'
      }

      const url = new URL(to, window.location.href)
      if (url.origin !== window.location.origin) {
        window.location.assign(to)
        return
      }
      const id = decodeURIComponent(url.hash.slice(1))

      // Same page: just glide to the section
      if (url.pathname === location.pathname) {
        if (!id || !scrollToTarget(id)) scrollToTarget(0)
        return
      }
      cover(curtainLabel(url.pathname), () => navigate(url.pathname + url.hash))
    },
    [cover, location.pathname, navigate]
  )

  // ── After every navigation: restore / reset scroll, refresh triggers, lift the curtain
  useLayoutEffect(() => {
    currentKey.current = location.key
    const id = decodeURIComponent(location.hash.slice(1))
    const saved = navType === 'POP' ? positions.current.get(location.key) : undefined
    const settle = covered.current || firstLoad.current
    firstLoad.current = false

    const apply = () => {
      if (saved != null) scrollToTarget(saved, { immediate: true })
      else if (!id || !scrollToTarget(id, { immediate: true })) scrollToTarget(0, { immediate: true })
    }
    apply()

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (settle) apply()
    })
    // Late layout (fonts, images) can still move anchors — re-apply while the curtain is up
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
      if (settle && (saved != null || id)) apply()
    }, 300)

    if (covered.current) reveal()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])

  // ── Keep canonical / og:url in step after client-side navigation (each route's static HTML
  //    already ships the right ones — see scripts/seo-pages.js). Unknown URLs are the 404 page:
  //    they get `noindex` and no canonical, so search engines don't index them as real pages.
  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/'
    const slug = path.slice(1)
    const known = path === '/' || path === '/all-projects' || !!getProject(slug) || !!getExperience(slug)
    const head = document.head
    let canonical = head.querySelector('link[rel="canonical"]')
    let robots = head.querySelector('meta[name="robots"]')
    const ogUrl = head.querySelector('meta[property="og:url"]')
    if (known) {
      const url = site.url + (path === '/' ? '/' : path)
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        head.appendChild(canonical)
      }
      canonical.href = url
      ogUrl?.setAttribute('content', url)
      robots?.remove()
    } else {
      canonical?.remove()
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        head.appendChild(robots)
      }
      robots.content = 'noindex'
    }
  }, [location.pathname])

  const ctx = useMemo(() => ({ go }), [go])

  return (
    <TransitionContext.Provider value={ctx}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-neon focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>
      <Preloader />
      <Navbar />
      <Emailbar />
      <ScrollProgress />

      <main id="main">
        <Outlet />
      </main>
      <Contact />
      <MotionHint />

      {/* Page transition curtain */}
      <div aria-hidden="true" data-curtain className="pointer-events-none fixed inset-0 z-[200]">
        <div ref={greenRef} className="invisible absolute inset-0 bg-neon" />
        <div ref={darkRef} className="invisible absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0c0c0c]">
          <span
            ref={labelRef}
            className="px-6 text-center font-anton text-[clamp(2.5rem,9vw,7rem)] uppercase leading-none tracking-tight text-white"
          >
            {label}
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}

export default RootLayout
