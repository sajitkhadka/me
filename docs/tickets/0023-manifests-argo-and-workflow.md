# 0023 — Add Dockerfile, k8s manifests, Argo app and deploy workflow

**Status:** blocked
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0022](0022-self-host-on-k3s.md)

## Description

**Blocked:** the files are written in this repo, but nothing was copied to `k8s-config`, no runner or secrets were set up, and nothing was built or deployed, so the last two boxes need Sajit.

`me` has no Dockerfile, no manifests and no `.github/workflows/deploy.yml`. Add them in the same shape as `job-quest`.

- [x] Dockerfile builds the Next.js app (set `output: "standalone"`; check `next.config.mjs`)
- [x] Build gets the Tiptap registry token as a build secret, not baked into a layer
- [x] Manifests drafted in `deploy/k8s/` for `k8s-config/me/` (namespace, configmap, deployment, service; no ingress, see notes)
- [x] Argo CD Application drafted in `deploy/argocd/me.yaml`
- [x] `deploy.yml` copied from `job-quest`, with `IMAGE` and `MANIFEST` set
- [ ] Self-hosted runner registered, secrets added
- [ ] A `-dev` tag deploys and the site loads on a test host

## How to solve

1. Copy and adapt `job-quest/.github/workflows/deploy.yml` and `deployment/job-quest/`.
2. Env vars must be in the manifest before the tag that needs them (see "Releasing" in the root `CLAUDE.md`).
3. The `.npmrc` already reads the Tiptap token from an env var. Pass it with a BuildKit secret.

## Notes

- Scope (agreed upfront): repo files only. `k8s-config` is untouched because Argo CD would roll out any commit there within minutes. Copy order is in `deploy/README.md`.
- Added: `Dockerfile` (two stage, node:20-alpine, BuildKit secret `tiptap_token`), `.dockerignore`, `output: "standalone"`, `.github/workflows/deploy.yml` (copy of job-quest's; passes the secret and an optional `UMAMI_WEBSITE_ID` repo variable), `/api/health`, and `force-dynamic` on the sitemap so the build does not need a database.
- No Ingress: per `deployment/ARCHITECTURE.md`, public hosts go Cloudflare Tunnel → Service. The tunnel route is ticket 0025.
- Probes use `/api/health`, which does not touch the database (a DB-dependent probe can cause restart storms, as the Postgres-connections post describes).
- Not verified: the Docker daemon is not running here and the Tiptap token is missing, so the image was never built. Expect to fix small things on the first `-dev` tag. Needs repo secret `TIPTAP_PRO_TOKEN` in addition to the three the root CLAUDE.md lists.
