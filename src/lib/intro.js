// Coordinates "when may content start animating in?" between the preloader,
// page transitions and the scroll reveals, so nothing animates behind a curtain.
//
// • The preloader calls blockReveals() while it covers the page and releaseReveals()
//   as it lifts — reveals that wanted to start in the meantime are queued, not lost.
// • Page transitions call holdRevealsFor(ms) to delay reveals by a fixed amount.

let readyAt = 0
let blocked = false
const waiting = new Set()

// The WebGL background compiles its shaders on first draw, which can freeze the main
// thread briefly. The preloader waits for this so the freeze never lands mid-animation.
let markBackground
export const backgroundReady = new Promise((resolve) => (markBackground = resolve))
export const markBackgroundReady = () => markBackground()

/** Content may start revealing `ms` from now. */
export function holdRevealsFor(ms) {
  readyAt = performance.now() + ms
}

/** Hold every reveal until releaseReveals() is called. */
export function blockReveals() {
  blocked = true
}

/** Clear the block without running the queue yet (see the preloader's cleanup). */
export function unblockReveals() {
  blocked = false
}

/**
 * Let queued reveals run, starting `afterMs` from now.
 * `unlessBlocked`: skip if something blocked again in the meantime (Strict Mode re-mount).
 */
export function releaseReveals(afterMs = 0, { unlessBlocked = false } = {}) {
  if (unlessBlocked && blocked) return
  blocked = false
  holdRevealsFor(afterMs)
  const queued = [...waiting]
  waiting.clear()
  queued.forEach((fn) => fn())
}

/** Run `fn` now, or as soon as reveals are released. Returns a cancel function. */
export function whenRevealsAllowed(fn) {
  if (!blocked) {
    fn()
    return () => {}
  }
  waiting.add(fn)
  return () => waiting.delete(fn)
}

/** Seconds a reveal should wait before starting (0 when nothing is covering the page). */
export function revealDelay() {
  return Math.max(0, (readyAt - performance.now()) / 1000)
}
