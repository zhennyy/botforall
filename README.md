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

- `src/App.jsx` — собирает страницу из секций.
- `src/components/` — Nav, Hero, Capabilities (чипы со стеком), Projects/ProjectCard, PhoneMock (мок переписки в Telegram), Process (три статуса как у сообщения — Бриф / Разработка / Готово), Contact, Footer.
- `src/index.css` — все стили и цветовые токены (поддержаны светлая и тёмная темы).
# BotForAll
