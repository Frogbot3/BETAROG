import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { MotionSystem } from "@/components/motion-system";
import { site } from "@/lib/site";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BETAROG — We Build What's Next.",
    template: "%s | BETAROG",
  },
  description: site.description,
  openGraph: {
    title: "BETAROG — We Build What's Next.",
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050810" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fc" },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.positioning,
    ...(site.url.startsWith("https://") ? { url: site.url } : {}),
    founder: { "@type": "Person", name: "Anas Malik P" },
    sameAs: site.social.map((social) => social.url),
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="top"
        className={`${inter.variable} ${space.variable} ${mono.variable}`}
      >
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MotionSystem />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
