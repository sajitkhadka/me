"use client";

import { useActionState, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { createToken, type CreateTokenState } from "./actions";

export function TokenForm({ mcpUrl }: { mcpUrl: string }) {
  const [state, action, pending] = useActionState<CreateTokenState, FormData>(createToken, {});
  const [copied, setCopied] = useState<"token" | "cmd" | null>(null);

  const command = state.secret
    ? `claude mcp add --transport http sajitkhadka-blog ${mcpUrl} --header "Authorization: Bearer ${state.secret}"`
    : "";

  const copy = async (what: "token" | "cmd", value: string) => {
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(what);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="space-y-4">
      <form action={action} className="flex flex-col gap-3 sm:flex-row">
        <input
          name="name"
          required
          maxLength={60}
          placeholder="Name, e.g. Claude Code on my laptop"
          aria-label="Token name"
          className="h-10 min-w-0 flex-1 rounded-lg border bg-background/60 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
        />
        <select
          name="days"
          defaultValue="90"
          aria-label="Expires after"
          className="h-10 rounded-lg border bg-background/60 px-3 text-sm outline-none focus:border-primary/60"
        >
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="365">1 year</option>
        </select>
        <button
          disabled={pending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />} Create token
        </button>
      </form>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      {state.secret && (
        <div role="status" className="space-y-3 rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm">
          <p className="font-medium">Copy this token now. It is shown only once.</p>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 break-all rounded-md bg-background/80 p-2 font-mono text-xs">{state.secret}</code>
            <button
              onClick={() => copy("token", state.secret!)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs hover:bg-accent"
            >
              {copied === "token" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
            </button>
          </div>
          <p className="text-muted-foreground">In Claude Code, run:</p>
          <div className="flex items-start gap-2">
            <code className="min-w-0 flex-1 break-all rounded-md bg-background/80 p-2 font-mono text-xs">{command}</code>
            <button
              onClick={() => copy("cmd", command)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs hover:bg-accent"
            >
              {copied === "cmd" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
