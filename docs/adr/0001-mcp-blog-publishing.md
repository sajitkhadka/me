# ADR-0001: Let Claude publish blog posts through an MCP endpoint in this app

## Status

Accepted

## Date

2026-10-12

## Context

Posts are written in the Tiptap editor at `/blog/create`. The author wants to draft and edit posts by talking to Claude, from Claude Code on a laptop and from claude.ai or the phone app. TickOff already solved the same problem (its ADR-0009 and ADR-0010): personal tokens for clients that can send a header, and OAuth with PKCE for hosted clients that cannot.

TickOff runs the MCP server as a separate Go service because it fronts a separate backend. Here the data is in this app's Postgres and the auth is this app's, so a second service would only add a deploy, a hostname and a copy of the user table.

## Decision

1. The MCP server is a route handler in this app: `POST /api/mcp`, Streamable HTTP, JSON-RPC, no SSE stream (GET answers 405). Tools: `list_posts`, `get_post`, `create_post`, `update_post`, `list_tags`.
2. Credentials are **personal tokens** (`sk_me_` plus 32 random bytes, only the SHA-256 stored, 90 days by default, at most 365, revocable at once). They are resolved to a user on every request, so revoking ends access immediately.
3. **OAuth for hosted clients**, in the same app: dynamic client registration, authorization code with PKCE (S256 only), a consent page at `/oauth/authorize`, and `/.well-known/oauth-*` discovery. A successful exchange issues an ordinary personal token plus a single-use rotating refresh token, so Settings shows OAuth connections beside manual tokens.
4. **Only admins** can create or use a token, and the consent page is admin-only. Sign-in on this site is open to anyone with a Google or GitHub account, so a signed-in user is not enough.
5. A token reaches **blog posts and tags only**, and only the caller's own posts of type "post". It cannot touch comments, users, the privacy policy, the About page, or token management (those need the browser session).
6. `create_post` saves a **draft** unless `published: true` is passed. Input is Markdown, rendered with raw HTML escaped, so an assistant cannot inject markup. There is no delete tool: unpublishing is `published: false`.

## Rationale

- One deployable and one auth model. Revocation, expiry and the admin check live in one place.
- Hash-only storage means a database read does not give anyone a working token.
- Drafts by default put a human review between the assistant and the public site.
- No delete tool means the worst a leaked token can do is publish or edit posts, both of which the Settings page lets the author undo by revoking and editing.

## Consequences

- Four new tables (`ApiToken`, `OAuthClient`, `OAuthCode`, `OAuthRefreshToken`, in `db/schema/mcp.prisma`). The Deployment has a `db-push` init container that runs `prisma db push` from the release image before the app starts, so the schema follows the code on every release. It never passes `--accept-data-loss`: a destructive change fails the init container, the rollout stops and the old pod keeps serving. The first run needs the init container in `k8s-config/me/me-deployment.yaml` and an image that contains the Prisma CLI, so tag a release first, then add the init container.
- `/.well-known/*`, `/api/mcp`, `/api/oauth/*` and `/oauth/authorize` are public routes. Cloudflare must pass them through uncached. Client registration is open by design and limited to 30 per hour; an unapproved client gets nothing.
- Posts made by Claude have no cover image: image upload is not an MCP tool.
- The editor still stores HTML. Markdown is converted once, on the way in; `get_post` returns HTML.
- Authorization codes live 60 seconds and are single use (deleted on first attempt, successful or not).
