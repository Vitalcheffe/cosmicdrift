import { Metadata } from 'next';
import HarchAgriPage from './HarchAgriPage';

export const metadata: Metadata = {
  title: 'HarchAgri — Precision Agriculture for Africa | Harch Corp',
  description:
    'IoT-powered precision farming, drone surveillance, vertical farms, and carbon credit solutions across Morocco, Senegal, Kenya, and Ghana.',
  keywords: [
    'HarchAgri', 'precision agriculture', 'Africa', 'IoT farming',
    'drone agriculture', 'vertical farms', 'carbon credits',
    'Morocco', 'Senegal', 'Kenya', 'Ghana', 'AgTech',
  ],
  openGraph: {
    title: 'HarchAgri — Precision Agriculture for Africa',
    description: 'IoT-powered precision farming across Africa',
    type: 'website',
  },
};

export default function AgriculturePage() {
  return <HarchAgriPage />;
}
