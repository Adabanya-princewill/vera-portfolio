import { useState } from 'react'
import { work } from '../data/content'
import AnimatedHeadline from '../components/AnimatedHeadline'
import ContactBand from '../components/ContactBand'
import SectionKicker from '../components/SectionKicker'
import WorkRow from '../components/WorkRow'

export default function PortfolioPage() {
  const filters = ['All work', 'Content writing', 'Personal essays', 'Campaign']
  const [filter, setFilter] = useState('All work')
  const visibleWork = filter === 'All work' ? work : work.filter((item) => item.category === filter)

  return (
    <>
      <section className="page-hero portfolio-hero">
        <div className="page-shell">
          <SectionKicker number="01">Portfolio</SectionKicker>
          <AnimatedHeadline
            label="The words are the work."
            lines={['THE WORDS', <em key="work">ARE THE WORK.</em>]}
          />
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
