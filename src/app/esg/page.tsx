import { Metadata } from 'next';
import ESGPageClient from './ESGPageClient';

export const metadata: Metadata = {
  title: 'ESG',
  description: 'Harch Corp\'s Environmental, Social, and Governance commitments — building sustainable infrastructure with measurable impact.',
};

export default function ESGPage() {
  return <ESGPageClient />;
}
