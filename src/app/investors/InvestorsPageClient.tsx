'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, DollarSign, BarChart3, PieChart, Globe, Building2, Users, FileText } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2500; const startTime = Date.now();
    const step = () => { const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - progress, 4); setCount(eased * target); if (progress < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, target]);
  const format = () => { if (target >= 1000) return `${prefix}${Math.round(count).toLocaleString()}${suffix}`; if (target < 10) return `${prefix}${count.toFixed(1)}${suffix}`; return `${prefix}${Math.round(count)}${suffix}`; };
  return <span ref={ref}>{format()}</span>;
}

const highlights = [
  { value: 2.4, prefix: '$', suffix: 'B+', label: 'Total Pipeline', desc: 'Active capital across 7 verticals' },
  { value: 800, prefix: '$', suffix: 'M', label: 'Largest Project', desc: 'Harch Intelligence Dakhla' },
  { value: 7, prefix: '', suffix: '', label: 'Verticals', desc: 'Fully integrated industrial ecosystem' },
  { value: 5, prefix: '', suffix: '', label: 'Countries', desc: 'Morocco, Gambia, Senegal, Mauritania, Mali' },
];

const financialTable = [
  { vertical: 'Intelligence', investment: '$800M', capacity: '500MW', irr: '22-28%', timeline: '2027', status: 'Engineering' },
  { vertical: 'Cement', investment: '$200M', capacity: '500kT/yr', irr: '18-22%', timeline: '2028', status: 'Permitted' },
  { vertical: 'Energy', investment: '$600M', capacity: '2GW+', irr: '15-20%', timeline: '2027', status: 'Active' },
  { vertical: 'Technology', investment: '$400M', capacity: '50K+ GPUs', irr: '25-30%', timeline: '2028', status: 'Design' },
  { vertical: 'Mining', investment: '$200M', capacity: '3 Minerals', irr: '20-25%', timeline: '2029', status: 'Exploration' },
  { vertical: 'Agri', investment: '$150M', capacity: '$35B Market', irr: '16-20%', timeline: '2029', status: 'Planning' },
  { vertical: 'Water', investment: '$150M', capacity: '200M m³/yr', irr: '14-18%', timeline: '2030', status: 'Feasibility' },
];

const pipelinePhases = [
  { phase: 'Phase 1', year: '2024-2026', desc: 'Foundation & Engineering', detail: 'Company formation, site acquisition, engineering design, permit applications, and initial capital deployment of $400M.' },
  { phase: 'Phase 2', year: '2027-2028', desc: 'Construction & Commissioning', detail: 'First data center module live (100MW). Cement plant construction. Energy farm at 1GW. Total deployment: $1.2B.' },
  { phase: 'Phase 3', year: '2029-2030', desc: 'Scale & Expansion', detail: 'Full data center capacity (500MW). Mining operations begin. Agri and Water verticals operational. Total deployment: $2.4B.' },
];

export default function InvestorsPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Investor Relations</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Invest in Africa&apos;s<br />Industrial Future
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              $2.4B+ in active capital deployment across 7 verticals and 5 countries. Harch Corp offers institutional investors direct access to Africa&apos;s most consequential industrial opportunity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Investment Highlights</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              By the Numbers
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="card p-6">
                  <p className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-none mb-2">
                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-1">{stat.label}</p>
                  <p className="text-[12px] text-[#666666] leading-relaxed">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Overview Table */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Financial Overview</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Investment Breakdown
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Detailed capital allocation and projected returns across all 7 verticals.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#121212] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vertical</th>
                      <th>Investment</th>
                      <th>Capacity</th>
                      <th>Projected IRR</th>
                      <th>Timeline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialTable.map((row) => (
                      <tr key={row.vertical}>
                        <td>{row.vertical}</td>
                        <td className="font-semibold">{row.investment}</td>
                        <td>{row.capacity}</td>
                        <td className="font-semibold">{row.irr}</td>
                        <td>{row.timeline}</td>
                        <td>
                          <span className={`status-badge ${row.status === 'Active' ? 'status-badge-active' : row.status === 'Engineering' ? 'status-badge-engineering' : row.status === 'Permitted' ? 'status-badge-permitted' : 'status-badge-design'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />{row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[#1A1A1A]/50">
                <p className="text-[11px] text-[#666666]">Total: $2.4B+ | Weighted avg. IRR: 20-25% | Data as of Q1 2026</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pipeline Phases */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Deployment Timeline</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Capital Deployment Phases
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {pipelinePhases.map((phase, i) => (
              <FadeIn key={phase.phase} delay={i * 0.1}>
                <div className="card p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="shrink-0">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">{phase.phase}</span>
                      <p className="text-[12px] text-[#666666]">{phase.year}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{phase.desc}</h3>
                      <p className="text-[14px] text-[#999999] leading-relaxed">{phase.detail}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Key Investment Thesis */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">Investment Thesis</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                Structural Advantages<br />That Compound
              </h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                Harch Corp&apos;s vertically integrated model creates structural cost advantages of 30-50% versus competitors. Because we own energy, materials, and technology, our operating costs are fundamentally lower.
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                These advantages compound over time. As each vertical scales, it reduces costs for the others — creating a self-reinforcing industrial ecosystem that grows stronger and more profitable with every project delivered.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Cost Advantage', value: '30-50%' },
                  { label: 'Weighted IRR', value: '20-25%' },
                  { label: 'Payback Period', value: '5-7 yrs' },
                  { label: 'Capital Efficiency', value: '1.8x' },
                ].map((item) => (
                  <div key={item.label} className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4">
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#1E1E1E]">
                <Image src="/images/hero-energy.jpg" alt="Harch Corp Investment" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Become an Investor</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">Direct access to Africa&apos;s most consequential industrial opportunity. Institutional-grade investment structures available.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">Request Deck <ArrowRight size={14} /></Link>
              <Link href="/strategy" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">View Strategy</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
