const arrowPaths = {
  right: 'M4 12h16 M14 6l6 6-6 6',
  'up-right': 'M5 19 19 5 M8 5h11v11',
  'down-right': 'M5 5l14 14 M9 19h10V9',
  up: 'M12 20V4 M6 10l6-6 6 6',
  down: 'M12 4v16 M6 14l6 6 6-6',
}

export default function Arrow({ diagonal = false, direction }) {
  const path = arrowPaths[direction ?? (diagonal ? 'up-right' : 'right')]

  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
