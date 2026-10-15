export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <nav className="footer-links" aria-label="Документы">
          <a href="/terms.html">Условия использования</a>
          <a href="/privacy.html">Политика обработки персональных данных</a>
        </nav>
        <span className="footer-copy">© {new Date().getFullYear()} botforall.ru. Все права защищены.</span>
      </div>
    </footer>
  );
}
