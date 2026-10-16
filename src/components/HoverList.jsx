import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { TLink } from './TransitionLink'

gsap.registerPlugin(useGSAP)

const FINE_POINTER = '(hover: hover) and (pointer: fine) and (min-width: 768px)'

/**
 * A big editorial list (projects, experience). On desktop a preview image floats
 * next to the cursor and cross-fades between rows; on touch screens each row
 * shows its own thumbnail instead.
 *
 * items: [{ key, to, title, meta: string[], summary?, image, badge? }]
 */
const HoverList = ({ items, cursorLabel = 'View' }) => {
  const previewRef = useRef(null)
  const api = useRef({ show: () => {}, hide: () => {} })

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(FINE_POINTER, () => {
      const el = previewRef.current
      const imgs = gsap.utils.toArray('img', el)
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.8, rotation: 0 })

      const xTo = gsap.quickTo(el, 'x', { duration: 0.65, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.65, ease: 'power3' })
      const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' })
      let lastX = 0
      let active = -1

      const onMove = (e) => {
        const w = el.offsetWidth
        const vw = window.innerWidth
        // Sit to the right of the pointer, but never leave the screen
        const x = gsap.utils.clamp(w / 2 + 16, vw - w / 2 - 16, e.clientX + w / 2 + 48)
        xTo(x)
        yTo(e.clientY)
        rTo(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.35))
        lastX = e.clientX
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      api.current.show = (i) => {
        if (i !== active) {
          imgs.forEach((img, j) =>
            gsap.to(img, { autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.08, duration: 0.45, ease: 'power3.out', overwrite: true })
          )
          active = i
        }
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'expo.out', overwrite: 'auto' })
      }
      api.current.hide = () => {
        active = -1
        gsap.to(el, { autoAlpha: 0, scale: 0.8, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
      }

      return () => {
        window.removeEventListener('pointermove', onMove)
        api.current = { show: () => {}, hide: () => {} }
      }
    })
    return () => mm.revert()
  })

  return (
    <>
      <ul className="relative" onPointerLeave={() => api.current.hide()}>
        {items.map((item, i) => (
          <li key={item.key} data-reveal className="border-t border-white/10 last:border-b">
            <TLink
              to={item.to}
              data-cursor="view"
              data-cursor-label={cursorLabel}
              onPointerEnter={() => api.current.show(i)}
              className="group relative grid grid-cols-[auto_1fr] items-start gap-x-4 py-7 sm:gap-x-8 md:grid-cols-[auto_1fr_auto] md:py-9"
            >
              <span className="pt-1 font-roboto-flex text-[13px] tracking-tighter text-muted transition-colors duration-300 group-hover:text-neon md:pt-2 md:text-[15px]">
                _{String(i + 1).padStart(2, '0')}.
              </span>

              <div className="min-w-0">
                {/* Touch / small screens: inline thumbnail */}
                {item.image && (
                  <div className="mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:pointer-fine:hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}

                <h3 className="relative overflow-hidden font-anton text-[clamp(1.9rem,5.2vw,3.4rem)] uppercase leading-[1.02] tracking-tight">
                  <span className="block text-soft transition-opacity duration-500">{item.title}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block -translate-x-full text-neon transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-focus-visible:translate-x-0"
                  >
                    {item.title}
                  </span>
                </h3>

                {item.badge && (
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neon">
                    {item.badge}
                  </span>
                )}

                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {item.meta.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-[13px] tracking-wide text-muted sm:text-[14px]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6a6a6a] transition-colors duration-300 group-hover:bg-neon" />
                      {m}
                    </li>
                  ))}
                </ul>

                {item.summary && (
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#b8b8b8] sm:text-[15px]">{item.summary}</p>
                )}
              </div>

              <span className="hidden h-14 w-14 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-neon group-hover:bg-neon group-hover:text-[#0a0a0a] md:grid">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </TLink>
          </li>
        ))}
      </ul>

      {createPortal(
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[16/10] w-[clamp(300px,30vw,480px)] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:pointer-fine:block"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          {items.map((item) => (
            <img
              key={item.key}
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{ opacity: 0 }}
            />
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

export default HoverList
