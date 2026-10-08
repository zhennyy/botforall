# Переезд BotForAll на свой сервер

Сайт и боты живут на одном сервере Ubuntu 24.04 (Timeweb Cloud, Санкт-Петербург).

| Что | Адрес | Порт | Данные |
|---|---|---|---|
| Сайт-портфолио | https://botforall.ru | — | — |
| CoFFeeJD | https://coffee.botforall.ru | 3001 | /data/coffeebot |
| Флёр | https://fleur.botforall.ru | 3002 | /data/flowerbot |
| RadiatorPro | https://radiator.botforall.ru | 3003 | /data/radiatorbot |
| Ассистент | — | — | /data/assistant |

Код лежит в `/opt/bots/<бот>`, данные — в `/data/<бот>`. Обновления меняют только код, `/data` не трогается.
Каждую ночь в 03:30 копия `/data` сохраняется в `/var/backups/botforall` (хранится 14 дней).

## 1. DNS (в панели Timeweb → Домены → botforall.ru → DNS)

Добавить записи типа **A** на IP сервера: `@`, `www`, `coffee`, `fleur`, `radiator`; для посредника в Нидерландах — `ai` (IP NL-сервера).

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

## 3. Подключение бота (по одному)

_Так боты переезжали с Railway; для нового бота шаги те же, только ключи берутся из его `.env`._

1. Railway → сервис бота → Variables → Raw Editor → скопировать всё.
2. На сервере: `bfa env coffeebot` → вставить в конец файла → Ctrl+O, Enter, Ctrl+X.
   Строки `DB_PATH`, `PORT`, `PUBLIC_URL`, `SHOP_URL`, `WEBAPP_URL`, `DATA_DIR` из Railway удалить — правильные уже записаны.
3. В Railway **остановить** этого бота (два запущенных бота с одним токеном мешают друг другу).
4. На сервере: `bfa start coffeebot`, проверить `bfa logs coffeebot`.
5. ЮKassa → Интеграция → HTTP-уведомления: `https://botforall.ru/yookassa-webhook` — один адрес на все магазины, nginx рассылает уведомление каждому боту, а бот проверяет платёж в ЮKassa и берёт только свой.

## Claude через сервер в Нидерландах

Anthropic не принимает запросы из России, поэтому ИИ-подбор и Ассистент ходят к Claude через посредника на VPN-сервере в NL.

1. DNS: запись **A** `ai` → IP сервера в Нидерландах.
2. На сервере в NL (root):
   ```
   curl -fsSL https://raw.githubusercontent.com/zhennyy/botforall/main/deploy/ai-proxy.sh -o ai-proxy.sh
   DOMAIN=botforall.ru RU_IP=IP_СЕРВЕРА_В_ПЕТЕРБУРГЕ EMAIL=твоя@почта bash ai-proxy.sh
   ```
3. Скрипт напишет строку `ANTHROPIC_BASE_URL=...` — добавить её ботам: `bfa env coffeebot`, `radiatorbot`, `assistant`, затем `bfa restart <бот>`.

Посредник пускает только IP российского сервера; ключ Claude идёт по HTTPS и нигде не сохраняется.

## Команды

`bfa help` — список. Главные: `bfa status`, `bfa logs <бот>`, `bfa restart <бот>`, `bfa update`, `bfa backup`.

## Защита

- Ключи ботов (`.env`) и резервные копии доступны только администратору сервера.
- Уведомления об оплате принимаются только с адресов ЮKassa; fail2ban блокирует подбор пароля SSH.
- Посредник в Нидерландах пускает только IP основного сервера, проверяет сертификаты Telegram и Anthropic и не пишет журнал запросов (там токены ботов).
- `deploy/watchdog.sh` каждые 5 минут проверяет сайт и ботов и пишет в Telegram, если что-то упало; снаружи сайт дополнительно проверяет UptimeRobot.
- Разовое усиление уже настроенного сервера: `bash /opt/bots/site/deploy/harden.sh`.
