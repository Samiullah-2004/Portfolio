import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { navLinks, site, socials } from '../data/site'
import { socialIcon } from './BrandIcons'
import { usePageTransition } from './TransitionLink'
import { lockScroll, scrollToTarget } from '../hooks/useLenis.jsx'
import { useCopyEmail } from '../hooks/useCopyEmail'

gsap.registerPlugin(useGSAP)

const Navbar = () => {
  const { pathname } = useLocation()
  // The menu is "open on a given page" — navigating anywhere else closes it automatically.
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const setOpen = (next) => setOpenOn((cur) => ((typeof next === 'function' ? next(cur === pathname) : next) ? pathname : null))
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)
  const tlRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)
  const { go } = usePageTransition()
  const { copied, copy } = useCopyEmail()

  // Header turns to frosted glass once the page is scrolled
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setScrolled(window.scrollY > 24)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Drawer timeline (built once, played/reversed on toggle)
  useGSAP(
    () => {
      const drawer = drawerRef.current
      tlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .set(drawer, { visibility: 'visible' })
        .fromTo('[data-overlay]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0)
        .fromTo('[data-panel]', { xPercent: 100 }, { xPercent: 0, duration: 0.8 }, 0)
        .fromTo('[data-menu-item]', { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.045 }, 0.18)
        .fromTo('[data-menu-fade]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.35)
    },
    { scope: drawerRef }
  )

  useEffect(() => {
    const tl = tlRef.current
    if (!tl || open === wasOpen.current) return
    wasOpen.current = open
    if (open) {
      tl.timeScale(1).play()
      lockScroll(true)
      document.documentElement.dataset.menuOpen = 'true'
      requestAnimationFrame(() => drawerRef.current?.querySelector('[data-menu-link]')?.focus({ preventScroll: true }))
    } else {
      tl.timeScale(1.6).reverse()
      lockScroll(false)
      delete document.documentElement.dataset.menuOpen
    }
  }, [open])

  // Close on Escape and when the route changes
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const goToSection = (id) => {
    setOpen(false)
    // Let the drawer start closing, then scroll — in place if this page has the section
    // (e.g. Contact is on every page), otherwise via the home page.
    setTimeout(() => (document.getElementById(id) ? scrollToTarget(id) : go(`/#${id}`)), open ? 280 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color] duration-500 ${
          scrolled && !open
            ? 'border-b border-white/[0.07] bg-[#0a0a0a]/55 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="container-page flex h-[68px] items-center justify-between md:h-[72px]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              go('/#home')
            }}
            className="group flex items-center gap-2"
            aria-label={`${site.name} — home`}
          >
            <span className="font-anton text-[26px] leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-neon">
              SA
            </span>
            <span className="h-2 w-2 rounded-full bg-neon transition-transform duration-500 group-hover:scale-150" />
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToSection('contact')}
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-medium tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-neon hover:text-neon sm:inline-flex"
            >
              Let's talk
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="group relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md transition-colors duration-300 hover:border-neon"
            >
              <span
                className={`absolute h-[2px] w-5 rounded bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer ─────────────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        id="site-menu"
        className="invisible fixed inset-0 z-[55]"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <div data-overlay className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

        <nav
          data-panel
          className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto border-l border-white/10 bg-[#0b0b0b]/90 px-6 pb-8 pt-24 backdrop-blur-2xl sm:w-[480px] sm:px-10 md:pt-28"
        >
          <p data-menu-fade className="eyebrow mb-6">
            Menu
          </p>
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.id} className="overflow-hidden">
                <a
                  data-menu-item
                  data-menu-link
                  href={`/#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goToSection(link.id)
                  }}
                  className="group flex items-baseline gap-4 py-1.5 font-anton text-[clamp(2.25rem,9vw,3.25rem)] uppercase leading-[1.05] tracking-tight text-white/90 transition-colors duration-300 hover:text-neon"
                >
                  <span className="font-roboto-flex text-xs font-medium tracking-widest text-muted transition-colors duration-300 group-hover:text-neon">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-8 pt-12">
            <div data-menu-fade>
              <p className="eyebrow mb-4">Social</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((s) => {
                  const Icon = socialIcon[s.id]
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-[15px] text-[#c8c8c8] transition-colors duration-300 hover:text-neon"
                      >
                        <Icon className="h-4 w-4" />
                        {s.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div data-menu-fade>
              <p className="eyebrow mb-4">Get in touch</p>
              <a
                href={`mailto:${site.email}`}
                className="text-[15px] text-[#c8c8c8] transition-colors duration-300 [overflow-wrap:anywhere] hover:text-neon"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="ml-4 inline-flex items-center gap-2 text-[13px] text-muted transition-colors duration-300 hover:text-neon"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-neon" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy email'}
              </button>
            </div>
          </div>

          <div data-menu-fade className="mt-10 flex items-center gap-2.5 border-t border-white/10 pt-6 text-[13px] text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-neon" />
            {site.availability}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
