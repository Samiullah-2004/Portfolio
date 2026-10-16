import { useEffect } from 'react'
import { site } from '../data/site'

const DEFAULT_TITLE = `${site.name} — ${site.role}`

/** Sets the browser tab title for the current page ("ChatSpark AI — Samiullah Akram"). */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : DEFAULT_TITLE
  }, [title])
}
