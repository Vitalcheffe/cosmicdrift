import { Metadata } from 'next';
import StrategyPageClient from './StrategyPageClient';

export const metadata: Metadata = {
  title: 'Strategy — Vertical Integration & Continental Scale',
  description: 'Harch Corp\'s three-pillar strategy: Vertical Integration, Sovereign Infrastructure, and Continental Scale. How we build Africa\'s industrial backbone across 7 verticals and 5 countries.',
};

export default function StrategyPage() {
  return <StrategyPageClient />;
}
