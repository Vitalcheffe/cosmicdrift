import type { Metadata } from 'next';
import IntelligencePageClient from './IntelligencePageClient';

export const metadata: Metadata = {
  title: 'AI Data Center Morocco — Harch Intelligence | Sovereign GPU Cloud',
  description:
    "Harch Intelligence operates Africa's first sovereign AI data center in Morocco: 1,798 carbon-optimized GPUs across 5 Moroccan hubs at ~47 gCO2/kWh. 500MW AI data center pipeline, carbon-aware scheduling, submarine cable connectivity. Morocco's leading GPU cloud platform.",
  keywords: [
    'AI data center Morocco',
    'GPU cloud Morocco',
    'sovereign AI Africa',
    'Harch Intelligence',
    'data center Morocco',
    'carbon-aware GPU scheduling',
    'AI data center Africa',
    'green GPU cloud',
    'low carbon compute',
    'HarchOS',
    'AI infrastructure Morocco',
    'data center Casablanca',
    'Dakhla data center',
    '500MW data center Morocco',
    'GPU cloud Africa',
    'sovereign AI data center',
    'Morocco AI factory',
    'carbon-aware GPU cloud Morocco',
  ],
  alternates: {
    canonical: 'https://www.harchcorp.com/intelligence',
    languages: {
      en: 'https://www.harchcorp.com/intelligence',
      fr: 'https://www.harchcorp.com/fr/intelligence',
      'x-default': 'https://www.harchcorp.com/intelligence',
    },
  },
  openGraph: {
    title: 'AI Data Center Morocco — Harch Intelligence | Sovereign GPU Cloud',
    description:
      "Africa's first sovereign AI data center in Morocco. 1,798 carbon-optimized GPUs across 5 hubs at ~47 gCO2/kWh — 89% below industry average. 500MW pipeline.",
    url: 'https://www.harchcorp.com/intelligence',
    siteName: 'Harch Corp',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_MA'],
    images: [
      {
        url: '/images/og-harch-corp.png',
        width: 1200,
        height: 630,
        alt: 'Harch Intelligence — AI Data Center Morocco',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Data Center Morocco — Harch Intelligence',
    description: "Africa's first sovereign AI data center. 1,798 GPUs at ~47 gCO2/kWh. 500MW pipeline. Carbon-aware GPU cloud from Morocco.",
    images: ['/images/og-harch-corp.png'],
  },
};

export default function IntelligencePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.harchcorp.com' },
      { '@type': 'ListItem', position: 2, name: 'Intelligence', item: 'https://www.harchcorp.com/intelligence' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IntelligencePageClient />
    </>
  );
}
