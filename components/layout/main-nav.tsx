import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Icons } from '../custom-ui/icons'
import { auth } from '@/auth'
import { NavLink } from './nav-link'
import { Session } from 'next-auth'

type NavItem = {
  href: string
  label: string
  requiresAuth?: boolean
  requiresNoAuth?: boolean
}

export const navItems: NavItem[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/auth/login', label: 'Login', requiresNoAuth: true },
  { href: '/blog/create', label: 'Create Post', requiresAuth: true },
]

export type NavProps = {
  session: Session | null
}

export async function MainNav({ session }: NavProps) {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo />
        {/* <Image src={"/logo.png"} alt="Sajit.me Logo" width={100} height={20} /> */}
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      {navItems.map((item) => {
        const showItem =
          (!item.requiresAuth && !item.requiresNoAuth) ||
          (item.requiresAuth && session?.user) ||
          (item.requiresNoAuth && !session?.user)

        return showItem ? (
          <NavLink key={item.href} href={item.href}>
            {item.label}
          </NavLink>
        ) : null
      })}
    </nav>
  )
}