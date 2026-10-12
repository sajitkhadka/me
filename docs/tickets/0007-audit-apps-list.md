# 0007 — Audit and update the apps list

**Status:** open
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

- [ ] Every listed link opens and works
- [ ] Dead or placeholder entries removed or marked archived
- [ ] Shipped apps added with description and sort order
- [ ] Non-public projects get a case-study page instead of a link (see 0009)

## How to research

`deployment/README.md` ("What is deployed") lists hosts. Open each URL. Some are "tunnel only" or internal. Do not link internal hosts.

## How to solve

Insert or update rows in `MyApp` (name, description, icon, color, url, sortOrder). Do this in the database, not in code.
