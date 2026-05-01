import type { Metadata } from 'next';
import StrategyPageClient from './StrategyPageClient';

export const metadata: Metadata = {
  title: 'Strategy',
  description: 'Harch Corp\'s strategic vision built on three pillars: Sovereignty, Integration, and Scale. Discover our 2030 roadmap for African industrial transformation.',
  openGraph: {
    title: 'Strategic Vision | Harch Corp',
    description: 'Three pillars driving Africa\'s industrial sovereignty: Sovereignty, Integration, Scale.',
  },
};

export default function StrategyPage() {
  return <StrategyPageClient />;
}
