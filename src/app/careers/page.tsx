import { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers — Harch Corp',
  description: "Join Harch Corp and build Africa's industrial future. Explore career opportunities across data centers, energy, technology, and more.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
