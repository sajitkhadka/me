import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import ThemeProvider from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { JetBrains_Mono } from "next/font/google";
import SessionProvider from "@/components/providers/session-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono"
});



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
        className={cn(
          "min-h-screen bg-background",
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider>
          <SessionProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              <main className="flex-grow flex">{children}</main>
              <SiteFooter />
              {process.env.GAID && <GoogleAnalytics gaId={process.env.GAID} />}
              <SpeedInsights />
              <Analytics />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
