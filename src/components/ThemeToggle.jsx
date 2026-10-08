import { useEffect, useState } from 'react'

const read = () => {
  try { return localStorage.getItem('theme') } catch { return null }
}
const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => read() || (systemDark() ? 'dark' : 'light'))

  useEffect(() => {
    // на телефоне всегда тёмная тема (переключатель там скрыт)
    const mobile = window.matchMedia('(max-width: 700px)').matches
    document.documentElement.setAttribute('data-theme', mobile ? 'dark' : theme)
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch { /* без сохранения */ }
  }

  const dark = theme === 'dark'
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'} title={dark ? 'Светлая тема' : 'Тёмная тема'}>
      {dark ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  )
}
