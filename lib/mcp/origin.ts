import { siteConfig } from "@/config/site";

/** Public address of the site, used in OAuth discovery documents and 401 challenges. */
export function publicOrigin(req: { url: string }): string {
  if (process.env.NODE_ENV === "production") {
    return (process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url).replace(/\/$/, "");
  }
  return new URL(req.url).origin;
}
