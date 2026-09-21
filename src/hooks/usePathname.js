import { useEffect, useState } from 'react'

export function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function usePathname() {
  const [pathname, setPathname] = useState(currentPath)
  useEffect(() => {
    const onPopState = () => setPathname(currentPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  return pathname
}
