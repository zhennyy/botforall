# BotForAll — портфолио-сайт

Лендинг на React (Vite) с примерами Telegram-ботов: цветочный магазин Флёр (`@Fleeer_bot`), магазин отопительного оборудования RadiatorPro (`@RadiatorBZ_bot`), личный ассистент и магазин кофе и чая CoFFeeJD (`@CoFFeeeJD_bot`, с демо на сайте). Сделан для фриланса — показать реальные проекты и получить заявки на разработку ботов.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

## Сборка для деплоя

```bash
npm run build
```

Готовые файлы появятся в `dist/`. Сайт работает на своём сервере (VPS) по адресу https://botforall.ru: nginx отдаёт `dist/`, а обновление делается командой `bfa update` (подтягивает код с GitHub и пересобирает сайт). Установка сервера — в [deploy/README.md](deploy/README.md).

## Структура

```
src/
  main.jsx, App.jsx      — точка входа и порядок секций на странице
  components/            — по компоненту на секцию
    Nav, ThemeToggle     — шапка и переключатель темы
    Hero                 — первый экран; фон TopoBg, самолётик из частиц ParticlePlane
    Process              — шаги работы и раскрывающийся блок «После запуска»
    Benefits, Projects   — возможности и карточки ботов (иконки — NeonIcon)
    Contact, Footer      — Telegram и почта (копирование в один клик), документы
    Reveal               — обёртка для плавного появления при прокрутке
  styles/                — стили по секциям, порядок подключения — в styles/index.css
    tokens.css           — цвета и переменные (светлая и тёмная темы, на телефоне — только тёмная)
    base.css             — сброс, типографика, общие элементы (.wrap, .kicker, .num)
    nav.css, hero.css, process.css, benefits.css, projects.css, contact.css, footer.css
    animations.css       — появление .rise и .reveal (подключается последним)
```

- `public/`: демо ботов (`coffeejd-demo.html`, `fleur-demo.html`, `radiator-demo.html`), `privacy.html`, `terms.html`, `og.png` (превью ссылки), `robots.txt`, `sitemap.xml`, файлы подтверждения Яндекс.Вебмастера и Google Search Console.
- `deploy/`: `setup.sh`, `harden.sh`, команда `bfa`, `watchdog.sh`, `ai-proxy.sh`.
- Адаптив: брейкпоинты 960, 860 (планшет), 700 (телефон), 560 и 400 px; медиазапросы лежат в конце файла своей секции.
