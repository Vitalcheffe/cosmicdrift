import { Metadata } from 'next';
import PlatformPageClient from './PlatformPageClient';

export const metadata: Metadata = {
  title: 'Platform — Harch Corp',
  description: 'Live infrastructure monitoring. Harch OS is software, not slides. Real-time ops center for sovereign AI infrastructure across Africa.',
  openGraph: {
    title: 'Harch OS Platform — Live Infrastructure Monitor',
    description: 'Real-time command & control for sovereign AI infrastructure. 5 hubs, 1,798 GPUs, 2,847 sensors — all live.',
    images: ['/images/og-harch-corp.png'],
  },
};

export default function PlatformPage() {
  return <PlatformPageClient />;
}
