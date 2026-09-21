import { useState } from 'react'
import { testimonials } from '../data/content'
import Arrow from './Arrow'
import Reveal from './Reveal'
import SectionKicker from './SectionKicker'

export default function Testimonials() {
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
