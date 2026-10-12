"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AvatarIllustration } from "@/components/custom-ui/avatar-illustration";

type Line = { kind: "cmd" | "out"; text: string };

const lines: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "sajit khadka, software engineer (integrations)" },
  { kind: "cmd", text: "cat now.txt" },
  { kind: "out", text: "event-driven pipelines at Perceptyx" },
  { kind: "out", text: "a k3s cluster that ships on git tag" },
  { kind: "cmd", text: "ls stack/" },
  { kind: "out", text: "java  go  kafka  postgres  aws  k3s  next.js" },
];

export function HeroTerminal() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)] backdrop-blur"
      >
        <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">sajit@home-k3s: ~</span>
        </div>
        <div className="min-h-[14rem] space-y-1.5 p-5 pr-24 font-mono text-[13px] leading-relaxed sm:text-sm">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduced ? 0 : 0.5 + i * 0.42, duration: 0.3 }}
              className={line.kind === "cmd" ? "text-foreground" : "text-muted-foreground"}
            >
              {line.kind === "cmd" && <span className="mr-2 text-primary">$</span>}
              {line.text}
            </motion.p>
          ))}
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.5 + lines.length * 0.42 }}
            className="cursor-blink text-foreground"
          >
            <span className="mr-2 text-primary">$</span>
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 160, damping: 16 }}
        className="absolute -right-2 -top-8 sm:-right-6 sm:-top-10"
      >
        <div className="relative rounded-full p-1 ring-1 ring-primary/50 [background:conic-gradient(from_180deg,hsl(var(--primary)),hsl(var(--brand-2)),hsl(var(--primary)))]">
          <AvatarIllustration className="h-24 w-24 rounded-full bg-background sm:h-28 sm:w-28" />
          <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
