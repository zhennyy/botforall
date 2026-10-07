import { useEffect, useRef, useState } from 'react'

const TG = 'BotFor_All'
const EMAIL = 'doevev@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.prompt('Скопируйте адрес:', EMAIL)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact">
      <div className="wrap contact">
        <p className="kicker">Контакты</p>
        <h2>Расскажите <em>о задаче</em></h2>
        <p className="contact-sub">Отвечу и назову сроки.</p>
        <div className="contact-row">
          <a className="cbtn cbtn-tg" href={`https://t.me/${TG}`} target="_blank" rel="noopener noreferrer">
            <i className="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 4.1a1 1 0 0 0-1-.2L2.7 11a1 1 0 0 0 .1 1.9l4.6 1.5 1.8 5.5a1 1 0 0 0 1.6.4l2.6-2.4 4.5 3.3a1 1 0 0 0 1.6-.6l3.2-15.3a1 1 0 0 0-.4-1.2zM9.8 14.2l-.5 3.1-1.2-3.7 9.5-5.9-7.8 6.5z" /></svg></i>
            <span><small>Telegram · ответ быстрее</small><b>@{TG}</b></span>
            <em className="cgo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg></em>
          </a>
          <button type="button" className={`cbtn cbtn-mail${copied ? ' is-copied' : ''}`} onClick={handleClick} aria-label={`Скопировать адрес ${EMAIL}`}>
            <i className="ico"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7.5 8 5.5 8-5.5" /></svg></i>
            <span><small>{copied ? 'Скопировано ✓' : 'Почта'}</small><b>{EMAIL}</b></span>
            <em className="cgo" aria-hidden="true">{copied
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="3" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>}</em>
          </button>
        </div>
      </div>
    </section>
  )
}
