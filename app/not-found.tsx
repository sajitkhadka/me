import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/apps', label: 'Projects' },
]

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
            <p className="text-6xl font-bold">404</p>
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist or has moved.</p>
            <div className="flex flex-wrap justify-center gap-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(buttonVariants({ variant: link.href === '/' ? 'default' : 'outline', size: 'sm' }))}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
