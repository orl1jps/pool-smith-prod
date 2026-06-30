#!/usr/bin/env bash
# Run as `ubuntu` AFTER the create-only cert has been issued:
#   sudo certbot certonly --nginx -d pool-smith.com -d www.pool-smith.com -d dev.pool-smith.com
# Swaps the bootstrap vhost for the full TLS vhost and reloads nginx.
set -euo pipefail
SLUG=pool-smith-prod
DOMAIN=pool-smith.com
APP_DIR=/var/www/${SLUG}

if [[ "$(id -un)" != "ubuntu" ]]; then
  echo "ERROR: run as ubuntu (currently $(id -un))." >&2; exit 1
fi
# Check via sudo: /etc/letsencrypt/{live,archive} are root-only (0700), so a bare
# `[[ -f ]]` as ubuntu can't see the cert even when it exists.
if ! sudo test -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"; then
  echo "ERROR: no cert at /etc/letsencrypt/live/${DOMAIN}/. Issue it first:" >&2
  echo "  sudo certbot certonly --nginx -d ${DOMAIN} -d www.${DOMAIN} -d dev.${DOMAIN}" >&2
  exit 2
fi

sudo cp "${APP_DIR}/deploy/nginx-${SLUG}.conf" "/etc/nginx/sites-available/${SLUG}"
sudo nginx -t && sudo systemctl reload nginx
echo "==> TLS vhost live. Verify https://${DOMAIN}/ then 'sudo certbot renew --dry-run'."
