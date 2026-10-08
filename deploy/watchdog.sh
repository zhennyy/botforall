#!/usr/bin/env bash
# watchdog — раз в 5 минут проверяет сайт и ботов; если что-то упало или поднялось,
# пишет владельцу в Telegram через бота-ассистента. Повторно об одном и том же не спамит.
ROOT=/opt/bots; U=bots; STATE=/var/lib/botforall-watchdog; mkdir -p $STATE
[ -f /etc/botforall.conf ] && . /etc/botforall.conf
CHAT=${ALERT_CHAT_ID:-}
ENVF=$ROOT/assistant/.env
TOKEN=$(grep -E '^(BOT_TOKEN|TELEGRAM_BOT_TOKEN)=' $ENVF | head -1 | cut -d= -f2- | tr -d '"')
API=$(grep -E '^TELEGRAM_API_ROOT=' $ENVF | cut -d= -f2- | tr -d '"'); API=${API:-https://api.telegram.org}; API=${API%/}
[ -n "$CHAT" ] && [ -n "$TOKEN" ] || exit 0

send() { printf 'url = "%s"\n' "$API/bot$TOKEN/sendMessage" | curl -s -m 20 -K - --data-urlencode "chat_id=$CHAT" --data-urlencode "text=$1" >/dev/null; } # токен не виден в списке процессов
[ "${1:-}" = test ] && { send "👋 Мониторинг botforall.ru подключён: сайт и боты проверяются каждые 5 минут. Если что-то упадёт — напишу сюда."; exit 0; }

check() { # имя, код (0 = работает). Тревога только после 2 неудач подряд (10 минут), чтобы не дёргать из-за мелких сбоев
  local f="$STATE/$1" n; n=$(cat "$f" 2>/dev/null || echo 0)
  if [ "$2" = 0 ]; then [ "$n" -ge 2 ] && send "✅ $1 снова работает"; echo 0 > "$f"
  else n=$((n+1)); echo $n > "$f"; [ "$n" = 2 ] && send "🚨 $1 не отвечает — $(date '+%d.%m %H:%M')"; fi
}

for u in botforall.ru coffee.botforall.ru fleur.botforall.ru radiator.botforall.ru; do
  code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' https://$u/)
  [ "$code" -ge 200 ] && [ "$code" -lt 500 ] 2>/dev/null; check "$u" $?
done

ONLINE=$(cd $ROOT && sudo -u $U -H pm2 jlist 2>/dev/null | python3 -c 'import sys,json
try: print(" ".join(p["name"] for p in json.load(sys.stdin) if p["pm2_env"]["status"]=="online"))
except Exception: print("")')
[ -n "$ONLINE" ] && for b in coffeebot flowerbot radiatorbot assistant; do
  [[ " $ONLINE " == *" $b "* ]]; check "бот $b" $?
done

# диск: предупредить, если занято больше 90%
use=$(df --output=pcent / | tail -1 | tr -dc 0-9); [ "${use:-0}" -lt 90 ]; check "диск сервера" $?
