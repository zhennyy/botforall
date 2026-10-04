export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <nav className="foot-links" aria-label="Документы">
          <a href="/terms.html">Пользовательское соглашение</a>
          <a href="/privacy.html">Политика обработки данных</a>
        </nav>
        <span className="foot-copy">© {new Date().getFullYear()} BotForAll. Все права защищены.</span>
      </div>
    </footer>
  )
}
