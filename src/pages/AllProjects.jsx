import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import HoverList from '../components/HoverList'
import { Spinner } from '../components/SectionHeading'
import { usePageTransition } from '../components/TransitionLink'
import { useReveal } from '../hooks/useReveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projects, toListItem } from '../data/projects'

const items = projects.map(toListItem)

const AllProjects = () => {
  const ref = useRef(null)
  const { go } = usePageTransition()
  useReveal(ref)
  useDocumentTitle('All Projects')

  return (
    <section ref={ref} className="pb-10 pt-28 md:pt-36">
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

        <p data-reveal="fade" className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-neon">{String(projects.length).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-white/20" />
          Archive
        </p>
        <div className="flex items-center gap-4">
          <span data-reveal="fade">
            <Spinner className="h-10 w-10 md:h-14 md:w-14" />
          </span>
          <h1 data-split="chars" className="font-anton text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.92] tracking-tight text-white">
            All Projects
          </h1>
        </div>
        <p data-reveal className="mb-14 mt-6 max-w-2xl text-[16px] leading-relaxed text-muted md:mb-20 md:text-[17px]">
          Everything I've built, from client SaaS and AI products to real-time experiments and the small apps where I
          learned the fundamentals.
        </p>

        <HoverList items={items} />
      </div>
    </section>
  )
}

export default AllProjects
