const steps = [
  {
    n: '01', title: 'Бриф',
    text: 'Обсуждаем, что должен уметь бот: каталог, оплата, напоминания, интеграции, и фиксируем сценарий и стек.',
  },
  {
    n: '02', title: 'Разработка',
    text: 'Собираем бота по стадиям, от каркаса до оплаты и админки, с промежуточными демо на каждом шаге.',
  },
  {
    n: '03', title: 'Готово и в проде',
    text: 'Бот задеплоен на Railway, работает 24/7, а мы остаёмся на связи для доработок.',
  },
]

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">как это устроено</span>
          <h2>Как проходит работа</h2>
          <p>От заявки до рабочего бота: три понятных шага без сюрпризов.</p>
        </div>
        <div className="process">
          {steps.map((s) => (
            <div className="step" key={s.title}>
              <span className="ticks">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
