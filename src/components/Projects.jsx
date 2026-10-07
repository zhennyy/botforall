import Reveal from './Reveal'
import NeonIcon from './NeonIcon'
const works = [
  {
    num: '1', icon: 'coffee', name: 'CoFFeeJD', kind: 'Кофе и чай на развес',
    text: 'Варианты и допы, наборы, продажа на вес и объём, склад с загрузкой из Excel, отчёты, доставка, чеки 54-ФЗ. В проект входит CRM для команды.',
    stack: ['Mini App', 'ЮKassa', 'Чеки 54-ФЗ', 'ИИ-консультант', 'СДЭК и Почта', 'Подписка на повтор', 'Excel', 'CRM', 'Свой сервер (VPS)'],
    demo: '/coffeejd-demo.html',
    bot: 'https://t.me/CoFFeeeJD_bot',
  },
  {
    num: '2', icon: 'flower', name: 'Флёр', kind: 'Цветочный магазин',
    text: 'Витрина с букетами, оплата онлайн, фото готового букета на согласование.',
    stack: ['Mini App', 'ЮKassa', 'Доставка по расстоянию', 'Чат с флористом', 'Фото букета', 'Свой сервер (VPS)'],
    demo: '/fleur-demo.html',
    bot: 'https://t.me/Fleeer_bot', code: 'https://github.com/zhennyy/flowerbot',
  },
  {
    num: '3', icon: 'radiator', name: 'RadiatorPro', kind: 'Отопительное оборудование',
    text: 'Корзина, доставка по городам, трекинг заказа, статистика и чаты в админке.',
    stack: ['Mini App', 'ЮKassa', 'ИИ-подбор', 'Чат с продавцом', 'Свой сервер (VPS)'],
    demo: '/radiator-demo.html',
    bot: 'https://t.me/RadiatorBZ_bot', code: 'https://github.com/zhennyy/radiatorbot',
  },
  {
    num: '4', icon: 'person', name: 'Ассистент', kind: 'Личный помощник',
    text: 'Помнит переписку, ставит напоминания, отвечает на вопросы с помощью ИИ.',
    stack: ['Claude ИИ', 'Память', 'Напоминания', 'Свой сервер (VPS)'],
    code: 'https://github.com/zhennyy/telegram-assistant-bot',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2 className="section-title">Проекты</h2>
        <Reveal as="ul" className="works">
          {works.map((w) => (
            <li className="work" key={w.num}>
              <span className="num">{w.num}</span>
              <NeonIcon name={w.icon} />
              <div className="work-main">
                <h3>{w.bot ? '@' + w.bot.split('/').pop() : w.name}</h3>
                <p className="work-kind">{w.kind}</p>
              </div>
              <p className="work-text">{w.text}</p>
              <div className="work-side">
                <div className="tags">{w.stack.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="work-links">
                  {w.demo && <a href={w.demo} target="_blank" rel="noopener noreferrer">Как это выглядит ↗</a>}
                  {w.bot && <a href={w.bot} target="_blank" rel="noopener noreferrer">Открыть бота ↗</a>}
                  {w.code && <a href={w.code} target="_blank" rel="noopener noreferrer">Код</a>}
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
