# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# The Tiptap Pro token is a build secret, so it never lands in an image layer:
#   docker build --secret id=tiptap_token,env=TIPTAP_PRO_TOKEN .
COPY package*.json .npmrc ./
COPY db ./db
RUN --mount=type=secret,id=tiptap_token \
    TIPTAP_PRO_TOKEN="$(cat /run/secrets/tiptap_token)" \
    DATABASE_URL=postgresql://build npm ci

COPY . .

# NEXT_PUBLIC_* values are baked in at build time.
ARG NEXT_PUBLIC_APP_URL=https://sajitkhadka.com
ARG NEXT_PUBLIC_BASE_URL=https://sajitkhadka.com
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID=
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_TELEMETRY_DISABLED=1
# Type-check and page collection exceed the default Node heap.
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
