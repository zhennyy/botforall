import { useState } from 'react'

const EMAIL = 'zhennyy@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.prompt('Скопируйте адрес:', EMAIL)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-box">
          <div>
            <h2>Нужен свой бот в Telegram?</h2>
            <p>Магазин, ассистент, бронирование, заявки: опишите задачу, ответим и прикинем сроки.</p>
          </div>
          <div>
            <button
              type="button"
              className="composer"
              onClick={handleClick}
              aria-label="Скопировать адрес zhennyy@gmail.com"
            >
              <span>{copied ? 'Скопировано ✓' : `Написать: ${EMAIL}`}</span>
              <span className="send" aria-hidden="true">{copied ? '✓' : '↗'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
