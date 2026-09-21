import AppLink from './AppLink'
import Arrow from './Arrow'

export default function ButtonLink({ to, children, secondary = false }) {
  return (
    <AppLink className={`button-link ${secondary ? 'button-link--outline' : ''}`} to={to}>
      <span>{children}</span>
      <Arrow diagonal />
    </AppLink>
  )
}
