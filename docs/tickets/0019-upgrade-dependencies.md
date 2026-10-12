# 0019 — Upgrade Next.js, next-auth and Tiptap

**Status:** blocked
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)
**Blocked by:** [0018](0018-remove-unused-code-and-files.md)

## Description

**Blocked:** the Tiptap Pro token is not available here, so the project cannot be built or tested after an upgrade.

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

## Notes

- Not started, on purpose. I checked first: this machine has no `TIPTAP_PRO_TOKEN`, so the Tiptap Pro packages cannot be installed (registry returns 403). Without them `npm run build` cannot run, and the editor (the part most affected by an upgrade) cannot be built or tried. The ticket's own acceptance needs a build plus hand tests of login, post create/edit, comments and image upload.
- Facts for whoever does it (checked 2026-10-12): latest `next` is 16.4.0 (repo is on 14.2); latest `@tiptap/core` is 3.31.4 (repo is on 2.8.0, so a major jump that also moves the Pro extensions); a fresh-resolve `npm audit` of the non-Pro dependencies shows 67 findings (1 critical, 11 high), most from transitive packages such as `uuid` via `googleapis`. The audit was run on a copy without the Pro packages, so treat the numbers as indicative.
- Suggested order: set the token, upgrade `googleapis` (patch-level fix for uuid), then Next 14 → 15 with `next-auth` v5, then Tiptap 2 → 3 last as its own commit.
