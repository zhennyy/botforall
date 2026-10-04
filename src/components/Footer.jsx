export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <b>BotForAll</b>
        <nav className="foot-links" aria-label="Документы">
          <a href="/privacy.html">Политика конфиденциальности</a>
          <a href="/terms.html">Условия использования</a>
        </nav>
        <span className="foot-copy">© {new Date().getFullYear()} BotForAll. Все права защищены.</span>
      </div>
    </footer>
  )
}
