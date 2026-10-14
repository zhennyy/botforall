import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const MOBILE_QUERY = '(max-width: 700px)' // совпадает с брейкпоинтом в tokens.css и index.html

const readSavedTheme = () => {
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}
const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
)

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => readSavedTheme() || (prefersDark() ? 'dark' : 'light'))

  useEffect(() => {
    // на телефоне всегда тёмная тема (переключатель там скрыт)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches
    document.documentElement.setAttribute('data-theme', isMobile ? 'dark' : theme)
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* без сохранения */ }
  }

  const isDark = theme === 'dark'
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'} title={isDark ? 'Светлая тема' : 'Тёмная тема'}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
