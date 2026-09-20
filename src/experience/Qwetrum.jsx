import ExperienceDetail from './ExperienceDetail'

const imageModules = import.meta.glob('./images/Qwetrum*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const images = Object.keys(imageModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => imageModules[k])

const data = {
  company: 'Qwetrum Technologies',
  meta: [
    { label: 'Period', value: 'June 2026' },
    { label: 'Role', value: 'Web Development Intern' },
    { label: 'Stack', value: 'React · JavaScript · Tailwind CSS · TMDB API' },
    { label: 'Type', value: 'Internship' },
  ],
  about:
    'Web development internship at Qwetrum Technologies, a startup. The internship ran on weekly tasks: each week\'s work was submitted for review with supervisor feedback, and the program ended with a capstone project, Movie Browser. The code was reviewed and the internship certificate was issued after final approval.',
  features: [
    {
      icon: '📅',
      title: 'Weekly Tasks and Reviews',
      desc: 'Submitted structured tasks every week and revised them based on written reviewer feedback.',
    },
    {
      icon: '🎬',
      title: 'Capstone: Movie Browser',
      desc: 'Built Movie Browser, a full-featured React application using custom hooks and the TMDB API for live movie data, including authentication flows and dynamic data rendering.',
    },
    {
      icon: '✅',
      title: 'Reviewed and Certified',
      desc: 'Delivered the capstone after iterative revisions based on weekly supervisor review, ending in final approval and certification.',
    },
  ],
  related: { label: 'View Movie Browser', to: '/moviebrowser' },
}

const Qwetrum = () => <ExperienceDetail {...data} images={images} />

export default Qwetrum
