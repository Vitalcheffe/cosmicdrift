import { Metadata } from 'next';
import ESGPageClient from './ESGPageClient';

export const metadata: Metadata = {
  title: 'ESG — Environmental, Social & Governance',
  description: 'Harch Corp\'s ESG commitments: 100% renewable energy for data centers, zero-carbon industrial operations, and measurable social impact across 5 African countries.',
};

export default function ESGPage() {
  return <ESGPageClient />;
}
