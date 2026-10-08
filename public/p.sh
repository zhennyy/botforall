#!/usr/bin/env bash
# Разовое усиление прокси ai.botforall.ru (запускать на NL-сервере под root)
F=/etc/nginx/sites-available/ai-proxy
[ -f $F ] || { echo "нет $F"; exit 1; }
cp $F /root/ai-proxy.bak
if ! grep -q 'proxy_ssl_verify on' $F; then
  sed -i 's#client_max_body_size 20m;#client_max_body_size 20m;\n  access_log off;\n  proxy_ssl_verify on; proxy_ssl_verify_depth 3;\n  proxy_ssl_trusted_certificate /etc/ssl/certs/ca-certificates.crt;#' $F
fi
grep -q 'server_tokens off' /etc/nginx/nginx.conf || sed -i 's#http {#http {\n\tserver_tokens off;#' /etc/nginx/nginx.conf
if nginx -t 2>/dev/null; then
  systemctl reload nginx
  : > /var/log/nginx/access.log; rm -f /var/log/nginx/access.log.* 2>/dev/null
  echo "OK: журнал выключен, сертификаты проверяются, старые журналы очищены"
else
  cp /root/ai-proxy.bak $F; nginx -t && systemctl reload nginx; echo "ОШИБКА: вернула как было"
fi
