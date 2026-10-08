#!/usr/bin/env bash
# harden.sh — разовое усиление защиты сервера (можно запускать повторно, ничего не сломает)
set -uo pipefail
NG=/etc/nginx/sites-available/botforall
echo "▶ 1. Свежая версия bfa"
install -m 755 /opt/bots/site/deploy/bfa /usr/local/bin/bfa && echo "  ok"

echo "▶ 2. Резервные копии — только для root"
mkdir -p /var/backups/botforall; chmod 700 /var/backups/botforall; chmod 600 /var/backups/botforall/* 2>/dev/null; ls -ld /var/backups/botforall

echo "▶ 3. Ключи ботов — только для владельца"
for f in /opt/bots/*/.env; do chown bots:bots "$f"; chmod 600 "$f"; done; ls -l /opt/bots/*/.env | awk '{print "  "$1, $NF}'

echo "▶ 4. Заголовки безопасности nginx"
cat > /etc/nginx/conf.d/security.conf <<'NG'
server_tokens off;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000" always;
NG
echo "  ok"

echo "▶ 5. Уведомления об оплате — только с адресов ЮKassa"
if [ -f $NG ] && ! grep -q '185.71.76.0/27' $NG; then
  cp $NG /root/botforall.nginx.bak3
  sed -i 's#location = /yookassa-webhook {#location = /yookassa-webhook {\n    allow 185.71.76.0/27; allow 185.71.77.0/27; allow 77.75.153.0/25; allow 77.75.154.128/25; allow 77.75.156.11; allow 77.75.156.35; allow 2a02:5180::/32; deny all;#' $NG
fi
grep -c '185.71.76.0/27' $NG | sed 's/^/  правил: /'

echo "▶ 6. Проверка и перезапуск nginx"
if nginx -t 2>&1 | tail -1; then systemctl reload nginx && echo "  nginx перезапущен"; else echo "  ⚠ ошибка — возвращаю старый конфиг"; cp /root/botforall.nginx.bak3 $NG; rm -f /etc/nginx/conf.d/security.conf; nginx -t && systemctl reload nginx; fi

echo "▶ 7. fail2ban — защита от подбора пароля по SSH"
command -v fail2ban-server >/dev/null || DEBIAN_FRONTEND=noninteractive apt-get install -y -q fail2ban >/dev/null 2>&1
systemctl enable --now fail2ban >/dev/null 2>&1; systemctl is-active fail2ban | sed 's/^/  fail2ban: /'

echo "▶ 8. Итог"
bfa status 2>/dev/null | grep -c online | sed 's/^/  ботов online: /'
for u in botforall.ru coffee.botforall.ru/shop/ fleur.botforall.ru radiator.botforall.ru; do echo "  $u $(curl -s -o /dev/null -m 10 -w '%{http_code}' https://$u)"; done
echo "  вебхук снаружи (должно быть 403): $(curl -s -o /dev/null -m 10 -w '%{http_code}' -X POST https://botforall.ru/yookassa-webhook)"
echo "✅ Готово"
