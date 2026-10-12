import { auth } from "@/auth";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name ?? "Account",
        image: session.user.image ?? null,
        isAdmin: session.user.role === "admin",
      }
    : null;
  return <HeaderNav user={user} />;
}
