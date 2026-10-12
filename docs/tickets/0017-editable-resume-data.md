# 0017 — Make resume data editable without a script

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The resume is a JSON string in `User.resume`. The only way to change it is to edit `scripts/populate-resume.js` and run it against the database. `userService.updateResume` exists but nothing calls it. Updating the resume is too hard, which is why it went stale.

- [ ] Admin can edit the resume from the site (a form or a JSON editor with validation)
- [x] Resume shape validated with zod (zod is already a dependency)
- [x] Alternative accepted: move the data to a typed `resume.json` in the repo

## How to solve

Option A: admin-only page `/resume/edit` that calls `updateResume`, guarded by the admin role in `auth.config.ts`.
Option B: keep the data in the repo and import it. Simpler, but each change needs a deploy.

## Notes

- Took option B. Resume data is `config/resume.ts`, validated by a zod schema when the module loads, so a typo fails the build. `/resume` reads it directly; each change ships with a normal deploy.
- Removed `scripts/populate-resume.js`, `app/resume/actions.ts` and the unused `getResume`/`updateResume` methods. `User.resume` is no longer read; the column stays in the schema. The first box (admin edits from the site) is not done by design.
