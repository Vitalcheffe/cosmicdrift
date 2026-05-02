import { Metadata } from 'next';
import InvestorsPageClient from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investors',
  description: 'Harch Corp investor relations — $2.4B+ investment pipeline, financial highlights, and investment opportunities across 7 industrial verticals.',
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
