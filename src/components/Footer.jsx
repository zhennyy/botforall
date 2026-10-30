// Исполнитель — самозанятая: ФИО и ИНН на сайте требует закон о рекламе для продаж через интернет
export const OWNER = 'Догадова Евгения Александровна · самозанятая (плательщик НПД) · ИНН 120203418021';

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <nav className="footer-links" aria-label="Документы">
          <a href="/terms.html">Условия использования</a>
          <a href="/privacy.html">Политика обработки персональных данных</a>
        </nav>
        <span className="footer-owner">{OWNER}</span>
        <span className="footer-copy">© {new Date().getFullYear()} botforall.ru. Все права защищены.</span>
      </div>
    </footer>
  );
}
