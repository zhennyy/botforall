const phones = [
  { src: '/shots/a1-products.png', alt: 'Админка: товары' },
  { src: '/shots/s2-cart.png', alt: 'Корзина' },
  { src: '/shots/s1-catalog.png', alt: 'Каталог магазина' },
  { src: '/shots/s4-ai.png', alt: 'AI-подбор' },
  { src: '/shots/a3-orders.png', alt: 'Заказы в админке' },
]

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="wrap hero-center">
        <p className="eyebrow rise" style={{ '--d': '0ms' }}>Telegram-боты на заказ</p>
        <h1 className="rise" style={{ '--d': '100ms' }}>
          Магазин в Telegram, <em>который продаёт сам.</em>
        </h1>
        <p className="lede rise" style={{ '--d': '220ms' }}>
          Витрина, оплата, доставка и админка в одном боте.
        </p>
        <div className="hero-actions rise" style={{ '--d': '320ms' }}>
          <a className="btn btn-solid" href="#contact">Заказать бота</a>
          <a className="btn btn-line" href="#projects">Смотреть работы</a>
        </div>
      </div>

      <div className="fan rise" style={{ '--d': '480ms' }}>
        {phones.map((p, i) => (
          <img key={p.src} className={`fan-phone fp-${i}`} src={p.src} alt={p.alt} width="390" height="844" />
        ))}
      </div>
    </header>
  )
}
