
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { auth } from "@/auth";
import SignOutButton from "./sign-out";

export async function SiteHeader() {
  const session = await auth();
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav session={session} />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
            {session?.user ? <div className="hidden sm:block"><SignOutButton /> </div> : null}
            <MobileNav session={session} />
          </nav>
        </div>
      </div>
    </header>
  );
}
