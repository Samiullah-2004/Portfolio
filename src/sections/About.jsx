import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ArrowUpRight, Brain, Briefcase, CreditCard, Globe, GraduationCap, MapPin, Radio, Rocket } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { isReducedMotion } from '../lib/motion'
import { openSource } from '../data/education'

gsap.registerPlugin(SplitText, useGSAP)

const facts = [
  { icon: MapPin, text: 'Based in Lahore, Pakistan' },
  { icon: Briefcase, text: 'Full-Stack Developer at JayTech Elite Firm' },
  { icon: GraduationCap, text: 'BSCS student, Alhamra University (NCBA&E)' },
  { icon: Globe, text: 'Open to remote roles worldwide' },
]

const strengths = [
  {
    icon: Brain,
    title: 'AI & RAG products',
    desc: 'RAG pipelines built from scratch (chunking, embeddings, pgvector search) and LLM features with Gemini, Groq and MiniMax.',
  },
  {
    icon: Radio,
    title: 'Real-time systems',
    desc: 'WebRTC video, Socket.IO and live AI video streaming with per-second credit billing and clean session recovery.',
  },
  {
    icon: CreditCard,
    title: 'Payments & SaaS billing',
    desc: 'Stripe, Flutterwave and Squad with signed webhooks, idempotent fulfillment, credits, plans and multi-currency pricing.',
  },
  {
    icon: Rocket,
    title: 'Design to deployment',
    desc: 'Design systems and responsive UI, then tests (Jest, Vitest, Playwright), CI/CD, Docker and deploys to Vercel, Railway and Hostinger.',
  },
]

const About = () => {
  const ref = useRef(null)
  useReveal(ref)

  // The statement lights up word by word as it scrolls through the viewport
  useGSAP(
    () => {
      const el = ref.current.querySelector('[data-statement]')
      if (isReducedMotion()) return
      SplitText.create(el, {
        type: 'words',
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
            }
          )
        },
      })
    },
    { scope: ref }
  )

  return (
    <section id="about-me" ref={ref} className="section">
      <div className="container-page">
        <SectionHeading index="01" kicker="About" title="This is me" />

        <p
          data-statement
          className="max-w-5xl text-[clamp(1.75rem,4.4vw,3.5rem)] font-light leading-[1.15] tracking-tight text-white"
        >
          I design, build and ship <span className="font-medium text-neon">end-to-end</span> products, from
          AI-powered SaaS and real-time systems to secure payments and fast, responsive interfaces.
        </p>

        <div data-reveal="fade" className="my-14 h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent md:my-20" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <p data-split className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-tight text-white">
              Hi, I'm Samiullah.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} data-reveal className="flex items-center gap-3 text-[15px] text-[#c4c4c4]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 text-[16px] leading-relaxed text-muted md:text-[17px]">
            <p data-reveal>
              I'm a Full-Stack Developer working across React, Next.js, TypeScript, Node.js and PostgreSQL. I care about
              the whole product: the design system, the API, the database, the payments, the tests and the deployment.
            </p>
            <p data-reveal>
              Right now I'm at <span className="text-white">JayTech Elite Firm</span>, where I designed and built most of{' '}
              <span className="text-white">SmokeScreen V2</span>, a live AI video streaming SaaS: its UI, backend,
              payment integration, admin tools, testing and deployment on Railway and Hostinger. I also fix production
              issues on the live V1.
            </p>
            <p data-reveal>
              Before that I completed web development internships at Qwetrum Technologies and Decode Labs. I'm studying
              for a BSCS at Alhamra University (NCBA&E) and take on freelance projects through Upwork.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {strengths.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              data-reveal="scale"
              className="glass group rounded-3xl p-6 transition-colors duration-500 hover:border-neon/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] text-white transition-colors duration-500 group-hover:bg-neon group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <a
          data-reveal
          href={openSource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-dashed border-white/15 px-5 py-4 text-[14px] text-muted transition-colors duration-300 hover:border-neon/50 hover:text-white"
        >
          <span className="eyebrow !text-[11px] !text-neon">{openSource.title}</span>
          <span>{openSource.text}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

export default About
