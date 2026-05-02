'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Target, TrendingUp, Shield, Zap, Globe, Building2, Layers, Cpu, Droplets, Wheat, Mountain, Factory } from 'lucide-react';
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

const verticalsDeep = [
  { icon: Cpu, name: 'Harch Intelligence', version: '/0.1', investment: '$800M', desc: '500MW AI-ready hyperscale data center in Dakhla. Next-gen GPU clusters for sovereign AI compute, powered by 100% renewable energy with submarine cable connectivity to Europe and the Americas.', keyPoints: ['500MW+ capacity', '50K+ GPU clusters', '100% renewable powered', 'Submarine cable connected'], href: '/subsidiaries/intelligence' },
  { icon: Factory, name: 'Harch Ciment', version: '/0.2', investment: '$200M', desc: '500kT/yr cement production in Gambia, serving West Africa\'s construction boom. Vertically integrated from quarry to delivery with structural cost advantages.', keyPoints: ['500kT/yr capacity', 'Vertically integrated', 'West Africa focus', 'Quarry-to-delivery model'], href: '/subsidiaries/cement' },
  { icon: Zap, name: 'Harch Energy', version: '/0.3', investment: '$600M', desc: '2GW+ solar, wind, and green hydrogen pipeline across Morocco and Sahel. Zero-carbon electricity powering industrial operations and data centers.', keyPoints: ['2GW+ pipeline', 'Solar + Wind + H₂', 'Zero-carbon operations', 'Industrial-scale output'], href: '/subsidiaries/energy' },
  { icon: Shield, name: 'Harch Technology', version: '/0.4', investment: '$400M', desc: 'Sovereign tech stack: AI platforms, cybersecurity, and satellite communications. 50K+ GPU clusters powering continental AI from inference to training.', keyPoints: ['50K+ GPU clusters', 'Sovereign AI platform', 'Cybersecurity suite', 'Satellite communications'], href: '/subsidiaries/technology' },
  { icon: Mountain, name: 'Harch Mining', version: '/0.5', investment: '$200M', desc: 'Strategic mineral extraction — phosphates, cobalt, and rare earths. Building processing and refining capacity in-country to capture the value chain.', keyPoints: ['3 strategic minerals', 'In-country processing', 'Export-grade refining', '30% of global reserves'], href: '/subsidiaries/mining' },
  { icon: Wheat, name: 'Harch Agri', version: '/0.6', investment: '$150M', desc: 'Precision agriculture and vertical farming across Africa\'s 60% uncultivated arable land. IoT, drone monitoring, and AI-optimized crop management.', keyPoints: ['$35B market access', 'IoT + drone monitoring', 'Vertical farming tech', 'Precision agriculture'], href: '/subsidiaries/agriculture' },
  { icon: Droplets, name: 'Harch Water', version: '/0.7', investment: '$150M', desc: '200M m³/yr desalination capacity with AI-optimized distribution. Solving Africa\'s water security crisis at continental scale.', keyPoints: ['200M m³/yr capacity', 'AI-optimized distribution', 'Desalination technology', 'Smart water networks'], href: '/subsidiaries/water' },
];

const advantages = [
  { title: 'Vertical Integration', desc: 'Energy + Materials + Technology + Operations under one roof. We control every link, creating 30-50% structural cost advantages.' },
  { title: 'Sovereign by Design', desc: 'Infrastructure that Africa owns and controls. No dependency on foreign operators, no extraction of value.' },
  { title: 'Execution Speed', desc: 'The continent cannot wait. We deploy capital and break ground faster than any competitor in the market.' },
  { title: 'Regulatory Expertise', desc: 'Deep relationships with governments across 5+ countries. We navigate complex regulatory environments with precision.' },
];

export default function StrategyPageClient() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Strategy</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-[#000000] tracking-[-0.02em] leading-[1.05] mb-6">
              The Operator<br />Model
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#6B7280] leading-[1.7]">
              Harch Corp doesn&apos;t advise — we build. We own the entire value chain from raw materials to finished infrastructure. This is our strategy for converting Africa&apos;s potential into industrial power.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">Our Vision</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#000000] tracking-[-0.01em] mb-6">
                Africa Doesn&apos;t Need Aid.<br/>It Needs Infrastructure.
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-6">
                For decades, the prevailing approach to African development has been aid-based — funding that creates dependency without building capacity. Our strategy inverts this model entirely.
              </p>
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-6">
                We deploy capital into infrastructure that generates returns — economic, strategic, and social. Every dollar invested in Harch Corp creates permanent industrial capacity that Africa owns and controls.
              </p>
              <p className="text-[15px] text-[#6B7280] leading-[1.7]">
                This is not charity. This is industrial sovereignty. And it&apos;s the most profitable, most impactful investment thesis on the continent.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '$2.4B+', label: 'Investment Pipeline' },
                  { value: '7', label: 'Verticals' },
                  { value: '5', label: 'Countries' },
                  { value: '3,200+', label: 'Jobs by 2028' },
                ].map((stat) => (
                  <div key={stat.label} className="card p-6 text-center">
                    <p className="text-3xl font-bold text-[#000000]">{stat.value}</p>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.1em] font-bold mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7 Verticals Deep Dive */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Seven Pillars</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#000000] tracking-[-0.01em] mb-6">
              The Vertical Strategy
            </h2>
            <p className="max-w-xl text-[15px] text-[#6B7280] leading-relaxed mb-16">
              Each vertical is designed to reinforce the others — creating a self-reinforcing industrial ecosystem that grows stronger as it scales.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {verticalsDeep.map((v, i) => (
              <FadeIn key={v.version} delay={i * 0.05}>
                <Link href={v.href} className="vertical-row group block p-6 md:p-8 cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(0,0,0,0.04)] flex items-center justify-center">
                        <v.icon size={20} className="text-[#000000]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-xl md:text-2xl font-bold text-[#000000] group-hover:text-[#374151] transition-colors">{v.name}</h3>
                          <span className="version-tag">{v.version}</span>
                        </div>
                        <p className="text-[12px] font-semibold text-[#000000]">{v.investment}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">{v.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.keyPoints.map((point) => (
                          <span key={point} className="px-3 py-1 rounded-md bg-[rgba(0,0,0,0.03)] text-[10px] font-semibold text-[#6B7280] tracking-wide">{point}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={16} className="vertical-arrow text-[rgba(0,0,0,0.1)] group-hover:text-[#000000] transition-all shrink-0 mt-2" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Investment Thesis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#000000] tracking-[-0.01em] mb-6">
              Why Africa, Why Now
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Demographic Dividend', desc: '1.4 billion people with a median age of 19. The largest untapped workforce on Earth, ready to power industrialization at scale. By 2050, Africa will have the world\'s largest working-age population.' },
              { title: 'Resource Supremacy', desc: '30% of global mineral reserves, 60% of uncultivated arable land, and the world\'s best renewable energy resources. The raw materials for the 21st century economy are here.' },
              { title: 'Infrastructure Gap', desc: 'The infrastructure deficit is not a problem — it\'s an opportunity. Every road, power plant, and data center that doesn\'t exist yet represents a first-mover advantage for those who build it.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <h3 className="text-lg font-bold text-[#000000] mb-3">{item.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#6B7280] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Competitive Edge</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#000000] tracking-[-0.01em] mb-16">
              Why Harch Wins
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((adv, i) => (
              <FadeIn key={adv.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-bold text-[rgba(0,0,0,0.2)]">0{i + 1}</span>
                    <h3 className="text-lg font-bold text-[#000000]">{adv.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#6B7280] leading-[1.7]">{adv.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Ready to Build?</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">The strategy is clear. The opportunity is massive. The only question is whether you&apos;re part of it.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/investors" className="inline-flex items-center gap-2.5 bg-[#000000] text-white px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:border-white/30 transition-all">Investment Details <ArrowRight size={14} /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">Contact Us</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
