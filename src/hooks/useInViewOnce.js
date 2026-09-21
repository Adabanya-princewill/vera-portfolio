import { useEffect } from 'react'

export default function useInViewOnce(ref) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
}
