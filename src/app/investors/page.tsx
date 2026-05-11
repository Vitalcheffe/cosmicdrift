import { Metadata } from 'next';
import InvestorsPageClient from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investor Relations — Harch Corp',
  description: 'Harch Corp investor relations: $2.4B investment pipeline across 7 verticals. Explore partnership and investment opportunities.',
  alternates: {
    canonical: 'https://www.harchcorp.com/investors',
  },
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
