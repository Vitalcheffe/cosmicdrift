import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Harch Corp and help build Africa\'s industrial future. Explore career opportunities across data centers, energy, mining, technology, and more.',
  openGraph: {
    title: 'Careers | Harch Corp',
    description: 'Join Harch Corp and help build Africa\'s industrial future.',
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
