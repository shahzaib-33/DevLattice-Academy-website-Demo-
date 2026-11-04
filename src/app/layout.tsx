import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c4b5fd"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#38d6ff"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#080a18"/><g stroke="url(#g)" stroke-width="2.6" stroke-linecap="round"><path d="M32 12 20 24 32 36 44 24Z M20 24 8 36 20 48 32 36 M44 24 56 36 44 48 32 36 M20 48 32 56 44 48"/></g><circle cx="32" cy="36" r="4.5" fill="#fff"/></svg>`,
  );

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Engineering, AI & Design Programs`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  icons: { icon: favicon, apple: favicon },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Archivo:wdth,wght@100..125,500..900&family=Manrope:wght@400;500;600;700&display=swap"
        />
        <noscript>
          <style>{`#dl-loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
