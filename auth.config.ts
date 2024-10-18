import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import prisma from './lib/prisma';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            //   if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            //   } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            //   }

            const isLoginPage = nextUrl.pathname === '/auth/login';
            if (isLoginPage && isLoggedIn) {
                return Response.redirect(new URL('/blog/create', nextUrl));
            }
            return true;
        },
    },
    // adapter: PrismaAdapter(prisma),
    providers: [Google],
    // session: { strategy: "jwt" }
} satisfies NextAuthConfig;