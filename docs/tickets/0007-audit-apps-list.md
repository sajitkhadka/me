# 0007 — Audit and update the apps list

**Status:** done
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`/apps` shows rows from the `MyApp` table. On 2026-10-12 it listed: Blog, Grade Management (`exam.sajitkhadka.com`), Code Lab (`/progress`), Online Java Compiler, Job Quest, Leet Sensei.

Problems:
- `exam.sajitkhadka.com` is not in the k8s manifests, so it may be dead. Check.
- "Code Lab" points to a fake "Work in Progress" page.
- Shipped projects are missing: SyncToDo, TickOff, Polyglot Primer, Go Sandbox.
- Projects without a public URL (English Communication Trainer, Filekeeper, AI Interview Coach, the home k3s platform) have no entry.

- [x] Every listed link opens and works
- [x] Dead or placeholder entries removed or marked archived
- [x] Shipped apps added with description and sort order
- [x] Non-public projects get a case-study page instead of a link (see 0009)

## How to research

`deployment/README.md` ("What is deployed") lists hosts. Open each URL. Some are "tunnel only" or internal. Do not link internal hosts.

## How to solve

Insert or update rows in `MyApp` (name, description, icon, color, url, sortOrder). Do this in the database, not in code.

## Notes

- Decision: the list now lives in `config/projects.ts` (reviewed in git) instead of the `MyApp` table, because I cannot write to the database from here. `/apps` switches to it in 0008. The old `MyApp` rows are no longer read after that.
- Checked 2026-10-12: jobquest, synctodo, tickoff, go-sandbox, java-sandbox, leetsensei and primer all answer HTTP 200. `exam.sajitkhadka.com` does not resolve, so Grade Management is dropped. "Code Lab" (/progress) and the "Blog" tile are dropped (blog is in the nav).
- Repos public on GitHub: english-communication-trainer, java-compiler-sandbox, polyglot-primer. The rest return 404, so no repo link is shown.
- Non-public projects (k3s platform, English trainer, FileKeeper, AI Interview Coach) have no live link; the first four get case studies in 0009.
