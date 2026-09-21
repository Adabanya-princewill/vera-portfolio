import { useEffect, useRef } from 'react'
import usePathname from './hooks/usePathname'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import './styles/shared.css'
import './styles/home.css'
import './styles/about.css'
import './styles/portfolio.css'
import './styles/contact.css'
import './styles/motion.css'
import './styles/responsive.css'

export default function App() {
  const pathname = usePathname()
  const firstRender = useRef(true)

  useEffect(() => {
    const titles = {
      '/': 'Vera Eziolisa — Writer & Brand Storyteller',
      '/about': 'About Vera — Writer & Brand Storyteller',
      '/portfolio': 'Portfolio — Vera Eziolisa',
      '/contact': 'Contact — Vera Eziolisa',
    }
    document.title = titles[pathname] || 'Page Not Found — Vera Eziolisa'
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    window.requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
  }, [pathname])

  const page = {
    '/': <HomePage />,
    '/about': <AboutPage />,
    '/portfolio': <PortfolioPage />,
    '/contact': <ContactPage />,
  }[pathname] || <NotFoundPage />

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress pathname={pathname} />
      <Header key={`header:${pathname}`} pathname={pathname} />
      <main id="main-content" tabIndex="-1" key={`page:${pathname}`} className="page-transition">
        {page}
      </main>
      <Footer />
    </>
  )
}
