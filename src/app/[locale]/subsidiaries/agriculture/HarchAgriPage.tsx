'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight, Wheat, Droplets, Plane, Radio, Building2, Leaf,
  MapPin, Clock, AlertTriangle, Sprout, Sun, CloudRain, BarChart3, Cpu
} from 'lucide-react';
import {
  FadeIn, AnimatedCounter, StaggerContainer, StaggerItem,
  Card3D, MagneticButton, SmoothLink, TextReveal, SectionDivider,
  CountUp, ParallaxSection,
} from '@/components/ui/motion';
import CompetitiveComparison from '@/components/competitive/CompetitiveComparison';
import dynamic from 'next/dynamic';

const InteractivePlatform = dynamic(
  () => import('@/components/InteractivePlatform').then((mod) => mod.InteractivePlatform),
  { ssr: false, loading: () => <div className="h-[600px] bg-[#0A0A0A] animate-pulse" /> }
);
import IoTDashboard from '@/components/harchagri/IoTDashboard';

/* ═══════════════════════════════════════════════════
   HARCHAGRI — HarchCorp Unified Design System
   Site palette — Sage Green accent (#4A7B5F) — Shared CSS classes
   ═══════════════════════════════════════════════════ */

const ACCENT = '#4A7B5F';
const ACCENT_RGB = '74,123,95';

/* ═══════════════════════════════════════════════════
   DATA — Strictly HarchAgri content, leveraging Harch Corp infrastructure advantages
   ═══════════════════════════════════════════════════ */

export default function HarchAgriPage() {
  const t = useTranslations('subsidiaries');

const data = {
  name: t('agriculture.title'),
  version: '/0.6',
  heroTitle: t('agriculture.heroTitle'),
  heroSubtitle: t('agriculture.heroSubtitle'),
  heroImage: '/images/sections/agri-aerial-drone.jpg',

  overview: t('agriculture.overview'),

  strategicContext: t('agriculture.strategicContext'),

  marketAnalysis: t('agriculture.marketAnalysis.title'),

  sustainability: t('agriculture.sustainability'),

  investment: '$250K',
  metrics: [
    { value: 600, prefix: '', suffix: 'M ha', label: t('agriculture.metrics.uncultivatedArableLand') },
    { value: 30, prefix: '', suffix: 'M', label: t('agriculture.metrics.smallholderFarmers') },
    { value: 50, prefix: '$', suffix: 'B', label: t('agriculture.metrics.foodImports') },
    { value: 30, prefix: '', suffix: '%', label: t('agriculture.metrics.postHarvestLosses') },
  ],

  products: [
    {
      icon: Plane,
      name: t('agriculture.products.drone.name'),
      tagline: t('agriculture.products.drone.tagline'),
      price: '$50',
      unit: t('agriculture.products.drone.unit'),
      roi: t('agriculture.products.drone.roi'),
      target: t('agriculture.products.drone.target'),
      image: '/images/sections/agri-drone.jpg',
      description: t('agriculture.products.drone.description'),
      features: [
        t('agriculture.products.drone.features.0'),
        t('agriculture.products.drone.features.1'),
        t('agriculture.products.drone.features.2'),
        t('agriculture.products.drone.features.3'),
        t('agriculture.products.drone.features.4'),
      ],
      stats: [
        { label: t('agriculture.products.drone.stats.coverage.label'), value: '40 ha' },
        { label: t('agriculture.products.drone.stats.roi.label'), value: '150%' },
        { label: t('agriculture.products.drone.stats.detection.label'), value: '48h' },
      ],
    },
    {
      icon: Radio,
      name: t('agriculture.products.iot.name'),
      tagline: t('agriculture.products.iot.tagline'),
      price: '$500',
      unit: t('agriculture.products.iot.unit'),
      roi: t('agriculture.products.iot.roi'),
      target: t('agriculture.products.iot.target'),
      image: '/images/sections/agri-iot-sensor.jpg',
      description: t('agriculture.products.iot.description'),
      features: [
        t('agriculture.products.iot.features.0'),
        t('agriculture.products.iot.features.1'),
        t('agriculture.products.iot.features.2'),
        t('agriculture.products.iot.features.3'),
        t('agriculture.products.iot.features.4'),
      ],
      stats: [
        { label: t('agriculture.products.iot.stats.waterSavings.label'), value: '30-50%' },
        { label: t('agriculture.products.iot.stats.yieldIncrease.label'), value: '15-25%' },
        { label: t('agriculture.products.iot.stats.starterKit.label'), value: '$200' },
      ],
    },
    {
      icon: Building2,
      name: t('agriculture.products.vertical.name'),
      tagline: t('agriculture.products.vertical.tagline'),
      price: '$50,000',
      unit: t('agriculture.products.vertical.unit'),
      roi: t('agriculture.products.vertical.roi'),
      target: t('agriculture.products.vertical.target'),
      image: '/images/sections/agri-vertical-farm.jpg',
      description: t('agriculture.products.vertical.description'),
      features: [
        t('agriculture.products.vertical.features.0'),
        t('agriculture.products.vertical.features.1'),
        t('agriculture.products.vertical.features.2'),
        t('agriculture.products.vertical.features.3'),
        t('agriculture.products.vertical.features.4'),
      ],
      stats: [
        { label: t('agriculture.products.vertical.stats.revenue.label'), value: '$4-6K' },
        { label: t('agriculture.products.vertical.stats.waterSavings.label'), value: '95%' },
        { label: t('agriculture.products.vertical.stats.roi.label'), value: '12-18mo' },
      ],
    },
    {
      icon: Leaf,
      name: t('agriculture.products.carbon.name'),
      tagline: t('agriculture.products.carbon.tagline'),
      price: '2%',
      unit: t('agriculture.products.carbon.unit'),
      roi: t('agriculture.products.carbon.roi'),
      target: t('agriculture.products.carbon.target'),
      image: '/images/sections/agri-green-crops-aerial.jpg',
      description: t('agriculture.products.carbon.description'),
      features: [
        t('agriculture.products.carbon.features.0'),
        t('agriculture.products.carbon.features.1'),
        t('agriculture.products.carbon.features.2'),
        t('agriculture.products.carbon.features.3'),
        t('agriculture.products.carbon.features.4'),
      ],
      stats: [
        { label: t('agriculture.products.carbon.stats.credits.label'), value: '0.5-3 tCO2' },
        { label: t('agriculture.products.carbon.stats.target.label'), value: '100K ha' },
        { label: t('agriculture.products.carbon.stats.commission.label'), value: '2%' },
      ],
    },
  ],

  starterKit: {
    price: '$200',
    contents: t('agriculture.starterKit.contents'),
    roi: t('agriculture.starterKit.roi'),
    target: t('agriculture.starterKit.target'),
  },

  competitors: [
    {
      name: t('agriculture.competitors.ocp.name'),
      country: t('agriculture.competitors.ocp.country'),
      revenue: t('agriculture.competitors.ocp.revenue'),
      funding: t('agriculture.competitors.ocp.funding'),
      farmers: t('agriculture.competitors.ocp.farmers'),
      model: t('agriculture.competitors.ocp.model'),
      maturity: t('agriculture.competitors.ocp.maturity'),
      africa: t('agriculture.competitors.ocp.africa'),
      advantage: t('agriculture.competitors.ocp.advantage'),
      weakness: t('agriculture.competitors.ocp.weakness'),
    },
    {
      name: t('agriculture.competitors.twiga.name'),
      country: t('agriculture.competitors.twiga.country'),
      revenue: t('agriculture.competitors.twiga.revenue'),
      funding: t('agriculture.competitors.twiga.funding'),
      farmers: t('agriculture.competitors.twiga.farmers'),
      model: t('agriculture.competitors.twiga.model'),
      maturity: t('agriculture.competitors.twiga.maturity'),
      africa: t('agriculture.competitors.twiga.africa'),
      advantage: t('agriculture.competitors.twiga.advantage'),
      weakness: t('agriculture.competitors.twiga.weakness'),
    },
    {
      name: t('agriculture.competitors.apollo.name'),
      country: t('agriculture.competitors.apollo.country'),
      revenue: t('agriculture.competitors.apollo.revenue'),
      funding: t('agriculture.competitors.apollo.funding'),
      farmers: t('agriculture.competitors.apollo.farmers'),
      model: t('agriculture.competitors.apollo.model'),
      maturity: t('agriculture.competitors.apollo.maturity'),
      africa: t('agriculture.competitors.apollo.africa'),
      advantage: t('agriculture.competitors.apollo.advantage'),
      weakness: t('agriculture.competitors.apollo.weakness'),
    },
    {
      name: t('agriculture.competitors.aerofarms.name'),
      country: t('agriculture.competitors.aerofarms.country'),
      revenue: t('agriculture.competitors.aerofarms.revenue'),
      funding: t('agriculture.competitors.aerofarms.funding'),
      farmers: t('agriculture.competitors.aerofarms.farmers'),
      model: t('agriculture.competitors.aerofarms.model'),
      maturity: t('agriculture.competitors.aerofarms.maturity'),
      africa: t('agriculture.competitors.aerofarms.africa'),
      advantage: t('agriculture.competitors.aerofarms.advantage'),
      weakness: t('agriculture.competitors.aerofarms.weakness'),
    },
    {
      name: t('agriculture.competitors.climateCorp.name'),
      country: t('agriculture.competitors.climateCorp.country'),
      revenue: t('agriculture.competitors.climateCorp.revenue'),
      funding: t('agriculture.competitors.climateCorp.funding'),
      farmers: t('agriculture.competitors.climateCorp.farmers'),
      model: t('agriculture.competitors.climateCorp.model'),
      maturity: t('agriculture.competitors.climateCorp.maturity'),
      africa: t('agriculture.competitors.climateCorp.africa'),
      advantage: t('agriculture.competitors.climateCorp.advantage'),
      weakness: t('agriculture.competitors.climateCorp.weakness'),
    },
  ],

  pricing: [
    { product: t('agriculture.pricing.drone.product'), price: t('agriculture.pricing.drone.price'), unit: t('agriculture.pricing.drone.unit'), roi: t('agriculture.pricing.drone.roi'), target: t('agriculture.pricing.drone.target') },
    { product: t('agriculture.pricing.iot.product'), price: t('agriculture.pricing.iot.price'), unit: t('agriculture.pricing.iot.unit'), roi: t('agriculture.pricing.iot.roi'), target: t('agriculture.pricing.iot.target') },
    { product: t('agriculture.pricing.vertical.product'), price: t('agriculture.pricing.vertical.price'), unit: t('agriculture.pricing.vertical.unit'), roi: t('agriculture.pricing.vertical.roi'), target: t('agriculture.pricing.vertical.target') },
    { product: t('agriculture.pricing.carbon.product'), price: t('agriculture.pricing.carbon.price'), unit: t('agriculture.pricing.carbon.unit'), roi: t('agriculture.pricing.carbon.roi'), target: t('agriculture.pricing.carbon.target') },
    { product: t('agriculture.pricing.starterKit.product'), price: t('agriculture.pricing.starterKit.price'), unit: t('agriculture.pricing.starterKit.unit'), roi: t('agriculture.pricing.starterKit.roi'), target: t('agriculture.pricing.starterKit.target') },
  ],

  partners: [
    { name: t('agriculture.partners.greenPlan.name'), type: t('agriculture.partners.greenPlan.type'), country: t('agriculture.partners.greenPlan.country'), priority: t('agriculture.partners.greenPlan.priority'), harchContribution: t('agriculture.partners.greenPlan.harchContribution'), partnerContribution: t('agriculture.partners.greenPlan.partnerContribution'), status: t('agriculture.partners.greenPlan.status') },
    { name: t('agriculture.partners.ocp.name'), type: t('agriculture.partners.ocp.type'), country: t('agriculture.partners.ocp.country'), priority: t('agriculture.partners.ocp.priority'), harchContribution: t('agriculture.partners.ocp.harchContribution'), partnerContribution: t('agriculture.partners.ocp.partnerContribution'), status: t('agriculture.partners.ocp.status') },
    { name: t('agriculture.partners.fao.name'), type: t('agriculture.partners.fao.type'), country: t('agriculture.partners.fao.country'), priority: t('agriculture.partners.fao.priority'), harchContribution: t('agriculture.partners.fao.harchContribution'), partnerContribution: t('agriculture.partners.fao.partnerContribution'), status: t('agriculture.partners.fao.status') },
    { name: t('agriculture.partners.isra.name'), type: t('agriculture.partners.isra.type'), country: t('agriculture.partners.isra.country'), priority: t('agriculture.partners.isra.priority'), harchContribution: t('agriculture.partners.isra.harchContribution'), partnerContribution: t('agriculture.partners.isra.partnerContribution'), status: t('agriculture.partners.isra.status') },
    { name: t('agriculture.partners.agritechKenya.name'), type: t('agriculture.partners.agritechKenya.type'), country: t('agriculture.partners.agritechKenya.country'), priority: t('agriculture.partners.agritechKenya.priority'), harchContribution: t('agriculture.partners.agritechKenya.harchContribution'), partnerContribution: t('agriculture.partners.agritechKenya.partnerContribution'), status: t('agriculture.partners.agritechKenya.status') },
    { name: t('agriculture.partners.ghanaMofa.name'), type: t('agriculture.partners.ghanaMofa.type'), country: t('agriculture.partners.ghanaMofa.country'), priority: t('agriculture.partners.ghanaMofa.priority'), harchContribution: t('agriculture.partners.ghanaMofa.harchContribution'), partnerContribution: t('agriculture.partners.ghanaMofa.partnerContribution'), status: t('agriculture.partners.ghanaMofa.status') },
  ],

  roadmap: [
    {
      phase: t('agriculture.roadmap.phase1.phase'), period: '2026', title: t('agriculture.roadmap.phase1.title'),
      hectares: 100, farmers: 50, revenue: '$0.1M',
      funding: t('agriculture.roadmap.phase1.funding'),
      actions: [
        t('agriculture.roadmap.phase1.actions.0'),
        t('agriculture.roadmap.phase1.actions.1'),
        t('agriculture.roadmap.phase1.actions.2'),
        t('agriculture.roadmap.phase1.actions.3'),
        t('agriculture.roadmap.phase1.actions.4'),
        t('agriculture.roadmap.phase1.actions.5'),
        t('agriculture.roadmap.phase1.actions.6'),
      ],
    },
    {
      phase: t('agriculture.roadmap.phase2.phase'), period: '2027-2028', title: t('agriculture.roadmap.phase2.title'),
      hectares: 5000, farmers: 1000, revenue: '$2.5M ARR',
      funding: t('agriculture.roadmap.phase2.funding'),
      actions: [
        t('agriculture.roadmap.phase2.actions.0'),
        t('agriculture.roadmap.phase2.actions.1'),
        t('agriculture.roadmap.phase2.actions.2'),
        t('agriculture.roadmap.phase2.actions.3'),
        t('agriculture.roadmap.phase2.actions.4'),
        t('agriculture.roadmap.phase2.actions.5'),
      ],
    },
    {
      phase: t('agriculture.roadmap.phase3.phase'), period: '2028-2029', title: t('agriculture.roadmap.phase3.title'),
      hectares: 25000, farmers: 5000, revenue: '$10M ARR',
      funding: t('agriculture.roadmap.phase3.funding'),
      actions: [
        t('agriculture.roadmap.phase3.actions.0'),
        t('agriculture.roadmap.phase3.actions.1'),
        t('agriculture.roadmap.phase3.actions.2'),
        t('agriculture.roadmap.phase3.actions.3'),
        t('agriculture.roadmap.phase3.actions.4'),
      ],
    },
    {
      phase: t('agriculture.roadmap.phase4.phase'), period: '2029-2031', title: t('agriculture.roadmap.phase4.title'),
      hectares: 100000, farmers: 50000, revenue: '$50M ARR',
      funding: t('agriculture.roadmap.phase4.funding'),
      actions: [
        t('agriculture.roadmap.phase4.actions.0'),
        t('agriculture.roadmap.phase4.actions.1'),
        t('agriculture.roadmap.phase4.actions.2'),
        t('agriculture.roadmap.phase4.actions.3'),
        t('agriculture.roadmap.phase4.actions.4'),
      ],
    },
  ],

  moats: [
    {
      title: t('agriculture.moats.gpuInfrastructure.title'),
      desc: t('agriculture.moats.gpuInfrastructure.desc'),
      icon: Cpu,
    },
    {
      title: t('agriculture.moats.carbonApi.title'),
      desc: t('agriculture.moats.carbonApi.desc'),
      icon: Leaf,
    },
    {
      title: t('agriculture.moats.esgPositioning.title'),
      desc: t('agriculture.moats.esgPositioning.desc'),
      icon: Sun,
    },
  ],

  risks: [
    { risk: t('agriculture.risks.overExpansion.risk'), probability: t('agriculture.risks.overExpansion.probability'), impact: t('agriculture.risks.overExpansion.impact'), mitigation: t('agriculture.risks.overExpansion.mitigation') },
    { risk: t('agriculture.risks.verticalFarmFailure.risk'), probability: t('agriculture.risks.verticalFarmFailure.probability'), impact: t('agriculture.risks.verticalFarmFailure.impact'), mitigation: t('agriculture.risks.verticalFarmFailure.mitigation') },
    { risk: t('agriculture.risks.fundingDownturn.risk'), probability: t('agriculture.risks.fundingDownturn.probability'), impact: t('agriculture.risks.fundingDownturn.impact'), mitigation: t('agriculture.risks.fundingDownturn.mitigation') },
    { risk: t('agriculture.risks.farmerAdoption.risk'), probability: t('agriculture.risks.farmerAdoption.probability'), impact: t('agriculture.risks.farmerAdoption.impact'), mitigation: t('agriculture.risks.farmerAdoption.mitigation') },
    { risk: t('agriculture.risks.carbonRegulation.risk'), probability: t('agriculture.risks.carbonRegulation.probability'), impact: t('agriculture.risks.carbonRegulation.impact'), mitigation: t('agriculture.risks.carbonRegulation.mitigation') },
    { risk: t('agriculture.risks.ocpDroneEntry.risk'), probability: t('agriculture.risks.ocpDroneEntry.probability'), impact: t('agriculture.risks.ocpDroneEntry.impact'), mitigation: t('agriculture.risks.ocpDroneEntry.mitigation') },
  ],

  locations: [
    { city: t('agriculture.locations.casablanca.city'), region: t('agriculture.locations.casablanca.region'), crops: t('agriculture.locations.casablanca.crops') },
    { city: t('agriculture.locations.marrakech.city'), region: t('agriculture.locations.marrakech.region'), crops: t('agriculture.locations.marrakech.crops') },
    { city: t('agriculture.locations.tangier.city'), region: t('agriculture.locations.tangier.region'), crops: t('agriculture.locations.tangier.crops') },
    { city: t('agriculture.locations.rabat.city'), region: t('agriculture.locations.rabat.region'), crops: t('agriculture.locations.rabat.crops') },
    { city: t('agriculture.locations.agadir.city'), region: t('agriculture.locations.agadir.region'), crops: t('agriculture.locations.agadir.crops') },
  ],
};

/* ═══════════════════════════════════════════════════
   COMPETITIVE COMPARISON — i18n-driven data builder
   ═══════════════════════════════════════════════════ */
const cc = 'agriculture.competitiveComparison';
const buildCompMetrics = (compKey: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    label: t(`${cc}.${compKey}.metrics.${i}.label`),
    harchValue: t(`${cc}.${compKey}.metrics.${i}.harchValue`),
    competitorValue: t(`${cc}.${compKey}.metrics.${i}.competitorValue`),
    harchWins: true as const,
  }));

const competitiveData = {
  title: t(`${cc}.title`),
  subtitle: t(`${cc}.subtitle`),
  sectionLabel: t(`${cc}.sectionLabel`),
  harchName: t(`${cc}.harchName`),
  competitors: [
    {
      name: t(`${cc}.aeroFarms.name`),
      country: t(`${cc}.aeroFarms.country`),
      founded: t(`${cc}.aeroFarms.founded`),
      revenue: t(`${cc}.aeroFarms.revenue`),
      metrics: buildCompMetrics('aeroFarms', 14),
      verdict: t(`${cc}.aeroFarms.verdict`),
    },
    {
      name: t(`${cc}.cropXClimateCorp.name`),
      country: t(`${cc}.cropXClimateCorp.country`),
      founded: t(`${cc}.cropXClimateCorp.founded`),
      revenue: t(`${cc}.cropXClimateCorp.revenue`),
      metrics: buildCompMetrics('cropXClimateCorp', 13),
      verdict: t(`${cc}.cropXClimateCorp.verdict`),
    },
    {
      name: t(`${cc}.helloTractor.name`),
      country: t(`${cc}.helloTractor.country`),
      founded: t(`${cc}.helloTractor.founded`),
      revenue: t(`${cc}.helloTractor.revenue`),
      metrics: buildCompMetrics('helloTractor', 12),
      verdict: t(`${cc}.helloTractor.verdict`),
    },
    {
      name: t(`${cc}.ocpGroup.name`),
      country: t(`${cc}.ocpGroup.country`),
      founded: t(`${cc}.ocpGroup.founded`),
      revenue: t(`${cc}.ocpGroup.revenue`),
      metrics: buildCompMetrics('ocpGroup', 11),
      verdict: t(`${cc}.ocpGroup.verdict`),
    },
    {
      name: t(`${cc}.apolloAgriculture.name`),
      country: t(`${cc}.apolloAgriculture.country`),
      founded: t(`${cc}.apolloAgriculture.founded`),
      revenue: t(`${cc}.apolloAgriculture.revenue`),
      metrics: buildCompMetrics('apolloAgriculture', 11),
      verdict: t(`${cc}.apolloAgriculture.verdict`),
    },
  ],
};

/* Phase 1 Budget Detail Rows */
const budgetRows = Array.from({ length: 7 }, (_, i) => ({
  action: t(`agriculture.roadmapBudgetRows.${i}.action`),
  timeline: t(`agriculture.roadmapBudgetRows.${i}.timeline`),
  budget: t(`agriculture.roadmapBudgetRows.${i}.budget`),
  kpi: t(`agriculture.roadmapBudgetRows.${i}.kpi`),
}));

  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt={t('agriculture.heroImageAlt')}
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.heroBadge')}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6 whitespace-pre-line">
              {data.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">{data.heroSubtitle}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
              {data.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-white stat-mono">
                    <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.overviewLabel')}</p>
                <TextReveal text={t('agriculture.overviewTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <Card3D key={m.label} className="p-6">
                    <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-white stat-mono">
                      <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-2 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                  </Card3D>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT — Photo + Text
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/sections/agri-drone.jpg"
                alt={t('agriculture.strategicContextImageAlt')}
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="max-w-lg">
                <FadeIn direction="right">
                  <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.strategicContextLabel')}</p>
                  <TextReveal text={t('agriculture.strategicContextTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          MARKET ANALYSIS — Table
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.marketAnalysisLabel')}</p>
            <TextReveal text={t('agriculture.marketAnalysisTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">{t('agriculture.marketAnalysisSubtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('agriculture.marketAnalysis.segment')}</th>
                      <th>{t('agriculture.marketAnalysis.marketSize')}</th>
                      <th>{t('agriculture.marketAnalysis.cagr')}</th>
                      <th>{t('agriculture.marketAnalysis.africaMaturity')}</th>
                      <th>{t('agriculture.marketAnalysis.opportunity')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { segment: t('agriculture.marketAnalysis.rows.drones.segment'), size: t('agriculture.marketAnalysis.rows.drones.size'), cagr: t('agriculture.marketAnalysis.rows.drones.cagr'), maturity: t('agriculture.marketAnalysis.rows.drones.maturity'), opportunity: t('agriculture.marketAnalysis.rows.drones.opportunity'), strong: true },
                      { segment: t('agriculture.marketAnalysis.rows.iot.segment'), size: t('agriculture.marketAnalysis.rows.iot.size'), cagr: t('agriculture.marketAnalysis.rows.iot.cagr'), maturity: t('agriculture.marketAnalysis.rows.iot.maturity'), opportunity: t('agriculture.marketAnalysis.rows.iot.opportunity'), strong: true },
                      { segment: t('agriculture.marketAnalysis.rows.verticalFarming.segment'), size: t('agriculture.marketAnalysis.rows.verticalFarming.size'), cagr: t('agriculture.marketAnalysis.rows.verticalFarming.cagr'), maturity: t('agriculture.marketAnalysis.rows.verticalFarming.maturity'), opportunity: t('agriculture.marketAnalysis.rows.verticalFarming.opportunity'), strong: false },
                      { segment: t('agriculture.marketAnalysis.rows.carbonCredits.segment'), size: t('agriculture.marketAnalysis.rows.carbonCredits.size'), cagr: t('agriculture.marketAnalysis.rows.carbonCredits.cagr'), maturity: t('agriculture.marketAnalysis.rows.carbonCredits.maturity'), opportunity: t('agriculture.marketAnalysis.rows.carbonCredits.opportunity'), strong: true },
                      { segment: t('agriculture.marketAnalysis.rows.marketplace.segment'), size: t('agriculture.marketAnalysis.rows.marketplace.size'), cagr: t('agriculture.marketAnalysis.rows.marketplace.cagr'), maturity: t('agriculture.marketAnalysis.rows.marketplace.maturity'), opportunity: t('agriculture.marketAnalysis.rows.marketplace.opportunity'), strong: false },
                    ].map((row) => (
                      <tr key={row.segment}>
                        <td>{row.segment}</td>
                        <td>{row.size}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.cagr}</td>
                        <td className="!text-[#666666] !font-normal">{row.maturity}</td>
                        <td className={row.strong ? `!text-[${ACCENT}] !font-semibold` : '!text-[#666666] !font-normal'}>{row.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[10px] text-[#666666]">{t('agriculture.marketAnalysis.footnote')}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PRODUCTS — The 5 Pillars
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.productsLabel')}</p>
            <TextReveal text={t('agriculture.productsTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('agriculture.productsSubtitle')}
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {data.products.map((product) => {
              const Icon = product.icon;
              return (
                <StaggerItem key={product.name}>
                  <Card3D className="p-8 h-full" glareEnabled>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                          <Icon size={18} className={`text-[${ACCENT}]`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{product.name}</h3>
                          <p className="text-[11px] text-[#666666]">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white stat-mono">{product.price}</p>
                        <p className="text-[10px] text-[#666666]">{product.unit}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">{product.description}</p>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {product.stats.map((stat, j) => (
                        <div key={j} className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                          <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
                          <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className={`mt-1.5 w-1 h-1 rounded-full bg-[rgba(${ACCENT_RGB},0.4)] flex-shrink-0`} />
                          <span className="text-[12px] text-[#999999]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.04)]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[#666666]" />
                        <span className="text-[10px] text-[#666666]">{t('agriculture.roiLabel')}: {product.roi}</span>
                      </div>
                      <span className="text-[10px] text-[#666666]">{product.target}</span>
                    </div>
                  </Card3D>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Starter Kit */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8 border-dashed" style={{ borderColor: `rgba(${ACCENT_RGB},0.25)` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                    <Sprout size={18} className={`text-[${ACCENT}]`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{t('agriculture.starterKit.title')}</h3>
                    <p className="text-[12px] text-[#999999]">{data.starterKit.contents}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white stat-mono">{data.starterKit.price}</p>
                  <p className="text-[10px] text-[#666666]">{t('agriculture.starterKit.roiLabel')}: {data.starterKit.roi}</p>
                </div>
              </div>
              <p className="text-[12px] text-[#666666] mt-3">{t('agriculture.starterKit.forLabel')} {data.starterKit.target} — {t('agriculture.starterKit.eliminatesBarrier')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          IoT DASHBOARD — Live Sensor Network
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.liveMonitoringLabel')}</p>
            <TextReveal text={t('agriculture.iotSensorTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('agriculture.iotSensorSubtitle')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <IoTDashboard />
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.pricingLabel')}</p>
            <TextReveal text={t('agriculture.pricingTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">{t('agriculture.pricingSubtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('agriculture.pricing.product')}</th>
                      <th>{t('agriculture.pricing.price')}</th>
                      <th>{t('agriculture.pricing.unit')}</th>
                      <th>{t('agriculture.pricing.roi')}</th>
                      <th>{t('agriculture.pricing.target')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pricing.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.price}</td>
                        <td className="!text-[#666666] !font-normal">{row.unit}</td>
                        <td>{row.roi}</td>
                        <td className="!text-[#666666] !font-normal">{row.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BREAK — Vertical Farms
          ═══════════════════════════════════════════ */}
      <ParallaxSection speed={0.2} className="photo-section">
        <Image
          src="/images/sections/agri-vertical-farm.jpg"
          alt={t('agriculture.verticalFarmImageAlt')}
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
      </ParallaxSection>

      {/* ═══════════════════════════════════════════
          COMPETITIVE ANALYSIS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.competitiveAnalysisLabel')}</p>
            <TextReveal text={t('agriculture.competitiveAnalysisTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('agriculture.competitiveAnalysisSubtitle')}
            </p>
          </FadeIn>
          <div className="space-y-4">
            {data.competitors.map((comp, i) => (
              <FadeIn key={comp.name} delay={i * 0.06}>
                <div className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <h3 className="font-bold text-white text-[15px]">{comp.name}</h3>
                      <p className="text-[11px] text-[#666666]">{comp.country} · {comp.maturity}</p>
                      <p className="text-[11px] text-[#999999] mt-1">{comp.model}</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.revenue')}</p>
                        <p className="text-[13px] text-white stat-mono">{comp.revenue}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.funding')}</p>
                        <p className="text-[13px] text-white stat-mono">{comp.funding}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.farmers')}</p>
                        <p className="text-[13px] text-white">{comp.farmers}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.africa')}</p>
                        <p className="text-[13px] text-white">{comp.africa}</p>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">{t('agriculture.competitiveAnalysis.harchAdvantage')}</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.advantage}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">{t('agriculture.competitiveAnalysis.keyWeakness')}</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.weakness}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Highlight HarchAgri */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#4A7B5F] font-[family-name:var(--font-space-mono)]">/0.6</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">HarchAgri</h4>
                  <p className="text-[11px] text-[#666666]">{t('agriculture.competitiveAnalysis.harchAgriTagline')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.model')}</p>
                  <p className="text-[14px] text-white font-semibold">{t('agriculture.competitiveAnalysis.modelValue')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.differentiator')}</p>
                  <p className="text-[14px] text-white font-semibold">{t('agriculture.competitiveAnalysis.differentiatorValue')}</p>
                  <p className="text-[10px] text-[#666666] mt-1">{t('agriculture.competitiveAnalysis.differentiatorNote')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.africaPresence')}</p>
                  <p className="text-[14px] text-white font-semibold">{t('agriculture.competitiveAnalysis.africaPresenceValue')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">{t('agriculture.competitiveAnalysis.target2031')}</p>
                  <p className="text-[14px] text-white font-semibold stat-mono">{t('agriculture.competitiveAnalysis.target2031Value')}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITIVE COMPARISON — Metric-level
          ═══════════════════════════════════════════ */}
      <CompetitiveComparison
        title={competitiveData.title}
        subtitle={competitiveData.subtitle}
        accentColor="#4A7B5F"
        sectionLabel={competitiveData.sectionLabel}
        harchName={competitiveData.harchName}
        competitors={competitiveData.competitors}
      />

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          COMPETITIVE ADVANTAGE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.competitiveAdvantageLabel')}</p>
            <TextReveal text={t('agriculture.competitiveAdvantageTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-12" />
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {data.moats.map((moat) => {
              const Icon = moat.icon;
              return (
                <StaggerItem key={moat.title}>
                  <Card3D className="p-8 h-full">
                    <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center mb-5`}>
                      <Icon size={18} className={`text-[${ACCENT}]`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{moat.title}</h3>
                    <div className="accent-line mb-4" />
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{moat.desc}</p>
                  </Card3D>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          SUSTAINABILITY & ESG
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center px-8 md:px-16 py-20 order-2 lg:order-1">
              <div className="max-w-lg">
                <FadeIn direction="right">
                  <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.sustainabilityLabel')}</p>
                  <TextReveal text={t('agriculture.sustainabilityTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
                </FadeIn>
              </div>
            </div>
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/sections/agri-green-crops-aerial.jpg"
                alt={t('agriculture.sustainabilityImageAlt')}
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-r lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PARTNERSHIPS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.partnershipsLabel')}</p>
            <TextReveal text={t('agriculture.partnershipsTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('agriculture.partnershipsSubtitle')}
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {data.partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <Card3D className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                      <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold ${
                      partner.status === 'Active' ? `bg-[rgba(${ACCENT_RGB},0.08)] text-[${ACCENT}]` : 'bg-[rgba(255,255,255,0.04)] text-[#666666]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.status === 'Active' ? `bg-[${ACCENT}]` : 'bg-[#666666]'}`} />
                      {partner.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">{t('agriculture.weBring')}</p>
                    <p className="text-[11px] text-white">{partner.harchContribution}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">{t('agriculture.theyBring')}</p>
                    <p className="text-[11px] text-[#999999]">{partner.partnerContribution}</p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.04)]">
                    <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">{partner.priority}</span>
                  </div>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.roadmapLabel')}</p>
            <TextReveal text={t('agriculture.roadmapTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">{t('agriculture.roadmapSubtitle')}</p>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

            <div className="space-y-10">
              {data.roadmap.map((phase, i) => (
                <FadeIn key={phase.phase} delay={i * 0.1}>
                  <div className="relative pl-10 md:pl-14">
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1 top-1 w-[23px] md:w-[31px] h-[23px] md:h-[31px] rounded-full border-2 border-[rgba(255,255,255,0.06)] bg-[#1E1E1E] flex items-center justify-center">
                      <div className={`w-[7px] h-[7px] rounded-full bg-[${ACCENT}]`} />
                    </div>

                    <div className="card p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{phase.phase}</span>
                          <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                          <p className="text-[12px] text-[#666666] mt-1">{phase.period}</p>
                          <p className="text-[11px] text-[#666666] mt-0.5">{phase.funding}</p>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-3 gap-2">
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-white stat-mono">
                              <CountUp to={phase.hectares} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.roadmapHectaresLabel')}</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-white stat-mono">
                              <CountUp to={phase.farmers} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.roadmapFarmersLabel')}</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-sm font-bold text-white stat-mono">{phase.revenue}</p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">{t('agriculture.roadmapRevenueLabel')}</p>
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <div className="space-y-2">
                            {phase.actions.map((action, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <div className={`mt-1.5 w-1 h-1 rounded-full bg-[rgba(${ACCENT_RGB},0.4)] flex-shrink-0`} />
                                <span className="text-[12px] text-[#999999] leading-relaxed">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Phase 1 Budget Detail */}
          <FadeIn delay={0.5}>
            <div className="mt-12 card overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{t('agriculture.roadmapBudgetPhase')}</span>
                  <span className="text-[10px] text-[#666666]">—</span>
                  <span className="text-[13px] font-bold text-white">{t('agriculture.roadmapBudgetTitle')}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('agriculture.roadmapBudgetAction')}</th>
                      <th>{t('agriculture.roadmapBudgetTimeline')}</th>
                      <th>{t('agriculture.roadmapBudgetBudget')}</th>
                      <th>{t('agriculture.roadmapBudgetKpi')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetRows.map((row) => (
                      <tr key={row.action}>
                        <td>{row.action}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.timeline}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.budget}</td>
                        <td className="!text-[#999999] !font-normal">{row.kpi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
                <span className="text-[11px] text-[#666666]">{t('agriculture.roadmapTotalInvestment')}</span>
                <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{t('agriculture.roadmapAutoFinanced')}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          RISKS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.riskLabel')}</p>
            <TextReveal text={t('agriculture.riskTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">{t('agriculture.riskSubtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('agriculture.riskHeaderRisk')}</th>
                      <th>{t('agriculture.riskHeaderProbability')}</th>
                      <th>{t('agriculture.riskHeaderImpact')}</th>
                      <th>{t('agriculture.riskHeaderMitigation')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.risks.map((r) => (
                      <tr key={r.risk}>
                        <td>{r.risk}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 text-[11px] ${
                            r.probability === 'High' ? 'text-white/80' : r.probability === 'Medium' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.probability === 'High' && <AlertTriangle size={10} />}
                            {r.probability}
                          </span>
                        </td>
                        <td>
                          <span className={`text-[11px] ${
                            r.impact === 'Critical' ? 'text-white font-semibold' : r.impact === 'High' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.impact}
                          </span>
                        </td>
                        <td className="!text-[#999999] !font-normal max-w-md text-[12px]">{r.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          DEPLOYMENTS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.deploymentsLabel')}</p>
            <TextReveal text={t('agriculture.deploymentsTitle')} className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('agriculture.deploymentsSubtitle')}
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.06}>
            {data.locations.map((loc) => (
              <StaggerItem key={loc.city}>
                <Card3D className="p-5 text-center">
                  <MapPin size={14} className={`text-[${ACCENT}] mx-auto mb-2`} />
                  <p className="text-[13px] font-semibold text-white">{loc.city}</p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{loc.region}</p>
                  <p className="text-[9px] text-[#999999] mt-1">{loc.crops}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          INVESTMENT — Photo + CTA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/sections/agri-iot-sensor.jpg"
          alt={t('agriculture.iotImageAlt')}
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">{t('agriculture.investmentLabel')}</p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
              {data.investment}
            </h2>
            <p className="text-[15px] text-[#999999] max-w-lg leading-[1.7]">{t('agriculture.investmentSubtitle')}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-[-0.01em] mb-6">{t('agriculture.ctaTitle')}</h2>
            <p className="max-w-xl mx-auto text-[15px] text-[#666666] leading-[1.7] mb-12">{t('agriculture.ctaSubtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all min-h-[44px]">
                  {t('agriculture.ctaPrimary')} <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/investors" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all min-h-[44px]">
                  {t('agriculture.ctaSecondary')}
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
      <InteractivePlatform slug="agriculture" accent="#4A7B5F" />
    </div>
  );
}
