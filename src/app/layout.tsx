import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { CursorGlow } from "@/components/CursorGlow";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Harch Corp | Africa's Sovereign Infrastructure OS",
    template: "%s | Harch Corp",
  },
  description:
    "Building the industrial backbone of Africa: AI Data Centers (500MW+), Renewable Energy (2GW+), and Critical Mining. $2.4B+ investment pipeline across 7 verticals.",
  keywords: [
    "Harch Corp",
    "Africa industrial sovereignty",
    "Data Center Africa",
    "Sovereign AI",
    "AI data center Dakhla",
    "Renewable Energy Morocco",
    "Industrial Infrastructure",
    "Morocco conglomerate",
    "renewable energy Africa",
    "cement manufacturing Gambia",
    "strategic mining Morocco",
    "precision agriculture Sahel",
    "water desalination Africa",
    "sovereign technology",
  ],
  authors: [{ name: "Harch Corp S.A." }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Harch Corp | Africa's Sovereign Infrastructure OS",
    description:
      "Building the industrial backbone of Africa: AI Data Centers (500MW+), Renewable Energy (2GW+), and Critical Mining across 7 verticals.",
    url: "https://harchcorp.com",
    siteName: "Harch Corp",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-harch-corp.png",
        width: 1200,
        height: 630,
        alt: "Harch Corp — Africa's Sovereign Infrastructure OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harch Corp | Africa's Sovereign Infrastructure OS",
    description:
      "Building the industrial backbone of Africa: AI Data Centers (500MW+), Renewable Energy (2GW+), and Critical Mining.",
    images: ["/images/og-harch-corp.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Harch Corp S.A.",
    url: "https://harchcorp.com",
    logo: "https://harchcorp.com/logo.svg",
    description:
      "Moroccan multi-sector industrial conglomerate building Africa's industrial sovereignty.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Boulevard Mohammed V",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    founder: {
      "@type": "Person",
      name: "Amine Harch El Korane",
    },
    foundingDate: "2023",
    sameAs: [
      "https://linkedin.com/company/harchcorp",
      "https://twitter.com/harchcorp",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased bg-[#1A1A1A] text-white min-h-screen flex flex-col`}>
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-[250px]">
          <main className="flex-1 pb-6">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <CursorGlow />
      </body>
    </html>
  );
}
