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
  CpuIcon, Users, ChevronRight, ExternalLink, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompetitiveComparison from '@/components/competitive/CompetitiveComparison';
import { FadeIn, AnimatedCounter } from '@/components/ui/motion';
import type { Competitor } from '@/components/competitive/CompetitiveComparison';

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');
  const tCommon = useTranslations('common');

  /* ─── State ─── */
  const [heroTab, setHeroTab] = useState<'sovereign' | 'carbon' | 'automation'>('carbon');
  const [activeArchTab, setActiveArchTab] = useState('sense');
  const [workflowMediaTab, setWorkflowMediaTab] = useState<'video' | 'diagram'>('video');
  const [evaluateMediaTab, setEvaluateMediaTab] = useState<'video' | 'diagram'>('diagram');
  const [workflowStep, setWorkflowStep] = useState(1);
  const [evaluateStep, setEvaluateStep] = useState(2);

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

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Palantir AIP "Beyond Chat" Style
          Dark bg #1A1A2E, headline left, numbered tabs right
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] bg-[#1A1A2E] overflow-hidden flex flex-col">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full pt-24 pb-8">
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
                <p className="text-xl md:text-2xl text-[#8B9DAF] font-light tracking-[-0.01em] mb-8">
                  {t('hero.subheadline')}
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

            {/* Right: Feature Tabs */}
            <FadeIn delay={0.15}>
              <div>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {heroTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroTab(tab.id)}
                      className={`flex items-center gap-3 px-5 py-4 rounded-lg border transition-all text-left flex-1 ${
                        heroTab === tab.id
                          ? 'bg-white/[0.06] border-white/25 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-[#8B9DAF] hover:bg-white/[0.04] hover:border-white/10'
                      }`}
                    >
                      <span className={`text-[11px] font-bold font-[family-name:var(--font-space-mono)] tracking-wider ${heroTab === tab.id ? 'text-white' : 'text-[#555555]'}`}>
                        {tab.number}
                      </span>
                      <span className="text-[12px] font-semibold tracking-wide whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Demo Container — always visible, content changes with tab */}
                <div className="relative rounded-xl border border-white/[0.06] bg-[#12122A] overflow-hidden min-h-[320px] md:min-h-[400px]">
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
                        {/* Sovereign AI App — Alert Dashboard */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.liveAlerts')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.consoleTitle')}</span>
                        </div>
                        <div className="space-y-2 max-h-[280px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-2">
                          {SOVEREIGN_AI_ALERTS.map((alert) => (
                            <div key={alert.id} className={`rounded-lg border p-3 ${
                              alert.severity === 'critical' ? 'border-red-500/20 bg-red-500/[0.04]' :
                              alert.severity === 'warning' ? 'border-amber-500/20 bg-amber-500/[0.04]' :
                              'border-[#8B9DAF]/10 bg-[#8B9DAF]/[0.03]'
                            }`}>
                              <div className="flex items-start gap-2">
                                <AlertTriangle size={13} className={`mt-0.5 shrink-0 ${
                                  alert.severity === 'critical' ? 'text-red-400' :
                                  alert.severity === 'warning' ? 'text-amber-400' : 'text-[#8B9DAF]'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] font-semibold text-white truncate">{alert.title}</p>
                                  <p className="text-[11px] text-[#999999] mt-0.5 leading-[1.5]">{alert.detail}</p>
                                </div>
                                <span className="text-[9px] text-[#555555] font-[family-name:var(--font-space-mono)] shrink-0">{alert.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.04]">
                          <div className="flex gap-4">
                            <span className="text-[10px] text-[#666666]">{t('demo.sovereign.activeAlerts')}</span>
                            <span className="text-[10px] text-[#666666]">{t('demo.sovereign.autoResolvedCount')}</span>
                          </div>
                          <span className="text-[10px] text-[#8B9DAF] font-semibold flex items-center gap-1">{t('demo.sovereign.viewAll')} <ArrowUpRight size={10} /></span>
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
                        {/* Carbon-Aware Logic — Hub Dashboard */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Leaf size={14} className="text-emerald-400" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400 font-[family-name:var(--font-space-mono)]">{t('demo.carbon.schedulerTitle')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.carbon.liveGridData')}</span>
                        </div>
                        <div className="space-y-2 max-h-[280px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-2">
                          {CARBON_HUBS.map((hub) => (
                            <div key={hub.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
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
                                  {hub.carbon} gCO₂/kWh
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
                              {/* Carbon bar */}
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
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.04]">
                          <span className="text-[10px] text-[#666666]">{t('demo.carbon.avgCarbonNote')}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">{t('demo.carbon.dashboard')} <ArrowUpRight size={10} /></span>
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
                        {/* Automation — Workflow Builder */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Workflow size={14} className="text-[#8B5CF6]" />
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B5CF6] font-[family-name:var(--font-space-mono)]">{t('demo.automation.workflowEngine')}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">{t('demo.automation.workflowCount')}</span>
                        </div>
                        <div className="space-y-2 max-h-[280px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-2">
                          {AUTOMATION_WORKFLOWS.map((wf) => (
                            <div key={wf.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${wf.status === 'running' ? 'bg-[#8B5CF6] animate-pulse' : 'bg-[#555555]'}`} />
                                  <span className="text-[12px] font-semibold text-white">{wf.name}</span>
                                </div>
                                <span className={`text-[9px] font-bold font-[family-name:var(--font-space-mono)] uppercase px-2 py-0.5 rounded ${
                                  wf.status === 'running' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' : 'bg-white/[0.04] text-[#666666]'
                                }`}>
                                  {getWorkflowStatusLabel(wf.status)}
                                </span>
                              </div>
                              {/* Progress bar */}
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-[#8B5CF6] transition-all duration-700"
                                    style={{ width: `${(wf.completed / wf.steps) * 100}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">{wf.completed}/{wf.steps}</span>
                              </div>
                              <div className="mt-1.5 flex items-center gap-1.5">
                                <Timer size={10} className="text-[#555555]" />
                                <span className="text-[10px] text-[#555555]">{t('demo.automation.triggerLabel')}: {wf.trigger}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.04]">
                          <span className="text-[10px] text-[#666666]">{t('demo.automation.summary')}</span>
                          <span className="text-[10px] text-[#8B5CF6] font-semibold flex items-center gap-1">{t('demo.automation.builder')} <ArrowUpRight size={10} /></span>
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
          SECTION 2: INTERACTIVE DEMO — Expanded Dashboard Views
          Dark bg #1A1A2E continued
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1A2E] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('demo.label')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('demo.title')}
            </h2>
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('subtitle')}
            </p>
          </FadeIn>

          {/* Expanded demo container */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0F0F24] overflow-hidden">
              {/* Demo header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                  </div>
                  <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">{t('demo.consoleLabel')}</span>
                </div>
                <div className="flex items-center gap-3">
                  {heroTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroTab(tab.id)}
                      className={`text-[10px] font-bold font-[family-name:var(--font-space-mono)] px-3 py-1.5 rounded transition-all ${
                        heroTab === tab.id ? 'bg-white/10 text-white' : 'text-[#555555] hover:text-[#8B9DAF]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo body */}
              <div className="p-6 md:p-8 min-h-[420px]">
                <AnimatePresence mode="wait">
                  {heroTab === 'sovereign' && (
                    <motion.div
                      key="demo-sovereign"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {/* Left: Stats panel */}
                      <div className="md:col-span-1 space-y-4">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.sovereign.activeWorkloads')}</p>
                          <p className="text-3xl font-bold text-white stat-mono">247</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp size={12} className="text-emerald-400" />
                            <span className="text-[10px] text-emerald-400 font-semibold">{t('demo.sovereign.workloadsTrend')}</span>
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.sovereign.sovereignScore')}</p>
                          <p className="text-3xl font-bold text-white stat-mono">100%</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.sovereign.sovereignNote')}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.sovereign.incidents24h')}</p>
                          <p className="text-3xl font-bold text-white stat-mono">3</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.sovereign.incidentsNote')}</p>
                        </div>
                      </div>
                      {/* Center: Alert timeline */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">{t('demo.sovereign.aiProposedActions')}</p>
                          <div className="space-y-3">
                            {[
                              { action: t('demo.sovereign.actions.a1Action'), impact: t('demo.sovereign.actions.a1Impact'), confidence: t('demo.sovereign.actions.a1Confidence'), status: 'approved' },
                              { action: t('demo.sovereign.actions.a2Action'), impact: t('demo.sovereign.actions.a2Impact'), confidence: t('demo.sovereign.actions.a2Confidence'), status: 'pending' },
                              { action: t('demo.sovereign.actions.a3Action'), impact: t('demo.sovereign.actions.a3Impact'), confidence: t('demo.sovereign.actions.a3Confidence'), status: 'approved' },
                              { action: t('demo.sovereign.actions.a4Action'), impact: t('demo.sovereign.actions.a4Impact'), confidence: t('demo.sovereign.actions.a4Confidence'), status: 'pending' },
                              { action: t('demo.sovereign.actions.a5Action'), impact: t('demo.sovereign.actions.a5Impact'), confidence: t('demo.sovereign.actions.a5Confidence'), status: 'auto-approved' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                <div className="mt-0.5">
                                  <Sparkles size={14} className="text-[#8B5CF6]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] text-white font-medium">{item.action}</p>
                                  <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.impactLabel')}: {item.impact}</span>
                                    <span className="text-[10px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">{t('demo.sovereign.confidenceLabel')}: {item.confidence}</span>
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                                  item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                  item.status === 'auto-approved' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                                  'bg-amber-500/10 text-amber-400'
                                }`}>
                                  {getActionStatusLabel(item.status)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {heroTab === 'carbon' && (
                    <motion.div
                      key="demo-carbon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {/* Left: Carbon metrics */}
                      <div className="md:col-span-1 space-y-4">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.carbon.gridCarbonNow')}</p>
                          <p className="text-3xl font-bold text-emerald-400 stat-mono">47</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.carbon.gco2kwhAvg')}</p>
                          <div className="mt-3 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: '81.5%' }} />
                          </div>
                          <p className="text-[10px] text-[#666666] mt-1">{t('demo.carbon.renewableNote')}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.carbon.carbonSavedToday')}</p>
                          <p className="text-3xl font-bold text-emerald-400 stat-mono">4.7t</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.carbon.carbonSavedNote')}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.carbon.bestHubLive')}</p>
                          <p className="text-[14px] font-bold text-white">{t('demo.carbon.bestHubName')}</p>
                          <p className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)] mt-1">{t('demo.carbon.bestHubDetail')}</p>
                        </div>
                      </div>
                      {/* Center: Hub comparison chart */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">{t('demo.carbon.hubComparisonTitle')}</p>
                          <div className="space-y-4">
                            {CARBON_HUBS.map((hub) => (
                              <div key={hub.name}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[12px] text-white font-medium">{hub.name}</span>
                                  <span className="text-[11px] font-bold font-[family-name:var(--font-space-mono)]" style={{
                                    color: hub.carbon < 30 ? '#10B981' : hub.carbon < 60 ? '#F59E0B' : '#EF4444'
                                  }}>
                                    {hub.carbon} gCO₂/kWh
                                  </span>
                                </div>
                                <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                      width: `${Math.max((1 - hub.carbon / 250) * 100, 5)}%`,
                                      backgroundColor: hub.carbon < 30 ? '#10B981' : hub.carbon < 60 ? '#F59E0B' : '#EF4444',
                                    }}
                                  />
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-[10px] text-[#666666]">{t('demo.carbon.percentRenewable', { value: hub.renewable })}</span>
                                  <span className="text-[10px] text-[#666666]">{hub.gpus} {t('demo.carbon.gpus')}</span>
                                  <span className="text-[10px] text-[#666666]">{hub.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 pt-4 border-t border-white/[0.04]">
                            <p className="text-[10px] text-[#666666]">
                              {t('demo.carbon.casablancaNote')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {heroTab === 'automation' && (
                    <motion.div
                      key="demo-automation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {/* Left: Automation stats */}
                      <div className="md:col-span-1 space-y-4">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.automation.activeWorkflows')}</p>
                          <p className="text-3xl font-bold text-[#8B5CF6] stat-mono">3</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.automation.workflowsNote')}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.automation.avgResponseTime')}</p>
                          <p className="text-3xl font-bold text-white stat-mono">&lt;200ms</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.automation.responseNote')}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">{t('demo.automation.autoResolved30d')}</p>
                          <p className="text-3xl font-bold text-white stat-mono">847</p>
                          <p className="text-[10px] text-[#999999] mt-1">{t('demo.automation.autoResolvedNote')}</p>
                        </div>
                      </div>
                      {/* Center: Workflow visualization */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">{t('demo.automation.pipelineTitle')}</p>
                          {/* Workflow steps visualization */}
                          <div className="space-y-3">
                            {[
                              { step: 1, label: t('demo.automation.steps.s1Label'), detail: t('demo.automation.steps.s1Detail'), status: 'complete' },
                              { step: 2, label: t('demo.automation.steps.s2Label'), detail: t('demo.automation.steps.s2Detail'), status: 'complete' },
                              { step: 3, label: t('demo.automation.steps.s3Label'), detail: t('demo.automation.steps.s3Detail'), status: 'complete' },
                              { step: 4, label: t('demo.automation.steps.s4Label'), detail: t('demo.automation.steps.s4Detail'), status: 'complete' },
                              { step: 5, label: t('demo.automation.steps.s5Label'), detail: t('demo.automation.steps.s5Detail'), status: 'running' },
                              { step: 6, label: t('demo.automation.steps.s6Label'), detail: t('demo.automation.steps.s6Detail'), status: 'pending' },
                            ].map((step) => (
                              <div key={step.step} className="flex items-start gap-3">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold font-[family-name:var(--font-space-mono)] ${
                                  step.status === 'complete' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                  step.status === 'running' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 animate-pulse' :
                                  'bg-white/[0.04] text-[#555555] border border-white/[0.06]'
                                }`}>
                                  {step.status === 'complete' ? '✓' : step.step}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-[12px] font-medium ${step.status === 'pending' ? 'text-[#555555]' : 'text-white'}`}>{step.label}</p>
                                  <p className="text-[10px] text-[#666666] mt-0.5">{step.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: WORKFLOW BUILDER — Light bg, Palantir "Designed for AI workflow builders"
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Progress indicator */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-12">
              {PROGRESS_STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setWorkflowStep(i)}
                  className="flex items-center gap-2"
                >
                  <span className={`text-[11px] font-bold font-[family-name:var(--font-space-mono)] ${
                    i <= workflowStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'
                  }`}>
                    [{step.id}]
                  </span>
                  {i < PROGRESS_STEPS.length - 1 && (
                    <span className={`w-8 h-px ${i < workflowStep ? 'bg-[#1A1A2E]' : 'bg-[#E5E5E5]'}`} />
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

            {/* Right: Video/Diagram tabs */}
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
                    onClick={() => setWorkflowMediaTab('diagram')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      workflowMediaTab === 'diagram' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {t('workflow.diagramTab')}
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
                        className="flex items-center justify-center min-h-[340px]"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-[#1A1A2E]/5 flex items-center justify-center mx-auto mb-3">
                            <Play size={24} className="text-[#1A1A2E] ml-1" />
                          </div>
                          <p className="text-[13px] text-[#999999]">{t('workflow.videoLabel')}</p>
                          <p className="text-[11px] text-[#CCCCCC] mt-1">{t('workflow.videoDuration')}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="wf-diagram"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 min-h-[340px]"
                      >
                        {/* Workflow diagram */}
                        <div className="flex flex-col items-center gap-4">
                          {[
                            { label: t('workflow.nodes.n1Label'), sub: t('workflow.nodes.n1Sub'), color: '#8B9DAF' },
                            { label: t('workflow.nodes.n2Label'), sub: t('workflow.nodes.n2Sub'), color: '#10B981' },
                            { label: t('workflow.nodes.n3Label'), sub: t('workflow.nodes.n3Sub'), color: '#8B5CF6' },
                            { label: t('workflow.nodes.n4Label'), sub: t('workflow.nodes.n4Sub'), color: '#F59E0B' },
                            { label: t('workflow.nodes.n5Label'), sub: t('workflow.nodes.n5Sub'), color: '#EF4444' },
                          ].map((node, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className="flex items-center gap-3 px-5 py-3 rounded-lg border border-[#E5E5E5] bg-white shadow-sm w-64">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
                                <div>
                                  <p className="text-[12px] font-semibold text-[#1A1A2E]">{node.label}</p>
                                  <p className="text-[10px] text-[#999999]">{node.sub}</p>
                                </div>
                              </div>
                              {i < 4 && (
                                <div className="w-px h-4 bg-[#E5E5E5]" />
                              )}
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
          SECTION 4: EVALUATE AND SHIP — Light bg, Palantir "Evaluate and ship with confidence"
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F7F8] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Progress indicator */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-12">
              {PROGRESS_STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setEvaluateStep(i)}
                  className="flex items-center gap-2"
                >
                  <span className={`text-[11px] font-bold font-[family-name:var(--font-space-mono)] ${
                    i <= evaluateStep ? 'text-[#1A1A2E]' : 'text-[#CCCCCC]'
                  }`}>
                    [{step.id}]
                  </span>
                  {i < PROGRESS_STEPS.length - 1 && (
                    <span className={`w-8 h-px ${i < evaluateStep ? 'bg-[#1A1A2E]' : 'bg-[#E5E5E5]'}`} />
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

            {/* Right: Video/Diagram tabs */}
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
                    onClick={() => setEvaluateMediaTab('diagram')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      evaluateMediaTab === 'diagram' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    {t('evaluate.diagramTab')}
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
                        className="flex items-center justify-center min-h-[340px]"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-[#1A1A2E]/5 flex items-center justify-center mx-auto mb-3">
                            <Play size={24} className="text-[#1A1A2E] ml-1" />
                          </div>
                          <p className="text-[13px] text-[#999999]">{t('evaluate.videoLabel')}</p>
                          <p className="text-[11px] text-[#CCCCCC] mt-1">{t('evaluate.videoDuration')}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ev-diagram"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 min-h-[340px]"
                      >
                        {/* Evaluation pipeline diagram */}
                        <div className="space-y-4">
                          {[
                            { label: t('evaluate.steps.s1Label'), status: 'passed', detail: t('evaluate.steps.s1Detail') },
                            { label: t('evaluate.steps.s2Label'), status: 'passed', detail: t('evaluate.steps.s2Detail') },
                            { label: t('evaluate.steps.s3Label'), status: 'passed', detail: t('evaluate.steps.s3Detail') },
                            { label: t('evaluate.steps.s4Label'), status: 'passed', detail: t('evaluate.steps.s4Detail') },
                            { label: t('evaluate.steps.s5Label'), status: 'running', detail: t('evaluate.steps.s5Detail') },
                            { label: t('evaluate.steps.s6Label'), status: 'pending', detail: t('evaluate.steps.s6Detail') },
                          ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                                step.status === 'passed' ? 'bg-emerald-100 text-emerald-600' :
                                step.status === 'running' ? 'bg-amber-100 text-amber-600 animate-pulse' :
                                'bg-gray-100 text-gray-400'
                              }`}>
                                {step.status === 'passed' ? '✓' : step.status === 'running' ? '●' : (i + 1)}
                              </div>
                              <div className="flex-1">
                                <p className={`text-[12px] font-medium ${step.status === 'pending' ? 'text-[#CCCCCC]' : 'text-[#1A1A2E]'}`}>{step.label}</p>
                                <p className="text-[10px] text-[#999999]">{step.detail}</p>
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
          SECTION 5: CAPABILITIES — Light bg, numbered feature list
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
          SECTION 6: ARCHITECTURE — SENSE / THINK / ACT (Light bg, restyled)
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
          SECTION 7: SPEC TABLE — Clean 3-column table on white bg
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
          SECTION 8: SECURITY & COMPLIANCE — Light bg
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
          SECTION 9: DEVELOPER PLATFORM — Code snippet preview (restyled light)
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
            {devPlatform.map((tool, i) => (
              <FadeIn key={tool.title} delay={i * 0.08}>
                <div className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F0F0F0] flex items-center justify-center">
                      <tool.icon size={18} className="text-[#8B9DAF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">{tool.title}</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-[#E5E5E5] mb-4" />
                  <p className="text-[14px] text-[#666666] leading-[1.7]">{tool.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Code Snippet Preview */}
          <FadeIn>
            <div className="rounded-xl overflow-hidden border border-[#E5E5E5] bg-[#1A1A2E]">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.06]">
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
                <p className="mt-1 text-[#5C6370]">{t('devPlatform.codeComment')}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10: COMPETITIVE COMPARISON — Keep existing component
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
          SECTION 11: CTA — Two cards: white "Request a Briefing" + dark "Explore the Platform"
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('cta.title')} /0.9
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1A1A2E] tracking-[-0.02em] leading-[1.1] mb-12">
              {t('cta.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <Link href="/contact" className="block bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-8 md:p-10 h-full hover:border-[#8B9DAF] transition-all group">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">{t('cta.briefing')}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4 group-hover:text-[#8B9DAF] transition-colors">
                  {t('cta.briefingTitle')}
                </h3>
                <p className="text-[14px] text-[#666666] leading-[1.7] mb-6">
                  {t('cta.subtitle')}
                </p>
                <div className="flex items-center gap-2 text-[#1A1A2E] group-hover:text-[#8B9DAF] transition-colors">
                  <span className="text-[13px] font-semibold">{t('cta.primary')}</span>
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link href="#architecture" className="block bg-[#1A1A2E] rounded-xl border border-[#1A1A2E] p-8 md:p-10 h-full hover:bg-[#252545] transition-all group">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">{t('cta.platform')}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('cta.platformTitle')}
                </h3>
                <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">
                  {t('cta.platformDescription')}
                </p>
                <div className="flex items-center gap-2 text-white group-hover:text-[#8B9DAF] transition-colors">
                  <span className="text-[13px] font-semibold">{t('cta.secondary')}</span>
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex justify-center">
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#8B9DAF] transition-colors">
                <ArrowLeft size={14} /> {tCommon('back')} Intelligence
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
