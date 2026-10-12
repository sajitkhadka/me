"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { issueAuthCode } from "@/lib/mcp/oauth";

function withParams(base: string, params: Record<string, string>) {
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

/**
 * The consent step. Everything is re-checked here from the form, because hidden fields can be edited:
 * the signed-in admin, the client, the exact redirect URI and the PKCE challenge.
 */
export async function decide(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Not allowed");

  const clientId = String(formData.get("client_id") ?? "");
  const redirectUri = String(formData.get("redirect_uri") ?? "");
  const challenge = String(formData.get("code_challenge") ?? "");
  const state = String(formData.get("state") ?? "");
  const client = await prisma.oAuthClient.findUnique({ where: { id: clientId } });
  if (!client || !client.redirectUris.includes(redirectUri)) throw new Error("Unknown app or redirect address");
  if (formData.get("method") !== "S256" || challenge.length !== 43) throw new Error("PKCE S256 is required");

  if (formData.get("decision") !== "approve") {
    redirect(withParams(redirectUri, { error: "access_denied", state }));
  }
  const code = await issueAuthCode({ clientId, userId: session.user.id, redirectUri, codeChallenge: challenge });
  redirect(withParams(redirectUri, { code, state }));
}
