'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Activity, BarChart3, Brain, Cpu, Database,
  Gauge, Globe, Layers, Leaf, Lock, Monitor, Network, Radio,
  Server, Shield, Thermometer, Wifi, Wind, Zap, Code2, Key,
  CloudCog, FileCode2, GitBranch, Boxes, Eye, Rocket, CheckCircle2,
  Sun, Droplets, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompetitiveComparison from '@/components/competitive/CompetitiveComparison';
import { FadeIn, AnimatedCounter } from '@/components/ui/motion';
import type { Competitor } from '@/components/competitive/CompetitiveComparison';

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');
  const tCommon = useTranslations('common');
  const [activeArchTab, setActiveArchTab] = useState('sense');
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const hubs = [
    {
      id: 'ouarzazate', name: 'Harch Ouarzazate', location: 'Ouarzazate', energy: t('architecture.sense.description'),
      power: '800 GPUs', latency: '18 gCO2/kWh — Enterprise Tier', color: '#F59E0B',
      icon: Sun, image: '/images/intelligence/harchos-energy-mix.png',
      description: t('architecture.sense.description'),
    },
    {
      id: 'dakhla', name: 'Harch Dakhla', location: 'Dakhla', energy: t('architecture.sense.description'),
      power: '400 GPUs', latency: '32 gCO2/kWh — Enterprise Tier', color: '#5B8FB9',
      icon: Wind, image: '/images/intelligence/harchos-tanger.png',
      description: t('architecture.think.description'),
    },
    {
      id: 'benguerir', name: 'Harch Benguerir', location: 'Benguerir', energy: t('architecture.think.description'),
      power: '350 GPUs', latency: '55 gCO2/kWh — Performance Tier', color: '#10B981',
      icon: Leaf, image: '/images/intelligence/harchos-architecture.png',
      description: t('architecture.act.description'),
    },
    {
      id: 'tanger', name: 'Harch Tanger', location: 'Tanger', energy: t('architecture.act.description'),
      power: '200 GPUs', latency: '<5ms to Europe — Performance Tier', color: '#8B9DAF',
      icon: Droplets, image: '/images/intelligence/harchos-facility-night.png',
      description: t('architecture.sense.description'),
    },
    {
      id: 'casablanca', name: 'Harch Casablanca', location: 'Casablanca', energy: t('architecture.think.description'),
      power: '48 GPUs', latency: '210 gCO2/kWh — Standard Tier', color: '#8B5CF6',
      icon: Network, image: '/images/intelligence/harchos-mesh-map.png',
      description: t('architecture.act.description'),
    },
  ];

  const architectureLayers = [
    {
      id: 'sense', name: t('architecture.sense.title'), tag: t('architecture.sense.subtitle'),
      icon: Eye, color: '#8B9DAF',
      description: t('architecture.sense.description'),
      specs: [
        { label: t('features.dashboard.title'), value: '5K+ pts/sec' },
        { label: t('features.carbonAware.title'), value: 'IoT, Satellite, API' },
        { label: t('features.security.title'), value: '4h ahead' },
        { label: t('features.compliance.title'), value: '1-second granularity' },
      ],
    },
    {
      id: 'think', name: t('architecture.think.title'), tag: t('architecture.think.subtitle'),
      icon: Brain, color: '#8B5CF6',
      description: t('architecture.think.description'),
      specs: [
        { label: t('features.dashboard.title'), value: '4 hours' },
        { label: t('features.carbonAware.title'), value: 'RL, Transformer, GNN' },
        { label: t('features.security.title'), value: 'Multi-objective' },
        { label: t('features.compliance.title'), value: '<50ms' },
    ],
    },
    {
      id: 'act', name: t('architecture.act.title'), tag: t('architecture.act.subtitle'),
      icon: Zap, color: '#10B981',
      description: t('architecture.act.description'),
      specs: [
        { label: t('features.dashboard.title'), value: 'Live, <200ms' },
        { label: t('features.carbonAware.title'), value: 'Zero-downtime' },
        { label: t('features.security.title'), value: 'Real-time context' },
        { label: t('features.compliance.title'), value: '99.999%' },
      ],
    },
  ];

  const capabilities = [
    {
      icon: Boxes, title: t('features.dashboard.title'),
      desc: t('features.dashboard.description'),
    },
    {
      icon: Brain, title: t('features.carbonAware.title'),
      desc: t('features.carbonAware.description'),
    },
    {
      icon: Leaf, title: t('features.security.title'),
      desc: t('features.security.description'),
    },
    {
      icon: Shield, title: t('features.compliance.title'),
      desc: t('features.compliance.description'),
    },
    {
      icon: CloudCog, title: t('features.api.title'),
      desc: t('features.api.description'),
    },
    {
      icon: Key, title: t('features.mobile.title'),
      desc: t('features.mobile.description'),
    },
  ];

  const specs = [
    { category: t('specs.title'), items: [
      { spec: t('features.dashboard.title'), value: '1,798 GPUs' },
      { spec: t('features.carbonAware.title'), value: 'H100, A100, L40S' },
      { spec: t('features.security.title'), value: 'NVLink + InfiniBand' },
      { spec: t('features.compliance.title'), value: '800 GPUs per hub' },
      { spec: t('features.api.title'), value: '>92% linear' },
    ]},
    { category: t('specs.compliance'), items: [
      { spec: t('features.dashboard.title'), value: '81.5%' },
      { spec: t('features.carbonAware.title'), value: '~47 gCO2/kWh' },
      { spec: t('features.security.title'), value: '18 gCO2/kWh' },
      { spec: t('features.compliance.title'), value: '1.12' },
      { spec: t('features.api.title'), value: '1.04' },
    ]},
    { category: t('features.mobile.title'), items: [
      { spec: t('features.dashboard.title'), value: '400Gbps' },
      { spec: t('features.carbonAware.title'), value: '100Gbps dedicated' },
      { spec: t('features.security.title'), value: '4 systems' },
      { spec: t('features.compliance.title'), value: '<5-12ms' },
      { spec: t('features.api.title'), value: '<35ms' },
    ]},
    { category: t('architecture.title'), items: [
      { spec: t('features.dashboard.title'), value: '99.999%' },
      { spec: t('features.carbonAware.title'), value: '<200ms' },
      { spec: t('features.security.title'), value: '11 nines' },
      { spec: t('features.compliance.title'), value: '3-2-1 + geo-redundant' },
      { spec: t('features.api.title'), value: 'RPO <1min, RTO <5min' },
    ]},
  ];

  const securityFeatures = [
    { icon: Lock, title: t('features.dashboard.title'), desc: t('features.dashboard.description') },
    { icon: Shield, title: t('features.carbonAware.title'), desc: t('features.carbonAware.description') },
    { icon: Eye, title: t('features.security.title'), desc: t('features.security.description') },
    { icon: FileCode2, title: t('features.compliance.title'), desc: t('features.compliance.description') },
  ];

  const devPlatform = [
    { icon: Code2, title: t('features.api.title'), desc: t('features.api.description') },
    { icon: GitBranch, title: t('features.mobile.title'), desc: t('features.mobile.description') },
    { icon: Monitor, title: t('features.dashboard.title'), desc: t('features.dashboard.description') },
    { icon: Database, title: t('features.compliance.title'), desc: t('features.compliance.description') },
  ];

  const roadmap = [
    { phase: 'Q1 2025', title: t('architecture.sense.subtitle'), items: [t('specs.uptime'), t('specs.latency'), t('specs.dataPoints')] },
    { phase: 'Q3 2025', title: t('architecture.act.subtitle'), items: [t('specs.integrations'), t('specs.compliance'), t('specs.encryption')] },
    { phase: 'Q1 2026', title: t('architecture.think.subtitle'), items: [t('specs.uptime'), t('specs.latency'), t('specs.dataPoints')] },
    { phase: 'Q3 2026', title: t('architecture.sense.subtitle'), items: [t('specs.integrations'), t('specs.compliance'), t('specs.encryption')] },
    { phase: 'Q1 2027', title: t('architecture.act.subtitle'), items: [t('specs.uptime'), t('specs.latency'), t('specs.dataPoints')] },
    { phase: 'Q4 2027', title: t('architecture.think.subtitle'), items: [t('specs.integrations'), t('specs.compliance'), t('specs.encryption')] },
  ];

  const activeArch = architectureLayers.find(l => l.id === activeArchTab)!;

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative h-[100dvh] min-h-[700px] overflow-hidden">
        <Image
          src="/images/intelligence/harchos-hero.png"
          alt="HarchOS Data Center Infrastructure"
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-transparent to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('title')} /0.1</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6">
              HarchOS<span className="text-[#8B9DAF]">™</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">
              {t('subtitle')}
            </p>
            <p className="text-[15px] text-[#999999] max-w-xl leading-[1.7] mb-8">
              {t('description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="#architecture" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                {t('architecture.title')} <ArrowRight size={14} />
              </Link>
              <Link href="#capabilities" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                {t('features.title')}
              </Link>
            </div>
          </FadeIn>
          {/* Floating stats */}
          <FadeIn delay={0.5}>
            <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
              {[
                { value: 1798, suffix: '', label: 'GPUs' },
                { value: 5, suffix: '', label: 'Hubs' },
                { value: 400, suffix: 'Gbps', label: 'Backbone' },
                { value: 47, suffix: '', label: 'gCO2/kWh' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: MANIFESTO
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8 text-[#8B9DAF]">{t('cta.title')}</p>
            <blockquote className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[1.15] tracking-[-0.01em] max-w-4xl">
              &ldquo;{t('description')}&rdquo;
            </blockquote>
            <div className="accent-line mt-8 mb-6" />
            <p className="text-[15px] text-[#999999] max-w-2xl leading-[1.7]">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: INFRASTRUCTURE PHOTO BREAK
          ═══════════════════════════════════════════ */}
      <section className="py-0 bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <FadeIn>
              <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
                <Image src="/images/intelligence/harchos-facility-night.png" alt="Data Center Infrastructure" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-space-mono)]">{t('architecture.title')}</p>
                  <p className="text-xl font-bold text-white mt-1">{t('features.dashboard.title')}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
                <Image src="/images/intelligence/harchos-energy-mix.png" alt="Renewable Energy Infrastructure" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-space-mono)]">{t('specs.compliance')}</p>
                  <p className="text-xl font-bold text-white mt-1">{t('features.carbonAware.title')}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: ARCHITECTURE — SENSE / THINK / ACT
          ═══════════════════════════════════════════ */}
      <section id="architecture" className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('architecture.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('architecture.sense.title')}.<br/>{t('architecture.think.title')}.
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('architecture.act.description')}
            </p>
          </FadeIn>

          {/* Architecture Tabs */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <FadeIn>
              <div className="flex lg:flex-col gap-2">
                {architectureLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveArchTab(layer.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-lg border transition-all text-left min-w-[180px] ${
                      activeArchTab === layer.id
                        ? 'bg-[rgba(255,255,255,0.06)] border-white/15 text-white'
                        : 'border-transparent text-[#999999] hover:text-white hover:bg-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <layer.icon size={18} style={{ color: layer.color }} />
                    <div>
                      <p className="text-sm font-bold">{layer.name}</p>
                      <p className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{layer.tag}</p>
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activeArch.color}15` }}>
                        <activeArch.icon size={20} style={{ color: activeArch.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{activeArch.name}</h3>
                        <p className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">{activeArch.tag}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                      {activeArch.description}
                    </p>
                    <div className="space-y-4">
                      {activeArch.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                          <span className="text-[13px] text-[#999999]">{spec.label}</span>
                          <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[300px] lg:h-full min-h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/intelligence/harchos-gpu-cluster.png"
                      alt={`${activeArch.name} Layer`}
                      fill
                      className="object-cover industrial-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: DISTRIBUTED MESH — Interactive Hub Map
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/intelligence/harchos-energy-mix.png" alt="" fill className="object-cover" style={{ filter: 'brightness(0.2) saturate(0)' }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('features.carbonAware.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('specs.integrations')}.<br/>{t('features.dashboard.title')}.
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('description')}
            </p>
          </FadeIn>

          {/* Hub Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubs.map((hub, i) => (
              <FadeIn key={hub.id} delay={i * 0.08}>
                <div
                  onClick={() => setActiveHub(activeHub === hub.id ? null : hub.id)}
                  className={`card cursor-pointer overflow-hidden group ${activeHub === hub.id ? 'ring-1' : ''}`}
                  style={activeHub === hub.id ? { boxShadow: `0 0 0 1px ${hub.color}`, borderColor: `${hub.color}30` } : {}}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={hub.image} alt={hub.name} fill className="object-cover industrial-image group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hub.color }} />
                        <span className="text-[10px] text-white/70 font-[family-name:var(--font-space-mono)] uppercase tracking-wider">{t('specs.uptime')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <hub.icon size={16} style={{ color: hub.color }} />
                      <h3 className="text-lg font-bold text-white">{hub.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[rgba(255,255,255,0.04)] text-[#999999]">
                        <MapPin size={10} className="inline mr-1" />{hub.location}
                      </span>
                      <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[rgba(255,255,255,0.04)] text-[#999999]">
                        <Zap size={10} className="inline mr-1" />{hub.power}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#666666] leading-[1.6] mb-2">
                      {hub.energy}
                    </p>
                    <p className="text-[10px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                      {hub.latency}
                    </p>
                    {activeHub === hub.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-white/[0.04]"
                      >
                        <p className="text-[13px] text-[#999999] leading-[1.7]">{hub.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mesh Summary Stats */}
          <FadeIn>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: t('specs.dataPoints'), value: '1,798', accent: '#8B9DAF' },
                { label: t('specs.compliance'), value: '~47 gCO2/kWh', accent: '#10B981' },
                { label: t('specs.encryption'), value: '81.5%', accent: '#F59E0B' },
                { label: t('specs.integrations'), value: '400Gbps', accent: '#8B5CF6' },
              ].map((stat) => (
                <div key={stat.label} className="card p-6 text-center">
                  <p className="text-2xl font-bold text-white stat-mono mb-1">{stat.value}</p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: OPS CENTER DASHBOARD
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <p className="section-label mb-4 text-[#8B9DAF]">{t('features.dashboard.title')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                  {t('features.dashboard.title')}<br/>{t('features.security.title')}
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                  {t('features.dashboard.description')}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 1798, suffix: '', label: t('specs.dataPoints') },
                    { value: 47, suffix: '', label: t('specs.compliance') },
                    { value: 800, suffix: '', label: t('specs.integrations') },
                    { value: 400, suffix: 'Gbps', label: t('specs.encryption') },
                  ].map((stat) => (
                    <div key={stat.label} className="card p-5">
                      <p className="text-2xl font-bold text-white stat-mono">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative rounded-xl overflow-hidden h-[500px] lg:h-[600px]">
                <Image src="/images/intelligence/harchos-ops-center.png" alt="HarchOS Operations Center" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1A1A1A]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: CAPABILITIES
          ═══════════════════════════════════════════ */}
      <section id="capabilities" className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('features.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('features.carbonAware.title')}<br/>{t('features.dashboard.title')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.08}>
                <div className="card p-8 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center mb-5">
                    <cap.icon size={18} className="text-[#8B9DAF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: TECHNICAL SPECS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('specs.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('specs.title')}
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specs.map((category) => (
              <FadeIn key={category.category}>
                <div className="card p-8">
                  <h3 className="text-lg font-bold text-white mb-1">{category.category}</h3>
                  <div className="accent-line mb-6" />
                  <div className="space-y-0">
                    {category.items.map((item) => (
                      <div key={item.spec} className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-0">
                        <span className="text-[13px] text-[#999999]">{item.spec}</span>
                        <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9: SECURITY & COMPLIANCE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{tCommon('security')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('features.security.title')}<br/>{t('features.compliance.title')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('features.security.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                      <feat.icon size={18} className="text-[#8B9DAF]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Compliance Badges */}
          <FadeIn>
            <div className="mt-12 flex flex-wrap gap-3">
              {['GDPR', 'ISO 27001', 'SOC 2 Type II', 'Law 09-08', 'FIPS 140-2 L3', 'TLS 1.3'].map((cert) => (
                <span key={cert} className="px-4 py-2 rounded-lg bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.15)] text-[11px] font-semibold text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                  {cert}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10: DEVELOPER PLATFORM
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('features.api.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('features.api.title')}<br/>{t('features.mobile.title')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('features.api.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devPlatform.map((tool, i) => (
              <FadeIn key={tool.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                      <tool.icon size={18} className="text-[#8B9DAF]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{tool.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Code Snippet Preview */}
          <FadeIn>
            <div className="mt-12 card overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                <span className="ml-4 text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">deploy-workload.ts</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.8]">
                <p><span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">HarchOS</span> <span className="text-[#C678DD]">from</span> <span className="text-[#98C379]">&apos;@harchos/sdk&apos;</span>;</p>
                <p className="mt-2"><span className="text-[#C678DD]">const</span> <span className="text-[#61AFEF]">client</span> = <span className="text-[#C678DD]">await</span> <span className="text-[#E5C07B]">HarchOS</span>.<span className="text-[#61AFEF]">create</span>({'{'}</p>
                <p className="ml-4"><span className="text-[#E06C75]">region</span>: <span className="text-[#98C379]">&apos;morocco&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">sovereignty</span>: <span className="text-[#98C379]">&apos;strict&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">carbonAware</span>: <span className="text-[#D19A66]">true</span>,</p>
                <p>{'}'});</p>
                <p className="mt-2"><span className="text-[#C678DD]">const</span> <span className="text-[#61AFEF]">job</span> = <span className="text-[#C678DD]">await</span> <span className="text-[#61AFEF]">client</span>.<span className="text-[#61AFEF]">deploy</span>({'{'}</p>
                <p className="ml-4"><span className="text-[#E06C75]">gpu</span>: <span className="text-[#98C379]">&apos;H100&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">count</span>: <span className="text-[#D19A66]">256</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">schedule</span>: <span className="text-[#98C379]">&apos;carbon-optimal&apos;</span>,</p>
                <p>{'}'});</p>
                <p className="mt-1 text-[#5C6370]">{'// Deployed to Harch Ouarzazate — solar energy at 97.2% capacity'}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11: NETWORK INFRASTRUCTURE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            <FadeIn>
              <div className="flex items-center px-8 md:px-16 lg:px-24 py-20">
                <div className="max-w-xl">
                  <p className="section-label mb-4 text-[#8B9DAF]">{t('specs.integrations')}</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                    400Gbps<br/>{t('specs.integrations')}
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                    {t('architecture.act.description')}
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: t('specs.latency') + ' Europe', value: '<5-12ms' },
                      { label: t('specs.latency') + ' Americas', value: '<35ms' },
                      { label: t('specs.integrations'), value: '4 systems' },
                      { label: t('specs.encryption'), value: '100Gbps each' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-[13px] text-[#999999]">{item.label}</span>
                        <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative min-h-[40vh] lg:min-h-0 overflow-hidden">
                <Image src="/images/intelligence/harchos-fibre.png" alt="Network Infrastructure" fill className="object-cover industrial-image" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11B: COMPETITIVE LANDSCAPE
          ═══════════════════════════════════════════ */}
      <CompetitiveComparison
        title="Competitive Landscape"
        subtitle="HarchOS vs. the world's GPU infrastructure providers. We don't just run green — we schedule green. No competitor matches us on a single metric."
        accentColor="#8B9DAF"
        sectionLabel="Competitive Landscape"
        harchName="HarchOS"
        competitors={[
          {
            name: 'CoreWeave',
            country: 'USA',
            metrics: [
              { label: 'Carbon-Aware GPU Scheduling', harchValue: 'Real-time, per-job, 47-params', competitorValue: 'None — static placement', harchWins: true },
              { label: 'African Sovereign DC', harchValue: '5 hubs — Morocco jurisdiction', competitorValue: '0 hubs in Africa', harchWins: true },
              { label: 'Uptime SLA', harchValue: '99.999% (5-nines)', competitorValue: '99.99% (4-nines)', harchWins: true },
              { label: 'Renewable Energy', harchValue: '81.5% avg — 97.2% best hub', competitorValue: '0% disclosed — US fossil grid', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh (89% below avg)', competitorValue: '~450 gCO2/kWh (US grid)', harchWins: true },
              { label: 'PUE', harchValue: '1.04 — 1.12 range', competitorValue: 'Undisclosed — likely 1.3+', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — 8ms to EU', competitorValue: '0 — US-only peering', harchWins: true },
              { label: 'Sovereign Compliance', harchValue: 'GDPR + ISO 27001 + SOC 2 + Law 09-08', competitorValue: 'US CLOUD Act jurisdiction', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03 (4x cheaper)', competitorValue: '$0.08-0.12', harchWins: true },
              { label: 'Data Residency Guarantee', harchValue: '100% African — sovereign', competitorValue: 'US-controlled — CLOUD Act', harchWins: true },
              { label: 'GPU-per-Watt Efficiency', harchValue: 'Industry-leading (1.04 PUE)', competitorValue: 'Undisclosed — no carbon metrics', harchWins: true },
              { label: 'Live Container Migration', harchValue: '<200ms — zero-downtime', competitorValue: 'Not available', harchWins: true },
              { label: 'Failover Time', harchValue: '<200ms — cross-hub', competitorValue: 'Minutes — single-site only', harchWins: true },
              { label: 'Cross-Vertical Energy Integration', harchValue: 'Harch Energy direct supply', competitorValue: 'None — grid-dependent', harchWins: true },
            ],
            verdict: 'CoreWeave has more GPUs. HarchOS has everything else — 9.5x lower carbon intensity, 4x cheaper energy, 5-nines SLA, live container migration, real-time carbon-aware scheduling, African sovereignty, and submarine cable gateway to Europe. Scale without sovereignty is just rented infrastructure.',
          },
          {
            name: 'Google Cloud (Hamina)',
            country: 'Finland',
            metrics: [
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None — static green DC only', harchWins: true },
              { label: 'GPU Cloud Access', harchValue: 'H100/A100/L40S — on-demand', competitorValue: 'No GPU cloud — internal only', harchWins: true },
              { label: 'African Data Sovereignty', harchValue: '100% — Morocco jurisdiction', competitorValue: '0% — Finland/US jurisdiction', harchWins: true },
              { label: 'Latency to Africa', harchValue: '<5ms from Morocco hubs', competitorValue: '>100ms from Finland', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03 (2-3x cheaper)', competitorValue: '$0.06-0.10', harchWins: true },
              { label: 'EU CBAM Compliance', harchValue: 'Zero-margin — natively green', competitorValue: 'N/A — no GPU cloud to tax', harchWins: true },
              { label: 'Submarine Cable Gateway', harchValue: '4 systems — Africa-EU hub', competitorValue: 'Nordic — no Africa path', harchWins: true },
              { label: 'Data Residency', harchValue: '100% African — guaranteed', competitorValue: 'US/Finnish — no African option', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh', competitorValue: '~80 gCO2/kWh (Nordic grid)', harchWins: true },
              { label: 'Sovereign Compliance', harchValue: 'GDPR + ISO 27001 + SOC 2 + Law 09-08', competitorValue: 'GDPR only — US CLOUD Act applies', harchWins: true },
              { label: 'Live Workload Migration', harchValue: '<200ms cross-hub failover', competitorValue: 'Not available — static DC', harchWins: true },
              { label: 'Price per GPU-hour (H100)', harchValue: '$1.89 — renewable-powered', competitorValue: 'N/A — no GPU cloud offering', harchWins: true },
            ],
            verdict: 'Google Hamina is a green data center you cannot use for GPU compute. HarchOS is a green GPU cloud you can — at 3x lower energy cost, with African sovereignty, real-time carbon-aware scheduling, and the only submarine cable gateway between Africa and Europe. Access matters.',
          },
          {
            name: 'Africa Data Centres (Cassava)',
            country: 'South Africa',
            metrics: [
              { label: 'GPU Compute', harchValue: '1,798 GPUs (H100/A100/L40S)', competitorValue: '0 GPUs — colocation only', harchWins: true },
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None', harchWins: true },
              { label: 'MW Pipeline', harchValue: '500MW (17x larger)', competitorValue: '30MW', harchWins: true },
              { label: 'Sovereign AI Platform', harchValue: 'Full-stack (train/tune/serve)', competitorValue: 'None — no AI platform', harchWins: true },
              { label: 'PUE', harchValue: '1.04 — 1.12 range', competitorValue: 'Undisclosed — likely 1.4+', harchWins: true },
              { label: 'Renewable Energy', harchValue: '81.5% avg — 97.2% best hub', competitorValue: 'Undisclosed — likely <20%', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — Europe gateway', competitorValue: 'None — colocation only', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh', competitorValue: '~500 gCO2/kWh (SA grid)', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03', competitorValue: '$0.08-0.15 (SA grid)', harchWins: true },
              { label: 'Data Residency Guarantee', harchValue: '100% African — Morocco law', competitorValue: 'South Africa — US CLOUD Act via partners', harchWins: true },
              { label: 'Cross-Vertical Energy', harchValue: 'Harch Energy direct supply', competitorValue: 'Eskom grid — unreliable', harchWins: true },
              { label: 'Failover', harchValue: '<200ms cross-hub', competitorValue: 'Single-site — no mesh', harchWins: true },
            ],
            verdict: 'Africa\'s largest DC operator has zero GPUs, zero carbon-awareness, zero AI platform, 17x less power pipeline, 10x higher carbon intensity, and 3x higher energy costs. HarchOS is not competing with Africa Data Centres — we are in a different category entirely.',
          },
          {
            name: 'QScale',
            country: 'Canada',
            metrics: [
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None — no scheduling', harchWins: true },
              { label: 'GPU Cloud (Accessible)', harchValue: 'On-demand + reserved — H100/A100/L40S', competitorValue: 'Colocation only — no GPU cloud', harchWins: true },
              { label: 'African Data Sovereignty', harchValue: '100% — Morocco jurisdiction', competitorValue: '0% — Canada only', harchWins: true },
              { label: 'Latency to Europe', harchValue: '<8ms via submarine cable', competitorValue: '>80ms from Quebec', harchWins: true },
              { label: 'Latency to Africa', harchValue: '<5ms', competitorValue: '>150ms', harchWins: true },
              { label: 'EU Market Access', harchValue: '8ms — same timezone', competitorValue: '80ms+ — transatlantic', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03 (1.5x cheaper)', competitorValue: '$0.04-0.05 (Hydro-Quebec)', harchWins: true },
              { label: 'Sovereign Compliance', harchValue: 'GDPR + ISO 27001 + SOC 2 + Law 09-08', competitorValue: 'Canadian jurisdiction — no GDPR', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh', competitorValue: '~30 gCO2/kWh (hydro)', harchWins: false },
              { label: 'Live Workload Migration', harchValue: '<200ms — cross-hub mesh', competitorValue: 'Not available', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — Africa-EU gateway', competitorValue: 'None — Canadian peering only', harchWins: true },
              { label: 'Price per GPU-hour (H100)', harchValue: '$1.89 — all-inclusive', competitorValue: 'N/A — colocation pricing model', harchWins: true },
              { label: 'Cross-Vertical Integration', harchValue: 'Energy + Mining + Cement + Agri + Water', competitorValue: 'None — standalone compute', harchWins: true },
            ],
            verdict: 'QScale runs on a clean grid with lower grid carbon, but cannot schedule carbon per-job, cannot serve GPU cloud workloads, cannot reach Europe in under 80ms, cannot reach Africa at all, and cannot offer sovereignty. HarchOS is the only platform that combines carbon-awareness + GPU cloud + EU proximity + African sovereignty + industrial integration.',
          },
          {
            name: 'Lambda Labs',
            country: 'USA',
            metrics: [
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None — static allocation', harchWins: true },
              { label: 'African Data Sovereignty', harchValue: '5 hubs — Morocco jurisdiction', competitorValue: '0 — US-only', harchWins: true },
              { label: 'Renewable Energy', harchValue: '81.5% avg — 97.2% best hub', competitorValue: '0% disclosed — US fossil grid', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh', competitorValue: '~450 gCO2/kWh (US grid)', harchWins: true },
              { label: 'Uptime SLA', harchValue: '99.999% (5-nines)', competitorValue: '99.9% (3-nines)', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03 (3-4x cheaper)', competitorValue: '$0.08-0.12', harchWins: true },
              { label: 'PUE', harchValue: '1.04 — 1.12', competitorValue: 'Undisclosed — likely 1.3+', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — EU gateway', competitorValue: '0 — US-only peering', harchWins: true },
              { label: 'Live Workload Migration', harchValue: '<200ms — cross-hub', competitorValue: 'Not available', harchWins: true },
              { label: 'Data Residency Guarantee', harchValue: '100% African — sovereign', competitorValue: 'US-controlled — CLOUD Act', harchWins: true },
              { label: 'Cross-Vertical Integration', harchValue: 'Energy + Mining + Cement + Agri + Water', competitorValue: 'None — GPU cloud only', harchWins: true },
              { label: 'Failover', harchValue: '<200ms — distributed mesh', competitorValue: 'Single-site — manual restart', harchWins: true },
            ],
            verdict: 'Lambda Labs offers cheap GPU access on a fossil-fueled US grid. HarchOS offers sovereign GPU compute at 4x lower energy cost, 10x lower carbon, 5-nines SLA, cross-hub live migration, and African jurisdiction. Cheap is not the same as superior.',
          },
          {
            name: 'Oracle Cloud Infrastructure',
            country: 'USA',
            metrics: [
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None — static allocation', harchWins: true },
              { label: 'African GPU Hubs', harchValue: '5 hubs — Morocco', competitorValue: '1 region — South Africa only', harchWins: true },
              { label: 'Renewable Energy', harchValue: '81.5% avg — 97.2% best hub', competitorValue: '~42% global — 0% in Africa', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh', competitorValue: '~400 gCO2/kWh (SA grid)', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03', competitorValue: '$0.08-0.15', harchWins: true },
              { label: 'Data Residency Guarantee', harchValue: '100% African — Morocco law', competitorValue: 'South Africa — US CLOUD Act', harchWins: true },
              { label: 'Sovereign Compliance', harchValue: 'GDPR + ISO 27001 + SOC 2 + Law 09-08', competitorValue: 'SOC 2 only — US jurisdiction', harchWins: true },
              { label: 'Live Workload Migration', harchValue: '<200ms — cross-hub mesh', competitorValue: 'Not available — region-locked', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — EU gateway', competitorValue: 'None — standard peering', harchWins: true },
              { label: 'Cross-Vertical Energy', harchValue: 'Harch Energy direct supply', competitorValue: 'Grid-dependent — no verticals', harchWins: true },
            ],
            verdict: 'Oracle has one African region on a fossil-fueled grid, with no carbon-awareness, no sovereign guarantees, and US CLOUD Act exposure. HarchOS has 5 hubs on 81.5% renewable energy, 100% African sovereignty, carbon-aware scheduling, and 4x lower energy costs. Sovereignty is not a feature — it is the architecture.',
          },
          {
            name: 'Equinix',
            country: 'USA',
            metrics: [
              { label: 'GPU Cloud', harchValue: '1,798 GPUs — H100/A100/L40S on-demand', competitorValue: '0 GPUs — colocation only', harchWins: true },
              { label: 'Carbon-Aware Scheduling', harchValue: 'Real-time per-job — 47 params', competitorValue: 'None — colocation model', harchWins: true },
              { label: 'African Presence', harchValue: '5 hubs — Morocco', competitorValue: '3 colo facilities — South Africa only', harchWins: true },
              { label: 'Renewable Energy', harchValue: '81.5% avg — verified', competitorValue: '~95% global — RECs (not direct)', harchWins: true },
              { label: 'Carbon Intensity', harchValue: '~47 gCO2/kWh (direct generation)', competitorValue: '~100 gCO2/kWh (RECs do not reduce)', harchWins: true },
              { label: 'AI Platform Services', harchValue: 'Full-stack — train/tune/serve', competitorValue: 'None — bare metal only', harchWins: true },
              { label: 'Sovereign Compliance', harchValue: 'GDPR + ISO 27001 + SOC 2 + Law 09-08', competitorValue: 'US jurisdiction — CLOUD Act', harchWins: true },
              { label: 'Energy Cost /kWh', harchValue: '$0.03 (direct renewable)', competitorValue: '$0.10-0.18 (commercial rates)', harchWins: true },
              { label: 'Live Workload Migration', harchValue: '<200ms — cross-hub mesh', competitorValue: 'Not applicable — colocation', harchWins: true },
              { label: 'Submarine Cable Hub', harchValue: '4 systems — Africa-EU gateway', competitorValue: 'Standard peering — no gateway', harchWins: true },
            ],
            verdict: 'Equinix buys RECs to claim 95% renewable — but RECs do not reduce actual carbon. HarchOS runs on 81.5% direct renewable generation at 47 gCO2/kWh — no accounting tricks, no offsets, just clean power from our own solar and wind farms. Direct beats purchased. Always.',
          },
        ]}
      />

      {/* ═══════════════════════════════════════════
          SECTION 12: ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('architecture.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('specs.integrations')}
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-12">
              {roadmap.map((phase, i) => (
                <FadeIn key={phase.phase} delay={i * 0.08}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-2 h-2 bg-[#8B9DAF] rounded-full -translate-x-1/2 mt-2" />

                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-10 md:pl-0`}>
                      <p className="text-[11px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)] font-bold mb-1">{phase.phase}</p>
                      <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className={`flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <CheckCircle2 size={12} className="text-[#8B9DAF] shrink-0" />
                            <span className="text-[13px] text-[#999999]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 13: CTA + BACK
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('cta.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('cta.title')}
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              {t('cta.subtitle')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                {t('cta.primary')} <ArrowRight size={14} />
              </Link>
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                <ArrowLeft size={14} /> {tCommon('back')} Intelligence
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
