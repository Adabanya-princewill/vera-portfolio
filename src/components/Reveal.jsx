import { useRef } from 'react'
import useInViewOnce from '../hooks/useInViewOnce'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children }) {
  const element = useRef(null)
  useInViewOnce(element)

  return (
    <Tag
      ref={element}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
