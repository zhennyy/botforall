import { useEffect, useRef } from 'react'

// Частицы, которые медленно собираются в самолётик Telegram и снова рассыпаются.
// Цвет берётся из --accent, так что работает и в светлой, и в тёмной теме.
export default function ParticlePlane() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true
    let color = '', sprite = null, dark = true
    const CYCLE = 11000 // полный цикл, мс

    // светящаяся точка рисуется один раз и потом только копируется — так плавно даже на слабом телефоне
    const makeSprite = () => {
      const s = document.createElement('canvas'); const R = 16
      s.width = s.height = R * 2
      const g = s.getContext('2d')
      const grd = g.createRadialGradient(R, R, 0, R, R, R)
      grd.addColorStop(0, dark ? '#fff' : color); grd.addColorStop(0.18, color); grd.addColorStop(0.45, color + '55'); grd.addColorStop(1, color + '00')
      g.fillStyle = grd; g.fillRect(0, 0, R * 2, R * 2)
      sprite = s
    }
    const readColor = () => {
      const v = getComputedStyle(c).getPropertyValue('--accent').trim() || '#3EB6FF'
      const hex = v.startsWith('#') && v.length === 7 ? v : '#3EB6FF'
      const bg = getComputedStyle(c).getPropertyValue('--paper').trim()
      const d = /^#[0-9a-f]{6}$/i.test(bg) ? parseInt(bg.slice(1, 3), 16) + parseInt(bg.slice(3, 5), 16) + parseInt(bg.slice(5, 7), 16) < 384 : true
      if (hex !== color || d !== dark) { color = hex; dark = d; makeSprite() }
    }

    // самолётик: контур + лёгкая заливка точками внутри
    const outline = [[-1, 0.02], [1, -0.72], [0.42, 0.74], [0.06, 0.26]]
    const inside = (px, py, poly) => { let ins = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) ins = !ins } return ins }
    const tgt = []
    const line = (a, b, n) => { for (let i = 0; i < n; i++) { const t = i / n; tgt.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 1]) } }
    for (let i = 0; i < 4; i++) line(outline[i], outline[(i + 1) % 4], [90, 70, 26, 66][i])
    line([1, -0.72], [0.06, 0.26], 70)
    line([0.06, 0.26], [0.12, 0.6], 18)
    let guard = 0
    while (tgt.length < 520 && guard++ < 20000) { const px = Math.random() * 2 - 1, py = Math.random() * 1.6 - 0.8; if (inside(px, py, outline)) tgt.push([px, py, 0.45]) }

    // точка в «облаке»: эллипс, гуще в центре, реже к краям — никаких прямых границ
    const cloud = () => { const a = Math.random() * 6.283, r = Math.pow(Math.random(), 0.75) * 0.46; return { ax: 0.5 + Math.cos(a) * r, ay: 0.5 + Math.sin(a) * r * 0.82, edge: r / 0.46 } }
    const P = tgt.map((t) => ({
      x: 0, y: 0, vx: 0, vy: 0, t,
      ...cloud(), ph: Math.random() * 6.28, sp: 0.15 + Math.random() * 0.25,
      z: 0.5 + Math.random() * 0.8, delay: Math.random() * 0.12,
    }))

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3)
      const nw = Math.round(c.clientWidth * dpr), nh = Math.round(c.clientHeight * dpr)
      if (nw === W && nh === H) return // адресная строка на телефоне дёргает resize — не пересобираем
      const first = !W
      W = nw; H = nh
      c.width = W; c.height = H
      if (first) P.forEach((q) => { q.x = q.ax * W; q.y = q.ay * H })
    }
    size(); readColor()

    const scale = () => Math.min(W, H * 1.6) * 0.2 // размер самолётика
    const draw = (k) => {
      x.clearRect(0, 0, W, H)
      // мягкое свечение — только подложка, слабое
      x.globalCompositeOperation = dark ? 'lighter' : 'source-over'
      P.forEach((q) => {
        const g = (q.t[2] === 1 ? 4 : 3) * q.z * dpr
        x.globalAlpha = (0.08 + 0.22 * k) * (1 - q.edge * (1 - k) * 0.6)
        x.drawImage(sprite, q.x - g, q.y - g, g * 2, g * 2)
      })
      // резкие ядра точек
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = color
      P.forEach((q) => {
        const r = (q.t[2] === 1 ? 1.15 : 0.85) * q.z * dpr * (0.85 + 0.25 * k)
        x.globalAlpha = Math.min(1, (0.45 + 0.55 * k) * (0.6 + 0.4 * q.z) * (1 - q.edge * (1 - k) * 0.7))
        x.beginPath(); x.arc(q.x, q.y, r, 0, 6.283); x.fill()
      })
      x.globalAlpha = 1
    }

    if (reduce) {
      const s = scale()
      P.forEach((q) => { q.x = W / 2 + q.t[0] * s; q.y = H / 2 + q.t[1] * s })
      draw(1)
      return
    }

    const start = performance.now()
    const ease = (v) => v * v * (3 - 2 * v)
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const time = now - start
      const ph = (time % CYCLE) / CYCLE
      // 0–0.15 парят · 0.15–0.42 собираются · 0.42–0.72 самолётик · 0.72–1 рассыпаются
      const s = scale(), cx = W / 2, cy = H / 2
      const bob = Math.sin(time / 900) * 3 * dpr
      let kSum = 0
      P.forEach((q) => {
        // «облачная» позиция: каждая точка медленно плавает по своей орбите
        const fx = (q.ax + Math.sin(time / 1000 * q.sp + q.ph) * 0.05) * W
        const fy = (q.ay + Math.cos(time / 1000 * q.sp * 0.8 + q.ph) * 0.06) * H
        const tx = cx + q.t[0] * s, ty = cy + q.t[1] * s + bob
        let k
        if (ph < 0.15) k = 0
        else if (ph < 0.42) k = ease(Math.min(1, Math.max(0, (ph - 0.15 - q.delay) / 0.2)))
        else if (ph < 0.72) k = 1
        else k = 1 - ease(Math.min(1, Math.max(0, (ph - 0.72 - q.delay) / 0.2)))
        kSum += k
        const gx = fx + (tx - fx) * k, gy = fy + (ty - fy) * k
        q.vx = (q.vx + (gx - q.x) * 0.05) * 0.78
        q.vy = (q.vy + (gy - q.y) * 0.05) * 0.78
        q.x += q.vx; q.y += q.vy
      })
      draw(kSum / P.length)
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
