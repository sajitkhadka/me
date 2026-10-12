# 0025 — Add Cloudflare caching, switch DNS, keep Vercel as fallback

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0022](0022-self-host-on-k3s.md)
**Blocked by:** [0023](0023-manifests-argo-and-workflow.md), [0024](0024-migrate-database-and-secrets.md)

## Description

Switch `sajitkhadka.com` to the cluster behind the Cloudflare Tunnel. Cache public pages so a short outage does not show errors. Keep Vercel deployed for a while so DNS can be flipped back.

- [ ] Tunnel route added for `sajitkhadka.com` and `www`
- [ ] Cache rules for public pages and static assets. Admin, auth and API routes are not cached
- [ ] DNS switched. Old Vercel project left running for two weeks
- [ ] Uptime probe added in the observability stack
- [ ] Sitemap, OG images, login and comments checked on the new host
- [ ] Vercel project removed after the fallback period

## How to solve

Use the `cloudflared/README.md` in `k8s-config`. Test with a temporary hostname first.
