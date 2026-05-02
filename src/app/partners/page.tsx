import { Metadata } from 'next';
import PartnersPageClient from './PartnersPageClient';

export const metadata: Metadata = {
  title: 'Partners — Harch Corp',
  description: 'Harch Corp partner ecosystem: technology providers, financial institutions, and government agencies building Africa\'s industrial future.',
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
