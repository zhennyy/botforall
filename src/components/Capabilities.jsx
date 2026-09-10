const skills = [
  'Node.js', 'Telegraf', 'Claude API', 'ЮKassa / Stripe',
  'SQLite', 'Express', 'Веб-админки', 'Деплой на Railway',
]

export default function Capabilities() {
  return (
    <section className="tight">
      <div className="wrap">
        <div className="chipline">
          {skills.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
