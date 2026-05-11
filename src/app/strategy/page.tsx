import { Metadata } from 'next';
import StrategyPageClient from './StrategyPageClient';

export const metadata: Metadata = {
  title: 'Strategy — Harch Corp',
  description: "Harch Corp's integrated strategy captures the full value chain across data centers, energy, cement, technology, mining, agriculture, and water infrastructure.",
  alternates: {
    canonical: 'https://www.harchcorp.com/strategy',
  },
};

export default function StrategyPage() {
  return <StrategyPageClient />;
}
