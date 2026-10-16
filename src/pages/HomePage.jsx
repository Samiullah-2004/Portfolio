import Hero from '../sections/Hero'
import About from '../sections/About'
import Stack from '../sections/Stack'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Education from '../sections/Education'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const HomePage = () => {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Education />
    </>
  )
}

export default HomePage
