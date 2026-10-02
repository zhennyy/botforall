export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="wrap hero-center">
        <p className="eyebrow rise" style={{ '--d': '0ms' }}>Telegram-боты на заказ</p>
        <h1 className="rise" style={{ '--d': '100ms' }}>
          Ваш магазин <em>живёт в Telegram.</em>
        </h1>
        <p className="lede rise" style={{ '--d': '220ms' }}>
          Витрина, оплата, доставка и админка в одном боте.
        </p>
        <div className="hero-actions rise" style={{ '--d': '320ms' }}>
          <a className="btn btn-solid" href="#contact">Заказать бота</a>
          <a className="btn btn-line" href="#projects">Смотреть работы</a>
        </div>
      </div>

    </header>
  )
}
