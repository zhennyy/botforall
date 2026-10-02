const items = [
  ['Витрина', 'Каталог, корзина и заказ внутри Telegram, без приложений и сайтов.'],
  ['Оплата', 'ЮKassa. Каждый платёж проверяется на сервере, деньги идут вам.'],
  ['Доставка', 'Тарифы по городам, бесплатно от суммы, промокоды.'],
  ['Админка', 'Выручка, заказы, остатки. Всё в телефоне, вход только для вас.'],
  ['Чат', 'Клиент пишет боту, вы отвечаете из админки. Статусы приходят сами.'],
  ['Поддержка', 'Запуск на Railway, резервные копии, доработки по ходу.'],
]

export default function Benefits() {
  return (
    <section id="benefits">
      <div className="wrap">
        <h2 className="section-title">Что внутри</h2>
        <ul className="benefits">
          {items.map(([t, d], i) => (
            <li className="benefit" key={t}>
              <span className="b-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
