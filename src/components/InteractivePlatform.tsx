'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Search, Bell, Map, LayoutGrid, BarChart3,
  ChevronRight, ChevronDown, Package, Truck, Factory,
  Users, CheckCircle, AlertTriangle, Clock, Zap,
  Shield, Activity, Globe, Eye, Radio, Cpu,
  ArrowRight, X, Layers, Database, AlertCircle,
  TrendingUp, Circle, Box, MapPin
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE PLATFORM — Palantir Foundry Design Language
   Dark navy, icon sidebar, map-centric, data-dense
   ═══════════════════════════════════════════════════════════════ */

// ─── Types ───
interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

type ModuleId = 'supply-chain' | 'geospatial' | 'operations';

// ─── Style Constants ───
const BG = '#10111a';
const PANEL = '#1a1b2e';
const PANEL_LIGHT = '#222340';
const BORDER = 'rgba(255,255,255,0.06)';
const BLUE = '#3b82f6';
const GREEN = '#4ade80';
const ORANGE = '#f97316';
const PURPLE = '#a78bfa';
const RED = '#ef4444';

// ─── Data ───
const sidebarIcons = [
  { icon: LayoutGrid, id: 'supply-chain' as ModuleId, tooltip: 'Supply Chain' },
  { icon: Map, id: 'geospatial' as ModuleId, tooltip: 'Geospatial' },
  { icon: Activity, id: 'operations' as ModuleId, tooltip: 'Operations' },
  { icon: Search, id: 'search' as ModuleId, tooltip: 'Search' },
  { icon: Bell, id: 'alerts' as ModuleId, tooltip: 'Alerts' },
];

const supplyChainTabs = ['Network View', 'Alerts', 'Tickets', 'Reallocation Proposals'];

const mapMarkers = [
  { x: 48, y: 32, color: GREEN, label: 'Casablanca Plant', type: 'infrastructure' },
  { x: 46, y: 26, color: GREEN, label: 'Rabat Plant', type: 'infrastructure' },
  { x: 50, y: 40, color: GREEN, label: 'Marrakech Plant', type: 'infrastructure' },
  { x: 44, y: 18, color: GREEN, label: 'Tangier Plant', type: 'infrastructure' },
  { x: 38, y: 48, color: ORANGE, label: 'Agadir DC', type: 'distribution' },
  { x: 55, y: 38, color: ORANGE, label: 'Oujda DC', type: 'distribution' },
  { x: 47, y: 30, color: BLUE, label: 'Casa Customer Hub', type: 'customer' },
  { x: 52, y: 35, color: BLUE, label: 'Fes Customer Zone', type: 'customer' },
  { x: 42, y: 44, color: ORANGE, label: 'Dakhla DC', type: 'distribution' },
];

const objectBrowserItems = [
  { label: 'Infrastructure Plants', icon: Factory, count: 4, color: GREEN, children: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier'] },
  { label: 'Distribution Centers', icon: Package, count: 3, color: ORANGE, children: ['Agadir', 'Oujda', 'Dakhla'] },
  { label: 'Customers', icon: Users, count: 2, color: BLUE, children: ['Casa Hub', 'Fes Zone'] },
  { label: 'Deliveries', icon: Truck, count: 12, color: PURPLE, children: ['Active: 8', 'Pending: 4'] },
];

const proposals = [
  { id: 'PR-4182', from: 'Tangier', to: 'Casablanca', sku: 'Cement Grade-A', qty: '2,400 T', status: 'pending', confidence: 94 },
  { id: 'PR-4191', from: 'Dakhla', to: 'Agadir', sku: 'Raw Phosphate', qty: '5,800 T', status: 'auto', confidence: 97 },
  { id: 'PR-4203', from: 'Marrakech', to: 'Oujda', sku: 'Steel Rebar', qty: '1,200 T', status: 'pending', confidence: 82 },
  { id: 'PR-4210', from: 'Rabat', to: 'Casablanca', sku: 'Solar Panels', qty: '340 U', status: 'pending', confidence: 89 },
];

const geoTargets = [
  { id: 'TGT-001', name: 'Site Alpha', priority: 'P1', status: 'active', lat: 33.5, lng: -7.6, type: 'signal' },
  { id: 'TGT-002', name: 'Site Beta', priority: 'P2', status: 'monitoring', lat: 31.6, lng: -8.0, type: 'movement' },
  { id: 'TGT-003', name: 'Site Gamma', priority: 'P1', status: 'active', lat: 34.0, lng: -6.8, type: 'signal' },
  { id: 'TGT-004', name: 'Site Delta', priority: 'P3', status: 'dormant', lat: 30.4, lng: -9.6, type: 'static' },
  { id: 'TGT-005', name: 'Site Epsilon', priority: 'P2', status: 'monitoring', lat: 35.7, lng: -5.8, type: 'movement' },
  { id: 'TGT-006', name: 'Site Zeta', priority: 'P4', status: 'dormant', lat: 29.7, lng: -10.2, type: 'static' },
];

const operationsMetrics = [
  { label: 'Energy', value: '2.4 GW', status: 'operational', icon: Zap },
  { label: 'Mining', value: '18.2k T/day', status: 'operational', icon: BarChart3 },
  { label: 'Cement', value: '94.7%', status: 'operational', icon: Factory },
  { label: 'Agriculture', value: '12.4 T/ha', status: 'staging', icon: Globe },
  { label: 'Technology', value: '1,798 GPU', status: 'operational', icon: Cpu },
  { label: 'Finance', value: '$2.1B AUM', status: 'operational', icon: TrendingUp },
  { label: 'Water', value: '340M m³', status: 'warning', icon: Activity },
  { label: 'Logistics', value: '12 Active', status: 'operational', icon: Truck },
];

const liveFeed = [
  { time: '14:23:01', msg: 'SUPPLY-CHAIN: Auto-reallocated 2,400T Cement → Casablanca', type: 'action' },
  { time: '14:23:05', msg: 'GEO-INT: New signal detected at Site Alpha perimeter', type: 'alert' },
  { time: '14:23:12', msg: 'OPS: All verticals reporting within SLA thresholds', type: 'health' },
  { time: '14:23:18', msg: 'WATER: Irrigation zone C moisture below threshold — 23%', type: 'warn' },
  { time: '14:23:25', msg: 'TECH: GPU cluster rebalanced — carbon intensity optimal', type: 'info' },
  { time: '14:23:31', msg: 'SUPPLY-CHAIN: Delivery #D-4182 arrived at Agadir DC', type: 'action' },
];

// ═══════════════════════════════════════════════════════════════
// Africa Map SVG Component
// ═══════════════════════════════════════════════════════════════
function AfricaMap({ markers, activeMarker, onMarkerClick }: {
  markers: typeof mapMarkers;
  activeMarker: number | null;
  onMarkerClick: (i: number) => void;
}) {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" style={{ minHeight: 220 }}>
      {/* Ocean */}
      <rect x="0" y="0" width="100" height="80" fill="#0d0e1a" />
      {/* Africa continent outline (simplified) */}
      <path
        d="M 42 8 Q 44 6 48 8 L 52 10 Q 56 14 58 18 L 56 22 Q 58 26 56 30 L 54 34 Q 52 38 54 42 L 52 46 Q 48 50 46 52 L 44 56 Q 42 60 38 62 L 36 64 Q 34 68 36 72 L 38 76 Q 36 78 34 76 L 30 72 Q 28 68 26 64 L 24 58 Q 22 52 24 46 L 26 40 Q 24 34 26 28 L 28 22 Q 30 16 34 12 L 38 10 Z"
        fill="#1a1b2e" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"
      />
      {/* Morocco region highlight */}
      <path
        d="M 38 8 Q 42 6 48 8 L 52 10 Q 54 12 54 14 L 52 16 Q 50 18 48 18 L 44 16 Q 40 14 38 12 Z"
        fill="#252640" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3"
      />
      {/* Grid lines */}
      {[20, 40, 60, 80].map(x => (
        <line key={`vl${x}`} x1={x} y1="0" x2={x} y2="80" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2" />
      ))}
      {[20, 40, 60].map(y => (
        <line key={`hl${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.02)" strokeWidth="0.2" />
      ))}
      {/* Connection lines */}
      <line x1="48" y1="32" x2="46" y2="26" stroke="rgba(74,222,128,0.15)" strokeWidth="0.3" strokeDasharray="1 0.5" />
      <line x1="48" y1="32" x2="50" y2="40" stroke="rgba(74,222,128,0.15)" strokeWidth="0.3" strokeDasharray="1 0.5" />
      <line x1="48" y1="32" x2="38" y2="48" stroke="rgba(249,115,22,0.15)" strokeWidth="0.3" strokeDasharray="1 0.5" />
      {/* Markers */}
      {markers.map((m, i) => (
        <g key={i} onClick={() => onMarkerClick(i)} style={{ cursor: 'pointer' }}>
          {/* Pulse ring */}
          {activeMarker === i && (
            <circle cx={m.x} cy={m.y} r="3" fill="none" stroke={m.color} strokeWidth="0.3" opacity="0.5">
              <animate attributeName="r" from="1.5" to="4" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={m.x} cy={m.y} r={activeMarker === i ? 1.8 : 1.2}
            fill={m.color} opacity={activeMarker === i ? 1 : 0.7}
            stroke={activeMarker === i ? m.color : 'transparent'} strokeWidth="0.5"
          />
          <text x={m.x} y={m.y - 2.2} fill="rgba(255,255,255,0.5)" fontSize="1.8" textAnchor="middle" style={{ display: activeMarker === i ? 'block' : 'none' }}>
            {m.label.split(' ')[0]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Geospatial Map SVG
// ═══════════════════════════════════════════════════════════════
function GeoMap({ targets, activeTarget, onTargetClick }: {
  targets: typeof geoTargets;
  activeTarget: number | null;
  onTargetClick: (i: number) => void;
}) {
  const toSvg = (lat: number, lng: number) => ({
    x: ((lng + 14) / 10) * 100,
    y: ((40 - lat) / 15) * 80,
  });
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" style={{ minHeight: 220 }}>
      <rect x="0" y="0" width="100" height="80" fill="#0d0e1a" />
      {/* Morocco outline */}
      <path
        d="M 38 8 Q 42 6 48 8 L 52 10 Q 54 12 54 14 L 52 16 Q 50 18 48 18 L 44 16 Q 40 14 38 12 Z"
        fill="#1a1b2e" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"
      />
      {/* Crosshairs */}
      <line x1="50" y1="0" x2="50" y2="80" stroke="rgba(239,68,68,0.06)" strokeWidth="0.15" strokeDasharray="2 1" />
      <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(239,68,68,0.06)" strokeWidth="0.15" strokeDasharray="2 1" />
      {/* Range rings */}
      <circle cx="50" cy="30" r="15" fill="none" stroke="rgba(239,68,68,0.04)" strokeWidth="0.2" />
      <circle cx="50" cy="30" r="25" fill="none" stroke="rgba(239,68,68,0.03)" strokeWidth="0.2" />
      {/* Target markers */}
      {targets.map((tgt, i) => {
        const pos = toSvg(tgt.lat, tgt.lng);
        const isActive = activeTarget === i;
        const color = tgt.priority === 'P1' ? RED : tgt.priority === 'P2' ? ORANGE : tgt.priority === 'P3' ? '#eab308' : PURPLE;
        return (
          <g key={tgt.id} onClick={() => onTargetClick(i)} style={{ cursor: 'pointer' }}>
            {isActive && (
              <circle cx={pos.x} cy={pos.y} r="3" fill="none" stroke={color} strokeWidth="0.3">
                <animate attributeName="r" from="1.5" to="5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Diamond marker */}
            <polygon
              points={`${pos.x},${pos.y - 1.5} ${pos.x + 1.2},${pos.y} ${pos.x},${pos.y + 1.5} ${pos.x - 1.2},${pos.y}`}
              fill={color} opacity={isActive ? 1 : 0.7}
            />
            <text x={pos.x} y={pos.y - 2.5} fill="rgba(255,255,255,0.6)" fontSize="1.6" textAnchor="middle" style={{ display: isActive ? 'block' : 'none' }}>
              {tgt.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Supply Chain Control Tower Module
// ═══════════════════════════════════════════════════════════════
function SupplyChainModule({ t }: { t: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [expandedObjects, setExpandedObjects] = useState<number[]>([0]);
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  const toggleObject = useCallback((i: number) => {
    setExpandedObjects(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { label: t('supplyChain.metricSolutions'), value: '236', icon: Zap, color: BLUE },
          { label: t('supplyChain.metricActioned'), value: '31', icon: CheckCircle, color: GREEN },
          { label: t('supplyChain.metricApproval'), value: '205', icon: AlertTriangle, color: ORANGE },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg p-3 border"
            style={{ backgroundColor: PANEL, borderColor: BORDER }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <m.icon size={13} style={{ color: m.color }} />
              <span className="text-[10px] text-white/40 uppercase tracking-wider">{m.label}</span>
            </div>
            <span className="text-2xl font-bold text-white font-mono">{m.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Object Browser | Map | Proposals */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Object Browser */}
        <div className="hidden lg:block w-52 flex-shrink-0 rounded-lg border overflow-hidden" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          <div className="px-3 py-2 border-b" style={{ borderColor: BORDER }}>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('supplyChain.objectBrowser')}</span>
          </div>
          <div className="p-2 space-y-0.5 max-h-[340px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {objectBrowserItems.map((item, i) => (
              <div key={item.label}>
                <button
                  onClick={() => toggleObject(i)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.03] transition-colors text-left group"
                >
                  {expandedObjects.includes(i)
                    ? <ChevronDown size={10} className="text-white/20 flex-shrink-0" />
                    : <ChevronRight size={10} className="text-white/20 flex-shrink-0" />
                  }
                  <item.icon size={11} style={{ color: item.color }} className="flex-shrink-0" />
                  <span className="text-[10px] text-white/60 group-hover:text-white/80 truncate flex-1">{item.label}</span>
                  <span className="text-[9px] font-mono text-white/20">{item.count}</span>
                </button>
                <AnimatePresence>
                  {expandedObjects.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden ml-5 border-l"
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      {item.children.map((child) => (
                        <div key={child} className="flex items-center gap-1.5 px-2 py-1 text-[9px] text-white/30 hover:text-white/50 hover:bg-white/[0.02] cursor-pointer rounded">
                          <Circle size={4} style={{ color: item.color }} fill={item.color} />
                          <span className="font-mono">{child}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Map Centerpiece */}
        <div className="flex-1 min-w-0 rounded-lg border overflow-hidden" style={{ backgroundColor: '#0d0e1a', borderColor: BORDER }}>
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2">
              <Map size={11} className="text-blue-400" />
              <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('supplyChain.networkMap')}</span>
            </div>
            <div className="flex items-center gap-3">
              {[{ color: GREEN, label: t('supplyChain.infrastructure') }, { color: ORANGE, label: t('supplyChain.distribution') }, { color: BLUE, label: t('supplyChain.customers') }].map(l => (
                <span key={l.label} className="flex items-center gap-1 text-[9px] text-white/25">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2">
            <AfricaMap markers={mapMarkers} activeMarker={activeMarker} onMarkerClick={setActiveMarker} />
          </div>
          {activeMarker !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-2 border-t flex items-center gap-3"
              style={{ borderColor: BORDER, backgroundColor: PANEL }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mapMarkers[activeMarker].color }} />
              <span className="text-[10px] text-white/70 font-mono">{mapMarkers[activeMarker].label}</span>
              <span className="text-[9px] text-white/30 uppercase">{mapMarkers[activeMarker].type}</span>
              <button onClick={() => setActiveMarker(null)} className="ml-auto text-white/20 hover:text-white/40">
                <X size={10} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Proposal Review Panel */}
        <div className="hidden md:block w-64 flex-shrink-0 rounded-lg border overflow-hidden" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          <div className="px-3 py-2 border-b" style={{ borderColor: BORDER }}>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('supplyChain.proposals')}</span>
          </div>
          <div className="max-h-[340px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {proposals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`px-3 py-2 border-b cursor-pointer transition-colors ${selectedProposal === i ? 'bg-blue-500/10' : 'hover:bg-white/[0.02]'}`}
                style={{ borderColor: selectedProposal === i ? 'rgba(59,130,246,0.2)' : BORDER }}
                onClick={() => setSelectedProposal(selectedProposal === i ? null : i)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-white/70">{p.id}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${p.status === 'auto' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                    {p.status === 'auto' ? t('supplyChain.auto') : t('supplyChain.pending')}
                  </span>
                </div>
                <div className="text-[9px] text-white/30 font-mono mb-1">
                  {p.from} → {p.to}
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-white/40">{p.sku}</span>
                  <span className="text-white/50 font-mono">{p.qty}</span>
                </div>
                {selectedProposal === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 flex gap-2"
                  >
                    <button className="flex-1 text-[9px] py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors font-bold uppercase">
                      {t('supplyChain.accept')}
                    </button>
                    <button className="flex-1 text-[9px] py-1 rounded bg-white/[0.04] text-white/40 hover:bg-white/[0.08] transition-colors font-bold uppercase">
                      {t('supplyChain.modify')}
                    </button>
                    <button className="flex-1 text-[9px] py-1 rounded bg-white/[0.04] text-white/30 hover:bg-white/[0.08] transition-colors font-bold uppercase">
                      {t('supplyChain.explain')}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Geospatial Intelligence Module
// ═══════════════════════════════════════════════════════════════
function GeospatialModule({ t }: { t: any }) {
  const [activeTarget, setActiveTarget] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Map + Target List */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Target List */}
        <div className="hidden lg:block w-56 flex-shrink-0 rounded-lg border overflow-hidden" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          <div className="px-3 py-2 border-b" style={{ borderColor: BORDER }}>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('geospatial.targetList')}</span>
          </div>
          <div className="max-h-[380px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {geoTargets.map((tgt, i) => {
              const prioColor = tgt.priority === 'P1' ? RED : tgt.priority === 'P2' ? ORANGE : tgt.priority === 'P3' ? '#eab308' : PURPLE;
              return (
                <button
                  key={tgt.id}
                  onClick={() => setActiveTarget(activeTarget === i ? null : i)}
                  className={`w-full px-3 py-2 border-b text-left transition-colors ${activeTarget === i ? 'bg-blue-500/10' : 'hover:bg-white/[0.02]'}`}
                  style={{ borderColor: activeTarget === i ? 'rgba(59,130,246,0.2)' : BORDER }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono text-white/70">{tgt.id}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${prioColor}20`, color: prioColor }}>
                      {tgt.priority}
                    </span>
                  </div>
                  <div className="text-[9px] text-white/40">{tgt.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tgt.status === 'active' ? 'bg-red-400 animate-pulse' : tgt.status === 'monitoring' ? 'bg-amber-400' : 'bg-white/20'}`} />
                    <span className="text-[8px] text-white/25 uppercase">{tgt.status}</span>
                    <span className="text-[8px] text-white/20">·</span>
                    <span className="text-[8px] text-white/20 capitalize">{tgt.type}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 min-w-0 rounded-lg border overflow-hidden" style={{ backgroundColor: '#0d0e1a', borderColor: BORDER }}>
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2">
              <Eye size={11} className="text-red-400" />
              <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('geospatial.geoView')}</span>
            </div>
            <button className="text-[9px] px-2 py-1 rounded bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-colors font-bold uppercase flex items-center gap-1">
              <Layers size={9} /> {t('geospatial.taskAsset')}
            </button>
          </div>
          <div className="p-2">
            <GeoMap targets={geoTargets} activeTarget={activeTarget} onTargetClick={setActiveTarget} />
          </div>
          {activeTarget !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2 border-t flex items-center gap-4"
              style={{ borderColor: BORDER, backgroundColor: PANEL }}
            >
              <span className="text-[10px] font-mono text-white/70">{geoTargets[activeTarget].id}</span>
              <span className="text-[10px] text-white/50">{geoTargets[activeTarget].name}</span>
              <span className="text-[9px] text-white/30 font-mono">{geoTargets[activeTarget].lat.toFixed(1)}, {geoTargets[activeTarget].lng.toFixed(1)}</span>
              <button onClick={() => setActiveTarget(null)} className="ml-auto text-white/20 hover:text-white/40">
                <X size={10} />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-3 px-3 py-2 rounded-lg border flex items-center justify-between" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
        <div className="flex items-center gap-4 text-[9px]">
          <span className="text-white/20 uppercase">{t('geospatial.status')}</span>
          <span className="flex items-center gap-1 text-emerald-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('geospatial.synced')}
          </span>
          <span className="text-white/20">{geoTargets.length} {t('geospatial.targetsTracked')}</span>
        </div>
        <span className="text-[9px] font-mono text-white/20">
          {t('geospatial.lastUpdate')}: 14:23:45 UTC
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Operations Center Module
// ═══════════════════════════════════════════════════════════════
function OperationsModule({ t }: { t: any }) {
  return (
    <div className="flex flex-col h-full gap-3">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {operationsMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg p-3 border"
            style={{ backgroundColor: PANEL, borderColor: BORDER }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">{m.label}</span>
              <m.icon size={12} className="text-white/15" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-lg font-bold text-white font-mono">{m.value}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                m.status === 'operational' ? 'bg-emerald-500/15 text-emerald-400' :
                m.status === 'warning' ? 'bg-amber-500/15 text-amber-400' :
                'bg-purple-500/15 text-purple-400'
              }`}>
                {m.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status + Feed */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Vertical Status */}
        <div className="w-52 flex-shrink-0 rounded-lg border overflow-hidden" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          <div className="px-3 py-2 border-b" style={{ borderColor: BORDER }}>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('operations.verticalStatus')}</span>
          </div>
          <div className="p-2 space-y-1">
            {operationsMetrics.map((m) => (
              <div key={m.label} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.02] cursor-pointer">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  m.status === 'operational' ? 'bg-emerald-400' :
                  m.status === 'warning' ? 'bg-amber-400' :
                  'bg-purple-400'
                }`} />
                <span className="text-[10px] text-white/50 flex-1">{m.label}</span>
                <span className="text-[9px] font-mono text-white/30">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        <div className="flex-1 min-w-0 rounded-lg border overflow-hidden" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2">
              <Radio size={11} className="text-emerald-400" />
              <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{t('operations.liveFeed')}</span>
            </div>
            <span className="flex items-center gap-1 text-[9px] text-emerald-400/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="p-3 space-y-2 max-h-[320px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {liveFeed.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-2"
              >
                <span className="text-[10px] font-mono text-white/20 flex-shrink-0">{item.time}</span>
                <span className={`text-[10px] ${
                  item.type === 'action' ? 'text-blue-400/70' :
                  item.type === 'alert' ? 'text-red-400/70' :
                  item.type === 'warn' ? 'text-amber-400/70' :
                  item.type === 'health' ? 'text-emerald-400/60' :
                  'text-white/40'
                }`}>{item.msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════════════════
export function InteractivePlatform({ slug, accent: _accentOverride }: InteractivePlatformProps) {
  const t = useTranslations('interactivePlatform');
  const [activeModule, setActiveModule] = useState<ModuleId>('supply-chain');
  const [activeTab, setActiveTab] = useState(0);

  // Determine initial module from slug
  React.useEffect(() => {
    if (slug === 'intelligence' || slug === 'agriculture') {
      setActiveModule('supply-chain');
    }
  }, [slug]);

  const moduleNames: Record<ModuleId, string> = {
    'supply-chain': t('supplyChain.moduleName'),
    'geospatial': t('geospatial.moduleName'),
    'operations': t('operations.moduleName'),
  };

  const moduleTabs: Record<ModuleId, string[]> = {
    'supply-chain': supplyChainTabs,
    'geospatial': [t('geospatial.headerTabs.mapView'), t('geospatial.headerTabs.timeline'), t('geospatial.headerTabs.analysis')],
    'operations': [t('operations.headerTabs.overview'), t('operations.headerTabs.metrics'), t('operations.headerTabs.incidents')],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-xl overflow-hidden border"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      {/* Header */}
      <div className="flex items-center h-11 border-b" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
        {/* Logo area */}
        <div className="w-[60px] flex items-center justify-center border-r" style={{ borderColor: BORDER }}>
          <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.15)' }}>
            <Database size={10} className="text-blue-400" />
          </div>
        </div>

        {/* Section title */}
        <div className="px-4 flex items-center gap-2">
          <span className="text-sm font-bold text-white/90">{moduleNames[activeModule]}</span>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-0 ml-2">
          {(moduleTabs[activeModule] || []).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 text-[11px] font-medium transition-colors ${
                activeTab === i
                  ? 'text-white/90 border-b-2 border-blue-400'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 pr-3">
          <button className="text-[9px] px-2 py-1 rounded bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-colors font-bold uppercase">
            {t('export')}
          </button>
          <button className="text-[9px] px-2 py-1 rounded bg-white/[0.04] text-white/30 hover:bg-white/[0.08] transition-colors font-bold uppercase">
            {t('settings')}
          </button>
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex" style={{ minHeight: 500 }}>
        {/* Thin icon sidebar */}
        <div className="w-[60px] flex-shrink-0 border-r flex flex-col items-center py-3 gap-1" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
          {sidebarIcons.map((item) => {
            const isActive = activeModule === item.id;
            const isModuleSwitch = ['supply-chain', 'geospatial', 'operations'].includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => isModuleSwitch ? (setActiveModule(item.id as ModuleId), setActiveTab(0)) : undefined}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group relative ${
                  isActive ? 'bg-blue-500/15' : 'hover:bg-white/[0.04]'
                }`}
                title={item.tooltip}
              >
                <item.icon size={18} className={isActive ? 'text-blue-400' : 'text-white/25 group-hover:text-white/50'} />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r bg-blue-400"
                  />
                )}
              </button>
            );
          })}
          <div className="mt-auto" />
          <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/[0.04] transition-colors group" title="Home">
            <Home size={18} className="text-white/15 group-hover:text-white/30" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeModule === 'supply-chain' && (
              <motion.div key="supply-chain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <SupplyChainModule t={t} />
              </motion.div>
            )}
            {activeModule === 'geospatial' && (
              <motion.div key="geospatial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <GeospatialModule t={t} />
              </motion.div>
            )}
            {activeModule === 'operations' && (
              <motion.div key="operations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <OperationsModule t={t} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-7 border-t flex items-center px-4 gap-4" style={{ backgroundColor: PANEL, borderColor: BORDER }}>
        <span className="flex items-center gap-1 text-[9px] text-emerald-400/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t('allSystemsNominal')}
        </span>
        <span className="text-[9px] text-white/15">|</span>
        <span className="text-[9px] font-mono text-white/20">REGION: MOROCCO</span>
        <span className="text-[9px] text-white/15">|</span>
        <span className="text-[9px] font-mono text-white/20">{t('live')}</span>
        <span className="ml-auto text-[9px] font-mono text-white/15">
          14:23:45 UTC
        </span>
      </div>
    </motion.div>
  );
}
