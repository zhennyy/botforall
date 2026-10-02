const shots = [
  { src: '/shots/s1-catalog.png', cap: 'Каталог' },
  { src: '/shots/s2-cart.png', cap: 'Корзина' },
  { src: '/shots/s3-orders.png', cap: 'Заказы' },
  { src: '/shots/s4-ai.png', cap: 'AI-подбор' },
  { src: '/shots/a1-products.png', cap: 'Админка' },
  { src: '/shots/a3-orders.png', cap: 'Статусы' },
]

export default function Screens() {
  return (
    <section id="screens" className="tight">
      <div className="wrap">
        <h2 className="section-title">Внутри RadiatorPro</h2>
      </div>
      <div className="screens">
        {shots.map((s) => (
          <figure className="shot" key={s.src}>
            <img src={s.src} alt={s.cap} loading="lazy" width="390" height="844" />
            <figcaption>{s.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
