import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Harch Corp privacy policy and data protection practices.',
  alternates: { canonical: 'https://www.harchcorp.com/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
