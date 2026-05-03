import type { Metadata } from 'next';
import HarchOSPageClient from './HarchOSPageClient';

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
    url: 'https://harchcorp.com/intelligence/harchos',
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
};

export default function HarchOSPage() {
  return <HarchOSPageClient />;
}
