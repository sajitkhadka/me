# 0023 — Add Dockerfile, k8s manifests, Argo app and deploy workflow

**Status:** open
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0022](0022-self-host-on-k3s.md)

## Description

`me` has no Dockerfile, no manifests and no `.github/workflows/deploy.yml`. Add them in the same shape as `job-quest`.

- [ ] Dockerfile builds the Next.js app (set `output: "standalone"`; check `next.config.mjs`)
- [ ] Build gets the Tiptap registry token as a build secret, not baked into a layer
- [ ] Manifests in `k8s-config/me/` (namespace, deployment, service, ingress)
- [ ] Argo CD Application in `k8s-config/argocd/applications/`
- [ ] `deploy.yml` copied from `job-quest`, with `IMAGE` and `MANIFEST` set
- [ ] Self-hosted runner registered, secrets added
- [ ] A `-dev` tag deploys and the site loads on a test host

## How to solve

1. Copy and adapt `job-quest/.github/workflows/deploy.yml` and `deployment/job-quest/`.
2. Env vars must be in the manifest before the tag that needs them (see "Releasing" in the root `CLAUDE.md`).
3. The `.npmrc` already reads the Tiptap token from an env var. Pass it with a BuildKit secret.
