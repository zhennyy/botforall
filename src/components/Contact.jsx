import { useState } from 'react'

const TG = 'BotFor_All'
const EMAIL = 'doevev@gmail.com'

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
        <a className="mail" href={`https://t.me/${TG}`} target="_blank" rel="noopener noreferrer" aria-label={`Написать в Telegram @${TG}`}>
          <span className="mail-text">@{TG}</span>
          <span className="mail-icon" aria-hidden="true">↗</span>
        </a>
        <p className="mail-or">или на почту</p>
        <button type="button" className="mail mail-alt" onClick={handleClick} aria-label={`Скопировать адрес ${EMAIL}`}>
          <span className="mail-text">{copied ? 'Адрес скопирован' : EMAIL}</span>
          <span className="mail-icon" aria-hidden="true">{copied ? '✓' : '⧉'}</span>
        </button>
      </div>
    </section>
  )
}
