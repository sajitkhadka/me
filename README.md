# sajitkhadka.com

My personal site: a short intro, a projects page with case studies, a resume, a /now page, and a blog
with its own editor. Next.js on the front, Postgres behind it for blog posts, comments and logins.

The people-facing content is split in two places on purpose:

- **In the repo:** the home page, About, /now, the projects list and case studies (`config/projects.ts`),
  and the resume (`config/resume.ts`). Edit the file, deploy.
- **In the database:** blog posts, comments, tags, users and the privacy policy. Edit these in the
  site's editor once logged in.

## Run it

```bash
export TIPTAP_PRO_TOKEN=...   # the editor uses Tiptap Pro packages; .npmrc reads this variable
npm install                   # also runs `prisma generate`
npm run push                  # create tables in the database from db/schema
npm run dev                   # http://localhost:3000
```

Other scripts: `npm run build`, `npm run lint`, `npm run studio` (Prisma Studio).

## Environment variables

Names only. Put values in `.env` (gitignored), never in git.

| Name | Used for |
| --- | --- |
| `DATABASE_URL` | Postgres connection (Prisma) |
| `AUTH_SECRET`, `AUTH_URL` | NextAuth |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | GitHub login |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google login |
| `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_API_BASE_URL` | Absolute URLs and metadata base |
| `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_FOLDER_ID` | Image storage in Google Drive |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics (build time; optional) |
| `TIPTAP_PRO_TOKEN` | Install-time only, for the Tiptap Pro registry |

## Stack

Next.js 14 (App Router), Tailwind and shadcn/ui, Prisma with PostgreSQL, NextAuth v5, Tiptap editor.

## Ideas and work items

Tickets live in [`docs/tickets/`](docs/tickets/README.md).
