import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Partnership & Inquiries',
  description: 'Contact Harch Corp for partnership, investment, or general inquiries. Offices in Casablanca, Dakar, and Banjul. Build Africa\'s future with us.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
