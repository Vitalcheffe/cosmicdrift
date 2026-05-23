import { Metadata } from 'next';
import DpaPageClient from './DpaPageClient';

export const metadata: Metadata = {
  title: 'Data Processing Agreement | Harch Corp',
  description: 'Harch Corp\'s Data Processing Agreement provisions and template for clients and partners.',
  alternates: { canonical: 'https://www.harchcorp.com/legal/dpa' },
};

export default function DpaPage() {
  return <DpaPageClient />;
}
