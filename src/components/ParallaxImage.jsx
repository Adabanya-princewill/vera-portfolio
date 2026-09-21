import { useRef } from 'react'
import useParallax from '../hooks/useParallax'

export default function ParallaxImage({
  className = '',
  src,
  alt,
  width,
  height,
  caption,
  captionClassName = '',
  priority = false,
  strength = 28,
}) {
  const element = useRef(null)
  useParallax(element, strength)

  return (
    <figure ref={element} className={`parallax-image ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
      />
      {caption && <figcaption className={captionClassName}>{caption}</figcaption>}
    </figure>
  )
}
