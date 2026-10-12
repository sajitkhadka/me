"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createApiToken } from "@/lib/mcp/tokens";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Not allowed");
  return session.user.id;
}

export type CreateTokenState = { secret?: string; error?: string };

/** The secret is returned once, to the page that asked. Only its hash is stored. */
export async function createToken(_prev: CreateTokenState, formData: FormData): Promise<CreateTokenState> {
  const userId = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give the token a name, e.g. Claude Code on my laptop." };
  const days = Number(formData.get("days")) || 90;
  const { secret } = await createApiToken(userId, name, days);
  revalidatePath("/settings/claude");
  return { secret };
}

export async function revokeToken(formData: FormData) {
  const userId = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  // Scoped to the owner, so one admin cannot revoke another's token by guessing an id.
  await prisma.apiToken.updateMany({ where: { id, userId, revokedAt: null }, data: { revokedAt: new Date() } });
  revalidatePath("/settings/claude");
}
