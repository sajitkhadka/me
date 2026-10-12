# 0018 — Remove unused dependencies, imports and stray files

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

- `app/resume/page.tsx` imports `useState` and `useEffect` in a server component and does not use them.
- `package.json` has about 20 Tiptap packages, including Pro extensions that need a registry token, and collaboration packages (`@tiptap/extension-collaboration`, `collaboration-cursor`, `y-prosemirror`). Some may be unused.
- Other possibly unused: `iframe-resizer`, `react-hot-toast` (next to `sonner`), `jsonwebtoken`, `googleapis`.
- `yarn-error.log` and a `.qodo/` folder sit in the repo root. The project uses npm.
- `app/google/*` pages and `app/editor/page.tsx` may be experiments.

- [ ] Each dependency checked with a search of the source. Unused ones removed
- [ ] Unused imports removed
- [ ] Stray files deleted and ignored
- [ ] `npm run build` and `npm run lint` pass

## How to research

Search for each package name in `app/`, `components/`, `editor/`, `lib/`, `db/`. Check `git ls-files` to see whether the stray files are tracked.
