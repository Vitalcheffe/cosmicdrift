import type { Metadata } from 'next';
import IntelligencePageClient from './IntelligencePageClient';

export const metadata: Metadata = {
  title: 'Harch Intelligence — Sovereign AI Infrastructure',
  description: 'Harch Intelligence builds Africa\'s sovereign AI compute infrastructure: 1,798 GPU Carbon-Aware Data Centers, distributed mesh, 100% renewable energy.',
};

export default function IntelligencePage() {
  return <IntelligencePageClient />;
}
