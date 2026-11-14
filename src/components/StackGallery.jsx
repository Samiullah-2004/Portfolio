import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { isReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Images load lazily and change the page height — re-measure triggers once they settle.
const refreshSoon = (() => {
  let call = null
  return () => {
    call?.kill()
    call = gsap.delayedCall(0.15, () => ScrollTrigger.refresh())
  }
})()

/**
 * Stacked screenshot cards. Each card is `position: sticky`, so the browser does
 * the pinning (no per-frame layout reads); GSAP only scrubs the scale/shade of a
 * card as the next one slides over it. Screenshots keep their natural aspect ratio.
 */
const StackGallery = ({ images, title }) => {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (isReducedMotion()) return
      const cards = gsap.utils.toArray('[data-card]', ref.current)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap
          .timeline({
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          })
          .to(card.querySelector('[data-card-inner]'), { scale: 0.92, ease: 'none' }, 0)
          .to(card.querySelector('[data-card-shade]'), { opacity: 0.55, ease: 'none' }, 0)
      })
    },
    { scope: ref, dependencies: [images.length] }
  )

  return (
    <div ref={ref} className="relative">
      {images.map((src, i) => (
        <div
          key={src}
          data-card
          className="sticky"
          style={{ top: `calc(12vh + ${i * 16}px)`, marginBottom: i < images.length - 1 ? '10vh' : 0 }}
        >
          <div
            data-card-inner
            className="relative origin-top overflow-hidden rounded-[clamp(12px,2vw,24px)] border border-white/10 bg-[#121212] shadow-[0_-20px_60px_rgba(0,0,0,0.55)] will-change-transform"
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 2}`}
              loading="lazy"
              decoding="async"
              onLoad={refreshSoon}
              className="block h-auto min-h-[120px] w-full"
            />
            <div data-card-shade className="pointer-events-none absolute inset-0 bg-black opacity-0" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StackGallery
