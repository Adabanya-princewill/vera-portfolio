import AnimatedHeadline from './AnimatedHeadline'
import ButtonLink from './ButtonLink'
import SectionKicker from './SectionKicker'

export default function ContactBand({ number = '05' }) {
  return (
    <section className="contact-band dotted-top">
      <div className="page-shell contact-band__inner">
        <SectionKicker number={number}>The next chapter</SectionKicker>
        <AnimatedHeadline
          as="h2"
          label="Let’s make something worth reading."
          lines={[
            'LET’S MAKE',
            <em key="something">SOMETHING</em>,
            <span key="reading">WORTH READING<span className="accent-period">.</span></span>,
          ]}
        />
        <div className="contact-band__bottom">
          <p>Have an idea that needs words, or a brand that needs a story? I’d love to hear it.</p>
          <ButtonLink to="/contact">Get in touch</ButtonLink>
        </div>
      </div>
    </section>
  )
}
