import { Metadata } from 'next';
import StrategyPageClient from './StrategyPageClient';

export const metadata: Metadata = {
  title: 'Strategy',
  description: 'Harch Corp\'s three-pillar strategy for building Africa\'s industrial sovereignty: Vertical Integration, Sovereign Infrastructure, and Continental Scale.',
};

export default function StrategyPage() {
  return <StrategyPageClient />;
}
