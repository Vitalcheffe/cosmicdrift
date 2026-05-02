import { Metadata } from 'next';
import ESGPageClient from './ESGPageClient';

export const metadata: Metadata = {
  title: 'ESG — Harch Corp',
  description: "Harch Corp's Environmental, Social, and Governance commitments: 100% renewable energy, community impact, and sustainable industrialization.",
};

export default function ESGPage() {
  return <ESGPageClient />;
}
