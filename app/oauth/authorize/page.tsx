import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Logo } from "@/components/custom-ui/logo";
import { decide } from "./actions";

export const metadata: Metadata = { title: "Connect an app", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Search = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100dvh-10rem)] items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
      <div className="surface relative w-full max-w-md space-y-6 p-8">{children}</div>
    </div>
  );
}

export default async function AuthorizePage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const clientId = one(sp.client_id);
  const redirectUri = one(sp.redirect_uri);
  const challenge = one(sp.code_challenge);
  const method = one(sp.code_challenge_method);
  const state = one(sp.state);

  // A bad client or redirect address is shown here and never redirected to, so this page cannot be
  // used to bounce a visitor to an address the client did not register.
  const client = clientId ? await prisma.oAuthClient.findUnique({ where: { id: clientId } }) : null;
  if (!client || !client.redirectUris.includes(redirectUri) || one(sp.response_type) !== "code" || method !== "S256" || challenge.length !== 43) {
    return (
      <Shell>
        <h1 className="text-xl font-semibold">This connection request is not valid</h1>
        <p className="text-sm text-muted-foreground">
          The app, its return address or its security challenge could not be verified. Go back to the app and try again.
        </p>
      </Shell>
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    const back = `/oauth/authorize?${new URLSearchParams(sp as Record<string, string>).toString()}`;
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(back)}`);
  }
  if (session.user.role !== "admin") {
    return (
      <Shell>
        <h1 className="text-xl font-semibold">Only the site owner can connect apps</h1>
        <p className="text-sm text-muted-foreground">You are signed in as {session.user.name ?? "a visitor"}, which cannot manage the blog.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-3 text-center">
        <Logo className="mx-auto h-12 w-12" />
        <h1 className="text-2xl font-semibold">
          Connect <span className="text-gradient">{client.name}</span>?
        </h1>
        <p className="text-sm text-muted-foreground">Signed in as {session.user.name ?? session.user.email}</p>
      </div>

      <ul className="space-y-3 rounded-xl border bg-background/50 p-4 text-sm">
        <li className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>List, read, draft, edit and publish your blog posts and tags.</span>
        </li>
        <li className="flex gap-3">
          <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>Nothing else: no comments, users, settings or other tokens. Revoke it any time in Settings.</span>
        </li>
      </ul>

      <form action={decide} className="grid grid-cols-2 gap-3">
        <input type="hidden" name="client_id" value={client.id} />
        <input type="hidden" name="redirect_uri" value={redirectUri} />
        <input type="hidden" name="code_challenge" value={challenge} />
        <input type="hidden" name="method" value={method} />
        <input type="hidden" name="state" value={state} />
        <button name="decision" value="deny" className="h-11 rounded-lg border text-sm font-medium transition-colors hover:bg-accent">
          Cancel
        </button>
        <button name="decision" value="approve" className="h-11 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Approve
        </button>
      </form>
      <p className="text-center font-mono text-xs text-muted-foreground">
        returns to {new URL(redirectUri).host}
      </p>
    </Shell>
  );
}
