'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Icons } from '../custom-ui/icons'
import { MobileLink } from './nav-link'
import { navItems, NavProps } from './main-nav'
import { Session } from 'next-auth'




export function MobileNav({ session }: NavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          {navItems.map((item) => {
            const showItem =
              (!item.requiresAuth && !item.requiresNoAuth) ||
              (item.requiresAuth && session?.user) ||
              (item.requiresNoAuth && !session?.user)

            return showItem ? (
              <MobileLink
                key={item.href}
                onOpenChange={setOpen}
                href={item.href}
              >
                {item.label}
              </MobileLink>
            ) : null
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}