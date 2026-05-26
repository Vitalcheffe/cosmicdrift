import { Metadata } from 'next';
import HarchAgriPage from './HarchAgriPage';

export const metadata: Metadata = {
  title: 'Precision Agriculture for Africa',
  description:
    'Drones, IoT, vertical farms, and agricultural carbon credits — Africa\'s only integrated AgTech platform. Built for African agricultural realities.',
  keywords: [
    'HarchAgri', 'precision agriculture', 'Africa', 'agriculture IoT',
    'agriculture drones', 'vertical farms', 'carbon credits', 'agricultural drones',
    'Morocco', 'Senegal', 'Kenya', 'Ghana', 'AgTech', 'DaaS',
    'precision irrigation', 'sustainable agriculture', 'ESG agriculture',
  ],
  openGraph: {
    title: 'Precision Agriculture for Africa',
    description: 'Drones, IoT, vertical farms, and carbon credits — Africa\'s only integrated AgTech platform.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.harchcorp.com/subsidiaries/agriculture',
    languages: {
      en: 'https://www.harchcorp.com/subsidiaries/agriculture',
      fr: 'https://www.harchcorp.com/fr/filiales/agriculture',
      'x-default': 'https://www.harchcorp.com/subsidiaries/agriculture',
    },
  },
};

export default function AgriculturePage() {
  return <HarchAgriPage />;
}
