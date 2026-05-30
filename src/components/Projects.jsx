import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import PasteWeb   from '../projects/images/PasteWeb.png'
import CryptoWeb  from '../projects/images/CryptoWeb.png'
import SkycastWeb from '../projects/images/SkycastWeb.png'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  { id: '_01.', title: 'Paste App',       tags: ['React', 'Tailwind CSS', 'Vercel'],   link: '/pasteapp',      image: PasteWeb   },
  { id: '_02.', title: 'Crypto Tracker',  tags: ['JavaScript', 'CSS', 'Binance API'],  link: '/cryptotracker', image: CryptoWeb  },
  { id: '_03.', title: 'Skycast Weather', tags: ['JavaScript', 'CSS', 'OpenWeather'],  link: '/skycast',       image: SkycastWeb },
]

const Projects = () => {
  const containerRef      = useRef(null)
  const imageContainerRef = useRef(null)
  const [hoveredProject, setHoveredProject] = useState(null)

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        id: 'projects-in',
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    }).from('.proj-item', { y: 150, opacity: 0, stagger: 0.05 })
  }, { scope: containerRef })

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        id: 'projects-out',
        trigger: containerRef.current,
        start: 'bottom 50%',
        end: 'bottom 10%',
        scrub: 0.5,
      },
    }).to('.proj-item', { y: -150, opacity: 0, stagger: 0.02 })
  }, { scope: containerRef })

  useGSAP((context, contextSafe) => {
    if (window.innerWidth < 768) return

    const handleMouseMove = contextSafe((e) => {
      if (!containerRef.current || !imageContainerRef.current) return

      const rect      = containerRef.current.getBoundingClientRect()
      const imgRect   = imageContainerRef.current.getBoundingClientRect()
      const offsetTop = e.clientY - rect.top

      const clampedY = Math.min(
        Math.max(offsetTop - imgRect.height / 2, 0),
        rect.height - imgRect.height
      )

      gsap.to(imageContainerRef.current, {
        y:        clampedY,
        duration: 0.35,
        ease:     'power2.out',
      })
    })

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  const handleMouseEnter = (projectTitle) => {
    if (window.innerWidth < 768) return
    gsap.killTweensOf(imageContainerRef.current)
    setHoveredProject(projectTitle)
    gsap.to(imageContainerRef.current, {
      opacity:  1,
      scale:    1,
      duration: 0.2,
      ease:     'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf(imageContainerRef.current)
    gsap.to(imageContainerRef.current, {
      opacity:  0,
      scale:    0.95,
      duration: 0.2,
      ease:     'power2.in',
    })
    setHoveredProject(null)
  }

  return (
    <div
      id="projects"
      ref={containerRef}
      className='relative grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] h-[100vh] text-[#ffffff] overflow-hidden'
    >
      <div></div>

      {/* floating image preview */}
      <div
        ref={imageContainerRef}
        className="hidden md:block absolute right-16 top-0 z-20 pointer-events-none opacity-0 w-[350px] lg:w-[460px] xl:w-[700px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl"
        style={{ willChange: 'transform, opacity' }}
      >
        {projects.map((p) => (
          <img
            key={p.title}
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{
              opacity:    hoveredProject === p.title ? 1 : 0,
              transition: 'opacity 0.15s ease',
            }}
          />
        ))}
      </div>

      <div className='sticky top-0 h-screen !pl-6 md:!pl-12 flex flex-col justify-center gap-y-8 md:gap-y-12'>

        <div className='flex items-center gap-x-4 max-w-5xl proj-item will-change-transform'>
          <div
            className="relative w-10 h-10 md:w-12 md:h-12 animate-spin flex-shrink-0"
            style={{ animationDuration: '6s' }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-1.5 h-4 bg-[#06f51ee6] rounded-full top-1/2 left-1/2"
                style={{
                  transform:       `translate(-50%, -100%) rotate(${angle}deg)`,
                  transformOrigin: '50% 100%',
                  opacity:          0.4 + (angle / 300) * 0.6,
                }}
              />
            ))}
          </div>
          <h2 className='text-[36px] sm:text-[48px] md:text-[36px] leading-[.95] tracking-tight text-[#06f51ee6] uppercase font-anton'>
            SELECTED PROJECTS
          </h2>
        </div>

        <div className="flex flex-col gap-y-8 md:gap-y-12 max-w-5xl">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-row group select-none items-start proj-item will-change-transform"
              onMouseEnter={() => handleMouseEnter(project.title)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-[15px] md:text-[18px] font-roboto-flex font-normal text-[#a0a0a0] tracking-tighter !pt-1 md:!pt-2 flex-shrink-0">
                {project.id}
              </p>

              <Link to={project.link} className="!pl-4 md:!pl-6 gap-y-3 flex flex-col flex-1 cursor-pointer">

                <h3 className="text-[32px] sm:text-[40px] md:text-[48px] tracking-tight uppercase font-anton leading-none relative inline-flex items-center gap-3 cursor-pointer overflow-hidden">
                  <span className="text-[#d0cdcdde] flex items-center gap-3">
                    {project.title}
                  </span>

                  <span className="absolute inset-0 text-[#06f51ee6] flex items-center gap-3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out">
                    {project.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
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

                <div className="flex flex-wrap flex-row gap-x-6 md:gap-x-12 gap-y-2">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#a0a0a0] inline-block flex-shrink-0"></span>
                      <span className="text-[13px] md:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-wide">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Projects