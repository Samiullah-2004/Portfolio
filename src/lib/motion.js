// Site-level motion preference.
//
// Animations are ON by default for every visitor — including those whose operating system
// reports "prefers-reduced-motion". On Windows that flag is usually set for performance
// (Settings → Accessibility → Visual effects → Animation effects), and honouring it blindly
// meant the intro and every animation silently disappeared for those visitors.
//
// Anyone who wants a calmer site can switch animations off in the menu or the footer; the
// choice is remembered. `isReducedMotion()` is the single question the rest of the code asks.

import { useSyncExternalStore } from 'react'

const KEY = 'sa-motion' // 'reduced' | 'full'
const HINT_KEY = 'sa-motion-hint'

const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null // storage blocked (private mode / disabled cookies)
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* ignore */
    }
  },
}

const hasWindow = typeof window !== 'undefined'
let reduced = hasWindow && storage.get(KEY) === 'reduced'
const listeners = new Set()

const apply = () => {
  if (hasWindow) document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
}
apply()

/** True only when the visitor has chosen "reduce motion" on this site. */
export const isReducedMotion = () => reduced

/** What the operating system asks for (used only to offer the switch, never to force it). */
export const osPrefersReducedMotion = () =>
  hasWindow && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function setReducedMotion(next) {
  if (next === reduced) return
  reduced = next
  storage.set(KEY, next ? 'reduced' : 'full')
  apply()
  listeners.forEach((l) => l())
}

const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/** React hook: re-renders when the visitor flips the switch. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, isReducedMotion, () => false)
}

/** Should we offer "reduce motion" once? (OS asks for it and the visitor has not chosen yet.) */
export const shouldOfferReducedMotion = () =>
  osPrefersReducedMotion() && storage.get(KEY) === null && storage.get(HINT_KEY) === null

export const dismissMotionOffer = () => storage.set(HINT_KEY, '1')
