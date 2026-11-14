/* eslint-disable react-refresh/only-export-components */
/**
 * useLenis — one global smooth-scroll engine for the entire app.
 *
 * • Lenis drives the scroll; the GSAP ticker drives Lenis (no second rAF loop).
 * • lenis.on('scroll', ScrollTrigger.update) keeps every trigger in sync.
 * • When the visitor has switched animations off (lib/motion), Lenis is not created
 *   and native scroll takes over; flipping the switch creates/destroys it live.
 * • The instance is exposed through `globalLenis` (non-React code) and
 *   `useLenis()` (React code). `scrollToTarget` / `lockScroll` wrap it so callers
 *   never need to care whether Lenis is running.
 */

import Lenis from 'lenis'
import { useEffect, useSyncExternalStore } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isReducedMotion, useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export let globalLenis = null

const listeners = new Set()
const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const getSnapshot = () => globalLenis
const notify = () => listeners.forEach((l) => l())

// Height of the fixed header, so anchored sections don't sit underneath it.
export const HEADER_OFFSET = 72

/** Scroll to a y position, an element, or an element id. */
export function scrollToTarget(target, { immediate = false, offset = -HEADER_OFFSET, duration = 1.2 } = {}) {
  let el = target
  if (typeof target === 'string') el = document.getElementById(target)
  if (target !== 0 && !el && typeof target !== 'number') return false

  if (globalLenis) {
    // Lenis caches the scrollable height; after a route change it can still hold the previous
    // page's limit and would clamp the jump short. Re-measure first.
    globalLenis.resize()
    globalLenis.scrollTo(el ?? target, {
      offset: typeof target === 'number' ? 0 : offset,
      immediate,
      duration,
      force: true,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    const y = typeof target === 'number' ? target : el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: y, behavior: immediate || isReducedMotion() ? 'auto' : 'smooth' })
  }
  return true
}

// Remembered so a Lenis instance created while the page is locked (preloader) starts paused.
let scrollLocked = false

/** Pause / resume page scrolling (used by the menu and the preloader). */
export function lockScroll(locked) {
  scrollLocked = locked
  if (globalLenis) {
    if (locked) globalLenis.stop()
    else globalLenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export function LenisProvider({ children }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    // Keep GSAP's lag smoothing: after a long frame animations pause briefly instead of
    // jumping ahead and skipping frames.
    gsap.ticker.lagSmoothing(500, 33)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.1, // momentum feel (lower = floatier)
      smoothWheel: true,
      syncTouch: false, // keep native momentum on touch devices
      autoRaf: false, // driven by gsap.ticker below
      overscroll: false,
    })

    globalLenis = lenis
    if (scrollLocked) lenis.stop()
    if (import.meta.env.DEV) window.__lenis = lenis
    notify()

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      globalLenis = null
      if (import.meta.env.DEV) delete window.__lenis
      notify()
    }
  }, [reduced])

  return children
}

/** Returns the current Lenis instance (null until mounted, or while animations are switched off). */
export function useLenis() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
