#!/usr/bin/env bash
# BotForAll — установка сайта и ботов на чистый сервер Ubuntu 24.04.
# Запуск (от root):  DOMAIN=botforall.ru EMAIL=you@mail.ru bash setup.sh
# Скрипт можно запускать повторно: уже сделанное он пропускает.
set -euo pipefail

DOMAIN="${DOMAIN:-botforall.ru}"
EMAIL="${EMAIL:-}"
GH="https://github.com/zhennyy"
ROOT=/opt/bots
DATA=/data
BK=/var/backups/botforall
U=bots

# имя | репозиторий | порт | поддомен ("" — без сайта)
BOTS=(
  "coffeebot|shop-coffeejd|3001|coffee"
  "flowerbot|flowerbot|3002|fleur"
  "radiatorbot|radiatorbot|3003|radiator"
  "assistant|telegram-assistant-bot||"
  "minicrm|minicrm|3004|crm"
)

say() { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
[ "$(id -u)" = 0 ] || { echo "Запусти от root"; exit 1; }
export DEBIAN_FRONTEND=noninteractive

say "1/8 Системные пакеты"
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx build-essential python3 sqlite3 ufw unattended-upgrades dnsutils
timedatectl set-timezone Europe/Moscow || true

say "2/8 Node.js 22 и pm2"
if ! node -v 2>/dev/null | grep -q '^v22'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm i -g pm2

say "3/8 Подкачка 1 ГБ (страховка при установке пакетов)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q /swapfile /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

say "4/8 Пользователь и папки"
id $U >/dev/null 2>&1 || useradd -r -m -d /home/$U -s /bin/bash $U
mkdir -p $ROOT $DATA $BK
for b in "${BOTS[@]}"; do IFS='|' read -r name _ _ _ <<<"$b"; mkdir -p $DATA/$name; done
chown -R $U:$U $ROOT $DATA

# Записать/заменить ключ в .env
setenv() { local f=$1 k=$2 v=$3; touch "$f"; if grep -q "^$k=" "$f"; then sed -i "s|^$k=.*|$k=$v|" "$f"; else echo "$k=$v" >> "$f"; fi; }

say "5/8 Код сайта и ботов с GitHub"
fetch() { # $1 папка $2 репозиторий
  if [ -d "$ROOT/$1/.git" ]; then sudo -u $U git -C "$ROOT/$1" pull --ff-only
  else sudo -u $U git clone --depth 1 "$GH/$2.git" "$ROOT/$1" || { echo "⚠ Не удалось скачать $2 (репозиторий закрыт или не существует) — пропускаю"; return 1; }
  fi
}
if fetch site botforall; then
  (cd $ROOT/site && sudo -u $U npm ci && sudo -u $U npm run build)
fi
for b in "${BOTS[@]}"; do
  IFS='|' read -r name repo port sub <<<"$b"
  fetch "$name" "$repo" || continue
  (cd $ROOT/$name && if [ -f package-lock.json ]; then sudo -u $U npm ci --omit=dev; else sudo -u $U npm install --omit=dev; fi)
  E=$ROOT/$name/.env
  # Пути и адреса, которые зависят от сервера (секреты добавляются командой: bfa env <бот>)
  case $name in
    coffeebot|radiatorbot)
      setenv $E DB_PATH $DATA/$name/shop.db; setenv $E WEBHOOK_PORT $port
      setenv $E PUBLIC_URL https://$sub.$DOMAIN; setenv $E SHOP_URL https://$sub.$DOMAIN/shop/ ;;
    flowerbot)
      setenv $E DATA_DIR $DATA/$name; setenv $E PORT $port; setenv $E WEBAPP_URL https://$sub.$DOMAIN ;;
    assistant)
      setenv $E DATA_DIR $DATA/$name ;;
    minicrm)
      setenv $E DB_PATH $DATA/$name/crm.db; setenv $E PORT $port ;;
  esac
  chown $U:$U $E; chmod 600 $E
done

say "6/8 pm2 (боты запускаются командой: bfa start <бот>)"
cat > $ROOT/ecosystem.config.cjs <<ECO
const r = '$ROOT';
module.exports = { apps: [
  { name: 'coffeebot',   cwd: r + '/coffeebot',   script: 'bot.js',    max_memory_restart: '300M' },
  { name: 'flowerbot',   cwd: r + '/flowerbot',   script: 'bot.js',    max_memory_restart: '300M' },
  { name: 'radiatorbot', cwd: r + '/radiatorbot', script: 'bot.js',    max_memory_restart: '300M' },
  { name: 'assistant',   cwd: r + '/assistant',   script: 'index.js',  max_memory_restart: '300M' },
  { name: 'minicrm',     cwd: r + '/minicrm',     script: 'server.js', node_args: '--env-file=.env', max_memory_restart: '200M' },
]};
ECO
chown $U:$U $ROOT/ecosystem.config.cjs
env PATH=$PATH:/usr/bin pm2 startup systemd -u $U --hp /home/$U >/dev/null

say "7/8 nginx"
site_conf() { # $1 имя хоста, $2 порт
cat <<NG
server {
  listen 80; server_name $1;
  client_max_body_size 20m;
  location / { proxy_pass http://127.0.0.1:$2; proxy_http_version 1.1;
    proxy_set_header Host \$host; proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade; proxy_set_header Connection "upgrade"; }
}
NG
}
{
cat <<NG
server {
  listen 80; server_name $DOMAIN www.$DOMAIN;
  root $ROOT/site/dist; index index.html;
  location / { try_files \$uri \$uri/ /index.html; }
  location /assets/ { expires 30d; add_header Cache-Control "public, immutable"; }
}
NG
for b in "${BOTS[@]}"; do IFS='|' read -r name _ port sub <<<"$b"; [ -n "$sub" ] && site_conf "$sub.$DOMAIN" "$port"; done
} > /etc/nginx/sites-available/botforall
ln -sf /etc/nginx/sites-available/botforall /etc/nginx/sites-enabled/botforall
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

say "8/8 Защита, резервные копии и команда bfa"
ufw allow OpenSSH >/dev/null; ufw allow 'Nginx Full' >/dev/null; ufw --force enable >/dev/null
install -m 755 "$(dirname "$0")/bfa" /usr/local/bin/bfa 2>/dev/null || install -m 755 $ROOT/site/deploy/bfa /usr/local/bin/bfa
echo "DOMAIN=$DOMAIN" > /etc/botforall.conf; echo "EMAIL=$EMAIL" >> /etc/botforall.conf
echo '30 3 * * * root /usr/local/bin/bfa backup >/dev/null 2>&1' > /etc/cron.d/botforall-backup

IP=$(curl -fsS https://ipv4.icanhazip.com || true)
if [ -n "$EMAIL" ] && [ "$(dig +short $DOMAIN | tail -1)" = "$IP" ]; then bfa ssl || true
else echo "⚠ HTTPS пока не выпущен: домен ещё не указывает на этот сервер ($IP). Когда настроишь DNS — выполни: bfa ssl"; fi

say "Готово!"
echo "Дальше: bfa env coffeebot  → вставить ключи из Railway → bfa start coffeebot"
echo "Справка: bfa help"
