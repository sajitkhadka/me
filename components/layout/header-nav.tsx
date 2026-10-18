"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { KeyRound, LogOut, Menu, PenLine } from "lucide-react";
import { Logo } from "@/components/custom-ui/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/apps", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export type HeaderUser = { name: string; image: string | null; isAdmin: boolean } | null;

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2 rounded-lg px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Sajit Khadka, home">
      <Logo className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
      <span className="text-base font-semibold tracking-tight">Sajit</span>
    </Link>
  );
}

function UserMenu({ user }: { user: NonNullable<HeaderUser> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-muted text-sm font-semibold transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Account menu"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate font-normal text-muted-foreground">{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/blog/create" className="cursor-pointer gap-2">
            <PenLine className="h-4 w-4" /> Write a post
          </Link>
        </DropdownMenuItem>
        {user.isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/settings/claude" className="cursor-pointer gap-2">
              <KeyRound className="h-4 w-4" /> Claude connection
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderNav({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 print:hidden sm:px-4">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 rounded-2xl border border-border/70 bg-background/70 px-2 sm:px-3 shadow-[0_8px_30px_-18px_rgb(0_0_0/0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {links.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-secondary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ModeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/auth/login"
              className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              Sign in
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-1 pt-14">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {[{ href: "/", label: "Home" }, ...links].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                    (item.href === "/" ? pathname === "/" : isActive(pathname, item.href))
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-lg border px-3 py-2.5 text-center text-base font-medium"
                >
                  Sign in
                </Link>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
