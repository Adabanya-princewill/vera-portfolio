import { contact, services } from '../data/content'
import AnimatedHeadline from '../components/AnimatedHeadline'
import Arrow from '../components/Arrow'
import Reveal from '../components/Reveal'
import SectionKicker from '../components/SectionKicker'
import SparkIcon from '../components/SparkIcon'

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="page-shell">
          <SectionKicker number="01">Let’s talk</SectionKicker>
          <AnimatedHeadline
            label="Let’s make something worth reading."
            lines={[
              'LET’S MAKE',
              <em key="something">SOMETHING</em>,
              <span key="reading">WORTH READING<span className="accent-period">.</span></span>,
            ]}
          />
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
            <SparkIcon className="contact-details__spark" />
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
              <Reveal className="service-card" key={service.title} delay={index * 50} variant="scale">
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
