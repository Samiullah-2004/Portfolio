import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { dismissMotionOffer, setReducedMotion, shouldOfferReducedMotion, useReducedMotion } from '../lib/motion'
import { whenRevealsAllowed } from '../lib/intro'

/** On/off switch for the site's animations (menu + footer). The choice is remembered. */
export const MotionToggle = ({ className = '' }) => {
  const reduced = useReducedMotion()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!reduced}
      onClick={() => setReducedMotion(!reduced)}
      className={`group inline-flex items-center gap-3 text-[13px] text-muted transition-colors duration-300 hover:text-white ${className}`}
    >
      <span
        className={`relative h-5 w-9 rounded-full border transition-colors duration-300 ${
          reduced ? 'border-white/20 bg-white/5' : 'border-neon/60 bg-neon/20'
        }`}
      >
        <span
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all duration-300 ${
            reduced ? 'left-1 bg-muted' : 'left-[18px] bg-neon'
          }`}
        />
      </span>
      Animations {reduced ? 'off' : 'on'}
    </button>
  )
}

/**
 * Shown once, only to visitors whose device asks for reduced motion: the site animates by
 * default, so they get a one-tap way to calm it down.
 */
export const MotionHint = () => {
  const [state, setState] = useState('idle') // idle → shown → hidden

  useEffect(() => {
    if (!shouldOfferReducedMotion()) return
    let timer = 0
    // wait until the intro has lifted, then a moment more
    const cancel = whenRevealsAllowed(() => {
      timer = window.setTimeout(() => {
        dismissMotionOffer() // offered once; never nag
        setState('shown')
        timer = window.setTimeout(() => setState('hidden'), 14000)
      }, 2600)
    })
    return () => {
      cancel()
      window.clearTimeout(timer)
    }
  }, [])

  if (state === 'idle') return null
  const visible = state === 'shown'

  return (
    <div
      role="status"
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed bottom-4 left-1/2 z-[80] flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-white/12 bg-[#141416]/90 py-2 pl-5 pr-2 text-[13px] text-soft shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out-expo)] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="hidden sm:inline">Animations are on.</span>
      <button
        type="button"
        onClick={() => {
          setReducedMotion(true)
          setState('hidden')
        }}
        className="rounded-full bg-white/10 px-3.5 py-1.5 font-medium text-white transition-colors duration-300 hover:bg-neon hover:text-ink"
      >
        Reduce motion
      </button>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setState('hidden')}
        className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
