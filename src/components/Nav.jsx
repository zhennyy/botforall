import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href: '#process', label: 'Процесс' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contact', label: 'Контакты' },
]

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Основное меню">
      <div className="wrap">
        <span className="nav-spacer" aria-hidden="true" />
        <div className="nav-links">
          {LINKS.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
