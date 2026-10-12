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

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  title: { default: siteConfig.author.name, template: `%s | ${siteConfig.author.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  keywords: [
    "Sajit Khadka",
    "software engineer",
    "backend engineer",
    "integrations",
    "event-driven architecture",
    "Kafka",
    "Kubernetes",
    "PostgreSQL",
    "AWS",
  ],
  alternates: { types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.author.name}: blog` }] } },
  openGraph: { siteName: siteConfig.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", creator: "@sajitkhadka", site: "@sajitkhadka" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

// One entity graph for the whole site. Pages link back to these ids instead of redefining them, which
// is what lets search engines and AI tools tie the site, its posts and its author together.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.title,
      description: siteConfig.author.description,
      url: siteUrl,
      image: `${siteUrl}/avatar.png`,
      email: "mailto:sajitkhadka@gmail.com",
      worksFor: { "@type": "Organization", name: "Perceptyx" },
      knowsAbout: ["Event-driven architecture", "System integration", "Apache Kafka", "PostgreSQL", "Kubernetes", "AWS", "Java", "Go"],
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.x],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-24" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background font-sans", inter.variable, jetbrainsMono.variable)}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <ThemeProvider>
          <SessionProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                Skip to content
              </a>
              <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-0 h-[36rem]" />
              <SiteHeader />
              <main id="main" className="relative flex-1 w-full">{children}</main>
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
