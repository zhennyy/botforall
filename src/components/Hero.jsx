import TopoBg from './TopoBg.jsx'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <TopoBg />
      <div className="wrap hero-center">
        <p className="kicker rise" style={{ '--d': '0ms' }}><span>Telegram-боты на заказ</span></p>
        <h1 className="rise" style={{ '--d': '100ms' }}>
          Магазин в Telegram, <em>который продаёт сам.</em>
        </h1>
        <p className="lede rise" style={{ '--d': '220ms' }}>
          Витрина, оплата, доставка и админка в одном боте.
        </p>
        <div className="hero-actions rise" style={{ '--d': '320ms' }}>
          <a className="btn btn-solid" href="#contact">Заказать бота</a>
          <a className="btn btn-line" href="#projects">Смотреть проекты</a>
        </div>
      </div>
    </header>
  )
}
