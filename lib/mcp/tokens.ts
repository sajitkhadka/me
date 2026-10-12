import { createHash, randomBytes } from "node:crypto";
import prisma from "@/lib/prisma";

export const TOKEN_PREFIX = "sk_me_";
export const REFRESH_PREFIX = "rt_me_";
export const DEFAULT_TOKEN_DAYS = 90;
export const MAX_TOKEN_DAYS = 365;
const DAY = 24 * 60 * 60 * 1000;

export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
export const newSecret = (prefix: string) => prefix + randomBytes(32).toString("hex");

/** Creates a token for `userId` and returns the secret once. Only its hash is kept. */
export async function createApiToken(userId: string, name: string, days = DEFAULT_TOKEN_DAYS, clientId?: string) {
  const secret = newSecret(TOKEN_PREFIX);
  const bounded = Math.min(Math.max(Math.floor(days), 1), MAX_TOKEN_DAYS);
  const token = await prisma.apiToken.create({
    data: {
      userId,
      name: name.trim().slice(0, 60) || "Claude",
      tokenHash: sha256(secret),
      clientId,
      expiresAt: new Date(Date.now() + bounded * DAY),
    },
  });
  return { secret, token };
}

export type McpPrincipal = { userId: string; tokenId: string; name: string };

/**
 * Resolves a bearer token to its owner on every request, so revoking one ends it at once.
 * Only admins may hold working tokens, even if the role changed after the token was made.
 */
export async function authenticateBearer(header: string | null): Promise<McpPrincipal | null> {
  const secret = header?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!secret || !secret.startsWith(TOKEN_PREFIX)) return null;
  const token = await prisma.apiToken.findUnique({
    where: { tokenHash: sha256(secret) },
    include: { user: { select: { role: true, name: true } } },
  });
  if (!token || token.revokedAt || token.expiresAt < new Date()) return null;
  if (token.user.role !== "admin") return null;
  // Best effort: a failed write must not turn a valid call into a 401.
  prisma.apiToken.update({ where: { id: token.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
  return { userId: token.userId, tokenId: token.id, name: token.name };
}
