import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Harch Corp — offices in Casablanca, Dakar, and Banjul. Partnership, investment, and general inquiries.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
