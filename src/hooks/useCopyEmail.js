import { useCallback, useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

/** Copies the contact email to the clipboard; `copied` is true for 2 seconds afterwards. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Clipboard can be unavailable (insecure context / denied) — fall back to a hidden textarea
      const ta = document.createElement('textarea')
      ta.value = site.email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }, [])

  return { copied, copy }
}
