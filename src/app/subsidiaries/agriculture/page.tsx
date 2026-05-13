import { Metadata } from 'next';
import HarchAgriPage from './HarchAgriPage';

export const metadata: Metadata = {
  title: 'HarchAgri — Precision Agriculture for Africa | Harch Corp',
  description:
    'Drones, IoT, vertical farms, and agricultural carbon credits — Africa\'s only integrated AgTech platform. Built for African agricultural realities.',
  keywords: [
    'HarchAgri', 'precision agriculture', 'Africa', 'agriculture IoT',
    'agriculture drones', 'vertical farms', 'carbon credits', 'agricultural drones',
    'Morocco', 'Senegal', 'Kenya', 'Ghana', 'AgTech', 'DaaS',
    'precision irrigation', 'sustainable agriculture', 'ESG agriculture',
  ],
  openGraph: {
    title: 'HarchAgri — Precision Agriculture for Africa',
    description: 'Drones, IoT, vertical farms, and carbon credits — Africa\'s only integrated AgTech platform.',
    type: 'website',
  },
};

export default function AgriculturePage() {
  return <HarchAgriPage />;
}
