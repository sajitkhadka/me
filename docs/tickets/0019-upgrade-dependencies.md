# 0019 — Upgrade Next.js, next-auth and Tiptap

**Status:** blocked
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)
**Blocked by:** [0018](0018-remove-unused-code-and-files.md)

## Description

**Blocked:** the code is upgraded and builds, but login, post create/edit, comments and image upload need a database and OAuth to try by hand.

The site is on Next 14.2, React 18, `next-auth@5.0.0-beta`, Tiptap 2.8 and Tailwind 3. These are old. Do the upgrade after removing unused packages, so there is less to move.

- [x] Next.js and React upgraded to a current supported version
- [ ] `next-auth` on a stable v5 release
- [x] Tiptap packages on one matching version
- [x] `npm audit` reviewed
- [ ] Login, blog create/edit, comments and image upload tested by hand

## How to solve

1. Upgrade one package family at a time and build after each.
2. Read each upgrade guide. The `middleware.ts` / `auth.config.ts` setup is the part most likely to change.
3. Check `next.config.mjs` image rules and the SVG loader still work.

## Notes

- Not started, on purpose. I checked first: this machine has no `TIPTAP_PRO_TOKEN`, so the Tiptap Pro packages cannot be installed (registry returns 403). Without them `npm run build` cannot run, and the editor (the part most affected by an upgrade) cannot be built or tried. The ticket's own acceptance needs a build plus hand tests of login, post create/edit, comments and image upload.
- Facts for whoever does it (checked 2026-10-12): latest `next` is 16.4.0 (repo is on 14.2); latest `@tiptap/core` is 3.31.4 (repo is on 2.8.0, so a major jump that also moves the Pro extensions); a fresh-resolve `npm audit` of the non-Pro dependencies shows 67 findings (1 critical, 11 high), most from transitive packages such as `uuid` via `googleapis`. The audit was run on a copy without the Pro packages, so treat the numbers as indicative.
- Suggested order: set the token, upgrade `googleapis` (patch-level fix for uuid), then Next 14 → 15 with `next-auth` v5, then Tiptap 2 → 3 last as its own commit.

- Done 2026-10-12 with the token from `.env.prod` (loaded into the shell, never printed). Next 14.2 -> 15.5, React 18 -> 19, `googleapis` 144 -> 185 (with `google-auth-library` 11 and a direct `uuid` dependency, which was only transitive before), all `@tiptap/*` on 2.27.3 and Tiptap Pro on 2.x, plus `lucide-react` 0.577, framer-motion 12, cmdk 1.1, next-themes, sonner and the Radix packages (they pinned React 18 peers).
- Stopped at Next 15, not 16, and Tiptap 2, not 3: each is a further major jump and 15 / 2.27 are the conservative step. Next 16 and Tiptap 3 can be their own tickets.
- `next-auth` has no stable v5; the newest is `5.0.0-beta.32`, so the box stays unticked.
- Code changes: async `params` / `searchParams` in the pages and the image route, `React.JSX.Element`, lucide icon names in the text-align buttons, and `immediatelyRender: false` for the editor (it crashed during prerender on the new React).
- Checked: `tsc` and `next lint` clean; `next build` passes (with a dummy database URL); a production server answers 200 on `/`, `/about`, `/now`, `/apps`, `/projects/*`, `/resume`, `/resume/print`, `/auth/login`, `/api/health` and 401 on an anonymous image upload. `/blog` and the sitemap return 500 only because the dummy database is unreachable.
- Audit: 73 findings left (62 moderate, 11 high, 0 critical), down from 102. The high ones are the glob/postcss chain inside `tailwindcss` (build-time tooling), so nothing reaches request handling.
