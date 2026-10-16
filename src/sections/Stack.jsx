import { useRef } from 'react'
import LogoLoop from '../logo/LogoLoop'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { skillCategories, skillCount } from '../data/skills'

const TechPill = ({ item }) => {
  const Icon = item.icon
  return (
    <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-2.5 pr-4 transition-colors duration-300 hover:border-neon/50">
      {item.logo ? (
        <img
          src={item.logo}
          alt=""
          loading="lazy"
          decoding="async"
          className={`!h-[22px] !w-[22px] object-contain ${item.mono ? 'brightness-0 invert' : ''}`}
        />
      ) : (
        <Icon className="h-[20px] w-[20px] text-soft" strokeWidth={1.75} aria-hidden="true" />
      )}
      <span className="whitespace-nowrap text-[14px] text-[#cfcfcf] md:text-[15px]">{item.name}</span>
    </span>
  )
}

const Stack = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="stack" ref={ref} className="section">
      <div className="container-page">
        <SectionHeading
          index="02"
          kicker="Skills"
          title="My Stack"
          aside={`${skillCount} languages, frameworks, services and tools I use to design, build, test and ship.`}
        />

        <div>
          {skillCategories.map((cat, i) => (
            <div
              key={cat.label}
              data-reveal
              className="grid items-center gap-4 border-t border-white/10 py-5 last:border-b md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 md:py-6 lg:grid-cols-[260px_minmax(0,1fr)]"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="font-anton text-[clamp(1.6rem,3vw,2.4rem)] uppercase leading-none tracking-tight text-soft">
                  {cat.label}
                </h3>
                <span className="text-[12px] text-muted">{String(cat.items.length).padStart(2, '0')}</span>
              </div>
              <div className="min-w-0">
                <LogoLoop
                  logos={cat.items}
                  speed={28 + (i % 3) * 6}
                  direction={i % 2 ? 'right' : 'left'}
                  logoHeight={22}
                  gap={12}
                  pauseOnHover
                  fadeOut
                  ariaLabel={`${cat.label}: ${cat.items.map((t) => t.name).join(', ')}`}
                  renderItem={(item) => <TechPill item={item} />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stack
