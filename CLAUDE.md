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
- **Claude can publish posts over MCP** (`/api/mcp`, see `docs/adr/0001-mcp-blog-publishing.md`). Tokens and OAuth tables are in `db/schema/mcp.prisma`; the schema is applied on deploy by the `db-push` init container (`prisma db push`, no data-loss flag), so a destructive schema change blocks the rollout instead of running. The endpoint is admin-only, draft-by-default, and reaches blog posts and tags only. Keep it that way: do not add tools for comments, users or token management.
- **SEO surface.** Site-wide JSON-LD is in `app/layout.tsx`; per-post JSON-LD is in `app/blog/[id]/page.tsx`; `app/robots.ts` names the AI crawlers; `llms.txt`, `llms-full.txt` and `feed.xml` are generated from the database. A new indexable page needs a canonical, one `<h1>`, and a line in `app/sitemap.ts`.
- **Design tokens** live in `app/globals.css` (dark is the default). Use `surface`, `eyebrow`, `text-gradient` and the `bg-primary` family instead of hard-coded colours.
- Tickets are in `docs/tickets/`. Do not push or deploy unasked; the site is moving from Vercel to the k3s cluster (see `deploy/`).
