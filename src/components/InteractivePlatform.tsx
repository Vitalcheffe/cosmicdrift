'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  Activity, Database, Brain, Shield, Rocket,
  MapPin, BarChart3, GitBranch, Lock, Zap,
  Eye, Radio, Cpu, CheckCircle, AlertTriangle,
  Globe, TrendingUp, ArrowRight, ChevronRight,
  Scan, Network, Cog, FileCheck, Gauge, Clock
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   HARCH OS — Scroll-Driven Narrative Platform
   Psychological arc: ATTENTION → COMPREHENSION → DESIRE → TRUST → ACTION
   Inspired by Palantir Gotham / Foundry / AIP / Apollo architecture
   ═══════════════════════════════════════════════════════════════ */

interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

type ModuleId = 'sentinel' | 'nexus' | 'oracle' | 'citadel' | 'meridian';

// ─── Accent Colors (very muted, used sparingly) ───
const ACCENTS: Record<ModuleId, string> = {
  sentinel: '#34D399',
  nexus: '#60A5FA',
  oracle: '#A78BFA',
  citadel: '#F87171',
  meridian: '#94A3B8',
};

const ACCENT_BG: Record<ModuleId, string> = {
  sentinel: 'rgba(52,211,153,0.08)',
  nexus: 'rgba(96,165,250,0.08)',
  oracle: 'rgba(167,139,250,0.08)',
  citadel: 'rgba(248,113,113,0.08)',
  meridian: 'rgba(148,163,184,0.08)',
};

const MODULES: ModuleId[] = ['sentinel', 'nexus', 'oracle', 'citadel', 'meridian'];

// ─── Animation Config ───
const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as const;

// ═══════════════════════════════════════════════════════════════
// SHARED: Section Wrapper with Scroll Reveal
// ═══════════════════════════════════════════════════════════════
function ModuleSection({
  id,
  index,
  children,
}: {
  id: ModuleId;
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const accent = ACCENTS[id];
  const isReversed = index % 2 === 1;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className="relative"
    >
      {/* Thin accent line on the left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-30 hidden md:block"
        style={{ backgroundColor: accent }}
      />

      {/* Content area */}
      <div className="md:pl-8 py-16 md:py-24">
        <div
          className={`flex flex-col ${
            isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
          } gap-10 md:gap-16 items-center`}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED: Dashboard Container (the "screen" wrapper)
// ═══════════════════════════════════════════════════════════════
function DashboardScreen({
  accent,
  title,
  children,
}: {
  accent: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
      className="w-full md:w-[55%] flex-shrink-0"
    >
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: '#0C0C14',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Dashboard header bar */}
        <div
          className="flex items-center h-9 px-4 border-b"
          style={{
            backgroundColor: '#12131F',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-sm mr-3"
            style={{ backgroundColor: accent, opacity: 0.6 }}
          />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.15em]"
            style={{ color: accent, opacity: 0.7 }}
          >
            {title}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            <span className="text-[9px] font-mono text-white/25">LIVE</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4">{children}</div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE 1: SENTINEL — Real-time Infrastructure Intelligence
// Palantir Gotham equivalent: Multi-source monitoring & threat detection
// Psychological phase: ATTENTION (hook — "We SEE everything")
// ═══════════════════════════════════════════════════════════════
function SentinelDashboard({ t }: { t: any }) {
  const nodes = [
    { x: 44, y: 22, label: 'TNG', status: 'active' },
    { x: 42, y: 28, label: 'RBA', status: 'active' },
    { x: 46, y: 34, label: 'CMB', status: 'active' },
    { x: 48, y: 42, label: 'MRK', status: 'warning' },
    { x: 38, y: 50, label: 'AGD', status: 'active' },
    { x: 52, y: 26, label: 'OUJ', status: 'active' },
    { x: 36, y: 56, label: 'DKH', status: 'degraded' },
  ];

  const statusMetrics = [
    { label: t('modules.sentinel.dashboard.energy'), value: '2.4 GW', status: 'nominal' },
    { label: t('modules.sentinel.dashboard.water'), value: '340M m\u00B3', status: 'warning' },
    { label: t('modules.sentinel.dashboard.transport'), value: '12 Active', status: 'nominal' },
    { label: t('modules.sentinel.dashboard.digital'), value: '1,798 GPU', status: 'nominal' },
  ];

  return (
    <DashboardScreen accent={ACCENTS.sentinel} title={t('modules.sentinel.dashboard.title')}>
      <div className="flex flex-col gap-3">
        {/* Map + Status side by side */}
        <div className="flex gap-3">
          {/* Africa Map */}
          <div className="flex-1 min-w-0 rounded-lg border overflow-hidden" style={{ backgroundColor: '#080812', borderColor: 'rgba(255,255,255,0.04)' }}>
            <svg viewBox="0 0 100 70" className="w-full" style={{ minHeight: 180 }}>
              <rect x="0" y="0" width="100" height="70" fill="#080812" />
              {/* Africa outline */}
              <path
                d="M 42 6 Q 46 4 50 7 L 54 10 Q 58 15 56 20 L 54 26 Q 56 32 53 36 L 50 42 Q 47 48 44 52 L 40 58 Q 37 62 34 64 L 32 66 Q 30 68 28 66 L 24 60 Q 22 54 20 46 L 22 38 Q 20 30 24 24 L 28 18 Q 32 12 36 8 Z"
                fill="#12131F"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.3"
              />
              {/* Morocco highlight */}
              <path
                d="M 36 6 Q 42 4 50 7 L 52 9 Q 53 11 52 13 L 48 14 Q 44 13 40 10 Z"
                fill="#1a1b30"
                stroke="rgba(52,211,153,0.12)"
                strokeWidth="0.3"
              />
              {/* Grid */}
              {[25, 50, 75].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="70" stroke="rgba(255,255,255,0.015)" strokeWidth="0.15" />
              ))}
              {[20, 40, 60].map(y => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.015)" strokeWidth="0.15" />
              ))}
              {/* Connection lines */}
              <line x1="46" y1="34" x2="42" y2="28" stroke="rgba(52,211,153,0.12)" strokeWidth="0.3" strokeDasharray="1 0.5" />
              <line x1="46" y1="34" x2="48" y2="42" stroke="rgba(52,211,153,0.1)" strokeWidth="0.3" strokeDasharray="1 0.5" />
              <line x1="46" y1="34" x2="52" y2="26" stroke="rgba(52,211,153,0.1)" strokeWidth="0.3" strokeDasharray="1 0.5" />
              {/* Nodes */}
              {nodes.map((n, i) => (
                <g key={i}>
                  {n.status === 'active' && (
                    <circle cx={n.x} cy={n.y} r="2.5" fill="none" stroke="#34D399" strokeWidth="0.2" opacity="0.4">
                      <animate attributeName="r" from="1.5" to="4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={n.x} cy={n.y} r="1.3"
                    fill={n.status === 'active' ? '#34D399' : n.status === 'warning' ? '#FBBF24' : '#EF4444'}
                    opacity={0.8}
                  />
                  <text x={n.x} y={n.y - 2.5} fill="rgba(255,255,255,0.4)" fontSize="1.8" textAnchor="middle" fontFamily="monospace">
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Status Metrics */}
          <div className="w-44 flex-shrink-0 space-y-2">
            {statusMetrics.map((m, i) => (
              <div
                key={m.label}
                className="rounded-lg border p-2.5"
                style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-white/30 uppercase tracking-wider">{m.label}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      m.status === 'nominal' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </div>
                <span className="text-sm font-bold text-white/80 font-mono">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational bar */}
        <div className="rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/30 uppercase tracking-wider">
              {t('modules.sentinel.dashboard.operational')}
            </span>
            <span className="text-[11px] font-mono text-emerald-400/70">78%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '78%', backgroundColor: '#34D399', opacity: 0.6 }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[9px] text-white/20">
              {t('modules.sentinel.dashboard.activeAlerts')}: <span className="text-amber-400/60">3</span>
            </span>
            <span className="text-[9px] text-white/20 font-mono">
              2.4B+ {t('modules.sentinel.dashboard.dataPoints')}
            </span>
          </div>
        </div>
      </div>
    </DashboardScreen>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE 2: NEXUS — Unified Data Ontology
// Palantir Foundry equivalent: Data integration & ontology management
// Psychological phase: COMPREHENSION ("We UNDERSTAND the connections")
// ═══════════════════════════════════════════════════════════════
function NexusDashboard({ t }: { t: any }) {
  const entities = [
    { x: 50, y: 30, r: 6, label: 'Ontology', color: '#60A5FA' },
    { x: 25, y: 20, r: 4, label: 'Energy', color: '#34D399' },
    { x: 75, y: 20, r: 4, label: 'Mining', color: '#FBBF24' },
    { x: 20, y: 55, r: 4, label: 'Water', color: '#38BDF8' },
    { x: 80, y: 55, r: 4, label: 'Cement', color: '#A78BFA' },
    { x: 35, y: 70, r: 3, label: 'Agri', color: '#4ADE80' },
    { x: 65, y: 70, r: 3, label: 'Finance', color: '#F87171' },
    { x: 50, y: 80, r: 3, label: 'Tech', color: '#94A3B8' },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 7]
  ];

  const entityStats = [
    { label: t('modules.nexus.dashboard.entities'), value: '2.4B+', color: '#60A5FA' },
    { label: t('modules.nexus.dashboard.relationships'), value: '18.7B', color: '#A78BFA' },
    { label: t('modules.nexus.dashboard.sources'), value: '47', color: '#34D399' },
  ];

  return (
    <DashboardScreen accent={ACCENTS.nexus} title={t('modules.nexus.dashboard.title')}>
      <div className="flex flex-col gap-3">
        {/* Ontology Graph */}
        <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#080812', borderColor: 'rgba(255,255,255,0.04)' }}>
          <svg viewBox="0 0 100 90" className="w-full" style={{ minHeight: 200 }}>
            <rect x="0" y="0" width="100" height="90" fill="#080812" />
            {/* Connections */}
            {connections.map(([from, to], i) => (
              <line
                key={i}
                x1={entities[from].x} y1={entities[from].y}
                x2={entities[to].x} y2={entities[to].y}
                stroke="rgba(96,165,250,0.12)"
                strokeWidth="0.3"
              />
            ))}
            {/* Data flow particles */}
            {[0, 1, 2].map(i => {
              const conn = connections[i];
              const from = entities[conn[0]];
              const to = entities[conn[1]];
              return (
                <circle key={`p${i}`} r="0.8" fill="#60A5FA" opacity="0.6">
                  <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" path={`M${from.x},${from.y} L${to.x},${to.y}`} />
                </circle>
              );
            })}
            {/* Entity nodes */}
            {entities.map((e, i) => (
              <g key={i}>
                <circle cx={e.x} cy={e.y} r={e.r} fill={`${e.color}15`} stroke={e.color} strokeWidth="0.4" opacity="0.8" />
                <circle cx={e.x} cy={e.y} r={e.r * 0.4} fill={e.color} opacity="0.6" />
                <text x={e.x} y={e.y + e.r + 4} fill="rgba(255,255,255,0.35)" fontSize="2.5" textAnchor="middle" fontFamily="monospace">
                  {e.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Entity Stats */}
        <div className="grid grid-cols-3 gap-2">
          {entityStats.map((s) => (
            <div key={s.label} className="rounded-lg border p-2.5 text-center" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
              <span className="text-sm font-bold font-mono" style={{ color: s.color, opacity: 0.8 }}>{s.value}</span>
              <div className="text-[8px] text-white/25 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pipeline status */}
        <div className="rounded-lg border p-2.5 flex items-center gap-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <span className="text-[9px] text-white/25 uppercase">{t('modules.nexus.dashboard.pipeline')}</span>
          <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '94%', backgroundColor: '#60A5FA', opacity: 0.5 }} />
          </div>
          <span className="text-[9px] font-mono text-white/40">94%</span>
        </div>
      </div>
    </DashboardScreen>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE 3: ORACLE — AI-Powered Scenario Simulation
// Palantir AIP equivalent: AI/ML operations & scenario planning
// Psychological phase: DESIRE ("We PREDICT what's next")
// ═══════════════════════════════════════════════════════════════
function OracleDashboard({ t }: { t: any }) {
  const scenarios = [
    {
      name: t('modules.oracle.dashboard.baseline'),
      confidence: 94,
      outcome: '+4.2%',
      trend: 'up' as const,
      color: '#60A5FA',
    },
    {
      name: t('modules.oracle.dashboard.stress'),
      confidence: 78,
      outcome: '-12.8%',
      trend: 'down' as const,
      color: '#F87171',
    },
    {
      name: t('modules.oracle.dashboard.optimal'),
      confidence: 87,
      outcome: '+18.6%',
      trend: 'up' as const,
      color: '#34D399',
    },
  ];

  return (
    <DashboardScreen accent={ACCENTS.oracle} title={t('modules.oracle.dashboard.title')}>
      <div className="flex flex-col gap-3">
        {/* Scenario Cards */}
        <div className="grid grid-cols-3 gap-2">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-lg border p-3"
              style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">{s.name}</div>
              <div className="text-lg font-bold font-mono mb-1" style={{ color: s.color, opacity: 0.9 }}>
                {s.outcome}
              </div>
              {/* Confidence bar */}
              <div className="mb-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] text-white/20 uppercase">
                    {t('modules.oracle.dashboard.confidence')}
                  </span>
                  <span className="text-[9px] font-mono text-white/40">{s.confidence}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.confidence}%`, backgroundColor: s.color, opacity: 0.6 }}
                  />
                </div>
              </div>
              {/* Mini sparkline */}
              <svg viewBox="0 0 60 16" className="w-full mt-1.5" style={{ height: 16 }}>
                <polyline
                  fill="none"
                  stroke={s.color}
                  strokeWidth="1"
                  opacity="0.4"
                  points={
                    s.trend === 'up'
                      ? '0,14 10,12 20,10 30,7 40,5 50,3 60,1'
                      : '0,2 10,4 20,6 30,9 40,11 50,13 60,14'
                  }
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* AI Confidence */}
        <div className="rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain size={12} className="text-violet-400/60" />
              <span className="text-[9px] text-white/30 uppercase tracking-wider">
                {t('modules.oracle.dashboard.aiEngine')}
              </span>
            </div>
            <span className="text-[10px] font-mono text-violet-400/70">94.2%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '94.2%', backgroundColor: '#A78BFA', opacity: 0.5 }} />
            </div>
            <span className="text-[8px] text-white/20 font-mono">
              {t('modules.oracle.dashboard.scenarios')}: 10,247
            </span>
          </div>
        </div>

        {/* Model status */}
        <div className="flex items-center gap-4 rounded-lg border p-2.5" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-white/25 uppercase">{t('modules.oracle.dashboard.modelStatus')}</span>
          <span className="text-[9px] font-mono text-emerald-400/60">{t('modules.oracle.dashboard.training')}</span>
          <span className="ml-auto text-[8px] font-mono text-white/15">v3.2.1</span>
        </div>
      </div>
    </DashboardScreen>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE 4: CITADEL — Security & Digital Sovereignty
// Unique to HarchOS: Sovereign infrastructure protection
// Psychological phase: TRUST ("We PROTECT it all")
// ═══════════════════════════════════════════════════════════════
function CitadelDashboard({ t }: { t: any }) {
  const complianceItems = [
    { label: 'GDPR', status: 'compliant' },
    { label: 'PDPA', status: 'compliant' },
    { label: 'CNDP', status: 'compliant' },
    { label: 'ISO 27001', status: 'compliant' },
    { label: 'SOC 2', status: 'pending' },
  ];

  const accessLevels = [
    { level: 'L5', count: 3, color: '#F87171' },
    { level: 'L4', count: 12, color: '#FBBF24' },
    { level: 'L3', count: 47, color: '#60A5FA' },
    { level: 'L2', count: 184, color: '#34D399' },
  ];

  const enclaves = [
    { name: 'Morocco', status: 'active' },
    { name: 'Senegal', status: 'active' },
    { name: 'Côte d\'Ivoire', status: 'active' },
    { name: 'Nigeria', status: 'staging' },
  ];

  return (
    <DashboardScreen accent={ACCENTS.citadel} title={t('modules.citadel.dashboard.title')}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {/* Access Levels */}
          <div className="flex-1 rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2.5">
              {t('modules.citadel.dashboard.clearance')}
            </div>
            {accessLevels.map((a) => (
              <div key={a.level} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <span
                  className="text-[9px] font-mono font-bold w-6 text-center px-1 py-0.5 rounded"
                  style={{ backgroundColor: `${a.color}15`, color: a.color, opacity: 0.8 }}
                >
                  {a.level}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((a.count / 184) * 100, 100)}%`,
                      backgroundColor: a.color,
                      opacity: 0.4,
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono text-white/30 w-6 text-right">{a.count}</span>
              </div>
            ))}
          </div>

          {/* Compliance */}
          <div className="flex-1 rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2.5">
              {t('modules.citadel.dashboard.compliance')}
            </div>
            {complianceItems.map((c) => (
              <div key={c.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                  c.status === 'compliant' ? 'bg-emerald-500/15' : 'bg-amber-500/15'
                }`}>
                  {c.status === 'compliant'
                    ? <CheckCircle size={8} className="text-emerald-400/70" />
                    : <Clock size={8} className="text-amber-400/70" />
                  }
                </span>
                <span className="text-[10px] text-white/50">{c.label}</span>
                <span className={`ml-auto text-[8px] uppercase ${
                  c.status === 'compliant' ? 'text-emerald-400/50' : 'text-amber-400/50'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sovereign Enclaves */}
        <div className="rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lock size={11} className="text-red-400/50" />
              <span className="text-[9px] text-white/30 uppercase tracking-wider">
                {t('modules.citadel.dashboard.enclaves')}
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/25">8 {t('modules.citadel.dashboard.sovereignZones')}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {enclaves.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-white/[0.02]">
                <span className={`w-1.5 h-1.5 rounded-full ${e.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-[9px] text-white/40">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardScreen>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE 5: MERIDIAN — Deployment & Operations Engine
// Palantir Apollo equivalent: Continuous deployment & operations
// Psychological phase: ACTION ("We EXECUTE at scale")
// ═══════════════════════════════════════════════════════════════
function MeridianDashboard({ t }: { t: any }) {
  const pipelineStages = [
    { label: t('modules.meridian.dashboard.plan'), status: 'complete' },
    { label: t('modules.meridian.dashboard.build'), status: 'complete' },
    { label: t('modules.meridian.dashboard.test'), status: 'complete' },
    { label: t('modules.meridian.dashboard.deploy'), status: 'active' },
    { label: t('modules.meridian.dashboard.monitor'), status: 'pending' },
  ];

  return (
    <DashboardScreen accent={ACCENTS.meridian} title={t('modules.meridian.dashboard.title')}>
      <div className="flex flex-col gap-3">
        {/* Deployment Pipeline */}
        <div className="rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="text-[9px] text-white/30 uppercase tracking-wider mb-3">
            {t('modules.meridian.dashboard.pipeline')}
          </div>
          <div className="flex items-center gap-1">
            {pipelineStages.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      s.status === 'complete'
                        ? 'bg-emerald-500/15'
                        : s.status === 'active'
                        ? 'bg-slate-500/15'
                        : 'bg-white/[0.03]'
                    }`}
                  >
                    {s.status === 'complete' ? (
                      <CheckCircle size={13} className="text-emerald-400/70" />
                    ) : s.status === 'active' ? (
                      <ArrowRight size={13} className="text-slate-400/70 animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    )}
                  </div>
                  <span className={`text-[8px] uppercase tracking-wider ${
                    s.status === 'complete'
                      ? 'text-emerald-400/50'
                      : s.status === 'active'
                      ? 'text-white/50'
                      : 'text-white/15'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className={`h-[2px] w-3 -mt-4 ${
                    s.status === 'complete' ? 'bg-emerald-400/20' : 'bg-white/[0.04]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t('modules.meridian.dashboard.activeDeploys'), value: '847', accent: '#94A3B8' },
            { label: t('modules.meridian.dashboard.uptime'), value: '99.97%', accent: '#34D399' },
            { label: t('modules.meridian.dashboard.verticals'), value: '8', accent: '#60A5FA' },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border p-2.5" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
              <div className="text-[9px] text-white/25 uppercase tracking-wider mb-1">{m.label}</div>
              <span className="text-base font-bold font-mono" style={{ color: m.accent, opacity: 0.8 }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Live deployments */}
        <div className="rounded-lg border p-3" style={{ backgroundColor: '#12131F', borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/30 uppercase tracking-wider">
              {t('modules.meridian.dashboard.recentDeploys')}
            </span>
            <span className="flex items-center gap-1 text-[9px] text-emerald-400/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          {[
            { id: 'DEP-4821', target: 'Energy Grid Morocco', status: 'deploying' },
            { id: 'DEP-4820', target: 'Water Network Senegal', status: 'complete' },
            { id: 'DEP-4819', target: 'Cement Plant Abidjan', status: 'complete' },
          ].map((d) => (
            <div key={d.id} className="flex items-center gap-2 mb-1.5 last:mb-0">
              <span className="text-[9px] font-mono text-white/30 w-16">{d.id}</span>
              <span className="text-[9px] text-white/40 flex-1">{d.target}</span>
              <span className={`text-[8px] font-mono uppercase ${
                d.status === 'deploying' ? 'text-amber-400/60' : 'text-emerald-400/50'
              }`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardScreen>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE TEXT PANEL (left/right side of each section)
// ═══════════════════════════════════════════════════════════════
function ModuleTextPanel({
  id,
  index,
  t,
}: {
  id: ModuleId;
  index: number;
  t: any;
}) {
  const accent = ACCENTS[id];
  const Icon = [Activity, Database, Brain, Shield, Rocket][index];
  const capabilities = [
    t(`modules.${id}.capabilities.0`),
    t(`modules.${id}.capabilities.1`),
    t(`modules.${id}.capabilities.2`),
  ];

  return (
    <div className="w-full md:w-[45%]">
      {/* Module number */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: ACCENT_BG[id] }}
        >
          <Icon size={16} style={{ color: accent, opacity: 0.8 }} />
        </div>
        <span
          className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase"
          style={{ color: accent, opacity: 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Module name */}
      <h3 className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight mb-2">
        {t(`modules.${id}.name`)}
      </h3>

      {/* Tagline */}
      <p
        className="text-sm md:text-base font-medium mb-4"
        style={{ color: accent, opacity: 0.7 }}
      >
        {t(`modules.${id}.tagline`)}
      </p>

      {/* Description */}
      <p className="text-sm text-white/40 leading-relaxed mb-6">
        {t(`modules.${id}.description`)}
      </p>

      {/* Capabilities */}
      <div className="space-y-2.5">
        {capabilities.map((cap, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <ChevronRight size={13} className="mt-0.5 flex-shrink-0" style={{ color: accent, opacity: 0.5 }} />
            <span className="text-[13px] text-white/50 leading-snug">{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT: InteractivePlatform
// ═══════════════════════════════════════════════════════════════
export function InteractivePlatform({ slug, accent: _accentOverride }: InteractivePlatformProps) {
  const t = useTranslations('interactivePlatform');

  const dashboards: Record<ModuleId, React.ComponentType<{ t: any }>> = {
    sentinel: SentinelDashboard,
    nexus: NexusDashboard,
    oracle: OracleDashboard,
    citadel: CitadelDashboard,
    meridian: MeridianDashboard,
  };

  return (
    <div className="w-full bg-[#0A0A0A]">
      {/* Thin top border with gradient */}
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.2), rgba(96,165,250,0.2), rgba(167,139,250,0.2), rgba(248,113,113,0.2), rgba(148,163,184,0.2), transparent)',
        }}
      />

      {/* Module sections */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {MODULES.map((id, index) => {
          const Dashboard = dashboards[id];
          return (
            <ModuleSection key={id} id={id} index={index}>
              <ModuleTextPanel id={id} index={index} t={t} />
              <Dashboard t={t} />
            </ModuleSection>
          );
        })}
      </div>

      {/* Bottom gradient line */}
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }}
      />
    </div>
  );
}
