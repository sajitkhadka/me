"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/custom-ui/icons";
import { Logo } from "@/components/custom-ui/logo";
import { handleGithubSignIn, handleGoogleSignIn } from "./actions";

const providers = [
  { id: "google", label: "Continue with Google", Icon: Icons.google, action: handleGoogleSignIn },
  { id: "github", label: "Continue with GitHub", Icon: Icons.gitHub, action: handleGithubSignIn },
] as const;

// Only same-site paths are accepted, so the login page cannot be used as an open redirect.
const safePath = (value: string | null) => (value && value.startsWith("/") && !value.startsWith("//") ? value : undefined);

function SignInCard() {
  const next = safePath(useSearchParams().get("callbackUrl"));
  const [pending, start] = useTransition();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-[calc(100dvh-10rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="surface space-y-7 p-8 shadow-[0_30px_80px_-40px_hsl(var(--primary)/0.5)]">
          <div className="space-y-3 text-center">
            <Logo className="mx-auto h-12 w-12" />
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to comment on and react to posts.
            </p>
          </div>

          <div className="grid gap-3">
            {providers.map(({ id, label, Icon, action }) => (
              <button
                key={id}
                disabled={pending}
                onClick={() => {
                  setActive(id);
                  start(() => action(next));
                }}
                className="flex h-11 items-center justify-center gap-3 rounded-lg border bg-background/60 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              >
                {pending && active === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                {label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing you accept the{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            &larr; Back to the site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInCard />
    </Suspense>
  );
}
