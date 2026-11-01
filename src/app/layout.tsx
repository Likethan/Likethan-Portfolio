import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { siteConfig } from "@/lib/siteData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIKETHAN K J | Design. Develop. Deploy.",
  description: siteConfig.objective,
  metadataBase: new URL("https://likethan-portfolio.vercel.app"),
  openGraph: {
    title: "LIKETHAN K J | Design. Develop. Deploy.",
    description: siteConfig.objective,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.heroImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIKETHAN K J | Design. Develop. Deploy.",
    description: siteConfig.objective,
    images: [siteConfig.heroImage],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressRegion: siteConfig.location,
  },
  sameAs: [
    "https://www.linkedin.com/in/likethan-k-j-b434b632b/",
    "https://github.com/Likethan",
    "https://www.instagram.com/_likethan_/",
  ],
  image: siteConfig.heroImage,
  description: siteConfig.objective,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <AppProviders>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-black"
          >
            Skip to content
          </a>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
