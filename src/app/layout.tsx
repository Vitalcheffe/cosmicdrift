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
  metadataBase: new URL('https://harch-corp.vercel.app'),
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
  // ═══ JSON-LD: Organization Schema ═══
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://harchcorp.com/#organization",
        name: "Harch Corp S.A.",
        legalName: "Harch Corp S.A.",
        url: "https://harchcorp.com",
        logo: {
          "@type": "ImageObject",
          url: "https://harchcorp.com/favicon.svg",
        },
        description:
          "Moroccan multi-sector industrial conglomerate building Africa's industrial sovereignty across 7 verticals: AI data centers, renewable energy, cement, technology, mining, agriculture, and water.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Boulevard Mohammed V",
          addressLocality: "Casablanca",
          addressRegion: "Casablanca-Settat",
          postalCode: "20000",
          addressCountry: "MA",
        },
        foundingDate: "2024",
        founder: { "@id": "https://harchcorp.com/#founder" },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 200,
        },
        sameAs: [
          "https://linkedin.com/company/harchcorp",
          "https://twitter.com/harchcorp",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Industrial Verticals",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Data Centers — 500MW Hyperscale" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renewable Energy — 2GW+ Pipeline" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cement Manufacturing — 500kT/yr" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sovereign Technology — 50K+ GPUs" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategic Mining — Phosphates, Cobalt, Rare Earths" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Precision Agriculture — IoT & Vertical Farms" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Infrastructure — 200M m³/yr Desalination" } },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": "https://harchcorp.com/#founder",
        name: "Amine Harch El Korane",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": "https://harchcorp.com/#organization" },
        description: "Founder and CEO of Harch Corp S.A., a Moroccan multi-sector industrial conglomerate building Africa's industrial sovereignty.",
        url: "https://harchcorp.com",
        sameAs: [
          "https://linkedin.com/in/amineharchelkorane",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://harchcorp.com/#website",
        url: "https://harchcorp.com",
        name: "Harch Corp",
        publisher: { "@id": "https://harchcorp.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://harchcorp.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
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
