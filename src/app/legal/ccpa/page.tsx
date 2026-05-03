import { Metadata } from 'next';
import CCPAPageClient from './CCPAPageClient';

export const metadata: Metadata = {
  title: 'CCPA Compliance — Harch Corp',
  description: 'Your rights under the California Consumer Privacy Act and how Harch Corp handles California residents\' personal information.',
};

export default function CCPAPage() {
  return <CCPAPageClient />;
}
