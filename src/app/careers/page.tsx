import { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Harch Corp — build Africa\'s industrial future. Explore open positions across AI infrastructure, energy, mining, and more.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
