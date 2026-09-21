import { currentPath } from '../hooks/usePathname'

export default function AppLink({ to, children, onClick, ...props }) {
  function handleClick(event) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target
    ) {
      return
    }

    event.preventDefault()
    if (currentPath() !== to) {
      window.history.pushState(null, '', to)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
