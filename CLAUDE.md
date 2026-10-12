# CLAUDE.md

Next.js 14 personal site (sajitkhadka.com). Work only inside this folder; it is its own repo.

## Commands

```bash
npm install        # needs TIPTAP_PRO_TOKEN in the environment (see .npmrc); runs prisma generate
npm run dev        # dev server on :3000
npm run build
npm run lint
npm run generate   # prisma generate
npm run push       # prisma db push (writes to whatever DATABASE_URL points at)
npm run studio     # Prisma Studio
```

There are no tests. Check changes with `npx tsc --noEmit` and `npm run lint`.

## Constraints not visible from the code

- **Two content homes.** Home, About, /now, `/apps`, `/projects/[slug]` and `/resume` come from files
  in the repo: `config/projects.ts`, `config/resume.ts`, `config/site.ts`, `config/writing.ts` and the
  page files. Blog posts, comments, tags, users and the privacy policy are in Postgres.
- `public/resume.pdf` is a committed file rendered from `/resume/print`. After editing `config/resume.ts`, run `npm run build && npm start`, then `npm run resume:pdf` (needs Chrome or Edge) and commit the new PDF.
- `config/resume.ts` is validated with zod at load, so a wrong shape fails the build.
- **Tiptap Pro.** The editor imports `@tiptap-pro/*` packages. `.npmrc` reads `TIPTAP_PRO_TOKEN`;
  without it `npm install` and `npm run build` fail. Never put the token value in a file.
- **Images** are stored in Google Drive and served through `/api/image/[fileName]`. Uploads go through
  `/api/image/create`.
- **Env vars.** `.env` is gitignored. `NEXT_PUBLIC_*` values are baked in at build time.
- The sitemap date for repo-owned pages (`siteRefreshed` in `app/sitemap.ts`) is a constant; bump it
  when those pages change.
- Tickets are in `docs/tickets/`. Do not push or deploy unasked; the site is moving from Vercel to the k3s cluster (see `deploy/`).
