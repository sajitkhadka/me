import Link from "next/link";
import { siteConfig } from "@/config/site";

const links = [
  { href: siteConfig.links.github, label: "GitHub", external: true },
  { href: siteConfig.links.linkedin, label: "LinkedIn", external: true },
  { href: "mailto:sajitkhadka@gmail.com", label: "Email", external: true },
  { href: "/feed.xml", label: "RSS", external: true },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border/70 print:hidden">
      <div className="container mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6">
        <span>&copy; {new Date().getFullYear()} Sajit Khadka</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((l) => (
            <a key={l.label} href={l.href} rel={l.href.startsWith("http") ? "noopener noreferrer me" : undefined} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Link href="/privacy-policy" className="transition-colors hover:text-foreground">Privacy</Link>
          <a href="/llms.txt" className="transition-colors hover:text-foreground">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
}
