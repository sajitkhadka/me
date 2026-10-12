import { createHash, timingSafeEqual } from "node:crypto";
import prisma from "@/lib/prisma";
import { createApiToken, newSecret, REFRESH_PREFIX, sha256 } from "./tokens";

export const AUTH_CODE_TTL_MS = 60_000;
const REFRESH_TTL_MS = 365 * 24 * 60 * 60 * 1000;
const MAX_CLIENTS_PER_HOUR = 30;
const MAX_REDIRECT_URIS = 5;

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
};

export function oauthError(status: number, error: string, description: string) {
  return Response.json({ error, error_description: description }, { status, headers: { ...CORS, "Cache-Control": "no-store" } });
}

export function validRedirectUri(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (!u.host || u.hash || u.username || u.password) return false;
    if (u.protocol === "https:") return true;
    return u.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
  } catch {
    return false;
  }
}

/** Open on purpose (dynamic client registration): a client gets nothing until an admin approves it. */
export async function registerClient(body: { client_name?: unknown; redirect_uris?: unknown }) {
  const uris = Array.isArray(body.redirect_uris) ? body.redirect_uris : [];
  if (uris.length < 1 || uris.length > MAX_REDIRECT_URIS || !uris.every((u) => typeof u === "string" && validRedirectUri(u))) {
    return oauthError(400, "invalid_redirect_uri", "give 1 to 5 redirect URIs; https, or http on localhost");
  }
  const recent = await prisma.oAuthClient.count({ where: { createdAt: { gt: new Date(Date.now() - 3_600_000) } } });
  if (recent >= MAX_CLIENTS_PER_HOUR) return oauthError(429, "temporarily_unavailable", "too many registrations, try later");

  const name = (typeof body.client_name === "string" ? body.client_name.trim() : "").slice(0, 40) || "Claude";
  const client = await prisma.oAuthClient.create({ data: { name, redirectUris: uris as string[] } });
  return Response.json(
    {
      client_id: client.id,
      client_name: client.name,
      redirect_uris: client.redirectUris,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    },
    { status: 201, headers: { ...CORS, "Cache-Control": "no-store" } },
  );
}

/** Stores a one-minute, single-use authorization code and returns the plain value for the redirect. */
export async function issueAuthCode(input: { clientId: string; userId: string; redirectUri: string; codeChallenge: string }) {
  const code = newSecret("ac_");
  await prisma.oAuthCode.create({
    data: {
      codeHash: sha256(code),
      clientId: input.clientId,
      userId: input.userId,
      redirectUri: input.redirectUri,
      codeChallenge: input.codeChallenge,
      expiresAt: new Date(Date.now() + AUTH_CODE_TTL_MS),
    },
  });
  return code;
}

function pkceMatches(verifier: string, challenge: string): boolean {
  if (verifier.length < 43 || verifier.length > 128) return false;
  const want = createHash("sha256").update(verifier).digest("base64url");
  const a = Buffer.from(want);
  const b = Buffer.from(challenge);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function issueTokens(client: { id: string; name: string }, userId: string) {
  const { secret, token } = await createApiToken(userId, `Claude: ${client.name}`, 90, client.id);
  const refresh = newSecret(REFRESH_PREFIX);
  await prisma.oAuthRefreshToken.create({
    data: {
      tokenHash: sha256(refresh),
      apiTokenId: token.id,
      clientId: client.id,
      userId,
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
    },
  });
  return Response.json(
    {
      access_token: secret,
      token_type: "Bearer",
      expires_in: Math.floor((token.expiresAt.getTime() - Date.now()) / 1000),
      refresh_token: refresh,
    },
    { headers: { ...CORS, "Cache-Control": "no-store" } },
  );
}

export async function exchangeToken(form: URLSearchParams) {
  const grant = form.get("grant_type");

  if (grant === "authorization_code") {
    // Deleting is the single-use guarantee: a second request finds nothing.
    const row = await prisma.oAuthCode
      .delete({ where: { codeHash: sha256(form.get("code") ?? "") } })
      .catch(() => null);
    if (!row || row.expiresAt < new Date()) return oauthError(400, "invalid_grant", "the code is wrong, used or expired");
    if (
      row.clientId !== form.get("client_id") ||
      row.redirectUri !== form.get("redirect_uri") ||
      !pkceMatches(form.get("code_verifier") ?? "", row.codeChallenge)
    ) {
      return oauthError(400, "invalid_grant", "the code does not match this request");
    }
    const client = await prisma.oAuthClient.findUnique({ where: { id: row.clientId } });
    if (!client) return oauthError(400, "invalid_client", "unknown client");
    return issueTokens(client, row.userId);
  }

  if (grant === "refresh_token") {
    const row = await prisma.oAuthRefreshToken
      .delete({ where: { tokenHash: sha256(form.get("refresh_token") ?? "") } })
      .catch(() => null);
    if (!row || row.expiresAt < new Date() || row.clientId !== form.get("client_id")) {
      return oauthError(400, "invalid_grant", "the refresh token is wrong, used, expired or for another app");
    }
    const client = await prisma.oAuthClient.findUnique({ where: { id: row.clientId } });
    const old = await prisma.apiToken.findUnique({ where: { id: row.apiTokenId } });
    // A revoked connection must not be able to renew itself.
    if (!client || !old || old.revokedAt) return oauthError(400, "invalid_grant", "this connection was revoked");
    await prisma.apiToken.update({ where: { id: old.id }, data: { revokedAt: new Date() } });
    return issueTokens(client, row.userId);
  }

  return oauthError(400, "unsupported_grant_type", "use authorization_code or refresh_token");
}
