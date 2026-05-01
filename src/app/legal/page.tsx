import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal mentions — Harch Corp S.A., Moroccan société anonyme.',
};

export default function LegalPage() {
  return <LegalPageClient />;
}
