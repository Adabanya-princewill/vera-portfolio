import { stats, work } from '../data/content'
import AnimatedHeadline from '../components/AnimatedHeadline'
import AppLink from '../components/AppLink'
import Arrow from '../components/Arrow'
import BrandLogos from '../components/BrandLogos'
import ButtonLink from '../components/ButtonLink'
import ContactBand from '../components/ContactBand'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import SectionKicker from '../components/SectionKicker'
import Testimonials from '../components/Testimonials'
import WorkRow from '../components/WorkRow'

export default function HomePage() {
  const featuredIndices = [0, 4, 9]

  return (
    <>
      <section className="home-hero">
        <div className="page-shell home-hero__inner">
          <div className="home-hero__topline">
            <span></span>
            <span className="availability"><span aria-hidden="true" />Open to new stories</span>
          </div>
          <div className="home-hero__content">
            <div className="home-hero__copy">
              <p className="eyebrow">Writer &amp; brand storyteller</p>
              <AnimatedHeadline
                label="The story underneath the idea."
                lines={[
                  'THE STORY',
                  <em key="underneath">UNDERNEATH</em>,
                  <span key="idea">THE IDEA<span className="accent-period">.</span></span>,
                ]}
              />
              <p className="home-hero__lede">Finding the story underneath an idea, turning it into words people actually want to read.</p>
              <div className="hero-actions">
                <ButtonLink to="/portfolio">Explore my writing</ButtonLink>
                <ButtonLink to="/about" secondary>A little about me</ButtonLink>
              </div>
            </div>
            <ParallaxImage
              className="home-hero__portrait"
              src="/images/vera-portrait.jpg"
              alt="Black and white portrait of Vera Eziolisa"
              width={1695}
              height={2048}
              caption={<>Vera Eziolisa <span>—</span> A writer who asks why.</>}
              priority
              strength={32}
            />
          </div>
          <div className="home-hero__footline"><span>Independent voice. Thoughtful words.</span><span>Scroll to explore <Arrow direction="down" /></span></div>
        </div>
      </section>

      <section className="intro-section dotted-top">
        <div className="page-shell">
          <SectionKicker number="01">What I do</SectionKicker>
          <div className="intro-grid">
            <Reveal as="h2" className="display-heading">I MAKE<br />IDEAS <em>FEEL.</em></Reveal>
            <Reveal className="prose intro-section__prose" delay={100} variant="right">
              <p className="lead-copy">I work across storytelling, content and brand writing, with a particular interest in the little things that make people stop, feel something and keep reading.</p>
              <p>I’ve spent the last few years writing behind the scenes: ghostwriting for individuals and founders, creating articles and newsletters, writing scripts and social content, and helping turn ideas in someone’s head into something others can read and connect with.</p>
              <p>Now, I’m building a body of work of my own too. On Substack, I’m growing a small community around stories, observations and the things I keep thinking about long after a conversation ends.</p>
              <AppLink className="text-link" to="/about">Get to know me <Arrow diagonal /></AppLink>
            </Reveal>
          </div>
        </div>
      </section>

      <BrandLogos />

      <section className="record-section dotted-top">
        <div className="page-shell">
          <Reveal className="record-section__heading">
            <SectionKicker number="02">The record</SectionKicker>
            <h2 className="display-heading">THE WORK<br /><em>BEHIND</em> THE WORDS.</h2>
          </Reveal>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <Reveal className="stat-card" key={stat.value} delay={index * 70} variant="scale">
                <span className="stat-card__number">0{index + 1}</span>
                <strong>{stat.value}{stat.endValue && <> <span className="sr-only">to</span><Arrow /> {stat.endValue}</>}</strong>
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
