/* eslint-disable react-refresh/only-export-components */
/**
 * useLenis — one global smooth-scroll engine for the entire app.
 *
 * • Lenis drives the scroll; GSAP ticker drives Lenis (no second RAF).
 * • lenis.on('scroll', ScrollTrigger.update) keeps all triggers in sync.
 * • prefers-reduced-motion: Lenis is destroyed; native scroll takes over.
 * • The instance is exposed via useSyncExternalStore AND a module-level ref so
 *   non-React consumers (e.g. ScrollStack) can read it without prop-drilling.
 */

import Lenis from 'lenis';
import { useEffect, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Module-level singleton ref (accessible outside React) ───────────────────
export let globalLenis = null;

const listeners = new Set();
function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function getSnapshot() {
  return globalLenis;
}

export function LenisProvider({ children }) {
  useEffect(() => {
    // Respect prefers-reduced-motion — skip smooth scroll entirely
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Global ScrollTrigger hygiene
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (reducedMotion) {
      // Still need ST to work; just use native scroll
      ScrollTrigger.normalizeScroll(false);
      return;
    }

    // ── Create the single Lenis instance ─────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.09,          // momentum feel (0 = instant, 1 = infinite lag)
      syncTouch: false,    // native momentum on touch; no double-smoothing
      autoRaf: false,      // we drive it from gsap.ticker — no second loop
      overscroll: false,
    });

    globalLenis = lenis;
    listeners.forEach((l) => l());

    // ── Drive Lenis from the GSAP ticker ─────────────────────────────────────
    // gsap.ticker time is in seconds; lenis.raf expects milliseconds
    gsap.ticker.lagSmoothing(0); // don't let GSAP catch up after a lag spike
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    // ── Keep ScrollTrigger positions in sync with Lenis scroll ───────────────
    lenis.on('scroll', ScrollTrigger.update);

    // ── Refresh triggers after fonts are ready ────────────────────────────────
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      globalLenis = null;
      listeners.forEach((l) => l());
    };
  }, []);

  return children;
}

/**
 * Hook — returns the current Lenis instance (null until mounted).
 */
export function useLenis() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
