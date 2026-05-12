'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Shield } from 'lucide-react';
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

export default function InvestorsPageClient() {
  return (
    <div className="bg-[#0C0F1A]">
      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-[#0C0F1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(184,150,90,0.06)] border border-[rgba(184,150,90,0.15)] rounded">
                <Lock size={10} className="text-[#B8965A]" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#B8965A]">Restricted</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-8">
              Investor Relations
            </h1>
            <div className="accent-line mb-8" />
            <p className="text-[18px] md:text-[20px] text-[#8B9DAF] leading-[1.7] max-w-2xl">
              Harch Corp is a privately held sovereign infrastructure company. We are not currently raising public capital.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="py-20 md:py-28 bg-[#0C0F1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="border-l-2 border-[rgba(184,150,90,0.3)] pl-8 md:pl-12 mb-16">
              <p className="text-[20px] md:text-[24px] text-white leading-[1.6] font-light">
                Institutional investors may request a briefing.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 max-w-2xl">
              <p className="text-[15px] text-[#999999] leading-[1.8]">
                Harch Corp operates across eight verticals — intelligence, cement, energy, technology, mining, agriculture, water, and finance — with a combined investment pipeline exceeding $2.4 billion. Our vertically integrated model creates structural cost advantages that compound over time.
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.8]">
                We engage selectively with institutional partners who share our thesis: that Africa&apos;s industrial sovereignty is the defining opportunity of this decade. We do not pursue retail capital. We do not advertise returns. We build infrastructure.
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.8]">
                If your institution has the mandate and the patience to invest in sovereign infrastructure at scale, we will make time for a conversation.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY FIGURES ═══ */}
      <section className="py-20 md:py-28 bg-[#0A0D17]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] mb-10">Selected Figures</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '$2.4B+', label: 'Investment Pipeline' },
              { value: '8', label: 'Verticals' },
              { value: '5', label: 'Countries' },
              { value: '20-25%', label: 'Weighted IRR' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none mb-2">{stat.value}</p>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666]">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28 bg-[#0C0F1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="card p-8 md:p-12 border-[rgba(184,150,90,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <Shield size={16} className="text-[#B8965A]" strokeWidth={1.5} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#B8965A]">Institutional Briefing</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Request a Briefing</h3>
              <p className="text-[14px] text-[#999999] leading-[1.7] mb-8 max-w-lg">
                All investor inquiries are processed through our secure intake system. Provide your institutional details and our IR team will respond within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#B8965A] text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#C9A84C] transition-all"
                >
                  Request Briefing <ArrowRight size={14} />
                </Link>
                <span className="text-[11px] text-[#666666] flex items-center gap-2 py-4">
                  <Lock size={10} /> Encrypted channel
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
