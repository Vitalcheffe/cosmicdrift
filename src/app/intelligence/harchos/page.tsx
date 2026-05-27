import type { Metadata } from 'next';
import HarchOSPageClient from './HarchOSPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'HarchOS — The Operating System for Sovereign AI Infrastructure',
  description: 'HarchOS orchestrates the Harch Intelligence Distributed Mesh — 5 hubs of AI compute powered by renewable energy across Morocco. 250MW installed, 400Gbps backbone, zero-downtime architecture.',
  keywords: [
    'HarchOS',
    'AI operating system',
    'sovereign AI infrastructure',
    'distributed compute mesh',
    'green GPU cloud',
    'renewable energy data center',
    'Morocco AI compute',
    'Dakhla data center',
    'Tanger data center',
    'Ouarzazate solar data center',
  ],
  openGraph: {
    title: 'HarchOS — The Operating System for Sovereign AI Infrastructure',
    description: '5 hubs. 250MW. 100% renewable. The distributed AI compute mesh that powers Africa\'s sovereign intelligence.',
    url: 'https://www.harchcorp.com/intelligence/harchos',
    siteName: 'Harch Corp',
    type: 'website',
    images: [
      {
        url: '/images/intelligence/harchos-hero.png',
        width: 1920,
        height: 1080,
        alt: 'HarchOS — Sovereign AI Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HarchOS — The Operating System for Sovereign AI Infrastructure',
    description: '5 hubs. 250MW. 100% renewable. The distributed AI compute mesh that powers Africa\'s sovereign intelligence.',
    images: ['/images/intelligence/harchos-hero.png'],
  },
  alternates: {
    canonical: 'https://www.harchcorp.com/intelligence/harchos',
    languages: {
      en: 'https://www.harchcorp.com/intelligence/harchos',
      fr: 'https://www.harchcorp.com/fr/intelligence/harchos',
      'x-default': 'https://www.harchcorp.com/intelligence/harchos',
    },
  },
};

export default function HarchOSPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.harchcorp.com' },
      { '@type': 'ListItem', position: 2, name: 'Intelligence', item: 'https://www.harchcorp.com/intelligence' },
      { '@type': 'ListItem', position: 3, name: 'HarchOS', item: 'https://www.harchcorp.com/intelligence/harchos' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HarchOSPageClient />
    </>
  );
}
