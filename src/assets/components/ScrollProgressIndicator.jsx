import React, { useEffect, useRef, useState } from 'react'

const ScrollProgressIndicator = () => {
  const scrollBarRef = useRef(null)
  const [isHidden, setIsHidden] = useState(false) 

  useEffect(() => {
    const handleScroll = () => {
      if (scrollBarRef.current) {
        const { scrollHeight, clientHeight } = document.documentElement
        const scrollableHeight = scrollHeight - clientHeight
        
        if (scrollableHeight <= 0) return

        const scrollY = window.scrollY
        const scrollProgress = (scrollY / scrollableHeight) * 100

        scrollBarRef.current.style.transform = `translateY(-${100 - scrollProgress}%)`
      }
    }

    const handleNavState = (e) => {
      setIsHidden(e.detail.isOpen)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('navStateChange', handleNavState) // Listen to Home.jsx

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
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