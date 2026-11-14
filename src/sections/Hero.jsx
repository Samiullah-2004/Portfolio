import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { scrollToTarget } from '../hooks/useLenis.jsx'
import { isReducedMotion } from '../lib/motion'
import { TLink } from '../components/TransitionLink'
import { projects } from '../data/projects'
import { site } from '../data/site'

const stats = [
  { value: String(projects.length), label: 'Projects built' },
  { value: '2+', label: 'Years of experience' },
  { value: String(projects.filter((p) => p.ai).length), label: 'AI products shipped' },
]

const Hero = () => {
  const ref = useRef(null)
  useReveal(ref, { start: 'top 95%' })

  // Content drifts up and fades slightly as the hero scrolls away
  useGSAP(
    () => {
      if (isReducedMotion()) return
      gsap.to('[data-hero-parallax]', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref }
  )

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col">
      <div data-hero-parallax className="container-page flex flex-1 flex-col justify-center pb-24 pt-28 md:pb-20 md:pt-32 short:pb-12 short:pt-[5.5rem]">
        <div data-reveal="fade" className="mb-7 short:mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] text-[#cfcfcf] backdrop-blur-md sm:text-[13px]">
          <span className="pulse-dot h-2 w-2 rounded-full bg-neon" />
          {site.availability}
        </div>

        <h1 className="font-anton uppercase leading-[0.9] tracking-tight">
          <span data-split="chars" className="block text-[clamp(3.6rem,min(13.5vw,18svh),10.5rem)] text-neon">
            Full Stack
          </span>
          <span data-split="chars" className="block pl-[0.35em] text-[clamp(3.6rem,min(13.5vw,18svh),10.5rem)] text-white">
            Developer
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-12 short:mt-7 short:gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-xl">
            <p data-reveal className="text-[16px] leading-relaxed text-[#b4b4b4] md:text-[18px] short:md:text-[16px]">
              Hi! I'm <span className="text-white">Samiullah</span>, a Full-Stack Developer who designs, builds and ships
              production web apps: AI-powered SaaS, real-time systems and payment-ready platforms with React, Next.js,
              TypeScript, Node.js and PostgreSQL.
            </p>

            <div data-reveal className="mt-8 short:mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToTarget('contact')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-neon px-6 py-3.5 text-[14px] font-semibold tracking-wide text-[#0a0a0a] transition-[background-color,transform] duration-300 hover:bg-white active:scale-[0.97]"
              >
                Let's talk
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToTarget('projects')}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-neon hover:text-neon active:scale-[0.97]"
              >
                View my work
              </button>
            </div>

            <TLink
              data-reveal
              to={site.current.link}
              className="group mt-8 short:mt-5 flex w-fit items-center gap-3 text-[13px] text-muted transition-colors duration-300 hover:text-white sm:text-[14px]"
            >
              <span className="eyebrow !text-[11px] !text-neon">Now</span>
              <span>
                {site.current.role} at <span className="text-white">{site.current.company}</span>, building{' '}
                {site.current.product}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </TLink>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="lg:text-right">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-anton text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-neon">{s.value}</dd>
                <dd className="mt-2 text-[12px] leading-snug text-muted sm:text-[13px]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div data-reveal="fade" className="container-page pointer-events-none absolute inset-x-0 bottom-6 hidden items-center gap-3 md:flex">
        <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/15" />
        <span className="eyebrow !text-[10px]">Scroll</span>
      </div>
    </section>
  )
}

export default Hero
