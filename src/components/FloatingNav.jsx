import { useEffect, useState } from 'react'
import { pages } from '../data/navigation'
import AppLink from './AppLink'
import Arrow from './Arrow'

export default function FloatingNav({ pathname }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = document.querySelector('.site-header')
    if (!header) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting)
    })
    observer.observe(header)

    return () => observer.disconnect()
  }, [pathname])

  return (
    <nav
      className={`floating-nav ${visible ? 'floating-nav--visible' : ''}`}
      aria-label="Quick navigation"
      inert={!visible}
    >
      {pages.map((page) => (
        <AppLink
          key={page.path}
          to={page.path}
          className={`floating-nav__link ${page.path === '/contact' ? 'floating-nav__link--contact' : ''} ${pathname === page.path ? 'floating-nav__link--active' : ''}`}
          aria-current={pathname === page.path ? 'page' : undefined}
        >
          {page.label}
          {page.path === '/contact' && <Arrow diagonal />}
        </AppLink>
      ))}
    </nav>
  )
}
