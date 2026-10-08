export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <nav className="foot-links" aria-label="Документы">
          <a href="/terms.html">Условия использования</a>
          <a href="/privacy.html">Политика конфиденциальности</a>
        </nav>
        <span className="foot-copy">© {new Date().getFullYear()} botforall.ru. Все права защищены.</span>
      </div>
    </footer>
  )
}
