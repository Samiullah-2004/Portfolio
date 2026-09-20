import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useSectionReveal } from '../hooks/useSectionReveal'

gsap.registerPlugin(useGSAP)

const allImages = import.meta.glob('../experience/images/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const firstImage = (prefix) => {
  const key = Object.keys(allImages)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .find((k) => k.split('/').pop().startsWith(prefix))
  return key ? allImages[key] : null
}

const experiences = [
  {
    id: '_01.',
    title: 'JayTech Elite Firm',
    meta: ['Full-Stack Developer', 'Sept 2026 - Present'],
    summary:
      'Building SmokeScreen, a live AI video SaaS: portrait mode, bug fixes and the V2 redesign.',
    link: '/jaytech',
    image: firstImage('JayTech'),
  },
  {
    id: '_02.',
    title: 'Qwetrum Technologies',
    meta: ['Web Development Intern', 'June 2026'],
    summary:
      'Weekly tasks under supervisor review, ending in the Movie Browser capstone.',
    link: '/qwetrum',
    image: firstImage('Qwetrum'),
  },
  {
    id: '_03.',
    title: 'Decode Labs',
    meta: ['Web Development Intern', 'July 2026'],
    summary:
      'Weekly remote assignments and a vanilla JS DOM curriculum, certified after review.',
    link: '/decodelabs',
    image: firstImage('DecodeLabs'),
  },
]

const hasPreview = experiences.some((e) => e.image)

const Experience = () => {
  const containerRef = useRef(null)
  const imageContainerRef = useRef(null)
  // Track hovered item via ref — no setState on mousemove
  const hoveredItemRef = useRef(null)

  useSectionReveal({ id: 'experience', selector: '.exp-item', containerRef })

  // Mousemove: update preview image position (no React state)
  useGSAP((context, contextSafe) => {
    if (window.innerWidth < 768 || !hasPreview) return

    const handleMouseMove = contextSafe((e) => {
      if (!containerRef.current || !imageContainerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const imgRect = imageContainerRef.current.getBoundingClientRect()
      const offsetTop = e.clientY - rect.top

      const clampedY = Math.min(
        Math.max(offsetTop - imgRect.height / 2, 0),
        rect.height - imgRect.height
      )

      gsap.to(imageContainerRef.current, {
        y: clampedY,
        duration: 0.35,
        ease: 'power2.out',
      })
    })

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  // Hover enter/leave: show/hide preview, swap image directly via DOM
  const handleMouseEnter = (title) => {
    if (window.innerWidth < 768 || !imageContainerRef.current) return
    hoveredItemRef.current = title

    // Show correct image directly — no setState
    if (imageContainerRef.current) {
      imageContainerRef.current.querySelectorAll('img[data-title]').forEach((img) => {
        img.style.opacity = img.dataset.title === title ? '1' : '0'
      })
      gsap.killTweensOf(imageContainerRef.current)
      gsap.to(imageContainerRef.current, {
        opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    hoveredItemRef.current = null
    if (imageContainerRef.current) {
      gsap.killTweensOf(imageContainerRef.current)
      gsap.to(imageContainerRef.current, {
        opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in',
      })
    }
  }

  return (
    <div
      id="experience"
      ref={containerRef}
      className='relative grid grid-cols-[16px_1fr] sm:grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] min-h-[75vh] md:h-[100vh] text-[#ffffff] overflow-clip'
    >
      <div></div>

      {hasPreview && (
        <div
          ref={imageContainerRef}
          className="hidden md:block absolute right-16 top-0 z-20 pointer-events-none opacity-0 w-[350px] lg:w-[460px] xl:w-[600px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl"
          style={{ willChange: 'transform, opacity' }}
        >
          {experiences.map((e) =>
            e.image ? (
              <img
                key={e.title}
                src={e.image}
                alt={e.title}
                data-title={e.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
              />
            ) : null
          )}
        </div>
      )}

      <div className='relative md:sticky md:top-0 md:h-screen !pl-4 sm:!pl-6 md:!pl-12 flex flex-col justify-center gap-y-4 md:gap-y-4 lg:gap-y-5 xl:gap-y-6 py-10 md:py-4'>

        <div className='flex items-center gap-x-4 max-w-5xl exp-item'>
          <div
            className="relative w-8 h-8 md:w-10 md:h-10 animate-spin flex-shrink-0"
            style={{ animationDuration: '6s' }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-1.5 h-4 bg-[#06f51ee6] rounded-full top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  transformOrigin: '50% 100%',
                  opacity: 0.4 + (angle / 300) * 0.6,
                }}
              />
            ))}
          </div>
          <h2 className='text-[32px] sm:text-[40px] md:text-[34px] lg:text-[40px] leading-[.95] tracking-tight text-[#06f51ee6] uppercase font-anton'>
            EXPERIENCE
          </h2>
        </div>

        <div className="flex flex-col gap-y-6 sm:gap-y-7 md:gap-y-5 lg:gap-y-7 xl:gap-y-9 max-w-5xl !pr-4 md:!pr-12">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-row group select-none items-start exp-item"
              onMouseEnter={() => handleMouseEnter(exp.title)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-[14px] md:text-[16px] font-roboto-flex font-normal text-[#a0a0a0] tracking-tighter !pt-1 md:!pt-1.5 flex-shrink-0">
                {exp.id}
              </p>

              <Link to={exp.link} className="!pl-3 sm:!pl-6 gap-y-1.5 md:gap-y-2 flex flex-col flex-1 cursor-pointer">

                <h3 className="text-[28px] sm:text-[36px] md:text-[30px] lg:text-[38px] xl:text-[44px] tracking-tight uppercase font-anton leading-none relative inline-flex items-center gap-3 cursor-pointer overflow-hidden">
                  <span className="text-[#d0cdcdde] flex items-center gap-3">
                    {exp.title}
                  </span>

                  <span className="absolute inset-0 text-[#06f51ee6] flex items-center gap-3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out">
                    {exp.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 mb-1"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </h3>

                <div className="flex flex-wrap flex-row gap-x-4 sm:gap-x-8 gap-y-2">
                  {exp.meta.map((m, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a0a0a0] inline-block flex-shrink-0"></span>
                      <span className="text-[12px] sm:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-wide">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[13px] sm:text-[14px] md:text-[15px] font-roboto-flex font-normal text-[#c0c0c0] leading-relaxed max-w-xl line-clamp-2">
                  {exp.summary}
                </p>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Experience
