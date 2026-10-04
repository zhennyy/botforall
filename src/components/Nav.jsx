import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#top">BotForAll</a>
        <div className="navlinks">
          <a href="#process">Как работаем</a>
          <a href="#projects">Работы</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <a className="nav-cta" href="#contact">Написать ↗</a>
        </div>
      </div>
    </nav>
  )
}
