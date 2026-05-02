import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy — Harch Corp',
  description: 'Harch Corp privacy policy and data protection practices.',
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
