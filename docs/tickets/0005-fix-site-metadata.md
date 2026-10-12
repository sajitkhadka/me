# 0005 — Fix site title, description and OG metadata

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

Page metadata is stale or thin:

- `config/site.ts`: description is just "I am Sajit."
- `app/page.tsx`: description starts "Personal blog of Sajit Khadka…", `openGraph.type` is `article`, and the image is the 474 KB `public/avatar.png`.
- `app/apps/page.tsx`: keywords are "Applications, Development, Portfolio!"
- `app/about/page.tsx`: `openGraph.description` uses `aboutMe?.title`, which can be empty.

- [ ] Site description describes the current role and projects
- [ ] Home page OG type is `website`
- [ ] Every page has a unique title and description
- [ ] OG image is a 1200×630 image, not the raw avatar

## How to solve

1. Update `config/site.ts` and reuse it in each page's `metadata`.
2. Use the existing `/api/og` route for OG images (see 0014).
