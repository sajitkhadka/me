import Link from "next/link";
import { Mail, Rss } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Icons } from "../custom-ui/icons";
import { Logo } from "../custom-ui/logo";

const explore = [
  { href: "/apps", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border/70 print:hidden">
      <div className="container mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <span className="font-mono text-sm font-semibold">
              sajit<span className="text-primary">.</span>dev
            </span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Integrations and event-driven backend systems, a home Kubernetes cluster, and notes on what I build.
          </p>
          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            all systems operational
          </p>
        </div>

        <nav aria-label="Footer" className="space-y-3 text-sm">
          <p className="eyebrow">Explore</p>
          <ul className="space-y-2">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="eyebrow">Elsewhere</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Icons.gitHub className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Icons.linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:sajitkhadka@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" /> Email
              </a>
            </li>
            <li>
              <a href="/feed.xml" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Rss className="h-4 w-4" /> RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="container mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>&copy; {new Date().getFullYear()} Sajit Khadka</span>
          <span className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <a href="/llms.txt" className="font-mono hover:text-foreground">llms.txt</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
