import Reveal from './Reveal'
const works = [
  {
    num: '01', name: 'Флёр', kind: 'Цветочный магазин',
    text: 'Витрина с букетами, оплата онлайн, фото готового букета на согласование.',
    stack: ['Mini App', 'ЮKassa', 'Railway'],
    bot: 'https://t.me/Fleeer_bot', code: 'https://github.com/zhennyy/flowerbot',
  },
  {
    num: '02', name: 'RadiatorPro', kind: 'Отопительное оборудование',
    text: 'Корзина, доставка по городам, трекинг заказа, статистика и чаты в админке.',
    stack: ['Mini App', 'ЮKassa', 'Claude API'],
    bot: 'https://t.me/RadiatorBZ_bot', code: 'https://github.com/zhennyy/radiatorbot',
  },
  {
    num: '03', name: 'Ассистент', kind: 'Личный помощник',
    text: 'Помнит переписку, ставит напоминания, отвечает на Claude API.',
    stack: ['Claude API', 'Railway'],
    code: 'https://github.com/zhennyy/telegram-assistant-bot',
  },
  {
    num: '04', name: 'CoFFeeJD', kind: 'Кофе и чай на развес',
    text: 'Варианты и допы, продажа на вес и объём, наборы, склад с загрузкой каталога из Excel прямо в приложении, отчёты, доставка, чеки 54-ФЗ, повторные заказы. В проект входит CRM: заказы, клиенты, склад, задачи с напоминаниями команде.',
    stack: ['Mini App', 'ЮKassa', 'Excel', 'Railway'],
    demo: '/coffeejd-demo.html',
    bot: 'https://t.me/CoFFeeeJD_bot',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2 className="section-title">Работы</h2>
        <Reveal as="ul" className="works">
          {works.map((w) => (
            <li className="work" key={w.num}>
              <span className="num">{w.num}</span>
              <div className="work-main">
                <h3>{w.name}</h3>
                <p className="work-kind">{w.kind}</p>
              </div>
              <p className="work-text">{w.text}</p>
              <div className="work-side">
                <div className="tags">{w.stack.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="work-links">
                  {w.demo && <a href={w.demo} target="_blank" rel="noopener noreferrer">Демо ↗</a>}
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
