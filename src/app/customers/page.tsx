import { Metadata } from 'next';
import CustomersPageClient from './CustomersPageClient';

export const metadata: Metadata = {
  title: 'Customer Stories — Harch Corp',
  description: 'How African organizations are transforming with Harch Corp — case studies from finance, energy, agriculture, mining, water, and government sectors.',
};

export default function CustomersPage() {
  return <CustomersPageClient />;
}
