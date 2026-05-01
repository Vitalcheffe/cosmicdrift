import type { Metadata } from 'next';
import TermsPageClient from './TermsPageClient';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions governing the use of the Harch Corp website. Please read carefully before using this site.',
};

export default function TermsPage() {
  return <TermsPageClient />;
}
