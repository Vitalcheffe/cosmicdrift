'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Target, TrendingUp, Shield, Zap, Globe, Building2, Layers, Cpu, Droplets, Wheat, Mountain, Factory } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import ImmersiveHero from '@/components/ImmersiveHero';
import { InvestmentPipelineChart } from '@/components/charts/InvestmentPipelineChart';
import { EnergyMixChart } from '@/components/charts/EnergyMixChart';
import { useTranslations } from 'next-intl';

const NetworkOntology = dynamic(
  () => import('@/components/NetworkOntology'),
  { ssr: false, loading: () => <div className="h-[400px] bg-[#1A1A1A] animate-pulse rounded-lg" /> }
);

export default function StrategyPageClient() {
  const t = useTranslations('strategy');

  const verticalsDeep = [
    { icon: Cpu, name: t('verticalsDeep.intelligence.name'), version: '/0.1', investment: '$800M', desc: t('verticalsDeep.intelligence.desc'), keyPoints: [t('verticalsDeep.intelligence.keyPoints.0'), t('verticalsDeep.intelligence.keyPoints.1'), t('verticalsDeep.intelligence.keyPoints.2'), t('verticalsDeep.intelligence.keyPoints.3')], href: '/subsidiaries/intelligence' },
    { icon: Factory, name: t('verticalsDeep.cement.name'), version: '/0.2', investment: '$200M', desc: t('verticalsDeep.cement.desc'), keyPoints: [t('verticalsDeep.cement.keyPoints.0'), t('verticalsDeep.cement.keyPoints.1'), t('verticalsDeep.cement.keyPoints.2'), t('verticalsDeep.cement.keyPoints.3')], href: '/subsidiaries/cement' },
    { icon: Zap, name: t('verticalsDeep.energy.name'), version: '/0.3', investment: '$600M', desc: t('verticalsDeep.energy.desc'), keyPoints: [t('verticalsDeep.energy.keyPoints.0'), t('verticalsDeep.energy.keyPoints.1'), t('verticalsDeep.energy.keyPoints.2'), t('verticalsDeep.energy.keyPoints.3')], href: '/subsidiaries/energy' },
    { icon: Shield, name: t('verticalsDeep.technology.name'), version: '/0.4', investment: '$400M', desc: t('verticalsDeep.technology.desc'), keyPoints: [t('verticalsDeep.technology.keyPoints.0'), t('verticalsDeep.technology.keyPoints.1'), t('verticalsDeep.technology.keyPoints.2'), t('verticalsDeep.technology.keyPoints.3')], href: '/subsidiaries/technology' },
    { icon: Mountain, name: t('verticalsDeep.mining.name'), version: '/0.5', investment: '$200M', desc: t('verticalsDeep.mining.desc'), keyPoints: [t('verticalsDeep.mining.keyPoints.0'), t('verticalsDeep.mining.keyPoints.1'), t('verticalsDeep.mining.keyPoints.2'), t('verticalsDeep.mining.keyPoints.3')], href: '/subsidiaries/mining' },
    { icon: Wheat, name: t('verticalsDeep.agri.name'), version: '/0.6', investment: '$150M', desc: t('verticalsDeep.agri.desc'), keyPoints: [t('verticalsDeep.agri.keyPoints.0'), t('verticalsDeep.agri.keyPoints.1'), t('verticalsDeep.agri.keyPoints.2'), t('verticalsDeep.agri.keyPoints.3')], href: '/subsidiaries/agriculture' },
    { icon: Droplets, name: t('verticalsDeep.water.name'), version: '/0.7', investment: '$150M', desc: t('verticalsDeep.water.desc'), keyPoints: [t('verticalsDeep.water.keyPoints.0'), t('verticalsDeep.water.keyPoints.1'), t('verticalsDeep.water.keyPoints.2'), t('verticalsDeep.water.keyPoints.3')], href: '/subsidiaries/water' },
  ];

  const advantages = [
    { title: t('pillars.verticalIntegration.title'), desc: t('pillars.verticalIntegration.description') },
    { title: t('advantages.carbonFirst.title'), desc: t('advantages.carbonFirst.description') },
    { title: t('pillars.sovereignByDesign.title'), desc: t('pillars.sovereignByDesign.description') },
    { title: t('pillars.continentalScale.title'), desc: t('pillars.continentalScale.description') },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      {/* Immersive Hero */}
      <ImmersiveHero
        title={t('hero.title')}
        subtitle={t('title')}
        version="/0.0"
        metaLabel={t('hero.metaLabel')}
      />

      {/* Network Ontology — Vertical Integration Model */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <NetworkOntology />
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">{t('subtitle')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                {t('description')}
              </h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                {t('pillars.verticalIntegration.description')}
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                {t('pillars.sovereignByDesign.description')}
              </p>
              <p className="text-[15px] text-[#999999] leading-[1.7]">
                {t('pillars.continentalScale.description')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '$2.4B+', label: t('stats.investmentPipeline') },
                  { value: '7', label: t('stats.verticals') },
                  { value: '5', label: t('stats.countries') },
                  { value: '3,200+', label: t('stats.jobsBy2028') },
                ].map((stat) => (
                  <div key={stat.label} className="card p-6 text-center">
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7 Verticals Deep Dive */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('pillars.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('subtitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('description')}
            </p>
          </FadeIn>

          <div className="space-y-6">
            {verticalsDeep.map((v, i) => (
              <FadeIn key={v.version} delay={i * 0.05}>
                <Link href={v.href} className="vertical-row group block p-6 md:p-8 cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                        <v.icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#CCCCCC] transition-colors">{v.name}</h3>
                          <span className="version-tag">{v.version}</span>
                        </div>
                        <p className="text-[12px] font-semibold text-white">{v.investment}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-[#999999] leading-relaxed mb-4">{v.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.keyPoints.map((point) => (
                          <span key={point} className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">{point}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={16} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all shrink-0 mt-2" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('markets.title')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: t('investmentThesis.demographicDividend.title'), desc: t('investmentThesis.demographicDividend.description') },
              { title: t('investmentThesis.resourceSupremacy.title'), desc: t('investmentThesis.resourceSupremacy.description') },
              { title: t('investmentThesis.infrastructureGap.title'), desc: t('investmentThesis.infrastructureGap.description') },
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

      {/* Capital Deployment Visualization */}
      <section className="py-20 md:py-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('markets.description')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-12">
              {t('timeline.title')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <InvestmentPipelineChart />
            </FadeIn>
            <FadeIn delay={0.2}>
              <EnergyMixChart />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('pillars.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('timeline.description')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((adv, i) => (
              <FadeIn key={adv.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-bold text-[rgba(255,255,255,0.2)]">0{i + 1}</span>
                    <h3 className="text-lg font-bold text-white">{adv.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{adv.desc}</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">{t('markets.title')}</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">{t('markets.description')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/investors" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">{t('title')} <ArrowRight size={14} /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">{t('subtitle')}</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
