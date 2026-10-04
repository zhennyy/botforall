import { useState } from 'react'

const steps = [
  ['Задача', 'Напишите в двух словах, чем занимается бизнес и что бот должен взять на себя.'],
  ['Разбор', 'Оцениваю, что реально сделать, и называю сроки.'],
  ['Сборка', 'Делаю по этапам и показываю демо на каждом этапе.'],
  ['Запуск', 'Бот работает 24/7, после запуска остаюсь на связи.'],
]

const hosting = [
  ['Хостинг у вас', 'Запускаю на вашем аккаунте Railway. Доступ, код и данные остаются у вас, я настраиваю и сопровождаю запуск.'],
  ['Хостинг у меня', 'Беру запуск и хостинг на себя: резервные копии, обновления и поддержка за ежемесячную плату.'],
  ['Без поддержки', 'Вы получаете готового бота и работаете сами. Доработки после запуска обсуждаем отдельно.'],
]

export default function Process() {
  const [open, setOpen] = useState(false)
  const last = steps.length - 1

  return (
    <section id="process">
      <div className="wrap">
        <h2 className="section-title">Как работаем</h2>
        <ol className="process">
          {steps.map(([t, d], i) => (
            <li className={'step' + (i === last ? ' step-click' : '')} key={t}>
              {i === last ? (
                <button
                  type="button"
                  className="step-btn"
                  aria-expanded={open}
                  aria-controls="after-launch"
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="ticks">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{t}</h4>
                  <p>{d}</p>
                  <span className="step-more">{open ? 'Свернуть ↑' : 'Варианты после запуска ↓'}</span>
                </button>
              ) : (
                <>
                  <span className="ticks">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </>
              )}
            </li>
          ))}
        </ol>
        {open && (
          <div id="after-launch" className="after-wrap">
            <h3 className="after-title">После запуска — на выбор</h3>
            <ul className="after">
              {hosting.map(([t, d]) => (
                <li key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
