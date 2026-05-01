'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Shield, Link2, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Shield,
    title: 'Sovereignty',
    description: 'Every Harch Corp vertical is designed to reduce external dependency and build indigenous capability. From sovereign AI compute to strategic mineral reserves, we ensure that Africa controls its own critical infrastructure.',
    points: [
      'Sovereign AI infrastructure — data stays in Africa, processed in Africa',
      'Strategic mineral reserves under African control',
      'Food and water security through domestic production capacity',
      'Technology platforms designed and maintained locally',
    ],
  },
  {
    icon: Link2,
    title: 'Integration',
    description: 'Our seven verticals are not isolated businesses — they form a self-reinforcing industrial ecosystem. Renewable energy powers data centers and desalination plants. Mining feeds technology manufacturing. Agriculture benefits from IoT and water infrastructure.',
    points: [
      'Cross-divisional energy sharing and optimization',
      'Technology platforms serving all verticals',
      'Shared logistics and distribution networks',
      'Integrated supply chains from raw materials to end products',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Scale',
    description: 'We do not pursue small opportunities. Every Harch Corp investment targets market-leading positions with transformative scale — 500MW data centers, 2GW+ energy portfolios, 50,000+ hectare agricultural operations.',
    points: [
      'Market-leading positions in every vertical',
      'Pan-African expansion across 5+ countries by 2026',
      '$2.4B+ investment pipeline with clear path to deployment',
      '3,200+ direct jobs and 10,000+ indirect employment target',
    ],
  },
];

const roadmap = [
  {
    year: '2026',
    title: 'Foundation Year',
    items: [
      'Harch Intelligence Phase 1 commissioning (100MW)',
      'Harch Energy first solar farm grid connection',
      'Harch Ciment construction begins in Gambia',
      'Harch Technology AI platform beta launch',
    ],
  },
  {
    year: '2027',
    title: 'Acceleration',
    items: [
      'Intelligence campus expansion to 300MW',
      'Mining operations commence at first concession',
      'Water desalination pilot facility operational',
      'Agri division scales to 20,000 hectares',
    ],
  },
  {
    year: '2028',
    title: 'Integration',
    items: [
      'Full vertical integration between Energy and Intelligence',
      'Technology platform deployed across all divisions',
      'Cement facility reaches full production capacity',
      'Second mining concession development begins',
    ],
  },
  {
    year: '2030',
    title: 'Pan-African Leadership',
    items: [
      '500MW data center campus fully operational',
      '2GW+ renewable energy portfolio online',
      'Operations spanning 10+ countries',
      'Target: $5B+ in aggregate asset value',
    ],
  },
];

export default function StrategyPageClient() {
  return (
    <>
      <PageHero
        title="Strategic Vision"
        subtitle="Three pillars driving Africa's industrial sovereignty"
      />

      {/* Three Pillars */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
                Three Pillars
              </h2>
              <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            </div>
          </FadeIn>

          <div className="space-y-16">
            {pillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <pillar.icon className="w-7 h-7 text-harch-gold" />
                      <h3 className="text-2xl font-bold text-harch-text uppercase">{pillar.title}</h3>
                    </div>
                    <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                    <p className="text-harch-muted leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="space-y-3">
                    {pillar.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                        <div className="w-1.5 h-1.5 rounded-full bg-harch-gold mt-2 shrink-0" />
                        <p className="text-sm text-harch-text">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2030 Roadmap */}
      <section className="py-20 lg:py-32 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
                2030 Roadmap
              </h2>
              <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-harch-border lg:-translate-x-px" />
            <div className="space-y-12">
              {roadmap.map((phase, index) => (
                <FadeIn key={phase.year} delay={index * 0.12}>
                  <div className="relative flex items-start gap-8">
                    <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-harch-gold rounded-full -translate-x-1.5 mt-2 z-10" />
                    <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pr-16">
                      <span className="text-sm font-bold text-harch-gold tracking-wider">{phase.year}</span>
                      <h3 className="mt-1 text-xl font-semibold text-harch-text">{phase.title}</h3>
                      <ul className="mt-3 space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-harch-muted">
                            <div className="w-1 h-1 rounded-full bg-harch-gold mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 lg:py-28 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Competitive Advantages
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'First-Mover Position', desc: 'Pioneer in sovereign AI infrastructure and integrated industrial ecosystems in Africa.' },
                { title: 'Government Partnerships', desc: 'Strategic alliances with national governments ensuring concessional terms and regulatory support.' },
                { title: 'Renewable Energy Advantage', desc: 'Access to world-class solar and wind resources at among the lowest generation costs globally.' },
                { title: 'Geographic Positioning', desc: 'Morocco\'s proximity to Europe enables sub-100ms latency for data services and export market access.' },
                { title: 'Vertical Integration', desc: 'Self-reinforcing ecosystem where each division creates value for the others.' },
                { title: 'Talent Pipeline', desc: 'Access to Africa\'s fastest-growing engineering and technical talent pool.' },
              ].map((adv, index) => (
                <div key={adv.title} className="p-5 rounded-xl border border-harch-border bg-[#0A0E18] card-glow">
                  <h3 className="font-semibold text-harch-text text-sm">{adv.title}</h3>
                  <p className="mt-2 text-xs text-harch-muted leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Partner With Us
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-2xl mx-auto">
              Harch Corp&apos;s strategic vision is backed by a $2.4B+ investment pipeline and a team
              committed to building Africa&apos;s industrial future. We welcome strategic partners who
              share our conviction.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/investors"
                className="group flex items-center gap-2 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
              >
                Investor Relations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 border border-harch-gold/30 text-harch-gold text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:border-harch-gold/60 hover:bg-harch-gold/5 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
