export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <b>BotFor_All</b>
        <p className="foot-help">Если появились вопросы или нужна помощь — напишите, отвечу при первой возможности.</p>
        <div className="foot-social">
          <a href="https://t.me/BotFor_All" target="_blank" rel="noopener noreferrer" aria-label="Telegram @BotFor_All" title="Написать в Telegram">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M21.9 4.1a1 1 0 0 0-1-.2L2.7 11a1 1 0 0 0 .1 1.9l4.6 1.5 1.8 5.5a1 1 0 0 0 1.6.4l2.6-2.4 4.5 3.3a1 1 0 0 0 1.6-.6l3.2-15.3a1 1 0 0 0-.4-1.2zM9.8 14.2l-.5 3.1-1.2-3.7 9.5-5.9-7.8 6.5z"/></svg>
          </a>
          <a href="mailto:doevev@gmail.com" aria-label="Почта doevev@gmail.com" title="Написать на почту">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>
          </a>
        </div>
        <nav className="foot-links" aria-label="Документы">
          <a href="/terms.html">Пользовательское соглашение</a>
          <a href="/privacy.html">Политика обработки данных</a>
        </nav>
        <span className="foot-copy">© {new Date().getFullYear()} BotForAll. Все права защищены.</span>
      </div>
    </footer>
  )
}
