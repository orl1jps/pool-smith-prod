#!/usr/bin/env bash
# First-time setup for pool-smith-prod on the shared EC2 box. Run as `ubuntu`:
#   bash /var/www/pool-smith-prod/deploy/server-bootstrap.sh
# (On the very first run the repo isn't cloned yet — see DEPLOY.md step 1, which
#  clones it; or run the clone block this script prints.) Idempotent: re-run after
#  editing .env.production. Brings the app up over HTTP + installs the bootstrap
#  nginx vhost. TLS is a separate step (finish-tls.sh) after DNS + certbot.
set -euo pipefail

SLUG=pool-smith-prod
PORT=3008
DOMAIN=pool-smith.com
APP_DIR=/var/www/${SLUG}
REPO_URL="${REPO_URL:-}"   # pass REPO_URL=... on first run if the repo isn't cloned

if [[ "$(id -un)" != "ubuntu" ]]; then
  echo "ERROR: run as ubuntu (currently $(id -un))." >&2; exit 1
fi

# Port-collision guard against the registry drifting.
if ss -ltn 2>/dev/null | grep -q ":${PORT} "; then
  echo "ERROR: port ${PORT} is already listening on this box. Pick another." >&2
  exit 1
fi

# 1. App dir owned by deployer.
if [[ ! -d "${APP_DIR}/.git" ]]; then
  sudo mkdir -p "${APP_DIR}"
  sudo chown -R deployer:deployer "${APP_DIR}"
  if [[ -z "${REPO_URL}" ]]; then
    echo "Repo not cloned and REPO_URL not set. Re-run as:"
    echo "  REPO_URL=<clone-url> bash ${APP_DIR}/deploy/server-bootstrap.sh"
    echo "or clone by hand as deployer, then re-run."; exit 2
  fi
  sudo -i -u deployer git clone "${REPO_URL}" "${APP_DIR}"
fi

# 2. Env gate — stop the first time so the user fills in real secrets.
#    NOTE: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is inlined at BUILD time, so it must
#    be set in .env.production BEFORE the build in step 3 runs. This gate enforces
#    that ordering (build only happens once the env file exists).
if [[ ! -f "${APP_DIR}/.env.production" ]]; then
  sudo -i -u deployer bash -lc "cp '${APP_DIR}/.env.example' '${APP_DIR}/.env.production'"
  # 0600 — real secrets must not be group/other-readable on this shared box.
  sudo -i -u deployer chmod 600 "${APP_DIR}/.env.production"
  echo
  echo ">>> Created ${APP_DIR}/.env.production from the template (mode 600)."
  echo ">>> Edit it with the real secrets, then re-run this script:"
  echo "      sudo -i -u deployer nano ${APP_DIR}/.env.production"
  echo "      bash ${APP_DIR}/deploy/server-bootstrap.sh"
  exit 10
fi

# 3. Build + start under PM2 (as deployer).
# Uses SYSTEM node + pm2 (/usr/bin) already on PATH — do NOT source nvm (deployer's
# nvm `default` alias is an older Node that would shadow the system one). See box-facts.
sudo -u deployer -H bash -l <<DEPLOYER
set -euo pipefail
cd "${APP_DIR}"

# Node-version guard — this app uses node:sqlite, which is flagless only on Node >= 24.
# Fail loud rather than nvm-fixing; the cure is a newer SYSTEM node at /usr/bin/node.
NODE_MAJOR=\$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
if [[ "\${NODE_MAJOR}" -lt 24 ]]; then
  echo "ERROR: node \$(node -v 2>/dev/null) is too old — this app needs Node >= 24 (node:sqlite)." >&2
  echo "This box should provide system node at /usr/bin/node. Check 'command -v node; node -v'." >&2
  exit 4
fi

git pull --ff-only || true
npm ci
npm run build
if pm2 describe "${SLUG}" >/dev/null 2>&1; then
  pm2 restart "${SLUG}" --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save
pm2 status "${SLUG}"
DEPLOYER

# 4. Install the HTTP-only bootstrap nginx vhost (idempotent).
sudo cp "${APP_DIR}/deploy/nginx-${SLUG}-bootstrap.conf" "/etc/nginx/sites-available/${SLUG}"
sudo ln -sf "/etc/nginx/sites-available/${SLUG}" "/etc/nginx/sites-enabled/${SLUG}"
sudo nginx -t && sudo systemctl reload nginx

echo
echo "==> ${SLUG} is up over HTTP on :${PORT}."
echo "==> Local check:  curl -sI http://127.0.0.1:${PORT}/ | head -1"
echo "==> NEXT: point DNS for ${DOMAIN} + www + dev at this box, confirm with dig,"
echo "         issue the cert (create-only), then run deploy/finish-tls.sh."
