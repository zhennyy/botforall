export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#top">
          Telegram-боты на заказ
        </a>
        <div className="navlinks">
          <a href="#projects">Проекты</a>
          <a href="#process">Как работаю</a>
          <a href="#contact">Контакты</a>
        </div>
        <a className="btn btn-primary btn-sm" href="#contact">
          Обсудить проект
        </a>
      </div>
    </nav>
  )
}
