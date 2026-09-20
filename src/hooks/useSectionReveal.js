/**
 * useSectionReveal — one shared scroll-animation hook for every section.
 *
 * TUNE EVERYTHING HERE:
 *   MODE        'scrub'  — tied directly to scroll position (Lenis smooths it)
 *               'timed'  — plays at its own pace regardless of scroll speed
 *   DISTANCE    px elements travel on enter / exit (was 150px, now 70px)
 *   STAGGER_IN  delay between each element entering
 *   STAGGER_OUT delay between each element leaving
 *   SCRUB       true = 1-to-1 with scroll (best with Lenis); number = lag
 *
 * One fromTo timeline per section so in/out never conflict. Both phases use
 * immediateRender:false and overwrite:'auto' so any scroll position (refresh,
 * anchor jump, back/forward nav, resize) always renders the correct state.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Central config — one place to tune ──────────────────────────────────────
export const REVEAL_CONFIG = {
  MODE: 'scrub',      // ← change to 'timed' and reload to compare
  DISTANCE: 70,       // px
  STAGGER_IN: 0.05,
  STAGGER_OUT: 0.02,
  SCRUB: true,        // true = direct 1-to-1 (Lenis already gives momentum)
  EASE_SCRUB: 'none', // no easing on scrubbed tweens — none is smoothest
  DURATION_TIMED: 0.9,
  EASE_TIMED: 'power3.out',
};

/**
 * @param {object} opts
 * @param {React.RefObject} opts.containerRef  — the section's root element ref
 * @param {string}          opts.id            — unique ScrollTrigger id prefix
 * @param {string}          opts.selector      — CSS selector for animated els
 * @param {string}          [opts.startEnter]  — ST start for enter phase
 * @param {string}          [opts.endEnter]    — ST end for enter phase
 * @param {string}          [opts.startExit]   — ST start for exit phase
 * @param {string}          [opts.endExit]     — ST end for exit phase
 */
export function useSectionReveal({
  containerRef,
  id,
  selector,
  startEnter = 'top 78%',
  endEnter   = 'top 30%',
  startExit  = 'bottom 58%',
  endExit    = 'bottom 12%',
}) {
  const { MODE, DISTANCE, STAGGER_IN, STAGGER_OUT, SCRUB, EASE_SCRUB,
          DURATION_TIMED, EASE_TIMED } = REVEAL_CONFIG;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const targets = gsap.utils.toArray(selector, container);
      if (!targets.length) return;

      // Remove hardcoded will-change; we apply it only while animating
      targets.forEach(el => el.style.removeProperty('will-change'));

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reducedMotion) {
        // ── Reduced motion: simple opacity fade only, no movement ────────────
        gsap.timeline({
          scrollTrigger: {
            id: `${id}-in`,
            trigger: container,
            start: startEnter,
            end: endEnter,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          targets,
          { opacity: 0 },
          { opacity: 1, ease: EASE_SCRUB, stagger: STAGGER_IN,
            immediateRender: false, overwrite: 'auto' }
        );
        return;
      }

      if (MODE === 'scrub') {
        // ── SCRUB MODE: two phases, each a fromTo ─────────────────────────────
        // Phase 1 — Enter: elements rise up into view
        const tlIn = gsap.timeline({
          scrollTrigger: {
            id: `${id}-in`,
            trigger: container,
            start: startEnter,
            end: endEnter,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });
        tlIn.fromTo(
          targets,
          { y: DISTANCE, opacity: 0, force3D: true },
          { y: 0, opacity: 1, ease: EASE_SCRUB, stagger: STAGGER_IN,
            immediateRender: false, overwrite: 'auto' }
        );

        // Phase 2 — Exit: elements drift upward while fading out
        const tlOut = gsap.timeline({
          scrollTrigger: {
            id: `${id}-out`,
            trigger: container,
            start: startExit,
            end: endExit,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });
        tlOut.fromTo(
          targets,
          { y: 0, opacity: 1, force3D: true },
          { y: -DISTANCE, opacity: 0, ease: EASE_SCRUB, stagger: STAGGER_OUT,
            immediateRender: false, overwrite: 'auto' }
        );
      } else {
        // ── TIMED MODE: plays independently of scroll speed ───────────────────
        gsap.timeline({
          scrollTrigger: {
            id: `${id}-in`,
            trigger: container,
            start: startEnter,
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }).fromTo(
          targets,
          { y: DISTANCE, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: DURATION_TIMED, ease: EASE_TIMED,
            stagger: STAGGER_IN, immediateRender: false, overwrite: 'auto' }
        );

        gsap.timeline({
          scrollTrigger: {
            id: `${id}-out`,
            trigger: container,
            start: startExit,
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }).fromTo(
          targets,
          { y: 0, opacity: 1, force3D: true },
          { y: -DISTANCE, opacity: 0, duration: DURATION_TIMED * 0.7,
            ease: 'power2.in', stagger: STAGGER_OUT,
            immediateRender: false, overwrite: 'auto' }
        );
      }
    },
    { scope: containerRef }
  );
}
