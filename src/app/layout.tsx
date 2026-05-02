import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

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
    default: "Harch Corp — Infrastructure for the Next Century",
    template: "%s | Harch Corp",
  },
  description:
    "Harch Corp builds the critical infrastructure that enables Africa's self-reliance — from 500MW AI data centers to 2GW renewable energy across 7 verticals.",
  keywords: [
    "Harch Corp",
    "Africa industrial sovereignty",
    "Morocco conglomerate",
    "AI data center Dakhla",
    "renewable energy Africa",
    "cement manufacturing Gambia",
    "strategic mining Morocco",
    "precision agriculture Sahel",
    "water desalination Africa",
    "sovereign technology",
  ],
  authors: [{ name: "Harch Corp S.A." }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Harch Corp — Infrastructure for the Next Century",
    description:
      "Building Africa's industrial sovereignty across 7 verticals with $2.4B+ investment pipeline.",
    url: "https://harchcorp.com",
    siteName: "Harch Corp",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harch Corp — Infrastructure for the Next Century",
    description:
      "Building Africa's industrial sovereignty across 7 verticals with $2.4B+ investment pipeline.",
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
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased bg-[#FAFAFA] text-[#0A0F1A] min-h-screen flex flex-col`}>
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-[240px]">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
