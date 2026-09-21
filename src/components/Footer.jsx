import { contact } from '../data/content'
import AppLink from './AppLink'
import Arrow from './Arrow'

export default function Footer() {
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
          <AppLink to="/">Back to the beginning <Arrow direction="up" /></AppLink>
        </div>
      </div>
    </footer>
  )
}
