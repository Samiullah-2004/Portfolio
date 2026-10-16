import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { prefersReducedMotion } from '../hooks/useLenis.jsx'
import { usePageTransition, TLink } from '../components/TransitionLink'
import { ButtonLink } from '../components/Buttons'
import StackGallery from '../components/StackGallery'
import { GitHubIcon } from '../components/BrandIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Eyebrow = ({ children }) => (
  <p data-reveal="fade" className="eyebrow mb-6 flex items-center gap-3">
    <span className="h-px w-8 bg-neon" />
    {children}
  </p>
)

/**
 * One template for every project and experience page.
 *
 * entry: {
 *   title, subtitle, label, meta: [{label, value}], stats?, about: string[], stack: string[],
 *   groups: [{ title?, items: [{icon, title, desc}] }], featuresTitle,
 *   images: string[], imageCaption?, live?, liveLabel?, repo?, related?, next: { to, title, kind }
 * }
 */
const DetailPage = ({ entry }) => {
  const ref = useRef(null)
  const { go } = usePageTransition()
  useReveal(ref, { dependencies: [entry.title] })
  useDocumentTitle(entry.title)

  // Cover image: the frame opens up from an inset as it scrolls in (nothing is cropped at rest)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const frame = ref.current.querySelector('[data-cover]')
      if (!frame) return
      gsap.fromTo(
        frame,
        { clipPath: 'inset(7% 7% 7% 7% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top 95%', end: 'top 40%', scrub: true },
        }
      )
    },
    { scope: ref, dependencies: [entry.title] }
  )

  const [cover, ...gallery] = entry.images

  return (
    <article ref={ref} className="pb-10 pt-28 md:pt-36">
      <div className="container-page">
        <button
          type="button"
          data-reveal="fade"
          onClick={() => go(-1)}
          className="group mb-10 inline-flex items-center gap-2 text-[14px] text-muted transition-colors duration-300 hover:text-neon"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-neon">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </span>
          Back
        </button>

        {/* ── Title ───────────────────────────────────────────────────────── */}
        <p data-reveal="fade" className="eyebrow mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-neon" />
          {entry.label}
        </p>
        <h1
          data-split="chars"
          className="font-anton text-[clamp(3rem,10.5vw,8.5rem)] uppercase leading-[0.92] tracking-tight text-white"
        >
          {entry.title}
        </h1>
        {entry.subtitle && (
          <p data-reveal className="mt-5 max-w-3xl text-[clamp(1.1rem,2.2vw,1.6rem)] font-light leading-snug text-[#bdbdbd]">
            {entry.subtitle}
          </p>
        )}

        {(entry.live || entry.repo || entry.related) && (
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            {entry.live && (
              <ButtonLink href={entry.live} icon="external">
                {entry.liveLabel || 'Live site'}
              </ButtonLink>
            )}
            {entry.repo && (
              <a
                href={entry.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-neon hover:text-neon active:scale-[0.97]"
              >
                <GitHubIcon className="h-4 w-4" />
                Source code
              </a>
            )}
            {entry.related && (
              <ButtonLink to={entry.related.to} variant="ghost">
                {entry.related.label}
              </ButtonLink>
            )}
          </div>
        )}

        {/* ── Meta ────────────────────────────────────────────────────────── */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4">
          {entry.meta.map((m) => (
            <div key={m.label} data-reveal>
              <dt className="eyebrow !text-[11px]">{m.label}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-white md:text-[16px]">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* ── Cover ───────────────────────────────────────────────────────── */}
        {cover && (
          <div data-reveal="fade" className="mt-12 md:mt-16">
            <div data-cover className="overflow-hidden rounded-[clamp(12px,2vw,24px)] border border-white/10 bg-[#121212]">
              <img
                src={cover}
                alt={`${entry.title} preview`}
                fetchPriority="high"
                decoding="async"
                onLoad={() => ScrollTrigger.refresh()}
                className="block h-auto min-h-[160px] w-full"
              />
            </div>
          </div>
        )}

        {/* ── Stats ───────────────────────────────────────────────────────── */}
        {entry.stats && (
          <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {entry.stats.map((s) => (
              <div key={s.label} data-reveal="scale" className="glass flex flex-col-reverse rounded-2xl p-5 md:p-6">
                <dt className="mt-2 text-[13px] leading-snug text-muted">{s.label}</dt>
                <dd className="font-anton text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none text-neon">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* ── Overview ────────────────────────────────────────────────────── */}
        <section className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <Eyebrow>Overview</Eyebrow>
          <div className="flex max-w-3xl flex-col gap-5">
            {entry.about.map((para, i) => (
              <p
                key={i}
                data-reveal
                className={
                  i === 0
                    ? 'text-[clamp(1.2rem,2.1vw,1.6rem)] font-light leading-relaxed text-white'
                    : 'text-[16px] leading-relaxed text-muted md:text-[17px]'
                }
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ── Stack ───────────────────────────────────────────────────────── */}
        <section className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <Eyebrow>Tech stack</Eyebrow>
          <ul className="flex flex-wrap gap-2.5">
            {entry.stack.map((t) => (
              <li key={t} data-reveal="fade" className="tech-chip">
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Features / contributions ────────────────────────────────────── */}
        <section className="mt-20 md:mt-28">
          <Eyebrow>{entry.featuresTitle}</Eyebrow>
          {entry.groups.map((group, gi) => (
            <div key={group.title ?? gi} className={gi > 0 ? 'mt-14' : ''}>
              {group.title && (
                <h3 data-reveal className="mb-6 font-anton text-[clamp(1.6rem,3vw,2.25rem)] uppercase tracking-tight text-soft">
                  {group.title}
                </h3>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    data-reveal="scale"
                    className="glass group rounded-3xl p-6 transition-colors duration-500 hover:border-neon/40 md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-white transition-colors duration-500 group-hover:bg-neon group-hover:text-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-[17px] font-semibold leading-snug text-white">{title}</h4>
                        <p className="mt-2 text-[14px] leading-relaxed text-muted md:text-[15px]">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── Gallery ─────────────────────────────────────────────────────── */}
        {gallery.length > 0 && (
          <section className="mt-20 md:mt-28">
            <Eyebrow>Gallery</Eyebrow>
            {entry.imageCaption && (
              <p data-reveal className="-mt-2 mb-10 max-w-2xl text-[15px] text-muted">
                {entry.imageCaption}
              </p>
            )}
            <StackGallery images={gallery} title={entry.title} />
          </section>
        )}

        {/* ── Next ────────────────────────────────────────────────────────── */}
        {entry.next && (
          <TLink
            to={entry.next.to}
            data-cursor="view"
            data-cursor-label="Next"
            className="group mt-24 block border-t border-white/10 pt-10 md:mt-32"
          >
            <span className="eyebrow">Next {entry.next.kind}</span>
            <span className="mt-4 flex items-center justify-between gap-6">
              <span className="relative block overflow-hidden font-anton text-[clamp(2.5rem,8vw,6.5rem)] uppercase leading-[0.95] tracking-tight">
                <span className="block text-soft">{entry.next.title}</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block -translate-x-full text-neon transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
                >
                  {entry.next.title}
                </span>
              </span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-neon group-hover:bg-neon group-hover:text-[#0a0a0a] md:h-20 md:w-20">
                <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </span>
          </TLink>
        )}
      </div>
    </article>
  )
}

export default DetailPage
