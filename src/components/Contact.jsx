import { useState } from 'react'

const EMAIL = 'zhennyy@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Хочу бота в Telegram')}`

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // clipboard API unavailable — skip silently, mailto below still gives a way to reach it
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)

    // also try opening the visitor's own mail app (if they have one configured,
    // this just works; if not, the address is already copied as a fallback)
    window.location.href = MAILTO
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
              aria-label="Написать на zhennyy@gmail.com (адрес также скопируется в буфер)"
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
