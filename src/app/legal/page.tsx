import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal — Harch Corp',
  description: 'Legal information and disclaimers for Harch Corp.',
};

export default function LegalPage() {
  return <LegalPageClient />;
}
