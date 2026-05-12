import { Metadata } from 'next';
import InvestorsPageClient from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investor Relations — Harch Corp',
  description: 'Harch Corp is a privately held sovereign infrastructure company. Institutional investors may request a briefing.',
  alternates: {
    canonical: 'https://www.harchcorp.com/investors',
  },
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
