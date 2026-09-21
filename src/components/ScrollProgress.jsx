import { useEffect, useRef } from 'react'

export default function ScrollProgress({ pathname }) {
  const bar = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, window.scrollY / total))
      bar.current?.style.setProperty('--scroll-progress', progress)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate, { passive: true })
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
