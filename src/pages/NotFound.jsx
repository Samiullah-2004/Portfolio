import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ButtonLink } from '../components/Buttons'

const NotFound = () => {
  const ref = useRef(null)
  useReveal(ref)
  useDocumentTitle('Page not found')

  return (
    <section ref={ref} className="flex min-h-[85svh] items-center pt-28">
      <div className="container-page">
        <p data-reveal="fade" className="eyebrow">Error 404</p>
        <h1 data-split="chars" className="mt-4 font-anton text-[clamp(4rem,18vw,13rem)] uppercase leading-[0.9] tracking-tight text-white">
          Lost<span className="text-neon">?</span>
        </h1>
        <p data-reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
          This page doesn't exist, or it has moved. Let's get you back to the good stuff.
        </p>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/">Back home</ButtonLink>
          <ButtonLink to="/all-projects" variant="ghost">
            Browse projects
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export default NotFound
