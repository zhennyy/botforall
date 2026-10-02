const steps = [
  ['Бриф', 'Обсуждаем задачу и фиксируем сценарий.'],
  ['Сборка', 'Делаю по этапам, показываю демо на каждом.'],
  ['Запуск', 'Бот в проде, работает 24/7, я на связи.'],
]

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <h2 className="section-title">Как работаем</h2>
        <ol className="process">
          {steps.map(([t, d], i) => (
            <li className="step" key={t}>
              <span className="ticks">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
