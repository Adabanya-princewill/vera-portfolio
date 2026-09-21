import AnimatedHeadline from '../components/AnimatedHeadline'
import ContactBand from '../components/ContactBand'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import SectionKicker from '../components/SectionKicker'

export default function AboutPage() {
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
            <AnimatedHeadline
              label="Curious by nature."
              lines={[
                'CURIOUS',
                <span key="nature"><em>BY</em> NATURE<span className="accent-period">.</span></span>,
              ]}
            />
            <p className="page-hero__lede">I’m a curious cat. I ask too many questions, pay attention to the small things, and collect stories along the way.</p>
          </div>
          <ParallaxImage
            className="about-hero__image"
            src="/images/vera-red-dress.jpg"
            alt="Vera in a red dress at an exhibition"
            width={1152}
            height={2048}
            caption="There’s always more to the story."
            priority
            strength={24}
          />
        </div>
      </section>

      <section className="story-section dotted-top">
        <div className="page-shell story-section__grid">
          <Reveal>
            <SectionKicker number="02">I like to know why</SectionKicker>
            <h2 className="display-heading">THE DETAILS<br /><em>MATTER.</em></h2>
          </Reveal>
          <Reveal className="prose" delay={100} variant="right">
            <p className="lead-copy">I want to know why things are the way they are. Why people believe what they believe. Why two people can experience the same thing and walk away with completely different stories.</p>
            <p>I love hearing about people’s experiences. You don’t have to have lived in someone else’s shoes to recognise something familiar in their story; sometimes, it opens a window into a life you would never have known otherwise.</p>
            <p>I’m interested in what sits underneath a story: the opinions, the feelings, and the tiny details people leave in their telling without realising. I want to know what makes people care, what makes them pay attention, and what makes something human enough to remember.</p>
            <p>That’s probably why writing found me so easily. Most of my professional life has been spent helping people put their thoughts into words. After years of writing behind other people’s names, I’m learning to make room for my own.</p>
          </Reveal>
        </div>
      </section>

      <section className="healthcare-section dotted-top">
        <div className="page-shell healthcare-section__grid">
          <ParallaxImage
            className="healthcare-section__image"
            src="/images/vera-healthcare.jpg"
            alt="Vera in healthcare scrubs with a stethoscope"
            width={1721}
            height={1224}
            caption="Outside the work, I care for people."
            captionClassName="image-caption"
            strength={20}
          />
          <Reveal className="healthcare-section__copy" delay={100} variant="right">
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
          <ParallaxImage
            className="shelf-section__photo"
            src="/images/vera-bookshop.jpg"
            alt="Vera browsing a book in a bookstore"
            width={1536}
            height={2048}
            caption="Always one more book."
            captionClassName="image-caption"
            strength={26}
          />
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
