'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { InvestmentPipelineChart } from '@/components/charts/InvestmentPipelineChart';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { OperationalMetricsChart } from '@/components/charts/OperationalMetricsChart';

export default function InvestorsPageClient() {
  return (
    <div className="bg-surface-4">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-surface-4">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6">Investor Relations</p>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-8">
              Investor Relations
            </h1>
            <div className="accent-line mb-8" />
            <p className="text-[18px] md:text-[20px] text-txt-secondary leading-[1.7] max-w-2xl">
              Harch Corp is a privately held sovereign infrastructure company. We are not currently raising public capital.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Statement — Pattern 4: Impact Study divider */}
      <section className="py-20 md:py-28 bg-surface-2">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="border-l-2 border-[rgba(139,157,175,0.3)] pl-8 md:pl-12 mb-8 pb-8 border-b border-[rgba(255,255,255,0.04)]">
              <p className="text-[20px] md:text-[24px] text-white leading-[1.6] font-light">
                Institutional investors may request a briefing.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 max-w-2xl mt-8">
              <p className="text-[15px] text-txt-secondary leading-[1.8]">
                Harch Corp operates across eight verticals — intelligence, cement, energy, technology, mining, agriculture, water, and finance — with a combined investment pipeline exceeding $2.4 billion. Our vertically integrated model creates structural cost advantages that compound over time.
              </p>
              <p className="text-[15px] text-txt-secondary leading-[1.8]">
                We engage selectively with institutional partners who share our thesis: that Africa&apos;s industrial sovereignty is the defining opportunity of this decade. We do not pursue retail capital. We do not advertise returns. We build infrastructure.
              </p>
              <p className="text-[15px] text-txt-secondary leading-[1.8]">
                If your institution has the mandate and the patience to invest in sovereign infrastructure at scale, we will make time for a conversation.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Figures — Pattern 6: Large Stat Display */}
      <section className="py-20 md:py-28 bg-surface-4">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-12">Selected Figures</p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            {[
              { value: '$2.4B+', label: 'Investment Pipeline' },
              { value: '8', label: 'Verticals' },
              { value: '5', label: 'Countries' },
              { value: '20-25%', label: 'Weighted IRR' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="pb-8 border-b border-[rgba(255,255,255,0.04)]">
                  <p className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-none mb-4 stat-mono">{stat.value}</p>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-txt-dim">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Pipeline Visualization */}
      <section className="py-20 md:py-28 bg-surface-2">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Capital Allocation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">
              Investment by Vertical
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.15}>
              <InvestmentPipelineChart />
            </FadeIn>
            <FadeIn delay={0.25}>
              <RevenueChart />
            </FadeIn>
          </div>
          <div className="mt-6">
            <FadeIn delay={0.35}>
              <OperationalMetricsChart />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA — Pattern 7: "There is so much left to build" style */}
      <section className="py-28 md:py-36 bg-surface-1 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-white tracking-tight mb-12 leading-tight">
              Ready to Build Sovereign Infrastructure?
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all"
              >
                Request Briefing <ArrowRight size={14} />
              </Link>
              <Link
                href="/trust/security"
                className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all"
              >
                View Trust Center
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
