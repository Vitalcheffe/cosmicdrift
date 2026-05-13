import { Metadata } from 'next';
import GDPRPageClient from './GDPRPageClient';

export const metadata: Metadata = {
  title: 'GDPR Compliance  | Harch Corp',
  description: 'Harch Corp\'s commitment to GDPR compliance and the protection of personal data for EU data subjects.',
};

export default function GDPRPage() {
  return <GDPRPageClient />;
}
