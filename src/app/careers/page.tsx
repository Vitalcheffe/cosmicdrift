import { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers — Build Africa\'s Future',
  description: 'Join Harch Corp — 3,200+ positions across AI Infrastructure, Renewable Energy, Mining, and more. Build Africa\'s industrial sovereignty. Exceptional engineers and strategists wanted.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
