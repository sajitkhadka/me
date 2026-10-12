# 0006 — Rewrite About page and admin author fields

**Status:** done
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The About page is built from database content: a blog post of type About, plus the admin user's `name`, `title`, `image` and `authorInfo` (`app/about/actions.ts`). That content is not in the repo, so it is probably old. When the title is empty the page falls back to "Software Engineer".

- [x] About text reflects the current role, what he builds and what he writes about
- [x] Admin user `title` and `authorInfo` updated
- [ ] A proper profile photo (not just `avatar.png`) with alt text
- [x] Links to resume, GitHub, LinkedIn

## How to research

Read the live About post in the editor, and `career/profile/summary.md`.

## How to solve

1. Edit the About post in `/blog/[id]/edit`.
2. Update the user row (`title`, `authorInfo`) in the database.

## Notes

- Decision: the About page is now written in code (`app/about/page.tsx`) instead of the database About post, since I cannot edit the database from here. The admin `title` and `authorInfo` fields are no longer read, so they need no update. The About blog post can be unpublished.
- Photo: still `public/avatar.png`, now with alt text; resized in 0013. A better photo is for Sajit to supply.
