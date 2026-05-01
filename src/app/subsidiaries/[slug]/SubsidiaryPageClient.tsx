'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface SubsidiaryData {
  name: string;
  label: string;
  tagline: string;
  image: string;
  overview: string;
  metrics: { value: string; label: string }[];
  advantages: string[];
}

const subsidiaries: Record<string, SubsidiaryData> = {
  intelligence: {
    name: 'Harch Intelligence',
    label: 'AI & Data Infrastructure',
    tagline: 'Africa\'s Sovereign AI Compute Backbone',
    image: '/images/verticals/intelligence.jpg',
    overview: 'Harch Intelligence is building Africa\'s largest AI-ready hyperscale data center in Dakhla, Morocco — a 500MW facility powered entirely by renewable energy. Designed for large language model training, inference at continental scale, and sovereign cloud infrastructure, the facility positions Africa as a global AI hub rather than a consumer of foreign compute.',
    metrics: [
      { value: '500MW', label: 'IT Load Capacity' },
      { value: '100%+', label: 'Renewable Energy' },
      { value: '50,000+', label: 'GPU Clusters' },
      { value: '$800M', label: 'Investment' },
    ],
    advantages: [
      'Strategic location in Dakhla with direct access to subsea cables connecting Europe, Africa, and the Americas',
      'Powered by dedicated 2GW+ renewable energy from Harch Energy — zero-carbon, zero-cost volatility',
      'Sovereign data residency ensuring African data remains on African soil',
      'Next-generation liquid cooling supporting dense GPU deployments for AI training',
      'Integrated with Harch Technology for indigenous AI software and platforms',
    ],
  },
  cement: {
    name: 'Harch Ciment',
    label: 'Construction & Materials',
    tagline: 'Building the Foundations of Industrial Africa',
    image: '/images/verticals/cement.jpg',
    overview: 'Harch Ciment operates cement manufacturing plants across West Africa, starting with The Gambia — a country that previously imported 100% of its cement. By localizing production, Harch Ciment reduces costs by 30-40%, creates thousands of jobs, and ensures that critical construction materials are available for the continent\'s infrastructure boom.',
    metrics: [
      { value: '2M+', label: 'Tonnes/Year Capacity' },
      { value: '30-40%', label: 'Cost Reduction' },
      { value: '1,200+', label: 'Direct Jobs' },
      { value: '$200M', label: 'Investment' },
    ],
    advantages: [
      'First-mover advantage in underserved West African markets',
      'Vertical integration with Harch Mining for raw material supply',
      'Modern, energy-efficient kiln technology reducing carbon intensity by 40%',
      'Strategic port access enabling both domestic supply and regional exports',
      'Locally sourced workforce with international engineering expertise',
    ],
  },
  energy: {
    name: 'Harch Energy',
    label: 'Renewable Energy',
    tagline: 'Powering Africa\'s Industrial Future',
    image: '/images/verticals/energy.jpg',
    overview: 'Harch Energy is developing over 2 gigawatts of renewable energy capacity across Morocco and the Sahel region. Combining solar PV, onshore wind, and green hydrogen production, Harch Energy provides the zero-carbon electricity that powers Harch Corp\'s industrial operations — from data centers to cement plants — while supplying national grids with affordable, clean power.',
    metrics: [
      { value: '2GW+', label: 'Renewable Pipeline' },
      { value: '$600M+', label: 'Investment' },
      { value: '3', label: 'Countries' },
      { value: '0', label: 'Carbon Emissions' },
    ],
    advantages: [
      'Integrated energy-to-industrial model: power generated serves Harch operations first, with surplus sold to grids',
      'World-class solar irradiance and wind resources in Morocco and Sahel',
      'Green hydrogen production for industrial feedstock and export',
      'Long-term PPAs with sovereign counterparties ensuring revenue visibility',
      'Captive renewable supply eliminates energy cost volatility for Harch operations',
    ],
  },
  technology: {
    name: 'Harch Technology',
    label: 'Sovereign Technology',
    tagline: 'Indigenous Software for Africa\'s Digital Future',
    image: '/images/verticals/technology.jpg',
    overview: 'Harch Technology develops sovereign AI platforms, industrial IoT systems, and digital infrastructure tailored to African needs. From agricultural decision-support tools to mining automation software, Harch Technology ensures that Africa doesn\'t just consume technology — it creates it.',
    metrics: [
      { value: '15+', label: 'Software Platforms' },
      { value: '200+', label: 'Engineers' },
      { value: '5', label: 'AI/ML Products' },
      { value: '$150M', label: 'Investment' },
    ],
    advantages: [
      'Purpose-built for African infrastructure challenges — not adapted Western software',
      'Integrated with Harch Intelligence\'s sovereign compute for data residency',
      'Industrial IoT platforms for real-time monitoring of Harch operations',
      'AI-powered predictive maintenance reducing downtime by 60%',
      'Open architecture enabling third-party developers to build on Harch platforms',
    ],
  },
  mining: {
    name: 'Harch Mining',
    label: 'Mining & Critical Minerals',
    tagline: 'Unlocking Africa\'s Mineral Wealth for Africa',
    image: '/images/verticals/mining.jpg',
    overview: 'Harch Mining operates strategic mining assets across Morocco and the Sahel, extracting phosphate, cobalt, lithium, and other critical minerals essential for global energy transition. Unlike traditional mining operations, Harch Mining processes minerals locally — retaining value on the continent and feeding downstream Harch operations.',
    metrics: [
      { value: '5+', label: 'Active Sites' },
      { value: '$400M+', label: 'Investment' },
      { value: '4', label: 'Critical Minerals' },
      { value: '800+', label: 'Direct Jobs' },
    ],
    advantages: [
      'Local processing and beneficiation — raw materials don\'t leave Africa unrefined',
      'Vertical integration: minerals feed Harch Technology and Harch Energy supply chains',
      'ESG-first approach with community development commitments at every site',
      'Strategic offtake agreements with global technology manufacturers',
      'Modern extraction technology minimizing environmental impact',
    ],
  },
  agriculture: {
    name: 'Harch Agri',
    label: 'Climate-Resilient Agriculture',
    tagline: 'Feeding Africa\'s Growing Population Sustainably',
    image: '/images/verticals/agriculture.jpg',
    overview: 'Harch Agri deploys precision agriculture, smart irrigation, and climate-adaptive farming across the Sahel region. By combining traditional agricultural knowledge with AI-driven decision support and water-efficient irrigation, Harch Agri increases yields by 40-60% while using 50% less water — critical for a continent facing acute food and water security challenges.',
    metrics: [
      { value: '40-60%', label: 'Yield Increase' },
      { value: '50%', label: 'Water Savings' },
      { value: '10,000+', label: 'Hectares' },
      { value: '$180M', label: 'Investment' },
    ],
    advantages: [
      'AI-powered crop management through Harch Technology integration',
      'Smart irrigation systems powered by Harch Energy\'s renewable electricity',
      'Climate-adaptive seed varieties developed for Sahel conditions',
      'Direct market access through Harch logistics network',
      'Smallholder farmer inclusion programs ensuring shared prosperity',
    ],
  },
  water: {
    name: 'Harch Water',
    label: 'Water Security',
    tagline: 'Securing Africa\'s Most Critical Resource',
    image: '/images/verticals/water.jpg',
    overview: 'Harch Water builds and operates desalination plants, water treatment facilities, and distribution infrastructure across water-scarce regions of Africa. Powered by Harch Energy\'s renewable electricity, our desalination plants produce affordable clean water at scale — serving industrial operations and local communities alike.',
    metrics: [
      { value: '500K+', label: 'm³/Day Capacity' },
      { value: '$250M', label: 'Investment' },
      { value: '3', label: 'Countries' },
      { value: '2M+', label: 'People Served' },
    ],
    advantages: [
      'Renewable-powered desalination — zero-carbon water production',
      'Industrial-grade treatment supporting Harch manufacturing operations',
      'Community water access programs alongside industrial supply',
      'Smart water grid technology for real-time quality and flow monitoring',
      'Public-private partnership model enabling rapid deployment',
    ],
  },
};

const subsidiarySlugs = Object.keys(subsidiaries);

export default function SubsidiaryPageClient() {
  const params = useParams();
  const slug = params.slug as string;
  const data = subsidiaries[slug];

  if (!data) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white mb-4">Not Found</h1>
          <p className="text-white/50 mb-8">This subsidiary does not exist.</p>
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = subsidiarySlugs.indexOf(slug);
  const nextSlug = subsidiarySlugs[(currentIndex + 1) % subsidiarySlugs.length];
  const nextData = subsidiaries[nextSlug];

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">{data.label}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/50 mb-10">
            {data.tagline}
          </p>
        </div>
        {/* Hero Image */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="section-label mb-6">Overview</p>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Key Metrics</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {data.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs tracking-[0.1em] uppercase text-white/40">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Strategic Advantages</p>
          <div className="max-w-3xl space-y-6">
            {data.advantages.map((advantage, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-sm text-white/20 font-mono mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  {advantage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
                Invest in {data.name}
              </h2>
              <p className="text-sm text-white/40">
                Learn about investment opportunities in this vertical.
              </p>
            </div>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors shrink-0"
            >
              Investor Relations
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Next Subsidiary */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link
            href={`/subsidiaries/${nextSlug}`}
            className="group flex items-center justify-between"
          >
            <div>
              <p className="section-label mb-2">Next Vertical</p>
              <p className="text-2xl md:text-3xl font-light text-white/60 group-hover:text-white transition-colors">
                {nextData.name}
              </p>
            </div>
            <ArrowLeft size={20} className="text-white/30 group-hover:text-white group-hover:-translate-x-1 transition-all rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
