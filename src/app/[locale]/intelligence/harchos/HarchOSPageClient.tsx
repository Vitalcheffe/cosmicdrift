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

/* ─── MOCK DEMO DATA ─── */
const SOVEREIGN_AI_ALERTS = [
  { id: 1, severity: 'critical', title: 'GPU Throttle Detected — Hub Ouarzazate', detail: 'Node HOU-47 thermal limit at 92°C. Auto-migration initiated to HOU-12.', time: '2s ago' },
  { id: 2, severity: 'warning', title: 'Carbon Intensity Spike — Hub Casablanca', detail: 'Grid carbon jumped to 210 gCO2/kWh. Scheduling paused for non-critical jobs.', time: '14s ago' },
  { id: 3, severity: 'info', title: 'Workload Rebalanced — 23 Jobs Migrated', detail: 'HarchOS moved 23 training jobs from Casablanca to Ouarzazate. Carbon saved: 1.2t CO2.', time: '1m ago' },
  { id: 4, severity: 'warning', title: 'Submarine Cable Latency — 2Africa', detail: 'Round-trip to Marseille increased from 8ms to 12ms. Monitoring active.', time: '3m ago' },
  { id: 5, severity: 'critical', title: 'Power Anomaly — Hub Dakhla Wind Farm', detail: 'Wind generation dropped 40%. Battery reserves at 78%. Load-shedding protocol engaged.', time: '5m ago' },
];

const CARBON_HUBS = [
  { name: 'Harch Ouarzazate', carbon: 18, renewable: 97.2, gpus: 800, type: 'Solar', status: 'optimal', latency: '<5ms to EU' },
  { name: 'Harch Dakhla', carbon: 32, renewable: 84.1, gpus: 400, type: 'Wind', status: 'optimal', latency: '<8ms to EU' },
  { name: 'Harch Benguerir', carbon: 55, renewable: 62.3, gpus: 350, type: 'Solar+Wind', status: 'degraded', latency: '<12ms to EU' },
  { name: 'Harch Tanger', carbon: 41, renewable: 78.9, gpus: 200, type: 'Hybrid', status: 'optimal', latency: '<3ms to EU' },
  { name: 'Harch Casablanca', carbon: 210, renewable: 12.4, gpus: 48, type: 'Grid', status: 'standby', latency: '<2ms local' },
];

const AUTOMATION_WORKFLOWS = [
  { id: 'wf-1', name: 'Carbon-Optimal Training Pipeline', status: 'running', steps: 6, completed: 4, trigger: 'Carbon < 50 gCO2/kWh' },
  { id: 'wf-2', name: 'Cross-Hub Failover Protocol', status: 'idle', steps: 4, completed: 0, trigger: 'Hub health < 99.9%' },
  { id: 'wf-3', name: 'EU Data Residency Enforcer', status: 'running', steps: 3, completed: 3, trigger: 'GDPR boundary breach' },
  { id: 'wf-4', name: 'Renewable Peak Harvester', status: 'running', steps: 5, completed: 2, trigger: 'Solar > 95% capacity' },
  { id: 'wf-5', name: 'Incident Response Escalation', status: 'idle', steps: 8, completed: 0, trigger: 'Severity >= P2' },
];

const PROGRESS_STEPS = [
  { id: '0.1', label: 'Define' },
  { id: '0.2', label: 'Build' },
  { id: '0.3', label: 'Evaluate' },
  { id: '0.4', label: 'Ship' },
];

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
    { number: '0.1', icon: Leaf, title: 'Carbon-Aware Scheduling', desc: 'Automatic workload optimization based on grid carbon intensity, shifting loads to the cleanest periods and regions. Real-time per-job scheduling with 47 parameters.' },
    { number: '0.2', icon: Shield, title: 'Sovereign Data Residency', desc: '100% African data sovereignty with guaranteed Morocco jurisdiction. GDPR, ISO 27001, SOC 2 Type II, and Law 09-08 compliance — no CLOUD Act exposure.' },
    { number: '0.3', icon: Brain, title: 'AI Platform Services', desc: 'Full-stack AI platform for training, fine-tuning, and serving models on H100/A100/L40S GPUs. Carbon-optimal scheduling built into every pipeline.' },
    { number: '0.4', icon: Code2, title: 'Developer SDK', desc: 'Comprehensive TypeScript/Python SDK with OAuth 2.0 authentication, rate limiting, and interactive documentation for seamless integration.' },
  ];

  const specs = [
    { category: t('specs.title'), items: [
      { spec: 'Total GPUs', value: '1,798' },
      { spec: 'GPU Types', value: 'H100, A100, L40S' },
      { spec: 'Interconnect', value: 'NVLink + InfiniBand' },
      { spec: 'Max per Hub', value: '800 GPUs' },
      { spec: 'Scaling Efficiency', value: '>92% linear' },
    ]},
    { category: t('specs.compliance'), items: [
      { spec: 'Renewable Energy', value: '81.5%' },
      { spec: 'Avg Carbon Intensity', value: '~47 gCO2/kWh' },
      { spec: 'Best Hub Carbon', value: '18 gCO2/kWh' },
      { spec: 'PUE Range', value: '1.04 — 1.12' },
      { spec: 'Best PUE', value: '1.04' },
    ]},
    { category: 'Network', items: [
      { spec: 'Backbone', value: '400Gbps' },
      { spec: 'Dedicated Links', value: '100Gbps each' },
      { spec: 'Submarine Systems', value: '4 systems' },
      { spec: 'Latency to Europe', value: '<5-12ms' },
      { spec: 'Latency to Americas', value: '<35ms' },
    ]},
  ];

  const securityFeatures = [
    { icon: Lock, title: 'Zero-Trust Architecture', desc: 'Every request authenticated and authorized. No implicit trust between services, hubs, or users. mTLS on all internal connections.' },
    { icon: Shield, title: 'Sovereign Encryption', desc: 'AES-256 end-to-end encryption with Morocco-held keys. No US key escrow, no CLOUD Act key disclosure possible.' },
    { icon: Eye, title: '24/7/365 SOC Monitoring', desc: 'AI-driven threat detection with automated incident response. Real-time anomaly detection across all 5 hubs simultaneously.' },
    { icon: FileCode2, title: 'Automated Compliance', desc: 'Continuous compliance monitoring for GDPR, ISO 27001, SOC 2 Type II, and Law 09-08 with audit trails and automated evidence collection.' },
  ];

  const devPlatform = [
    { icon: Code2, title: t('features.api.title'), desc: t('features.api.description') },
    { icon: GitBranch, title: t('features.mobile.title'), desc: t('features.mobile.description') },
    { icon: Monitor, title: t('features.dashboard.title'), desc: t('features.dashboard.description') },
    { icon: Database, title: t('features.compliance.title'), desc: t('features.compliance.description') },
  ];

  const activeArch = architectureLayers.find(l => l.id === activeArchTab)!;

  const heroTabs = [
    { id: 'sovereign' as const, label: 'SOVEREIGN AI APP', number: '01' },
    { id: 'carbon' as const, label: 'CARBON-AWARE LOGIC', number: '02' },
    { id: 'automation' as const, label: 'AUTOMATION', number: '03' },
  ];

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
                  Beyond<br />Infrastructure
                </h1>
                <p className="text-xl md:text-2xl text-[#8B9DAF] font-light tracking-[-0.01em] mb-8">
                  Explore HarchOS
                </p>
                <p className="text-[15px] text-[#999999] max-w-md leading-[1.7] mb-10">
                  {t('description')}
                </p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { value: 1798, suffix: '', label: 'GPUs' },
                    { value: 5, suffix: '', label: 'Hubs' },
                    { value: 47, suffix: '', label: 'gCO₂/kWh' },
                    { value: 99.999, suffix: '%', label: 'Uptime SLA' },
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
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">Live Alerts</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">HarchOS Sovereign AI</span>
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
                            <span className="text-[10px] text-[#666666]">5 Active Alerts</span>
                            <span className="text-[10px] text-[#666666]">2 Auto-Resolved</span>
                          </div>
                          <span className="text-[10px] text-[#8B9DAF] font-semibold flex items-center gap-1">View All <ArrowUpRight size={10} /></span>
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
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400 font-[family-name:var(--font-space-mono)]">Carbon-Aware Scheduler</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">Live Grid Data</span>
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
                                  <span className="text-[#666666]">Renewable</span>
                                  <p className="text-white font-bold font-[family-name:var(--font-space-mono)]">{hub.renewable}%</p>
                                </div>
                                <div>
                                  <span className="text-[#666666]">GPUs</span>
                                  <p className="text-white font-bold font-[family-name:var(--font-space-mono)]">{hub.gpus}</p>
                                </div>
                                <div>
                                  <span className="text-[#666666]">Type</span>
                                  <p className="text-white font-bold">{hub.type}</p>
                                </div>
                                <div>
                                  <span className="text-[#666666]">Latency</span>
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
                          <span className="text-[10px] text-[#666666]">Avg Carbon: 71.2 gCO₂/kWh · 81.5% Renewable</span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">Dashboard <ArrowUpRight size={10} /></span>
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
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B5CF6] font-[family-name:var(--font-space-mono)]">Workflow Engine</span>
                          </div>
                          <span className="text-[10px] text-[#555555] font-[family-name:var(--font-space-mono)]">5 Workflows</span>
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
                                  {wf.status}
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
                                <span className="text-[10px] text-[#555555]">Trigger: {wf.trigger}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.04]">
                          <span className="text-[10px] text-[#666666]">3 Running · 2 Idle · 9 Steps Active</span>
                          <span className="text-[10px] text-[#8B5CF6] font-semibold flex items-center gap-1">Builder <ArrowUpRight size={10} /></span>
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
              Platform Demo
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Enterprise Autonomy
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
                  <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">harchos-console — live</span>
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
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Active Workloads</p>
                          <p className="text-3xl font-bold text-white stat-mono">247</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp size={12} className="text-emerald-400" />
                            <span className="text-[10px] text-emerald-400 font-semibold">+12% from yesterday</span>
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Sovereign Score</p>
                          <p className="text-3xl font-bold text-white stat-mono">100%</p>
                          <p className="text-[10px] text-[#999999] mt-1">All data in Morocco jurisdiction</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Incidents (24h)</p>
                          <p className="text-3xl font-bold text-white stat-mono">3</p>
                          <p className="text-[10px] text-[#999999] mt-1">2 auto-resolved · 1 escalated</p>
                        </div>
                      </div>
                      {/* Center: Alert timeline */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">AI App — Proposed Actions</p>
                          <div className="space-y-3">
                            {[
                              { action: 'Migrate 23 training jobs from Casablanca to Ouarzazate', impact: '-1.2t CO₂', confidence: '94%', status: 'approved' },
                              { action: 'Scale down Hub Casablanca standby GPUs', impact: '-18kW load', confidence: '89%', status: 'pending' },
                              { action: 'Preemptively failover Hub Dakhla to Wind Farm B', impact: 'Zero downtime', confidence: '91%', status: 'approved' },
                              { action: 'Reroute EU traffic from 2Africa to SEAMEWE-3', impact: '-4ms latency', confidence: '87%', status: 'pending' },
                              { action: 'Increase Hub Ouarzazate solar commitment by 15%', impact: '+120 GPU-hrs', confidence: '96%', status: 'auto-approved' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                <div className="mt-0.5">
                                  <Sparkles size={14} className="text-[#8B5CF6]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] text-white font-medium">{item.action}</p>
                                  <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)]">Impact: {item.impact}</span>
                                    <span className="text-[10px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">Confidence: {item.confidence}</span>
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                                  item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                  item.status === 'auto-approved' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                                  'bg-amber-500/10 text-amber-400'
                                }`}>
                                  {item.status}
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
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Grid Carbon (Now)</p>
                          <p className="text-3xl font-bold text-emerald-400 stat-mono">47</p>
                          <p className="text-[10px] text-[#999999] mt-1">gCO₂/kWh average</p>
                          <div className="mt-3 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: '81.5%' }} />
                          </div>
                          <p className="text-[10px] text-[#666666] mt-1">81.5% renewable — 89% below global avg</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Carbon Saved (Today)</p>
                          <p className="text-3xl font-bold text-emerald-400 stat-mono">4.7t</p>
                          <p className="text-[10px] text-[#999999] mt-1">CO₂ equivalent avoided via scheduling</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Best Hub (Live)</p>
                          <p className="text-[14px] font-bold text-white">Harch Ouarzazate</p>
                          <p className="text-[10px] text-emerald-400 font-[family-name:var(--font-space-mono)] mt-1">18 gCO₂/kWh · 97.2% solar</p>
                        </div>
                      </div>
                      {/* Center: Hub comparison chart */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">Hub Carbon Intensity Comparison</p>
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
                                  <span className="text-[10px] text-[#666666]">{hub.renewable}% renewable</span>
                                  <span className="text-[10px] text-[#666666]">{hub.gpus} GPUs</span>
                                  <span className="text-[10px] text-[#666666]">{hub.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 pt-4 border-t border-white/[0.04]">
                            <p className="text-[10px] text-[#666666]">
                              * Casablanca hub operates in standby mode during high-carbon grid periods. Carbon-aware scheduling automatically redirects workloads to cleaner hubs.
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
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Active Workflows</p>
                          <p className="text-3xl font-bold text-[#8B5CF6] stat-mono">3</p>
                          <p className="text-[10px] text-[#999999] mt-1">of 5 total · 9 steps running</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Avg Response Time</p>
                          <p className="text-3xl font-bold text-white stat-mono">&lt;200ms</p>
                          <p className="text-[10px] text-[#999999] mt-1">From trigger to first action</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-3">Auto-Resolved (30d)</p>
                          <p className="text-3xl font-bold text-white stat-mono">847</p>
                          <p className="text-[10px] text-[#999999] mt-1">Zero human intervention required</p>
                        </div>
                      </div>
                      {/* Center: Workflow visualization */}
                      <div className="md:col-span-2">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 h-full">
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold mb-4">Carbon-Optimal Training Pipeline (Active)</p>
                          {/* Workflow steps visualization */}
                          <div className="space-y-3">
                            {[
                              { step: 1, label: 'Monitor Grid Carbon', detail: 'Polling 5 hubs every 60 seconds', status: 'complete' },
                              { step: 2, label: 'Evaluate Scheduling Window', detail: 'Carbon threshold: <50 gCO₂/kWh · Window: 4h ahead', status: 'complete' },
                              { step: 3, label: 'Select Optimal Hub', detail: 'Selected: Harch Ouarzazate (18 gCO₂/kWh, 800 GPUs)', status: 'complete' },
                              { step: 4, label: 'Provision GPU Cluster', detail: 'Allocating 256x H100 on HOU-Rack-07', status: 'complete' },
                              { step: 5, label: 'Deploy Training Job', detail: 'Uploading model weights and dataset shards...', status: 'running' },
                              { step: 6, label: 'Monitor & Auto-Migrate', detail: 'Waiting for job start...', status: 'pending' },
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
                  Designed for AI workflow builders
                </h2>
                <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
                <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                  HarchOS provides the tools and infrastructure to build, test, and deploy carbon-aware AI workflows at scale. From data ingestion to model serving, every step is optimized for sovereignty and sustainability.
                </p>
                <div className="space-y-3">
                  {[
                    'Carbon-optimal scheduling built into every pipeline',
                    'Visual workflow builder with drag-and-drop automation',
                    'Real-time monitoring and autonomous incident response',
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
                    VIDEO
                  </button>
                  <button
                    onClick={() => setWorkflowMediaTab('diagram')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      workflowMediaTab === 'diagram' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    DIAGRAM
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
                          <p className="text-[13px] text-[#999999]">Workflow Builder Demo</p>
                          <p className="text-[11px] text-[#CCCCCC] mt-1">2:34 min</p>
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
                            { label: 'Data Source', sub: 'IoT / API / Satellite', color: '#8B9DAF' },
                            { label: 'Carbon Evaluation', sub: '47-param grid analysis', color: '#10B981' },
                            { label: 'Hub Selection', sub: 'RL + GNN optimization', color: '#8B5CF6' },
                            { label: 'GPU Provisioning', sub: 'H100/A100/L40S allocation', color: '#F59E0B' },
                            { label: 'Deploy & Monitor', sub: 'Live <200ms response', color: '#EF4444' },
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
                  Evaluate and ship with confidence
                </h2>
                <div className="w-16 h-0.5 bg-[#8B9DAF] mb-6" />
                <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                  Built-in evaluation frameworks, A/B testing, and automated compliance checks ensure every deployment meets sovereign, security, and carbon standards before going live.
                </p>
                <div className="space-y-3">
                  {[
                    'Automated compliance validation before every deployment',
                    'Carbon impact assessment integrated into CI/CD pipeline',
                    'Sovereign data residency checks enforced automatically',
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
                    VIDEO
                  </button>
                  <button
                    onClick={() => setEvaluateMediaTab('diagram')}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-md transition-all ${
                      evaluateMediaTab === 'diagram' ? 'bg-[#1A1A2E] text-white' : 'text-[#999999] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    DIAGRAM
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
                          <p className="text-[13px] text-[#999999]">Evaluation Pipeline Demo</p>
                          <p className="text-[11px] text-[#CCCCCC] mt-1">1:58 min</p>
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
                            { label: 'Code Commit', status: 'passed', detail: 'All unit tests passing' },
                            { label: 'Carbon Impact Check', status: 'passed', detail: 'Estimated +0.3t CO₂ — within threshold' },
                            { label: 'Sovereign Data Scan', status: 'passed', detail: 'No data boundary violations detected' },
                            { label: 'Security Audit', status: 'passed', detail: 'No CVEs in dependencies' },
                            { label: 'Compliance Validation', status: 'running', detail: 'GDPR + ISO 27001 + SOC 2 + Law 09-08' },
                            { label: 'Deploy to Production', status: 'pending', detail: 'Waiting for compliance gate...' },
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
              Core Capabilities
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
                <p className="mt-1 text-[#5C6370]">{'// Deployed to Harch Ouarzazate — solar energy at 97.2% capacity'}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10: COMPETITIVE COMPARISON — Keep existing component
          ═══════════════════════════════════════════════════════════ */}
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
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">Briefing</p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4 group-hover:text-[#8B9DAF] transition-colors">
                  Request a Briefing
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
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">Platform</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Explore the Platform
                </h3>
                <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">
                  Dive into the SENSE-THINK-ACT architecture, carbon-aware scheduling engine, and sovereign GPU cloud.
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
