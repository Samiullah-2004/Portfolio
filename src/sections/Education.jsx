import { useRef } from 'react'
import { Award, GraduationCap } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { certifications, education } from '../data/education'

const Education = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="education" ref={ref} className="section">
      <div className="container-page">
        <SectionHeading index="05" kicker="Learning" title="Education" />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Degree */}
          <article data-reveal="scale" className="glass relative overflow-hidden rounded-3xl p-7 md:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon/10 blur-3xl" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <p className="eyebrow mt-7">{education.period}</p>
            <h3 className="mt-3 font-anton text-[clamp(1.75rem,3.2vw,2.5rem)] uppercase leading-[1.05] tracking-tight text-white">
              {education.degree}
            </h3>
            <p className="mt-3 text-[16px] text-[#c4c4c4]">
              {education.school}, {education.location}
            </p>

            <div className="mt-7 flex items-end gap-3 border-t border-white/10 pt-6">
              <span className="font-anton text-5xl leading-none text-neon">{education.cgpa.split(' ')[0]}</span>
              <span className="pb-1 text-[13px] text-muted">CGPA {education.cgpa.split(' ').slice(1).join(' ')}</span>
            </div>

            <p className="eyebrow mt-7 !text-[11px]">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="tech-chip">
                  {c}
                </li>
              ))}
            </ul>
          </article>

          {/* Certifications */}
          <article data-reveal="scale" className="glass rounded-3xl p-7 md:p-9">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-anton text-[clamp(1.5rem,2.6vw,2rem)] uppercase tracking-tight text-white">
                Certifications
              </h3>
              <span className="text-[13px] text-muted">{String(certifications.length).padStart(2, '0')}</span>
            </div>
            <ul className="mt-6">
              {certifications.map((c) => (
                <li key={c.title} className="group flex gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-2">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-soft transition-colors duration-300 group-hover:border-neon/60 group-hover:text-neon">
                    <Award className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold leading-snug text-white">{c.title}</p>
                    <p className="mt-1 text-[13px] text-muted">{c.issuer}</p>
                    {c.detail && <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.detail}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Education
