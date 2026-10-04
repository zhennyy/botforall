export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="bub b1"><i></i><i></i></div>
        <div className="bub b2 out"><i></i></div>
        <div className="bub b3"><i></i><i></i><i></i></div>
        <div className="bub b4 out"><i></i><i></i></div>
        <div className="kbd k1"><span>Каталог</span><span>Корзина</span></div>
        <div className="kbd k2"><span>Оплатить</span></div>
        <svg className="ico plane" viewBox="0 0 24 24"><path d="M21 3 3 10.5l6 2.3L11.5 20l2.6-4.6 4.9 3.6L21 3Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
        <svg className="ico bot" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M12 8V4.5M9 13.5h.01M15 13.5h.01M9.5 16.5h5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="3.8" r="1.2" fill="currentColor"/></svg>
        <svg className="ico bag" viewBox="0 0 24 24"><path d="M6 8h12l-1 11H7L6 8Zm3 0a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
      </div>
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
