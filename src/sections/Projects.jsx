import { useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import HoverList from '../components/HoverList'
import { ButtonLink } from '../components/Buttons'
import { useReveal } from '../hooks/useReveal'
import { featuredProjects, projects, toListItem } from '../data/projects'

const items = featuredProjects.map(toListItem)

const Projects = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container-page">
        <SectionHeading
          index="04"
          kicker="Work"
          title="Selected Projects"
          aside="A few products I've designed, built and deployed, from a live AI video SaaS to RAG chatbots and real-time apps."
        />
        <HoverList items={items} />
        <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink to="/all-projects" variant="ghost">
            See all {projects.length} projects
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export default Projects
