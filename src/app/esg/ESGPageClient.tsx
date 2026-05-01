'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Leaf, Users, Building2, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const environmentalCommitments = [
  {
    title: 'Carbon Negative by 2030',
    description: 'Our renewable energy portfolio will generate more clean energy than all Harch Corp operations consume, making us carbon negative across our entire value chain.',
  },
  {
    title: '100% Renewable Operations',
    description: 'Every Harch Corp facility — from data centers to cement plants — will be powered by renewable energy sources, primarily solar and wind.',
  },
  {
    title: 'Zero Liquid Discharge',
    description: 'All water treatment facilities will implement zero liquid discharge technology, ensuring no contaminated water returns to the environment.',
  },
  {
    title: 'Sustainable Mining Practices',
    description: 'Mining operations follow strict environmental rehabilitation protocols, with concurrent land restoration and biodiversity preservation programs.',
  },
];

const socialMetrics = [
  { label: 'Direct Jobs Created', value: '3,200+' },
  { label: 'Indirect Employment', value: '10,000+' },
  { label: 'Community Investment', value: '$50M+' },
  { label: 'Training Programs', value: '15+' },
  { label: 'Local Procurement Target', value: '60%+' },
  { label: 'Women in Workforce', value: '35%+' },
];

const governancePoints = [
  'Independent board of directors with majority non-executive members',
  'Separate Chair and CEO roles for clear governance accountability',
  'Dedicated ESG Committee at board level with quarterly reporting',
  'Transparent anti-corruption and ethics policies aligned with UN Global Compact',
  'External audit by Big Four firm with annual public reporting',
  'Data Protection Officer ensuring GDPR/CNDP compliance',
  'Whistleblower protection program with anonymous reporting channel',
  'Executive compensation tied to ESG performance metrics',
];

const sustainabilityTargets = [
  { target: '2GW+', description: 'Renewable energy capacity by 2030' },
  { target: 'Net Zero', description: 'Scope 1 & 2 emissions by 2028' },
  { target: 'Carbon Negative', description: 'Full value chain by 2030' },
  { target: '95%', description: 'Water recycling rate across operations' },
  { target: '100%', description: 'Renewable energy powering all facilities' },
  { target: 'Zero', description: 'Waste to landfill target by 2029' },
];

export default function ESGPageClient() {
  return (
    <>
      <PageHero
        title="Environmental, Social & Governance"
        subtitle="Building sustainably for Africa's future"
      />

      {/* Environmental */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-6 h-6 text-harch-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
                Environmental Commitments
              </h2>
            </div>
            <div className="w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {environmentalCommitments.map((commitment, index) => (
              <FadeIn key={commitment.title} delay={index * 0.1}>
                <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow h-full">
                  <h3 className="text-base font-semibold text-harch-text mb-2">{commitment.title}</h3>
                  <p className="text-sm text-harch-muted leading-relaxed">{commitment.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-y border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-harch-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
                Social Impact
              </h2>
            </div>
            <div className="w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialMetrics.map((metric, index) => (
              <FadeIn key={metric.label} delay={index * 0.08}>
                <div className="text-center p-4 rounded-xl border border-harch-border bg-[#0A0E18]">
                  <p className="text-xl sm:text-2xl font-bold gradient-text-gold">{metric.value}</p>
                  <p className="mt-1 text-xs text-harch-muted uppercase tracking-wider">{metric.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="mt-8 text-harch-muted leading-relaxed max-w-3xl">
              Harch Corp is committed to creating shared value in every community where we operate.
              Our social investment programs focus on education, healthcare access, vocational training,
              and local economic development. We prioritize local hiring and procurement, ensuring that
              the wealth generated by our operations directly benefits the communities that host them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-harch-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
                Governance
              </h2>
            </div>
            <div className="w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-3">
              {governancePoints.map((point) => (
                <div key={point} className="flex items-start gap-3 p-3 rounded-lg border border-harch-border bg-[#0A0E18]">
                  <div className="w-1.5 h-1.5 rounded-full bg-harch-gold mt-2 shrink-0" />
                  <p className="text-sm text-harch-muted">{point}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sustainability Targets */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-harch-gold" />
              <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
                Sustainability Targets
              </h2>
            </div>
            <div className="w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {sustainabilityTargets.map((item, index) => (
              <FadeIn key={item.target} delay={index * 0.08}>
                <div className="text-center p-5 rounded-xl border border-harch-border bg-[#0A0E18] card-glow">
                  <p className="text-2xl font-bold gradient-text-gold">{item.target}</p>
                  <p className="mt-2 text-xs text-harch-muted">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#05080F] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Read Our Full ESG Report
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-xl mx-auto">
              Our comprehensive ESG report details our commitments, progress, and targets across
              environmental stewardship, social impact, and governance excellence.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/investors"
              className="group inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
            >
              Download ESG Report
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
