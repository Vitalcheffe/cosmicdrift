import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { CursorGlow } from "@/components/CursorGlow";
import { ClientLayout } from "@/components/ClientLayout";


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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.harchcorp.com'),
  title: {
    default: "Harch Corp | Africa's Sovereign Infrastructure OS",
    template: "%s | Harch Corp",
  },
  description:
    "Harch Corp S.A. is a Moroccan industrial conglomerate building Africa's industrial sovereignty. Carbon-Aware GPU Cloud (1,798 GPUs), 2GW+ Renewable Energy, Cement, Technology, Mining, Agriculture, Water, Finance.",
  keywords: [
    "Harch Corp",
    "Africa industrial sovereignty",
    "Data Center Africa",
    "Sovereign AI",
    "AI data center Morocco",
    "carbon-aware GPU cloud",
    "carbon-aware scheduling",
    "Renewable Energy Morocco",
    "Industrial Infrastructure",
    "Morocco conglomerate",
    "renewable energy Africa",
    "cement manufacturing Gambia",
    "strategic mining Morocco",
    "precision agriculture Sahel",
    "water desalination Africa",
    "sovereign technology",
    "green GPU cloud",
    "low carbon intensity compute",
    "Dakhla data center",
    "Dakhla 500MW",
    "Igoudar Dakhla",
    "500 MW data center Morocco",
    "green data center Africa",
  ],
  authors: [{ name: "Harch Corp S.A." }],
  applicationName: "Harch Corp",
  creator: "Harch Corp S.A.",
  publisher: "Harch Corp S.A.",
  alternates: {
    canonical: 'https://www.harchcorp.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: [
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: "Harch Corp | Africa's Sovereign Infrastructure OS",
    description:
      "Moroccan industrial conglomerate — $2.4B+ investment pipeline across 8 verticals. Carbon-Aware GPU Cloud (1,798 GPUs), 2GW+ Renewable Energy, Cement, Mining, Agriculture, Water, Finance. Building Africa's industrial sovereignty.",
    url: "https://www.harchcorp.com",
    siteName: "Harch Corp",
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_MA", "ar_MA"],
    images: [
      {
        url: "/images/og-harch-corp.png",
        width: 1200,
        height: 630,
        alt: "Harch Corp | Africa's Sovereign Infrastructure OS",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harch Corp | Africa's Sovereign Infrastructure OS",
    description:
      "Carbon-Aware GPU Cloud | 1,798 GPUs at ~47 gCO2/kWh. 2GW+ Renewable Energy Pipeline. Sovereign AI from Morocco.",
    images: ["/images/og-harch-corp.png"],
    site: "@harchcorp",
    creator: "@harchcorp",
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
        "@type": ["Organization", "Corporation"],
        "@id": "https://www.harchcorp.com/#organization",
        name: "Harch Corp S.A.",
        alternateName: ["HarchCorp", "Harch Corporation", "HarchCorp Group"],
        legalName: "Harch Corp S.A.",
        url: "https://www.harchcorp.com",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.harchcorp.com/#logo",
          url: "https://www.harchcorp.com/logo-512x512.png",
          contentUrl: "https://www.harchcorp.com/logo-512x512.png",
          caption: "Harch Corp — Moroccan Industrial Conglomerate",
          inLanguage: "en",
          width: 512,
          height: 512,
        },
        image: [
          {
            "@type": "ImageObject",
            "@id": "https://www.harchcorp.com/#og-image",
            url: "https://www.harchcorp.com/images/og-harch-corp.png",
            contentUrl: "https://www.harchcorp.com/images/og-harch-corp.png",
            caption: "HarchCorp — Africa's Sovereign Infrastructure OS",
            inLanguage: "en",
            width: 1200,
            height: 630,
          },
          {
            "@type": "ImageObject",
            "@id": "https://www.harchcorp.com/#logo-square",
            url: "https://www.harchcorp.com/logo-512x512.png",
            contentUrl: "https://www.harchcorp.com/logo-512x512.png",
            caption: "Harch Corp Logo",
            inLanguage: "en",
            width: 512,
            height: 512,
          },
        ],
        description:
          "Harch Corp S.A. is a Moroccan multi-sector industrial conglomerate and holding company building Africa's industrial sovereignty across 8 verticals: AI data centers, renewable energy, cement manufacturing, sovereign technology, strategic mining, precision agriculture, water infrastructure, and finance. $2.4B+ investment pipeline across 5 countries.",
        foundingDate: "2024",
        founder: { "@id": "https://www.harchcorp.com/#founder" },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 200,
          value: "50-200",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Boulevard Mohammed V",
          addressLocality: "Casablanca",
          addressRegion: "Casablanca-Settat",
          postalCode: "20000",
          addressCountry: "MA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.5731,
          longitude: -7.5898,
        },
        telephone: "+212-522-000-000",
        email: "contact@harchcorp.com",
        areaServed: [
          { "@type": "Country", name: "Morocco" },
          { "@type": "Country", name: "Gambia" },
          { "@type": "Country", name: "Senegal" },
          { "@type": "Place", name: "Africa" },
          { "@type": "Place", name: "MENA Region" },
        ],
        industry: "Conglomerate",
        naics: "551112",
        slogan: "Africa's Sovereign Infrastructure OS",
        knowsLanguage: ["en", "fr", "ar"],
        sameAs: [
          "https://www.linkedin.com/company/harchcorp",
          "https://twitter.com/harchcorp",
          "https://www.instagram.com/harchcorp/",
          "https://www.youtube.com/@harchcorp",
          "https://www.crunchbase.com/organization/harchcorp",
          "https://github.com/HarchCorp",
          "https://www.wikidata.org/wiki/Q133902221",
        ],
        subOrganization: [
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/intelligence/#organization",
            name: "Harch Intelligence",
            url: "https://www.harchcorp.com/subsidiaries/intelligence",
            description: "Carbon-Aware GPU Cloud — 1,798 GPUs across 5 Moroccan hubs at ~47 gCO2/kWh",
            industry: "AI Infrastructure",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/cement/#organization",
            name: "Harch Cement",
            url: "https://www.harchcorp.com/subsidiaries/cement",
            description: "500kT/yr cement production in Gambia",
            industry: "Cement Manufacturing",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/energy/#organization",
            name: "Harch Energy",
            url: "https://www.harchcorp.com/subsidiaries/energy",
            description: "2GW+ renewable energy pipeline — solar, wind, and green hydrogen",
            industry: "Renewable Energy",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/technology/#organization",
            name: "Harch Technology",
            url: "https://www.harchcorp.com/subsidiaries/technology",
            description: "Sovereign technology stack — carbon-aware GPU cloud, cybersecurity, satellite communications",
            industry: "Technology",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/mining/#organization",
            name: "Harch Mining",
            url: "https://www.harchcorp.com/subsidiaries/mining",
            description: "Strategic mineral extraction — phosphates, cobalt, and rare earths",
            industry: "Mining",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/agriculture/#organization",
            name: "Harch Agri",
            url: "https://www.harchcorp.com/subsidiaries/agriculture",
            description: "Precision agriculture — IoT, drone monitoring, vertical farming",
            industry: "Agriculture",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/water/#organization",
            name: "Harch Water",
            url: "https://www.harchcorp.com/subsidiaries/water",
            description: "200M m³/yr desalination with AI-optimized distribution",
            industry: "Water Infrastructure",
          },
          {
            "@type": "Organization",
            "@id": "https://www.harchcorp.com/subsidiaries/finance/#organization",
            name: "Harch Finance",
            url: "https://www.harchcorp.com/subsidiaries/finance",
            description: "Green bonds, project finance, trade finance, and Islamic finance for sovereign infrastructure",
            industry: "Financial Services",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "investor relations",
            email: "ir@harchcorp.com",
            telephone: "+212-522-000-001",
            availableLanguage: ["English", "French", "Arabic"],
          },
          {
            "@type": "ContactPoint",
            contactType: "media relations",
            email: "press@harchcorp.com",
            telephone: "+212-522-000-002",
            availableLanguage: ["English", "French", "Arabic"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "contact@harchcorp.com",
            telephone: "+212-522-000-000",
            availableLanguage: ["English", "French", "Arabic"],
          },
        ],
      },
      {
        "@type": "Person",
        "@id": "https://www.harchcorp.com/#founder",
        name: "Amine Harch El Korane",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": "https://www.harchcorp.com/#organization" },
        description:
          "Founder and CEO of Harch Corp S.A., a Moroccan multi-sector industrial conglomerate building Africa's industrial sovereignty across 8 verticals with a $2.4B+ investment pipeline.",
        url: "https://www.harchcorp.com",
        sameAs: ["https://www.linkedin.com/in/amineharchelkorane"],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.harchcorp.com/#website",
        url: "https://www.harchcorp.com",
        name: "Harch Corp",
        alternateName: ["HarchCorp", "Harch Corp S.A.", "Harch Corporation", "harchcorp.com"],
        publisher: { "@id": "https://www.harchcorp.com/#organization" },
        inLanguage: ["en", "fr", "ar"],
        image: [
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/og-harch-corp.png",
            contentUrl: "https://www.harchcorp.com/images/og-harch-corp.png",
            caption: "Harch Corp — Africa's Sovereign Infrastructure OS",
            width: 1200,
            height: 630,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/sovereign-ai-infrastructure.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/sovereign-ai-infrastructure.jpg",
            caption: "Sovereign AI Infrastructure by Harch Intelligence",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/renewable-data-center-north-africa.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/renewable-data-center-north-africa.jpg",
            caption: "Renewable-powered data center in North Africa by Harch Energy",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/dakhla-data-center-construction.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/dakhla-data-center-construction.jpg",
            caption: "Dakhla AI Data Center under construction by Harch Intelligence",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/green-hydrogen-morocco.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/green-hydrogen-morocco.jpg",
            caption: "Green hydrogen production in Morocco by Harch Energy",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/precision-agriculture-senegal.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/precision-agriculture-senegal.jpg",
            caption: "Precision agriculture in Senegal by Harch Agri",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/blog/solar-energy-benchmark-morocco.jpg",
            contentUrl: "https://www.harchcorp.com/images/blog/solar-energy-benchmark-morocco.jpg",
            caption: "Solar energy benchmark in Morocco by Harch Energy",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/company/hq-casablanca.jpg",
            contentUrl: "https://www.harchcorp.com/images/company/hq-casablanca.jpg",
            caption: "Harch Corp headquarters in Casablanca, Morocco",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/company/industrial-portfolio.jpg",
            contentUrl: "https://www.harchcorp.com/images/company/industrial-portfolio.jpg",
            caption: "Harch Corp industrial portfolio across Africa",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/finance/green-bonds-africa.jpg",
            contentUrl: "https://www.harchcorp.com/images/finance/green-bonds-africa.jpg",
            caption: "Green bonds for African infrastructure by Harch Finance",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/esg/esg-report-2025.jpg",
            contentUrl: "https://www.harchcorp.com/images/esg/esg-report-2025.jpg",
            caption: "Harch Corp ESG sustainability report 2025",
            width: 1344,
            height: 768,
          },
          {
            "@type": "ImageObject",
            url: "https://www.harchcorp.com/images/case-studies/casablanca-water-optimization.jpg",
            contentUrl: "https://www.harchcorp.com/images/case-studies/casablanca-water-optimization.jpg",
            caption: "AI-optimized water distribution in Casablanca by Harch Water",
            width: 1344,
            height: 768,
          },
        ],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.harchcorp.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://www.harchcorp.com" />
        <link rel="alternate" href="https://www.harchcorp.com" hrefLang="en" />
        <link rel="alternate" href="https://www.harchcorp.com" hrefLang="fr" />
        <link rel="alternate" href="https://www.harchcorp.com" hrefLang="ar" />
        <link rel="alternate" href="https://www.harchcorp.com" hrefLang="x-default" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="application-name" content="Harch Corp" />
        <meta name="apple-mobile-web-app-title" content="Harch Corp" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content="Casablanca" />
        <meta name="geo.position" content="33.5731;-7.5898" />
        <meta name="ICBM" content="33.5731, -7.5898" />
        <meta property="og:site_name" content="Harch Corp" />
        <meta name="news_keywords" content="Harch Corp, Africa infrastructure, sovereign AI, GPU cloud, renewable energy" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased bg-[#0A0A0A] text-white min-h-screen flex flex-col`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Sidebar />
        <div className="flex-1 flex flex-col w-full">
          <main id="main-content" className="flex-1 pb-6">
            <ClientLayout>{children}</ClientLayout>
          </main>
          <Footer />
        </div>
        <CookieConsent />
        <CursorGlow />
      </body>
    </html>
  );
}
