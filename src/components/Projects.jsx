import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useSectionReveal } from '../hooks/useSectionReveal'
import StoweWeb    from '../projects/images/StoweWeb.png'
import ChatSparkWeb  from '../projects/images/ChatSpark.png'
import CodeMeetWeb  from '../projects/images/CodeMeetWeb.png'
import ComptoirWeb from '../projects/images/Comptoir1.png'
import BillMateWeb   from '../projects/images/BillMate.png'
import ResumeForgeWeb from '../projects/images/ResumeForge.png'

gsap.registerPlugin(useGSAP)

const projects = [
  { id: '_01.', title: 'ChatSpark AI',    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'pgvector', 'Groq', 'NextAuth.js'], link: '/chatspark',     image: ChatSparkWeb   },
  { id: '_02.', title: 'CodeMeet AI',    tags: ['Next.js', 'TypeScript', 'WebRTC', 'Socket.IO', 'DynamoDB', 'Gemini AI'],   link: '/codemeet',      image: CodeMeetWeb    },
  { id: '_03.', title: 'Comptoir',        tags: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Socket.IO', 'Stripe'],      link: '/comptoir',      image: ComptoirWeb    },
  { id: '_04.', title: 'BillMate',        tags: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma'],      link: '/billmate',      image: BillMateWeb    },
  { id: '_05.', title: 'ResumeForge AI',  tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Groq', 'JWT'],           link: '/resumeforge',   image: ResumeForgeWeb },
  { id: '_06.', title: 'Stowe',           tags: ['MongoDB', 'Express', 'Node.js', 'JWT', 'Multer'],                         link: '/stowe',         image: StoweWeb       },
]

const Projects = () => {
  const containerRef      = useRef(null)
  const imageContainerRef = useRef(null)
  // Track hovered project via ref — no setState on mousemove
  const hoveredProjectRef = useRef(null)

  useSectionReveal({ id: 'projects', selector: '.proj-item', containerRef })

  // Mousemove: update preview position (no React state, passive listener)
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  const handleMouseEnter = (projectTitle) => {
    if (window.innerWidth < 768) return
    hoveredProjectRef.current = projectTitle

    // Swap image directly via data-title — no React re-render
    if (imageContainerRef.current) {
      imageContainerRef.current.querySelectorAll('img[data-title]').forEach((img) => {
        img.style.opacity = img.dataset.title === projectTitle ? '1' : '0'
      })
      gsap.killTweensOf(imageContainerRef.current)
      gsap.to(imageContainerRef.current, {
        opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    hoveredProjectRef.current = null
    gsap.killTweensOf(imageContainerRef.current)
    gsap.to(imageContainerRef.current, {
      opacity:  0,
      scale:    0.95,
      duration: 0.2,
      ease:     'power2.in',
    })
  }

  return (
    <div
      id="projects"
      ref={containerRef}
      className='relative grid grid-cols-[16px_1fr] sm:grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] min-h-[75vh] md:h-[140vh] text-[#ffffff] overflow-clip'
    >
      <div></div>

      <div
        ref={imageContainerRef}
        className="hidden md:block absolute right-16 top-0 z-20 pointer-events-none opacity-0 w-[350px] lg:w-[460px] xl:w-[600px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl"
        style={{ willChange: 'transform, opacity' }}
      >
        {projects.map((p) => (
          <img
            key={p.title}
            src={p.image}
            alt={p.title}
            data-title={p.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
          />
        ))}
      </div>

      <div className='relative md:sticky md:top-0 md:h-[130vh] !pl-4 sm:!pl-6 md:!pl-12 md:!pt-12 flex flex-col justify-center gap-y-4 md:gap-y-4 lg:gap-y-5 xl:gap-y-6 py-10 md:py-4'>

        <div className='flex items-center gap-x-4 max-w-5xl proj-item'>
          <div
            className="relative w-8 h-8 md:w-10 md:h-10 animate-spin flex-shrink-0"
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
          <h2 className='text-[32px] sm:text-[40px] md:text-[34px] lg:text-[40px] leading-[.95] tracking-tight text-[#06f51ee6] uppercase font-anton'>
            SELECTED PROJECTS
          </h2>
        </div>

        <div className="flex flex-col gap-y-3.5 sm:gap-y-4 md:gap-y-2.5 lg:gap-y-3.5 xl:gap-y-4 max-w-5xl !pr-4 md:!pr-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-row group select-none items-start proj-item"
              onMouseEnter={() => handleMouseEnter(project.title)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-[14px] md:text-[16px] font-roboto-flex font-normal text-[#a0a0a0] tracking-tighter !pt-1 md:!pt-1.5 flex-shrink-0">
                {project.id}
              </p>

              <Link to={project.link} className="!pl-3 sm:!pl-6 gap-y-1 md:gap-y-1.5 flex flex-col flex-1 cursor-pointer">

                <h3 className="text-[28px] sm:text-[36px] md:text-[30px] lg:text-[38px] xl:text-[44px] tracking-tight uppercase font-anton leading-none relative inline-flex items-center gap-3 cursor-pointer overflow-hidden">
                  <span className="text-[#d0cdcdde] flex items-center gap-3">
                    {project.title}
                  </span>

                  <span className="absolute inset-0 text-[#06f51ee6] flex items-center gap-3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out">
                    {project.title}
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
                  {project.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a0a0a0] inline-block flex-shrink-0"></span>
                      <span className="text-[12px] sm:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-wide">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

              </Link>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="max-w-5xl !pr-4 md:!pr-12 proj-item">
          <Link
            to="/all-projects"
            className="group inline-flex items-center gap-x-3 border border-[#06f51ee6] !px-6 !py-3 text-[#06f51ee6] font-roboto-flex text-[14px] tracking-widest uppercase hover:bg-[#06f51ee6] hover:text-black transition-all duration-300"
          >
            See All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Projects