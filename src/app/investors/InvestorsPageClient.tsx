'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Calendar } from 'lucide-react';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const financialHighlights = [
  { value: '$2.4B+', label: 'Total Investment Pipeline' },
  { value: '7', label: 'Industrial Verticals' },
  { value: '5', label: 'Countries' },
  { value: '2028', label: 'Projected EBITDA Positive' },
];

const documents = [
  { name: 'Harch Corp — Company Overview 2026', type: 'PDF', size: '4.2 MB' },
  { name: 'Sahara Neural Hub — Investment Memorandum', type: 'PDF', size: '12.8 MB' },
  { name: 'Dakhla Hyperscale DC — Technical Report', type: 'PDF', size: '8.5 MB' },
  { name: 'Harch Energy — Renewable Pipeline Overview', type: 'PDF', size: '6.1 MB' },
  { name: 'ESG Report 2025', type: 'PDF', size: '3.7 MB' },
  { name: 'Financial Model — Summary', type: 'XLSX', size: '2.1 MB' },
];

const calendar = [
  { date: 'Q2 2026', event: 'Dakhla Data Center Phase 1 — Construction Update' },
  { date: 'Q3 2026', event: 'Gambia Cement Plant — Full Operational Capacity' },
  { date: 'Q4 2026', event: 'Harch Energy — 1GW Operational Milestone' },
  { date: 'Q1 2027', event: 'Annual Investor Day — Casablanca' },
  { date: 'Q2 2027', event: 'Harch Intelligence — Phase 1 Data Center Live' },
];

export default function InvestorsPageClient() {
  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6">Investor Relations</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.01em] mb-8">
              Invest in Africa&apos;s<br/>Industrial Future
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-base md:text-lg text-white/40 leading-relaxed">
              Harch Corp offers institutional investors access to a diversified portfolio of critical 
              infrastructure assets across 7 verticals and 5 countries — with a $2.4B+ pipeline and 
              a clear path to continental scale.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Investment Thesis</p>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
                Africa is the last great infrastructure frontier.
              </h2>
              <div className="space-y-4 text-base text-white/40 leading-relaxed">
                <p>
                  The continent hosts 18% of the world&apos;s population but generates just 3% of global GDP — 
                  not because of a lack of talent or resources, but because of a fundamental infrastructure deficit. 
                  Africa needs $130-170B annually in infrastructure investment to close this gap.
                </p>
                <p>
                  Harch Corp is positioned at the intersection of three mega-trends: the global AI compute boom 
                  requiring new data center capacity, the energy transition driving demand for critical minerals 
                  and renewable energy, and Africa&apos;s urbanization creating unprecedented demand for construction 
                  materials and water infrastructure.
                </p>
                <p>
                  Our vertically integrated model — owning energy, materials, technology, and operations — creates 
                  structural cost advantages of 30-50% versus competitors who rely on external supply chains. 
                  This is not speculative. It is engineering.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-12">Financial Highlights</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {financialHighlights.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C9A84C] tracking-[-0.01em]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs tracking-[0.1em] uppercase text-white/20">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-12">Documents</p>
          </FadeIn>
          <div className="space-y-0">
            {documents.map((doc, i) => (
              <FadeIn key={doc.name} delay={i * 0.05}>
                <div className="flex items-center justify-between py-5 border-b border-[rgba(255,255,255,0.04)] group cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <div className="flex items-center gap-4">
                    <Download size={16} className="text-white/20" />
                    <div>
                      <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                        {doc.name}
                      </p>
                      <p className="text-xs text-white/15 mt-0.5">
                        {doc.type} · {doc.size}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-white/10 group-hover:text-white/30 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Calendar */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-12">Financial Calendar</p>
          </FadeIn>
          <div className="space-y-0">
            {calendar.map((item, i) => (
              <FadeIn key={item.date + item.event} delay={i * 0.05}>
                <div className="flex gap-8 md:gap-16 py-5 border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
                  <div className="flex items-center gap-2 shrink-0">
                    <Calendar size={14} className="text-white/15" />
                    <span className="text-sm font-mono text-white/20">{item.date}</span>
                  </div>
                  <p className="text-sm text-white/40">{item.event}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Contact */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <div>
                <p className="section-label mb-6">Investor Contact</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-4">
                  Get in Touch
                </h2>
                <p className="text-sm text-white/30 leading-relaxed mb-6">
                  For investment inquiries, due diligence requests, or partnership discussions, 
                  please contact our Investor Relations team.
                </p>
                <div className="space-y-2 text-sm text-white/30">
                  <p>investor.relations@harchcorp.com</p>
                  <p>+212 5 22 00 00 00</p>
                  <p>123 Boulevard Mohammed V, Casablanca, Morocco</p>
                </div>
              </div>
              <div className="flex items-start md:items-end justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Contact IR Team
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
