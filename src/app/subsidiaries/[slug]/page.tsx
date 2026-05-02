import { Metadata } from 'next';
import SubsidiaryWrapper from './SubsidiaryWrapper';

export const metadata: Metadata = {
  title: 'Subsidiaries',
  description: 'Explore Harch Corp\'s 7 industrial verticals — from AI data centers to renewable energy, mining, agriculture, and water infrastructure.',
};

export default function SubsidiaryPage() {
  return <SubsidiaryWrapper />;
}
