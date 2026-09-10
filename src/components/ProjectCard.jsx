import PhoneMock from './PhoneMock'

export default function ProjectCard({ reverse, num, label, title, desc, features, stack, botLink, codeLink, phoneName, bubbles }) {
  return (
    <div className={`project${reverse ? ' reverse' : ''}`}>
      <div className="project-copy">
        <span className="kicker">
          <span className="num">{num}</span>
          <span className="label">{label}</span>
        </span>
        <h3>{title}</h3>
        <p className="desc">{desc}</p>
        <ul className="feature-log">
          {features.map((f, i) => (
            <li key={i}><span className="check">✓</span> {f}</li>
          ))}
        </ul>
        <div className="stackline">
          {stack.map((s) => <span key={s}>{s}</span>)}
        </div>
        <div className="project-links">
          {botLink && (
            <a className="btn btn-primary btn-sm" href={botLink} target="_blank" rel="noopener noreferrer">
              Попробовать бота ↗
            </a>
          )}
          <a className="btn btn-ghost btn-sm" href={codeLink} target="_blank" rel="noopener noreferrer">
            Код на GitHub
          </a>
        </div>
      </div>
      <div className="project-visual">
        <PhoneMock name={phoneName} bubbles={bubbles} small />
      </div>
    </div>
  )
}
