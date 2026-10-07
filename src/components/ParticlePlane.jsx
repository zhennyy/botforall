import { useEffect, useRef } from 'react'

// Частицы, которые собираются в самолётик Telegram и снова рассыпаются.
// Цвет берётся из --accent, так что работает и в светлой, и в тёмной теме.
export default function ParticlePlane() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true
    let color = '#3EB6FF'
    const readColor = () => { color = getComputedStyle(c).getPropertyValue('--accent').trim() || color }

    // контур самолётика в координатах от -1 до 1
    const tgt = []
    const line = (a, b, n) => { for (let i = 0; i < n; i++) { const t = i / n; tgt.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]) } }
    const p = [[-1, 0], [1, -0.75], [0.45, 0.75], [0.05, 0.25], [-1, 0]]
    for (let i = 0; i < 4; i++) line(p[i], p[i + 1], 55)
    line([1, -0.75], [0.05, 0.25], 45)
    line([0.05, 0.25], [0.1, 0.65], 18)

    const P = tgt.map((t) => ({ x: 0, y: 0, vx: 0, vy: 0, t, rx: Math.random(), ry: Math.random() }))

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = c.clientWidth * dpr; H = c.clientHeight * dpr
      c.width = W; c.height = H
      P.forEach((q) => { q.x = q.rx * W; q.y = q.ry * H })
    }
    size(); readColor()

    const scale = () => Math.min(W, H * 1.6) * 0.3
    const draw = (form) => {
      x.clearRect(0, 0, W, H)
      x.fillStyle = color
      const r = 1.6 * dpr
      x.globalAlpha = form ? 0.95 : 0.55
      P.forEach((q) => { x.beginPath(); x.arc(q.x, q.y, r, 0, 6.3); x.fill() })
      x.globalAlpha = 1
    }

    if (reduce) {
      const s = scale()
      P.forEach((q) => { q.x = W / 2 + q.t[0] * s; q.y = H / 2 + q.t[1] * s })
      draw(true)
      return
    }

    const start = performance.now()
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const ph = ((now - start) % 7000) / 7000
      const form = ph > 0.12 && ph < 0.72
      const s = scale()
      P.forEach((q) => {
        if (!form && Math.random() < 0.015) { q.rx = Math.random(); q.ry = Math.random() }
        const tx = form ? W / 2 + q.t[0] * s : q.rx * W
        const ty = form ? H / 2 + q.t[1] * s : q.ry * H
        q.vx = (q.vx + (tx - q.x) * 0.012) * 0.86
        q.vy = (q.vy + (ty - q.y) * 0.012) * 0.86
        q.x += q.vx; q.y += q.vy
      })
      draw(form)
    }
    raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(c)
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener?.('change', readColor)
    window.addEventListener('resize', size)
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); mo.disconnect()
      mq.removeEventListener?.('change', readColor); window.removeEventListener('resize', size)
    }
  }, [])

  return (
    <div className="pp-wrap rise" style={{ '--d': '460ms' }} aria-hidden="true">
      <canvas ref={ref} className="pp" />
    </div>
  )
}
