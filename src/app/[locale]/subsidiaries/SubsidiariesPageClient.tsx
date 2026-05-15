'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ArrowRight, Server, Zap, Factory, Mountain, Wheat, Droplets, Cpu, Landmark } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, Card3D, SectionDivider } from '@/components/ui/motion';
import ImmersiveHero from '@/components/ImmersiveHero';
import { PortfolioDistributionChart } from '@/components/charts/PortfolioDistributionChart';
import { InvestmentPipelineChart } from '@/components/charts/InvestmentPipelineChart';
import { OperationalMetricsChart } from '@/components/charts/OperationalMetricsChart';

const NetworkOntology = dynamic(
  () => import('@/components/NetworkOntology'),
  { ssr: false, loading: () => <div className="h-[400px] bg-[#1A1A1A] animate-pulse rounded-lg" /> }
);

export default function SubsidiariesPageClient() {
  const t = useTranslations('subsidiaries');

  const subsidiaries = [
    {
      name: t('intelligence.name'),
      slug: 'intelligence',
      version: '/0.1',
      desc: t('intelligence.desc'),
      stat: t('intelligence.stat'),
      icon: Server,
      accent: '#8B9DAF',
      image: '/images/sections/intelligence-exterior.jpg',
    },
    {
      name: t('cement.name'),
      slug: 'cement',
      version: '/0.2',
      desc: t('cement.desc'),
      stat: t('cement.stat'),
      icon: Factory,
      accent: '#8B9DAF',
      image: '/images/sections/cement-factory.jpg',
    },
    {
      name: t('energy.name'),
      slug: 'energy',
      version: '/0.3',
      desc: t('energy.desc'),
      stat: t('energy.stat'),
      icon: Zap,
      accent: '#6B9F6B',
      image: '/images/sections/energy-solar-farm.jpg',
    },
    {
      name: t('technology.name'),
      slug: 'technology',
      version: '/0.4',
      desc: t('technology.desc'),
      stat: t('technology.stat'),
      icon: Cpu,
      accent: '#7888A8',
      image: '/images/sections/tech-ground-station.jpg',
    },
    {
      name: t('mining.name'),
      slug: 'mining',
      version: '/0.5',
      desc: t('mining.desc'),
      stat: t('mining.stat'),
      icon: Mountain,
      accent: '#A87878',
      image: '/images/sections/mining-smelter.jpg',
    },
    {
      name: t('agriculture.name'),
      slug: 'agriculture',
      version: '/0.6',
      desc: t('agriculture.desc'),
      stat: t('agriculture.stat'),
      icon: Wheat,
      accent: '#6BAF6B',
      image: '/images/sections/agri-vertical-farm.jpg',
    },
    {
      name: t('water.name'),
      slug: 'water',
      version: '/0.7',
      desc: t('water.desc'),
      stat: t('water.stat'),
      icon: Droplets,
      accent: '#6888A8',
      image: '/images/sections/water-desal.jpg',
    },
    {
      name: t('finance.name'),
      slug: 'finance',
      version: '/0.8',
      desc: t('finance.desc'),
      stat: t('finance.stat'),
      icon: Landmark,
      accent: '#8B9DAF',
      image: '/images/sections/finance-trading.jpg',
    },
  ];

  return (
    <div className="bg-surface-1">
      {/* Immersive Hero */}
      <ImmersiveHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        version="/0.8"
        metaLabel={t('heroMetaLabel')}
      />

      {/* Network Ontology */}
      <section className="py-16 md:py-24 bg-surface-1">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <NetworkOntology />
        </div>
      </section>

      <SectionDivider />

      {/* Data Visualization — Portfolio Overview */}
      <section className="py-16 md:py-24 bg-surface-1">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="section-label">{t('analyticsLabel')}</span>
              <h2 className="section-title mt-2">{t('portfolioTitle')}</h2>
              <p className="section-subtitle mt-2">
                {t('portfolioSubtitle')}
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <PortfolioDistributionChart />
            </FadeIn>
            <FadeIn delay={0.2}>
              <InvestmentPipelineChart />
            </FadeIn>
          </div>
          <div className="mt-6">
            <FadeIn delay={0.3}>
              <OperationalMetricsChart />
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="section-label">{t('operatingVerticalsLabel')}</span>
              <h2 className="section-title mt-2">{t('operatingVerticalsTitle')}</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {subsidiaries.map((sub) => {
              const Icon = sub.icon;
              return (
                <StaggerItem key={sub.slug}>
                  <Link href={`/subsidiaries/${sub.slug}`} className="group block">
                    <Card3D className="bg-surface-3 border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500">
                      <div className="relative h-[200px] overflow-hidden">
                        <Image src={sub.image} alt={sub.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] bg-[rgba(0,0,0,0.6)] backdrop-blur-md" style={{ color: sub.accent, border: `1px solid ${sub.accent}30` }}>{sub.version}</span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.1em] stat-mono bg-[rgba(0,0,0,0.6)] text-white/70 backdrop-blur-md border border-[rgba(255,255,255,0.06)]">{sub.stat}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${sub.accent}15`, border: `1px solid ${sub.accent}30` }}>
                            <Icon size={16} style={{ color: sub.accent }} />
                          </div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{sub.name}</h3>
                        </div>
                        <p className="text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed mb-4">{sub.desc}</p>
                        <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)]" style={{ color: `${sub.accent}90` }}>{t('explorePlatform')}</span>
                          <ArrowRight size={12} className="text-[rgba(255,255,255,0.25)] group-hover:translate-x-1 group-hover:text-white transition-all" />
                        </div>
                      </div>
                    </Card3D>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
