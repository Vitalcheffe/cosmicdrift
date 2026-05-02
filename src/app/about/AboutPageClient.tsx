'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Target, Shield, Zap, Users, Globe, Award, User } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { WorldMap } from '@/components/WorldMap';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const values = [
  { icon: Shield, title: 'Sovereignty', desc: 'We build infrastructure that Africa owns, operates, and controls. No dependency, no extraction — just self-reliance.' },
  { icon: Zap, title: 'Speed', desc: 'The continent cannot afford to wait. We move with urgency, executing projects with precision and pace that matches the scale of the opportunity.' },
  { icon: Target, title: 'Integration', desc: 'Vertically integrated from raw materials to finished infrastructure. We control every link in the chain for structural cost advantages.' },
  { icon: Award, title: 'Excellence', desc: 'World-class engineering, governance, and execution. International certifications across all verticals. We accept nothing less than the best.' },
];

const leadership = [
  { name: 'Amine Harch El Korane', title: 'Founder & CEO', desc: 'Serial entrepreneur with 15+ years in African industrial development. Founded Harch Corp to build the infrastructure the continent deserves — from 500MW AI data centers to 2GW renewable energy pipelines across 7 verticals and 5 countries. Leading a $2.4B+ investment pipeline to convert Africa\'s potential into industrial power.' },
];

const history = [
  { year: '2023', title: 'Vision Conceived', desc: 'Amine Harch El Korane identifies the gap between Africa\'s resource wealth and its industrial capacity. The vision for Harch Corp is born.' },
  { year: '2024', title: 'Foundation', desc: 'Harch Corp S.A. registered in Casablanca with 100M MAD capital. Core team assembled across 4 countries.' },
  { year: '2025', title: 'Engineering Phase', desc: 'Dakhla data center engineering begins. Gambia cement plant permits secured. Energy pipeline reaches 2GW.' },
  { year: '2026', title: 'Active Deployment', desc: 'First projects break ground. $2.4B pipeline activated. 7 verticals operational with 3,200+ jobs created.' },
];

export default function AboutPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">About Harch Corp</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Building Africa&apos;s<br />Industrial Backbone
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Harch Corp is a Moroccan multi-sector industrial conglomerate building the critical infrastructure that enables Africa&apos;s self-reliance. From 500MW AI data centers to 2GW renewable energy, we convert the continent&apos;s potential into industrial power.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">Our Mission</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                Convert Potential<br />Into Power
              </h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                Africa holds 30% of the world&apos;s mineral reserves, 60% of its uncultivated arable land, and the youngest population on Earth. Yet the continent has historically captured only a fraction of this value.
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                Harch Corp exists to change this equation. We build the industrial infrastructure — from AI compute to water security — that enables Africa to own its future. Not through aid or extraction, but through sovereign, vertically integrated industrial development.
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7]">
                Our model is simple but radical: we own the entire value chain. From the energy that powers our operations to the technology that optimizes them, every link is under our control. This creates structural cost advantages of 30-50% and ensures that value stays on the continent.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#1E1E1E]">
                <Image src="/images/hero-bg.jpg" alt="Harch Corp Operations" fill className="object-cover industrial-image" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Our Values</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              What We Stand For
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-4">
                    <v.icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Leadership</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              The Team
            </h2>
          </FadeIn>
          <div className="max-w-xl mx-auto">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.08}>
                <div className="card overflow-hidden h-full">
                  <div className="relative w-full aspect-[3/4] bg-[#1E1E1E] flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <User size={56} className="text-[rgba(255,255,255,0.2)]" strokeWidth={1} />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                    <p className="text-[12px] font-semibold text-white uppercase tracking-[0.1em] mb-4">{person.title}</p>
                    <div className="accent-line mb-4" />
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{person.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* History/Timeline */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Our Journey</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              From Vision to Reality
            </h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-10">
              {history.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#000000] border-2 border-[#000000] mt-1.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">{item.year}</span>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-1">{item.title}</h3>
                      <p className="text-[13px] text-[#999999] leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Map */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="section-label mb-4">Global Presence</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em]">
                Operating Across Africa
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <WorldMap />
          </FadeIn>
        </div>
      </section>

      {/* Partners */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Strategic Partners</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
              Building Together
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              We partner with governments, sovereign wealth funds, and industrial leaders who share our vision for African sovereignty.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Kingdom of Morocco', type: 'Government' },
              { name: 'Republic of Gambia', type: 'Government' },
              { name: 'Africa Infrastructure Partners', type: 'Private Equity' },
              { name: 'Sovereign Wealth Fund', type: 'Investment' },
              { name: 'European Investment Bank', type: 'Development Finance' },
              { name: 'African Development Bank', type: 'Multilateral' },
              { name: 'MASEN', type: 'Energy' },
              { name: 'OCP Group', type: 'Mining' },
            ].map((partner, i) => (
              <FadeIn key={partner.name} delay={i * 0.05}>
                <div className="card p-5 text-center h-full flex flex-col items-center justify-center">
                  <Building2 size={20} className="text-[rgba(255,255,255,0.15)] mb-3" strokeWidth={1.5} />
                  <p className="text-[13px] font-semibold text-white">{partner.name}</p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] mt-1">{partner.type}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Join the Mission</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">Whether as an investor, partner, or team member — help us build Africa&apos;s industrial backbone.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all"><ArrowRight size={14} />Get Started</Link>
              <Link href="/careers" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">View Careers</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
