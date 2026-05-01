'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: 'Vertical Integration',
    description: 'We own the entire value chain — from raw materials to finished infrastructure. Harch Mining extracts the minerals. Harch Energy powers the operations. Harch Technology provides the software. Harch Ciment produces the building materials. This integration eliminates dependency on external suppliers, reduces costs, and ensures quality control at every stage.',
    items: ['Raw material extraction to finished product', 'Energy self-sufficiency across operations', 'Technology developed in-house for African needs', 'Cost reduction through elimination of intermediaries'],
  },
  {
    number: '02',
    title: 'Sovereign Infrastructure',
    description: 'Every Harch Corp project is designed to be owned, operated, and controlled by Africans. We don\'t build infrastructure for foreign extraction — we build it for continental self-reliance. Data stays on African soil. Energy serves African grids first. Minerals are processed locally. This is sovereignty by design, not by decree.',
    items: ['African data residency for all compute operations', 'Local processing and beneficiation of raw materials', 'Energy production prioritizing African grid supply', 'Skills transfer and indigenous workforce development'],
  },
  {
    number: '03',
    title: 'Continental Scale',
    description: 'Harch Corp operates across five countries and is expanding rapidly. Our infrastructure is designed not for individual markets but for continental connectivity — data centers linked by subsea cables, energy grids spanning borders, mining operations feeding regional supply chains. Africa\'s future is pan-African, and so are we.',
    items: ['Operations spanning 5+ countries across North and West Africa', 'Cross-border energy and data infrastructure', 'Regional supply chain integration', 'Pan-African market access for Harch products and services'],
  },
];

const roadmapItems = [
  { year: '2023', title: 'Foundation', description: 'Harch Corp S.A. established in Casablanca. Initial investment thesis developed across 7 verticals.' },
  { year: '2024', title: 'Pipeline Assembly', description: '$2.4B+ investment pipeline secured. Land allocation for Dakhla data center. Cement plant construction begins in The Gambia.' },
  { year: '2025', title: 'Breaking Ground', description: 'Dakhla hyperscale data center Phase 1 construction. First renewable energy assets operational. Mining operations commence.' },
  { year: '2026', title: 'Operational Scale', description: 'Data center Phase 1 live. Cement plant at full capacity. 1GW renewable energy operational. Technology platforms deployed.' },
  { year: '2027', title: 'Vertical Integration', description: 'Full value chain integration across all verticals. Harch Technology platforms managing operations end-to-end.' },
  { year: '2030', title: 'Continental Leadership', description: 'Africa\'s largest industrial conglomerate. 5GW+ renewable pipeline. Continental AI compute dominance. Full ESG targets met.' },
];

const advantages = [
  { title: 'Speed of Execution', description: 'Vertically integrated operations eliminate procurement delays and coordination overhead. We move from concept to groundbreaking in months, not years.' },
  { title: 'Cost Efficiency', description: 'Own-energy, own-materials, own-technology. By controlling the full stack, we achieve 30-50% cost advantages over competitors dependent on external supply chains.' },
  { title: 'Sovereign by Design', description: 'Data residency, local processing, indigenous workforce. Every project is architected for African self-reliance from day one.' },
  { title: 'Risk Mitigation', description: 'Diversified across 7 verticals and 5 countries. Vertical integration reduces single-point-of-failure risks that plague single-vertical operators.' },
];

export default function StrategyPageClient() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Strategy</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-8">
            Three Pillars.<br/>One Mission.
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/50 leading-relaxed">
            Harch Corp&apos;s strategy is built on three inseparable pillars — vertical integration, 
            sovereign infrastructure, and continental scale — each reinforcing the other to create 
            an industrial ecosystem that is greater than the sum of its parts.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-24">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
                <span className="text-6xl md:text-7xl font-light text-white/[0.06]">{pillar.number}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-6">
                    {pillar.title}
                  </h2>
                  <p className="text-base text-white/50 leading-relaxed mb-8 max-w-2xl">
                    {pillar.description}
                  </p>
                  <ul className="space-y-3">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                        <span className="text-sm text-white/45">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2030 Roadmap */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">2030 Roadmap</p>
          <div className="space-y-0">
            {roadmapItems.map((item, i) => (
              <div key={item.year} className="flex gap-8 md:gap-16 py-8 border-b border-white/[0.06] last:border-b-0">
                <span className="text-sm font-mono text-white/30 w-16 shrink-0 pt-0.5">{item.year}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Competitive Advantages</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {advantages.map((adv) => (
              <div key={adv.title}>
                <h3 className="text-xl font-medium text-white mb-3">{adv.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
            Partner With Us
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 mb-10">
            Whether you&apos;re an investor, government, or industrial partner — there&apos;s a role for you 
            in building Africa&apos;s industrial sovereignty.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Get in Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
