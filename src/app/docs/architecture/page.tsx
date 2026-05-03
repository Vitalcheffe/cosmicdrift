import type { Metadata } from 'next';
import ArchitecturePageClient from './ArchitecturePageClient';

export const metadata: Metadata = {
  title: 'Architecture Center — HarchOS',
  description: 'Understand the HarchOS architecture: SENSE-THINK-ACT layers, reference architectures, well-architected framework pillars, design patterns, and best practices.',
  keywords: [
    'HarchOS architecture',
    'SENSE THINK ACT',
    'reference architecture',
    'well-architected framework',
    'design patterns',
    'sovereign AI cloud',
  ],
  openGraph: {
    title: 'Architecture Center — HarchOS',
    description: 'Deep dive into the HarchOS architecture. SENSE-THINK-ACT layers, reference architectures, and design patterns for sovereign AI infrastructure.',
    url: 'https://harchcorp.com/docs/architecture',
    siteName: 'Harch Corp',
    type: 'website',
  },
};

export default function ArchitecturePage() {
  return <ArchitecturePageClient />;
}
