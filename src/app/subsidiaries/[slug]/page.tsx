import { Metadata } from 'next';
import SubsidiaryWrapper from './SubsidiaryWrapper';

export const metadata: Metadata = {
  title: 'Subsidiaries — Harch Corp',
  description: "Explore Harch Corp's 7 industrial verticals — AI data centers, renewable energy, cement, technology, mining, agriculture, and water infrastructure.",
};

export default function SubsidiaryPage() {
  return <SubsidiaryWrapper />;
}
