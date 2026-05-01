import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubsidiaryPageClient from './SubsidiaryPageClient';

const subsidiaryData: Record<string, {
  name: string;
  tagline: string;
  location: string;
  investment: string;
  status: string;
  description: string;
  metrics: string[];
  image: string;
}> = {
  intelligence: {
    name: 'Harch Intelligence',
    tagline: '500MW AI Hyperscale Data Center',
    location: 'Dakhla, Morocco',
    investment: '$1.2B',
    status: 'Phase 1 Development',
    description: "Africa's largest AI-ready hyperscale data center campus, powered by 100% renewable energy in the strategic Dakhla corridor. Designed for sovereign AI compute, model training, and cloud infrastructure serving the African continent and European markets.",
    metrics: ['500MW IT Load', '100% Renewable Energy', 'Tier IV Design', 'Sub-100ms to Europe'],
    image: '/images/verticals/intelligence.jpg',
  },
  cement: {
    name: 'Harch Ciment',
    tagline: '500,000 Tons/Year Production Capacity',
    location: 'Gambia',
    investment: '$320M',
    status: 'Pre-Construction',
    description: 'State-of-the-art cement manufacturing facility in Gambia, addressing West Africa\'s critical infrastructure deficit. Integrated quarry-to-market supply chain with sustainable production processes.',
    metrics: ['500kT/Year Capacity', 'Integrated Quarry', 'Low-Carbon Process', 'Regional Distribution'],
    image: '/images/verticals/cement.jpg',
  },
  energy: {
    name: 'Harch Energy',
    tagline: '2GW+ Renewable Energy Portfolio',
    location: 'Morocco & Sahel',
    investment: '$800M',
    status: 'Development Pipeline',
    description: 'Multi-gigawatt renewable energy portfolio spanning solar, wind, and hybrid installations across Morocco and the Sahel region. Powering Harch Corp\'s industrial operations and regional grid stability.',
    metrics: ['2GW+ Pipeline', 'Solar + Wind + Hybrid', 'Grid-Scale Storage', 'Carbon Negative Target'],
    image: '/images/verticals/energy.jpg',
  },
  technology: {
    name: 'Harch Technology',
    tagline: 'Sovereign Technology Solutions',
    location: 'Casablanca, Morocco',
    investment: '$150M',
    status: 'Active',
    description: "Proprietary technology division developing sovereign AI platforms, industrial IoT, and automation systems for Harch Corp's verticals and third-party clients across Africa.",
    metrics: ['AI Platform Development', 'Industrial IoT Suite', '24 Patents Filed', '300+ Engineers'],
    image: '/images/verticals/technology.jpg',
  },
  mining: {
    name: 'Harch Mining',
    tagline: 'Strategic Mineral Extraction',
    location: 'Morocco & West Africa',
    investment: '$400M',
    status: 'Exploration Phase',
    description: 'Strategic mining operations focused on phosphate, cobalt, and critical minerals essential for the global energy transition. Vertically integrated with Harch Corp\'s technology and energy divisions.',
    metrics: ['3 Active Concessions', 'Phosphate & Cobalt Focus', 'Sustainable Extraction', 'Export to EU Markets'],
    image: '/images/verticals/mining.jpg',
  },
  agriculture: {
    name: 'Harch Agri',
    tagline: 'Climate-Resilient Agriculture at Scale',
    location: 'Morocco & Sahel',
    investment: '$200M',
    status: 'Pilot Operations',
    description: "Large-scale climate-resilient agriculture combining traditional farming wisdom with precision agriculture technology. Food security for Africa, powered by Harch Corp's technology and water divisions.",
    metrics: ['50,000+ Hectares', 'Precision Agriculture', 'Drip Irrigation 95%', 'Export Quality Standards'],
    image: '/images/verticals/agriculture.jpg',
  },
  water: {
    name: 'Harch Water',
    tagline: 'Water Security for Africa',
    location: 'Morocco & West Africa',
    investment: '$180M',
    status: 'Engineering Phase',
    description: 'Desalination, water treatment, and distribution infrastructure addressing Africa\'s most critical resource challenge. Integrated with Harch Energy for zero-carbon water production.',
    metrics: ['200M m³/Year Target', 'Solar-Powered Desalination', 'Zero Liquid Discharge', '5 Facilities Planned'],
    image: '/images/verticals/water.jpg',
  },
};

export async function generateStaticParams() {
  return Object.keys(subsidiaryData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = subsidiaryData[slug];
  if (!data) return { title: 'Not Found' };

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      title: `${data.name} | Harch Corp`,
      description: data.tagline,
    },
  };
}

export default async function SubsidiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = subsidiaryData[slug];
  if (!data) notFound();

  return <SubsidiaryPageClient data={data} />;
}
