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
      <div className="wrap contact">
        <p className="kicker">Контакты</p>
        <h2>Расскажите <em>о задаче.</em></h2>
        <p className="contact-sub">Отвечу и назову сроки.</p>
        <button type="button" className="mail" onClick={handleClick} aria-label={`Скопировать адрес ${EMAIL}`}>
          <span className="mail-text">{copied ? 'Адрес скопирован' : EMAIL}</span>
          <span className="mail-icon" aria-hidden="true">{copied ? '✓' : '↗'}</span>
        </button>
        <p className="mail-hint">Нажмите, чтобы скопировать адрес</p>
      </div>
    </section>
  )
}
