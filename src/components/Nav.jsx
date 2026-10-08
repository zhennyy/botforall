export default function Nav() {
  return (
    <nav aria-label="Основное меню">
      <div className="wrap">
        <span className="brand" aria-hidden="true" />
        <div className="navlinks">
          <a href="#process">Процесс</a>
          <a href="#projects">Проекты</a>
          <a href="#contact">Контакты</a>
        </div>
      </div>
    </nav>
  )
}
