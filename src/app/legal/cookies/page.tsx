import { Metadata } from 'next';
import CookiesPageClient from './CookiesPageClient';

export const metadata: Metadata = {
  title: 'Cookie Policy  | Harch Corp',
  description: 'Learn how Harch Corp uses cookies and similar technologies to improve your experience on our website.',
};

export default function CookiesPage() {
  return <CookiesPageClient />;
}
