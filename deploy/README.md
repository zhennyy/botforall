# Переезд BotForAll на свой сервер

Сайт и боты живут на одном сервере Ubuntu 24.04 (Timeweb Cloud, Санкт-Петербург).

| Что | Адрес | Порт | Данные |
|---|---|---|---|
| Сайт-портфолио | https://botforall.ru | — | — |
| CoFFeeJD | https://coffee.botforall.ru | 3001 | /data/coffeebot |
| Флёр | https://fleur.botforall.ru | 3002 | /data/flowerbot |
| RadiatorPro | https://radiator.botforall.ru | 3003 | /data/radiatorbot |
| MiniCRM | https://crm.botforall.ru | 3004 | /data/minicrm |
| Ассистент | — | — | /data/assistant |

Код лежит в `/opt/bots/<бот>`, данные — в `/data/<бот>`. Обновления меняют только код, `/data` не трогается.
Каждую ночь в 03:30 копия `/data` сохраняется в `/var/backups/botforall` (хранится 14 дней).

## 1. DNS (в панели Timeweb → Домены → botforall.ru → DNS)

Добавить записи типа **A** на IP сервера: `@`, `www`, `coffee`, `fleur`, `radiator`, `crm`.

## 2. Установка (один раз)

На Mac открыть Терминал и подключиться (пароль — из письма Timeweb, при вводе не отображается):

```
ssh root@IP_СЕРВЕРА
```

Затем вставить:

```
curl -fsSL https://raw.githubusercontent.com/zhennyy/botforall/main/deploy/setup.sh -o setup.sh
DOMAIN=botforall.ru EMAIL=твоя@почта bash setup.sh
```

## 3. Перенос бота (по одному)

1. Railway → сервис бота → Variables → Raw Editor → скопировать всё.
2. На сервере: `bfa env coffeebot` → вставить в конец файла → Ctrl+O, Enter, Ctrl+X.
   Строки `DB_PATH`, `PORT`, `PUBLIC_URL`, `SHOP_URL`, `WEBAPP_URL`, `DATA_DIR` из Railway удалить — правильные уже записаны.
3. В Railway **остановить** этого бота (два запущенных бота с одним токеном мешают друг другу).
4. На сервере: `bfa start coffeebot`, проверить `bfa logs coffeebot`.
5. ЮKassa → Интеграция → HTTP-уведомления: заменить адрес на новый домен бота.

## Команды

`bfa help` — список. Главные: `bfa status`, `bfa logs <бот>`, `bfa restart <бот>`, `bfa update`, `bfa backup`.
