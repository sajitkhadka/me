import type { NextAuthConfig, Session } from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';
import { publicPages, privatePages, guestOnlyPages } from './pages.config';

// Helper functions
const isLoggedIn = (auth: any) => !!auth?.user;

const handleRedirect = (url: URL, pathname: string) => NextResponse.redirect(new URL(pathname, url));

// Authorization logic
const handleAuthorization = ({ auth, request: { nextUrl } }: {
    request: NextRequest;
    auth: Session | null;
}) => {
    const { pathname } = nextUrl;
    if (publicPages.includes(pathname)) {
        return true;
    }
    if (privatePages.includes(pathname)) {
        if (!isLoggedIn(auth)) {
            return handleRedirect(nextUrl, '/auth/login');
        }
        return true;
    }
    if (guestOnlyPages.includes(pathname)) {
        if (isLoggedIn(auth)) {
            return handleRedirect(nextUrl, '/blog/create');
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
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
    providers: [Google],
} satisfies NextAuthConfig;
