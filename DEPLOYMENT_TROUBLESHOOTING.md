# Deployment troubleshooting (PM2 + Next.js)

This repo’s `eo_next_project` builds cleanly locally (`npm run build`). If you see runtime errors like:

- `EACCES: permission denied, open '/dev/lrt'` (also `/dev/shm/lrt`, `/var/lrt`, `/etc/lrt`, `/lrt`, `/tmp/lrt`)
- `ReferenceError: returnNaN is not defined`

…those are **not typical Next.js errors** and often indicate **environment/host injection** (for example: a process trying to load a payload named `lrt` from common directories).

## Quick checks on the server

From your deployed app directory, run:

```bash
bash scripts/diagnose-pm2-runtime.sh eo-next
```

This prints:

- `NODE_OPTIONS`, `NODE_PATH`, `LD_PRELOAD` (common injection vectors)
- whether files like `/tmp/lrt` or `/dev/shm/lrt` exist and their permissions
- PM2 process config + env (`pm2 describe`, `pm2 env`)
- a quick repo scan for `lrt`/`returnNaN` strings

## High-signal things to look for

- `NODE_OPTIONS` containing `--require ...` or unexpected preload scripts
- `LD_PRELOAD` set (native preload injection)
- unexpected executable files in your app dir (like `./lrt`, `./lrt.bak.*`)
- PM2 `env` values different from your expectations

If your deployed directory contains extra binaries (like `lrt`) that are not in git, treat it as a security incident: isolate the machine, redeploy from a clean checkout, and rotate secrets.

