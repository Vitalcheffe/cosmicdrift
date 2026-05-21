'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FadeIn, AnimatedCounter } from '@/components/ui/motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowRight,
  Activity,
  Shield,
  Server,
  Cpu,
  Radio,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  Zap,
  Gauge,
  Bell,
  Clock,
  Lock,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   LIVE TIMESTAMP HOOK
   ═══════════════════════════════════════════════════════════════ */

function useLiveTimestamp() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ═══════════════════════════════════════════════════════════════
   MAP — Coordinate projection (reusing AfricaMap system)
   ViewBox: 0 0 800 900
   Longitude -20 → 60  maps to x: 0 → 800
   Latitude  40 → -40 maps to y: 0 → 900
   ═══════════════════════════════════════════════════════════════ */

const VW = 800;
const VH = 900;

function geo(lat: number, lon: number): [number, number] {
  const x = ((lon + 20) / 80) * VW;
  const y = ((40 - lat) / 80) * VH;
  return [+(x.toFixed(1)), +(y.toFixed(1))];
}

const AFRICA: [number, number][] = [
  [-5.8, 35.8], [-6.5, 34], [-8, 33], [-10, 31.5],
  [-13, 28], [-16, 24], [-17, 21], [-17.1, 18],
  [-17, 15], [-16.7, 13.5],
  [-16.5, 12], [-15, 10.5], [-14, 9], [-12.5, 7.5],
  [-10.5, 6], [-8, 5], [-5, 4.5],
  [-2, 5], [0, 5.5], [2.5, 6], [4, 4.5],
  [7, 4.5], [9.5, 3.5], [10, 2], [9.5, 0.5],
  [10, -2], [12, -5], [12, -8],
  [12.5, -12], [13, -17], [12, -22],
  [15, -28], [17, -32], [18, -34],
  [18.5, -34.8], [20, -35], [22, -34.5],
  [25, -33], [27, -32], [28, -31],
  [30, -29], [32, -27], [35, -23],
  [38, -17], [40, -13], [40, -8],
  [42, -4], [44, -1], [45.5, 1],
  [48, 3], [50, 5], [51.5, 8],
  [51.5, 11], [50, 12], [48, 11],
  [46, 10.5], [44, 10], [43, 11.5],
  [43, 14], [42, 15.5], [40, 18],
  [37, 20], [35, 22],
  [33, 24], [32.5, 27], [32, 30],
  [34, 31.5], [30, 31],
  [25, 32], [20, 32.5], [15, 33],
  [12, 34], [10, 34.5], [8, 37],
  [7, 37.5], [2, 36.5], [-2, 35.5],
  [-5, 35],
];

const MADAGASCAR: [number, number][] = [
  [44, -12.5], [47, -14], [49, -16], [50, -20],
  [49, -24], [47, -25.5], [44, -24],
  [43, -20], [43.5, -16],
];

function toPath(coords: [number, number][]): string {
  return (
    coords
      .map((c, i) => {
        const [x, y] = geo(c[1], c[0]);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ') + ' Z'
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAP HUB DATA
   ═══════════════════════════════════════════════════════════════ */

interface HubLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  status: 'operational' | 'engineering' | 'planned';
  metric: string;
  labelKey: string;
  labelDx: number;
  labelDy: number;
}

const hubs: HubLocation[] = [
  { id: 'casablanca', name: 'Casablanca', lat: 33.57, lon: -7.59, status: 'operational', metric: '1,798 GPUs — 48 Active', labelKey: 'integrations.intelligence', labelDx: 16, labelDy: -4 },
  { id: 'dakhla', name: 'Dakhla', lat: 23.68, lon: -15.96, status: 'operational', metric: '400 GPUs — 94.8% Renewable', labelKey: 'integrations.intelligence', labelDx: 16, labelDy: 5 },
  { id: 'banjul', name: 'Banjul', lat: 13.45, lon: -16.57, status: 'engineering', metric: '500kT/yr Cement — Phase 2', labelKey: 'integrations.cement', labelDx: 16, labelDy: 12 },
  { id: 'dakar', name: 'Dakar', lat: 14.69, lon: -17.44, status: 'engineering', metric: 'IoT Mesh — 342 Sensors', labelKey: 'integrations.agriculture', labelDx: -80, labelDy: -6 },
  { id: 'nouakchott', name: 'Nouakchott', lat: 18.07, lon: -15.98, status: 'planned', metric: '3 Mineral Streams', labelKey: 'integrations.mining', labelDx: 16, labelDy: -4 },
  { id: 'bamako', name: 'Bamako', lat: 12.64, lon: -8.00, status: 'planned', metric: '200M m3/yr Desal', labelKey: 'integrations.water', labelDx: 16, labelDy: 5 },
];

const STATUS_COLORS: Record<string, string> = {
  operational: '#4A7B5F',
  engineering: '#8B9DAF',
  planned: '#8B9DAF',
};

const connections = [
  { from: 'casablanca', to: 'dakhla' },
  { from: 'dakhla', to: 'nouakchott' },
  { from: 'nouakchott', to: 'dakar' },
  { from: 'dakar', to: 'banjul' },
  { from: 'casablanca', to: 'bamako' },
];

/* ═══════════════════════════════════════════════════════════════
   DETERMINISTIC CHART DATA (seeded random for SSR hydration)
   ═══════════════════════════════════════════════════════════════ */

const seededRandom = (index: number) => {
  const seed = 42;
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
};

const energyData = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  // Solar peaks at midday, wind morning/evening
  const solarBase = Math.max(0, Math.sin((hour - 6) * Math.PI / 12)) * 180;
  const windBase = (Math.sin(hour * Math.PI / 8) * 40 + 50) * (hour < 6 || hour > 20 ? 1.3 : 0.7);
  const noise = (seededRandom(i) - 0.5) * 12;
  return {
    hour: `${hour.toString().padStart(2, '0')}:00`,
    output: Math.max(8, Math.round((solarBase + windBase + noise) * 10) / 10),
  };
});

const gpuUtilData = [
  { hub: 'Dakhla-1', util: 94 },
  { hub: 'Dakhla-2', util: 87 },
  { hub: 'Casablanca', util: 67 },
  { hub: 'Tanger', util: 82 },
  { hub: 'Marrakech', util: 78 },
];

const latencyData = Array.from({ length: 20 }, (_, i) => {
  const base = 14 + Math.sin(i * 0.4) * 2;
  const spike = (i === 7 || i === 15) ? 8 + seededRandom(100 + i) * 4 : 0;
  const noise = (seededRandom(200 + i) - 0.5) * 1.5;
  return {
    point: `T+${(i * 3).toString().padStart(2, '0')}s`,
    ms: Math.round((base + spike + noise) * 10) / 10,
  };
});

const efficiencyData = Array.from({ length: 12 }, (_, i) => {
  const base = 93.2 + Math.sin(i * 0.5) * 1.2;
  const noise = (seededRandom(300 + i) - 0.5) * 0.6;
  return {
    hour: `H${(i + 1).toString().padStart(2, '0')}`,
    eff: Math.round((base + noise) * 10) / 10,
  };
});

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CHART TOOLTIP
   ═══════════════════════════════════════════════════════════════ */

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D0D0D]/95 backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-[12px]">
      <p className="text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white font-[family-name:var(--font-space-mono)] font-bold">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: p.color }} />
          {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THREAT MONITOR MAP
   ═══════════════════════════════════════════════════════════════ */

function ThreatMonitorMap() {
  const t = useTranslations('platform');
  const [hovered, setHovered] = useState<string | null>(null);

  const africaPath = useMemo(() => toPath(AFRICA), []);
  const madagascarPath = useMemo(() => toPath(MADAGASCAR), []);

  const hubPos = useMemo(() => {
    const m = new Map<string, [number, number]>();
    hubs.forEach((h) => m.set(h.id, geo(h.lat, h.lon)));
    return m;
  }, []);

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[rgba(74,123,95,0.5)]" />
            <div className="w-2 h-2 rounded-full bg-[rgba(139,157,175,0.3)]" />
            <div className="w-2 h-2 rounded-full bg-[rgba(139,157,175,0.2)]" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
            {t('architecture.title')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A7B5F] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A7B5F]" style={{ boxShadow: '0 0 6px rgba(74,123,95,0.7)' }} />
          </span>
          <span className="text-[9px] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">
            LIVE — {hubs.filter((h) => h.status === 'operational').length} {t('capabilities.realTimeMonitoring.title').toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div
        className="relative rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0D0D0D] overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative w-full" style={{ aspectRatio: '800 / 900' }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VW} ${VH}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="platform-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="platformAfricaFill" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="rgba(139,157,175,0.06)" />
                <stop offset="100%" stopColor="rgba(139,157,175,0.01)" />
              </radialGradient>
              <radialGradient id="platformOpsGlow" cx="30%" cy="25%" r="40%">
                <stop offset="0%" stopColor="rgba(74,123,95,0.06)" />
                <stop offset="100%" stopColor="rgba(74,123,95,0)" />
              </radialGradient>
            </defs>

            {/* Subtle grid */}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`gh-${i}`} x1="0" y1={i * 50} x2={VW} y2={i * 50} stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 17 }, (_, i) => (
              <line key={`gv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2={VH} stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}

            {/* Operations area glow */}
            <rect x="0" y="50" width="280" height="300" fill="url(#platformOpsGlow)" />

            {/* Africa outline */}
            <motion.path
              d={africaPath}
              fill="url(#platformAfricaFill)"
              stroke="rgba(139,157,175,0.15)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />

            {/* Madagascar */}
            <motion.path
              d={madagascarPath}
              fill="url(#platformAfricaFill)"
              stroke="rgba(139,157,175,0.1)"
              strokeWidth="1"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />

            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = hubPos.get(conn.from)!;
              const to = hubPos.get(conn.to)!;
              const midX = (from[0] + to[0]) / 2;
              const midY = (from[1] + to[1]) / 2 - 18;
              const isHighlighted = hovered === conn.from || hovered === conn.to;
              const pathD = `M${from[0]},${from[1]} Q${midX},${midY} ${to[0]},${to[1]}`;

              return (
                <motion.g
                  key={`conn-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.08 }}
                >
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? 'rgba(74,123,95,0.4)' : 'rgba(139,157,175,0.08)'}
                    strokeWidth={isHighlighted ? 1.5 : 0.8}
                    strokeDasharray="4,6"
                    className="transition-all duration-500"
                  />
                  {isHighlighted && (
                    <>
                      <circle r="2" fill="#4A7B5F" opacity="0.8" filter="url(#platform-dot-glow)">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    </>
                  )}
                </motion.g>
              );
            })}

            {/* Hub dots */}
            {hubs.map((hub, idx) => {
              const [x, y] = hubPos.get(hub.id)!;
              const isHovered = hovered === hub.id;
              const color = STATUS_COLORS[hub.status];

              return (
                <motion.g
                  key={hub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.08 }}
                  onMouseEnter={() => setHovered(hub.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse ring 1 */}
                  <circle cx={x} cy={y} r="6" fill="none" stroke={color} strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="6;28;6" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="stroke-width" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                  </circle>

                  {/* Pulse ring 2 */}
                  <circle cx={x} cy={y} r="6" fill="none" stroke={color} strokeWidth="0.5" opacity="0">
                    <animate attributeName="r" values="6;20;6" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                  </circle>

                  {/* Main dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 7 : 5}
                    fill={color}
                    opacity={isHovered ? 1 : 0.85}
                    filter="url(#platform-dot-glow)"
                    className="transition-all duration-300"
                  />

                  {/* Inner core */}
                  <circle
                    cx={x}
                    cy={y}
                    r="1.8"
                    fill="#FFFFFF"
                    opacity={isHovered ? 1 : 0.7}
                    className="transition-opacity duration-300"
                  />

                  {/* Name label */}
                  <text
                    x={x + hub.labelDx}
                    y={y + hub.labelDy}
                    fontSize="10"
                    fontWeight="600"
                    fill={isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                    letterSpacing="0.1em"
                    className="transition-all duration-300 font-[family-name:var(--font-space-mono)]"
                  >
                    {hub.name.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Tooltip overlay */}
          <AnimatePresence>
            {hovered &&
              (() => {
                const hub = hubs.find((h) => h.id === hovered)!;
                const [x, y] = hubPos.get(hub.id)!;
                const color = STATUS_COLORS[hub.status];
                const leftPct = (x / VW) * 100;
                const topPct = (y / VH) * 100;
                const flipLeft = leftPct > 50;

                return (
                  <motion.div
                    key={`tooltip-${hub.id}`}
                    initial={{ opacity: 0, scale: 0.92, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -6 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: flipLeft ? `${leftPct - 25}%` : `${leftPct + 4}%`,
                      top: `${topPct - 2}%`,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <div className="bg-[#0D0D0D]/95 backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-lg p-3 sm:p-4 min-w-[170px] sm:min-w-[210px] max-w-[240px] sm:max-w-[270px] shadow-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
                        />
                        <span
                          className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)]"
                          style={{ color }}
                        >
                          {t(hub.labelKey)}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-white mb-1">{hub.name}</p>
                      <p className="text-[11px] text-[rgba(255,255,255,0.5)] leading-relaxed font-[family-name:var(--font-space-mono)]">
                        {hub.metric}
                      </p>
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        {[
          { color: '#4A7B5F', label: t('capabilities.realTimeMonitoring.title').toUpperCase() },
          { color: '#8B9DAF', label: t('capabilities.predictiveMaintenance.title').toUpperCase() },
          { color: '#8B9DAF', label: t('architecture.title').toUpperCase() },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}60` }} />
            <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INFRASTRUCTURE HEALTH CHARTS
   ═══════════════════════════════════════════════════════════════ */

function InfrastructureCharts() {
  const t = useTranslations('platform');
  const gridStroke = 'rgba(255,255,255,0.04)';
  const axisColor = 'rgba(255,255,255,0.2)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Energy Output — Area Chart */}
      <FadeIn>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.resourceOptimization.title')}</p>
              <p className="text-[13px] font-semibold text-white mt-1">{t('capabilities.resourceOptimization.description')}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[rgba(74,123,95,0.1)] flex items-center justify-center">
              <Zap size={14} className="text-[#4A7B5F]" />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="hour"
                  tick={{ fill: axisColor, fontSize: 9, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                  interval={5}
                />
                <YAxis
                  tick={{ fill: axisColor, fontSize: 9, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <defs>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A7B5F" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4A7B5F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="output"
                  stroke="#4A7B5F"
                  strokeWidth={2}
                  fill="url(#energyGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#4A7B5F', stroke: '#0D0D0D', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <span className="text-[11px] text-[#666666]">Peak: <span className="text-white font-[family-name:var(--font-space-mono)]">218.4 MW</span></span>
            <span className="text-[11px] text-[#666666]">Avg: <span className="text-white font-[family-name:var(--font-space-mono)]">94.7 MW</span></span>
          </div>
        </div>
      </FadeIn>

      {/* GPU Utilization — Bar Chart */}
      <FadeIn delay={0.1}>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.complianceAutomation.title')}</p>
              <p className="text-[13px] font-semibold text-white mt-1">{t('capabilities.complianceAutomation.description')}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[rgba(139,157,175,0.1)] flex items-center justify-center">
              <Cpu size={14} className="text-[#8B9DAF]" />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gpuUtilData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="hub"
                  tick={{ fill: axisColor, fontSize: 8, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: axisColor, fontSize: 9, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="util"
                  fill="#8B9DAF"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  fillOpacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <span className="text-[11px] text-[#666666]">Avg: <span className="text-white font-[family-name:var(--font-space-mono)]">81.6%</span></span>
            <span className="text-[11px] text-[#666666]">Max: <span className="text-white font-[family-name:var(--font-space-mono)]">94% Dakhla-1</span></span>
          </div>
        </div>
      </FadeIn>

      {/* Network Latency — Line Chart */}
      <FadeIn delay={0.2}>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.securityOperations.title')}</p>
              <p className="text-[13px] font-semibold text-white mt-1">{t('capabilities.securityOperations.description')}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[rgba(139,157,175,0.1)] flex items-center justify-center">
              <Activity size={14} className="text-[#8B9DAF]" />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="point"
                  tick={{ fill: axisColor, fontSize: 8, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: axisColor, fontSize: 9, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[8, 28]}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ms"
                  stroke="#8B9DAF"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#8B9DAF', stroke: '#0D0D0D', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <span className="text-[11px] text-[#666666]">Avg: <span className="text-white font-[family-name:var(--font-space-mono)]">14.2 ms</span></span>
            <span className="text-[11px] text-[#666666]">P99: <span className="text-white font-[family-name:var(--font-space-mono)]">24.7 ms</span></span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CEMENT FACTORY AI OPTIMIZATION PANEL
   ═══════════════════════════════════════════════════════════════ */

function CementAIPanel() {
  const t = useTranslations('platform');
  return (
    <div className="card p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left — Main metrics */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[rgba(74,123,95,0.1)] flex items-center justify-center">
              <Gauge size={18} className="text-[#4A7B5F]" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('integrations.cement')}</p>
              <p className="text-[15px] font-bold text-white">{t('capabilities.predictiveMaintenance.title')}</p>
            </div>
          </div>

          {/* Big metric */}
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)] mb-2">{t('capabilities.resourceOptimization.title')}</p>
            <p className="text-5xl md:text-6xl font-bold text-white stat-mono leading-none">
              <AnimatedCounter value={94.7} decimals={1} suffix="%" />
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="status-badge status-badge-active">
                <CheckCircle2 size={10} />
                {t('capabilities.realTimeMonitoring.title')}
              </span>
              <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)]">+2.3% vs baseline</span>
            </div>
          </div>

          {/* Sub-metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={12} className="text-[#8B9DAF]" />
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.predictiveMaintenance.title')}</span>
              </div>
              <p className="text-lg font-bold text-white stat-mono">1,423<span className="text-[13px] text-[#666666] ml-1">C</span></p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Server size={12} className="text-[#8B9DAF]" />
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.resourceOptimization.title')}</span>
              </div>
              <p className="text-lg font-bold text-white stat-mono">87.2<span className="text-[13px] text-[#666666] ml-1">t/hr</span></p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Radio size={12} className="text-[#4A7B5F]" />
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.carbonAwareScheduling.title')}</span>
              </div>
              <p className="text-lg font-bold text-white stat-mono">612<span className="text-[13px] text-[#666666] ml-1">kg/t</span></p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={12} className="text-[#A0524B]" />
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{t('capabilities.predictiveMaintenance.title')}</span>
              </div>
              <p className="text-[14px] font-bold text-[#A0524B] stat-mono leading-tight">Bearing #3</p>
              <p className="text-[9px] text-[#666666] font-[family-name:var(--font-space-mono)] mt-1">Flagged 12m ago</p>
            </div>
          </div>
        </div>

        {/* Right — Sparkline chart */}
        <div className="lg:w-[340px] flex-shrink-0 min-w-0">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)] mb-3">{t('capabilities.resourceOptimization.title')}</p>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="hour"
                  tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'var(--font-space-mono)' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[91, 96]}
                />
                <Tooltip content={<ChartTooltip />} />
                <defs>
                  <linearGradient id="effGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A7B5F" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#4A7B5F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="eff"
                  stroke="#4A7B5F"
                  strokeWidth={2}
                  fill="url(#effGradient)"
                  dot={false}
                  activeDot={{ r: 3, fill: '#4A7B5F', stroke: '#0D0D0D', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Status indicators */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 4px rgba(74,123,95,0.5)' }} />
                <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{t('capabilities.realTimeMonitoring.title')}</span>
              </div>
              <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)] font-semibold">{t('capabilities.realTimeMonitoring.title').toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 4px rgba(74,123,95,0.5)' }} />
                <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{t('capabilities.predictiveMaintenance.title')}</span>
              </div>
              <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)] font-semibold">v3.7.2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B9DAF]" style={{ boxShadow: '0 0 4px rgba(139,157,175,0.5)' }} />
                <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{t('capabilities.predictiveMaintenance.title')}</span>
              </div>
              <span className="text-[11px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)] font-semibold">{t('capabilities.realTimeMonitoring.title').toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 4px rgba(74,123,95,0.5)' }} />
                <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{t('capabilities.resourceOptimization.title')}</span>
              </div>
              <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)] font-semibold">{t('capabilities.realTimeMonitoring.title').toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function PlatformPageClient() {
  const t = useTranslations('platform');
  const tc = useTranslations('common');
  const liveTime = useLiveTimestamp();

  return (
    <div className="bg-[#0D0D0D]">
      {/* ═══════════════════════════════════════════
          HERO / HEADER BAR
          ═══════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 dot-pattern overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(74,123,95,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <Shield size={16} className="text-[#8B9DAF]" />
                  <span className="text-[13px] md:text-[15px] font-bold text-white tracking-[0.08em] font-[family-name:var(--font-space-mono)]">
                    HARCH OS <span className="text-[#8B9DAF]">{'//'}</span> PLATFORM
                  </span>
                  <span className="version-tag ml-1">v3.7.2</span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 4px rgba(74,123,95,0.6)' }} />
                  <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)] font-semibold tracking-wider">
                    {t('capabilities.realTimeMonitoring.title').toUpperCase()}
                  </span>
                </div>
                <div className="w-px h-3 bg-[rgba(255,255,255,0.08)]" />
                <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-[family-name:var(--font-space-mono)]">
                  5/5 HUBS ONLINE
                </span>
                <div className="w-px h-3 bg-[rgba(255,255,255,0.08)]" />
                <span className="text-[11px] text-[rgba(255,255,255,0.4)] font-[family-name:var(--font-space-mono)]">
                  2,847 ACTIVE SENSORS
                </span>
                <div className="w-px h-3 bg-[rgba(255,255,255,0.08)]" />
                <span className="text-[11px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)] flex items-center gap-1.5">
                  <Clock size={10} />
                  {liveTime}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('title')}<br />
              <span className="gradient-text">{t('subtitle')}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7]">
              {t('description')}
            </p>
          </FadeIn>

          {/* Quick stats row */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { value: 1798, suffix: '', label: t('capabilities.realTimeMonitoring.title'), color: '#4A7B5F' },
                { value: 94.7, suffix: '%', label: t('capabilities.resourceOptimization.title'), color: '#4A7B5F', decimals: 1 },
                { value: 14.2, suffix: ' ms', label: t('capabilities.securityOperations.title'), color: '#8B9DAF', decimals: 1 },
                { value: 2847, suffix: '', label: t('capabilities.realTimeMonitoring.title'), color: '#8B9DAF' },
              ].map((stat) => (
                <div key={stat.label} className="card p-5">
                  <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                    <AnimatedCounter value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GLOBAL THREAT MONITOR MAP
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#111111] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('capabilities.realTimeMonitoring.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('integrations.title')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('integrations.description')}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ThreatMonitorMap />
          </FadeIn>

          {/* Hub detail cards below map */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {hubs.slice(0, 3).map((hub) => {
                const color = STATUS_COLORS[hub.status];
                return (
                  <div key={hub.id} className="card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}60` }} />
                      <span className="text-[13px] font-bold text-white">{hub.name}</span>
                      <span
                        className="ml-auto text-[9px] font-bold tracking-[0.1em] uppercase font-[family-name:var(--font-space-mono)]"
                        style={{ color }}
                      >
                        {hub.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#666666] font-[family-name:var(--font-space-mono)]">{hub.metric}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INFRASTRUCTURE HEALTH CHARTS
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('capabilities.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('capabilities.realTimeMonitoring.title')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('capabilities.realTimeMonitoring.description')}
            </p>
          </FadeIn>

          <InfrastructureCharts />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CEMENT FACTORY AI OPTIMIZATION PANEL
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#111111] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('capabilities.predictiveMaintenance.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('capabilities.predictiveMaintenance.description')}
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('capabilities.predictiveMaintenance.description')}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CementAIPanel />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Request Platform Access
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)] relative overflow-hidden">
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(74,123,95,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="section-label mb-6">{t('api.title')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('cta.title')}
            </h2>
            <div className="accent-line mx-auto mb-6" style={{ width: '48px' }} />
            <p className="max-w-xl mx-auto text-[15px] text-[#999999] leading-[1.7] mb-10">
              {t('cta.subtitle')}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all"
              >
                {t('cta.primary')} <ArrowRight size={14} />
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all"
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
              {[
                { icon: Shield, label: t('api.authentication') },
                { icon: Lock, label: t('api.webhooks') },
                { icon: Bell, label: t('capabilities.realTimeMonitoring.title') },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#666666]" />
                  <span className="text-[12px] text-[#666666]">{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
