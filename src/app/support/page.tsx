import { Metadata } from 'next';
import SupportPageClient from './SupportPageClient';

export const metadata: Metadata = {
  title: 'Support Hub  | Harch Corp',
  description: 'Harch Corp support hub: choose your support tier, browse the knowledge base, submit tickets, and access customer success resources.',
};

export default function SupportPage() {
  return <SupportPageClient />;
}
