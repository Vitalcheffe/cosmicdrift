'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GuidedTour, type TourStep } from '@/components/GuidedTour';

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE PLATFORM — Palantir-style dashboard module
   Each subsidiary gets a real software-like interface
   with guided tour, animated metrics, and interactive elements
   ═══════════════════════════════════════════════════════════════ */

// ─── Dashboard Config ───
interface DashboardConfig {
  platformName: string;
  platformVersion: string;
  accent: string;
  sidebar: { icon: string; label: string; active?: boolean }[];
  headerTabs: string[];
  tourSteps: TourStep[];
  renderMain: (accent: string) => React.ReactNode;
  renderSidebar: (accent: string) => React.ReactNode;
  metricCards: { id: string; label: string; value: string; change?: string; changeUp?: boolean }[];
  backgroundImage?: string;
}

// ─── Per-Subsidiary Configs ───
const configs: Record<string, DashboardConfig> = {
  intelligence: {
    platformName: 'HarchOS Console',
    platformVersion: '0.1',
    accent: '#8B9DAF',
    sidebar: [
      { icon: '⬡', label: 'Cluster Overview', active: true },
      { icon: '◈', label: 'GPU Status' },
      { icon: '◉', label: 'Carbon Routing' },
      { icon: '◫', label: 'Workloads' },
      { icon: '⊡', label: 'Data Residency' },
      { icon: '⊞', label: 'API Playground' },
    ],
    headerTabs: ['Overview', 'Hubs', 'Carbon', 'Workloads'],
    tourSteps: [
      { targetId: 'intel-metric-gpus', label: 'A', title: 'GPU Cluster Status', description: '1,798 carbon-optimized GPUs across 5 Moroccan hubs. Carbon-aware scheduling routes workloads to the greenest hub in real-time.', position: 'bottom' },
      { targetId: 'intel-carbon-route', label: 'B', title: 'Carbon-Aware Routing', description: 'Our scheduler automatically selects the hub with the lowest carbon intensity. Average: ~47 gCO2/kWh — 89% below industry standard.', position: 'bottom' },
      { targetId: 'intel-hub-map', label: 'C', title: 'Hub Network', description: '5 sovereign hubs across Morocco. Dakhla hub connects directly to Europe via submarine cable. All data stays under Moroccan jurisdiction.', position: 'top' },
    ],
    metricCards: [
      { id: 'intel-metric-gpus', label: 'Active GPUs', value: '1,798', change: '+120', changeUp: true },
      { id: 'intel-carbon-route', label: 'Avg Carbon', value: '~47 gCO2/kWh', change: '-12%', changeUp: true },
      { id: 'intel-metric-renew', label: 'Renewable', value: '81.5%', change: '+3.2%', changeUp: true },
      { id: 'intel-metric-uptime', label: 'Uptime', value: '99.97%', change: '+0.02%', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="intel-hub-map" className="space-y-4">
        {/* Hub Status Grid */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { name: 'Casablanca', gpus: 384, load: 78, carbon: 42, status: 'online' },
            { name: 'Rabat', gpus: 256, load: 65, carbon: 38, status: 'online' },
            { name: 'Marrakech', gpus: 320, load: 82, carbon: 51, status: 'online' },
            { name: 'Tangier', gpus: 448, load: 71, carbon: 44, status: 'online' },
            { name: 'Dakhla', gpus: 390, load: 45, carbon: 35, status: 'staging' },
          ].map((hub) => (
            <div key={hub.name} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-white/70 group-hover:text-white transition-colors">{hub.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${hub.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
              <p className="text-lg font-bold text-white stat-mono">{hub.gpus}</p>
              <p className="text-[8px] text-white/25 uppercase tracking-wider mb-2">GPUs</p>
              <div className="space-y-1">
                <div className="flex justify-between text-[8px]">
                  <span className="text-white/30">Load</span>
                  <span className="text-white/50">{hub.load}%</span>
                </div>
                <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${hub.load}%` }} initial={{ width: 0 }} animate={{ width: `${hub.load}%` }} transition={{ duration: 1.2, delay: 0.3 }} />
                </div>
                <div className="flex justify-between text-[8px]">
                  <span className="text-white/30">CO2</span>
                  <span className="text-white/50">{hub.carbon}g</span>
                </div>
                <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${100 - (hub.carbon / 100) * 100}%` }} initial={{ width: 0 }} animate={{ width: `${100 - (hub.carbon / 100) * 100}%` }} transition={{ duration: 1.2, delay: 0.5 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Workload Table */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">Active Workloads</span>
            <span className="text-[9px] text-emerald-400/60 font-mono">12 running</span>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {[
              { name: 'LLM Training v3.1', type: 'Training', gpus: 128, hub: 'Casablanca', carbon: 'Optimal' },
              { name: 'Inference API — Production', type: 'Inference', gpus: 64, hub: 'Rabat', carbon: 'Low' },
              { name: 'Fine-tuning HarchGPT', type: 'Fine-tune', gpus: 256, hub: 'Tangier', carbon: 'Optimal' },
            ].map((wl) => (
              <div key={wl.name} className="px-4 py-2.5 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${wl.carbon === 'Optimal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="text-[11px] text-white/70">{wl.name}</span>
                </div>
                <div className="flex items-center gap-4 text-[9px] text-white/30">
                  <span>{wl.type}</span>
                  <span className="text-white/50 font-mono">{wl.gpus} GPU</span>
                  <span>{wl.hub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        {/* Carbon Intensity Chart */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Carbon Intensity</span>
          <div className="flex items-end gap-1 h-16">
            {[42, 38, 55, 44, 36, 48, 35, 51, 43, 37, 45, 39].map((v, i) => (
              <motion.div key={i} className="flex-1 rounded-sm" style={{ backgroundColor: v < 45 ? `${accent}60` : `${accent}25` }} initial={{ height: 0 }} animate={{ height: `${(v / 60) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[7px] text-white/20">
            <span>00:00</span><span>12:00</span><span>Now</span>
          </div>
        </div>
        {/* Renewable Mix */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Energy Mix</span>
          {[
            { source: 'Solar', pct: 42, color: '#F59E0B' },
            { source: 'Wind', pct: 35, color: '#3B82F6' },
            { source: 'Hydro', pct: 4.5, color: '#06B6D4' },
            { source: 'Grid', pct: 18.5, color: '#6B7280' },
          ].map((e) => (
            <div key={e.source} className="mb-2">
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-white/40">{e.source}</span>
                <span className="text-white/60 font-mono">{e.pct}%</span>
              </div>
              <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: e.color, width: `${e.pct}%` }} initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 1, delay: 0.2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/intelligence-rack.jpg',
  },

  agriculture: {
    platformName: 'HarchAgri Platform',
    platformVersion: '0.7',
    accent: '#4A7B5F',
    sidebar: [
      { icon: '⬡', label: 'Farm Overview', active: true },
      { icon: '◈', label: 'Crop Health' },
      { icon: '◉', label: 'Irrigation' },
      { icon: '◫', label: 'Weather' },
      { icon: '⊡', label: 'IoT Sensors' },
      { icon: '⊞', label: 'Market Prices' },
    ],
    headerTabs: ['Overview', 'Plots', 'Sensors', 'Analytics'],
    tourSteps: [
      { targetId: 'agri-metric-health', label: 'A', title: 'Crop Health Monitor', description: 'Real-time satellite and IoT data tracks crop health across all plots. Green = healthy, yellow = needs attention, red = action required.', position: 'bottom' },
      { targetId: 'agri-irrigation', label: 'B', title: 'Smart Irrigation Control', description: 'AI-optimized irrigation reduces water usage by 40% while increasing yield. Soil moisture sensors trigger automated watering cycles.', position: 'bottom' },
      { targetId: 'agri-farm-map', label: 'C', title: 'Farm Intelligence Map', description: 'Interactive map showing all plots with real-time health indicators. Click any plot for detailed analytics and historical data.', position: 'top' },
    ],
    metricCards: [
      { id: 'agri-metric-health', label: 'Crop Health', value: '94.2%', change: '+2.1%', changeUp: true },
      { id: 'agri-irrigation', label: 'Water Saved', value: '38.5%', change: '+5.3%', changeUp: true },
      { id: 'agri-metric-yield', label: 'Yield Forecast', value: '12.4T/ha', change: '+8%', changeUp: true },
      { id: 'agri-metric-iot', label: 'IoT Sensors', value: '2,847', change: '+340', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="agri-farm-map" className="space-y-4">
        {/* Farm Map - Interactive Plot Grid */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">Farm Intelligence Map</span>
            <div className="flex items-center gap-3 text-[8px]">
              {[
                { color: '#4A7B5F', label: 'Healthy' },
                { color: '#EAB308', label: 'Warning' },
                { color: '#EF4444', label: 'Critical' },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1 text-white/30">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l.color }} /> {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: 32 }, (_, i) => {
                const health = [0.95, 0.88, 0.72, 0.93, 0.45, 0.91, 0.85, 0.78, 0.92, 0.68, 0.89, 0.94, 0.35, 0.87, 0.82, 0.91, 0.96, 0.75, 0.88, 0.93, 0.42, 0.86, 0.79, 0.95, 0.90, 0.71, 0.84, 0.92, 0.38, 0.83, 0.77, 0.94][i];
                const color = health > 0.7 ? '#4A7B5F' : health > 0.4 ? '#EAB308' : '#EF4444';
                const crop = ['Wheat', 'Corn', 'Soy', 'Rice', 'Cassava', 'Sorghum'][i % 6];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="aspect-square rounded cursor-pointer hover:scale-110 transition-transform relative group"
                    style={{ backgroundColor: `${color}30`, border: `1px solid ${color}40` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[7px] text-white/40 group-hover:text-white/80 transition-colors">{crop.slice(0, 2)}</span>
                    </div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <p className="text-[9px] text-white font-bold">{crop} — Plot {i + 1}</p>
                      <p className="text-[8px] text-white/40">{Math.round(health * 100)}% health</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        {/* IoT Sensor Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { type: 'Soil Moisture', value: '67%', status: 'optimal', icon: '💧' },
            { type: 'Temperature', value: '28°C', status: 'normal', icon: '🌡' },
            { type: 'Humidity', value: '45%', status: 'low', icon: '🌫' },
          ].map((sensor) => (
            <div key={sensor.type} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-white/25 uppercase tracking-wider">{sensor.type}</span>
                <span className={`text-[7px] font-bold uppercase tracking-wider ${sensor.status === 'optimal' ? 'text-emerald-400/60' : sensor.status === 'low' ? 'text-amber-400/60' : 'text-white/30'}`}>{sensor.status}</span>
              </div>
              <p className="text-xl font-bold text-white stat-mono">{sensor.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        {/* Weather Widget */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Weather — Casablanca</span>
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-light text-white">28°</span>
            <div className="text-right">
              <p className="text-[10px] text-white/40">Partly Cloudy</p>
              <p className="text-[9px] text-white/25">Humidity 45%</p>
            </div>
          </div>
          <div className="flex justify-between text-[9px] text-white/30">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
              <span key={d} className="text-center">
                <span className="block">{d}</span>
                <span className="block text-white/50 font-mono">{26 + i}°</span>
              </span>
            ))}
          </div>
        </div>
        {/* Market Prices */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Market Prices</span>
          {[
            { crop: 'Wheat', price: '$285/T', change: '+2.3%', up: true },
            { crop: 'Corn', price: '$198/T', change: '-1.1%', up: false },
            { crop: 'Soy', price: '$412/T', change: '+4.7%', up: true },
          ].map((m) => (
            <div key={m.crop} className="flex items-center justify-between py-1.5">
              <span className="text-[10px] text-white/50">{m.crop}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/70 font-mono">{m.price}</span>
                <span className={`text-[9px] font-mono ${m.up ? 'text-emerald-400/60' : 'text-red-400/60'}`}>{m.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/agri-vertical-farm.jpg',
  },

  energy: {
    platformName: 'HarchEnergy Grid',
    platformVersion: '0.3',
    accent: '#6B9F6B',
    sidebar: [
      { icon: '⬡', label: 'Grid Overview', active: true },
      { icon: '◈', label: 'Solar Farms' },
      { icon: '◉', label: 'Wind Parks' },
      { icon: '◫', label: 'Green H2' },
      { icon: '⊡', label: 'Battery Storage' },
      { icon: '⊞', label: 'Grid Status' },
    ],
    headerTabs: ['Overview', 'Generation', 'Storage', 'Export'],
    tourSteps: [
      { targetId: 'energy-metric-gen', label: 'A', title: 'Power Generation', description: '2GW+ renewable pipeline across Morocco and the Sahel. Solar, wind, and green hydrogen producing zero-carbon electricity 24/7.', position: 'bottom' },
      { targetId: 'energy-h2', label: 'B', title: 'Green Hydrogen Output', description: 'Hydrogen electrolysis powered by surplus solar. Production capacity: 50kT/yr for export to European markets via pipeline.', position: 'bottom' },
      { targetId: 'energy-grid-map', label: 'C', title: 'Grid Intelligence', description: 'Real-time grid monitoring with AI-optimized load balancing. Prevents blackouts and maximizes renewable utilization across all zones.', position: 'top' },
    ],
    metricCards: [
      { id: 'energy-metric-gen', label: 'Generation', value: '847 MW', change: '+12%', changeUp: true },
      { id: 'energy-h2', label: 'Green H2', value: '12.3kT/yr', change: '+8%', changeUp: true },
      { id: 'energy-metric-capacity', label: 'Pipeline', value: '2.1 GW', change: '+400MW', changeUp: true },
      { id: 'energy-metric-grid', label: 'Grid Stability', value: '99.8%', change: '+0.1%', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="energy-grid-map" className="space-y-4">
        {/* Generation Sites */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Ouarzazate Solar', type: 'Solar', output: '580 MW', capacity: '80%', status: 'online' },
            { name: 'Tarfaya Wind', type: 'Wind', output: '320 MW', capacity: '72%', status: 'online' },
            { name: 'Dakhla H2', type: 'Hydrogen', output: '45 MW equiv', capacity: '35%', status: 'staging' },
            { name: 'Essaouira Wind', type: 'Wind', output: '180 MW', capacity: '65%', status: 'online' },
          ].map((site) => (
            <div key={site.name} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-white/50">{site.type}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${site.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
              <p className="text-[11px] text-white/70 mb-1">{site.name}</p>
              <p className="text-lg font-bold text-white stat-mono">{site.output}</p>
              <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full mt-2 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: accent }} initial={{ width: 0 }} animate={{ width: `${site.capacity}%` }} transition={{ duration: 1, delay: 0.3 }} />
              </div>
            </div>
          ))}
        </div>
        {/* Grid Load Balance */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">Grid Load Balance</span>
            <span className="text-[9px] text-emerald-400/60 font-mono">BALANCED</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {Array.from({ length: 24 }, (_, i) => {
              const solar = Math.sin((i - 6) / 12 * Math.PI) * 60;
              const wind = [28, 35, 42, 38, 22, 45, 32, 28, 35, 40, 25, 30, 38, 42, 35, 28, 22, 40, 45, 32, 25, 38, 30, 35][i];
              const demand = 40 + Math.sin((i - 2) / 24 * Math.PI * 2) * 20;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end gap-px">
                  <motion.div className="w-full rounded-t-sm" style={{ backgroundColor: `${accent}40` }} initial={{ height: 0 }} animate={{ height: `${Math.max(0, solar)}%` }} transition={{ duration: 0.5, delay: i * 0.03 }} />
                  <motion.div className="w-full rounded-t-sm" style={{ backgroundColor: `${accent}20` }} initial={{ height: 0 }} animate={{ height: `${wind}%` }} transition={{ duration: 0.5, delay: i * 0.03 + 0.1 }} />
                  <div className="w-full h-px" style={{ backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative', top: `-${demand}%` }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[7px] text-white/20">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Energy Mix</span>
          {[
            { source: 'Solar', pct: 52, color: '#F59E0B' },
            { source: 'Wind', pct: 35, color: '#3B82F6' },
            { source: 'Green H2', pct: 8, color: '#22C55E' },
            { source: 'Grid', pct: 5, color: '#6B7280' },
          ].map((e) => (
            <div key={e.source} className="mb-2">
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-white/40">{e.source}</span>
                <span className="text-white/60 font-mono">{e.pct}%</span>
              </div>
              <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: e.color, width: `${e.pct}%` }} initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 1, delay: 0.2 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Battery Storage</span>
          <p className="text-2xl font-bold text-white stat-mono mb-1">73%</p>
          <p className="text-[9px] text-white/30">438 MWh / 600 MWh</p>
          <div className="h-[3px] bg-[rgba(255,255,255,0.06)] rounded-full mt-2 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: accent }} initial={{ width: 0 }} animate={{ width: '73%' }} transition={{ duration: 1.5 }} />
          </div>
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/energy-solar-farm.jpg',
  },

  mining: {
    platformName: 'HarchMine Ops',
    platformVersion: '0.5',
    accent: '#B8965A',
    sidebar: [
      { icon: '⬡', label: 'Operations', active: true },
      { icon: '◈', label: 'Geological Map' },
      { icon: '◉', label: 'Extraction' },
      { icon: '◫', label: 'Processing' },
      { icon: '⊡', label: 'Inventory' },
      { icon: '⊞', label: 'Safety' },
    ],
    headerTabs: ['Overview', 'Deposits', 'Processing', 'Export'],
    tourSteps: [
      { targetId: 'mining-metric-output', label: 'A', title: 'Extraction Output', description: 'Strategic mineral extraction — phosphates, cobalt, and rare earths processed in-country. Capturing the full value chain from mine to market.', position: 'bottom' },
      { targetId: 'mining-geo', label: 'B', title: 'Geological Survey', description: 'AI-powered geological mapping identifies new deposits with 94% accuracy. In-country processing eliminates raw mineral export dependency.', position: 'bottom' },
      { targetId: 'mining-map', label: 'C', title: 'Operations Map', description: 'Real-time monitoring of all extraction sites, processing plants, and logistics chains. Full traceability from mine to end product.', position: 'top' },
    ],
    metricCards: [
      { id: 'mining-metric-output', label: 'Output', value: '1.2M T/yr', change: '+15%', changeUp: true },
      { id: 'mining-geo', label: 'Deposit Accuracy', value: '94.2%', change: '+3.1%', changeUp: true },
      { id: 'mining-metric-value', label: 'Value Capture', value: '87%', change: '+12%', changeUp: true },
      { id: 'mining-metric-safety', label: 'Safety Score', value: '99.1%', change: '+0.4%', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="mining-map" className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { mineral: 'Phosphates', reserve: '75% global', output: '850kT/yr', site: 'Khouribga' },
            { mineral: 'Cobalt', reserve: 'Strategic', output: '12kT/yr', site: 'DRC Partner' },
            { mineral: 'Rare Earths', reserve: 'Exploration', output: 'Phase 1', site: 'Atlas Mountains' },
          ].map((m) => (
            <div key={m.mineral} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
              <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25">{m.mineral}</span>
              <p className="text-lg font-bold text-white stat-mono mt-1">{m.output}</p>
              <p className="text-[10px] text-white/40 mt-1">{m.site}</p>
              <div className="mt-2 inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                {m.reserve}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mb-3 block">Processing Pipeline</span>
          <div className="flex items-center gap-2">
            {['Extraction', 'Crushing', 'Grinding', 'Separation', 'Refining', 'Export'].map((stage, i) => (
              <div key={stage} className="flex items-center gap-2 flex-1">
                <div className="flex-1 bg-[rgba(255,255,255,0.04)] rounded p-2 text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer">
                  <p className="text-[9px] text-white/50">{stage}</p>
                  <p className="text-[10px] text-white/70 font-mono mt-0.5">{[98, 96, 94, 91, 88, 85][i]}%</p>
                </div>
                {i < 5 && <span className="text-white/10 text-[10px]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Safety Metrics</span>
          {[
            { metric: 'Incidents (YTD)', value: '0' },
            { metric: 'Compliance', value: '100%' },
            { metric: 'Air Quality', value: '98/100' },
            { metric: 'Water Quality', value: '97/100' },
          ].map((s) => (
            <div key={s.metric} className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-0">
              <span className="text-[10px] text-white/35">{s.metric}</span>
              <span className="text-[10px] text-white/70 font-mono">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Commodity Prices</span>
          {[
            { name: 'Phosphate Rock', price: '$135/T', ch: '+3.2%' },
            { name: 'Cobalt', price: '$33,500/T', ch: '-1.8%' },
            { name: 'Neodymium', price: '$85/kg', ch: '+7.1%' },
          ].map((c) => (
            <div key={c.name} className="flex justify-between py-1.5">
              <span className="text-[10px] text-white/35">{c.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/60 font-mono">{c.price}</span>
                <span className={`text-[9px] ${c.ch.startsWith('+') ? 'text-emerald-400/60' : 'text-red-400/60'}`}>{c.ch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/mining-smelter.jpg',
  },

  cement: {
    platformName: 'HarchCement Plant',
    platformVersion: '0.2',
    accent: '#B8965A',
    sidebar: [
      { icon: '⬡', label: 'Plant Overview', active: true },
      { icon: '◈', label: 'Production Line' },
      { icon: '◉', label: 'Quality Lab' },
      { icon: '◫', label: 'Supply Chain' },
      { icon: '⊡', label: 'Logistics' },
      { icon: '⊞', label: 'Environmental' },
    ],
    headerTabs: ['Overview', 'Production', 'Quality', 'Delivery'],
    tourSteps: [
      { targetId: 'cement-metric-prod', label: 'A', title: 'Production Output', description: '500kT/yr cement production capacity. Vertically integrated from quarry to delivery, serving West Africa\'s construction boom.', position: 'bottom' },
      { targetId: 'cement-quality', label: 'B', title: 'Quality Control', description: 'Automated quality testing at every stage — raw material, clinker, and finished product. ISO 9001 certified processes.', position: 'bottom' },
      { targetId: 'cement-supply', label: 'C', title: 'Supply Chain Tracker', description: 'End-to-end visibility from raw material extraction to customer delivery. Real-time fleet tracking and inventory management.', position: 'top' },
    ],
    metricCards: [
      { id: 'cement-metric-prod', label: 'Production', value: '500kT/yr', change: '+18%', changeUp: true },
      { id: 'cement-quality', label: 'Quality Rate', value: '99.4%', change: '+0.2%', changeUp: true },
      { id: 'cement-metric-energy', label: 'Energy/GT', value: '3.2 GJ', change: '-8%', changeUp: true },
      { id: 'cement-metric-delivery', label: 'On-Time', value: '97.2%', change: '+1.5%', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="cement-supply" className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: 'Quarry', status: 'Active', output: '1,200 T/day', icon: '⛏' },
            { stage: 'Kiln', status: 'Running', output: '950 T/day', icon: '🔥' },
            { stage: 'Grinding', status: 'Running', output: '880 T/day', icon: '⚙' },
            { stage: 'Packaging', status: 'Running', output: '860 T/day', icon: '📦' },
          ].map((s) => (
            <div key={s.stage} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
              <span className="text-[14px] mb-1 block">{s.icon}</span>
              <p className="text-[10px] font-bold text-white/50 mb-1">{s.stage}</p>
              <p className="text-sm font-bold text-white stat-mono">{s.output}</p>
              <span className="text-[8px] text-emerald-400/60 uppercase tracking-wider">{s.status}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mb-3 block">Delivery Fleet</span>
          <div className="space-y-2">
            {[
              { route: 'Banjul → Serekunda', status: 'In Transit', eta: '2h 30m', load: '42T' },
              { route: 'Banjul → Brikama', status: 'Loading', eta: '—', load: '38T' },
              { route: 'Banjul → Farafenni', status: 'Scheduled', eta: '6h 15m', load: '45T' },
            ].map((d) => (
              <div key={d.route} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)] last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'In Transit' ? 'bg-emerald-400' : d.status === 'Loading' ? 'bg-amber-400' : 'bg-white/20'}`} />
                  <span className="text-[10px] text-white/60">{d.route}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-white/30">
                  <span>{d.load}</span>
                  <span className="text-white/50">ETA {d.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Quality Metrics</span>
          {[
            { test: 'Compressive Strength', value: '42.5 MPa', pass: true },
            { test: 'Setting Time', value: '45 min', pass: true },
            { test: 'Fineness', value: '350 m²/kg', pass: true },
            { test: 'Soundness', value: '0.8 mm', pass: true },
          ].map((q) => (
            <div key={q.test} className="flex items-center justify-between py-1.5">
              <span className="text-[10px] text-white/35">{q.test}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/60 font-mono">{q.value}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/cement-factory.jpg',
  },

  water: {
    platformName: 'HarchWater Network',
    platformVersion: '0.8',
    accent: '#6888A8',
    sidebar: [
      { icon: '⬡', label: 'Network Overview', active: true },
      { icon: '◈', label: 'Desalination' },
      { icon: '◉', label: 'Distribution' },
      { icon: '◫', label: 'Quality' },
      { icon: '⊡', label: 'Storage' },
      { icon: '⊞', label: 'Analytics' },
    ],
    headerTabs: ['Overview', 'Desal', 'Quality', 'Forecast'],
    tourSteps: [
      { targetId: 'water-metric-desal', label: 'A', title: 'Desalination Capacity', description: '200M m³/yr desalination with AI-optimized distribution. Solving Africa\'s water security crisis with sovereign infrastructure.', position: 'bottom' },
      { targetId: 'water-quality', label: 'B', title: 'Water Quality Monitor', description: 'Real-time quality monitoring across all distribution points. Automated alerts when parameters deviate from WHO standards.', position: 'bottom' },
      { targetId: 'water-network', label: 'C', title: 'Distribution Network', description: 'AI-optimized flow routing minimizes waste and maximizes coverage. Pressure monitoring prevents pipe bursts and leaks.', position: 'top' },
    ],
    metricCards: [
      { id: 'water-metric-desal', label: 'Desal Output', value: '200M m³/yr', change: '+22%', changeUp: true },
      { id: 'water-quality', label: 'Quality Score', value: '99.7%', change: '+0.3%', changeUp: true },
      { id: 'water-metric-loss', label: 'Loss Rate', value: '8.2%', change: '-3.1%', changeUp: true },
      { id: 'water-metric-coverage', label: 'Coverage', value: '2.4M people', change: '+340K', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="water-network" className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { plant: 'Casablanca Desal', output: '80M m³/yr', quality: '99.8%', status: 'online' },
            { plant: 'Dakhla Desal', output: '60M m³/yr', quality: '99.6%', status: 'online' },
            { plant: 'Agadir Desal', output: '60M m³/yr', quality: '99.7%', status: 'staging' },
          ].map((p) => (
            <div key={p.plant} className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-white/50">{p.plant}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
              <p className="text-lg font-bold text-white stat-mono">{p.output}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
                <span className="text-[9px] text-white/30">WHO Standard: {p.quality}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mb-3 block">Distribution Pressure Map</span>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }, (_, i) => {
              const pressure = [4.2, 4.5, 5.1, 4.8, 3.2, 4.9, 5.3, 4.1, 3.8, 4.7, 5.0, 4.3, 3.5, 4.6, 5.2, 4.4, 3.9, 4.8, 5.1, 4.2, 3.4, 4.5, 4.9, 4.0][i];
              const color = pressure > 5 ? '#22C55E' : pressure > 3.5 ? '#EAB308' : '#EF4444';
              return (
                <div key={i} className="bg-[rgba(255,255,255,0.02)] rounded p-2 text-center cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  <span className="text-[9px] text-white/30">Zone {i + 1}</span>
                  <p className="text-[11px] text-white/70 font-mono mt-0.5">{pressure.toFixed(1)} bar</p>
                  <span className="inline-block w-1 h-1 rounded-full mt-1" style={{ backgroundColor: color }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">Quality Parameters</span>
          {[
            { param: 'pH Level', value: '7.2', status: 'optimal' },
            { param: 'Turbidity', value: '0.3 NTU', status: 'optimal' },
            { param: 'TDS', value: '280 mg/L', status: 'good' },
            { param: 'Chlorine', value: '0.4 mg/L', status: 'optimal' },
          ].map((q) => (
            <div key={q.param} className="flex items-center justify-between py-1.5">
              <span className="text-[10px] text-white/35">{q.param}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/60 font-mono">{q.value}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${q.status === 'optimal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Reservoir Levels</span>
          <p className="text-2xl font-bold text-white stat-mono mb-1">78%</p>
          <p className="text-[9px] text-white/30">156K m³ / 200K m³</p>
          <div className="h-[3px] bg-[rgba(255,255,255,0.06)] rounded-full mt-2 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: accent }} initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.5 }} />
          </div>
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/water-treatment.jpg',
  },

  technology: {
    platformName: 'HarchTech DevPortal',
    platformVersion: '0.4',
    accent: '#8B9DAF',
    sidebar: [
      { icon: '⬡', label: 'Dashboard', active: true },
      { icon: '◈', label: 'API Health' },
      { icon: '◉', label: 'Deployments' },
      { icon: '◫', label: 'Monitoring' },
      { icon: '⊡', label: 'SDK Metrics' },
      { icon: '⊞', label: 'Security' },
    ],
    headerTabs: ['Overview', 'APIs', 'Deploys', 'Security'],
    tourSteps: [
      { targetId: 'tech-metric-api', label: 'A', title: 'API Performance', description: 'Sub-50ms latency across all endpoints. 99.99% uptime SLA with automatic failover and carbon-aware routing.', position: 'bottom' },
      { targetId: 'tech-deploy', label: 'B', title: 'Deployment Pipeline', description: 'CI/CD pipeline with automated testing, security scanning, and carbon-aware deployment to the greenest available hub.', position: 'bottom' },
      { targetId: 'tech-console', label: 'C', title: 'Developer Console', description: 'Full API playground, SDK documentation, and real-time monitoring. Native Python and TypeScript SDKs.', position: 'top' },
    ],
    metricCards: [
      { id: 'tech-metric-api', label: 'API Latency', value: '23ms', change: '-5ms', changeUp: true },
      { id: 'tech-deploy', label: 'Deployments', value: '1,847', change: '+342', changeUp: true },
      { id: 'tech-metric-uptime', label: 'Uptime', value: '99.99%', change: '+0.01%', changeUp: true },
      { id: 'tech-console', label: 'SDK Downloads', value: '14.2K', change: '+28%', changeUp: true },
    ],
    renderMain: (accent) => (
      <div id="tech-console" className="space-y-4">
        {/* API Endpoints */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">API Endpoints</span>
            <span className="text-[9px] text-emerald-400/60 font-mono">ALL HEALTHY</span>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {[
              { method: 'GET', path: '/v1/carbon/intensity', latency: '12ms', status: '200' },
              { method: 'POST', path: '/v1/workloads/deploy', latency: '34ms', status: '200' },
              { method: 'GET', path: '/v1/hubs/status', latency: '18ms', status: '200' },
              { method: 'POST', path: '/v1/scheduler/optimize', latency: '45ms', status: '200' },
            ].map((ep) => (
              <div key={ep.path} className="px-4 py-2.5 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${ep.method === 'GET' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'}`}>{ep.method}</span>
                  <span className="text-[11px] text-white/60 font-mono">{ep.path}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px]">
                  <span className="text-white/30 font-mono">{ep.latency}</span>
                  <span className="text-emerald-400/50 font-mono">{ep.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Deployments */}
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mb-3 block">Recent Deployments</span>
          <div className="space-y-2">
            {[
              { app: 'harchos-api', version: 'v2.3.1', hub: 'Casablanca', carbon: 'Optimal', time: '2m ago' },
              { app: 'scheduler-service', version: 'v1.8.0', hub: 'Rabat', carbon: 'Low', time: '14m ago' },
              { app: 'carbon-monitor', version: 'v3.1.4', hub: 'Tangier', carbon: 'Optimal', time: '1h ago' },
            ].map((d) => (
              <div key={d.app} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-emerald-400/60">✓</span>
                  <span className="text-[10px] text-white/60 font-mono">{d.app}</span>
                  <span className="text-[9px] text-white/25">{d.version}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-white/25">
                  <span>{d.hub}</span>
                  <span className={d.carbon === 'Optimal' ? 'text-emerald-400/50' : 'text-amber-400/50'}>{d.carbon}</span>
                  <span>{d.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    renderSidebar: (accent) => (
      <div className="space-y-4">
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-3 block">SDK Downloads</span>
          <div className="space-y-2">
            {[
              { lang: 'Python', pkg: 'harchos', downloads: '8.2K', trend: '+12%' },
              { lang: 'TypeScript', pkg: '@harchos/sdk', downloads: '4.8K', trend: '+28%' },
              { lang: 'Go', pkg: 'harchos-go', downloads: '1.2K', trend: '+45%' },
            ].map((s) => (
              <div key={s.lang} className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50">{s.lang}</span>
                  <span className="text-[9px] text-white/25 ml-1 font-mono">{s.pkg}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/60 font-mono">{s.downloads}</span>
                  <span className="text-[9px] text-emerald-400/60">{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2 block">Security Score</span>
          <p className="text-2xl font-bold text-white stat-mono">A+</p>
          <p className="text-[9px] text-white/30 mt-1">0 vulnerabilities • SOC 2 Type II</p>
        </div>
      </div>
    ),
    backgroundImage: '/images/sections/tech-cyber.jpg',
  },
};

// ─── Main Component ───
interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

export function InteractivePlatform({ slug, accent }: InteractivePlatformProps) {
  const config = configs[slug];
  if (!config) return null;

  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-space-mono)]" style={{ backgroundColor: `${config.accent}15`, color: config.accent, border: `1px solid ${config.accent}30` }}>
              Platform
            </span>
            <span className="text-[10px] text-white/20 font-[family-name:var(--font-space-mono)]">v{config.platformVersion}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
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
          className="bg-[#0D0D0D] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] text-white/30 font-[family-name:var(--font-space-mono)]">{config.platformName} — v{config.platformVersion}</span>
            </div>
            <div className="flex items-center gap-2">
              {config.headerTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-[0.1em] uppercase rounded transition-all duration-200 ${
                    i === activeTab
                      ? 'bg-white/10 text-white'
                      : 'text-white/25 hover:text-white/50'
                  }`}
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
                className="bg-[#0D0D0D] p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer"
              >
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/25 mb-1">{card.label}</p>
                <p className="text-xl font-bold text-white stat-mono">{card.value}</p>
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
            {/* Sidebar */}
            <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]/50">
              <nav className="py-2">
                {config.sidebar.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveSidebar(i)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] transition-all duration-200 ${
                      i === activeSidebar
                        ? 'text-white bg-[rgba(255,255,255,0.04)] border-r-2'
                        : 'text-white/35 hover:text-white/60 hover:bg-[rgba(255,255,255,0.02)]'
                    }`}
                    style={i === activeSidebar ? { borderRightColor: config.accent } : {}}
                  >
                    <span className="text-[12px] opacity-50">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Panel */}
            <div className="flex-1 p-4 md:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  {config.renderMain(config.accent)}
                </div>
                <div>
                  {config.renderSidebar(config.accent)}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] text-white/25 font-[family-name:var(--font-space-mono)]">ALL SYSTEMS NOMINAL</span>
              </span>
              <span className="text-[8px] text-white/15">|</span>
              <span className="text-[8px] text-white/20 font-[family-name:var(--font-space-mono)]">REGION: MOROCCO</span>
            </div>
            <span className="text-[8px] text-white/15 font-[family-name:var(--font-space-mono)]">v{config.platformVersion} — LIVE</span>
          </div>
        </motion.div>

        {/* Guided Tour */}
        <GuidedTour
          steps={config.tourSteps}
          storageKey={`harch-tour-${slug}`}
          accent={config.accent}
        />
      </div>
    </section>
  );
}
