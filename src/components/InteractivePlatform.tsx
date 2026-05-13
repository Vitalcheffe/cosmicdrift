'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, Cpu, Zap, Droplets, Thermometer, Wind, Sun, Battery, Activity,
  Shield, MapPin, BarChart3, Box, Truck, Factory, Mountain, Wheat, Waves,
  Globe, Eye, Radio, Terminal as TerminalIcon, Code, GitBranch, Play,
  CheckCircle, AlertTriangle, ChevronRight, X, Layout, Gauge, Droplet,
  Leaf, CloudRain, Sun as SunIcon, Wind as WindIcon, RefreshCw, ArrowRight,
  Settings, Bell, Search, Home, Layers, Database, HardDrive, Monitor,
  RadioTower, Network, Lock, Key, FileCode, Package, TrendingUp, Clock,
  Users, Cpu as GpuIcon, Landmark, DollarSign, Percent, PieChart, Plane,
  Warehouse, Sprout, AlertCircle
} from 'lucide-react';
import { GuidedTour, type TourStep } from '@/components/GuidedTour';

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE PLATFORM — Unique dashboards per subsidiary
   Each subsidiary has a distinct visual language, layout, and
   interaction pattern. No emojis — only Lucide icons.
   ═══════════════════════════════════════════════════════════════ */

// ─── Types ───
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
}

interface MetricCard {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  icon?: React.ReactNode;
}

interface DashboardConfig {
  platformName: string;
  platformVersion: string;
  accent: string;
  bgGradient: string;
  sidebar: SidebarItem[];
  headerTabs: string[];
  tourSteps: TourStep[];
  metricCards: MetricCard[];
  renderMain: (accent: string, activeTab: number, activeSidebar: number, selectedHub: number | null, selectedPlot: number | null, toggleIrrigation: (zone: number) => void, irrigationState: boolean[]) => React.ReactNode;
  renderSidebar: (accent: string, activeTab: number, activeSidebar: number) => React.ReactNode;
  backgroundImage?: string;
  statusBarText: string;
}

// ═══════════════════════════════════════════════════════════════
// INTELLIGENCE — HarchOS Console
// Terminal/code editor aesthetic, monospace fonts, dark navy
// ═══════════════════════════════════════════════════════════════
const intelligenceConfig: DashboardConfig = {
  platformName: 'HarchOS Console',
  platformVersion: '0.1',
  accent: '#8B9DAF',
  bgGradient: 'from-[#0A0F1E] to-[#0D1117]',
  sidebar: [
    { icon: <Server size={13} />, label: 'Cluster Overview' },
    { icon: <Cpu size={13} />, label: 'GPU Status' },
    { icon: <Leaf size={13} />, label: 'Carbon Router' },
    { icon: <Layers size={13} />, label: 'Workloads' },
    { icon: <Shield size={13} />, label: 'Data Residency' },
    { icon: <TerminalIcon size={13} />, label: 'API Console' },
  ],
  headerTabs: ['Overview', 'Hubs', 'Carbon', 'Terminal'],
  tourSteps: [
    { targetId: 'intel-metric-gpus', label: 'A', title: 'GPU Cluster Status', description: '1,798 carbon-optimized GPUs across 5 Moroccan hubs. Carbon-aware scheduling routes workloads to the greenest hub in real-time.', position: 'bottom' },
    { targetId: 'intel-carbon-route', label: 'B', title: 'Carbon-Aware Routing', description: 'Our scheduler automatically selects the hub with the lowest carbon intensity. Average: ~47 gCO2/kWh — 89% below industry standard.', position: 'bottom' },
    { targetId: 'intel-hub-map', label: 'C', title: 'Hub Network', description: '5 sovereign hubs across Morocco. Dakhla hub connects directly to Europe via submarine cable. All data stays under Moroccan jurisdiction.', position: 'top' },
  ],
  metricCards: [
    { id: 'intel-metric-gpus', label: 'Active GPUs', value: '1,798', change: '+120', changeUp: true, icon: <Cpu size={14} /> },
    { id: 'intel-carbon-route', label: 'Avg Carbon', value: '~47 gCO2/kWh', change: '-12%', changeUp: true, icon: <Leaf size={14} /> },
    { id: 'intel-metric-renew', label: 'Renewable', value: '81.5%', change: '+3.2%', changeUp: true, icon: <Zap size={14} /> },
    { id: 'intel-metric-uptime', label: 'Uptime', value: '99.97%', change: '+0.02%', changeUp: true, icon: <Activity size={14} /> },
  ],
  statusBarText: 'REGION: MOROCCO | 5 HUBS ONLINE',
  renderMain: (accent, activeTab, activeSidebar, selectedHub, setSelectedHub, _toggleIrr, _irrState) => {
    const hubs = [
      { name: 'Casablanca', gpus: 384, load: 78, carbon: 42, status: 'online' },
      { name: 'Rabat', gpus: 256, load: 65, carbon: 38, status: 'online' },
      { name: 'Marrakech', gpus: 320, load: 82, carbon: 51, status: 'online' },
      { name: 'Tangier', gpus: 448, load: 71, carbon: 44, status: 'online' },
      { name: 'Dakhla', gpus: 390, load: 45, carbon: 35, status: 'staging' },
    ];
    const terminalLines = [
      { time: '14:23:01', msg: 'CARBON-ROUTER: Routing workload #4182 → Dakhla (35 gCO2/kWh)', type: 'route' },
      { time: '14:23:05', msg: 'GPU-ALLOC: Casablanca hub → 128 GPUs assigned to training job', type: 'alloc' },
      { time: '14:23:12', msg: 'HEALTH-CHECK: All 5 hubs responding within SLA (<2ms)', type: 'health' },
      { time: '14:23:18', msg: 'CARBON-ROUTER: Tangier carbon intensity rising → 44 gCO2/kWh', type: 'warn' },
      { time: '14:23:25', msg: 'DATA-RESIDENCY: All data queries within Moroccan jurisdiction', type: 'info' },
      { time: '14:23:31', msg: 'WORKLOAD: Inference API — 99.97% uptime (last 24h)', type: 'alloc' },
      { time: '14:23:38', msg: 'CARBON-ROUTER: Rebalancing 3 workloads toward Dakhla hub', type: 'route' },
      { time: '14:23:45', msg: 'GPU-ALLOC: Marrakech hub → 256 GPUs → Fine-tuning HarchGPT', type: 'alloc' },
    ];

    // Hub detail panel
    if (activeSidebar === 1 && selectedHub !== null) {
      const hub = hubs[selectedHub];
      return (
        <div className="space-y-4">
          <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.15)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server size={16} style={{ color: accent }} />
                <span className="text-sm font-bold text-white font-mono">{hub.name} Hub</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] sm:text-[9px] font-bold uppercase ${hub.status === 'online' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                {hub.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4">
              <div>
                <p className="text-[10px] sm:text-[9px] text-white/30 uppercase tracking-wider mb-1">GPUs</p>
                <p className="text-xl font-bold text-white font-mono">{hub.gpus}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[9px] text-white/30 uppercase tracking-wider mb-1">Load</p>
                <p className="text-xl font-bold text-white font-mono">{hub.load}%</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[9px] text-white/30 uppercase tracking-wider mb-1">Carbon</p>
                <p className="text-xl font-bold text-white font-mono">{hub.carbon}g</p>
              </div>
            </div>
            <p className="text-[10px] text-white/40 mb-2">GPU Allocation by Workload</p>
            {[
              { name: 'LLM Training v3.1', gpus: 128, pct: 33 },
              { name: 'Inference API', gpus: 64, pct: 17 },
              { name: 'Fine-tuning Pipeline', gpus: 96, pct: 25 },
              { name: 'Available', gpus: hub.gpus - 288, pct: 100 - 75 },
            ].map(w => (
              <div key={w.name} className="mb-2">
                <div className="flex justify-between text-[10px] sm:text-[9px] mb-0.5">
                  <span className="text-white/40 font-mono">{w.name}</span>
                  <span className="text-white/50 font-mono">{w.gpus} GPU</span>
                </div>
                <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: w.name === 'Available' ? '#22C55E40' : accent }} initial={{ width: 0 }} animate={{ width: `${w.pct}%` }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => {}} className="text-[10px] text-white/30 hover:text-white/60 font-mono flex items-center gap-1 transition-colors">
            <ArrowRight size={10} /> Back to all hubs
          </button>
        </div>
      );
    }

    return (
      <div id="intel-hub-map" className="space-y-4 font-mono">
        {/* Server Rack Visualization — hidden on mobile, shown as row on desktop */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Server Rack — desktop only */}
          <div className="hidden md:block w-16 flex-shrink-0 bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg p-2 space-y-1.5">
            <span className="text-[10px] sm:text-[7px] text-white/25 uppercase tracking-widest text-center block mb-1">RACK</span>
            {hubs.map((hub, i) => (
              <button
                key={hub.name}
                onClick={() => setSelectedHub(i)}
                className="w-full group"
              >
                <div className={`h-8 rounded-sm border transition-all duration-200 relative overflow-hidden ${selectedHub === i ? 'border-[#8B9DAF]' : 'border-[rgba(139,157,175,0.15)]'}`}
                  style={{ backgroundColor: selectedHub === i ? '#8B9DAF15' : '#0A0F1E' }}>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ backgroundColor: `${accent}40` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${hub.load}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                  <div className="absolute top-1 right-1 flex gap-0.5">
                    <span className={`w-1 h-1 rounded-full ${hub.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className={`w-1 h-1 rounded-full ${hub.load > 70 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span className="absolute bottom-0.5 left-1 text-[10px] sm:text-[6px] text-white/40 group-hover:text-white/70 transition-colors">{hub.name.slice(0, 3).toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Terminal with carbon routing logs */}
            {(activeTab === 0 || activeTab === 3) && (
              <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg overflow-hidden">
                <div className="px-3 py-2 border-b border-[rgba(139,157,175,0.08)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TerminalIcon size={11} style={{ color: accent }} />
                    <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/30">Carbon Routing Log</span>
                  </div>
                  <span className="text-[10px] sm:text-[8px] text-emerald-400/50">LIVE</span>
                </div>
                <div className="p-3 max-h-36 overflow-y-auto space-y-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#8B9DAF20 transparent' }}>
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-2 text-[10px] sm:text-[9px]"
                    >
                      <span className="text-white/20 flex-shrink-0">{line.time}</span>
                      <span className={
                        line.type === 'route' ? 'text-[#8B9DAF]' :
                        line.type === 'warn' ? 'text-amber-400/70' :
                        line.type === 'health' ? 'text-emerald-400/60' :
                        line.type === 'alloc' ? 'text-[#8B9DAF]/70' :
                        'text-white/40'
                      }>{line.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Hub Status Grid */}
            {(activeTab === 0 || activeTab === 1) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {hubs.map((hub, i) => (
                  <button
                    key={hub.name}
                    onClick={() => setSelectedHub(i)}
                    className={`bg-[#0C1220] border rounded-lg p-2.5 hover:border-[rgba(139,157,175,0.25)] transition-all duration-200 cursor-pointer text-left group ${selectedHub === i ? 'border-[#8B9DAF]' : 'border-[rgba(139,157,175,0.1)]'}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] sm:text-[9px] font-bold text-white/60 group-hover:text-white transition-colors">{hub.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${hub.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                    <p className="text-base font-bold text-white">{hub.gpus}</p>
                    <p className="text-[10px] sm:text-[7px] text-white/20 uppercase tracking-wider mb-1.5">GPUs</p>
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] sm:text-[7px]">
                        <span className="text-white/25">Load</span>
                        <span className="text-white/40">{hub.load}%</span>
                      </div>
                      <div className="h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${hub.load}%` }} initial={{ width: 0 }} animate={{ width: `${hub.load}%` }} transition={{ duration: 1.2, delay: 0.3 }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Submarine Cable Map — simplified SVG */}
            {activeTab === 1 && (
              <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg p-3">
                <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Submarine Cable — Morocco to Europe</span>
                <svg viewBox="0 0 280 80" className="w-full h-auto">
                  <rect x="0" y="0" width="280" height="80" fill="transparent" />
                  {/* Morocco coast */}
                  <path d="M 20 50 Q 60 55 100 48 Q 140 42 180 50 Q 220 58 260 52" stroke="#8B9DAF30" strokeWidth="1" fill="none" />
                  {/* Hub dots */}
                  <circle cx="40" cy="52" r="4" fill="#8B9DAF" opacity="0.8" />
                  <text x="40" y="68" fill="#8B9DAF" fontSize="7" textAnchor="middle">Casa</text>
                  <circle cx="80" cy="49" r="3" fill="#8B9DAF" opacity="0.6" />
                  <text x="80" y="65" fill="#8B9DAF" fontSize="7" textAnchor="middle">Rabat</text>
                  <circle cx="120" cy="46" r="3" fill="#8B9DAF" opacity="0.6" />
                  <text x="120" y="62" fill="#8B9DAF" fontSize="7" textAnchor="middle">Marr.</text>
                  <circle cx="160" cy="48" r="3" fill="#8B9DAF" opacity="0.6" />
                  <text x="160" y="64" fill="#8B9DAF" fontSize="7" textAnchor="middle">Tang.</text>
                  <circle cx="220" cy="52" r="4" fill="#22C55E" opacity="0.8" />
                  <text x="220" y="68" fill="#22C55E" fontSize="7" textAnchor="middle">Dakhla</text>
                  {/* Submarine cable */}
                  <motion.path
                    d="M 220 48 Q 240 25 260 30"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Europe label */}
                  <text x="265" y="28" fill="#8B9DAF80" fontSize="7" textAnchor="start">EU</text>
                  <circle cx="268" cy="32" r="3" fill="#8B9DAF" opacity="0.4" />
                </svg>
              </div>
            )}

            {/* Workload Table */}
            {(activeTab === 0 || activeTab === 2) && (
              <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg overflow-hidden">
                <div className="px-3 py-2 border-b border-[rgba(139,157,175,0.08)] flex items-center justify-between">
                  <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Active Workloads</span>
                  <span className="text-[10px] sm:text-[8px] text-emerald-400/50">12 running</span>
                </div>
                <div className="overflow-x-auto">
                  <div className="divide-y divide-[rgba(139,157,175,0.05)] min-w-[300px]">
                    {[
                      { name: 'LLM Training v3.1', type: 'Training', gpus: 128, hub: 'Casablanca', carbon: 'Optimal' },
                      { name: 'Inference API — Production', type: 'Inference', gpus: 64, hub: 'Rabat', carbon: 'Low' },
                      { name: 'Fine-tuning HarchGPT', type: 'Fine-tune', gpus: 256, hub: 'Tangier', carbon: 'Optimal' },
                    ].map((wl) => (
                      <div key={wl.name} className="px-3 py-2 flex items-center justify-between hover:bg-[rgba(139,157,175,0.04)] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${wl.carbon === 'Optimal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          <span className="text-[10px] text-white/60 truncate">{wl.name}</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-[10px] sm:text-[8px] text-white/25 flex-shrink-0 ml-2">
                          <span className="hidden sm:inline">{wl.type}</span>
                          <span className="text-white/40">{wl.gpus} GPU</span>
                          <span className="hidden sm:inline">{wl.hub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  renderSidebar: (accent, activeTab, activeSidebar) => (
    <div className="space-y-3 font-mono">
      {/* Carbon Intensity Heatmap */}
      <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Carbon Intensity (24h)</span>
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-0.5">
          {Array.from({ length: 24 }, (_, i) => {
            const v = [42, 38, 55, 44, 36, 48, 35, 51, 43, 37, 45, 39, 41, 52, 38, 44, 36, 49, 34, 46, 40, 37, 43, 38][i];
            const intensity = v < 40 ? 0.9 : v < 45 ? 0.6 : v < 50 ? 0.35 : 0.15;
            return (
              <motion.div
                key={i}
                className="aspect-square rounded-sm"
                style={{ backgroundColor: `${accent}`, opacity: intensity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: intensity }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                title={`${i}:00 — ${v} gCO2/kWh`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] sm:text-[6px] text-white/15">
          <span>00:00</span><span>12:00</span><span>Now</span>
        </div>
      </div>
      {/* Energy Mix */}
      <div className="bg-[#0C1220] border border-[rgba(139,157,175,0.12)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Energy Mix</span>
        {[
          { source: 'Solar', pct: 42, color: '#F59E0B' },
          { source: 'Wind', pct: 35, color: '#3B82F6' },
          { source: 'Hydro', pct: 4.5, color: '#06B6D4' },
          { source: 'Grid', pct: 18.5, color: '#6B7280' },
        ].map((e) => (
          <div key={e.source} className="mb-1.5">
            <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
              <span className="text-white/30">{e.source}</span>
              <span className="text-white/45">{e.pct}%</span>
            </div>
            <div className="h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: e.color, width: `${e.pct}%` }} initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 1, delay: 0.2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/intelligence-rack.jpg',
};

// ═══════════════════════════════════════════════════════════════
// AGRICULTURE — HarchAgri Platform
// Earthy green tones, clean grid layout, farming SaaS
// ═══════════════════════════════════════════════════════════════
const agricultureConfig: DashboardConfig = {
  platformName: 'HarchAgri Platform',
  platformVersion: '0.7',
  accent: '#4A7B5F',
  bgGradient: 'from-[#0A120A] to-[#0D120D]',
  sidebar: [
    { icon: <Layout size={13} />, label: 'Farm Map' },
    { icon: <Droplets size={13} />, label: 'Irrigation' },
    { icon: <Leaf size={13} />, label: 'Crop Health' },
    { icon: <CloudRain size={13} />, label: 'Weather' },
    { icon: <Eye size={13} />, label: 'Drone Scans' },
    { icon: <TrendingUp size={13} />, label: 'Market' },
  ],
  headerTabs: ['Overview', 'Plots', 'Irrigation', 'Schedule'],
  tourSteps: [
    { targetId: 'agri-metric-health', label: 'A', title: 'Crop Health Monitor', description: 'Real-time satellite and IoT data tracks crop health across all plots. Green = healthy, yellow = needs attention, red = action required.', position: 'bottom' },
    { targetId: 'agri-irrigation', label: 'B', title: 'Smart Irrigation Control', description: 'Sensor-driven irrigation reduces water usage by 40% while increasing yield. Soil moisture sensors trigger automated watering cycles.', position: 'bottom' },
    { targetId: 'agri-farm-map', label: 'C', title: 'Farm Intelligence Map', description: 'Interactive map showing all plots with real-time health indicators. Click any plot for detailed analytics and historical data.', position: 'top' },
  ],
  metricCards: [
    { id: 'agri-metric-health', label: 'Crop Health', value: '94.2%', change: '+2.1%', changeUp: true, icon: <Leaf size={14} /> },
    { id: 'agri-irrigation', label: 'Water Saved', value: '38.5%', change: '+5.3%', changeUp: true, icon: <Droplets size={14} /> },
    { id: 'agri-metric-yield', label: 'Yield Forecast', value: '12.4T/ha', change: '+8%', changeUp: true, icon: <Wheat size={14} /> },
    { id: 'agri-metric-iot', label: 'IoT Sensors', value: '2,847', change: '+340', changeUp: true, icon: <Radio size={14} /> },
  ],
  statusBarText: 'REGION: CASABLANCA | 48 PLOTS | 6 ZONES',
  renderMain: (accent, activeTab, activeSidebar, _selHub, selectedPlot, toggleIrrigation, irrigationState) => {
    const plotData = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      crop: ['Wheat', 'Corn', 'Soy', 'Rice', 'Cassava', 'Sorghum', 'Barley', 'Millet'][i % 8],
      health: [0.95, 0.88, 0.72, 0.93, 0.45, 0.91, 0.85, 0.78, 0.92, 0.68, 0.89, 0.94, 0.35, 0.87, 0.82, 0.91, 0.96, 0.75, 0.88, 0.93, 0.42, 0.86, 0.79, 0.95, 0.90, 0.71, 0.84, 0.92, 0.38, 0.83, 0.77, 0.94, 0.88, 0.65, 0.91, 0.97, 0.44, 0.89, 0.76, 0.93, 0.87, 0.69, 0.85, 0.96, 0.41, 0.82, 0.74, 0.90][i],
      soilMoisture: 55 + Math.floor(Math.random() * 30),
      lastIrrigation: `${Math.floor(Math.random() * 48)}h ago`,
      zone: Math.floor(i / 8),
    }));

    const selectedPlotData = selectedPlot !== null ? plotData[selectedPlot] : null;

    return (
      <div id="agri-farm-map" className="space-y-3">
        {/* Interactive Farm Plot Grid — 6x8 */}
        <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[rgba(74,123,95,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layout size={11} style={{ color: accent }} />
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30">Farm Plot Map</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[8px] min-w-0">
              {[
                { color: '#4A7B5F', label: 'Healthy' },
                { color: '#EAB308', label: 'Warning' },
                { color: '#EF4444', label: 'Critical' },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1 text-white/25 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} /> {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
              {plotData.map((plot) => {
                const color = plot.health > 0.7 ? '#4A7B5F' : plot.health > 0.4 ? '#EAB308' : '#EF4444';
                return (
                  <motion.button
                    key={plot.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: plot.id * 0.02 }}
                    onClick={() => {}}
                    className={`aspect-square rounded cursor-pointer hover:scale-110 transition-transform relative group ${selectedPlot === plot.id ? 'ring-1 ring-white/40' : ''}`}
                    style={{ backgroundColor: `${color}25`, border: `1px solid ${color}35` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] sm:text-[6px] text-white/30 group-hover:text-white/70 transition-colors">{plot.crop.slice(0, 2)}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Plot Detail or Irrigation Controls */}
        <AnimatePresence mode="wait">
          {activeSidebar === 1 || activeTab === 2 ? (
            <motion.div
              key="irrigation"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-4"
            >
              <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Irrigation Zone Controls</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Zone A — North', 'Zone B — East', 'Zone C — South', 'Zone D — West', 'Zone E — Central', 'Zone F — Perimeter'].map((zone, i) => (
                  <div key={zone} className="bg-[rgba(74,123,95,0.06)] border border-[rgba(74,123,95,0.12)] rounded-lg p-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] sm:text-[9px] text-white/50">{zone}</p>
                      <p className="text-[10px] sm:text-[8px] text-white/25 mt-0.5">Moisture: {55 + i * 5}%</p>
                    </div>
                    <button
                      onClick={() => toggleIrrigation(i)}
                      className={`w-10 h-5 sm:w-8 sm:h-4 rounded-full transition-all duration-300 relative ${irrigationState[i] ? 'bg-emerald-500/40' : 'bg-[rgba(255,255,255,0.08)]'}`}
                    >
                      <span className={`absolute top-0.5 sm:top-0.5 w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${irrigationState[i] ? 'left-5 sm:left-4.5 bg-emerald-400' : 'left-0.5 bg-white/30'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : selectedPlotData ? (
            <motion.div
              key="plot-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-white/70">Plot {selectedPlotData.id + 1} — {selectedPlotData.crop}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] sm:text-[8px] font-bold ${selectedPlotData.health > 0.7 ? 'bg-emerald-500/15 text-emerald-400' : selectedPlotData.health > 0.4 ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'}`}>
                  {Math.round(selectedPlotData.health * 100)}% health
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Soil Moisture</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedPlotData.soilMoisture}%</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Last Irrigation</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedPlotData.lastIrrigation}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Zone</p>
                  <p className="text-sm font-bold text-white mt-0.5">Zone {String.fromCharCode(65 + selectedPlotData.zone)}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Next Action</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedPlotData.health < 0.5 ? 'Irrigate' : 'Monitor'}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Yield Forecasting Chart */}
        {(activeTab === 0 || activeSidebar === 2) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Yield Forecast (T/ha)</span>
              <span className="text-[10px] sm:text-[8px] text-[#4A7B5F]/50">vs ACTUAL</span>
            </div>
            <div className="space-y-1.5">
              {[
                { crop: 'Wheat', forecast: 12.4, actual: 11.8 },
                { crop: 'Corn', forecast: 9.2, actual: 8.7 },
                { crop: 'Soy', forecast: 3.8, actual: 3.6 },
                { crop: 'Rice', forecast: 7.1, actual: 6.9 },
                { crop: 'Cassava', forecast: 15.2, actual: 14.1 },
              ].map(c => (
                <div key={c.crop} className="cursor-pointer hover:bg-[rgba(74,123,95,0.04)] transition-colors rounded px-1 py-0.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] sm:text-[8px] text-white/40">{c.crop}</span>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[7px]">
                      <span className="text-[#4A7B5F]/70">{c.forecast}T</span>
                      <span className="text-white/25">{c.actual}T</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 h-[4px]">
                    <motion.div
                      className="rounded-sm bg-[#4A7B5F]/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.forecast / 16) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                      className="rounded-sm bg-white/10"
                      initial={{ width: 0 }}
                      animate={{ width: `${((c.actual - c.forecast + 16) / 16) * 0}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supply Chain Tracker */}
        {(activeTab === 0 || activeSidebar === 5) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Supply Chain — Farm to Market</span>
            <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {[
                { stage: 'Harvest', status: 'complete', throughput: '94%', icon: <Wheat size={10} /> },
                { stage: 'Sorting', status: 'complete', throughput: '98%', icon: <Package size={10} /> },
                { stage: 'Storage', status: 'active', throughput: '87%', icon: <Warehouse size={10} /> },
                { stage: 'Transport', status: 'pending', throughput: '72%', icon: <Truck size={10} /> },
                { stage: 'Market', status: 'pending', throughput: '—', icon: <BarChart3 size={10} /> },
              ].map((s, i) => (
                <div key={s.stage} className="flex-1 cursor-pointer group">
                  <div className={`bg-[rgba(74,123,95,0.04)] border rounded-lg p-2 text-center transition-colors ${
                    s.status === 'complete' ? 'border-emerald-500/20 group-hover:bg-emerald-500/5' :
                    s.status === 'active' ? 'border-[#4A7B5F]/30 group-hover:bg-[#4A7B5F]/8' :
                    'border-[rgba(74,123,95,0.08)] group-hover:bg-[rgba(74,123,95,0.04)]'
                  }`}>
                    <div className="flex justify-center mb-1" style={{ color: s.status === 'complete' ? '#22C55E80' : s.status === 'active' ? '#4A7B5F80' : 'rgba(255,255,255,0.15)' }}>{s.icon}</div>
                    <p className="text-[10px] sm:text-[7px] text-white/40 group-hover:text-white/60 transition-colors">{s.stage}</p>
                    <p className={`text-[10px] sm:text-[7px] font-bold mt-0.5 ${s.status === 'complete' ? 'text-emerald-400/60' : s.status === 'active' ? 'text-[#4A7B5F]/70' : 'text-white/15'}`}>{s.throughput}</p>
                  </div>
                  {i < 4 && <div className="flex justify-center mt-0.5"><ArrowRight size={8} className="text-white/10" /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carbon Credit Dashboard */}
        {(activeTab === 0 || activeSidebar === 2) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Carbon Credits</span>
              <Leaf size={10} className="text-emerald-400/30" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {/* carbon credit cards - ok at grid-cols-3 even on mobile */}
              <div className="bg-[rgba(74,123,95,0.06)] border border-[rgba(74,123,95,0.1)] rounded-lg p-2 text-center cursor-pointer hover:bg-[rgba(74,123,95,0.1)] transition-colors">
                <p className="text-sm font-bold text-white">12,450</p>
                <p className="text-[10px] sm:text-[7px] text-white/25 uppercase">tCO2 Total</p>
              </div>
              <div className="bg-[rgba(74,123,95,0.06)] border border-[rgba(74,123,95,0.1)] rounded-lg p-2 text-center cursor-pointer hover:bg-[rgba(74,123,95,0.1)] transition-colors">
                <p className="text-sm font-bold text-emerald-400">8,200</p>
                <p className="text-[10px] sm:text-[7px] text-white/25 uppercase">Certified</p>
              </div>
              <div className="bg-[rgba(74,123,95,0.06)] border border-[rgba(74,123,95,0.1)] rounded-lg p-2 text-center cursor-pointer hover:bg-[rgba(74,123,95,0.1)] transition-colors">
                <p className="text-sm font-bold text-amber-400/70">4,250</p>
                <p className="text-[10px] sm:text-[7px] text-white/25 uppercase">Pending</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-[8px]">
              <span className="text-white/25">Revenue</span>
              <span className="text-emerald-400/60 font-bold">$82,000</span>
            </div>
          </div>
        )}

        {/* Vertical Farming Container Status */}
        {(activeTab === 0 || activeSidebar === 0) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Vertical Farm Containers</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'VFC-01', crop: 'Lettuce', temp: '22C', humidity: '68%', day: 18, eta: '7d', status: 'growing' },
                { id: 'VFC-02', crop: 'Basil', temp: '24C', humidity: '72%', day: 12, eta: '13d', status: 'growing' },
                { id: 'VFC-03', crop: 'Mint', temp: '21C', humidity: '65%', day: 28, eta: 'Harvest', status: 'ready' },
                { id: 'VFC-04', crop: 'Cherry Tom.', temp: '25C', humidity: '70%', day: 5, eta: '20d', status: 'early' },
              ].map(c => (
                <button key={c.id} onClick={() => {}} className="bg-[rgba(74,123,95,0.04)] border border-[rgba(74,123,95,0.1)] rounded-lg p-2 text-left hover:bg-[rgba(74,123,95,0.08)] transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-[8px] text-white/50 font-bold">{c.id}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'ready' ? 'bg-emerald-400' : c.status === 'growing' ? 'bg-[#4A7B5F]' : 'bg-amber-400/50'}`} />
                  </div>
                  <p className="text-[10px] sm:text-[9px] text-white/60 group-hover:text-white/80 transition-colors">{c.crop}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[7px] text-white/25">
                    <span>{c.temp}</span>
                    <span>{c.humidity}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] sm:text-[7px] text-white/20">Day {c.day}</span>
                    <span className={`text-[10px] sm:text-[7px] font-bold ${c.status === 'ready' ? 'text-emerald-400/60' : 'text-white/25'}`}>{c.eta}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crop Rotation Timeline */}
        {(activeTab === 3 || activeSidebar === 2) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-4">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Crop Rotation Timeline</span>
            <div className="space-y-2">
              {[
                { plot: 'Plots 1-8', current: 'Wheat', next: 'Soy', season: 'Spring 2025' },
                { plot: 'Plots 9-16', current: 'Corn', next: 'Cassava', season: 'Summer 2025' },
                { plot: 'Plots 17-24', current: 'Rice', next: 'Barley', season: 'Fall 2025' },
              ].map(r => (
                <div key={r.plot} className="flex items-center gap-3 py-1.5 border-b border-[rgba(74,123,95,0.06)] last:border-0">
                  <span className="text-[10px] sm:text-[9px] text-white/40 w-20 flex-shrink-0">{r.plot}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[8px] bg-[rgba(74,123,95,0.15)] text-[#4A7B5F]">{r.current}</span>
                  <ArrowRight size={10} className="text-white/15" />
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[8px] bg-[rgba(234,179,8,0.1)] text-amber-400/70">{r.next}</span>
                  <span className="text-[10px] sm:text-[8px] text-white/20 ml-auto">{r.season}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drone Flight Schedule */}
        {(activeSidebar === 4 || activeTab === 3) && (
          <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Drone Scan Schedule</span>
              <Eye size={11} className="text-white/20" />
            </div>
            <div className="space-y-1.5">
              {[
                { drone: 'Drone A', area: 'North Fields', status: 'Completed', lastScan: '2h ago', findings: 'No issues detected' },
                { drone: 'Drone B', area: 'East Fields', status: 'In Flight', lastScan: 'Active', findings: 'Scanning...' },
                { drone: 'Drone C', area: 'South Fields', status: 'Scheduled', lastScan: '14:30', findings: 'Pending' },
              ].map(d => (
                <div key={d.drone} className="flex items-center justify-between py-1.5 border-b border-[rgba(74,123,95,0.05)] last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'Completed' ? 'bg-emerald-400' : d.status === 'In Flight' ? 'bg-amber-400 animate-pulse' : 'bg-white/15'}`} />
                    <span className="text-[10px] sm:text-[9px] text-white/50">{d.drone}</span>
                    <span className="text-[10px] sm:text-[8px] text-white/25">{d.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[8px]">
                    <span className="text-white/30">{d.findings}</span>
                    <span className="text-white/20">{d.lastScan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  renderSidebar: (accent) => (
    <div className="space-y-3">
      {/* 7-Day Weather Forecast with Rain Probability */}
      <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">7-Day Forecast — Casablanca</span>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-light text-white">28</span>
          <div className="text-right">
            <p className="text-[10px] text-white/40">Partly Cloudy</p>
            <p className="text-[10px] sm:text-[8px] text-white/20">Humidity 45%</p>
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
            const rain = i === 2 ? 70 : i === 5 ? 45 : i === 3 ? 20 : 5;
            return (
              <div key={d} className="text-center cursor-pointer hover:bg-[rgba(74,123,95,0.06)] rounded transition-colors py-0.5">
                <span className="text-[10px] sm:text-[7px] text-white/25 block">{d}</span>
                {i === 2 || i === 5 ? <CloudRain size={8} className="mx-auto text-amber-400/50 my-0.5" /> : <Sun size={8} className="mx-auto text-amber-400/30 my-0.5" />}
                <span className="text-[10px] sm:text-[8px] text-white/40 block">{26 + i}</span>
                <span className="text-[10px] sm:text-[6px] text-blue-400/40 block">{rain}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Market Prices with Sparklines */}
      <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Market Prices</span>
        {[
          { crop: 'Wheat', price: '$285/T', change: '+2.3%', up: true, data: [270, 275, 278, 282, 280, 285] },
          { crop: 'Corn', price: '$198/T', change: '-1.1%', up: false, data: [205, 202, 200, 198, 199, 198] },
          { crop: 'Soy', price: '$412/T', change: '+4.7%', up: true, data: [390, 395, 400, 405, 410, 412] },
          { crop: 'Rice', price: '$340/T', change: '+1.2%', up: true, data: [335, 336, 338, 339, 340, 340] },
          { crop: 'Cassava', price: '$165/T', change: '-0.5%', up: false, data: [168, 167, 166, 166, 165, 165] },
        ].map((m) => {
          const min = Math.min(...m.data);
          const max = Math.max(...m.data);
          const range = max - min || 1;
          const points = m.data.map((v, i) => `${i * 12},${18 - ((v - min) / range) * 14}`).join(' ');
          return (
            <div key={m.crop} className="flex items-center justify-between py-1 border-b border-[rgba(74,123,95,0.05)] last:border-0 cursor-pointer hover:bg-[rgba(74,123,95,0.04)] transition-colors rounded px-1">
              <span className="text-[10px] sm:text-[9px] text-white/40 w-14">{m.crop}</span>
              <svg viewBox="0 0 60 20" className="w-14 h-4 flex-shrink-0">
                <motion.polyline
                  points={points}
                  fill="none"
                  stroke={m.up ? '#22C55E' : '#EF4444'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  opacity={0.5}
                />
              </svg>
              <span className="text-[10px] sm:text-[9px] text-white/55 w-12 text-right">{m.price}</span>
              <span className={`text-[10px] sm:text-[8px] w-10 text-right ${m.up ? 'text-emerald-400/60' : 'text-red-400/60'}`}>{m.change}</span>
            </div>
          );
        })}
      </div>

      {/* Soil Composition */}
      <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Soil Composition</span>
        {[
          { nutrient: 'pH', value: '6.8', level: 68, color: '#4A7B5F' },
          { nutrient: 'Nitrogen', value: '42 ppm', level: 52, color: '#22C55E' },
          { nutrient: 'Phosphorus', value: '28 ppm', level: 35, color: '#EAB308' },
          { nutrient: 'Potassium', value: '180 ppm', level: 72, color: '#4A7B5F' },
        ].map(s => (
          <div key={s.nutrient} className="mb-1.5 cursor-pointer hover:bg-[rgba(74,123,95,0.04)] transition-colors rounded px-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] sm:text-[8px] text-white/35">{s.nutrient}</span>
              <span className="text-[10px] sm:text-[8px] text-white/50">{s.value}</span>
            </div>
            <div className="h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${s.level}%` }} initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Active Weather Alerts */}
      <div className="bg-[#0D120D] border border-[rgba(234,179,8,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-amber-400/40 mb-2 block">Weather Alerts</span>
        <div className="space-y-1.5">
          {[
            { severity: 'warning', text: 'Heavy rain expected Wed — 70% probability', icon: <CloudRain size={9} /> },
            { severity: 'info', text: 'High wind advisory — Fri 25km/h gusts', icon: <Wind size={9} /> },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-2 p-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${a.severity === 'warning' ? 'bg-amber-500/5 border border-amber-500/10' : 'bg-[rgba(74,123,95,0.04)] border border-[rgba(74,123,95,0.08)]'}`}>
              <span className={a.severity === 'warning' ? 'text-amber-400/60' : 'text-white/25'}>{a.icon}</span>
              <span className={`text-[10px] sm:text-[8px] ${a.severity === 'warning' ? 'text-amber-400/50' : 'text-white/30'}`}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Quick Actions</span>
        <div className="space-y-1.5">
          {[
            { label: 'Run Drone Scan', icon: <Plane size={10} /> },
            { label: 'Export Report', icon: <FileCode size={10} /> },
            { label: 'Irrigate All', icon: <Droplets size={10} /> },
          ].map(a => (
            <button key={a.label} onClick={() => {}} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] sm:text-[9px] text-white/35 hover:text-white/60 hover:bg-[rgba(74,123,95,0.08)] transition-all cursor-pointer">
              <span style={{ color: '#4A7B5F60' }}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Soil Moisture Overview */}
      <div className="bg-[#0D120D] border border-[rgba(74,123,95,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Soil Moisture</span>
        <div className="flex items-end gap-0.5 h-12">
          {[67, 72, 55, 80, 45, 68, 75, 58, 82, 60, 70, 52].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: v > 60 ? '#4A7B5F50' : v > 45 ? '#EAB30840' : '#EF444440' }}
              initial={{ height: 0 }}
              animate={{ height: `${(v / 100) * 100}%` }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/agri-vertical-farm.jpg',
};

// ═══════════════════════════════════════════════════════════════
// ENERGY — HarchEnergy Grid
// Power grid aesthetic, slate accents, animated energy flows
// ═══════════════════════════════════════════════════════════════
const energyConfig: DashboardConfig = {
  platformName: 'HarchEnergy Grid',
  platformVersion: '0.3',
  accent: '#D4A843',
  bgGradient: 'from-[#120E05] to-[#0D0A05]',
  sidebar: [
    { icon: <Globe size={13} />, label: 'Grid Map' },
    { icon: <Sun size={13} />, label: 'Solar Farms' },
    { icon: <Wind size={13} />, label: 'Wind Parks' },
    { icon: <Zap size={13} />, label: 'Green H2' },
    { icon: <Battery size={13} />, label: 'Battery' },
    { icon: <ArrowRight size={13} />, label: 'Export' },
  ],
  headerTabs: ['Generation', 'Storage', 'Export', 'Forecast'],
  tourSteps: [
    { targetId: 'energy-metric-gen', label: 'A', title: 'Power Generation', description: '2GW+ renewable pipeline across Morocco and the Sahel. Solar, wind, and green hydrogen producing zero-carbon electricity 24/7.', position: 'bottom' },
    { targetId: 'energy-h2', label: 'B', title: 'Green Hydrogen Output', description: 'Hydrogen electrolysis powered by surplus solar. Production capacity: 50kT/yr for export to European markets via pipeline.', position: 'bottom' },
    { targetId: 'energy-grid-map', label: 'C', title: 'Grid Intelligence', description: 'Real-time grid monitoring with optimized load balancing. Prevents blackouts and maximizes renewable utilization across all zones.', position: 'top' },
  ],
  metricCards: [
    { id: 'energy-metric-gen', label: 'Generation', value: '847 MW', change: '+12%', changeUp: true, icon: <Zap size={14} /> },
    { id: 'energy-h2', label: 'Green H2', value: '12.3kT/yr', change: '+8%', changeUp: true, icon: <Droplets size={14} /> },
    { id: 'energy-metric-capacity', label: 'Pipeline', value: '2.1 GW', change: '+400MW', changeUp: true, icon: <Globe size={14} /> },
    { id: 'energy-metric-grid', label: 'Grid Stability', value: '99.8%', change: '+0.1%', changeUp: true, icon: <Activity size={14} /> },
  ],
  statusBarText: 'GRID FREQ: 50.02 Hz | BALANCED | SOLAR PEAK',
  renderMain: (accent) => (
    <div id="energy-grid-map" className="space-y-3">
      {/* Power Flow Map — SVG with animated dots */}
      <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Power Flow Grid</span>
          <span className="text-[10px] sm:text-[8px] text-emerald-400/50">BALANCED</span>
        </div>
        <svg viewBox="0 0 320 120" className="w-full h-auto">
          {/* Generation sites */}
          <circle cx="60" cy="25" r="8" fill="#D4A84320" stroke="#D4A84360" strokeWidth="1" />
          <text x="60" y="28" textAnchor="middle" fill="#D4A843" fontSize="6">SOL</text>
          <circle cx="60" cy="70" r="8" fill="#3B82F620" stroke="#3B82F660" strokeWidth="1" />
          <text x="60" y="73" textAnchor="middle" fill="#3B82F6" fontSize="6">WND</text>
          <circle cx="60" cy="110" r="6" fill="#22C55E20" stroke="#22C55E60" strokeWidth="1" />
          <text x="60" y="113" textAnchor="middle" fill="#22C55E" fontSize="5">H2</text>

          {/* Demand zones */}
          <rect x="240" y="15" width="50" height="20" rx="3" fill="#ffffff08" stroke="#ffffff15" strokeWidth="0.5" />
          <text x="265" y="28" textAnchor="middle" fill="#ffffff60" fontSize="6">Casa</text>
          <rect x="240" y="50" width="50" height="20" rx="3" fill="#ffffff08" stroke="#ffffff15" strokeWidth="0.5" />
          <text x="265" y="63" textAnchor="middle" fill="#ffffff60" fontSize="6">Rabat</text>
          <rect x="240" y="85" width="50" height="20" rx="3" fill="#ffffff08" stroke="#ffffff15" strokeWidth="0.5" />
          <text x="265" y="98" textAnchor="middle" fill="#ffffff60" fontSize="6">Export</text>

          {/* Flow lines */}
          <line x1="68" y1="25" x2="240" y2="25" stroke="#D4A84330" strokeWidth="1" />
          <line x1="68" y1="70" x2="240" y2="60" stroke="#3B82F630" strokeWidth="1" />
          <line x1="66" y1="110" x2="240" y2="95" stroke="#22C55E30" strokeWidth="1" />

          {/* Animated energy dots */}
          {[0, 1, 2].map(i => (
            <motion.circle
              key={`solar-dot-${i}`}
              r="2"
              fill="#D4A843"
              initial={{ cx: 68, cy: 25 }}
              animate={{ cx: [68, 240], cy: [25, 25] }}
              transition={{ duration: 2, delay: i * 0.7, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          {[0, 1].map(i => (
            <motion.circle
              key={`wind-dot-${i}`}
              r="2"
              fill="#3B82F6"
              initial={{ cx: 68, cy: 70 }}
              animate={{ cx: [68, 240], cy: [70, 60] }}
              transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          <motion.circle
            r="1.5"
            fill="#22C55E"
            initial={{ cx: 66, cy: 110 }}
            animate={{ cx: [66, 240], cy: [110, 95] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Battery in the middle */}
          <rect x="140" y="55" width="30" height="15" rx="2" fill="#D4A84310" stroke="#D4A84330" strokeWidth="0.5" />
          <text x="155" y="65" textAnchor="middle" fill="#D4A84380" fontSize="5">BATT 73%</text>
        </svg>
      </div>

      {/* Solar Output Curve */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Solar Output</span>
            <Sun size={10} className="text-[#D4A84360]" />
          </div>
          <div className="flex items-end gap-px h-16">
            {Array.from({ length: 24 }, (_, i) => {
              const solar = Math.max(0, Math.sin((i - 6) / 12 * Math.PI) * 100);
              return (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: solar > 50 ? '#D4A84360' : '#D4A84325' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${solar}%` }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1 text-[10px] sm:text-[6px] text-white/15">
            <span>00</span><span>06</span><span>12</span><span>18</span><span>Now</span>
          </div>
        </div>

        {/* Wind Speed Gauge */}
        <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Wind Speed</span>
            <Wind size={10} className="text-[#3B82F660]" />
          </div>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 80 50" className="w-24 h-auto">
              {/* Gauge arc */}
              <path d="M 10 45 A 35 35 0 0 1 70 45" fill="none" stroke="#ffffff08" strokeWidth="4" strokeLinecap="round" />
              <motion.path
                d="M 10 45 A 35 35 0 0 1 70 45"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 30 }}
                transition={{ duration: 1.5 }}
              />
              <text x="40" y="42" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">24</text>
              <text x="40" y="50" textAnchor="middle" fill="#ffffff30" fontSize="6">km/h</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Battery + Green H2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Battery size={10} className="text-[#D4A84360]" />
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Battery</span>
          </div>
          <div className="h-6 bg-[rgba(255,255,255,0.03)] rounded overflow-hidden relative">
            <motion.div
              className="h-full rounded"
              style={{ backgroundColor: '#22C55E40' }}
              initial={{ width: 0 }}
              animate={{ width: '73%' }}
              transition={{ duration: 1.5 }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-[9px] text-white/60">438 / 600 MWh</span>
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] sm:text-[8px] text-white/20">
            <span>Charging</span>
            <span className="text-emerald-400/50">+12 MW</span>
          </div>
        </div>
        <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={10} className="text-[#22C55E60]" />
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Green H2</span>
          </div>
          <p className="text-lg font-bold text-white">12.3 <span className="text-[10px] text-white/30">kT/yr</span></p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[8px] text-white/25">Electrolysis active — 45 MW</span>
          </div>
        </div>
      </div>

      {/* Grid Frequency Monitor */}
      <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Grid Frequency</span>
          <span className="text-[10px] sm:text-[9px] text-emerald-400/60 font-mono">50.02 Hz</span>
        </div>
        <div className="flex items-end gap-px h-8">
          {Array.from({ length: 30 }, (_, i) => {
            const f = 49.95 + Math.random() * 0.15;
            const h = ((f - 49.9) / 0.2) * 100;
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ backgroundColor: Math.abs(f - 50) < 0.05 ? '#22C55E40' : '#EAB30840' }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  ),
  renderSidebar: (accent) => (
    <div className="space-y-3">
      <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Energy Mix</span>
        {[
          { source: 'Solar', pct: 52, color: '#D4A843' },
          { source: 'Wind', pct: 35, color: '#3B82F6' },
          { source: 'Green H2', pct: 8, color: '#22C55E' },
          { source: 'Grid', pct: 5, color: '#6B7280' },
        ].map((e) => (
          <div key={e.source} className="mb-1.5">
            <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
              <span className="text-white/30">{e.source}</span>
              <span className="text-white/45">{e.pct}%</span>
            </div>
            <div className="h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: e.color, width: `${e.pct}%` }} initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 1, delay: 0.2 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#0D0A05] border border-[rgba(212,168,67,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Export Capacity</span>
        <p className="text-lg font-bold text-white">1.2 <span className="text-[10px] text-white/30">GW</span></p>
        <p className="text-[10px] sm:text-[8px] text-white/20 mt-1">Morocco → Spain: 700 MW</p>
        <p className="text-[10px] sm:text-[8px] text-white/20">Morocco → Mauritania: 500 MW</p>
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/energy-solar-farm.jpg',
};

// ═══════════════════════════════════════════════════════════════
// MINING — HarchMine Ops
// Industrial, amber/brown tones, rugged with sharp corners
// ═══════════════════════════════════════════════════════════════
const miningConfig: DashboardConfig = {
  platformName: 'HarchMine Ops',
  platformVersion: '0.5',
  accent: '#8B9DAF',
  bgGradient: 'from-[#120D05] to-[#0D0F14]',
  sidebar: [
    { icon: <HardDrive size={13} />, label: 'Operations' },
    { icon: <Mountain size={13} />, label: 'Geological Map' },
    { icon: <Layers size={13} />, label: 'Extraction' },
    { icon: <Settings size={13} />, label: 'Processing' },
    { icon: <Box size={13} />, label: 'Inventory' },
    { icon: <Shield size={13} />, label: 'Safety' },
  ],
  headerTabs: ['Operations', 'Deposits', 'Processing', 'Safety'],
  tourSteps: [
    { targetId: 'mining-metric-output', label: 'A', title: 'Extraction Output', description: 'Strategic mineral extraction — phosphates, cobalt, and rare earths processed in-country. Capturing the full value chain from mine to market.', position: 'bottom' },
    { targetId: 'mining-geo', label: 'B', title: 'Geological Survey', description: 'Advanced geological mapping identifies new deposits with 94% accuracy. In-country processing eliminates raw mineral export dependency.', position: 'bottom' },
    { targetId: 'mining-map', label: 'C', title: 'Operations Map', description: 'Real-time monitoring of all extraction sites, processing plants, and logistics chains. Full traceability from mine to end product.', position: 'top' },
  ],
  metricCards: [
    { id: 'mining-metric-output', label: 'Output', value: '1.2M T/yr', change: '+15%', changeUp: true, icon: <Mountain size={14} /> },
    { id: 'mining-geo', label: 'Deposit Accuracy', value: '94.2%', change: '+3.1%', changeUp: true, icon: <MapPin size={14} /> },
    { id: 'mining-metric-value', label: 'Value Capture', value: '87%', change: '+12%', changeUp: true, icon: <TrendingUp size={14} /> },
    { id: 'mining-metric-safety', label: 'Safety Score', value: '99.1%', change: '+0.4%', changeUp: true, icon: <Shield size={14} /> },
  ],
  statusBarText: 'KHOUIRIBGA SITE | 0 INCIDENTS | ALL SYSTEMS GO',
  renderMain: (accent) => (
    <div id="mining-map" className="space-y-3">
      {/* Geological Cross-Section */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.15)] rounded-none p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Geological Cross-Section</span>
        <svg viewBox="0 0 320 100" className="w-full h-auto">
          {/* Rock layers */}
          <rect x="0" y="0" width="320" height="15" fill="#8B735520" />
          <rect x="0" y="15" width="320" height="20" fill="#6B5B3E20" />
          <rect x="0" y="35" width="320" height="25" fill="#4A3C2820" />
          <rect x="0" y="60" width="320" height="20" fill="#3D312020" />
          <rect x="0" y="80" width="320" height="20" fill="#2A221820" />
          {/* Layer labels */}
          <text x="5" y="10" fill="#8B735580" fontSize="5">OVERBURDEN</text>
          <text x="5" y="28" fill="#6B5B3E80" fontSize="5">SEDIMENTARY</text>
          <text x="5" y="50" fill="#4A3C2880" fontSize="5">PHOSPHATE LAYER</text>
          <text x="5" y="73" fill="#3D312080" fontSize="5">CLAY</text>
          <text x="5" y="93" fill="#2A221880" fontSize="5">BASEMENT</text>
          {/* Mineral deposits */}
          <circle cx="80" cy="47" r="6" fill="#8B9DAF40" stroke="#8B9DAF" strokeWidth="0.5" />
          <text x="80" y="49" textAnchor="middle" fill="#8B9DAF" fontSize="4">P2O5</text>
          <circle cx="160" cy="42" r="8" fill="#8B9DAF50" stroke="#8B9DAF" strokeWidth="0.5" />
          <text x="160" y="44" textAnchor="middle" fill="#8B9DAF" fontSize="4">PHOS</text>
          <circle cx="240" cy="50" r="5" fill="#22C55E30" stroke="#22C55E" strokeWidth="0.5" />
          <text x="240" y="52" textAnchor="middle" fill="#22C55E" fontSize="4">Co</text>
          {/* Depth markers */}
          <line x1="310" y1="0" x2="310" y2="100" stroke="#ffffff10" strokeWidth="0.5" />
          <text x="315" y="10" fill="#ffffff15" fontSize="4">0m</text>
          <text x="315" y="35" fill="#ffffff15" fontSize="4">50m</text>
          <text x="315" y="60" fill="#ffffff15" fontSize="4">100m</text>
          <text x="315" y="85" fill="#ffffff15" fontSize="4">150m</text>
        </svg>
      </div>

      {/* Processing Flow Chart */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.15)] rounded-none p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Mineral Processing Pipeline</span>
        <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[
            { stage: 'Extraction', pct: 98, icon: <Mountain size={10} /> },
            { stage: 'Crushing', pct: 96, icon: <Settings size={10} /> },
            { stage: 'Grinding', pct: 94, icon: <Layers size={10} /> },
            { stage: 'Separation', pct: 91, icon: <Filter size={10} /> },
            { stage: 'Refining', pct: 88, icon: <Zap size={10} /> },
            { stage: 'Export', pct: 85, icon: <Truck size={10} /> },
          ].map((s, i) => (
            <div key={s.stage} className="flex items-center gap-1 flex-1">
              <div className="flex-1 bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.12)] rounded-none p-1.5 text-center hover:bg-[rgba(139,157,175,0.1)] transition-colors cursor-pointer">
                <div className="flex justify-center mb-0.5 text-[#8B9DAF50]">{s.icon}</div>
                <p className="text-[10px] sm:text-[8px] text-white/40">{s.stage}</p>
                <p className="text-[10px] sm:text-[9px] text-white/60 mt-0.5">{s.pct}%</p>
              </div>
              {i < 5 && <ArrowRight size={8} className="text-[#8B9DAF30] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Levels */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.15)] rounded-none p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Inventory by Mineral</span>
        <div className="space-y-2">
          {[
            { mineral: 'Phosphate Rock', qty: '320kT', capacity: 85, color: '#8B9DAF' },
            { mineral: 'Cobalt Concentrate', qty: '4.2kT', capacity: 62, color: '#3B82F6' },
            { mineral: 'Rare Earth Oxides', qty: '0.8kT', capacity: 28, color: '#22C55E' },
            { mineral: 'Fluorite', qty: '18kT', capacity: 71, color: '#A855F7' },
          ].map(m => (
            <div key={m.mineral}>
              <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
                <span className="text-white/35">{m.mineral}</span>
                <span className="text-white/50">{m.qty} ({m.capacity}%)</span>
              </div>
              <div className="h-[3px] bg-[rgba(255,255,255,0.04)] rounded-none overflow-hidden">
                <motion.div className="h-full" style={{ backgroundColor: m.color, width: `${m.capacity}%` }} initial={{ width: 0 }} animate={{ width: `${m.capacity}%` }} transition={{ duration: 1, delay: 0.3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  renderSidebar: (accent) => (
    <div className="space-y-3">
      {/* Safety Dashboard */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.15)] rounded-none p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Safety Metrics</span>
        {[
          { metric: 'Gas Levels', value: 'Normal', icon: <Wind size={9} />, ok: true },
          { metric: 'Seismic Activity', value: '0.1 mm/s', icon: <Activity size={9} />, ok: true },
          { metric: 'Air Quality', value: '98/100', icon: <Leaf size={9} />, ok: true },
          { metric: 'Incidents (YTD)', value: '0', icon: <Shield size={9} />, ok: true },
        ].map(s => (
          <div key={s.metric} className="flex items-center justify-between py-1.5 border-b border-[rgba(139,157,175,0.05)] last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[#8B9DAF40]">{s.icon}</span>
              <span className="text-[10px] sm:text-[9px] text-white/30">{s.metric}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[9px] text-white/55">{s.value}</span>
              <CheckCircle size={8} className="text-emerald-400/50" />
            </div>
          </div>
        ))}
      </div>
      {/* Commodity Price Ticker */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.15)] rounded-none p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Commodity Prices</span>
        {[
          { name: 'Phosphate Rock', price: '$135/T', ch: '+3.2%' },
          { name: 'Cobalt', price: '$33,500/T', ch: '-1.8%' },
          { name: 'Neodymium', price: '$85/kg', ch: '+7.1%' },
          { name: 'Fluorite', price: '$320/T', ch: '+1.5%' },
        ].map((c) => (
          <div key={c.name} className="flex justify-between py-1 border-b border-[rgba(139,157,175,0.04)] last:border-0">
            <span className="text-[10px] sm:text-[9px] text-white/30">{c.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[9px] text-white/50">{c.price}</span>
              <span className={`text-[10px] sm:text-[8px] ${c.ch.startsWith('+') ? 'text-emerald-400/60' : 'text-red-400/60'}`}>{c.ch}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/mining-smelter.jpg',
};

// ═══════════════════════════════════════════════════════════════
// CEMENT — HarchCement Plant
// Industrial factory, warm amber, heavy/massive feel
// ═══════════════════════════════════════════════════════════════
const cementConfig: DashboardConfig = {
  platformName: 'HarchCement Plant',
  platformVersion: '0.2',
  accent: '#C8903A',
  bgGradient: 'from-[#120A02] to-[#0D0802]',
  sidebar: [
    { icon: <Factory size={13} />, label: 'Plant Overview' },
    { icon: <Settings size={13} />, label: 'Production Line' },
    { icon: <CheckCircle size={13} />, label: 'Quality Lab' },
    { icon: <Package size={13} />, label: 'Supply Chain' },
    { icon: <Truck size={13} />, label: 'Logistics' },
    { icon: <Leaf size={13} />, label: 'Environmental' },
  ],
  headerTabs: ['Production', 'Quality', 'Delivery', 'Environmental'],
  tourSteps: [
    { targetId: 'cement-metric-prod', label: 'A', title: 'Production Output', description: '500kT/yr cement production capacity. Vertically integrated from quarry to delivery, serving West Africa\'s construction boom.', position: 'bottom' },
    { targetId: 'cement-quality', label: 'B', title: 'Quality Control', description: 'Automated quality testing at every stage — raw material, clinker, and finished product. ISO 9001 certified processes.', position: 'bottom' },
    { targetId: 'cement-supply', label: 'C', title: 'Supply Chain Tracker', description: 'End-to-end visibility from raw material extraction to customer delivery. Real-time fleet tracking and inventory management.', position: 'top' },
  ],
  metricCards: [
    { id: 'cement-metric-prod', label: 'Production', value: '500kT/yr', change: '+18%', changeUp: true, icon: <Factory size={14} /> },
    { id: 'cement-quality', label: 'Quality Rate', value: '99.4%', change: '+0.2%', changeUp: true, icon: <CheckCircle size={14} /> },
    { id: 'cement-metric-energy', label: 'Energy/GT', value: '3.2 GJ', change: '-8%', changeUp: true, icon: <Zap size={14} /> },
    { id: 'cement-metric-delivery', label: 'On-Time', value: '97.2%', change: '+1.5%', changeUp: true, icon: <Truck size={14} /> },
  ],
  statusBarText: 'BANJUL PLANT | KILN: 1450C | LINE ACTIVE',
  renderMain: (accent) => (
    <div id="cement-supply" className="space-y-3">
      {/* Factory Floor Production Line Diagram */}
      <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3 md:p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Production Line — Live</span>
        <div className="flex items-center gap-0.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[
            { stage: 'Quarry', output: '1,200 T/day', status: 'active', icon: <Mountain size={12} /> },
            { stage: 'Crusher', output: '1,150 T/day', status: 'active', icon: <Settings size={12} /> },
            { stage: 'Kiln', output: '950 T/day', status: 'active', icon: <Thermometer size={12} /> },
            { stage: 'Cooler', output: '940 T/day', status: 'active', icon: <Wind size={12} /> },
            { stage: 'Grinder', output: '880 T/day', status: 'active', icon: <Layers size={12} /> },
            { stage: 'Silos', output: '870 T/day', status: 'active', icon: <Database size={12} /> },
            { stage: 'Dispatch', output: '860 T/day', status: 'active', icon: <Truck size={12} /> },
          ].map((s, i) => (
            <div key={s.stage} className="flex items-center gap-0.5 flex-1 min-w-0">
              <div className="flex-1 bg-[rgba(200,144,58,0.06)] border border-[rgba(200,144,58,0.12)] rounded-lg p-2 text-center hover:bg-[rgba(200,144,58,0.1)] transition-colors cursor-pointer">
                <div className="flex justify-center mb-1 text-[#C8903A50]">{s.icon}</div>
                <p className="text-[10px] sm:text-[8px] text-white/40 font-bold">{s.stage}</p>
                <p className="text-[10px] sm:text-[9px] text-white/55 mt-0.5">{s.output}</p>
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 mt-1" />
              </div>
              {i < 6 && <ArrowRight size={7} className="text-[#C8903A25] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Kiln Temperature Gauge + Daily Production */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Kiln Temperature Gauge */}
        <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={10} className="text-[#C8903A60]" />
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20">Kiln Temperature</span>
          </div>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 80 50" className="w-28 h-auto">
              <path d="M 10 45 A 35 35 0 0 1 70 45" fill="none" stroke="#ffffff08" strokeWidth="5" strokeLinecap="round" />
              <motion.path
                d="M 10 45 A 35 35 0 0 1 70 45"
                fill="none"
                stroke="#C8903A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 15 }}
                transition={{ duration: 1.5 }}
              />
              <text x="40" y="38" textAnchor="middle" fill="#C8903A" fontSize="14" fontWeight="bold">1450</text>
              <text x="40" y="48" textAnchor="middle" fill="#ffffff30" fontSize="6">degrees C</text>
            </svg>
          </div>
        </div>

        {/* Daily Production vs Target */}
        <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3">
          <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase text-white/20 mb-2 block">Daily vs Target</span>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
                <span className="text-white/30">Today</span>
                <span className="text-white/50">1,420 T</span>
              </div>
              <div className="h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-[#C8903A]" initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1 }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
                <span className="text-white/30">Target</span>
                <span className="text-white/40">1,500 T</span>
              </div>
              <div className="h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-white/10 w-full" />
              </div>
            </div>
          </div>
          <p className="text-[10px] sm:text-[8px] text-[#C8903A60] mt-2">94.7% of daily target</p>
        </div>
      </div>

      {/* Delivery Fleet Tracker */}
      <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3 md:p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Delivery Fleet</span>
        <div className="space-y-1.5">
          {[
            { route: 'Banjul → Serekunda', status: 'In Transit', eta: '2h 30m', load: '42T', progress: 65 },
            { route: 'Banjul → Brikama', status: 'Loading', eta: '—', load: '38T', progress: 20 },
            { route: 'Banjul → Farafenni', status: 'Scheduled', eta: '6h 15m', load: '45T', progress: 0 },
          ].map(d => (
            <div key={d.route} className="flex items-center justify-between py-1.5 border-b border-[rgba(200,144,58,0.05)] last:border-0 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.status === 'In Transit' ? 'bg-emerald-400' : d.status === 'Loading' ? 'bg-amber-400' : 'bg-white/15'}`} />
                <span className="text-[10px] sm:text-[9px] text-white/50 truncate">{d.route}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[8px] text-white/25 flex-shrink-0">
                <span>{d.load}</span>
                <span className="text-white/40 hidden sm:inline">ETA {d.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  renderSidebar: (accent) => (
    <div className="space-y-3">
      {/* Quality Test Results */}
      <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Quality Lab Results</span>
        {[
          { test: 'Compressive Strength', value: '42.5 MPa', pass: true },
          { test: 'Setting Time', value: '45 min', pass: true },
          { test: 'Fineness', value: '350 m2/kg', pass: true },
          { test: 'Soundness', value: '0.8 mm', pass: true },
        ].map(q => (
          <div key={q.test} className="flex items-center justify-between py-1 border-b border-[rgba(200,144,58,0.04)] last:border-0">
            <span className="text-[10px] sm:text-[9px] text-white/30">{q.test}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[9px] text-white/50">{q.value}</span>
              <CheckCircle size={8} className="text-emerald-400/60" />
            </div>
          </div>
        ))}
      </div>
      {/* Raw Material Inventory */}
      <div className="bg-[#0D0802] border border-[rgba(200,144,58,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Raw Materials</span>
        {[
          { mat: 'Limestone', pct: 78, color: '#C8903A' },
          { mat: 'Clay', pct: 62, color: '#8B7355' },
          { mat: 'Gypsum', pct: 45, color: '#D4A843' },
          { mat: 'Iron Ore', pct: 88, color: '#6B5B3E' },
        ].map(m => (
          <div key={m.mat} className="mb-1.5">
            <div className="flex justify-between text-[10px] sm:text-[8px] mb-0.5">
              <span className="text-white/30">{m.mat}</span>
              <span className="text-white/40">{m.pct}%</span>
            </div>
            <div className="h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: m.color, width: `${m.pct}%` }} initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 1, delay: 0.2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/cement-factory.jpg',
};

// ═══════════════════════════════════════════════════════════════
// WATER — HarchWater Network
// Blue-teal tones, flowing/wave patterns, clean infrastructure
// ═══════════════════════════════════════════════════════════════
const waterConfig: DashboardConfig = {
  platformName: 'HarchWater Network',
  platformVersion: '0.8',
  accent: '#4A9EB5',
  bgGradient: 'from-[#05101A] to-[#030D14]',
  sidebar: [
    { icon: <Network size={13} />, label: 'Network' },
    { icon: <Droplets size={13} />, label: 'Desalination' },
    { icon: <CheckCircle size={13} />, label: 'Quality' },
    { icon: <Database size={13} />, label: 'Storage' },
    { icon: <Globe size={13} />, label: 'Distribution' },
    { icon: <AlertTriangle size={13} />, label: 'Alerts' },
  ],
  headerTabs: ['Overview', 'Desal', 'Quality', 'Distribution'],
  tourSteps: [
    { targetId: 'water-metric-desal', label: 'A', title: 'Desalination Capacity', description: '200M m3/yr desalination with optimized distribution. Solving Africa\'s water security crisis with sovereign infrastructure.', position: 'bottom' },
    { targetId: 'water-quality', label: 'B', title: 'Water Quality Monitor', description: 'Real-time quality monitoring across all distribution points. Automated alerts when parameters deviate from WHO standards.', position: 'bottom' },
    { targetId: 'water-network', label: 'C', title: 'Distribution Network', description: 'Optimized flow routing minimizes waste and maximizes coverage. Pressure monitoring prevents pipe bursts and leaks.', position: 'top' },
  ],
  metricCards: [
    { id: 'water-metric-desal', label: 'Desal Output', value: '200M m3/yr', change: '+22%', changeUp: true, icon: <Droplets size={14} /> },
    { id: 'water-quality', label: 'Quality Score', value: '99.7%', change: '+0.3%', changeUp: true, icon: <CheckCircle size={14} /> },
    { id: 'water-metric-loss', label: 'Loss Rate', value: '8.2%', change: '-3.1%', changeUp: true, icon: <Activity size={14} /> },
    { id: 'water-metric-coverage', label: 'Coverage', value: '2.4M people', change: '+340K', changeUp: true, icon: <Users size={14} /> },
  ],
  statusBarText: 'CASABLANCA DESAL | WHO COMPLIANT | 3 PLANTS ONLINE',
  renderMain: (accent) => (
    <div id="water-network" className="space-y-3">
      {/* Desalination Process Flow */}
      <div className="bg-[#030D14] border border-[rgba(74,158,181,0.15)] rounded-lg p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Desalination Process</span>
        <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[
            { stage: 'Intake', detail: 'Seawater', icon: <Waves size={11} /> },
            { stage: 'Pre-treat', detail: 'Filtration', icon: <Filter size={11} /> },
            { stage: 'RO', detail: 'Reverse Osmosis', icon: <Settings size={11} /> },
            { stage: 'Post-treat', detail: 'Mineralization', icon: <Droplet size={11} /> },
            { stage: 'Distribute', detail: 'To Network', icon: <Globe size={11} /> },
          ].map((s, i) => (
            <div key={s.stage} className="flex items-center gap-1 flex-1">
              <div className="flex-1 bg-[rgba(74,158,181,0.06)] border border-[rgba(74,158,181,0.12)] rounded-lg p-2 text-center hover:bg-[rgba(74,158,181,0.1)] transition-colors cursor-pointer">
                <div className="flex justify-center mb-1 text-[#4A9EB550]">{s.icon}</div>
                <p className="text-[10px] sm:text-[8px] text-white/40 font-bold">{s.stage}</p>
                <p className="text-[10px] sm:text-[7px] text-white/20 mt-0.5">{s.detail}</p>
              </div>
              {i < 4 && <ArrowRight size={7} className="text-[#4A9EB525] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Network with Flow */}
      <div className="bg-[#030D14] border border-[rgba(74,158,181,0.15)] rounded-lg p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Pipeline Network — Flow Rates</span>
        <svg viewBox="0 0 320 100" className="w-full h-auto">
          {/* Pipeline lines */}
          <line x1="30" y1="30" x2="150" y2="30" stroke="#4A9EB530" strokeWidth="2" />
          <line x1="30" y1="70" x2="150" y2="70" stroke="#4A9EB530" strokeWidth="2" />
          <line x1="150" y1="30" x2="280" y2="50" stroke="#4A9EB530" strokeWidth="2" />
          <line x1="150" y1="70" x2="280" y2="50" stroke="#4A9EB530" strokeWidth="1.5" />

          {/* Flow dots */}
          {[0, 1, 2].map(i => (
            <motion.circle key={`d1-${i}`} r="2" fill="#4A9EB5"
              initial={{ cx: 30, cy: 30 }}
              animate={{ cx: [30, 150], cy: [30, 30] }}
              transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          {[0, 1].map(i => (
            <motion.circle key={`d2-${i}`} r="2" fill="#4A9EB5"
              initial={{ cx: 30, cy: 70 }}
              animate={{ cx: [30, 150], cy: [70, 70] }}
              transition={{ duration: 2.5, delay: i * 1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          <motion.circle r="2" fill="#22C55E"
            initial={{ cx: 150, cy: 30 }}
            animate={{ cx: [150, 280], cy: [30, 50] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Nodes with pressure */}
          <circle cx="30" cy="30" r="6" fill="#4A9EB515" stroke="#4A9EB540" strokeWidth="0.5" />
          <text x="30" y="20" textAnchor="middle" fill="#4A9EB580" fontSize="5">4.8 bar</text>
          <circle cx="30" cy="70" r="6" fill="#4A9EB515" stroke="#4A9EB540" strokeWidth="0.5" />
          <text x="30" y="85" textAnchor="middle" fill="#4A9EB580" fontSize="5">5.2 bar</text>
          <circle cx="150" cy="30" r="4" fill="#4A9EB510" stroke="#4A9EB530" strokeWidth="0.5" />
          <circle cx="150" cy="70" r="4" fill="#4A9EB510" stroke="#4A9EB530" strokeWidth="0.5" />
          <circle cx="280" cy="50" r="8" fill="#22C55E10" stroke="#22C55E30" strokeWidth="0.5" />
          <text x="280" y="40" textAnchor="middle" fill="#22C55E80" fontSize="5">Demand</text>
        </svg>
      </div>

      {/* Reservoir Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { name: 'Casablanca', level: 78, capacity: '156K m3' },
          { name: 'Dakhla', level: 65, capacity: '98K m3' },
          { name: 'Agadir', level: 82, capacity: '120K m3' },
        ].map(r => (
          <div key={r.name} className="bg-[#030D14] border border-[rgba(74,158,181,0.15)] rounded-lg p-3">
            <span className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">{r.name}</span>
            <div className="h-12 bg-[rgba(74,158,181,0.05)] rounded mt-1.5 relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded"
                style={{ backgroundColor: '#4A9EB530' }}
                initial={{ height: 0 }}
                animate={{ height: `${r.level}%` }}
                transition={{ duration: 1.5 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">{r.level}%</span>
            </div>
            <p className="text-[10px] sm:text-[8px] text-white/20 mt-1">{r.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  renderSidebar: (accent) => (
    <div className="space-y-3">
      {/* Water Quality Dashboard */}
      <div className="bg-[#030D14] border border-[rgba(74,158,181,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Quality Parameters</span>
        {[
          { param: 'pH Level', value: '7.2', ok: true },
          { param: 'Turbidity', value: '0.3 NTU', ok: true },
          { param: 'TDS', value: '280 mg/L', ok: true },
          { param: 'Chlorine', value: '0.4 mg/L', ok: true },
          { param: 'Bacteria', value: '0 CFU/100mL', ok: true },
        ].map(q => (
          <div key={q.param} className="flex items-center justify-between py-1 border-b border-[rgba(74,158,181,0.04)] last:border-0">
            <span className="text-[10px] sm:text-[9px] text-white/30">{q.param}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[9px] text-white/50">{q.value}</span>
              <CheckCircle size={7} className="text-emerald-400/60" />
            </div>
          </div>
        ))}
      </div>
      {/* Leak Detection */}
      <div className="bg-[#030D14] border border-[rgba(74,158,181,0.15)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Leak Detection</span>
        <div className="space-y-1.5">
          {[
            { zone: 'Zone 3 — Casablanca North', status: 'No leaks', severity: 'ok' },
            { zone: 'Zone 7 — Rabat East', status: 'Minor pressure drop', severity: 'warn' },
            { zone: 'Zone 12 — Dakhla', status: 'No leaks', severity: 'ok' },
          ].map(l => (
            <div key={l.zone} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${l.severity === 'ok' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-[10px] sm:text-[8px] text-white/35">{l.zone}</span>
              </div>
              <span className={`text-[10px] sm:text-[7px] ${l.severity === 'ok' ? 'text-emerald-400/50' : 'text-amber-400/50'}`}>{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/water-treatment.jpg',
};

// ═══════════════════════════════════════════════════════════════
// TECHNOLOGY — HarchTech DevPortal
// Developer-focused, monospace, dark code editor feel
// ═══════════════════════════════════════════════════════════════
const technologyConfig: DashboardConfig = {
  platformName: 'HarchTech DevPortal',
  platformVersion: '0.4',
  accent: '#7C8CF5',
  bgGradient: 'from-[#0A0D1A] to-[#0D0F1C]',
  sidebar: [
    { icon: <Monitor size={13} />, label: 'Dashboard' },
    { icon: <Code size={13} />, label: 'API Explorer' },
    { icon: <GitBranch size={13} />, label: 'Deployments' },
    { icon: <Activity size={13} />, label: 'Monitoring' },
    { icon: <Package size={13} />, label: 'SDKs' },
    { icon: <Lock size={13} />, label: 'Security' },
  ],
  headerTabs: ['API', 'Deploys', 'Monitoring', 'Security'],
  tourSteps: [
    { targetId: 'tech-metric-api', label: 'A', title: 'API Performance', description: 'Sub-50ms latency across all endpoints. 99.99% uptime SLA with automatic failover and carbon-aware routing.', position: 'bottom' },
    { targetId: 'tech-deploy', label: 'B', title: 'Deployment Pipeline', description: 'CI/CD pipeline with automated testing, security scanning, and carbon-aware deployment to the greenest available hub.', position: 'bottom' },
    { targetId: 'tech-console', label: 'C', title: 'Developer Console', description: 'Full API playground, SDK documentation, and real-time monitoring. Native Python and TypeScript SDKs.', position: 'top' },
  ],
  metricCards: [
    { id: 'tech-metric-api', label: 'API Latency', value: '23ms', change: '-5ms', changeUp: true, icon: <Zap size={14} /> },
    { id: 'tech-deploy', label: 'Deployments', value: '1,847', change: '+342', changeUp: true, icon: <GitBranch size={14} /> },
    { id: 'tech-metric-uptime', label: 'Uptime', value: '99.99%', change: '+0.01%', changeUp: true, icon: <Activity size={14} /> },
    { id: 'tech-console', label: 'SDK Downloads', value: '14.2K', change: '+28%', changeUp: true, icon: <Package size={14} /> },
  ],
  statusBarText: 'ALL SERVICES UP | 5 REGIONS | v0.4 LIVE',
  renderMain: (accent) => (
    <div id="tech-console" className="space-y-3 font-mono">
      {/* API Endpoint Explorer */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-[rgba(124,140,245,0.06)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code size={10} style={{ color: accent }} />
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">API Endpoints</span>
          </div>
          <span className="text-[10px] sm:text-[8px] text-emerald-400/50">ALL HEALTHY</span>
        </div>
        <div className="divide-y divide-[rgba(124,140,245,0.04)]">
          {[
            { method: 'GET', path: '/v1/carbon/intensity', latency: '12ms', status: '200' },
            { method: 'POST', path: '/v1/workloads/deploy', latency: '34ms', status: '200' },
            { method: 'GET', path: '/v1/hubs/status', latency: '18ms', status: '200' },
            { method: 'PUT', path: '/v1/scheduler/config', latency: '22ms', status: '200' },
            { method: 'DELETE', path: '/v1/workloads/{id}', latency: '15ms', status: '200' },
          ].map((ep) => (
            <div key={ep.path} className="px-3 py-2 flex items-center justify-between hover:bg-[rgba(124,140,245,0.03)] transition-colors cursor-pointer gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[7px] font-bold flex-shrink-0 ${
                  ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' :
                  ep.method === 'POST' ? 'bg-blue-500/10 text-blue-400' :
                  ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-red-500/10 text-red-400'
                }`}>{ep.method}</span>
                <span className="text-[10px] text-white/50 truncate">{ep.path}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[8px] flex-shrink-0">
                <span className="text-white/25">{ep.latency}</span>
                <span className="text-emerald-400/40">{ep.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Pipeline Visualization */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Deployment Pipeline</span>
        <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[
            { stage: 'Code', status: 'done', icon: <Code size={10} /> },
            { stage: 'Build', status: 'done', icon: <Settings size={10} /> },
            { stage: 'Test', status: 'done', icon: <CheckCircle size={10} /> },
            { stage: 'Stage', status: 'active', icon: <Clock size={10} /> },
            { stage: 'Deploy', status: 'pending', icon: <Play size={10} /> },
          ].map((s, i) => (
            <div key={s.stage} className="flex items-center gap-1 flex-1">
              <div className={`flex-1 rounded p-1.5 text-center border transition-colors cursor-pointer ${
                s.status === 'done' ? 'bg-emerald-500/8 border-emerald-500/15' :
                s.status === 'active' ? 'bg-[#7C8CF5]/10 border-[#7C8CF5]/20' :
                'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)]'
              }`}>
                <div className="flex justify-center mb-0.5" style={{ color: s.status === 'done' ? '#22C55E60' : s.status === 'active' ? '#7C8CF580' : '#ffffff20' }}>{s.icon}</div>
                <p className="text-[10px] sm:text-[8px] text-white/40">{s.stage}</p>
              </div>
              {i < 4 && <ArrowRight size={7} className="text-white/10 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Service Health Matrix */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg p-4">
        <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Service Health Matrix</span>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] sm:text-[8px]">
            <thead>
              <tr>
                <th className="text-left text-white/15 pb-1.5 pr-3">Service</th>
                <th className="text-center text-white/15 pb-1.5 px-1">Casa</th>
                <th className="text-center text-white/15 pb-1.5 px-1">Rabat</th>
                <th className="text-center text-white/15 pb-1.5 px-1">Marr.</th>
                <th className="text-center text-white/15 pb-1.5 px-1">Tang.</th>
                <th className="text-center text-white/15 pb-1.5 px-1">Dakhla</th>
              </tr>
            </thead>
            <tbody>
              {['API Gateway', 'Auth Service', 'Carbon Router', 'Scheduler', 'Monitor'].map(svc => (
                <tr key={svc}>
                  <td className="text-white/35 py-0.5 pr-3">{svc}</td>
                  {[0,1,2,3,4].map(r => {
                    const healthy = !(svc === 'Scheduler' && r === 3);
                    return (
                      <td key={r} className="text-center py-0.5 px-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${healthy ? 'bg-emerald-400/60' : 'bg-amber-400/60'}`} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
  renderSidebar: (accent) => (
    <div className="space-y-3 font-mono">
      {/* SDK Downloads */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">SDK Downloads</span>
        {[
          { lang: 'Python', pkg: 'harchos', downloads: '8.2K', trend: '+12%' },
          { lang: 'TypeScript', pkg: '@harchos/sdk', downloads: '4.8K', trend: '+28%' },
          { lang: 'Go', pkg: 'harchos-go', downloads: '1.2K', trend: '+45%' },
        ].map(s => (
          <div key={s.lang} className="flex items-center justify-between py-1 border-b border-[rgba(124,140,245,0.04)] last:border-0">
            <div>
              <span className="text-[10px] sm:text-[9px] text-white/40">{s.lang}</span>
              <span className="text-[10px] sm:text-[8px] text-white/15 ml-1">{s.pkg}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[9px] text-white/50">{s.downloads}</span>
              <span className="text-[10px] sm:text-[8px] text-emerald-400/50">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Security Score */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Security Score</span>
        <p className="text-xl font-bold text-white">A+</p>
        <p className="text-[10px] sm:text-[8px] text-white/25 mt-1">0 vulnerabilities</p>
        <p className="text-[10px] sm:text-[8px] text-white/20">SOC 2 Type II Certified</p>
      </div>
      {/* Recent Deploy Log */}
      <div className="bg-[#0D0F1C] border border-[rgba(124,140,245,0.12)] rounded-lg p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Recent Deploys</span>
        {[
          { app: 'harchos-api', ver: 'v2.3.1', time: '2m ago', status: 'success' },
          { app: 'scheduler', ver: 'v1.8.0', time: '14m ago', status: 'success' },
          { app: 'carbon-mon', ver: 'v3.1.4', time: '1h ago', status: 'success' },
        ].map(d => (
          <div key={d.app} className="flex items-center justify-between py-0.5 border-b border-[rgba(124,140,245,0.03)] last:border-0">
            <div className="flex items-center gap-1">
              <CheckCircle size={7} className="text-emerald-400/50" />
              <span className="text-[10px] sm:text-[8px] text-white/40">{d.app}</span>
              <span className="text-[10px] sm:text-[7px] text-white/20">{d.ver}</span>
            </div>
            <span className="text-[10px] sm:text-[7px] text-white/15">{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/tech-cyber.jpg',
};

// ═══════════════════════════════════════════════════════════════
// FINANCE — HarchFinance Terminal
// Bloomberg/professional fintech aesthetic, slate accent, mono fonts
// ═══════════════════════════════════════════════════════════════
const financeConfig: DashboardConfig = {
  platformName: 'HarchFinance Terminal',
  platformVersion: '0.8',
  accent: '#8B9DAF',
  bgGradient: 'from-[#0A0A12] to-[#0D0F14]',
  sidebar: [
    { icon: <BarChart3 size={13} />, label: 'Portfolio' },
    { icon: <Layers size={13} />, label: 'Pipeline' },
    { icon: <FileCode size={13} />, label: 'Bonds' },
    { icon: <Shield size={13} />, label: 'Risk' },
    { icon: <ArrowRight size={13} />, label: 'Transactions' },
    { icon: <CheckCircle size={13} />, label: 'Compliance' },
  ],
  headerTabs: ['Portfolio', 'Pipeline', 'Bonds', 'Risk'],
  tourSteps: [
    { targetId: 'finance-metric-aum', label: 'A', title: 'Investment Pipeline', description: '$2.4B across 7 verticals spanning 5 countries. Green bonds, project finance, and Islamic finance instruments.', position: 'bottom' },
    { targetId: 'finance-metric-bonds', label: 'B', title: 'Green Bond Issuance', description: '$890M in green bonds certified by Climate Bonds Initiative. First African corporate green bond program for sovereign infrastructure.', position: 'bottom' },
    { targetId: 'finance-metric-pipeline', label: 'C', title: 'Risk Intelligence', description: 'Real-time risk scoring across all portfolio positions. DFI-backed and MIGA-guaranteed structures minimize downside exposure.', position: 'top' },
  ],
  metricCards: [
    { id: 'finance-metric-aum', label: 'AUM', value: '$2.4B', change: '+$340M', changeUp: true, icon: <Landmark size={14} /> },
    { id: 'finance-metric-irr', label: 'Avg IRR', value: '22.8%', change: '+1.2%', changeUp: true, icon: <TrendingUp size={14} /> },
    { id: 'finance-metric-bonds', label: 'Green Bonds', value: '$890M', change: '+$120M', changeUp: true, icon: <FileCode size={14} /> },
    { id: 'finance-metric-pipeline', label: 'Active Deals', value: '7', change: '+2', changeUp: true, icon: <Layers size={14} /> },
  ],
  statusBarText: 'DEALS: 7 ACTIVE | 5 COUNTRIES | COMPLIANT',
  renderMain: (accent, activeTab, activeSidebar, selectedHub, setSelectedHub, _toggleIrr, _irrState) => {
    const deals = [
      { name: 'Harch Intelligence Phase 2', amount: '$400M', irr: '28%', country: 'Morocco', status: 'Active' },
      { name: 'Harch Energy Solar Park', amount: '$350M', irr: '24%', country: 'Morocco', status: 'Funding' },
      { name: 'Harch Cement Expansion', amount: '$180M', irr: '38%', country: 'Gambia', status: 'Committed' },
      { name: 'Harch Water Desalination', amount: '$520M', irr: '19%', country: 'Senegal', status: 'Active' },
      { name: 'Harch Mining Processing', amount: '$280M', irr: '22%', country: 'Morocco', status: 'Term Sheet' },
      { name: 'Harch Agri Scale-Up', amount: '$320M', irr: '26%', country: 'Sahel', status: 'Due Diligence' },
      { name: 'Green Bond Series III', amount: '$350M', irr: '5.2%', country: 'Pan-African', status: 'Launching' },
    ];

    const selectedDeal = selectedHub !== null ? deals[selectedHub] : null;

    const yieldCurve = [
      { tenor: '1Y', yield: 4.8 },
      { tenor: '3Y', yield: 5.2 },
      { tenor: '5Y', yield: 5.5 },
      { tenor: '7Y', yield: 5.7 },
      { tenor: '10Y', yield: 6.1 },
    ];

    const allocations = [
      { sector: 'Energy', pct: 35, color: '#D4A843' },
      { sector: 'Intelligence', pct: 22, color: '#8B9DAF' },
      { sector: 'Water', pct: 18, color: '#4A9EB5' },
      { sector: 'Mining', pct: 10, color: '#8B9DAF' },
      { sector: 'Cement', pct: 8, color: '#C8903A' },
      { sector: 'Agri', pct: 7, color: '#4A7B5F' },
    ];

    const funnelStages = [
      { stage: 'Sourcing', count: 14 },
      { stage: 'Due Diligence', count: 9 },
      { stage: 'Term Sheet', count: 5 },
      { stage: 'Committed', count: 3 },
      { stage: 'Closed', count: 2 },
    ];

    const transactions = [
      { time: '16:42:18', type: 'BOND', desc: 'Green Bond III — $50M tranche closed', amount: '+$50M', status: 'settled' },
      { time: '15:38:05', type: 'TRANSFER', desc: 'Harch Energy — ECA drawdown', amount: '-$12M', status: 'pending' },
      { time: '14:22:31', type: 'BOND', desc: 'Sukuk Ijarah — coupon payment', amount: '-$8.4M', status: 'settled' },
      { time: '13:15:44', type: 'TRADE', desc: 'Harch Cement — LC confirmed', amount: '$22M', status: 'confirmed' },
      { time: '11:50:22', type: 'CREDIT', desc: 'Carbon credit forward sale — Verra VCS', amount: '+$2.1M', status: 'settled' },
    ];

    return (
      <div className="space-y-3 font-mono">
        {/* Deal Detail Panel */}
        {selectedDeal && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D0F14] border border-[rgba(139,157,175,0.2)] rounded-sm p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Landmark size={14} style={{ color: accent }} />
                <span className="text-[11px] font-bold text-white">{selectedDeal.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-sm text-[10px] sm:text-[8px] font-bold uppercase ${
                  selectedDeal.status === 'Active' || selectedDeal.status === 'Committed'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : selectedDeal.status === 'Funding' || selectedDeal.status === 'Launching'
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-[rgba(139,157,175,0.1)] text-[#8B9DAF]'
                }`}>{selectedDeal.status}</span>
                <button onClick={() => setSelectedHub(null)} className="text-white/20 hover:text-white/50 transition-colors cursor-pointer">
                  <X size={12} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Amount</p><p className="text-sm font-bold text-white">{selectedDeal.amount}</p></div>
              <div><p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">{selectedDeal.irr.includes('%') && parseFloat(selectedDeal.irr) < 10 ? 'Coupon' : 'IRR'}</p><p className="text-sm font-bold text-[#8B9DAF]">{selectedDeal.irr}</p></div>
              <div><p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Country</p><p className="text-sm font-bold text-white">{selectedDeal.country}</p></div>
              <div><p className="text-[10px] sm:text-[8px] text-white/25 uppercase tracking-wider">Risk</p><p className="text-sm font-bold text-emerald-400">LOW</p></div>
            </div>
          </motion.div>
        )}

        {/* Investment Pipeline Table */}
        {(activeTab === 0 || activeTab === 1) && (
          <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-[rgba(139,157,175,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={11} style={{ color: accent }} />
                <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Investment Pipeline</span>
              </div>
              <span className="text-[10px] sm:text-[8px] text-emerald-400/50">7 DEALS</span>
            </div>
            <div className="overflow-x-auto">
              <div className="divide-y divide-[rgba(139,157,175,0.05)] min-w-[300px]">
                {deals.map((deal, i) => (
                  <button
                    key={deal.name}
                    onClick={() => setSelectedHub(i)}
                    className={`w-full px-3 py-2 flex items-center justify-between hover:bg-[rgba(139,157,175,0.04)] transition-colors cursor-pointer text-left ${selectedHub === i ? 'bg-[rgba(139,157,175,0.06)]' : ''}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        deal.status === 'Active' || deal.status === 'Committed' ? 'bg-emerald-400' :
                        deal.status === 'Funding' || deal.status === 'Launching' ? 'bg-amber-400' :
                        deal.status === 'Term Sheet' ? 'bg-[#8B9DAF]' : 'bg-white/20'
                      }`} />
                      <span className="text-[10px] text-white/60 truncate">{deal.name}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 text-[10px] sm:text-[8px] flex-shrink-0 ml-2">
                      <span className="text-white/50">{deal.amount}</span>
                      <span className="text-[#8B9DAF] hidden sm:inline">{deal.irr}</span>
                      <span className="text-white/25 hidden md:inline">{deal.country}</span>
                      <span className={`hidden sm:inline ${
                        deal.status === 'Active' || deal.status === 'Committed' ? 'text-emerald-400/60' :
                        deal.status === 'Funding' || deal.status === 'Launching' ? 'text-amber-400/60' :
                        'text-white/30'
                      }`}>{deal.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bond Yield Curve */}
        {(activeTab === 2 || activeTab === 0) && (
          <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Bond Yield Curve</span>
              <span className="text-[10px] sm:text-[8px] text-[#8B9DAF]/50">CBI CERTIFIED</span>
            </div>
            <svg viewBox="0 0 300 80" className="w-full h-auto">
              {/* Grid lines */}
              {[4.5, 5.0, 5.5, 6.0, 6.5].map((y, i) => (
                <g key={i}>
                  <line x1="30" y1={10 + i * 15} x2="290" y2={10 + i * 15} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <text x="25" y={13 + i * 15} fill="rgba(255,255,255,0.15)" fontSize="6" textAnchor="end">{y}%</text>
                </g>
              ))}
              {/* Curve */}
              <motion.path
                d="M 50 58 Q 100 48 140 38 Q 180 30 220 24 Q 250 20 280 14"
                stroke="#8B9DAF"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              {/* Fill under curve */}
              <motion.path
                d="M 50 58 Q 100 48 140 38 Q 180 30 220 24 Q 250 20 280 14 L 280 70 L 50 70 Z"
                fill="url(#yieldGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <defs>
                <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B9DAF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B9DAF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Data points */}
              {yieldCurve.map((point, i) => {
                const x = 50 + i * 57.5;
                const y = 70 - ((point.yield - 4.5) / 2) * 60;
                return (
                  <g key={point.tenor}>
                    <motion.circle
                      cx={x} cy={y} r="3"
                      fill="#0D0F14"
                      stroke="#8B9DAF"
                      strokeWidth="1.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                    />
                    <text x={x} y={y + 14} fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">{point.tenor}</text>
                    <text x={x} y={y - 6} fill="#8B9DAF" fontSize="6" textAnchor="middle" fontWeight="bold">{point.yield}%</text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* Portfolio Allocation */}
        {(activeTab === 0 || activeTab === 3) && (
          <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Portfolio Allocation</span>
            <div className="space-y-1.5">
              {allocations.map((a) => (
                <div key={a.sector} className="group cursor-pointer hover:bg-[rgba(139,157,175,0.03)] transition-colors rounded-sm px-1 py-0.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] sm:text-[9px] text-white/40">{a.sector}</span>
                    <span className="text-[10px] sm:text-[9px] text-white/55 font-bold">{a.pct}%</span>
                  </div>
                  <div className="h-[3px] bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full rounded-sm"
                      style={{ backgroundColor: a.color, width: `${a.pct}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${a.pct}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deal Flow Funnel */}
        {activeTab === 1 && (
          <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
            <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Deal Flow Funnel</span>
            <div className="space-y-1.5">
              {funnelStages.map((s, i) => {
                const width = (s.count / 14) * 100;
                return (
                  <button
                    key={s.stage}
                    onClick={() => {}}
                    className="w-full cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] sm:text-[9px] text-white/40 group-hover:text-white/60 transition-colors">{s.stage}</span>
                      <span className="text-[10px] sm:text-[9px] text-[#8B9DAF] font-bold">{s.count}</span>
                    </div>
                    <div className="h-[6px] bg-[rgba(255,255,255,0.03)] rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full rounded-sm"
                        style={{ backgroundColor: accent, opacity: 0.6 - i * 0.08 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Transaction Feed */}
        {(activeSidebar === 4 || activeTab === 0) && (
          <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-[rgba(139,157,175,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight size={10} style={{ color: accent }} />
                <span className="text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">Transaction Feed</span>
              </div>
              <span className="text-[10px] sm:text-[8px] text-emerald-400/50 animate-pulse">LIVE</span>
            </div>
            <div className="max-h-32 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#8B9DAF20 transparent' }}>
              {transactions.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="px-3 py-1.5 flex items-center justify-between border-b border-[rgba(139,157,175,0.03)] hover:bg-[rgba(139,157,175,0.03)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] sm:text-[7px] text-white/15 w-12 flex-shrink-0">{tx.time}</span>
                    <span className={`px-1 py-0.5 rounded-sm text-[10px] sm:text-[6px] font-bold flex-shrink-0 ${
                      tx.type === 'BOND' ? 'bg-[#8B9DAF]/10 text-[#8B9DAF]/70' :
                      tx.type === 'TRANSFER' ? 'bg-amber-500/10 text-amber-400/60' :
                      tx.type === 'TRADE' ? 'bg-emerald-500/10 text-emerald-400/60' :
                      'bg-[#4A9EB5]/10 text-[#4A9EB5]/60'
                    }`}>{tx.type}</span>
                    <span className="text-[10px] sm:text-[8px] text-white/40 truncate">{tx.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-1">
                    <span className={`text-[10px] sm:text-[8px] font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400/70' : 'text-white/30'}`}>{tx.amount}</span>
                    <span className={`w-1 h-1 rounded-full ${tx.status === 'settled' ? 'bg-emerald-400/50' : 'bg-amber-400/50'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  renderSidebar: (accent) => (
    <div className="space-y-3 font-mono">
      {/* Risk Score Matrix */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Risk Score Matrix</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          <div className="hidden sm:block" />
          {['EN', 'AG', 'MIN'].map(s => (
            <span key={s} className="text-[10px] sm:text-[6px] text-white/15 text-center hidden sm:block">{s}</span>
          ))}
          {[
            { region: 'MA', scores: ['#22C55E', '#22C55E', '#EAB308'] },
            { region: 'GM', scores: ['#22C55E', '#EAB308', '#22C55E'] },
            { region: 'SN', scores: ['#EAB308', '#22C55E', '#EAB308'] },
            { region: 'KE', scores: ['#EAB308', '#EAB308', '#EF4444'] },
          ].map(row => (
            <React.Fragment key={row.region}>
              <span className="text-[10px] sm:text-[6px] text-white/20 flex items-center">{row.region}</span>
              {row.scores.map((color, j) => (
                <div key={j} className="h-4 rounded-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: `${color}30`, border: `1px solid ${color}40` }} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          {[{ color: '#22C55E', label: 'Low' }, { color: '#EAB308', label: 'Med' }, { color: '#EF4444', label: 'High' }].map(l => (
            <span key={l.label} className="flex items-center gap-1 text-[10px] sm:text-[6px] text-white/15">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l.color }} /> {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Currency Rates */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Currency Rates</span>
        {[
          { code: 'MAD', rate: '10.05/$', change: '+0.3%', up: true },
          { code: 'EUR', rate: '0.92/$', change: '-0.1%', up: false },
          { code: 'USD', rate: '1.00', change: '0%', up: true },
          { code: 'GBP', rate: '0.79/$', change: '+0.2%', up: true },
        ].map(c => (
          <div key={c.code} className="flex items-center justify-between py-1 border-b border-[rgba(139,157,175,0.04)] last:border-0 cursor-pointer hover:bg-[rgba(139,157,175,0.03)] transition-colors rounded-sm px-1">
            <span className="text-[10px] sm:text-[9px] text-white/40 font-bold w-8">{c.code}</span>
            <span className="text-[10px] sm:text-[9px] text-white/55">{c.rate}</span>
            <span className={`text-[10px] sm:text-[8px] ${c.up ? 'text-emerald-400/60' : 'text-red-400/60'}`}>{c.change}</span>
          </div>
        ))}
      </div>

      {/* Compliance Status */}
      <div className="bg-[#0D0F14] border border-[rgba(139,157,175,0.12)] rounded-sm p-3">
        <span className="text-[10px] sm:text-[8px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2 block">Compliance Status</span>
        {[
          { label: 'Sharia (OIC)', status: 'Compliant', icon: <CheckCircle size={8} /> },
          { label: 'MIGA Coverage', status: 'Active', icon: <Shield size={8} /> },
          { label: 'DFI Alignment', status: 'Verified', icon: <CheckCircle size={8} /> },
        ].map(c => (
          <div key={c.label} className="flex items-center justify-between py-1 border-b border-[rgba(139,157,175,0.04)] last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400/50">{c.icon}</span>
              <span className="text-[10px] sm:text-[8px] text-white/35">{c.label}</span>
            </div>
            <span className="text-[10px] sm:text-[8px] text-emerald-400/60 font-bold">{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  backgroundImage: '/images/sections/finance-district.jpg',
};

// ─── Config Registry ───
const configs: Record<string, DashboardConfig> = {
  intelligence: intelligenceConfig,
  agriculture: agricultureConfig,
  energy: energyConfig,
  mining: miningConfig,
  cement: cementConfig,
  water: waterConfig,
  technology: technologyConfig,
  finance: financeConfig,
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

export function InteractivePlatform({ slug, accent: accentOverride }: InteractivePlatformProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [selectedHub, setSelectedHub] = useState<number | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [irrigationState, setIrrigationState] = useState<boolean[]>([true, false, true, false, true, false]);
  const [showSidebarDetails, setShowSidebarDetails] = useState(false);

  const toggleIrrigation = useCallback((zone: number) => {
    setIrrigationState(prev => {
      const next = [...prev];
      next[zone] = !next[zone];
      return next;
    });
  }, []);

  // Reset state when slug changes — using key-based approach on the parent

  const config = configs[slug];
  if (!config) return null;

  const accent = accentOverride || config.accent;

  // Determine unique styles per subsidiary
  const isIntelligence = slug === 'intelligence';
  const isAgriculture = slug === 'agriculture';
  const isEnergy = slug === 'energy';
  const isMining = slug === 'mining';
  const isCement = slug === 'cement';
  const isWater = slug === 'water';
  const isTech = slug === 'technology';
  const isFinance = slug === 'finance';

  const borderRadius = isMining ? 'rounded-none' : isCement || isFinance ? 'rounded-sm' : 'rounded-xl';
  const monoFont = (isIntelligence || isTech || isFinance) ? 'font-mono' : '';

  return (
    <section className={`py-12 md:py-20 lg:py-28 bg-gradient-to-b ${config.bgGradient} max-w-full overflow-hidden`}>
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-2.5 py-1 ${isMining ? 'rounded-none' : 'rounded'} text-[10px] sm:text-[9px] font-bold tracking-[0.2em] uppercase ${monoFont}`}
              style={{ backgroundColor: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
            >
              Platform
            </span>
            <span className={`text-[10px] text-white/20 ${monoFont}`}>v{config.platformVersion}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-white tracking-tight ${monoFont}`}>
            {config.platformName}
          </h2>
          <p className="text-sm text-white/40 mt-2">Interactive platform preview — explore the interface</p>
        </motion.div>

        {/* Dashboard Shell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`bg-[#0D0D0D] border border-[rgba(255,255,255,0.08)] ${borderRadius} overflow-hidden shadow-2xl max-w-full`}
        >
          {/* Top Bar with Traffic Lights */}
          <div className={`px-3 md:px-4 py-2.5 md:py-3 border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]`}>
            <div className="flex items-center justify-between mb-2 md:mb-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className={`text-[10px] text-white/30 ${monoFont} truncate max-w-[180px]`}>{config.platformName} — v{config.platformVersion}</span>
              </div>
              {/* Desktop tabs */}
              <div className="hidden md:flex items-center gap-1.5">
                {config.headerTabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-1.5 text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase ${isMining ? 'rounded-none' : 'rounded'} transition-all duration-200 ${
                      i === activeTab
                        ? 'bg-white/10 text-white'
                        : 'text-white/25 hover:text-white/50'
                    } ${monoFont}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile tabs — scrollable */}
            <div className="flex md:hidden items-center gap-1 overflow-x-auto flex-nowrap -mx-1 px-1 pb-0.5" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {config.headerTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-2.5 py-1.5 text-[10px] sm:text-[9px] font-bold tracking-[0.1em] uppercase whitespace-nowrap ${isMining ? 'rounded-none' : 'rounded'} transition-all duration-200 ${
                    i === activeTab
                      ? 'bg-white/10 text-white'
                      : 'text-white/25 hover:text-white/50'
                  } ${monoFont}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.04)]">
            {config.metricCards.map((card, i) => (
              <motion.div
                key={card.id}
                id={card.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[#0D0D0D] p-3 md:p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {card.icon && <span style={{ color: `${accent}60` }}>{card.icon}</span>}
                  <p className={`text-[10px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white/25`}>{card.label}</p>
                </div>
                <p className={`text-base md:text-lg lg:text-xl font-bold text-white ${monoFont} truncate`}>{card.value}</p>
                {card.change && (
                  <p className={`text-[10px] mt-1 ${card.changeUp ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
                    {card.change}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row">
            {/* Sidebar — horizontal scrollable pills on mobile, vertical on desktop */}
            <div className={`w-full md:w-48 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.04)] ${isIntelligence ? 'bg-[#0A0F1E]/50' : isAgriculture ? 'bg-[#0A120A]/50' : isEnergy ? 'bg-[#0D0A05]/50' : isMining ? 'bg-[#0D0F14]/50' : isCement ? 'bg-[#0D0802]/50' : isWater ? 'bg-[#030D14]/50' : isTech ? 'bg-[#0A0D1A]/50' : isFinance ? 'bg-[#0A0A12]/50' : 'bg-[#0A0A0A]/50'}`}>
              {/* Mobile: icon-only sidebar with horizontal scroll */}
              <nav className="md:hidden py-2 px-2 flex items-center gap-1 overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {config.sidebar.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => { setActiveSidebar(i); setSelectedHub(null); setSelectedPlot(null); }}
                    title={item.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 snap-start ${
                      i === activeSidebar
                        ? 'text-white bg-[rgba(255,255,255,0.08)]'
                        : 'text-white/35 hover:text-white/60 hover:bg-[rgba(255,255,255,0.03)]'
                    }`}
                    style={i === activeSidebar ? { borderBottom: `2px solid ${accent}` } : {}}
                  >
                    <span style={{ color: i === activeSidebar ? accent : 'rgba(255,255,255,0.3)' }}>{item.icon}</span>
                  </button>
                ))}
              </nav>
              {/* Desktop: vertical sidebar */}
              <nav className="hidden md:block py-2">
                {config.sidebar.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => { setActiveSidebar(i); setSelectedHub(null); setSelectedPlot(null); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] transition-all duration-200 ${
                      i === activeSidebar
                        ? 'text-white bg-[rgba(255,255,255,0.04)] border-r-2'
                        : 'text-white/35 hover:text-white/60 hover:bg-[rgba(255,255,255,0.02)]'
                    }`}
                    style={i === activeSidebar ? { borderRightColor: accent } : {}}
                  >
                    <span style={{ color: i === activeSidebar ? accent : 'rgba(255,255,255,0.3)' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Panel */}
            <div className={`flex-1 p-3 md:p-5 min-w-0 overflow-x-hidden ${isIntelligence ? 'bg-[#0A0F1E]' : isAgriculture ? 'bg-[#0A120A]' : isEnergy ? 'bg-[#0D0A05]' : isMining ? 'bg-[#0D0F14]' : isCement ? 'bg-[#0D0802]' : isWater ? 'bg-[#030D14]' : isTech ? 'bg-[#0A0D1A]' : isFinance ? 'bg-[#0A0A12]' : ''}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 min-w-0">
                <div className="lg:col-span-2 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${activeSidebar}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {config.renderMain(accent, activeTab, activeSidebar, selectedHub, selectedPlot, toggleIrrigation, irrigationState)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Sidebar details — hidden on mobile by default, toggleable */}
                <div className={`${showSidebarDetails ? 'block' : 'hidden'} lg:block`}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${activeSidebar}-sidebar`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {config.renderSidebar(accent, activeTab, activeSidebar)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Mobile toggle for sidebar details */}
                <button
                  className="lg:hidden w-full py-2.5 text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 hover:text-white/50 border border-[rgba(255,255,255,0.06)] rounded-md transition-colors cursor-pointer"
                  onClick={() => setShowSidebarDetails(!showSidebarDetails)}
                >
                  {showSidebarDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className={`flex items-center justify-between px-3 md:px-4 py-2 border-t border-[rgba(255,255,255,0.04)] ${isIntelligence ? 'bg-[#0A0F1E]' : isAgriculture ? 'bg-[#0A120A]' : isEnergy ? 'bg-[#0D0A05]' : isMining ? 'bg-[#0D0F14]' : isCement ? 'bg-[#0D0802]' : isWater ? 'bg-[#030D14]' : isTech ? 'bg-[#0A0D1A]' : isFinance ? 'bg-[#0A0A12]' : 'bg-[#0A0A0A]'}`}>
            <div className="flex items-center gap-2 md:gap-3 min-w-0 overflow-hidden">
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className={`text-[10px] sm:text-[8px] text-white/25 ${monoFont} hidden sm:inline`}>ALL SYSTEMS NOMINAL</span>
              </span>
              <span className="text-[10px] sm:text-[8px] text-white/15 hidden sm:inline">|</span>
              <span className={`text-[10px] sm:text-[8px] text-white/20 ${monoFont} truncate`}>{config.statusBarText}</span>
            </div>
            <span className={`text-[10px] sm:text-[8px] text-white/15 ${monoFont} flex-shrink-0 ml-2`}>v{config.platformVersion} — LIVE</span>
          </div>
        </motion.div>

        {/* Guided Tour */}
        <GuidedTour
          steps={config.tourSteps}
          storageKey={`harch-tour-${slug}`}
          accent={accent}
        />
      </div>
    </section>
  );
}

// Helper filter icon for mining processing pipeline (not exported from lucide)
function Filter({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
