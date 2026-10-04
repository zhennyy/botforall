export default function ChatPreview() {
  return (
    <div className="chat rise" style={{ '--d': '460ms' }} aria-hidden="true">
      <div className="chat-head">
        <span className="chat-ava">
          <svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8V5M9 13h.01M15 13h.01M9.5 16h5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </span>
        <span className="chat-name"><b>Ваш магазин</b><small>бот</small></span>
      </div>
      <div className="chat-body">
        <div className="msg out" style={{ '--i': 0 }}>/start</div>
        <div className="msg in" style={{ '--i': 1 }}>Здравствуйте! Что хотите заказать?</div>
        <div className="keys" style={{ '--i': 2 }}><span>Каталог</span><span>Корзина</span><span>Мои заказы</span></div>
        <div className="msg out" style={{ '--i': 3 }}>Каталог</div>
        <div className="msg in" style={{ '--i': 4 }}>Эфиопия, 250 г. Добавить в корзину?</div>
        <div className="keys" style={{ '--i': 5 }}><span className="ok">В корзину</span><span>Назад</span></div>
        <div className="msg in done" style={{ '--i': 6 }}>Заказ оплачен ✓ Скоро отправим</div>
      </div>
    </div>
  )
}
