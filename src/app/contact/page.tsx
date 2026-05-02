import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Harch Corp',
  description: 'Get in touch with Harch Corp for partnership, investment, and business development inquiries.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
