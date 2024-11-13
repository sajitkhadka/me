'use client'

import { absoluteUrl, cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <Link
            href={absoluteUrl(href)}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
                pathname === href ? "text-foreground" : "text-foreground/60"
            )}
        >
            {children}
        </Link>
    )
}

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}

export { MobileLink, NavLink };
