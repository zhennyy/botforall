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
        <div className="contact-row">
          <a className="cbtn" href={`https://t.me/${TG}`} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l6 2.3L11.5 20l2.6-4.6 4.9 3.6L21 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
            <span><small>Telegram</small><b>@{TG}</b></span>
          </a>
          <button type="button" className="cbtn" onClick={handleClick} aria-label={`Скопировать адрес ${EMAIL}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span><small>{copied ? 'Адрес скопирован' : 'Почта · нажмите, чтобы скопировать'}</small><b>{EMAIL}</b></span>
          </button>
        </div>
      </div>
    </section>
  )
}
