import { useEffect, useRef, useState } from 'react';

const TELEGRAM_USERNAME = 'BotFor_All';
const EMAIL = 'dogevev@gmail.com';
const COPIED_FEEDBACK_MS = 1800; // сколько держится «Скопировано ✓»

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21.9 4.1a1 1 0 0 0-1-.2L2.7 11a1 1 0 0 0 .1 1.9l4.6 1.5 1.8 5.5a1 1 0 0 0 1.6.4l2.6-2.4 4.5 3.3a1 1 0 0 0 1.6-.6l3.2-15.3a1 1 0 0 0-.4-1.2zM9.8 14.2l-.5 3.1-1.2-3.7 9.5-5.9-7.8 6.5z"
    />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7.5 8 5.5 8-5.5" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="8" width="12" height="12" rx="3" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(null);
  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      window.prompt('Скопируйте адрес:', EMAIL);
      return;
    }
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <section id="contact">
      <div className="wrap contact">
        <p className="kicker">Контакты</p>
        <h2>
          Расскажите <em>о задаче</em>
        </h2>
        <p className="contact-sub">Отвечу и назову сроки.</p>
        <div className="contact-row">
          <a
            className="contact-card contact-card-tg"
            href={`https://t.me/${TELEGRAM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="contact-card-icon">
              <TelegramIcon />
            </i>
            <span className="contact-card-text">
              <small>Telegram · ответ быстрее</small>
              <b>@{TELEGRAM_USERNAME}</b>
            </span>
            <em className="contact-card-action" aria-hidden="true">
              <ArrowIcon />
            </em>
          </a>
          <button
            type="button"
            className={`contact-card contact-card-mail${copied ? ' is-copied' : ''}`}
            onClick={copyEmail}
            aria-label={`Скопировать адрес ${EMAIL}`}
          >
            <i className="contact-card-icon">
              <MailIcon />
            </i>
            <span className="contact-card-text">
              <small>{copied ? 'Скопировано ✓' : 'Почта'}</small>
              <b>{EMAIL}</b>
            </span>
            <em className="contact-card-action" aria-hidden="true">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </em>
          </button>
        </div>
      </div>
    </section>
  );
}
