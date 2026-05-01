import type { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal Mentions',
  description: 'Legal information about Harch Corp S.A., including company registration, intellectual property, and liability notices.',
};

export default function LegalPage() {
  return <LegalPageClient />;
}
