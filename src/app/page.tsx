import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: "Harch Corp — Africa's Industrial Sovereignty",
  description:
    "Multi-sector industrial conglomerate building sovereign infrastructure across Africa — AI data centers, renewable energy, cement, technology, mining, agriculture, and water.",
};

export default function HomePage() {
  return <HomePageClient />;
}
