const shots = [
  { src: '/shots/s1-catalog.png', cap: 'Каталог' },
  { src: '/shots/s2-cart.png', cap: 'Корзина' },
  { src: '/shots/s3-orders.png', cap: 'Мои заказы' },
  { src: '/shots/s4-ai.png', cap: 'AI-подбор' },
  { src: '/shots/a1-products.png', cap: 'Админка: товары' },
  { src: '/shots/a3-orders.png', cap: 'Админка: заказы' },
]

export default function Screens() {
  return (
    <section id="screens" className="tight">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">как выглядит</span>
          <h2>Экраны магазина RadiatorPro</h2>
          <p>Витрина для покупателя и админка для владельца. Светлая и тёмная темы подстраиваются под Telegram.</p>
        </div>
        <div className="screens">
          {shots.map((s) => (
            <figure className="shot" key={s.src}>
              <img src={s.src} alt={s.cap} loading="lazy" width="390" height="844" />
              <figcaption>{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
