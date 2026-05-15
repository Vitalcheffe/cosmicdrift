import { Metadata } from 'next';
import ModernSlaveryPageClient from './ModernSlaveryPageClient';

export const metadata: Metadata = {
  title: 'Modern Slavery Statement  | Harch Corp',
  description: 'Harch Corp\'s statement on modern slavery, human trafficking, and forced labor in our operations and supply chain.',
  alternates: { canonical: 'https://www.harchcorp.com/legal/modern-slavery' },
};

export default function ModernSlaveryPage() {
  return <ModernSlaveryPageClient />;
}
