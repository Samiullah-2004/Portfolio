import { useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import HoverList from '../components/HoverList'
import { useReveal } from '../hooks/useReveal'
import { experiences } from '../data/experience'

const items = experiences.map((e) => ({
  key: e.slug,
  to: `/${e.slug}`,
  title: e.company,
  meta: [e.role, e.period],
  summary: e.summary,
  image: e.images[0],
  badge: e.current ? 'Current role' : undefined,
}))

const Experience = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="experience" ref={ref} className="section">
      <div className="container-page">
        <SectionHeading
          index="03"
          kicker="Career"
          title="Experience"
          aside="Where I've worked, what I shipped, and how I grew from internships to building a production SaaS."
        />
        <HoverList items={items} cursorLabel="Read" />
      </div>
    </section>
  )
}

export default Experience
