'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, Users, ShieldCheck } from 'lucide-react';

const environmentalCommitments = [
  {
    title: 'Carbon Neutrality by 2030',
    description: 'All Harch operations — from data centers to cement plants — are on a path to net-zero carbon emissions. Harch Energy\'s 2GW+ renewable pipeline provides the clean power to make this achievable.',
  },
  {
    title: '100% Renewable Energy',
    description: 'Harch Intelligence\'s data centers and Harch Ciment\'s manufacturing plants are powered exclusively by renewable energy from Harch Energy\'s solar and wind assets.',
  },
  {
    title: 'Water Stewardship',
    description: 'Harch Water\'s desalination plants use renewable-powered reverse osmosis to produce clean water without carbon emissions. Smart irrigation in Harch Agri reduces water consumption by 50%.',
  },
  {
    title: 'Circular Economy',
    description: 'Mining waste is processed for construction materials. Data center heat is captured for industrial use. Cement kiln byproducts are repurposed. Every output finds a productive use.',
  },
];

const socialImpact = [
  { value: '3,200+', label: 'Jobs Created by 2027' },
  { value: '40%', label: 'Local Workforce Target' },
  { value: '15+', label: 'Community Programs' },
  { value: '$50M+', label: 'Community Investment' },
];

const socialCommitments = [
  {
    title: 'Local Employment',
    description: 'Every Harch project prioritizes local hiring with a target of 40%+ local workforce at each site. Training programs upskill community members for technical and management roles.',
  },
  {
    title: 'Community Development',
    description: '1% of project revenue is allocated to community development funds — building schools, clinics, and infrastructure in host communities.',
  },
  {
    title: 'Safety First',
    description: 'Zero-harm workplace culture with international-standard safety protocols. Every site undergoes independent safety audits quarterly.',
  },
  {
    title: 'Smallholder Inclusion',
    description: 'Harch Agri\'s smallholder farmer programs provide training, technology, and market access to 10,000+ farming families across the Sahel.',
  },
];

const governancePractices = [
  'Independent board directors comprising 40% of board seats',
  'Quarterly financial reporting with independent audit',
  'Anti-corruption and bribery policies aligned with UK Bribery Act and US FCPA',
  'Whistleblower protection program with anonymous reporting channel',
  'Executive compensation tied to ESG performance metrics',
  'Annual ESG report with third-party verification',
  'Data protection policies compliant with GDPR and Moroccan Law 09-08',
];

const sustainabilityTargets = [
  { year: '2026', targets: ['1GW renewable energy operational', 'First ESG report published', 'Community development funds established at all sites'] },
  { year: '2027', targets: ['40% local workforce across operations', '100% renewable energy for data centers', 'Zero-harm safety record sustained'] },
  { year: '2028', targets: ['2GW+ renewable pipeline operational', '50% reduction in water intensity', 'Circular economy programs at all sites'] },
  { year: '2030', targets: ['Carbon neutrality across all operations', '10,000+ smallholder farmers supported', 'Net positive environmental impact'] },
];

export default function ESGPageClient() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">ESG</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-8">
            Building<br/>Sustainably
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/50 leading-relaxed">
            Harch Corp integrates environmental, social, and governance principles into every project — 
            not as an afterthought, but as a foundational design principle.
          </p>
        </div>
      </section>

      {/* Environmental */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Leaf size={18} className="text-white/30" strokeWidth={1.5} />
            <p className="section-label">Environmental</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {environmentalCommitments.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Users size={18} className="text-white/30" strokeWidth={1.5} />
            <p className="section-label">Social Impact</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {socialImpact.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs tracking-[0.1em] uppercase text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {socialCommitments.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck size={18} className="text-white/30" strokeWidth={1.5} />
            <p className="section-label">Governance</p>
          </div>
          <div className="max-w-2xl space-y-4">
            {governancePractices.map((practice) => (
              <div key={practice} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                <p className="text-sm text-white/50">{practice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Targets */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Sustainability Targets</p>
          <div className="space-y-0">
            {sustainabilityTargets.map((item) => (
              <div key={item.year} className="py-8 border-b border-white/[0.06] last:border-b-0">
                <div className="flex gap-8 md:gap-16">
                  <span className="text-sm font-mono text-white/30 w-16 shrink-0 pt-0.5">{item.year}</span>
                  <ul className="space-y-2">
                    {item.targets.map((target) => (
                      <li key={target} className="text-sm text-white/50 flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" />
                        {target}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
            Read Our ESG Report
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 mb-10">
            Download our comprehensive ESG report with detailed metrics, targets, and third-party verification.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Request Report
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
