import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Harch Corp. Offices in Casablanca, Dakhla, and Gambia. Reach our team for general inquiries, investor relations, or career opportunities.',
  openGraph: {
    title: 'Contact Us | Harch Corp',
    description: 'Get in touch with Harch Corp.',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
