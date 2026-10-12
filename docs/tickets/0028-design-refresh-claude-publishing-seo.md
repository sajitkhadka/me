# 0028 — Design refresh, Claude blog publishing, SEO and AI discoverability

**Status:** in progress
**Type:** feature
**Created:** 2026-10-12

## Description

Sajit asked for: a modern, simple look that feels like a backend developer's site (slick animation, a background, a custom avatar), a fixed navbar, a better login page and a new logo; Claude being able to add blog posts over MCP the way TickOff works; and the site being fully SEO and AI-SEO friendly.

- [x] Dark-first design tokens, grid background, animated signal-field hero, terminal card
- [x] New logo (`components/custom-ui/logo.tsx`), favicon, apple icon, new OG card
- [x] New SVG avatar (`avatar-illustration.tsx`), `public/avatar.png` for structured data
- [x] Floating navbar with active indicator, user menu, working mobile drawer
- [x] New login page (honours `callbackUrl`, same-site paths only)
- [x] MCP endpoint, personal tokens, OAuth for hosted clients ([ADR-0001](../adr/0001-mcp-blog-publishing.md))
- [x] Settings page `/settings/claude` (admin) and consent page `/oauth/authorize`
- [x] SEO: title template, site-wide `Person` + `WebSite` graph, `BlogPosting` + breadcrumbs per post, canonical redirect for post URLs, noindex for drafts and private routes, robots with named AI crawlers, `llms.txt`, `llms-full.txt`, Atom feed, web manifest, valid `<time>` values, one `<h1>` per page
- [x] Schema sync on deploy: `db-push` init container in `deploy/k8s/me-deployment.yaml`, Prisma CLI copied into the image (not yet built or run in the cluster)
- [ ] Tag a release, then copy the init container into `k8s-config/me/me-deployment.yaml`
- [ ] Add Claude as a connector (claude.ai: Settings, Connectors, custom connector, `https://sajitkhadka.com/api/mcp`) and publish a test draft
- [ ] Check the pages in a rich-results test and a social-card preview after deploy
- [ ] Submit `sitemap.xml` in Search Console; confirm Cloudflare does not cache `/api/mcp` or `/.well-known/*`

## Notes

- Checked locally against the local Postgres: token create, tool calls, validation errors, ownership scoping, publish, and the full OAuth code, refresh and reuse-rejection flow. The consent screen was rendered but not clicked through with a real claude.ai client.
- The new avatar is drawn from the old illustration, not from a photo. Swapping in a photo is a one-file change (`avatar-illustration.tsx`).
