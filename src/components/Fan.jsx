const phones = [
  { src: '/shots/a1-products.png', alt: 'Админка: товары' },
  { src: '/shots/s2-cart.png', alt: 'Корзина' },
  { src: '/shots/s1-catalog.png', alt: 'Каталог магазина' },
  { src: '/shots/s4-ai.png', alt: 'AI-подбор' },
  { src: '/shots/a3-orders.png', alt: 'Заказы в админке' },
]

export default function Fan() {
  return (
    <section className="fan-section tight" aria-label="Экраны ботов">
      <div className="fan">
        {phones.map((p, i) => (
          <img key={p.src} className={`fan-phone fp-${i}`} src={p.src} alt={p.alt} width="390" height="844" loading="lazy" />
        ))}
      </div>
    </section>
  )
}
