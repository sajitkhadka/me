import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { publicOrigin } from "@/lib/mcp/origin";
import { headers } from "next/headers";
import { revokeToken } from "./actions";
import { TokenForm } from "./token-form";

export const metadata: Metadata = {
  title: "Claude connection",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const when = (d: Date | null) =>
  d ? d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "never";

export default async function ClaudeConnectionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login?callbackUrl=/settings/claude");
  if (session.user.role !== "admin") redirect("/");

  const tokens = await prisma.apiToken.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const h = await headers();
  const mcpUrl = `${publicOrigin({ url: `http://${h.get("host") ?? "localhost:3000"}/` })}/api/mcp`;
  const now = new Date();

  return (
    <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
      <header className="space-y-2">
        <p className="eyebrow">Settings</p>
        <h1 className="text-3xl font-bold">Claude connection</h1>
        <p className="text-muted-foreground">
          Let Claude list, draft, edit and publish blog posts for you. A token acts as you and nobody else, can only
          touch blog posts, and can be revoked at any time. Posts Claude creates are drafts until you say publish.
        </p>
      </header>

      <section className="surface space-y-3 p-6">
        <h2 className="text-lg font-semibold">Claude on the web or phone</h2>
        <p className="text-sm text-muted-foreground">
          In Claude, open <b>Settings → Connectors → Add custom connector</b> and paste this address. You will be sent
          back here to approve it. No token needed.
        </p>
        <code className="block break-all rounded-md border bg-background/60 p-2.5 font-mono text-sm">{mcpUrl}</code>
      </section>

      <section className="surface space-y-4 p-6">
        <h2 className="text-lg font-semibold">Claude Code or other clients: personal token</h2>
        <TokenForm mcpUrl={mcpUrl} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your tokens</h2>
        <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border bg-card/50">
          {tokens.map((token) => {
            const expired = token.expiresAt < now;
            const status = token.revokedAt ? "revoked" : expired ? "expired" : "active";
            return (
              <li key={token.id} className="flex items-center gap-4 px-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{token.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    created {when(token.createdAt)} · last used {when(token.lastUsedAt)} · expires {when(token.expiresAt)}
                  </p>
                </div>
                <span
                  className={
                    status === "active"
                      ? "rounded-full bg-primary/15 px-2 py-0.5 font-mono text-xs text-primary"
                      : "rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  }
                >
                  {status}
                </span>
                {status === "active" && (
                  <form action={revokeToken}>
                    <input type="hidden" name="id" value={token.id} />
                    <button className="text-sm text-destructive hover:underline" aria-label={`Revoke ${token.name}`}>
                      Revoke
                    </button>
                  </form>
                )}
              </li>
            );
          })}
          {tokens.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted-foreground">No tokens yet.</li>}
        </ul>
      </section>
    </div>
  );
}
