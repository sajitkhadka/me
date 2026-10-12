# 0022 — Self-host the site on k3s

**Status:** open
**Type:** epic
**Created:** 2026-10-12

## Description

The site runs on Vercel. The other apps run on the home k3s cluster with Argo CD, a Cloudflare Tunnel and tag-based deploys. Move the portfolio there so it follows the same release flow and uses Umami.

Risk: a home power or internet outage would take the portfolio down. Mitigate with Cloudflare caching and keep the Vercel project as a fallback for a couple of weeks.

Do this after the content work in [0001](0001-portfolio-refresh.md), not before.

Non-goals: moving the other apps, changing the site design.

- [ ] [0023](0023-manifests-argo-and-workflow.md) Manifests, Argo app and deploy workflow
- [ ] [0024](0024-migrate-database-and-secrets.md) Migrate the database and secrets
- [ ] [0025](0025-cloudflare-cache-and-dns-cutover.md) Cloudflare cache and DNS cutover

## How to research

Follow `D:\projects\CLAUDE.md` "Releasing". `job-quest` is the single-image template. Image tags go to `192.168.0.120:5000`. Needs a self-hosted runner for this repo, secrets `REGISTRY_USER`, `REGISTRY_PASSWORD` and `K8S_CONFIG_DEPLOY_KEY`, and an Argo CD Application in `k8s-config/argocd/applications/`.
