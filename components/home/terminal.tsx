"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

type Item = { title: string; href: string; note?: string };
type Entry = { id: number; cmd?: string; out: React.ReactNode };

const PAGES: Record<string, string> = {
  projects: "/apps",
  blog: "/blog",
  resume: "/resume",
  about: "/about",
  now: "/now",
};

const COMMANDS = ["help", "whoami", "now", "stack", "projects", "blog", "contact", "open", "theme", "clear", ...Object.keys(PAGES)];

const Muted = ({ children }: { children: React.ReactNode }) => <span className="text-muted-foreground">{children}</span>;

function List({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-primary hover:underline">{item.title}</Link>
          {item.note && <Muted> {item.note}</Muted>}
        </li>
      ))}
    </ul>
  );
}

export function Terminal({ projects, posts }: { projects: Item[]; posts: Item[] }) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const history = useRef<string[]>([]);
  const cursor = useRef(0);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [intro, setIntro] = useState<string>("");
  const [ready, setReady] = useState(false);

  const push = (cmd: string | undefined, out: React.ReactNode) =>
    setEntries((prev) => [...prev, { id: nextId.current++, cmd, out }]);

  const run = (raw: string) => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (cmd.toLowerCase()) {
      case "":
        return push(raw, null);
      case "help":
        return push(raw, (
          <div className="grid grid-cols-[6.5rem_1fr] gap-x-3">
            {[
              ["whoami", "who I am"],
              ["now", "what I'm working on"],
              ["stack", "tools I use"],
              ["projects", "things I've built"],
              ["blog", "latest posts"],
              ["contact", "get in touch"],
              ["open <page>", "projects, blog, resume, about, now"],
              ["theme", "toggle dark / light"],
              ["clear", "clear the screen"],
            ].map(([c, d]) => (
              <span key={c} className="contents"><span className="text-primary">{c}</span><Muted>{d}</Muted></span>
            ))}
          </div>
        ));
      case "whoami":
        return push(raw, "Sajit Khadka, software engineer (integrations & backend)");
      case "now":
        return push(raw, <>event-driven pipelines at Perceptyx<br />a k3s cluster that ships on git tag</>);
      case "stack":
        return push(raw, "java  go  kafka  postgres  aws  k3s  next.js");
      case "projects":
        return push(raw, <List items={projects} />);
      case "blog":
        return push(raw, posts.length ? <List items={posts} /> : <Muted>no posts yet</Muted>);
      case "contact":
        return push(raw, <a href="mailto:sajitkhadka@gmail.com" className="text-primary hover:underline">sajitkhadka@gmail.com</a>);
      case "theme":
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        return push(raw, <Muted>switched to {resolvedTheme === "dark" ? "light" : "dark"}</Muted>);
      case "clear":
        return setEntries([]);
      case "open":
      case "cd":
      case "cat": {
        const target = PAGES[arg.replace(/^\/|\/$/g, "").toLowerCase()];
        if (!target) return push(raw, <Muted>{cmd}: no such page &quot;{arg}&quot;. Try: {Object.keys(PAGES).join(", ")}</Muted>);
        push(raw, <Muted>opening {target}…</Muted>);
        return router.push(target);
      }
      case "sudo":
        return push(raw, "nice try.");
      case "ls":
        return push(raw, Object.keys(PAGES).map((p) => `${p}/`).join("  "));
      default:
        if (PAGES[cmd.toLowerCase()]) {
          push(raw, <Muted>opening {PAGES[cmd.toLowerCase()]}…</Muted>);
          return router.push(PAGES[cmd.toLowerCase()]);
        }
        return push(raw, <Muted>command not found: {cmd}. Type <span className="text-primary">help</span>.</Muted>);
    }
  };

  // Intro: types "whoami" itself, prints the answer, then hands over the prompt.
  useEffect(() => {
    if (reduced) {
      push("whoami", "Sajit Khadka, software engineer (integrations & backend)");
      setReady(true);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const type = () => {
      i++;
      setIntro("whoami".slice(0, i));
      if (i < 6) { t = setTimeout(type, 110); return; }
      t = setTimeout(() => {
        setIntro("");
        push("whoami", "Sajit Khadka, software engineer (integrations & backend)");
        t = setTimeout(() => setReady(true), 450);
      }, 350);
    };
    t = setTimeout(type, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [entries, value, intro]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const raw = value;
      if (raw.trim()) { history.current.push(raw); }
      cursor.current = history.current.length;
      setValue("");
      run(raw);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cursor.current > 0) setValue(history.current[--cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor.current < history.current.length - 1) setValue(history.current[++cursor.current]);
      else { cursor.current = history.current.length; setValue(""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [first, ...rest] = value.split(/\s+/);
      if (!rest.length) {
        const match = COMMANDS.filter((c) => c.startsWith(first.toLowerCase()));
        if (match.length === 1) setValue(match[0] + (match[0] === "open" ? " " : ""));
      } else if (first === "open") {
        const match = Object.keys(PAGES).filter((c) => c.startsWith(rest.join(" ").toLowerCase()));
        if (match.length === 1) setValue(`open ${match[0]}`);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-border/80 bg-card "
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="relative flex items-center border-b border-border/80 px-4 py-2.5">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-xs text-muted-foreground">
          sajit — zsh
        </span>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-label="Interactive terminal"
        className="h-56 cursor-text space-y-1.5 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
      >
        {entries.map((entry) => (
          <div key={entry.id}>
            {entry.cmd !== undefined && (
              <p><span className="mr-2 text-primary">~ %</span>{entry.cmd}</p>
            )}
            {entry.out && <div className="text-foreground/90">{entry.out}</div>}
          </div>
        ))}

        <div className="flex items-center">
          <span className="mr-2 shrink-0 text-primary">~ %</span>
          {ready ? (
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Type a command"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="w-full bg-transparent text-transparent caret-transparent outline-none"
              />
              <span className="pointer-events-none absolute inset-0 whitespace-pre">
                {value}
                <span className="cursor-blink" aria-hidden="true" />
                {!value && !entries.some((e) => e.cmd !== undefined && e.cmd !== "whoami") && (
                  <span className="ml-3 text-muted-foreground/60">type help</span>
                )}
              </span>
            </div>
          ) : (
            <span>
              {intro}
              <span className="cursor-blink" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
