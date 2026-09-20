import ExperienceDetail from './ExperienceDetail'

const imageModules = import.meta.glob('./images/DecodeLabs*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const images = Object.keys(imageModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => imageModules[k])

const data = {
  company: 'Decode Labs',
  meta: [
    { label: 'Period', value: 'July 2026' },
    { label: 'Role', value: 'Web Development Intern' },
    { label: 'Stack', value: 'JavaScript · DOM · Git · GitHub' },
    { label: 'Type', value: 'Internship · Remote' },
  ],
  about:
    'Remote web development internship at Decode Labs, run as structured weekly assignments in an asynchronous environment. All work was submitted through GitHub, reviewed by supervisors, and certified after approval.',
  features: [
    {
      icon: '📦',
      title: 'Weekly Assignments',
      desc: 'Delivered structured weekly full-stack assignments in a remote, asynchronous environment.',
    },
    {
      icon: '🌿',
      title: 'Clean Git History',
      desc: 'Maintained clean GitHub commit histories across concurrent deliverables.',
    },
    {
      icon: '🧩',
      title: 'Vanilla JS DOM Curriculum',
      desc: 'Completed a vanilla JavaScript DOM manipulation curriculum, approved and certified by supervisors after GitHub-based review.',
    },
  ],
}

const DecodeLabs = () => <ExperienceDetail {...data} images={images} />

export default DecodeLabs
