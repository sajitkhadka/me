# 0020 — Consolidate analytics on Umami

**Status:** done
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`app/layout.tsx` loads three analytics tools: Google Analytics (when `GAID` is set), Vercel Speed Insights and Vercel Analytics. The home cluster already runs Umami (`stats.sajitkhadka.com`). The Vercel tools stop working once the site leaves Vercel (see [0022](0022-self-host-on-k3s.md)).

- [x] Umami script added to the layout, with the site id from an env var
- [x] Vercel Analytics and Speed Insights removed
- [x] Google Analytics kept or removed, and the privacy policy updated to match

## How to research

`deployment/observability/README.md` for how to add a site in Umami.

## How to solve

Add the Umami tracking script with `next/script` and remove the unused packages from `package.json`.

## Notes

- Script is `https://stats.sajitkhadka.com/s.js` (the public collector path from the observability README), loaded only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set. Needs Sajit: add the site in Umami and set that env var on the host. Because it is a `NEXT_PUBLIC_` variable it must be present at build time.
- Google Analytics was removed too (`GAID` is no longer read; `@next/third-parties` dropped). The privacy policy is a database post, so Sajit must edit it to say Umami (cookieless page analytics) replaces Google Analytics. Lock file edited by hand, as in 0018.
