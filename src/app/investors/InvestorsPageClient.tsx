'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Download, Calendar, Mail, TrendingUp, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

const financialHighlights = [
  { label: 'Investment Pipeline', value: '$2.4B+' },
  { label: 'Projected IRR', value: '18-24%' },
  { label: 'Revenue Target 2030', value: '$800M+' },
  { label: 'Asset Backing', value: 'Real Infrastructure' },
];

const documents = [
  { name: 'Corporate White Paper', type: 'PDF', size: '4.2 MB' },
  { name: 'Investment Pitch Deck', type: 'PDF', size: '8.7 MB' },
  { name: 'Financial Projections 2026-2030', type: 'XLSX', size: '1.3 MB' },
  { name: 'ESG Impact Report', type: 'PDF', size: '3.1 MB' },
];

const calendar = [
  { date: 'Q2 2026', event: 'Harch Intelligence Phase 1 Financial Close' },
  { date: 'Q3 2026', event: 'Annual Investor Day — Casablanca' },
  { date: 'Q4 2026', event: 'Harch Energy First Solar Farm Commissioning' },
  { date: 'Q1 2027', event: 'Harch Ciment Construction Milestone Update' },
];

export default function InvestorsPageClient() {
  return (
    <>
      <PageHero
        title="Investor Relations"
        subtitle="Partner in Africa's industrial transformation"
      />

      {/* Investment Thesis */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Investment Thesis
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-6">
              <p className="text-harch-muted leading-relaxed text-lg">
                Africa represents the last great frontier for industrial-scale infrastructure investment.
                With a population of 1.4 billion projected to reach 2.5 billion by 2050, the continent
                faces an infrastructure deficit measured in trillions — and Harch Corp is positioned to
                capture a significant share of that demand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                  <TrendingUp className="w-5 h-5 text-harch-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-harch-text">High Growth</h3>
                    <p className="text-xs text-harch-muted mt-1">6 of the world&apos;s 10 fastest-growing economies are in Africa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                  <Shield className="w-5 h-5 text-harch-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-harch-text">Asset-Backed</h3>
                    <p className="text-xs text-harch-muted mt-1">Every investment secured by real, revenue-generating infrastructure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                  <Globe className="w-5 h-5 text-harch-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-harch-text">Strategic Position</h3>
                    <p className="text-xs text-harch-muted mt-1">Morocco as gateway between African supply and European demand.</p>
                  </div>
                </div>
              </div>
              <p className="text-harch-muted leading-relaxed">
                Harch Corp&apos;s vertically integrated model reduces risk through diversification while
                maximizing value capture across the supply chain. Our government partnerships provide
                concessional terms and regulatory certainty, while our renewable energy advantage
                ensures among the lowest operating costs globally.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="py-16 bg-[#070B14] border-y border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.1}>
                <div className="text-center p-6 rounded-xl border border-harch-border bg-[#0A0E18]">
                  <p className="text-2xl sm:text-3xl font-bold gradient-text-gold">{item.value}</p>
                  <p className="mt-2 text-xs text-harch-muted uppercase tracking-wider">{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 lg:py-28 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Documents
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 space-y-3">
            {documents.map((doc, index) => (
              <FadeIn key={doc.name} delay={index * 0.08}>
                <div className="flex items-center justify-between p-4 rounded-lg border border-harch-border bg-[#0A0E18] card-glow">
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-harch-gold" />
                    <div>
                      <p className="text-sm font-medium text-harch-text">{doc.name}</p>
                      <p className="text-xs text-harch-muted">{doc.type} &middot; {doc.size}</p>
                    </div>
                  </div>
                  <button className="text-xs uppercase tracking-wider text-harch-gold hover:text-harch-gold/80 transition-colors">
                    Download
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Calendar */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-harch-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
                Financial Calendar
              </h2>
            </div>
            <div className="w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 space-y-4">
            {calendar.map((event, index) => (
              <FadeIn key={event.event} delay={index * 0.08}>
                <div className="flex items-start gap-4 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                  <span className="text-sm font-bold text-harch-gold tracking-wider shrink-0 w-20">{event.date}</span>
                  <p className="text-sm text-harch-text">{event.event}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Contact */}
      <section className="py-20 bg-[#05080F] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Contact Investor Relations
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-xl mx-auto">
              For investment inquiries, data room access, or to schedule a meeting with our
              investor relations team.
            </p>
            <a
              href="mailto:ir@harchcorp.com"
              className="inline-flex items-center gap-2 mt-6 text-harch-gold hover:text-harch-gold/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              ir@harchcorp.com
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
            >
              General Contact
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
