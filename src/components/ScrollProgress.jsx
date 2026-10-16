import { useEffect, useRef } from 'react'

/**
 * Scroll progress — a vertical pill on the right (desktop) and a hairline across
 * the top (phones). Written straight to the DOM; no React state per frame.
 */
const ScrollProgress = () => {
  const barRef = useRef(null)
  const topRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`
      if (topRef.current) topRef.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-[120px] w-1.5 -translate-y-1/2 overflow-hidden rounded-full border border-white/5 bg-white/10 transition-opacity duration-300 md:block xl:right-8 [html[data-menu-open]_&]:opacity-0">
        <div ref={barRef} className="h-full w-full origin-top rounded-full bg-neon" style={{ transform: 'scaleY(0)' }} />
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] md:hidden">
        <div ref={topRef} className="h-full w-full origin-left bg-neon" style={{ transform: 'scaleX(0)' }} />
      </div>
    </>
  )
}

export default ScrollProgress
