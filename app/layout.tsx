import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import ThemeProvider from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { Inter, JetBrains_Mono } from "next/font/google";
import SessionProvider from "@/components/providers/session-provider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrainsMono",
});

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background font-sans", inter.variable, jetbrainsMono.variable)}
      >
        <ThemeProvider>
          <SessionProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              <main className="flex-1 w-full">{children}</main>
              <SiteFooter />
              {umamiWebsiteId && (
                <Script
                  src="https://stats.sajitkhadka.com/s.js"
                  data-website-id={umamiWebsiteId}
                  strategy="afterInteractive"
                />
              )}
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
