export default function SectionKicker({ number, children }) {
  return (
    <p className="section-kicker">
      <span className="section-number">({number})</span>
      <span aria-hidden="true">—</span>
      <span>{children}</span>
    </p>
  )
}
