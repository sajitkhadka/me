import { auth } from "@/auth";
import { HeaderNav } from "./header-nav";

// A user's image is either a provider URL (Google, GitHub) or a Drive file id from our own uploads.
const avatarSrc = (image?: string | null) =>
  !image ? null : /^(https?:)?\/\//.test(image) || image.startsWith("/") ? image : `/api/image/${encodeURIComponent(image)}`;

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name ?? "Account",
        image: avatarSrc(session.user.image),
        isAdmin: session.user.role === "admin",
      }
    : null;
  return <HeaderNav user={user} />;
}
