# 0025 — Add Cloudflare caching, switch DNS, keep Vercel as fallback

**Status:** blocked
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0022](0022-self-host-on-k3s.md)
**Blocked by:** [0023](0023-manifests-argo-and-workflow.md), [0024](0024-migrate-database-and-secrets.md)

## Description

**Blocked:** it waits on 0023 and 0024 and is all DNS and Cloudflare work that only Sajit can do.

Switch `sajitkhadka.com` to the cluster behind the Cloudflare Tunnel. Cache public pages so a short outage does not show errors. Keep Vercel deployed for a while so DNS can be flipped back.

- [ ] Tunnel route added for `sajitkhadka.com` and `www`
- [ ] Cache rules for public pages and static assets. Admin, auth and API routes are not cached
- [ ] DNS switched. Old Vercel project left running for two weeks
- [ ] Uptime probe added in the observability stack
- [ ] Sitemap, OG images, login and comments checked on the new host
- [ ] Vercel project removed after the fallback period

## How to solve

Use the `cloudflared/README.md` in `k8s-config`. Test with a temporary hostname first.

## Notes

- Not started: every step changes DNS, Cloudflare or the cluster, and the ticket is blocked by 0023 and 0024 (both still open). Needs Sajit.
- Prep from the code: the tunnel routes hostnames straight to a Service (no Ingress), so the route target is `me.me.svc.cluster.local:80`. `/api/health` exists for an uptime probe. Admin, auth and API paths to leave uncached: `/api/*`, `/auth/*`, `/blog/create`, `/blog/*/edit`. Pages are dynamic (the header reads the session), so Cloudflare cache rules must be explicit, with a short TTL and bypass on the session cookie.

- Added 2026-10-12 (from the Search Console report): route both `sajitkhadka.com` and `www.sajitkhadka.com` to the Service. The app 308-redirects www to the bare host, so no Cloudflare redirect rule is needed (see `deploy/README.md`).
