import { Metadata } from 'next';
import InvestorsPageClient from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investor Relations — $2.4B+ Pipeline',
  description: 'Invest in Africa\'s industrial sovereignty. Harch Corp\'s $2.4B+ investment pipeline spans AI Data Centers (500MW), Renewable Energy (2GW+), Cement, Mining, Agriculture, and Water across 5 countries.',
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
