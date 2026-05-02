import { Metadata } from 'next';
import SubsidiaryPageClient from './SubsidiaryPageClient';

export const metadata: Metadata = {
  title: 'Subsidiaries',
  description: 'Explore Harch Corp\'s 7 industrial verticals — from AI data centers to renewable energy, mining, agriculture, and water infrastructure.',
};

export default function SubsidiaryPage() {
  return <SubsidiaryPageClient />;
}
