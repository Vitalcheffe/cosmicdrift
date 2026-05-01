import type { Metadata } from 'next';
import InvestorsPageClient from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investor Relations',
  description: 'Discover investment opportunities at Harch Corp. $2.4B+ investment pipeline across 7 verticals in Africa\'s fastest-growing industrial sectors.',
  openGraph: {
    title: 'Investor Relations | Harch Corp',
    description: '$2.4B+ investment pipeline across 7 verticals in Africa\'s industrial sectors.',
  },
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
