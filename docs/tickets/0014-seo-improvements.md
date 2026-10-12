# 0014 — Improve SEO: sitemap, structured data, OG images

**Status:** done
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

- `app/sitemap.ts` hardcodes `lastModified` to 2024-10-11 for `/` and `/blog`, and does not list `/apps` or `/resume`.
- No JSON-LD (`Person`) markup, and no canonical URLs.
- Blog posts and other pages share the same social image. `/api/og` exists (`app/api/og/route.tsx`) but only shows "BLOG POST" with a title.
- `robots.ts` disallows `/tags/` only.

- [x] Sitemap lists all public pages with real dates
- [x] `Person` JSON-LD on the home or about page
- [x] Canonical URL set in the root metadata
- [x] OG image per page type (home, blog post, project, resume)
- [ ] Checked with a rich-results or OG preview tool

## How to solve

Extend `/api/og` to take a `type` parameter. Add the JSON-LD as a `<script type="application/ld+json">` in the home page.

## Notes

- Canonical URLs are set per page (a root-level canonical would be inherited by every page). Sitemap dates for repo-owned pages are one constant in `app/sitemap.ts` that must be bumped on content changes; blog dates come from the database. The About and Privacy posts no longer appear as blog URLs.
- Not done: running a rich-results or OG preview tool needs the deployed site. `robots.ts` is unchanged on purpose so social bots can fetch `/api/og`.
