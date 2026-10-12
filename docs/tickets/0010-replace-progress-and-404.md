# 0010 — Replace placeholder /progress page and fix 404 styling

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`app/progress/page.tsx` is a "Work in Progress… Expected completion: Coming Soon" page, and the apps list links to it as "Code Lab". `app/not-found.tsx` and the progress page use a slate-to-cyan gradient that does not match the rest of the theme.

- [ ] `/progress` removed (or redirects to `/apps`) once the Code Lab entry is gone (see 0007)
- [ ] 404 page uses theme colours and works in dark mode
- [ ] 404 links to home, blog and apps
