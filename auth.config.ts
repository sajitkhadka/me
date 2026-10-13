import type { NextAuthConfig, Session } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';
import { guestOnlyPages, privatePages, publicPages } from './pages.config';
import { User } from '@prisma/client';

// Helper functions
const isLoggedIn = (auth: any) => !!auth?.user;

// Behind the ingress the server binds to HOSTNAME=0.0.0.0, so nextUrl.origin is http://0.0.0.0:3000.
// Build redirects from the public address instead.
const publicBase = (request: NextRequest) => {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
    if (host && !host.startsWith('0.0.0.0')) {
        const proto = request.headers.get('x-forwarded-proto')?.split(',')[0] ?? request.nextUrl.protocol.replace(':', '');
        return `${proto}://${host}`;
    }
    return process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
};

const handleRedirect = (request: NextRequest, pathname: string) => NextResponse.redirect(new URL(pathname, publicBase(request)));

// Authorization logic
const handleAuthorization = ({ auth, request }: {
    request: NextRequest;
    auth: Session | null;
}) => {
    const { pathname } = request.nextUrl;
    if (publicPages.includes(pathname)) {
        return true;
    }
    if (privatePages.includes(pathname)) {
        if (!isLoggedIn(auth)) {
            return handleRedirect(request, '/auth/login');
        }
        return true;
    }
    if (guestOnlyPages.includes(pathname)) {
        if (isLoggedIn(auth)) {
            return handleRedirect(request, '/blog/create');
        }
        return true;
    }

    return true;
};

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized: handleAuthorization,
        jwt({ token, account, user }) {  //This is invoked when user logs in for the first time and used to create token
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
                token.role = (user as User)?.role
                token.image = user?.image
            }
            return token
        },
        session({ session, token }) {  // the session contains the current user information and we can modify to use the token
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.image = token.image;
            return session;
        },
    },
    providers: [Google, Github],
} satisfies NextAuthConfig;
