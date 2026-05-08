import { Metadata } from 'next';
import HarchAgriPage from './HarchAgriPage';

export const metadata: Metadata = {
  title: 'HarchAgri — Carbon-Aware Agriculture for Africa | Harch Corp',
  description:
    'Drone-as-a-Service, IoT irrigation, modular vertical farms, and agricultural carbon credits — powered by 1,798 GPUs across 5 hubs. The only integrated AgTech platform on the African continent.',
  keywords: [
    'HarchAgri', 'carbon-aware agriculture', 'Africa', 'IoT farming',
    'drone agriculture', 'vertical farms', 'carbon credits', 'agricultural drones',
    'Morocco', 'Senegal', 'Kenya', 'Ghana', 'AgTech', 'DaaS',
    'precision irrigation', 'GPU agriculture', 'ESG agriculture',
  ],
  openGraph: {
    title: 'HarchAgri — Carbon-Aware Agriculture for Africa',
    description: 'Drones, IoT, vertical farms, and carbon credits — powered by 1,798 GPUs. The only integrated AgTech platform in Africa.',
    type: 'website',
  },
};

export default function AgriculturePage() {
  return <HarchAgriPage />;
}
