import { useRef } from 'react'
import useInViewOnce from '../hooks/useInViewOnce'

export default function AnimatedHeadline({ as: Tag = 'h1', className = '', label, lines }) {
  const element = useRef(null)
  useInViewOnce(element)

  return (
    <Tag ref={element} className={`kinetic-title ${className}`.trim()} aria-label={label}>
      {lines.map((line, index) => (
        <span className="kinetic-title__line" aria-hidden="true" key={index}>
          <span className="kinetic-title__inner" style={{ '--line-delay': `${index * 70}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
