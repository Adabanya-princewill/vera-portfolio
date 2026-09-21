import { useRef } from 'react'
import useInViewOnce from '../hooks/useInViewOnce'
import Arrow from './Arrow'

export default function WorkRow({ item, index }) {
  const element = useRef(null)
  useInViewOnce(element)

  return (
    <a className="work-row" ref={element} href={item.url} target="_blank" rel="noreferrer">
      <span className="work-row__index">{String(index + 1).padStart(2, '0')}</span>
      <span className="work-row__main">
        <span className="work-row__title">{item.title}</span>
        <span className="work-row__meta">{item.type} <span aria-hidden="true">·</span> {item.source}</span>
      </span>
      <span className="work-row__arrow"><Arrow diagonal /></span>
      <span className="sr-only">Opens in a new tab</span>
    </a>
  )
}
