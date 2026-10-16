/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

/**
 * `go(to)` plays the page curtain, then navigates. `go(-1)` goes back. Provided by RootLayout;
 * the default (e.g. inside an error screen rendered outside the layout) is a plain navigation.
 */
export const TransitionContext = createContext({
  go: (to) => (to === -1 ? window.history.back() : window.location.assign(to)),
})

export const usePageTransition = () => useContext(TransitionContext)

/**
 * A real <a href> (so open-in-new-tab and crawlers work) that runs the page
 * transition on a normal left click.
 */
export function TLink({ to, onClick, children, ...rest }) {
  const { go } = usePageTransition()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
