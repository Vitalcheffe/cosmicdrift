import type { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Harch Corp\'s privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and Moroccan CNDP regulations.',
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
