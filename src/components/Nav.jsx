import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav aria-label="Основное меню">
      <div className="wrap">
        <a className="brand" href="#top">BotFor_All</a>
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
