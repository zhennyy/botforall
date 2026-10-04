import { useEffect, useMemo, useRef, useState } from 'react'

function blob(cx, cy, r0, ph) {
  const pts = []
  const n = 90
  for (let k = 0; k <= n; k++) {
    const t = (k / n) * Math.PI * 2
    const r = r0 * (1 + 0.18 * Math.sin(3 * t + ph) + 0.1 * Math.sin(5 * t - ph * 1.3) + 0.06 * Math.sin(8 * t + ph * 0.7))
    pts.push(`${(cx + Math.cos(t) * r * 1.5).toFixed(1)} ${(cy + Math.sin(t) * r).toFixed(1)}`)
  }
  return 'M' + pts.join(' L') + 'Z'
}

export default function TopoBg() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const paths = useMemo(() => {
    const d = []
    for (let j = 1; j <= 26; j++) d.push(blob(-120, -30, j * 20, j * 0.28))
    for (let j = 1; j <= 14; j++) d.push(blob(360, 150, j * 18, j * 0.35 + 2))
    return d
  }, [])
  return (
    <div ref={ref} className={`topo-bg${visible ? '' : ' is-paused'}`} aria-hidden="true">
      <svg viewBox="-720 -400 1440 800" preserveAspectRatio="xMidYMid slice">
        <g>{paths.map((d, i) => <path key={i} d={d} />)}</g>
      </svg>
      <div className="topo-wash" />
    </div>
  )
}
