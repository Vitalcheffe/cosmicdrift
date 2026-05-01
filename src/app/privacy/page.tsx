import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Harch Corp privacy policy — how we collect, use, and protect your personal data in compliance with GDPR and Moroccan Law 09-08.',
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
