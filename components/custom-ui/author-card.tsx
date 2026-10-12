import Link from "next/link"
import { siteConfig } from "@/config/site"
import { AvatarIllustration } from "./avatar-illustration"

// Every post on this site is written by its owner, so the byline is the site's own author rather
// than whatever the sign-in provider stored for the account.
export default function AuthorCard() {
    return (
        <aside className="not-prose surface mt-8 flex items-center gap-5 p-5" aria-label="About the author">
            <AvatarIllustration className="h-16 w-16 shrink-0 rounded-full" title={`Portrait of ${siteConfig.author.name}`} />
            <div className="space-y-1">
                <p className="font-semibold">
                    Written by{" "}
                    <Link href="/about" rel="author" className="hover:text-primary">
                        {siteConfig.author.name}
                    </Link>
                </p>
                <p className="text-sm text-muted-foreground">{siteConfig.author.description}</p>
            </div>
        </aside>
    )
}
