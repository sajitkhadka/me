# 0019 — Upgrade Next.js, next-auth and Tiptap

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)
**Blocked by:** [0018](0018-remove-unused-code-and-files.md)

## Description

The site is on Next 14.2, React 18, `next-auth@5.0.0-beta`, Tiptap 2.8 and Tailwind 3. These are old. Do the upgrade after removing unused packages, so there is less to move.

- [ ] Next.js and React upgraded to a current supported version
- [ ] `next-auth` on a stable v5 release
- [ ] Tiptap packages on one matching version
- [ ] `npm audit` reviewed
- [ ] Login, blog create/edit, comments and image upload tested by hand

## How to solve

1. Upgrade one package family at a time and build after each.
2. Read each upgrade guide. The `middleware.ts` / `auth.config.ts` setup is the part most likely to change.
3. Check `next.config.mjs` image rules and the SVG loader still work.
