#!/usr/bin/env bash
# Pulls latest main and redeploys pool-smith.com on this EC2 box.
# Run as `ubuntu` (or via the `deploy-pool` alias):
#   bash /var/www/pool-smith-prod/scripts/deploy.sh
# All build steps run as `deployer` so file ownership stays correct. Uses SYSTEM
# node + pm2 (/usr/bin); does NOT source nvm (see box-facts — nvm default is older).
set -euo pipefail

APP_DIR=/var/www/pool-smith-prod
APP_NAME=pool-smith-prod
APP_PORT=3008
HEALTHCHECK_URL=https://pool-smith.com/

if [[ "$(id -un)" != "ubuntu" ]]; then
  echo "ERROR: run this as ubuntu (currently $(id -un))." >&2
  exit 1
fi

echo "==> pool-smith-prod deploy starting at $(date -Iseconds)"

sudo -u deployer -H bash -l <<DEPLOYER
set -euo pipefail
cd "${APP_DIR}"
# Node-version guard — this app uses node:sqlite (needs Node >= 24). Keeps a stale-node
# redeploy from silently shipping on a downgraded node.
NODE_MAJOR=\$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
if [[ "\${NODE_MAJOR}" -lt 24 ]]; then
  echo "ERROR: node \$(node -v 2>/dev/null) is too old — this app needs Node >= 24 (node:sqlite)." >&2
  exit 4
fi
echo "==> [deployer] git pull origin main --ff-only"
git pull origin main --ff-only
echo "==> [deployer] npm ci"
npm ci
echo "==> [deployer] npm run build"
npm run build
echo "==> [deployer] pm2 restart ${APP_NAME}"
pm2 restart "${APP_NAME}" --update-env
pm2 status "${APP_NAME}"
DEPLOYER

echo
echo "==> Waiting for Next.js to listen on :${APP_PORT}..."
for i in {1..30}; do
  if curl -sf -o /dev/null "http://127.0.0.1:${APP_PORT}/"; then
    echo "==> App responding after ${i}s"; break
  fi
  if [[ "${i}" == "30" ]]; then
    echo "==> ERROR: app did not respond on :${APP_PORT} within 30s" >&2; exit 3
  fi
  sleep 1
done

echo "==> Smoke check: ${HEALTHCHECK_URL}"
status=$(curl -s -o /dev/null -w "%{http_code}" "${HEALTHCHECK_URL}")
if [[ "${status}" == "200" ]]; then
  echo "==> OK (HTTP ${status})"
else
  echo "==> WARNING: got HTTP ${status} from ${HEALTHCHECK_URL}" >&2; exit 2
fi
echo "==> Deploy complete at $(date -Iseconds)"
