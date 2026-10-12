# 0004 — Remove phone number from resume page and seed script

**Status:** open
**Type:** bug
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The resume page shows a phone number with a `tel:` link (`app/resume/interactive-resume.tsx`, around line 109). The number is also committed in `scripts/populate-resume.js`, and the `me` repo is public. Anyone can scrape it.

- [ ] Phone removed from the resume page (or replaced by an email link)
- [ ] Phone removed from `scripts/populate-resume.js`
- [ ] `User.resume` JSON in the database no longer contains a phone
- [ ] Decide whether to clean git history (the number stays in old commits)

## How to solve

1. Delete the `personal.phone` block in the component and the field in the seed script.
2. Re-run the seed script (after 0003) to update the database.
3. Optional: rewrite history, or accept that the old number stays in it.
