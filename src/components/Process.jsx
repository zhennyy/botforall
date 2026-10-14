import { useState } from 'react'
import Reveal from './Reveal'

const STEPS = [
  { title: 'Задача', text: 'Напишите в двух словах, чем занимается бизнес и что бот должен взять на себя.' },
  { title: 'Разбор', text: 'Оцениваю, что реально сделать, и называю сроки.' },
  { title: 'Сборка', text: 'Делаю по этапам и показываю демо на каждом этапе.' },
  { title: 'Запуск', text: 'Бот работает 24/7, после запуска остаюсь на связи.' },
]

// варианты после запуска — раскрываются по клику на последний шаг
const HOSTING_OPTIONS = [
  { letter: 'A', title: 'Хостинг у вас', text: 'Запускаю на вашем сервере или хостинге. Доступ, код и данные остаются у вас, я настраиваю и сопровождаю запуск.', tag: 'Всё у вас' },
  { letter: 'B', title: 'Хостинг у меня', text: 'Беру запуск и хостинг на себя: резервные копии, обновления и поддержка за ежемесячную плату. Доработки после запуска оплачиваются отдельно.', tag: 'По подписке' },
  { letter: 'C', title: 'Без поддержки', text: 'Вы получаете готового бота и работаете сами. Доработки после запуска оплачиваются отдельно.', tag: 'Доработки — за отдельную плату' },
]

export default function Process() {
  const [isOpen, setIsOpen] = useState(false)
  const lastIndex = STEPS.length - 1

  return (
    <section id="process">
      <div className="wrap">
        <h2 className="section-title">Процесс</h2>
        <Reveal as="ol" className="process">
          {STEPS.map(({ title, text }, index) =>
            index === lastIndex ? (
              <li className="step step-click" key={title} data-open={isOpen}>
                <button
                  type="button"
                  className="step-btn"
                  aria-expanded={isOpen}
                  aria-controls="after-launch"
                  onClick={() => setIsOpen((open) => !open)}
                >
                  <span className="num">{index + 1}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                  <span className="step-more">
                    <span className="step-plus" aria-hidden="true" />
                    {isOpen ? 'Свернуть' : 'Подробнее'}
                  </span>
                </button>
              </li>
            ) : (
              <li className="step" key={title}>
                <span className="num">{index + 1}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </li>
            )
          )}
        </Reveal>

        <div id="after-launch" className="after-wrap" data-open={isOpen} role="region" aria-label="Варианты после запуска" inert={isOpen ? undefined : ''}>
          <div className="after-clip">
            <div className="after-panel">
              <div className="after-head">
                <h3 className="after-title">После запуска — на выбор</h3>
                <p className="after-hint">Формат выбираем вместе до начала работы</p>
              </div>
              <ul className="after">
                {HOSTING_OPTIONS.map(({ letter, title, text, tag }) => (
                  <li key={title}>
                    <span className="after-letter">{letter}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                    <span className="after-tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
