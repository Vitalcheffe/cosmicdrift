import { Metadata } from 'next';
import DeiPageClient from './DeiPageClient';

export const metadata: Metadata = {
  title: 'Diversity, Equity & Inclusion — Harch Corp',
  description: 'Our commitment to building a diverse, equitable, and inclusive workplace that reflects the communities we serve across Africa.',
};

export default function DeiPage() {
  return <DeiPageClient />;
}
