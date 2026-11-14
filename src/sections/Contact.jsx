import { useRef } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCopyEmail } from '../hooks/useCopyEmail'
import { scrollToTarget } from '../hooks/useLenis.jsx'
import { site, socials } from '../data/site'
import { socialIcon } from '../components/BrandIcons'
import { MotionToggle } from '../components/MotionControls'

const Contact = () => {
  const ref = useRef(null)
  useReveal(ref)
  const { copied, copy } = useCopyEmail()

  return (
    <footer id="contact" ref={ref} className="relative pb-8 pt-[clamp(5rem,11vw,9rem)]">
      <div className="container-page">
        <p data-reveal="fade" className="eyebrow flex items-center gap-3">
          <span className="pulse-dot h-2 w-2 rounded-full bg-neon" />
          Have a project in mind?
        </p>

        <h2 className="mt-6 font-anton uppercase leading-[0.92] tracking-tight">
          <span data-split="chars" className="block text-[clamp(3rem,11vw,8.5rem)] text-white">
            Let's build
          </span>
          <span data-split="chars" className="block text-[clamp(3rem,11vw,8.5rem)] text-white">
            Something <span className="text-neon">great</span>
          </span>
        </h2>

        <a
          data-reveal
          href={`mailto:${site.email}`}
          className="group mt-12 inline-flex max-w-full items-center gap-3 font-anton text-[clamp(1.15rem,5vw,3.4rem)] tracking-tight text-[#cfcfcf] transition-colors duration-300 hover:text-neon"
        >
          <span className="break-all">{site.email}</span>
          <ArrowUpRight className="h-[0.8em] w-[0.8em] shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="mt-10 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p data-reveal className="max-w-md text-[16px] leading-relaxed text-muted">
              Whether it's a full-time remote role, a freelance build or a quick question, my inbox is always open.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-neon px-6 py-3.5 text-[14px] font-semibold text-[#0a0a0a] transition-[background-color,transform] duration-300 hover:bg-white active:scale-[0.97]"
              >
                <Mail className="h-4 w-4" />
                Send an email
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-neon hover:text-neon active:scale-[0.97]"
                aria-live="polite"
              >
                {copied ? <Check className="h-4 w-4 text-neon" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied to clipboard' : 'Copy email'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div data-reveal>
              <p className="eyebrow">Socials</p>
              <ul className="mt-4 flex flex-col gap-3">
                {socials.map((s) => {
                  const Icon = socialIcon[s.id]
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-[15px] text-[#c8c8c8] transition-colors duration-300 hover:text-neon"
                      >
                        <Icon className="h-4 w-4" />
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div data-reveal>
              <p className="eyebrow">Based in</p>
              <p className="mt-4 text-[15px] text-[#c8c8c8]">{site.location}</p>
              <p className="eyebrow mt-7">Open to</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#c8c8c8]">Remote full-stack roles & freelance projects</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed &amp; built by{' '}
            <a
              href={socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8c8c8] transition-colors duration-300 hover:text-neon"
            >
              Samiullah
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <MotionToggle />
          <button
            type="button"
            onClick={() => scrollToTarget(0, { duration: 1.6 })}
            className="group inline-flex items-center gap-2 uppercase tracking-[0.18em] transition-colors duration-300 hover:text-neon"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-neon">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
