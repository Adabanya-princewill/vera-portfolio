import { useEffect } from 'react'

export default function useParallax(ref, strength = 28) {
  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 900px)')
    let active = false
    let frame = 0

    const update = () => {
      frame = 0
      if (!active || still.matches || small.matches) {
        node.style.setProperty('--parallax-y', '0px')
        return
      }

      const rect = node.getBoundingClientRect()
      const centerDistance = window.innerHeight / 2 - (rect.top + rect.height / 2)
      const range = strength * 0.45
      const offset = Math.max(-range, Math.min(range, centerDistance * 0.045))
      node.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
    }

    const requestUpdate = () => {
      if (active && !frame) frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) requestUpdate()
      },
      { rootMargin: '150px 0px' },
    )
    observer.observe(node)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ref, strength])
}
