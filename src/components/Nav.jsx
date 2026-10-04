import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#top">BotForAll</a>
        <div className="navlinks">
          <a href="#process">Процесс</a>
          <a href="#projects">Проекты</a>
          <a href="#contact">Контакты</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
