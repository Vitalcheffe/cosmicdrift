import type { Metadata } from 'next';
import ESGPageClient from './ESGPageClient';

export const metadata: Metadata = {
  title: 'ESG',
  description: 'Harch Corp\'s Environmental, Social & Governance commitments. Carbon-negative targets, community impact, and world-class governance standards.',
  openGraph: {
    title: 'ESG | Harch Corp',
    description: 'Environmental, Social & Governance commitments for Africa\'s industrial future.',
  },
};

export default function ESGPage() {
  return <ESGPageClient />;
}
