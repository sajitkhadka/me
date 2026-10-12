# 0018 — Remove unused dependencies, imports and stray files

**Status:** done
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

- `app/resume/page.tsx` imports `useState` and `useEffect` in a server component and does not use them.
- `package.json` has about 20 Tiptap packages, including Pro extensions that need a registry token, and collaboration packages (`@tiptap/extension-collaboration`, `collaboration-cursor`, `y-prosemirror`). Some may be unused.
- Other possibly unused: `iframe-resizer`, `react-hot-toast` (next to `sonner`), `jsonwebtoken`, `googleapis`.
- `yarn-error.log` and a `.qodo/` folder sit in the repo root. The project uses npm.
- `app/google/*` pages and `app/editor/page.tsx` may be experiments.

- [x] Each dependency checked with a search of the source. Unused ones removed
- [x] Unused imports removed
- [x] Stray files deleted and ignored
- [ ] `npm run build` and `npm run lint` pass (lint passes; build not run here)

## How to research

Search for each package name in `app/`, `components/`, `editor/`, `lib/`, `db/`. Check `git ls-files` to see whether the stray files are tracked.

## Notes

- Removed: `@tiptap/html`, `cal-sans`, `iframe-resizer`, `jsonwebtoken`, `@types/jsonwebtoken`, `nanoid` (no imports anywhere). Kept: the Tiptap Pro and collaboration packages (the editor imports them; `y-prosemirror` is a peer of the collaboration extension), `googleapis` and `google-auth-library` (image storage on Google Drive), `react-hot-toast` and `sonner` (both used).
- Lock file was edited by hand to drop those entries (npm install is not possible here without the Tiptap token); run `npm install` once to tidy it.
- Deleted `app/google/*` (an unauthenticated Drive upload test page, see 0027) and `app/editor/page.tsx` (unlinked editor demo). Deleted untracked `yarn-error.log` and the empty `.qodo/` (both were already gitignored). Dropped the unused stats block from the resume component.
- Checks: `next lint` clean and `tsc` clean outside the Tiptap Pro editor files. `npm run build` was not run (needs the Tiptap token).
