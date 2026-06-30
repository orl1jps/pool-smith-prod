# Deploying pool-smith.com to the shared EC2 box

This site runs on the shared EC2 box (`23.21.137.200`, Ubuntu 24.04) alongside
Jamie's other Node sites. Conventions: app lives at `/var/www/pool-smith-prod`
owned by `deployer`, runs under PM2 on **port 3008**, fronted by nginx, TLS via
Let's Encrypt **create-only** (`certbot certonly`, never `--nginx` in install
mode). Canonicalizes to the **apex** `https://pool-smith.com`; `dev.pool-smith.com`
serves the same app directly (HTTP 200, `noindex`) as a preview host.

Claude prepares the tooling in this repo; **you** run the server steps below in
your own SSH session, one block at a time.

- **Repo:** `git@github.com:orl1jps/pool-smith-prod.git`
- **App requires Node ≥ 24** (uses `node:sqlite` for the leads DB). The box's
  system node is 24.x — the bootstrap/deploy scripts fail loud if it ever isn't.
- **Leads DB:** SQLite at `data/submissions.db` (gitignored). The schema
  auto-creates on first write (`CREATE TABLE IF NOT EXISTS`) — **no migration or
  seed step.** The file persists across deploys; consider backing it up.

---

## 0. SSH in
```bash
ssh ubuntu@23.21.137.200
```

## 1. Clone the repo (as deployer)
```bash
sudo mkdir -p /var/www/pool-smith-prod && sudo chown -R deployer:deployer /var/www/pool-smith-prod
sudo -i -u deployer git clone git@github.com:orl1jps/pool-smith-prod.git /var/www/pool-smith-prod
exit   # back to ubuntu
```

## 2. Bootstrap the app over HTTP (as ubuntu)
Idempotent; brings the app up behind the HTTP-only nginx vhost. It stops the
first time so you can fill in secrets.
```bash
bash /var/www/pool-smith-prod/deploy/server-bootstrap.sh
```
First run prints "Created .env.production…" and exits. **Edit the secrets:**
```bash
sudo -i -u deployer nano /var/www/pool-smith-prod/.env.production
```
Fill in real values for: `RESEND_API_KEY`, `MAIL_FROM` (a verified Resend sender),
`TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `STRIPE_SECRET_KEY`, and
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. (`MAIL_TO` already defaults to
`poolsmithofflorida@gmail.com`.)

> ⚠ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is **inlined at build time** — it must be
> in `.env.production` before the build. This gate enforces that (the build only
> runs once the file exists), so just make sure it's filled in before you re-run.

Then re-run — this time it builds, starts PM2, and installs nginx:
```bash
bash /var/www/pool-smith-prod/deploy/server-bootstrap.sh
```
Success = `pm2 status` shows `pool-smith-prod` **online** and the script ends with
"up over HTTP on :3008". Quick local check:
```bash
curl -sI http://127.0.0.1:3008/ | head -1   # expect HTTP/1.1 200
```

## 3. Point DNS at the box (at the registrar — manual)
Add three **A records**, all → `23.21.137.200`:

| Type | Host        | Value            |
| ---- | ----------- | ---------------- |
| A    | `@` (apex)  | `23.21.137.200`  |
| A    | `www`       | `23.21.137.200`  |
| A    | `dev`       | `23.21.137.200`  |

Then confirm propagation **before** running certbot (HTTP-01 will fail otherwise):
```bash
dig +short pool-smith.com @1.1.1.1
dig +short www.pool-smith.com @1.1.1.1
dig +short dev.pool-smith.com @1.1.1.1
curl -sI http://pool-smith.com/ | head -1     # expect 200 once DNS resolves to this box
```
All three `dig` results must print `23.21.137.200`. DNS can take minutes to an hour.

## 4. Issue the TLS cert — CREATE-ONLY (as ubuntu)
One cert covering apex + www + dev; does **not** touch the nginx vhost:
```bash
sudo certbot certonly --nginx -d pool-smith.com -d www.pool-smith.com -d dev.pool-smith.com
```
certbot validates **every** `-d` name, so all three A records must resolve first —
a missing `dev` record fails the whole request. If dev DNS will lag, drop
`-d dev.pool-smith.com` and re-run certbot with it once it resolves.
Success = "Successfully received certificate", saved under
`/etc/letsencrypt/live/pool-smith.com/`.

## 5. Swap in the TLS vhost (as ubuntu)
```bash
bash /var/www/pool-smith-prod/deploy/finish-tls.sh
```
Success = `nginx -t` is OK and nginx reloads.

## 6. Verify (from your laptop)
```bash
curl -sI https://pool-smith.com/ | head -1                # expect 200
curl -sI https://www.pool-smith.com/ | head -2            # expect 301 -> apex
curl -sI http://pool-smith.com/ | head -2                 # expect 301 -> https apex
curl -sI https://dev.pool-smith.com/ | head -1            # expect 200 (preview host, serves app)
curl -sI https://pool-smith.com/sitemap.xml | head -1     # expect 200
sudo certbot renew --dry-run                              # confirm auto-renew works
```
Also smoke-test the contact form (lands a row in the SQLite DB + sends via Resend)
and `/payments` (Stripe). Note: this app has **no request-time redirect layer**
(`src/proxy.ts` / `src/middleware.ts` absent), so legacy WordPress URLs are not
301'd unless added in code.

## 7. Install the redeploy alias (as ubuntu, once)
```bash
echo "alias deploy-pool='bash /var/www/pool-smith-prod/scripts/deploy.sh'" >> /home/ubuntu/.bashrc
source /home/ubuntu/.bashrc
```
Every future deploy is then one command (run as **ubuntu**, not sudo — the script
switches to `deployer` itself):
```bash
deploy-pool
```

---

### If something fails
- **certbot HTTP-01 fails:** one of apex/www/**dev** isn't pointing at
  `23.21.137.200` yet, or port 80 is blocked. certbot validates every `-d` name,
  so a missing `dev` A record fails the whole request. Re-check all three `dig`
  lines and that step 2's bootstrap vhost is live (`curl -sI http://pool-smith.com/`).
- **`deploy-pool` fails at `git pull ... --ff-only`:** uncommitted edits on the box.
  Inspect as deployer and reconcile:
  ```bash
  sudo -i -u deployer bash -lc 'cd /var/www/pool-smith-prod && git status'
  ```
- **Node too old:** the scripts abort with "needs Node >= 24". The fix is a newer
  **system** node at `/usr/bin/node` — do NOT source nvm (its default is older and
  would shadow the system node).
- **Port collision** at bootstrap: the script aborts; pick the next free port,
  update `ecosystem.config.cjs` + both nginx confs + `scripts/deploy.sh`, re-push,
  `git pull` on the box, re-run.
