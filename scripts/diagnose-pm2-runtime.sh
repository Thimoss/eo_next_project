#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${1:-eo-next}"

echo "== Context =="
date -Is || true
echo "user=$(whoami) host=$(hostname) pwd=$(pwd)"
echo

echo "== Node/NPM =="
command -v node >/dev/null 2>&1 && { echo "node=$(command -v node)"; node -v; } || echo "node: not found"
command -v npm >/dev/null 2>&1 && { echo "npm=$(command -v npm)"; npm -v; } || echo "npm: not found"
echo

echo "== Potential env injection (shell env) =="
env | LC_ALL=C sort | rg -n "^(NODE_OPTIONS|NODE_PATH|LD_PRELOAD|PM2|NPM_CONFIG|YARN_|PNPM_)" || true
echo

echo "== Node exec args (best effort) =="
node -e 'console.log("execArgv=", process.execArgv); console.log("NODE_OPTIONS=", process.env.NODE_OPTIONS || "");' 2>/dev/null || true
echo

echo "== Suspicious lrt paths =="
paths=(/dev/lrt /dev/shm/lrt /var/lrt /etc/lrt /lrt /tmp/lrt)
for p in "${paths[@]}"; do
  if [ -e "$p" ] || [ -L "$p" ]; then
    echo "-- $p"
    ls -la "$p" || true
    stat "$p" 2>/dev/null || true
  fi
done
echo

echo "== Project scan (fast, readable strings) =="
if command -v rg >/dev/null 2>&1; then
  rg -n --hidden --no-ignore -S "\\blrt\\b|/dev/lrt|/dev/shm/lrt|/tmp/lrt|/var/lrt|/etc/lrt|\\breturnNaN\\b" \
    package.json next.config.* ecosystem.config.* .env* src lib utils service types .next 2>/dev/null || true
else
  grep -RInE "\\blrt\\b|/dev/lrt|/dev/shm/lrt|/tmp/lrt|/var/lrt|/etc/lrt|\\breturnNaN\\b" \
    package.json next.config.* ecosystem.config.* .env* src lib utils service types .next 2>/dev/null || true
fi
echo

echo "== PM2 (if installed) =="
if command -v pm2 >/dev/null 2>&1; then
  pm2 -v || true
  echo "-- pm2 describe $APP_NAME"
  pm2 describe "$APP_NAME" || true
  echo
  echo "-- pm2 env $APP_NAME"
  pm2 env "$APP_NAME" || true
  echo
  echo "-- last 120 error log lines"
  pm2 logs "$APP_NAME" --err --lines 120 || true
else
  echo "pm2: not found"
fi

