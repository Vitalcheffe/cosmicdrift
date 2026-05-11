import { Metadata } from 'next';
import SubsidiariesPageClient from './SubsidiariesPageClient';

export const metadata: Metadata = {
  title: 'Subsidiaries — Harch Corp',
  description: "Explore Harch Corp's 8 industrial verticals — AI data centers, renewable energy, cement, technology, mining, agriculture, water, and finance. Each vertical builds sovereign infrastructure for Africa.",
  alternates: {
    canonical: 'https://www.harchcorp.com/subsidiaries',
  },
  openGraph: {
    title: 'Harch Corp Subsidiaries — 8 Industrial Verticals',
    description: 'From AI compute to renewable energy, cement to agriculture — every vertical is vertically integrated and built for scale.',
    url: 'https://www.harchcorp.com/subsidiaries',
    siteName: 'Harch Corp',
    type: 'website',
  },
};

export default function SubsidiariesPage() {
  return <SubsidiariesPageClient />;
}
