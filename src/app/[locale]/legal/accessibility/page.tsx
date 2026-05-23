import { Metadata } from 'next';
import AccessibilityPageClient from './AccessibilityPageClient';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Harch Corp',
  description: 'Harch Corp\'s commitment to digital accessibility and the standards we follow to ensure an inclusive experience.',
  alternates: { canonical: 'https://www.harchcorp.com/legal/accessibility' },
};

export default function AccessibilityPage() {
  return <AccessibilityPageClient />;
}
