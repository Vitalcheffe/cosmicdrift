import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Request a Briefing — Harch Corp',
  description: 'Request a secure briefing with Harch Corp. Government, industrial, investor, and talent inquiry channels. All communications encrypted end-to-end on sovereign infrastructure.',
  alternates: {
    canonical: 'https://www.harchcorp.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
