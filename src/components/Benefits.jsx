import Reveal from './Reveal'

const BENEFITS = [
  { title: 'Витрина', text: 'Каталог, корзина и заказ прямо в Telegram. Ничего скачивать не нужно.' },
  { title: 'Оплата', text: 'ЮKassa. Каждый платёж проверяется на сервере, чеки по 54-ФЗ.' },
  { title: 'Доставка', text: 'Тарифы по городам, СДЭК и Почта, бесплатно от суммы, промокоды.' },
  { title: 'Админка', text: 'Заказы, остатки и отчёты в телефоне. Вход только для владельца.' },
  { title: 'Чат', text: 'Клиент пишет боту, вы отвечаете из админки. Статусы приходят сами.' },
  { title: 'Поддержка', text: 'Запуск на сервере, резервные копии, доработки после запуска.' },
]

export default function Benefits() {
  return (
    <section id="benefits">
      <div className="wrap">
        <h2 className="section-title">Всё для продаж — <em>в одном боте</em></h2>
        <Reveal as="ul" className="benefits">
          {BENEFITS.map(({ title, text }) => (
            <li className="benefit" key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
