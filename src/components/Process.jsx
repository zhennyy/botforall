import { useState } from 'react'
import Reveal from './Reveal'

const steps = [
  ['Задача', 'Напишите в двух словах, чем занимается бизнес и что бот должен взять на себя.'],
  ['Разбор', 'Оцениваю, что реально сделать, и называю сроки.'],
  ['Сборка', 'Делаю по этапам и показываю демо на каждом этапе.'],
  ['Запуск', 'Бот работает 24/7, после запуска остаюсь на связи.'],
]

const hosting = [
  ['A', 'Хостинг у вас', 'Запускаю на вашем аккаунте Railway. Доступ, код и данные остаются у вас, я настраиваю и сопровождаю запуск.', 'Всё на вашем аккаунте'],
  ['B', 'Хостинг у меня', 'Беру запуск и хостинг на себя: резервные копии, обновления и поддержка за ежемесячную плату.', 'Поддержка по подписке'],
  ['C', 'Без поддержки', 'Вы получаете готового бота и работаете сами. Доработки после запуска обсуждаем отдельно.', 'Доработки отдельно'],
]

export default function Process() {
  const [open, setOpen] = useState(false)
  const last = steps.length - 1

  return (
    <section id="process">
      <div className="wrap">
        <h2 className="section-title">Процесс</h2>
        <Reveal as="ol" className="process">
          {steps.map(([t, d], i) =>
            i === last ? (
              <li className="step step-click" key={t} data-open={open}>
                <button
                  type="button"
                  className="step-btn"
                  aria-expanded={open}
                  aria-controls="after-launch"
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="num">{i + 1}</span>
                  <h4>{t}</h4>
                  <p>{d}</p>
                  <span className="step-more">
                    <span className="step-plus" aria-hidden="true" />
                    {open ? 'Свернуть' : 'Подробнее'}
                  </span>
                </button>
              </li>
            ) : (
              <li className="step" key={t}>
                <span className="num">{i + 1}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </li>
            )
          )}
        </Reveal>

        <div id="after-launch" className="after-wrap" data-open={open} role="region" aria-label="Варианты после запуска" inert={open ? undefined : ''}>
          <div className="after-clip">
            <div className="after-panel">
              <div className="after-head">
                <h3 className="after-title">После запуска — на выбор</h3>
                <p className="after-hint">Формат выбираем вместе до начала работы</p>
              </div>
              <ul className="after">
                {hosting.map(([l, t, d, tag]) => (
                  <li key={t}>
                    <span className="after-letter">{l}</span>
                    <h4>{t}</h4>
                    <p>{d}</p>
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
