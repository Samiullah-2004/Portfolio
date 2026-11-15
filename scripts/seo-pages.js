/**
 * Vite build plugin: gives every route its own static HTML file and generates the sitemap.
 *
 * The site is a single-page app, so without this every URL is served the same index.html,
 * whose <head> describes the home page (canonical "/", home title and description). Crawlers
 * and link-preview bots that don't run JavaScript would then see /smokescreen, /jaytech, …
 * as copies of the home page.
 *
 * After the build, this writes dist/<route>.html for every known route (served at /<route>
 * thanks to `cleanUrls` in vercel.json) with the right title, description, canonical and
 * Open Graph tags, plus dist/sitemap.xml — all derived from src/data, so adding a project
 * there is enough.
 */
import fs from 'node:fs'
import path from 'node:path'

const read = (file) => fs.readFileSync(path.resolve(file), 'utf8')

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// The data files import images, so they can't be imported here; read the plain string fields.
const field = (block, name) => {
  const m = block.match(new RegExp(`\\b${name}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`))
  return m ? m[1].replace(/\\'/g, "'") : ''
}
const entries = (source) =>
  source
    .split(/\n\s{4}slug: /)
    .slice(1)
    .map((chunk) => 'slug: ' + chunk)

export function collectRoutes() {
  const siteSrc = read('src/data/site.js')
  const siteUrl = field(siteSrc, 'url').replace(/\/+$/, '')
  const name = field(siteSrc, 'name')

  const projects = entries(read('src/data/projects.js')).map((b) => {
    const title = field(b, 'title')
    const subtitle = field(b, 'subtitle')
    return {
      path: '/' + field(b, 'slug'),
      title: `${title} — ${name}`,
      description: `${title}: ${subtitle}. Designed and built by ${name}, ${field(b, 'role')}.`,
      priority: '0.7',
    }
  })
  const experiences = entries(read('src/data/experience.js')).map((b) => {
    const company = field(b, 'company')
    return {
      path: '/' + field(b, 'slug'),
      title: `${company} — ${name}`,
      description: `${field(b, 'role')} at ${company}. ${field(b, 'summary')}`,
      priority: '0.6',
    }
  })

  return {
    siteUrl,
    routes: [
      { path: '/', priority: '1.0' },
      {
        path: '/all-projects',
        title: `All Projects — ${name}`,
        description: `Every project ${name} has built: client SaaS, AI products, real-time apps and more.`,
        priority: '0.8',
      },
      ...projects,
      ...experiences,
    ],
  }
}

// Replace the content of one tag, tolerating attributes split across lines.
const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 's'),
    (_, a, b) => a + escapeHtml(value) + b
  )

export function renderRouteHtml(template, siteUrl, route) {
  const url = siteUrl + route.path
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = setMeta(html, 'property', 'og:url', url)
  for (const key of ['og:title', 'twitter:title']) html = setMeta(html, key.startsWith('og') ? 'property' : 'name', key, route.title)
  html = setMeta(html, 'name', 'description', route.description)
  for (const key of ['og:description', 'twitter:description'])
    html = setMeta(html, key.startsWith('og') ? 'property' : 'name', key, route.description)
  return html
}

export default function seoPages() {
  let outDir = 'dist'
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const { siteUrl, routes } = collectRoutes()
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      for (const route of routes) {
        if (route.path === '/') continue
        const html = renderRouteHtml(template, siteUrl, route)
        if (!html.includes(`href="${siteUrl}${route.path}"`)) throw new Error(`seo-pages: canonical not set for ${route.path}`)
        fs.writeFileSync(path.join(outDir, route.path.slice(1) + '.html'), html)
      }
      const today = new Date().toISOString().slice(0, 10)
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        routes
          .map((r) => `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`)
          .join('\n') +
        '\n</urlset>\n'
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
      this.info?.(`seo-pages: ${routes.length - 1} route pages + sitemap (${routes.length} URLs)`)
    },
  }
}
