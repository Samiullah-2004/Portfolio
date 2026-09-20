import { useEffect, useRef, useState } from 'react'
import { globalLenis } from '../../hooks/useLenis.jsx'

/**
 * ScrollProgressIndicator
 *
 * The progress bar is updated by subscribing to the global Lenis scroll event
 * (or a passive window scroll listener as fallback). No React state is used
 * for the scroll position — the bar's transform is written directly to the DOM.
 */
const ScrollProgressIndicator = () => {
  const scrollBarRef = useRef(null)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const updateBar = () => {
      if (!scrollBarRef.current) return
      const { scrollHeight, clientHeight } = document.documentElement
      const scrollableHeight = scrollHeight - clientHeight
      if (scrollableHeight <= 0) return

      const scrollY = window.scrollY
      const progress = (scrollY / scrollableHeight) * 100
      scrollBarRef.current.style.transform = `translateY(-${100 - progress}%)`
    }

    const handleNavState = (e) => {
      setIsHidden(e.detail.isOpen)
    }

    // Initial render
    updateBar()

    // ── Subscribe to scroll ───────────────────────────────────────────────────
    // Prefer the global Lenis 'scroll' event so we stay in sync with Lenis
    // interpolated positions (smoother than discrete native scroll events).
    let unlisten = null
    if (globalLenis) {
      globalLenis.on('scroll', updateBar)
      unlisten = () => globalLenis.off('scroll', updateBar)
    } else {
      // Fallback: native scroll (passive — never blocks scroll thread)
      window.addEventListener('scroll', updateBar, { passive: true })
      unlisten = () => window.removeEventListener('scroll', updateBar)
    }

    window.addEventListener('resize', updateBar, { passive: true })
    window.addEventListener('navStateChange', handleNavState)

    return () => {
      unlisten?.()
      window.removeEventListener('resize', updateBar)
      window.removeEventListener('navStateChange', handleNavState)
    }
  }, [])

  return (
    <div
      className={`fixed top-1/2 right-4 md:right-6 -translate-y-1/2 w-1.5 h-[120px] rounded-full bg-white/10 border border-white/5 overflow-hidden z-50 pointer-events-none transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        ref={scrollBarRef}
        className="w-full bg-[#06f51ee6] rounded-full h-full will-change-transform"
        style={{ transform: 'translateY(-100%)' }}
      ></div>
    </div>
  )
}

export default ScrollProgressIndicator