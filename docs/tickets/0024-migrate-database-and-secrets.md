# 0024 — Move the secrets to the cluster (database stays on Neon)

**Status:** blocked
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0022](0022-self-host-on-k3s.md)

## Description

**Blocked:** the secrets must be sealed with `kubeseal` against the cluster, which I did not touch. The database stays on Neon, so there is no data migration.

The site stores blog posts, comments, users, apps, the resume and uploaded images in Postgres (Prisma). Find where that database runs today, move it to the cluster (or keep it where it is if that is safer), and set up the secrets the app needs.

Secrets and settings the app reads (names only): `DATABASE_URL`, NextAuth secret and URL, Google and GitHub OAuth client ids and secrets, `NEXT_PUBLIC_APP_URL`, `GAID`. Values must go in sealed secrets, never in git.

- [x] Current database host identified, and a backup taken
- [x] ~~Data restored into the new database~~ not needed: the site keeps using Neon
- [ ] OAuth redirect URLs updated for the new host
- [ ] Secrets created as sealed secrets in `k8s-config`
- [ ] Backup: Neon keeps its own history; take a manual `pg_dump` before cutover (one exists from 2026-10-12)
- [ ] Image upload path works (`/api/image/*`, and the `remotePatterns` in `next.config.mjs`)

## How to research

Check how images are stored (`db/image.service.ts`, `app/api/image`). If they are files on disk, the pod needs a volume.

## Notes

- Findings from the code (nothing was changed or migrated): images are not files on disk. Uploads go to a Google Drive folder through a service account (`GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_FOLDER_ID`) and are served through `/api/image/[fileName]`, so the pod needs no volume. The only thing to restore is Postgres. `next.config.mjs` `remotePatterns` already allow `sajitkhadka.com`, so a same-host cutover needs no change there.
- Secret names are listed in `README.md` (`DATABASE_URL`, `AUTH_*`, `GOOGLE_*`). The deployment draft in `deploy/k8s/me-deployment.yaml` reads them from a secret named `me-secrets`, to be sealed with `kubeseal`.
- OAuth callbacks (`/api/auth/callback/github`, `/api/auth/callback/google`) stay valid if the site keeps the same host. They only need updating for a test hostname.
- Not done: finding where the production database runs, taking a backup, restore, sealed secrets and the backup job all need access to the live database and cluster. Needs Sajit: where does `DATABASE_URL` point today?
- Security: while editing secrets, note 0027 (the upload endpoint has no login check).

- 2026-10-12: decision from Sajit: keep Neon, only leave Vercel. Production `DATABASE_URL` points at Neon (us-east-2). A read-only `pg_dump` was taken to `D:/backups/me-neon/` (13 tables, row counts beside it). Left to do: seal `me-secrets` with the existing Neon URL and the other values, and run a second dump just before cutover.
- Neon from a home server: keep `sslmode=require` in the URL; the first request after Neon auto-suspends is slow (cold start), which the uptime probe will also keep warm; latency to us-east-2 adds up per query, so avoid chatty pages.
