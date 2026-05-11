import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Harch Corp',
  description: 'Contact Harch Corp for strategic partnerships, investment opportunities, business development, and media inquiries. Reach our teams across Africa and beyond.',
  alternates: {
    canonical: 'https://www.harchcorp.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
