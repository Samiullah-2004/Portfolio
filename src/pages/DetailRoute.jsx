import { useParams } from 'react-router-dom'
import DetailPage from './DetailPage'
import NotFound from './NotFound'
import { getProject, projects } from '../data/projects'
import { experiences, getExperience } from '../data/experience'

const projectEntry = (p) => {
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  return {
    title: p.title,
    subtitle: p.subtitle,
    label: p.label ?? `${p.type ?? 'Personal project'} · ${p.year}`,
    meta: [
      { label: 'Year', value: p.year },
      { label: 'Role', value: p.role },
      p.status ? { label: 'Status', value: p.status } : { label: 'Type', value: p.type ?? 'Personal project' },
      p.deployed ? { label: 'Deployed', value: p.deployed } : { label: 'Source', value: 'GitHub' },
    ],
    stats: p.stats,
    about: p.about,
    stack: p.stack,
    featuresTitle: p.featuresTitle ?? 'Key features',
    groups: [{ items: p.features }],
    images: p.images,
    imageCaption: p.imageCaption,
    live: p.live,
    liveLabel: p.liveLabel,
    repo: p.repo,
    related: p.related,
    next: { to: `/${next.slug}`, title: next.title, kind: 'project' },
  }
}

const experienceEntry = (e) => {
  const next = experiences[(experiences.indexOf(e) + 1) % experiences.length]
  return {
    title: e.company,
    subtitle: `${e.role} · ${e.period}`,
    label: e.current ? 'Experience · Current role' : 'Experience',
    meta: e.meta,
    about: e.about,
    stack: e.stack,
    featuresTitle: 'Key contributions',
    groups: e.groups,
    images: e.images,
    imageCaption: e.imageCaption,
    live: e.link,
    liveLabel: e.linkLabel,
    related: e.related,
    next: { to: `/${next.slug}`, title: next.company, kind: 'experience' },
  }
}

/** Resolves /:slug to a project or an experience page. Keyed by slug so each page mounts fresh. */
const DetailRoute = () => {
  const { slug } = useParams()
  const project = getProject(slug)
  if (project) return <DetailPage key={slug} entry={projectEntry(project)} />
  const experience = getExperience(slug)
  if (experience) return <DetailPage key={slug} entry={experienceEntry(experience)} />
  return <NotFound />
}

export default DetailRoute
