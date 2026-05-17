'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Activity, BarChart3, Brain, Cpu, Database,
  Gauge, Globe, Layers, Leaf, Lock, Monitor, Network, Radio,
  Server, Shield, Thermometer, Wifi, Wind, Zap, Code2, Key,
  CloudCog, FileCode2, GitBranch, Boxes, Eye, Rocket, CheckCircle2,
  Sun, Droplets, MapPin, ArrowUpRight, Play, AlertTriangle,
  TrendingUp, CircleDot, Workflow, Settings2, BarChart2, Timer,
  CpuIcon, Users, ChevronRight, ExternalLink, Sparkles,
  Search, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompetitiveComparison from '@/components/competitive/CompetitiveComparison';
import { FadeIn, AnimatedCounter } from '@/components/ui/motion';
import type { Competitor } from '@/components/competitive/CompetitiveComparison';

/* ─── Annotation Badge Component ─── */
function AnnotationBadge({ letter, label }: { letter: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
        {letter}
      </span>
      <span className="text-[10px] text-[#999999] leading-[1.3]">{label}</span>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');
  const tCommon = useTranslations('common');

  /* ─── State ─── */
  const [heroTab, setHeroTab] = useState<'sovereign' | 'carbon' | 'automation'>('carbon');
  const [activeArchTab, setActiveArchTab] = useState('sense');
  const [workflowMediaTab, setWorkflowMediaTab] = useState<'video' | 'details'>('video');
  const [evaluateMediaTab, setEvaluateMediaTab] = useState<'video' | 'details'>('details');
  const [workflowStep, setWorkflowStep] = useState(1);
  const [evaluateStep, setEvaluateStep] = useState(2);
  const [navOpen, setNavOpen] = useState(false);

  /* ─── Mock Data (using t() for translatable content) ─── */
  const SOVEREIGN_AI_ALERTS = [
    { id: 1, severity: 'critical', title: t('demo.sovereign.alerts.a1Title'), detail: t('demo.sovereign.alerts.a1Detail'), time: t('demo.sovereign.alerts.a1Time') },
    { id: 2, severity: 'warning', title: t('demo.sovereign.alerts.a2Title'), detail: t('demo.sovereign.alerts.a2Detail'), time: t('demo.sovereign.alerts.a2Time') },
    { id: 3, severity: 'info', title: t('demo.sovereign.alerts.a3Title'), detail: t('demo.sovereign.alerts.a3Detail'), time: t('demo.sovereign.alerts.a3Time') },
    { id: 4, severity: 'warning', title: t('demo.sovereign.alerts.a4Title'), detail: t('demo.sovereign.alerts.a4Detail'), time: t('demo.sovereign.alerts.a4Time') },
    { id: 5, severity: 'critical', title: t('demo.sovereign.alerts.a5Title'), detail: t('demo.sovereign.alerts.a5Detail'), time: t('demo.sovereign.alerts.a5Time') },
  ];

  const CARBON_HUBS = [
    { name: 'Harch Ouarzazate', carbon: 18, renewable: 97.2, gpus: 800, type: t('hubTypes.solar'), status: 'optimal', latency: '<5ms to EU' },
    { name: 'Harch Dakhla', carbon: 32, renewable: 84.1, gpus: 400, type: t('hubTypes.wind'), status: 'optimal', latency: '<8ms to EU' },
    { name: 'Harch Benguerir', carbon: 55, renewable: 62.3, gpus: 350, type: t('hubTypes.solarWind'), status: 'degraded', latency: '<12ms to EU' },
    { name: 'Harch Tanger', carbon: 41, renewable: 78.9, gpus: 200, type: t('hubTypes.hybrid'), status: 'optimal', latency: '<3ms to EU' },
    { name: 'Harch Casablanca', carbon: 210, renewable: 12.4, gpus: 48, type: t('hubTypes.grid'), status: 'standby', latency: '<2ms local' },
  ];

  const AUTOMATION_WORKFLOWS = [
    { id: 'wf-1', name: t('demo.automation.workflows.wf1Name'), status: 'running', steps: 6, completed: 4, trigger: t('demo.automation.workflows.wf1Trigger') },
    { id: 'wf-2', name: t('demo.automation.workflows.wf2Name'), status: 'idle', steps: 4, completed: 0, trigger: t('demo.automation.workflows.wf2Trigger') },
    { id: 'wf-3', name: t('demo.automation.workflows.wf3Name'), status: 'running', steps: 3, completed: 3, trigger: t('demo.automation.workflows.wf3Trigger') },
    { id: 'wf-4', name: t('demo.automation.workflows.wf4Name'), status: 'running', steps: 5, completed: 2, trigger: t('demo.automation.workflows.wf4Trigger') },
    { id: 'wf-5', name: t('demo.automation.workflows.wf5Name'), status: 'idle', steps: 8, completed: 0, trigger: t('demo.automation.workflows.wf5Trigger') },
  ];

  const PROGRESS_STEPS = [
    { id: '0.1', label: t('progress.define') },
    { id: '0.2', label: t('progress.build') },
    { id: '0.3', label: t('progress.evaluate') },
    { id: '0.4', label: t('progress.ship') },
  ];

  /* ─── Data ─── */
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

  const capabilitiesList = [
    { number: '0.1', icon: Leaf, title: t('capabilities.carbonAware.title'), desc: t('capabilities.carbonAware.desc') },
    { number: '0.2', icon: Shield, title: t('capabilities.sovereignData.title'), desc: t('capabilities.sovereignData.desc') },
    { number: '0.3', icon: Brain, title: t('capabilities.aiPlatform.title'), desc: t('capabilities.aiPlatform.desc') },
    { number: '0.4', icon: Code2, title: t('capabilities.devSdk.title'), desc: t('capabilities.devSdk.desc') },
  ];

  const specs = [
    { category: t('specs.title'), items: [
      { spec: t('specs.totalGpus'), value: '1,798' },
      { spec: t('specs.gpuTypes'), value: 'H100, A100, L40S' },
      { spec: t('specs.interconnect'), value: 'NVLink + InfiniBand' },
      { spec: t('specs.maxPerHub'), value: '800 GPUs' },
      { spec: t('specs.scalingEfficiency'), value: '>92% linear' },
    ]},
    { category: t('specs.compliance'), items: [
      { spec: t('specs.renewableEnergy'), value: '81.5%' },
      { spec: t('specs.avgCarbonIntensity'), value: '~47 gCO2/kWh' },
      { spec: t('specs.bestHubCarbon'), value: '18 gCO2/kWh' },
      { spec: t('specs.pueRange'), value: '1.04 — 1.12' },
      { spec: t('specs.bestPue'), value: '1.04' },
    ]},
    { category: t('specs.network'), items: [
      { spec: t('specs.backbone'), value: '400Gbps' },
      { spec: t('specs.dedicatedLinks'), value: '100Gbps each' },
      { spec: t('specs.submarineSystems'), value: '4 systems' },
      { spec: t('specs.latencyToEurope'), value: '<5-12ms' },
      { spec: t('specs.latencyToAmericas'), value: '<35ms' },
    ]},
  ];

  const securityFeatures = [
    { icon: Lock, title: t('security.zeroTrust.title'), desc: t('security.zeroTrust.desc') },
    { icon: Shield, title: t('security.sovereignEncryption.title'), desc: t('security.sovereignEncryption.desc') },
    { icon: Eye, title: t('security.socMonitoring.title'), desc: t('security.socMonitoring.desc') },
    { icon: FileCode2, title: t('security.autoCompliance.title'), desc: t('security.autoCompliance.desc') },
  ];

  const devPlatform = [
    { icon: Code2, title: t('features.api.title'), desc: t('features.api.description') },
    { icon: GitBranch, title: t('features.mobile.title'), desc: t('features.mobile.description') },
    { icon: Monitor, title: t('features.dashboard.title'), desc: t('features.dashboard.description') },
    { icon: Database, title: t('features.compliance.title'), desc: t('features.compliance.description') },
  ];

  const activeArch = architectureLayers.find(l => l.id === activeArchTab)!;

  const heroTabs = [
    { id: 'sovereign' as const, label: t('hero.tabs.sovereign'), number: '01' },
    { id: 'carbon' as const, label: t('hero.tabs.carbon'), number: '02' },
    { id: 'automation' as const, label: t('hero.tabs.automation'), number: '03' },
  ];

  /* ─── Workflow feature cards ─── */
  const workflowFeatureCards = [
    { icon: Database, title: t('workflow.details.dataPipelining.title'), desc: t('workflow.details.dataPipelining.desc') },
    { icon: Sparkles, title: t('workflow.details.actions.title'), desc: t('workflow.details.actions.desc') },
    { icon: Brain, title: t('workflow.details.agents.title'), desc: t('workflow.details.agents.desc') },
  ];

  /* ─── Evaluate feature cards ─── */
  const evaluateFeatureCards = [
    { icon: Settings2, title: t('evaluate.details.debugLogic.title'), desc: t('evaluate.details.debugLogic.desc') },
    { icon: GitBranch, title: t('evaluate.details.compareModels.title'), desc: t('evaluate.details.compareModels.desc') },
  ];

  /* ─── Competitive data builder ─── */
  const buildCompetitorMetrics = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => ({
      label: t(`competitive.${prefix}.m${i}Label`),
      harchValue: t(`competitive.${prefix}.m${i}Harch`),
      competitorValue: t(`competitive.${prefix}.m${i}Competitor`),
      harchWins: true,
    }));

  const competitors: Competitor[] = [
    {
      name: t('competitive.coreweave.name'),
      country: t('competitive.coreweave.country'),
      metrics: (() => {
        const m = buildCompetitorMetrics('coreweave', 14);
        return m;
      })(),
      verdict: t('competitive.coreweave.verdict'),
    },
    {
      name: t('competitive.googleCloud.name'),
      country: t('competitive.googleCloud.country'),
      metrics: buildCompetitorMetrics('googleCloud', 12),
      verdict: t('competitive.googleCloud.verdict'),
    },
    {
      name: t('competitive.africaDataCentres.name'),
      country: t('competitive.africaDataCentres.country'),
      metrics: buildCompetitorMetrics('africaDataCentres', 12),
      verdict: t('competitive.africaDataCentres.verdict'),
    },
    {
      name: t('competitive.qscale.name'),
      country: t('competitive.qscale.country'),
      metrics: (() => {
        const m = buildCompetitorMetrics('qscale', 13);
        // QScale m8 (carbon intensity) — QScale wins
        m[8] = { ...m[8], harchWins: false };
        return m;
      })(),
      verdict: t('competitive.qscale.verdict'),
    },
    {
      name: t('competitive.lambdaLabs.name'),
      country: t('competitive.lambdaLabs.country'),
      metrics: buildCompetitorMetrics('lambdaLabs', 12),
      verdict: t('competitive.lambdaLabs.verdict'),
    },
    {
      name: t('competitive.oracleCloud.name'),
      country: t('competitive.oracleCloud.country'),
      metrics: buildCompetitorMetrics('oracleCloud', 10),
      verdict: t('competitive.oracleCloud.verdict'),
    },
    {
      name: t('competitive.equinix.name'),
      country: t('competitive.equinix.country'),
      metrics: buildCompetitorMetrics('equinix', 10),
      verdict: t('competitive.equinix.verdict'),
    },
  ];

  /* ─── Status label helper ─── */
  const getWorkflowStatusLabel = (status: string) => {
    if (status === 'running') return t('demo.automation.statusRunning');
    return t('demo.automation.statusIdle');
  };

  const getActionStatusLabel = (status: string) => {
    if (status === 'approved') return t('demo.sovereign.statusApproved');
    if (status === 'auto-approved') return t('demo.sovereign.statusAutoApproved');
    return t('demo.sovereign.statusPending');
  };

  return (
    <div className="bg-white">

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E1E2E]/95 backdrop-blur-sm border-b border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-[#8B9DAF]" />
            <span className="text-[13px] font-bold text-white tracking-[-0.01em]">HarchOS</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded border border-white/[0.2] text-white text-[11px] font-semibold hover:bg-white/[0.08] transition-colors">
              {t('header.requestAccess')}
              <ArrowUpRight size={12} />
            </button>
            <button className="text-[#8B9DAF] hover:text-white transition-colors"><Search size={16} /></button>
            <button onClick={() => setNavOpen(true)} className="text-[#8B9DAF] hover:text-white transition-colors"><Menu size={16} /></button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Palantir AIP "Beyond Chat" Style
          Dark bg #1E1E2E, headline left, numbered tabs right
          Annotation circles (A, B, C) in purple
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] bg-[#1E1E2E] overflow-hidden flex flex-col">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full pt-28 pb-8">
          {/* Top section: Headline + Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12">
            {/* Left: Headline */}
            <FadeIn>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-6 font-[family-name:var(--font-space-mono)]">
                  {t('title')} /0.1
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-[80px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-4">
                  {t('hero.headline')}<br />{t('hero.headlineLine2')}
                </h1>
                <p className="text-xl md:text-2xl font-light tracking-[-0.01em] mb-8">
                  <span className="text-[#8B5CF6]">{t('hero.subheadlineSovereign')}</span>{' '}
                  <span className="text-[#7DD3FC]">{t('hero.subheadlineAutonomy')}</span>
                </p>
                <p className="text-[15px] text-[#999999] max-w-md leading-[1.7] mb-10">
                  {t('description')}
                </p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { value: 1798, suffix: '', label: t('hero.stats.gpus') },
                    { value: 5, suffix: '', label: t('hero.stats.hubs') },
                    { value: 47, suffix: '', label: t('hero.stats.carbon') },
                    { value: 99.999, suffix: '%', label: t('hero.stats.uptime') },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.value === 99.999 ? 3 : 0} />
                      </p>
                      <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: Feature Tabs + Demo Container */}
            <FadeIn delay={0.15}>
              <div>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {heroTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroTab(tab.id)}
                      className={`flex items-center gap-3 px-5 py-4 rounded-lg border transition-all text-left flex-1 ${
                        heroTab === tab.id
                          ? 'bg-white/[0.08] border-white text-white'
                          : 'bg-white/[0.02] border-white/[0.15] text-[#8B9DAF] hover:bg-white/[0.04] hover:border-white/25'
                      }`}
                    >
                      <span className={`text-[11px] font-bold font-[family-name:var(--font-space-mono)] tracking-wider ${heroTab === tab.id ? 'text-white' : 'text-[#555555]'}`}>
                        {tab.number}
                      </span>
                      <span className="text-[12px] font-semibold tracking-wide whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Demo Container — Palantir-style with annotation circles */}
                <div className="relative rounded-xl border border-white/[0.08] bg-[#252538] overflow-hidden min-h-[360px] md:min-h-[440px]">
                  <AnimatePresence mode="wait">
                    {heroTab === 'sovereign' && (
                      <motion.div
                        key="sovereign-demo"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="p-5 md:p-6"
                      >
                        {/* Sovereign AI App — Review Proposal Panel */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.liveAlerts')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.consoleTitle')}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Left: Alert list */}
                          <div className="space-y-2 max-h-[300px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                            {SOVEREIGN_AI_ALERTS.slice(0, 3).map((alert) => (
                              <div key={alert.id} className={`rounded-lg border p-3 relative ${
                                alert.severity === 'critical' ? 'border-red-500/20 bg-red-500/[0.04]' :
                                alert.severity === 'warning' ? 'border-amber-500/20 bg-amber-500/[0.04]' :
                                'border-[#8B9DAF]/10 bg-[#8B9DAF]/[0.03]'
                              }`}>
                                {/* Annotation A on first alert */}
                                {alert.id === 1 && (
                                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">A</span>
                                )}
                                {/* Annotation B on second alert */}
                                {alert.id === 2 && (
                                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">B</span>
                                )}
                                <div className="flex items-start gap-2">
                                  <AlertTriangle size={13} className={`mt-0.5 shrink-0 ${
                                    alert.severity === 'critical' ? 'text-red-400' :
                                    alert.severity === 'warning' ? 'text-amber-400' : 'text-[#8B9DAF]'
                                  }`} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-semibold text-white truncate">{alert.title}</p>
                                    <p className="text-[11px] text-[#999999] mt-0.5 leading-[1.5]">{alert.detail}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Right: Proposed action panel */}
                          <div className="md:col-span-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 relative">
                            <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">C</span>
                            <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.sovereign.aiProposedActions')}</p>
                            <div className="space-y-2">
                              {[
                                { action: t('demo.sovereign.actions.a1Action'), impact: t('demo.sovereign.actions.a1Impact'), status: 'approved' },
                                { action: t('demo.sovereign.actions.a2Action'), impact: t('demo.sovereign.actions.a2Impact'), status: 'pending' },
                                { action: t('demo.sovereign.actions.a3Action'), impact: t('demo.sovereign.actions.a3Impact'), status: 'approved' },
                              ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                  <Sparkles size={14} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12px] text-white font-medium">{item.action}</p>
                                    <span className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.impactLabel')}: {item.impact}</span>
                                  </div>
                                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                                    item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                  }`}>
                                    {getActionStatusLabel(item.status)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex gap-3">
                              <button className="px-4 py-2 rounded bg-white/10 text-white text-[11px] font-semibold hover:bg-white/15 transition-colors">{t('hero.annotations.accept')}</button>
                              <button className="px-4 py-2 rounded bg-white/[0.04] text-[#8B9DAF] text-[11px] font-semibold hover:bg-white/[0.08] transition-colors">{t('hero.annotations.modify')}</button>
                              <button className="px-4 py-2 rounded bg-white/[0.04] text-[#8B9DAF] text-[11px] font-semibold hover:bg-white/[0.08] transition-colors">{t('hero.annotations.explain')}</button>
                            </div>
                          </div>
                        </div>
                        {/* Annotation legend */}
                        <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-white/[0.04]">
                          <AnnotationBadge letter="A" label={t('hero.annotations.sovereign.a')} />
                          <AnnotationBadge letter="B" label={t('hero.annotations.sovereign.b')} />
                          <AnnotationBadge letter="C" label={t('hero.annotations.sovereign.c')} />
                        </div>
                      </motion.div>
                    )}

                    {heroTab === 'carbon' && (
                      <motion.div
                        key="carbon-demo"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="p-5 md:p-6"
                      >
                        {/* Carbon-Aware Logic — Hub Dashboard with Annotations */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Leaf size={14} className="text-emerald-400" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400 font-[family-name:var(--font-space-mono)]">{t('demo.carbon.schedulerTitle')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.carbon.liveGridData')}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Left: Top hub detail */}
                          <div className="md:col-span-1 space-y-3">
                            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 relative">
                              <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">A</span>
                              <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-2">{t('demo.carbon.bestHubLive')}</p>
                              <p className="text-[14px] font-bold text-white">{t('demo.carbon.bestHubName')}</p>
                              <p className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)] mt-1">{t('demo.carbon.bestHubDetail')}</p>
                            </div>
                            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 relative">
                              <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">B</span>
                              <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-2">{t('demo.carbon.gridCarbonNow')}</p>
                              <p className="text-2xl font-bold text-emerald-400 stat-mono">47</p>
                              <p className="text-[10px] text-[#999999]">{t('demo.carbon.gco2kwhAvg')}</p>
                              <div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: '81.5%' }} />
                              </div>
                            </div>
                          </div>
                          {/* Right: Hub list */}
                          <div className="md:col-span-2 space-y-2 max-h-[300px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                            {CARBON_HUBS.map((hub) => (
                              <div key={hub.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 relative">
                                {/* Annotation C on first hub */}
                                {hub.name === 'Harch Ouarzazate' && (
                                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">C</span>
                                )}
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${
                                      hub.status === 'optimal' ? 'bg-emerald-400' :
                                      hub.status === 'degraded' ? 'bg-amber-400' : 'bg-red-400'
                                    }`} />
                                    <span className="text-[12px] font-semibold text-white">{hub.name}</span>
                                  </div>
                                  <span className={`text-[10px] font-bold font-[family-name:var(--font-space-mono)] px-2 py-0.5 rounded ${
                                    hub.carbon < 30 ? 'bg-emerald-500/10 text-emerald-400' :
                                    hub.carbon < 60 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                                  }`}>
                                    {hub.carbon} gCO2/kWh
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-[10px]">
                                  <div>
                                    <span className="text-[#666666]">{t('demo.carbon.renewable')}</span>
                                    <p className="text-white font-bold font-[family-name:var(--font-space-mono)]">{hub.renewable}%</p>
                                  </div>
                                  <div>
                                    <span className="text-[#666666]">{t('demo.carbon.gpus')}</span>
                                    <p className="text-white font-bold font-[family-name:var(--font-space-mono)]">{hub.gpus}</p>
                                  </div>
                                  <div>
                                    <span className="text-[#666666]">{t('demo.carbon.type')}</span>
                                    <p className="text-white font-bold">{hub.type}</p>
                                  </div>
                                  <div>
                                    <span className="text-[#666666]">{t('demo.carbon.latency')}</span>
                                    <p className="text-white font-bold font-[family-name:var(--font-space-mono)]">{hub.latency}</p>
                                  </div>
                                </div>
                                <div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                      width: `${Math.min((hub.renewable), 100)}%`,
                                      backgroundColor: hub.renewable > 80 ? '#10B981' : hub.renewable > 50 ? '#F59E0B' : '#EF4444',
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Annotation legend */}
                        <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-white/[0.04]">
                          <AnnotationBadge letter="A" label={t('hero.annotations.carbon.a')} />
                          <AnnotationBadge letter="B" label={t('hero.annotations.carbon.b')} />
                          <AnnotationBadge letter="C" label={t('hero.annotations.carbon.c')} />
                        </div>
                      </motion.div>
                    )}

                    {heroTab === 'automation' && (
                      <motion.div
                        key="automation-demo"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="p-5 md:p-6"
                      >
                        {/* Automation — Workflow Builder with Annotations */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Workflow size={14} className="text-[#8B5CF6]" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B5CF6] font-[family-name:var(--font-space-mono)]">{t('demo.automation.workflowEngine')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.automation.workflowCount')}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Left: Workflow sidebar */}
                          <div className="md:col-span-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 relative">
                            <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">A</span>
                            <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.automation.activeWorkflows')}</p>
                            <div className="space-y-2">
                              {AUTOMATION_WORKFLOWS.slice(0, 3).map((wf) => (
                                <div key={wf.id} className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${wf.status === 'running' ? 'bg-[#8B5CF6] animate-pulse' : 'bg-[#555555]'}`} />
                                  <span className="text-[11px] text-white font-medium truncate">{wf.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Right: Workflow diagram */}
                          <div className="md:col-span-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 relative">
                            <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white z-10">B</span>
                            <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.automation.pipelineTitle')}</p>
                            <div className="space-y-2">
                              {[
                                { label: t('demo.automation.steps.s1Label'), detail: t('demo.automation.steps.s1Detail'), done: true },
                                { label: t('demo.automation.steps.s2Label'), detail: t('demo.automation.steps.s2Detail'), done: true },
                                { label: t('demo.automation.steps.s3Label'), detail: t('demo.automation.steps.s3Detail'), done: true },
                                { label: t('demo.automation.steps.s4Label'), detail: t('demo.automation.steps.s4Detail'), done: true },
                                { label: t('demo.automation.steps.s5Label'), detail: t('demo.automation.steps.s5Detail'), done: false },
                                { label: t('demo.automation.steps.s6Label'), detail: t('demo.automation.steps.s6Detail'), done: false },
                              ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-[9px] font-bold ${
                                    step.done ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.04] text-[#666666]'
                                  }`}>
                                    {step.done ? '\u2713' : (i + 1)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] font-medium ${step.done ? 'text-white' : 'text-[#666666]'}`}>{step.label}</p>
                                    <p className="text-[9px] text-[#555555]">{step.detail}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Annotation legend */}
                        <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-white/[0.04]">
                          <AnnotationBadge letter="A" label={t('hero.annotations.automation.a')} />
                          <AnnotationBadge letter="B" label={t('hero.annotations.automation.b')} />
                          <AnnotationBadge letter="C" label={t('hero.annotations.automation.c')} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTORS — Palantir "Solving complex problems across all industries" Style
          Dark bg #1E1E2E, headline left, numbered sector list right
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E1E2E] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
            {/* Left: Headline + CTA */}
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-8">
                  {t('sectors.title')}
                </h2>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded border border-white text-white text-[13px] font-semibold hover:bg-white/[0.08] transition-colors">
                  {t('sectors.cta')}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </FadeIn>

            {/* Right: Numbered sector list */}
            <FadeIn delay={0.15}>
              <div>
                {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => (
                  <motion.div
                    key={num}
                    className="group flex items-center gap-4 py-3.5 border-b border-white/[0.08] hover:bg-white/[0.03] transition-colors cursor-pointer px-2 -mx-2 rounded"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[13px] font-bold font-[family-name:var(--font-space-mono)] text-[#555555] w-8 shrink-0">
                      {String(num).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-semibold text-[#999999] uppercase tracking-[0.08em] group-hover:text-white transition-colors">
                      {t(`sectors.items.s${num}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: WORKFLOW BUILDER — White bg, Palantir "Designed for AI workflow builders"
          VIDEO/DETAILS toggle, feature cards in DETAILS mode
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Progress indicator */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-12 font-[family-name:var(--font-space-mono)]">
              {PROGRESS_STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setWorkflowStep(i)}
                  className="flex items-center gap-2"
                >
                  <span className={`text-[11px] font-bold ${
                    i === workflowStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'
                  }`}>
                    {i === workflowStep ? `[${step.id}]` : step.id}
                  </span>
                  {i < PROGRESS_STEPS.length - 1 && (
                    <span className={`text-[11px] ${i < workflowStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'}`}>&mdash;</span>
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Headline */}
            <FadeIn>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
                  {t('features.title')} /0.2
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1A1A2E] tracking-[-0.02em] leading-[1.1] mb-6">
                  {t('workflow.title')}
                </h2>
                <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
                <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                  {t('workflow.description')}
                </p>
                <div className="space-y-3">
                  {[
                    t('workflow.check1'),
                    t('workflow.check2'),
                    t('workflow.check3'),
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#8B9DAF] shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#555555]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: VIDEO/DETAILS toggle + container */}
            <FadeIn delay={0.15}>
              <div>
                <div className="flex items-center gap-1 mb-4">
                  <button
                    onClick={() => setWorkflowMediaTab('video')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      workflowMediaTab === 'video' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {t('workflow.videoTab')}
                  </button>
                  <button
                    onClick={() => setWorkflowMediaTab('details')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      workflowMediaTab === 'details' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {t('workflow.detailsTab')}
                  </button>
                </div>
                <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] overflow-hidden min-h-[340px]">
                  <AnimatePresence mode="wait">
                    {workflowMediaTab === 'video' ? (
                      <motion.div
                        key="wf-video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[340px] bg-[#1E1E2E] p-0"
                      >
                        {/* Pipeline Builder Interface Mockup */}
                        <div className="flex h-full min-h-[340px]">
                          {/* Sidebar */}
                          <div className="w-[180px] border-r border-white/[0.06] p-3 shrink-0 hidden md:block">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-[#555555] uppercase mb-3 font-[family-name:var(--font-space-mono)]">HarchOS</p>
                            {[
                              { label: t('workflow.video.sidebar.overview'), active: false },
                              { label: t('workflow.video.sidebar.pipeline'), active: true },
                              { label: t('workflow.video.sidebar.carbon'), active: false },
                              { label: t('workflow.video.sidebar.workflows'), active: false },
                              { label: t('workflow.video.sidebar.apiDocs'), active: false },
                            ].map((item, i) => (
                              <div key={i} className={`px-2.5 py-1.5 rounded text-[11px] mb-0.5 cursor-pointer ${
                                item.active ? 'bg-white/[0.08] text-white font-semibold' : 'text-[#666666] hover:text-[#999999]'
                              }`}>
                                {item.label}
                              </div>
                            ))}
                          </div>
                          {/* Main content */}
                          <div className="flex-1 p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] font-semibold text-white">{t('workflow.video.pipelineBuilder')}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] font-bold font-[family-name:var(--font-space-mono)]">LIVE</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('workflow.video.resources')}</span>
                                <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('workflow.video.generation')}</span>
                              </div>
                            </div>
                            {/* Pipeline nodes */}
                            <div className="space-y-2">
                              {[
                                { name: t('workflow.video.nodes.ingest'), type: t('workflow.video.nodes.ingestType'), status: 'active', icon: Database },
                                { name: t('workflow.video.nodes.transform'), type: t('workflow.video.nodes.transformType'), status: 'active', icon: Brain },
                                { name: t('workflow.video.nodes.schedule'), type: t('workflow.video.nodes.scheduleType'), status: 'active', icon: Leaf },
                                { name: t('workflow.video.nodes.deploy'), type: t('workflow.video.nodes.deployType'), status: 'pending', icon: Zap },
                              ].map((node, i) => (
                                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                                  <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                                    node.status === 'active' ? 'bg-[#8B5CF6]/10' : 'bg-white/[0.04]'
                                  }`}>
                                    <node.icon size={14} className={node.status === 'active' ? 'text-[#8B5CF6]' : 'text-[#555555]'} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-semibold text-white">{node.name}</p>
                                    <p className="text-[9px] text-[#555555] font-[family-name:var(--font-space-mono)]">{node.type}</p>
                                  </div>
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${node.status === 'active' ? 'bg-emerald-400' : 'bg-[#555555]'}`} />
                                </div>
                              ))}
                            </div>
                            {/* Pipeline stats */}
                            <div className="mt-3 flex gap-4 pt-3 border-t border-white/[0.04]">
                              <div>
                                <span className="text-[9px] text-[#555555]">{t('workflow.video.stats.throughput')}</span>
                                <p className="text-[12px] font-bold text-white font-[family-name:var(--font-space-mono)]">5.2K/s</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-[#555555]">{t('workflow.video.stats.latency')}</span>
                                <p className="text-[12px] font-bold text-white font-[family-name:var(--font-space-mono)]">&lt;50ms</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-[#555555]">{t('workflow.video.stats.carbonSaved')}</span>
                                <p className="text-[12px] font-bold text-emerald-400 font-[family-name:var(--font-space-mono)]">-1.2t</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="wf-details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 min-h-[340px]"
                      >
                        <div className="space-y-4">
                          {workflowFeatureCards.map((card, i) => (
                            <div key={i} className="rounded-lg border border-[#E5E5E5] bg-white p-5">
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] flex items-center justify-center shrink-0">
                                  <card.icon size={18} className="text-[#8B9DAF]" />
                                </div>
                                <div>
                                  <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-1">{card.title}</h4>
                                  <p className="text-[13px] text-[#666666] leading-[1.6]">{card.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: EVALUATE AND SHIP — Light gray bg, Palantir "Evaluate and ship with confidence"
          VIDEO/DETAILS toggle, feature cards in DETAILS mode
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F7F8] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Progress indicator */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-12 font-[family-name:var(--font-space-mono)]">
              {PROGRESS_STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setEvaluateStep(i)}
                  className="flex items-center gap-2"
                >
                  <span className={`text-[11px] font-bold ${
                    i === evaluateStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'
                  }`}>
                    {i === evaluateStep ? `[${step.id}]` : step.id}
                  </span>
                  {i < PROGRESS_STEPS.length - 1 && (
                    <span className={`text-[11px] ${i < evaluateStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'}`}>&mdash;</span>
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Headline */}
            <FadeIn>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
                  {t('features.security.title')} /0.3
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1A1A2E] tracking-[-0.02em] leading-[1.1] mb-6">
                  {t('evaluate.title')}
                </h2>
                <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
                <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                  {t('evaluate.description')}
                </p>
                <div className="space-y-3">
                  {[
                    t('evaluate.check1'),
                    t('evaluate.check2'),
                    t('evaluate.check3'),
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#8B9DAF] shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#555555]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: VIDEO/DETAILS toggle + container */}
            <FadeIn delay={0.15}>
              <div>
                <div className="flex items-center gap-1 mb-4">
                  <button
                    onClick={() => setEvaluateMediaTab('video')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      evaluateMediaTab === 'video' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    {t('evaluate.videoTab')}
                  </button>
                  <button
                    onClick={() => setEvaluateMediaTab('details')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      evaluateMediaTab === 'details' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    {t('evaluate.detailsTab')}
                  </button>
                </div>
                <div className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden min-h-[340px]">
                  <AnimatePresence mode="wait">
                    {evaluateMediaTab === 'video' ? (
                      <motion.div
                        key="ev-video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[340px] bg-[#1E1E2E] p-0"
                      >
                        {/* Monitoring Dashboard Interface Mockup */}
                        <div className="flex h-full min-h-[340px]">
                          {/* Sidebar */}
                          <div className="w-[180px] border-r border-white/[0.06] p-3 shrink-0 hidden md:block">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-[#555555] uppercase mb-3 font-[family-name:var(--font-space-mono)]">HarchOS</p>
                            {[
                              { label: t('evaluate.video.sidebar.overview'), active: false },
                              { label: t('evaluate.video.sidebar.monitoring'), active: true },
                              { label: t('evaluate.video.sidebar.alerts'), active: false },
                              { label: t('evaluate.video.sidebar.compliance'), active: false },
                              { label: t('evaluate.video.sidebar.auditLog'), active: false },
                            ].map((item, i) => (
                              <div key={i} className={`px-2.5 py-1.5 rounded text-[11px] mb-0.5 cursor-pointer ${
                                item.active ? 'bg-white/[0.08] text-white font-semibold' : 'text-[#666666] hover:text-[#999999]'
                              }`}>
                                {item.label}
                              </div>
                            ))}
                          </div>
                          {/* Main content */}
                          <div className="flex-1 p-4">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[12px] font-semibold text-white">{t('evaluate.video.monitoringDashboard')}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold font-[family-name:var(--font-space-mono)]">HEALTHY</span>
                            </div>
                            {/* Metrics grid */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {[
                                { label: t('evaluate.video.metrics.uptime'), value: '99.999%', color: 'text-emerald-400' },
                                { label: t('evaluate.video.metrics.latency'), value: '<5ms', color: 'text-white' },
                                { label: t('evaluate.video.metrics.sovereignScore'), value: '98/100', color: 'text-[#8B5CF6]' },
                              ].map((metric, i) => (
                                <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2.5">
                                  <p className="text-[9px] text-[#555555] mb-1">{metric.label}</p>
                                  <p className={`text-[14px] font-bold font-[family-name:var(--font-space-mono)] ${metric.color}`}>{metric.value}</p>
                                </div>
                              ))}
                            </div>
                            {/* Alert feed */}
                            <p className="text-[9px] text-[#555555] uppercase tracking-wider font-bold mb-2">{t('evaluate.video.recentAlerts')}</p>
                            <div className="space-y-1.5">
                              {[
                                { msg: t('evaluate.video.alerts.a1'), time: '2m ago', severity: 'ok' },
                                { msg: t('evaluate.video.alerts.a2'), time: '8m ago', severity: 'ok' },
                                { msg: t('evaluate.video.alerts.a3'), time: '15m ago', severity: 'warn' },
                              ].map((alert, i) => (
                                <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded bg-white/[0.02] border border-white/[0.03]">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                    alert.severity === 'ok' ? 'bg-emerald-400' : 'bg-amber-400'
                                  }`} />
                                  <p className="text-[10px] text-[#999999] flex-1 truncate">{alert.msg}</p>
                                  <span className="text-[9px] text-[#555555] font-[family-name:var(--font-space-mono)] shrink-0">{alert.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ev-details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 min-h-[340px]"
                      >
                        <div className="space-y-4">
                          {evaluateFeatureCards.map((card, i) => (
                            <div key={i} className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-5">
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#F0F0F0] flex items-center justify-center shrink-0">
                                  <card.icon size={18} className="text-[#8B9DAF]" />
                                </div>
                                <div>
                                  <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-1">{card.title}</h4>
                                  <p className="text-[13px] text-[#666666] leading-[1.6]">{card.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: CAPABILITIES — Light bg, numbered feature list
          ═══════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('features.title')} /0.4
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1A1A2E] tracking-[-0.02em] leading-[1.1] mb-4">
              {t('capabilities.title')}
            </h2>
            <div className="w-16 h-0.5 bg-[#8B9DAF] mb-12" />
          </FadeIn>

          <div className="space-y-0">
            {capabilitiesList.map((cap, i) => (
              <FadeIn key={cap.number} delay={i * 0.08}>
                <div className="py-8 border-b border-[#E5E5E5] last:border-0 group">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[14px] font-bold text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">/{cap.number}</span>
                      <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                        <cap.icon size={18} className="text-[#8B9DAF]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 group-hover:text-[#8B9DAF] transition-colors">{cap.title}</h3>
                      <p className="text-[14px] text-[#666666] leading-[1.7] max-w-2xl">{cap.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: ARCHITECTURE — SENSE / THINK / ACT (Light bg, restyled)
          ═══════════════════════════════════════════════════════════ */}
      <section id="architecture" className="bg-[#F7F7F8] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('architecture.title')} /0.5
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1A1A2E] tracking-[-0.02em] leading-[1.1] mb-4">
              {t('architecture.sense.title')}. {t('architecture.think.title')}. {t('architecture.act.title')}.
            </h2>
            <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
            <p className="max-w-2xl text-[15px] text-[#666666] leading-[1.7] mb-12">
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
                        ? 'bg-white border-[#E5E5E5] text-[#1A1A2E] shadow-sm'
                        : 'border-transparent text-[#999999] hover:text-[#1A1A2E] hover:bg-white/60'
                    }`}
                  >
                    <layer.icon size={18} style={{ color: layer.color }} />
                    <div>
                      <p className="text-sm font-bold">{layer.name}</p>
                      <p className="text-[10px] text-[#999999] font-[family-name:var(--font-space-mono)]">{layer.tag}</p>
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
                  className="bg-white rounded-xl border border-[#E5E5E5] p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activeArch.color}15` }}>
                      <activeArch.icon size={20} style={{ color: activeArch.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1A1A2E]">{activeArch.name}</h3>
                      <p className="text-[11px] text-[#999999] font-[family-name:var(--font-space-mono)]">{activeArch.tag}</p>
                    </div>
                  </div>
                  <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                    {activeArch.description}
                  </p>
                  <div className="space-y-4">
                    {activeArch.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center py-2.5 border-b border-[#F0F0F0] last:border-0">
                        <span className="text-[13px] text-[#999999]">{spec.label}</span>
                        <span className="text-[13px] font-bold text-[#1A1A2E] font-[family-name:var(--font-space-mono)]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: SPEC TABLE — Clean 3-column table on white bg
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('specs.title')} /0.6
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1A1A2E] tracking-[-0.01em] mb-4">
              {t('specs.title')}
            </h2>
            <div className="w-16 h-0.5 bg-[#8B9DAF] mb-12" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specs.map((category) => (
                <div key={category.category} className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E5E5E5] bg-white">
                    <h3 className="text-[14px] font-bold text-[#1A1A2E]">{category.category}</h3>
                  </div>
                  <div className="p-6 space-y-0">
                    {category.items.map((item) => (
                      <div key={item.spec} className="flex justify-between items-center py-3 border-b border-[#F0F0F0] last:border-0">
                        <span className="text-[13px] text-[#999999]">{item.spec}</span>
                        <span className="text-[13px] font-bold text-[#1A1A2E] font-[family-name:var(--font-space-mono)]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: SECURITY & COMPLIANCE — Light bg
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F7F8] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {tCommon('security')} /0.7
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1A1A2E] tracking-[-0.01em] mb-4">
              {t('features.security.title')} & {t('features.compliance.title')}
            </h2>
            <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
            <p className="max-w-2xl text-[15px] text-[#666666] leading-[1.7] mb-16">
              {t('features.security.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                      <feat.icon size={18} className="text-[#8B9DAF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">{feat.title}</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-[#E5E5E5] mb-4" />
                  <p className="text-[14px] text-[#666666] leading-[1.7]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Compliance Badges */}
          <FadeIn>
            <div className="mt-12 flex flex-wrap gap-3">
              {['GDPR', 'ISO 27001', 'SOC 2 Type II', 'Law 09-08', 'FIPS 140-2 L3', 'TLS 1.3'].map((cert) => (
                <span key={cert} className="px-4 py-2 rounded-lg bg-white border border-[#E5E5E5] text-[11px] font-semibold text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                  {cert}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: DEVELOPER PLATFORM — Code snippet preview (restyled light)
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('features.api.title')} /0.8
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1A1A2E] tracking-[-0.01em] mb-4">
              {t('features.api.title')} & {t('features.mobile.title')}
            </h2>
            <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
            <p className="max-w-2xl text-[15px] text-[#666666] leading-[1.7] mb-16">
              {t('features.api.description')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {devPlatform.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#E5E5E5]">
                      <feat.icon size={18} className="text-[#8B9DAF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">{feat.title}</h3>
                  </div>
                  <p className="text-[14px] text-[#666666] leading-[1.7]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Code snippet */}
          <FadeIn>
            <div className="bg-[#1E1E2E] rounded-xl border border-[#2A2A3E] overflow-hidden">
              <div className="flex items-center gap-1.5 px-6 py-4 border-b border-[#2A2A3E]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                <span className="ml-4 text-[11px] text-[#5C6370] font-[family-name:var(--font-space-mono)]">harchos-sdk.py</span>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-[13px] leading-[1.8] font-[family-name:var(--font-space-mono)]">
                  <span className="text-[#C678DD]">from</span> <span className="text-[#E5C07B]">harchos</span> <span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">HarchOSClient</span>{'\n'}
                  {'\n'}
                  <span className="text-[#5C6370]"># Initialize sovereign AI client</span>{'\n'}
                  <span className="text-[#E5C07B]">client</span> = <span className="text-[#E5C07B]">HarchOSClient</span>(<span className="text-[#98C379]">region=&quot;ouarzazate&quot;</span>){'\n'}
                  {'\n'}
                  <span className="text-[#5C6370]"># Deploy with carbon-aware scheduling</span>{'\n'}
                  <span className="text-[#E5C07B]">job</span> = <span className="text-[#E5C07B]">client</span>.<span className="text-[#61AFEF]">deploy</span>({'\n'}
                  {'    '}<span className="text-[#98C379]">model=&quot;llama-3.1-70b&quot;</span>,{'\n'}
                  {'    '}<span className="text-[#98C379]">carbon_threshold=</span><span className="text-[#D19A66]">50</span>,{'\n'}
                  {'    '}<span className="text-[#98C379]">sovereign=True</span>,{'\n'}
                  {'    '}<span className="text-[#98C379]">gpus=</span><span className="text-[#D19A66]">8</span>,{'\n'}
                  ){'\n'}
                  {'\n'}
                  <span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Deployed to </span><span className="text-[#E06C75]">{'{job.hub}'}</span><span className="text-[#98C379]"> at </span><span className="text-[#E06C75]">{'{job.carbon_intensity}'}</span><span className="text-[#98C379]"> gCO2/kWh&quot;</span>)
                </pre>
                <p className="mt-1 text-[#5C6370]">{t('devPlatform.codeComment')}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: COMPETITIVE COMPARISON — Keep existing component
          ═══════════════════════════════════════════════════════════ */}
      <CompetitiveComparison
        title={t('competitive.title')}
        subtitle={t('competitive.subtitle')}
        accentColor="#8B9DAF"
        sectionLabel={t('competitive.title')}
        harchName={t('competitive.harchName')}
        competitors={competitors}
      />

      {/* ═══════════════════════════════════════════════════════════
          BUILD NOW WITH HarchOS — Palantir "Build now with AIP" Style
          Dark bg #1E1E2E, centered headline, two cards
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E1E2E] py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-12 text-center">
              {t('buildNow.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="relative rounded-xl border border-white/[0.12] bg-white/[0.04] p-8 md:p-10 h-full hover:border-white/25 transition-all group">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">01</p>
                <h3 className="text-2xl md:text-[28px] font-bold text-white mb-4 group-hover:text-[#8B9DAF] transition-colors">
                  {t('buildNow.build.title')}
                </h3>
                <p className="text-[14px] text-[#999999] leading-[1.7] mb-8">
                  {t('buildNow.build.desc')}
                </p>
                <div className="absolute bottom-8 right-8">
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/[0.08] transition-all">
                    <ArrowUpRight size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative rounded-xl border border-white/[0.12] bg-white/[0.04] p-8 md:p-10 h-full hover:border-white/25 transition-all group">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">02</p>
                <h3 className="text-2xl md:text-[28px] font-bold text-white mb-4 group-hover:text-[#8B9DAF] transition-colors">
                  {t('buildNow.explore.title')}
                </h3>
                <p className="text-[14px] text-[#999999] leading-[1.7] mb-8">
                  {t('buildNow.explore.desc')}
                </p>
                <div className="absolute bottom-8 right-8">
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/[0.08] transition-all">
                    <ArrowUpRight size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HARCHOS PAGE FOOTER — Palantir comprehensive footer style
          Darkest bg #0A0A0A, left sidebar + 4-column grid
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-12 lg:gap-16">
            {/* Left sidebar: Logo, copyright, regions, social */}
            <FadeIn>
              <div>
                <p className="text-xl font-bold text-white mb-6 tracking-[-0.01em]">Harch Corp</p>
                <p className="text-[12px] text-[#666666] leading-[1.7] mb-4">
                  {t('pageFooter.copyright')}
                </p>
                <p className="text-[12px] text-[#999999] font-bold tracking-[0.15em] mb-8 font-[family-name:var(--font-space-mono)]">
                  {t('pageFooter.regions')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['youtube', 'x', 'linkedin', 'github'] as const).map((social) => (
                    <span
                      key={social}
                      className="px-3 py-1.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] font-bold text-[#999999] tracking-[0.1em] hover:text-white hover:border-[#555555] transition-colors cursor-pointer"
                    >
                      {t(`pageFooter.social.${social}`)}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: 4-column grid */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Column 1: Offerings */}
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-white mb-4 font-[family-name:var(--font-space-mono)]">
                    {t('pageFooter.offerings.title')}
                  </p>
                  <ul className="space-y-2.5">
                    {Array.from({ length: 11 }, (_, i) => i + 1).map((idx) => (
                      <li key={idx}>
                        <span className="text-[12px] text-[#888888] hover:text-white transition-colors cursor-pointer leading-[1.6]">
                          {t(`pageFooter.offerings.items.i${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Impact Studies */}
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-white mb-4 font-[family-name:var(--font-space-mono)]">
                    {t('pageFooter.impactStudies.title')}
                  </p>
                  <ul className="space-y-2.5">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((idx) => (
                      <li key={idx}>
                        <span className="text-[12px] text-[#888888] hover:text-white transition-colors cursor-pointer leading-[1.6]">
                          {t(`pageFooter.impactStudies.items.i${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Capabilities */}
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-white mb-4 font-[family-name:var(--font-space-mono)]">
                    {t('pageFooter.capabilities.title')}
                  </p>
                  <ul className="space-y-2.5">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((idx) => (
                      <li key={idx}>
                        <span className="text-[12px] text-[#888888] hover:text-white transition-colors cursor-pointer leading-[1.6]">
                          {t(`pageFooter.capabilities.items.i${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Documents */}
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-white mb-4 font-[family-name:var(--font-space-mono)]">
                    {t('pageFooter.documents.title')}
                  </p>
                  <ul className="space-y-2.5">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((idx) => (
                      <li key={idx}>
                        <span className="text-[12px] text-[#888888] hover:text-white transition-colors cursor-pointer leading-[1.6]">
                          {t(`pageFooter.documents.items.i${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Back to Intelligence link */}
          <FadeIn delay={0.2}>
            <div className="mt-16 pt-8 border-t border-[#1A1A1A] flex justify-center">
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2 text-[13px] text-[#666666] hover:text-[#999999] transition-colors">
                <ArrowLeft size={14} /> {tCommon('back')} Intelligence
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FULL-SCREEN NAVIGATION OVERLAY — Palantir 3-Column Style
          Left: NAVIGATION (platform links with chevrons)
          Center: LATEST NEWS (news cards)
          Right: OFFERINGS (description + links)
          Dark bg #1E1E1E, exactly like IMG_0177/0178
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#1E1E1E] overflow-y-auto"
          >
            {/* Top bar — Palantir style: logo left, Get Started + search/X right */}
            <div className="border-b border-white/[0.08]">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-14">
                <span className="text-[15px] font-bold text-white tracking-[-0.01em]">Harch Corp</span>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-1.5 rounded border border-white text-white text-[11px] font-semibold hover:bg-white/[0.08] transition-colors">
                    {t('navOverlay.getStarted')}
                  </button>
                  <Search size={16} className="text-white/60" />
                  <button onClick={() => setNavOpen(false)} className="text-white/60 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3-Column Grid — EXACTLY like Palantir IMG_0177 */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-white/[0.08]">

                {/* ═══ LEFT COLUMN: NAVIGATION ═══ */}
                <div className="pr-0 md:pr-8 pb-8 md:pb-0">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[#666666] mb-6 font-[family-name:var(--font-space-mono)]">
                    {t('navOverlay.navigation')}
                  </p>

                  {/* Main platform link — "Generate Alpha" equivalent */}
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06] group cursor-pointer hover:bg-white/[0.02] transition-colors px-1 -mx-1">
                    <span className="text-[18px] font-semibold text-white">{t('navOverlay.nav.generateAlpha')}</span>
                    <ChevronRight size={16} className="text-[#555555] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Platform items with chevrons */}
                  {['aip', 'foundry', 'gotham', 'ontology', 'apollo'].map((item) => (
                    <div key={item} className="flex items-center justify-between py-3 border-b border-white/[0.06] group cursor-pointer hover:bg-white/[0.02] transition-colors px-1 -mx-1">
                      <span className="text-[18px] font-semibold text-white">{t(`navOverlay.nav.${item}`)}</span>
                      <ChevronRight size={16} className="text-[#555555] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}

                  {/* Secondary nav items — no chevrons */}
                  <div className="mt-2">
                    {['offerings', 'impactStudies'].map((item) => (
                      <div key={item} className="py-3 border-b border-white/[0.06] group cursor-pointer hover:bg-white/[0.02] transition-colors px-1 -mx-1">
                        <span className="text-[18px] font-semibold text-white">{t(`navOverlay.nav.${item}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═══ CENTER COLUMN: LATEST NEWS ═══ */}
                <div className="px-0 md:px-8 py-8 md:py-0 border-t md:border-t-0 border-white/[0.06]">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#666666] font-[family-name:var(--font-space-mono)]">
                      {t('navOverlay.latestNews')}
                    </p>
                    <Link href="/newsroom" className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition-colors">
                      {t('navOverlay.newsroom')} <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* News Card 1 */}
                  <div className="mb-6 group cursor-pointer">
                    <p className="text-[10px] font-bold tracking-[0.1em] text-[#666666] mb-3 font-[family-name:var(--font-space-mono)]">
                      {t('navOverlay.news.card1Source')}
                    </p>
                    <div className="w-full h-[180px] rounded-lg bg-[#2A2A3E] mb-4 overflow-hidden flex items-center justify-center">
                      <div className="text-center px-4">
                        <Cpu size={32} className="text-[#8B5CF6] mx-auto mb-2" />
                        <p className="text-[12px] text-[#999999]">{t('navOverlay.news.card1ImageAlt')}</p>
                      </div>
                    </div>
                    <h3 className="text-[16px] font-bold text-white mb-2 group-hover:text-[#8B9DAF] transition-colors leading-[1.3]">
                      {t('navOverlay.news.card1Title')}
                    </h3>
                    <p className="text-[13px] text-[#999999] leading-[1.6]">
                      {t('navOverlay.news.card1Desc')}
                    </p>
                  </div>

                  {/* News Card 2 */}
                  <div className="group cursor-pointer">
                    <p className="text-[10px] font-bold tracking-[0.1em] text-[#666666] mb-3 font-[family-name:var(--font-space-mono)]">
                      {t('navOverlay.news.card2Source')}
                    </p>
                    <div className="w-full h-[180px] rounded-lg bg-[#2A2A3E] mb-4 overflow-hidden flex items-center justify-center">
                      <div className="text-center px-4">
                        <Server size={32} className="text-[#8B9DAF] mx-auto mb-2" />
                        <p className="text-[12px] text-[#999999]">{t('navOverlay.news.card2ImageAlt')}</p>
                      </div>
                    </div>
                    <h3 className="text-[16px] font-bold text-white mb-2 group-hover:text-[#8B9DAF] transition-colors leading-[1.3]">
                      {t('navOverlay.news.card2Title')}
                    </h3>
                    <p className="text-[13px] text-[#999999] leading-[1.6]">
                      {t('navOverlay.news.card2Desc')}
                    </p>
                  </div>
                </div>

                {/* ═══ RIGHT COLUMN: OFFERINGS ═══ */}
                <div className="pl-0 md:pl-8 pt-8 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#666666] font-[family-name:var(--font-space-mono)]">
                      {t('navOverlay.offerings')}
                    </p>
                    <Link href="/subsidiaries" className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition-colors">
                      {t('navOverlay.viewAllOfferings')} <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">
                    {t('navOverlay.offeringsDesc')}
                  </p>
                  <Link href="/intelligence/harchos" className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-[#8B9DAF] transition-colors">
                    {t('navOverlay.learnMoreAIP')} <ChevronRight size={16} />
                  </Link>
                </div>

              </div>
            </div>

            {/* ═══ BOTTOM: IMPACT STUDY — Palantir IMG_0178 style ═══ */}
            <div className="border-t border-white/[0.08]">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-10">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[11px] font-bold tracking-[0.15em] text-[#666666] font-[family-name:var(--font-space-mono)]">
                    {t('navOverlay.impactStudy')}
                  </p>
                  <Link href="/case-studies" className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition-colors">
                    {t('navOverlay.viewAllImpactStudies')} <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Impact heading + description */}
                  <div>
                    <h3 className="text-[24px] md:text-[32px] font-bold text-white mb-4 leading-[1.15]">
                      {t('navOverlay.impactTitle')}
                    </h3>
                    <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">
                      {t('navOverlay.impactDesc')}
                    </p>
                    <Link href="/case-studies/ouarzazate" className="inline-flex items-center gap-2 text-[13px] font-semibold text-white hover:text-[#8B9DAF] transition-colors">
                      {t('navOverlay.readMore')} <ArrowRight size={14} />
                    </Link>
                  </div>
                  {/* Right: Impact image */}
                  <div className="rounded-lg overflow-hidden bg-[#2A2A3E] min-h-[220px] flex items-center justify-center">
                    <div className="text-center px-4">
                      <Sun size={40} className="text-emerald-400/60 mx-auto mb-2" />
                      <p className="text-[12px] text-[#666666]">{t('navOverlay.impactImageAlt')}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-[#666666] mt-4 italic">
                  {t('navOverlay.impactCaption')}
                </p>
              </div>
            </div>

            {/* ═══ BOTTOM FOOTER LINKS — Palantir IMG_0178 right sidebar style ═══ */}
            <div className="border-t border-white/[0.08]">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-8">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {['about', 'blog', 'investorRelations', 'lettersCeo', 'privacy', 'infoSecurity', 'cloudPartners', 'learning', 'customerSuccess', 'store', 'contact'].map((item) => (
                    <span key={item} className="text-[13px] text-[#888888] hover:text-white transition-colors cursor-pointer">
                      {t(`navOverlay.bottomLinks.${item}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
