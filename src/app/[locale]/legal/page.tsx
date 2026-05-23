import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal information and disclaimers for Harch Corp.',
  alternates: { canonical: 'https://www.harchcorp.com/legal' },
};

export default function LegalPage() {
  return <LegalPageClient />;
}
