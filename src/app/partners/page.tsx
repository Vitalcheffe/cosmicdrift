import type { Metadata } from 'next';
import PartnersPageClient from './PartnersPageClient';

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'Harch Corp\'s strategic, technology, and financial partners powering Africa\'s industrial sovereignty.',
  openGraph: {
    title: 'Our Partners | Harch Corp',
    description: 'Strategic, technology, and financial partners.',
  },
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
