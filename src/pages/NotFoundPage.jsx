import ButtonLink from '../components/ButtonLink'
import SectionKicker from '../components/SectionKicker'

export default function NotFoundPage() {
  return (
    <section className="not-found page-shell">
      <SectionKicker number="404">Page not found</SectionKicker>
      <h1>WRONG TURN<span className="accent-period">.</span></h1>
      <p>This story isn’t here, but there’s plenty more to explore.</p>
      <ButtonLink to="/">Go home</ButtonLink>
    </section>
  )
}
