import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: "Harch Corp — Africa's Industrial Sovereignty | $2.4B+ Investment Pipeline",
  description:
    "Harch Corp S.A. is a Moroccan multi-sector industrial conglomerate building Africa's industrial sovereignty across 7 verticals: AI data centers (1,798 GPUs, ~47 gCO2/kWh), renewable energy (2GW+ pipeline), cement (500kT/yr), technology, mining, agriculture, and water. $2.4B+ investment pipeline across 5 countries.",
  alternates: {
    canonical: 'https://www.harchcorp.com',
  },
  openGraph: {
    title: "Harch Corp — Africa's Sovereign Infrastructure OS",
    description: "Moroccan industrial conglomerate — $2.4B+ investment pipeline across 7 verticals. Carbon-Aware GPU Cloud, 2GW+ Renewable Energy, Cement, Mining, Agriculture, Water.",
    url: 'https://www.harchcorp.com',
    siteName: 'Harch Corp',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
