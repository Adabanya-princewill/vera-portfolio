import { useState } from 'react'
import { pages } from '../data/navigation'
import AppLink from './AppLink'

export default function Header({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <AppLink to="/" className="brand" aria-label="Vera Eziolisa, home">
          <span className="brand__star" aria-hidden="true">✳</span>
          <span>VERA<span className="brand__dot">.</span></span>
        </AppLink>
        <span className="header-descriptor">Chimamaka “Vera” Eziolisa</span>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true">{menuOpen ? '×' : '+'}</span>
        </button>
        <nav
          className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {pages.map((page) => (
            <AppLink
              key={page.path}
              to={page.path}
              className={`site-nav__link ${pathname === page.path ? 'site-nav__link--active' : ''}`}
              aria-current={pathname === page.path ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {page.label}
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
