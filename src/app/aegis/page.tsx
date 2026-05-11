import { Metadata } from 'next';
import AegisPageClient from './AegisPageClient';

export const metadata: Metadata = {
  title: 'Aegis Defense Systems — Counter-UAS Technology',
  description: 'Aegis: Real-time counter-UAS defense at $4,200/unit — 6-8x cheaper, 10-50x faster than competitors. 500-drone swarm capacity with Byzantine MAD filter.',
  alternates: {
    canonical: 'https://www.harchcorp.com/aegis',
  },
  openGraph: {
    title: 'Aegis Defense Systems | Harch Corp',
    description: 'Real-time counter-UAS defense at $4,200/unit — 6-8x cheaper, 10-50x faster than competitors. 500-drone swarm capacity.',
    url: 'https://www.harchcorp.com/aegis',
  },
};

export default function AegisPage() {
  return <AegisPageClient />;
}
