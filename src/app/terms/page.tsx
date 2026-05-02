import { Metadata } from 'next';
import TermsPageClient from './TermsPageClient';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Harch Corp terms of use — conditions for using harchcorp.com.',
};

export default function TermsPage() {
  return <TermsPageClient />;
}
