import { useRef } from 'react'
import PhoneMock from './PhoneMock'

const bubbles = [
  { dir: 'in', text: 'Добро пожаловать в магазин RadiatorPro 🔥', time: '18:40' },
  { dir: 'out', text: 'нужен радиатор для маленькой комнаты, бюджет 10 000 ₽', time: '18:41' },
  { dir: 'in', text: '🤖 Подбираю варианты... нашла Classic Alu, компактный и алюминиевый, 8 900 ₽', time: '18:41' },
]

export default function Hero() {
  const heroRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  return (
    <header className="hero" id="top" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="hero-glow" />
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow eyebrow-plain">принимаем новые проекты</div>
          <h1>
            Telegram-боты, которые закрывают задачу, а не просто отвечают на команды
          </h1>
          <p className="lede">
            Делаем ботов на Node.js: от личного ассистента с памятью до полноценного интернет-магазина
            с оплатой, доставкой и админкой. Ниже два живых проекта, можно потыкать прямо сейчас, они
            настоящие и работают в проде.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Смотреть проекты ↓</a>
            <a className="btn btn-ghost" href="#contact">Обсудить своего бота</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><b>24/7</b><span>на Railway</span></div>
            <div className="stat"><b>Node.js</b><span>под капотом</span></div>
          </div>
        </div>

        <PhoneMock name="RadiatorBZ_bot" bubbles={bubbles} showTyping floatIn badge="⚡" />
      </div>
    </header>
  )
}
