# 0027 — Require login on image upload and sanitise the file name

**Status:** done
**Type:** bug
**Created:** 2026-10-12
**Related:** [0018](0018-remove-unused-code-and-files.md), [0024](0024-migrate-database-and-secrets.md)

## Description

`POST /api/image/create` (`app/api/image/create/route.ts`) has no login check, and `pages.config.ts` lets every unlisted path through the middleware. Anyone can upload files to the site's Google Drive folder. The handler also writes the upload to `path.join('/tmp', file.name)` with the client's file name, so a name like `../../x` writes outside `/tmp`. The same applies to the `app/google/write-file` action, which was deleted in 0018.

- [x] The endpoint returns 401 unless the session user is the admin
- [x] The temp file name is generated (not taken from the client), or the upload streams without a temp file
- [x] Only image types and a size limit are accepted
- [ ] Image upload from the editor still works when logged in

## How to research

Look at how `app/blog/create/actions.ts` checks the session, and at `components/custom-ui/ImageUploader.tsx` and `hooks/image-upload/useUploader.ts`, which call the endpoint.

## Notes

- Admin-only check uses `session.user.role`, same field the editor UI uses. Temp file is a random UUID; images only, 5 MB cap. Last box (editor upload while logged in) needs a manual try-out; no DB or Drive from here.
