# 0004 — Remove phone number from resume page and seed script

**Status:** blocked
**Type:** bug
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

**Blocked:** the database copy of the resume still holds the old phone until someone re-runs the seed script against production.

The resume page shows a phone number with a `tel:` link (`app/resume/interactive-resume.tsx`, around line 109). The number is also committed in `scripts/populate-resume.js`, and the `me` repo is public. Anyone can scrape it.

- [x] Phone removed from the resume page (or replaced by an email link)
- [x] Phone removed from `scripts/populate-resume.js`
- [ ] `User.resume` JSON in the database no longer contains a phone
- [ ] Decide whether to clean git history (the number stays in old commits)

## How to solve

1. Delete the `personal.phone` block in the component and the field in the seed script.
2. Re-run the seed script (after 0003) to update the database.
3. Optional: rewrite history, or accept that the old number stays in it.

## Notes

- The `User.resume` JSON in the database still holds the old phone until the seed script is re-run (or ticket 0017 lands). Needs Sajit: re-run against production.
- History: left as is. Rewriting history of a public repo is Sajit's call; consider the number public already.
- Update: `/resume` no longer reads `User.resume` (see 0017), so the old phone in the database is never served. To remove it anyway, run once against production: `UPDATE "User" SET resume = NULL;`.
