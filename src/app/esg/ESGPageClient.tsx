'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Users, Shield, Droplets, Zap, Sun, Heart, Recycle, TreePine } from 'lucide-react';
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

const envCommitments = [
  { icon: Sun, title: '100% Renewable Energy', desc: 'All Harch Corp operations — from data centers to manufacturing — are powered by renewable energy. Our 2GW+ solar and wind pipeline provides zero-carbon electricity at industrial scale.' },
  { icon: Droplets, title: 'Water Stewardship', desc: 'Harch Water deploys 200M m³/yr desalination capacity with AI-optimized distribution, addressing Africa\'s water security crisis while minimizing environmental impact.' },
  { icon: TreePine, title: 'Carbon Negative Goal', desc: 'Our energy and mining operations are designed to be carbon negative by 2030 — removing more CO₂ than we produce through green hydrogen and carbon capture technologies.' },
  { icon: Recycle, title: 'Circular Economy', desc: 'Every vertical is designed for circularity — from mining tailings repurposed as construction materials to water recycling in cement production. Zero waste by design.' },
];

const socialImpact = [
  { stat: 3200, prefix: '', suffix: '+', label: 'Direct Jobs', desc: 'By 2028, Harch Corp will create 3,200+ direct jobs across 5 countries, with an emphasis on local hiring and skills development.' },
  { stat: 10, prefix: '', suffix: 'K+', label: 'Indirect Jobs', desc: 'Supply chain and community employment multiplying our direct impact by 3x across construction, logistics, and services.' },
  { stat: 50, prefix: '', suffix: 'M+', label: 'People Impacted', desc: 'Access to clean water, reliable energy, and digital infrastructure transforming daily life across our operating regions.' },
  { stat: 5, prefix: '', suffix: '', label: 'Countries', desc: 'Morocco, Gambia, Senegal, Mauritania, Mali — with plans to expand to 12+ markets by 2030.' },
];

const governanceTable = [
  { standard: 'ISO 14001', scope: 'Environmental Management', status: 'In Progress', vertical: 'All' },
  { standard: 'ISO 45001', scope: 'Occupational Health & Safety', status: 'In Progress', vertical: 'All' },
  { standard: 'GRI Standards', scope: 'Sustainability Reporting', status: 'Adopted', vertical: 'Corporate' },
  { standard: 'TCFD', scope: 'Climate Risk Disclosure', status: 'Adopted', vertical: 'Energy' },
  { standard: 'UN SDGs', scope: 'Sustainable Development Goals', status: 'Aligned', vertical: 'All' },
  { standard: 'IFC Performance', scope: 'Social & Environmental', status: 'In Progress', vertical: 'Mining' },
];

export default function ESGPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">ESG & Sustainability</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Building Sustainably,<br />Operating Responsibly
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Environmental stewardship, social impact, and world-class governance are not add-ons — they are foundational to our operating model and investment thesis.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Environmental Commitments */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Environmental</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Zero-Carbon by Design
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {envCommitments.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Section - Energy */}
      <section className="photo-section relative min-h-[60vh] flex items-center">
        <Image src="/images/hero-energy.jpg" alt="Renewable Energy" fill className="object-cover" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A]/10 border border-white/10 backdrop-blur-sm mb-6">
              <Leaf size={12} className="text-white/60" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">Environmental Commitment</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              2GW+ of Zero-Carbon<br />Electricity
            </h2>
            <p className="max-w-lg text-[15px] text-white/60 leading-relaxed">
              Every Harch Corp operation is powered by renewable energy. Our solar and wind farms generate more clean electricity than we consume — making us a net producer of zero-carbon power.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Social</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Impact at Scale
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {socialImpact.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div className="card p-6">
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none mb-2">
                    <AnimatedCounter target={item.stat} prefix={item.prefix} suffix={item.suffix} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-2">{item.label}</p>
                  <p className="text-[12px] text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Programs */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Community Programs</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Investing in People
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Harch Academy', desc: 'Technical training programs in AI, renewable energy, and industrial engineering. 500+ graduates annually with guaranteed placement across our verticals.' },
              { title: 'Community Water Access', desc: 'Every Harch Water project allocates 10% of desalination capacity for community use, providing clean water to underserved populations at no cost.' },
              { title: 'Local Supplier Program', desc: '40% minimum local procurement across all projects. We build supplier capacity through training and guaranteed contracts, creating lasting economic value.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Governance</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              World-Class Standards
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">International certifications and frameworks adopted across all operations.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#121212] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Standard</th>
                      <th>Scope</th>
                      <th>Status</th>
                      <th>Vertical</th>
                    </tr>
                  </thead>
                  <tbody>
                    {governanceTable.map((row) => (
                      <tr key={row.standard}>
                        <td className="font-semibold">{row.standard}</td>
                        <td>{row.scope}</td>
                        <td>
                          <span className={`status-badge ${row.status === 'Adopted' || row.status === 'Aligned' ? 'status-badge-active' : 'status-badge-engineering'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />{row.status}
                          </span>
                        </td>
                        <td>{row.vertical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Sustainable Impact</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">Every Harch Corp project is designed to create lasting positive impact — for communities, for economies, and for the planet.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">Get Involved <ArrowRight size={14} /></Link>
              <Link href="/investors" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">View Investment Details</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
