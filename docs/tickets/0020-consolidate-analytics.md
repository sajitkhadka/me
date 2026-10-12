# 0020 — Consolidate analytics on Umami

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`app/layout.tsx` loads three analytics tools: Google Analytics (when `GAID` is set), Vercel Speed Insights and Vercel Analytics. The home cluster already runs Umami (`stats.sajitkhadka.com`). The Vercel tools stop working once the site leaves Vercel (see [0022](0022-self-host-on-k3s.md)).

- [ ] Umami script added to the layout, with the site id from an env var
- [ ] Vercel Analytics and Speed Insights removed
- [ ] Google Analytics kept or removed, and the privacy policy updated to match

## How to research

`deployment/observability/README.md` for how to add a site in Umami.

## How to solve

Add the Umami tracking script with `next/script` and remove the unused packages from `package.json`.
