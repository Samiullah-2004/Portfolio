/**
 * useReveal — the one scroll-animation hook every section and page uses.
 *
 * Markup API (inside the scoped container):
 *   data-reveal              fade + rise into view (elements entering together are staggered)
 *   data-reveal="fade"       fade only
 *   data-reveal="scale"      fade + slight scale (images, cards)
 *   data-reveal="left"       fade + slide from the left
 *   data-split               heading/paragraph: lines slide up out of a mask
 *   data-split="chars"       same, character by character (short display titles)
 *
 * Animations run once, ease out, and wait for the preloader / page curtain (see lib/intro).
 * When the visitor has switched animations off (lib/motion) everything just fades in quickly.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../lib/motion'
import { revealDelay, whenRevealsAllowed } from '../lib/intro'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const FROM = {
  up: { y: 48, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  scale: { y: 32, scale: 0.96, autoAlpha: 0 },
  left: { x: -40, autoAlpha: 0 },
}

export function useReveal(scopeRef, { start = 'top 88%', dependencies = [] } = {}) {
  // Re-runs (reverting the previous setup first) when the visitor flips the animation switch
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      const root = scopeRef.current
      if (!root) return

      const items = gsap.utils.toArray('[data-reveal]', root)
      const splits = gsap.utils.toArray('[data-split]', root)
      const pending = [] // reveals queued behind the preloader; cancelled if this unmounts first
      const queue = (fn) => pending.push(whenRevealsAllowed(fn))

      if (reduced) {
        // Calm mode: no movement and no split text — a short fade, still held back by the intro
        const calm = [...new Set([...items, ...splits])]
        gsap.set(calm, { autoAlpha: 0 })
        ScrollTrigger.batch(calm, {
          start: 'top 96%',
          onEnter: (batch) =>
            queue(() => gsap.to(batch, { autoAlpha: 1, duration: 0.45, ease: 'power1.out', stagger: 0.03, delay: revealDelay(), overwrite: true })),
        })
        return () => pending.forEach((cancel) => cancel())
      }

      // ── Split headings ─────────────────────────────────────────────────────
      splits.forEach((el) => {
        const byChars = el.dataset.split === 'chars'
        let current = null
        let entered = false

        SplitText.create(el, {
          type: byChars ? 'lines,chars' : 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true, // re-splits on resize / font load; the returned tween keeps its progress
          onSplit(self) {
            current = gsap.from(byChars ? self.chars : self.lines, {
              yPercent: 115,
              duration: byChars ? 1 : 1.1,
              ease: 'expo.out',
              stagger: byChars ? 0.022 : 0.09,
              paused: !entered,
            })
            return current
          },
        })

        // The delay is read when the heading enters (not when it was split), so a heading
        // further down the page never inherits the preloader's wait.
        ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () =>
            queue(() => {
              entered = true
              current?.delay(revealDelay()).restart(true)
            }),
        })
      })

      // ── Generic reveals, batched so siblings stagger naturally ─────────────
      items.forEach((el) => gsap.set(el, FROM[el.dataset.reveal] ?? FROM.up))
      ScrollTrigger.batch(items, {
        start,
        onEnter: (batch) =>
          queue(() =>
            gsap.to(batch, {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.05,
              ease: 'power3.out',
              stagger: 0.09,
              delay: revealDelay(),
              overwrite: true,
            })
          ),
      })

      return () => pending.forEach((cancel) => cancel())
    },
    { scope: scopeRef, dependencies: [...dependencies, reduced], revertOnUpdate: true }
  )
}
