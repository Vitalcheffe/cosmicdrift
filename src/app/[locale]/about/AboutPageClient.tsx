'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ArrowRight, Building2, Target, Shield, Zap, Users, Globe, Award } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { WorldMap } from '@/components/WorldMap';
import ImmersiveHero from '@/components/ImmersiveHero';

const LiveDashboard = dynamic(
  () => import('@/components/LiveDashboard'),
  { ssr: false, loading: () => <div className="h-[200px] bg-[#1A1A1A] animate-pulse rounded-lg" /> }
);

export default function AboutPageClient() {
  const t = useTranslations('about');

  const aboutMetrics = [
    { label: t('metrics.investmentPipeline'), value: 2400, unit: '$M', trend: 'up' as const, sparkline: [1800, 2000, 2100, 2300, 2350, 2400] },
    { label: t('metrics.verticals'), value: 8, trend: 'stable' as const },
    { label: t('metrics.countries'), value: 5, trend: 'up' as const, sparkline: [3, 4, 4, 5, 5, 5] },
    { label: t('metrics.jobsTarget'), value: 25000, unit: '+', trend: 'up' as const, sparkline: [10000, 14000, 18000, 21000, 24000, 25000] },
  ];

  const values = [
    { key: 'sovereignty', icon: Shield, title: t('values.sovereignty.title'), desc: t('values.sovereignty.description') },
    { key: 'speed', icon: Zap, title: t('values.speed.title'), desc: t('values.speed.description') },
    { key: 'integration', icon: Target, title: t('values.integration.title'), desc: t('values.integration.description') },
    { key: 'excellence', icon: Award, title: t('values.excellence.title'), desc: t('values.excellence.description') },
  ];

  const leadership = [
    { name: 'Amine Harch El Korane', title: t('leadership.ceo.title'), desc: t('leadership.ceo.description'), image: '/images/team/ceo.jpg' },
    { name: 'Fatima Zahra El Mansouri', title: t('leadership.coo.title'), desc: t('leadership.coo.description'), image: '/images/team/coo.jpg' },
    { name: 'Karim Benjelloun', title: t('leadership.cto.title'), desc: t('leadership.cto.description'), image: '/images/team/cto.jpg' },
    { name: 'Aisha Diop', title: t('leadership.cfo.title'), desc: t('leadership.cfo.description'), image: '/images/team/cfo.jpg' },
  ];

  const history = [
    { year: '2023', title: t('history.milestones.2023.title'), desc: t('history.milestones.2023.description') },
    { year: '2024', title: t('history.milestones.2024.title'), desc: t('history.milestones.2024.description') },
    { year: '2025', title: t('history.milestones.2025.title'), desc: t('history.milestones.2025.description') },
    { year: '2026', title: t('history.milestones.2026.title'), desc: t('history.milestones.2026.description') },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      {/* Immersive Hero */}
      <ImmersiveHero
        title={t('heroTitle')}
        subtitle={t('subtitle')}
        version="/0.0"
        metaLabel={t('metaLabel')}
      />

      {/* Live Dashboard */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <LiveDashboard metrics={aboutMetrics} title={t('dashboardTitle')} />
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">{t('mission.title')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                {t('mission.headline')}
              </h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                  {t('mission.paragraph1')}
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                {t('mission.paragraph2')}
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7]">
                {t('mission.paragraph3')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#1E1E1E]">
                <Image src="/images/hero-bg.jpg" alt={t('operationsImageAlt')} fill className="object-cover industrial-image" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('values.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('values.headline')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.key} delay={i * 0.08}>
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
            <p className="section-label mb-4">{t('leadership.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('leadership.headline')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.08}>
                <div className="card overflow-hidden h-full">
                  <div className="relative w-full aspect-[4/3] bg-[#1E1E1E] overflow-hidden">
                    <Image src={person.image} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                    <p className="text-[12px] font-semibold text-[#8B9DAF] uppercase tracking-[0.1em] mb-4">{person.title}</p>
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
            <p className="section-label mb-4">{t('history.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('history.headline')}
            </h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-10">
              {history.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#1a7898] border-2 border-[#1a7898] mt-1.5" />
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
              <p className="section-label mb-4">{t('globalPresence.label')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em]">
                {t('globalPresence.headline')}
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
            <p className="section-label mb-4">{t('partners.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('partners.headline')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('partners.description')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {name: t('partners.kingdomOfMorocco'), type: t('partners.government')},
              {name: t('partners.republicOfGambia'), type: t('partners.government')},
              {name: t('partners.africaInfrastructurePartners'), type: t('partners.privateEquity')},
              {name: t('partners.strategicInvestmentPartners'), type: t('partners.investment')},
              {name: t('partners.europeanInvestmentBank'), type: t('partners.developmentFinance')},
              {name: t('partners.africanDevelopmentBank'), type: t('partners.multilateral')},
              {name: t('partners.masen'), type: t('partners.energy')},
              {name: t('partners.ocpGroup'), type: t('partners.mining')},
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
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">{t('cta.title')}</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">{t('cta.subtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all"><ArrowRight size={14} />{t('cta.primary')}</Link>
              <Link href="/careers" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">{t('cta.secondary')}</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
