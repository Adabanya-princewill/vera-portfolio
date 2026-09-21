import { useEffect, useRef, useState } from 'react'
import { contact, services, stats, testimonials, work } from './content'
import './App.css'

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function AppLink({ to, children, onClick, ...props }) {
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const element = useRef(null)

  useEffect(() => {
    const node = element.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={element}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function SectionKicker({ number, children }) {
  return (
    <p className="section-kicker">
      <span className="section-number">({number})</span>
      <span aria-hidden="true">—</span>
      <span>{children}</span>
    </p>
  )
}

function ButtonLink({ to, children, secondary = false }) {
  return (
    <AppLink className={`button-link ${secondary ? 'button-link--outline' : ''}`} to={to}>
      <span>{children}</span>
      <Arrow diagonal />
    </AppLink>
  )
}

function Header({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <AppLink className="brand" to="/" aria-label="Vera Eziolisa, home">
          <span className="brand__star" aria-hidden="true">✳</span>
          <span>VERA<span className="brand__dot">.</span></span>
        </AppLink>
        <span className="header-descriptor">Writer &amp; brand storyteller</span>
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div>
          <AppLink to="/" className="site-footer__name">Vera Eziolisa<span>.</span></AppLink>
          <p>Writer &amp; brand storyteller</p>
        </div>
        <div className="site-footer__links">
          <a href={`mailto:${contact.email}`}>Email <Arrow diagonal /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a>
          <a href={contact.substack} target="_blank" rel="noreferrer">Substack <Arrow diagonal /></a>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Vera Eziolisa</span>
          <span>Made for the curious.</span>
          <AppLink to="/">Back to the beginning ↑</AppLink>
        </div>
      </div>
    </footer>
  )
}

function WorkRow({ item, index }) {
  return (
    <a className="work-row" href={item.url} target="_blank" rel="noreferrer">
      <span className="work-row__index">{String(index + 1).padStart(2, '0')}</span>
      <span className="work-row__main">
        <span className="work-row__title">{item.title}</span>
        <span className="work-row__meta">{item.type} <span aria-hidden="true">·</span> {item.source}</span>
      </span>
      <span className="work-row__arrow"><Arrow diagonal /></span>
      <span className="sr-only">Opens in a new tab</span>
    </a>
  )
}

function ContactBand({ number = '05' }) {
  return (
    <section className="contact-band dotted-top">
      <div className="page-shell contact-band__inner">
        <SectionKicker number={number}>The next chapter</SectionKicker>
        <h2>LET’S MAKE<br /><em>SOMETHING</em><br />WORTH READING<span className="accent-period">.</span></h2>
        <div className="contact-band__bottom">
          <p>Have an idea that needs words, or a brand that needs a story? I’d love to hear it.</p>
          <ButtonLink to="/contact">Get in touch</ButtonLink>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [selected, setSelected] = useState(0)
  const testimonial = testimonials[selected]

  return (
    <section className="testimonials-section dotted-top">
      <div className="page-shell">
        <Reveal>
          <SectionKicker number="04">Kind words</SectionKicker>
          <div className="section-heading-row">
            <h2 className="display-heading">IN GOOD<br /><em>COMPANY.</em></h2>
            <p className="section-side-note">A few words from the people I’ve written alongside.</p>
          </div>
        </Reveal>
        <div className="testimonial-layout">
          <div className="testimonial-tabs" role="group" aria-label="Choose a testimonial">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={`testimonial-tab ${selected === index ? 'testimonial-tab--active' : ''}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span className="testimonial-tab__number">0{index + 1}</span>
                <span>{item.name}<small>{item.role}</small></span>
                <Arrow />
              </button>
            ))}
          </div>
          <div className="testimonial-card" aria-live="polite" aria-atomic="true">
            <span className="testimonial-card__mark" aria-hidden="true">“</span>
            <blockquote key={selected}>
              <p>{testimonial.quote}</p>
              <footer>— {testimonial.name}<span>{testimonial.role}</span></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const featuredIndices = [0, 4, 9]

  return (
    <>
      <section className="home-hero">
        <div className="page-shell home-hero__inner">
          <div className="home-hero__topline">
            <span>Chimamaka “Vera” Eziolisa</span>
            <span className="availability"><span aria-hidden="true" />Open to new stories</span>
          </div>
          <div className="home-hero__content">
            <div className="home-hero__copy">
              <p className="eyebrow">Writer &amp; brand storyteller</p>
              <h1>THE STORY<br /><em>UNDERNEATH</em><br />THE IDEA<span className="accent-period">.</span></h1>
              <p className="home-hero__lede">Finding the story underneath an idea, turning it into words people actually want to read.</p>
              <div className="hero-actions">
                <ButtonLink to="/portfolio">Explore my writing</ButtonLink>
                <ButtonLink to="/about" secondary>A little about me</ButtonLink>
              </div>
            </div>
            <figure className="home-hero__portrait">
              <img
                src="/images/vera-portrait.jpg"
                alt="Black and white portrait of Vera Eziolisa"
                width="1695"
                height="2048"
                fetchPriority="high"
              />
              <figcaption>Vera Eziolisa <span>—</span> A writer who asks why.</figcaption>
            </figure>
          </div>
          <div className="home-hero__footline"><span>Independent voice. Thoughtful words.</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="intro-section dotted-top">
        <div className="page-shell">
          <SectionKicker number="01">What I do</SectionKicker>
          <div className="intro-grid">
            <Reveal as="h2" className="display-heading">I MAKE<br />IDEAS <em>FEEL.</em></Reveal>
            <Reveal className="prose intro-section__prose" delay={100}>
              <p className="lead-copy">I work across storytelling, content and brand writing, with a particular interest in the little things that make people stop, feel something and keep reading.</p>
              <p>I’ve spent the last few years writing behind the scenes: ghostwriting for individuals and founders, creating articles and newsletters, writing scripts and social content, and helping turn ideas in someone’s head into something others can read and connect with.</p>
              <p>Now, I’m building a body of work of my own too. On Substack, I’m growing a small community around stories, observations and the things I keep thinking about long after a conversation ends.</p>
              <AppLink className="text-link" to="/about">Get to know me <Arrow diagonal /></AppLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="record-section dotted-top">
        <div className="page-shell">
          <Reveal className="record-section__heading">
            <SectionKicker number="02">The record</SectionKicker>
            <h2 className="display-heading">THE WORK<br /><em>BEHIND</em> THE WORDS.</h2>
          </Reveal>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <Reveal className="stat-card" key={stat.value} delay={index * 70}>
                <span className="stat-card__number">0{index + 1}</span>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="record-section__footnote">Also: content strategies, editorial calendars, and many half-formed ideas turned into something worth reading.</p>
        </div>
      </section>

      <section className="featured-section dotted-top">
        <div className="page-shell">
          <Reveal>
            <SectionKicker number="03">Selected writing</SectionKicker>
            <div className="section-heading-row">
              <h2 className="display-heading">A FEW<br /><em>GOOD READS.</em></h2>
              <p className="section-side-note">Ideas about culture, identity, business and all the spaces in between.</p>
            </div>
          </Reveal>
          <div className="work-list">
            {featuredIndices.map((index, visibleIndex) => <WorkRow key={work[index].title} item={work[index]} index={visibleIndex} />)}
          </div>
          <AppLink className="text-link featured-section__all" to="/portfolio">See the whole portfolio <Arrow diagonal /></AppLink>
        </div>
      </section>

      <Testimonials />
      <ContactBand />
    </>
  )
}

function AboutPage() {
  const favourites = [
    {
      name: 'On my bookshelf',
      items: ['Purple Hibiscus', 'Americanah', 'It Ends with Us', 'Harry Potter', 'When Tomorrow Comes'],
    },
    {
      name: 'On my screen',
      items: ['When Life Gives You Tangerines', 'It’s Okay to Not Be Okay', 'The Sound of Music', 'My Dearest', 'Attack on Titan', 'Little Women'],
    },
    {
      name: 'In real life',
      items: ['Window shopping', 'Trying new recipes', 'People watching', 'Good conversations', 'Nature & flowers'],
    },
  ]

  return (
    <>
      <section className="page-hero about-hero">
        <div className="page-shell about-hero__grid">
          <div className="about-hero__copy">
            <SectionKicker number="01">A little about me</SectionKicker>
            <p className="eyebrow">Hi, I’m Vera.</p>
            <h1>CURIOUS<br /><em>BY</em> NATURE<span className="accent-period">.</span></h1>
            <p className="page-hero__lede">I’m a curious cat. I ask too many questions, pay attention to the small things, and collect stories along the way.</p>
          </div>
          <figure className="about-hero__image">
            <img src="/images/vera-red-dress.jpg" alt="Vera in a red dress at an exhibition" width="1152" height="2048" />
            <figcaption>There’s always more to the story.</figcaption>
          </figure>
        </div>
      </section>

      <section className="story-section dotted-top">
        <div className="page-shell story-section__grid">
          <Reveal>
            <SectionKicker number="02">I like to know why</SectionKicker>
            <h2 className="display-heading">THE DETAILS<br /><em>MATTER.</em></h2>
          </Reveal>
          <Reveal className="prose" delay={100}>
            <p className="lead-copy">I want to know why things are the way they are. Why people believe what they believe. Why two people can experience the same thing and walk away with completely different stories.</p>
            <p>I love hearing about people’s experiences. You don’t have to have lived in someone else’s shoes to recognise something familiar in their story; sometimes, it opens a window into a life you would never have known otherwise.</p>
            <p>I’m interested in what sits underneath a story: the opinions, the feelings, and the tiny details people leave in their telling without realising. I want to know what makes people care, what makes them pay attention, and what makes something human enough to remember.</p>
            <p>That’s probably why writing found me so easily. Most of my professional life has been spent helping people put their thoughts into words. After years of writing behind other people’s names, I’m learning to make room for my own.</p>
          </Reveal>
        </div>
      </section>

      <section className="healthcare-section dotted-top">
        <div className="page-shell healthcare-section__grid">
          <Reveal className="healthcare-section__image">
            <img src="/images/vera-healthcare.jpg" alt="Vera in healthcare scrubs with a stethoscope" width="1721" height="1224" loading="lazy" />
            <span className="image-caption">Outside the work, I care for people.</span>
          </Reveal>
          <Reveal className="healthcare-section__copy" delay={100}>
            <SectionKicker number="03">Outside the work</SectionKicker>
            <h2 className="display-heading">I’VE LEARNED<br />TO <em>NOTICE.</em></h2>
            <div className="prose">
              <p>I’m also a healthcare worker, which means I spend a lot of time caring for people and being present with them on some of their most difficult days.</p>
              <p>Healthcare teaches you to notice things: the pause before someone answers, the change in their voice, the things people say without saying them. I carry that attentiveness into everything else.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shelf-section dotted-top">
        <div className="page-shell">
          <Reveal className="shelf-section__heading">
            <SectionKicker number="04">A shelf of things I love</SectionKicker>
            <h2 className="display-heading">COLLECTING<br /><em>LITTLE JOYS.</em></h2>
            <p>Books, films, music, good conversations, and anything that gives me a reason to learn something I didn’t know yesterday.</p>
          </Reveal>
          <Reveal className="shelf-section__photo">
            <img src="/images/vera-bookshop.jpg" alt="Vera browsing a book in a bookstore" width="1536" height="2048" loading="lazy" />
            <span className="image-caption">Always one more book.</span>
          </Reveal>
          <div className="favourites-grid">
            {favourites.map((group, index) => (
              <Reveal className="favourites-group" key={group.name} delay={index * 60}>
                <h3><span>0{index + 1}</span>{group.name}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="about-closing">
            <p>I believe life should be lived fully. So I’m trying to live it with my eyes open: curious, observant, asking too many questions, and collecting stories along the way.</p>
          </Reveal>
        </div>
      </section>
      <ContactBand />
    </>
  )
}

function PortfolioPage() {
  const filters = ['All work', 'Content writing', 'Personal essays', 'Campaign']
  const [filter, setFilter] = useState('All work')
  const visibleWork = filter === 'All work' ? work : work.filter((item) => item.category === filter)

  return (
    <>
      <section className="page-hero portfolio-hero">
        <div className="page-shell">
          <SectionKicker number="01">Portfolio</SectionKicker>
          <h1>THE WORDS<br /><em>ARE THE WORK.</em></h1>
          <div className="portfolio-hero__bottom">
            <p>Writing across culture, business, identity and the everyday. A collection of published and ghostwritten pieces, writing samples, personal essays and a campaign concept.</p>
            <span>13 pieces &amp; counting <span aria-hidden="true">↘</span></span>
          </div>
        </div>
      </section>

      <section className="portfolio-section dotted-top">
        <div className="page-shell">
          <div className="portfolio-section__toolbar">
            <SectionKicker number="02">Explore the work</SectionKicker>
            <div className="filter-list" role="group" aria-label="Filter portfolio pieces">
              {filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-button ${filter === option ? 'filter-button--active' : ''}`}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <p className="portfolio-section__count" aria-live="polite">Showing {visibleWork.length} {visibleWork.length === 1 ? 'piece' : 'pieces'}</p>
          <div className="work-list work-list--portfolio">
            {visibleWork.map((item, index) => <WorkRow key={item.title} item={item} index={index} />)}
          </div>
          <p className="portfolio-section__note">Some work was ghostwritten and carries a client’s byline. Writing samples open as Google Docs; published pieces open at their original homes.</p>
        </div>
      </section>
      <ContactBand number="03" />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="page-shell">
          <SectionKicker number="01">Let’s talk</SectionKicker>
          <h1>LET’S MAKE<br /><em>SOMETHING</em><br />WORTH READING<span className="accent-period">.</span></h1>
          <div className="contact-hero__bottom">
            <p>If you have an idea that needs words, a brand that needs a story, or content that needs a little more thought behind it, I’d love to hear from you.</p>
            <p>I’m open to freelance projects, contract opportunities, collaborations, and conversations about interesting work.</p>
          </div>
        </div>
      </section>

      <section className="contact-details dotted-top">
        <div className="page-shell contact-details__grid">
          <div>
            <SectionKicker number="02">Direct line</SectionKicker>
            <h2>Have a story<br />in mind?</h2>
            <p>For writing enquiries, collaborations, or just to say hello:</p>
            <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<Arrow diagonal /></a>
            <a className="text-link" href={contact.cv} target="_blank" rel="noreferrer">View my CV <Arrow diagonal /></a>
          </div>
          <div className="contact-details__note">
            <span className="contact-details__spark" aria-hidden="true">✳</span>
            <p>Good stories often begin with a good question. Tell me what you’re thinking about.</p>
          </div>
        </div>
      </section>

      <section className="services-section dotted-top">
        <div className="page-shell">
          <SectionKicker number="03">What I can help with</SectionKicker>
          <h2 className="display-heading">THE RIGHT WORDS<br /><em>FOR THE RIGHT IDEA.</em></h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal className="service-card" key={service.title} delay={index * 50}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="elsewhere-section dotted-top">
        <div className="page-shell elsewhere-section__grid">
          <SectionKicker number="04">Elsewhere</SectionKicker>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a>
            <a href={contact.substack} target="_blank" rel="noreferrer">Doing This Life Thing <Arrow diagonal /></a>
          </div>
        </div>
      </section>
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found page-shell">
      <SectionKicker number="404">Page not found</SectionKicker>
      <h1>WRONG TURN<span className="accent-period">.</span></h1>
      <p>This story isn’t here, but there’s plenty more to explore.</p>
      <ButtonLink to="/">Go home</ButtonLink>
    </section>
  )
}

function App() {
  const [pathname, setPathname] = useState(currentPath)
  const firstRender = useRef(true)

  useEffect(() => {
    const handlePopState = () => setPathname(currentPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
      <Header key={`header:${pathname}`} pathname={pathname} />
      <main id="main-content" tabIndex="-1" key={`page:${pathname}`} className="page-transition">
        {page}
      </main>
      <Footer />
    </>
  )
}

export default App
