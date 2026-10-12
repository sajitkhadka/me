# 0021 — Add CLAUDE.md and rewrite README

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`README.md` is eight lines and lists a tech stack only. The folder index calls the site an "MDX blog", but it is a Postgres-backed blog with a Tiptap editor. There is no `CLAUDE.md`. The newer projects have both, plus `ARCHITECTURE.md`.

- [ ] README leads with what the site is, then how to run it
- [ ] README lists required env vars by name (never values)
- [ ] `CLAUDE.md` has the commands (`npm run dev`, `generate`, `push`, `studio`), the DB-driven content note (About, apps and resume live in the database, not in the repo), and the Tiptap Pro token note (`.npmrc` reads an env var)
- [ ] The root `D:\projects\README.md` entry for `me` corrected
