import Reveal from './Reveal';
import NeonIcon from './NeonIcon';

const PROJECTS = [
  {
    num: '1',
    icon: 'flower',
    name: 'Флёр',
    kind: 'Цветочный магазин',
    text: 'Витрина с букетами, оплата онлайн, фото готового букета на согласование.',
    tags: ['Mini App', 'ЮKassa', 'Доставка по расстоянию', 'Чат с флористом', 'Фото букета', 'Свой сервер (VPS)'],
    demo: '/fleur-demo.html',
    bot: 'https://t.me/Fleeer_bot',
    code: 'https://github.com/zhennyy/flowerbot',
  },
  {
    num: '2',
    icon: 'radiator',
    name: 'RadiatorPro',
    kind: 'Отопительное оборудование',
    text: 'Корзина, доставка по городам, трекинг заказа, статистика и чаты в админке.',
    tags: ['Mini App', 'ЮKassa', 'ИИ-подбор', 'Чат с продавцом', 'Свой сервер (VPS)'],
    demo: '/radiator-demo.html',
    bot: 'https://t.me/RadiatorBZ_bot',
    code: 'https://github.com/zhennyy/radiatorbot',
  },
  {
    num: '3',
    icon: 'coffee',
    name: 'CoFFeeJD',
    kind: 'Кофе и чай на развес',
    text: 'Варианты и допы, наборы, продажа на вес и объём, склад с загрузкой из Excel, отчёты, доставка, чеки 54-ФЗ. Готова связка с CRM.',
    tags: [
      'Mini App',
      'ЮKassa',
      'Чеки 54-ФЗ',
      'ИИ-консультант',
      'СДЭК и Почта',
      'Подписка на повтор',
      'Excel',
      'Связка с CRM',
      'Свой сервер (VPS)',
    ],
    demo: '/coffeejd-demo.html',
    bot: 'https://t.me/CoFFeeeJD_bot',
  },
  {
    num: '4',
    icon: 'person',
    name: 'Ассистент',
    kind: 'Личный помощник',
    text: 'Помнит переписку, ставит напоминания, отвечает на вопросы с помощью ИИ.',
    tags: ['Claude ИИ', 'Память', 'Напоминания', 'Свой сервер (VPS)'],
    code: 'https://github.com/zhennyy/telegram-assistant-bot',
  },
];

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' };

// заголовок карточки — @ник бота, как в Telegram; если бота нет — название проекта
const projectTitle = (project) => (project.bot ? '@' + project.bot.split('/').pop() : project.name);

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2 className="section-title">Проекты</h2>
        <Reveal as="ul" className="works">
          {PROJECTS.map((project) => (
            <li className="work" key={project.num}>
              <span className="num">{project.num}</span>
              <NeonIcon name={project.icon} />
              <div className="work-main">
                <h3>{projectTitle(project)}</h3>
                <p className="work-kind">{project.kind}</p>
              </div>
              <p className="work-text">{project.text}</p>
              <div className="work-side">
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="work-links">
                  {project.demo && <a href={project.demo}>Как это выглядит ↗</a>}
                  {project.bot && (
                    <a href={project.bot} {...EXTERNAL}>
                      Открыть бота ↗
                    </a>
                  )}
                  {project.code && (
                    <a href={project.code} {...EXTERNAL}>
                      Код
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
