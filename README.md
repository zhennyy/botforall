# BotForAll — портфолио-сайт

Лендинг на React (Vite) с двумя живыми Telegram-ботами: личным ассистентом (`@JDassistantJD_bot`) и магазином отопительного оборудования RadiatorPro (`@RadiatorBZ_bot`). Сделан для фриланса — показать реальные проекты и получить заявки на разработку ботов.

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

Готовые файлы появятся в `dist/` — их можно закинуть на любой статический хостинг (Vercel, Netlify, GitHub Pages, Railway и т.п.).

## Структура

- `src/App.jsx` — собирает страницу из секций.
- `src/components/` — Nav, Hero, Capabilities (чипы со стеком), Projects/ProjectCard, PhoneMock (мок переписки в Telegram), Process (три статуса как у сообщения — Бриф / Разработка / Готово), Contact, Footer.
- `src/index.css` — все стили и цветовые токены (поддержаны светлая и тёмная темы).
# BotForAll
