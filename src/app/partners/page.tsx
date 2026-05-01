import { Metadata } from 'next';
import PartnersPageClient from './PartnersPageClient';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Harch Corp partner ecosystem — technology, financial, government, and industrial partnerships driving Africa\'s industrial sovereignty.',
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
