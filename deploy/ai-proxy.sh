#!/usr/bin/env bash
# Посредник для Claude API на сервере в Нидерландах.
# Боты на российском сервере ходят к Claude через https://ai.<домен>, а этот сервер
# пересылает запросы в api.anthropic.com. Пускает только IP российского сервера.
# Запуск (от root на сервере в NL):  DOMAIN=botforall.ru RU_IP=1.2.3.4 EMAIL=you@mail.ru bash ai-proxy.sh
set -euo pipefail
DOMAIN="${DOMAIN:?укажи DOMAIN}"; RU_IP="${RU_IP:?укажи RU_IP — IP сервера в Петербурге}"; EMAIL="${EMAIL:?укажи EMAIL}"
HOST="ai.$DOMAIN"
[ "$(id -u)" = 0 ] || { echo "Запусти от root"; exit 1; }

busy() { ss -ltnH "( sport = :$1 )" | grep -q .; }
if busy 80 && ! ss -ltnpH "( sport = :80 )" | grep -q nginx; then
  echo "⚠ Порт 80 занят другой программой — нужен для сертификата. Напиши Claude, что там работает:"; ss -ltnp "( sport = :80 )"; exit 1
fi
if busy 443 && ! ss -ltnpH "( sport = :443 )" | grep -q nginx; then PORT=8443; echo "Порт 443 занят VPN — посредник будет на порту 8443"; else PORT=443; fi

export DEBIAN_FRONTEND=noninteractive
command -v nginx >/dev/null || { apt-get update -y; apt-get install -y nginx; }
command -v certbot >/dev/null || apt-get install -y certbot

mkdir -p /var/www/acme
cat > /etc/nginx/sites-available/ai-proxy <<NG
server { listen 80; server_name $HOST; location /.well-known/acme-challenge/ { root /var/www/acme; } location / { return 403; } }
NG
ln -sf /etc/nginx/sites-available/ai-proxy /etc/nginx/sites-enabled/ai-proxy
nginx -t && systemctl reload nginx
certbot certonly --webroot -w /var/www/acme -d "$HOST" --non-interactive --agree-tos -m "$EMAIL"

cat >> /etc/nginx/sites-available/ai-proxy <<NG
server {
  listen $PORT ssl; server_name $HOST;
  ssl_certificate /etc/letsencrypt/live/$HOST/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/$HOST/privkey.pem;
  allow $RU_IP; deny all;
  client_max_body_size 20m;
  location / {
    proxy_pass https://api.anthropic.com;
    proxy_ssl_server_name on; proxy_set_header Host api.anthropic.com;
    proxy_read_timeout 300s; proxy_buffering off;
  }
}
NG
nginx -t && systemctl reload nginx
command -v ufw >/dev/null && ufw status | grep -q active && ufw allow 80/tcp && ufw allow $PORT/tcp || true
echo "deploy-hook = systemctl reload nginx" >> /etc/letsencrypt/cli.ini

U="https://$HOST"; [ $PORT = 443 ] || U="$U:$PORT"
echo; echo "✅ Готово. На российском сервере добавь ботам строку:"; echo "   ANTHROPIC_BASE_URL=$U"
