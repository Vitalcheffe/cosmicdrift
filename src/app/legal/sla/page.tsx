import { Metadata } from 'next';
import SlaPageClient from './SlaPageClient';

export const metadata: Metadata = {
  title: 'Service Level Agreement — Harch Corp',
  description: 'Harch Corp\'s Service Level Agreement covering uptime guarantees, service credits, and support commitments.',
};

export default function SlaPage() {
  return <SlaPageClient />;
}
