'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Cpu, Database, Network, Headphones,
  Download, Calculator, CheckCircle2, TrendingDown, Zap,
  Shield, BarChart3, Info
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ─── ANIMATION HELPER ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── PRICING DATA ─── */
const gpuPrices: Record<string, number> = {
  A100: 0.35,
  H100: 0.50,
  MI300X: 0.45,
};

const cloudComparison: Record<string, { aws: number; gcp: number; azure: number }> = {
  A100: { aws: 0.90, gcp: 0.85, azure: 0.88 },
  H100: { aws: 1.20, gcp: 1.15, azure: 1.18 },
  MI300X: { aws: 1.05, gcp: 0.98, azure: 1.02 },
};

const storagePrices: Record<string, number> = {
  SSD: 0.02,
  NVMe: 0.04,
};

const supportPrices: Record<string, { monthly: number; label: string }> = {
  community: { monthly: 0, label: 'Community' },
  professional: { monthly: 500, label: 'Professional' },
  enterprise: { monthly: 2500, label: 'Enterprise' },
};

/* ─── MAIN COMPONENT ─── */
export default function CalculatorPageClient() {
  const [gpuType, setGpuType] = useState('H100');
  const [gpuCount, setGpuCount] = useState(8);
  const [gpuHours, setGpuHours] = useState(730);
  const [storageType, setStorageType] = useState('NVMe');
  const [storageCapacity, setStorageCapacity] = useState(2000);
  const [egressBandwidth, setEgressBandwidth] = useState(5);
  const [cdnEnabled, setCdnEnabled] = useState(false);
  const [supportTier, setSupportTier] = useState('community');

  const costs = useMemo(() => {
    const computeCost = gpuPrices[gpuType] * gpuCount * gpuHours;
    const storageCost = storagePrices[storageType] * storageCapacity;
    const networkCost = egressBandwidth * 0.05 * 730 + (cdnEnabled ? 50 : 0);
    const supportCost = supportPrices[supportTier].monthly;
    const totalMonthly = computeCost + storageCost + networkCost + supportCost;
    const totalAnnual = totalMonthly * 12;
    const annualWithDiscount = totalAnnual * 0.7;

    const awsCost = cloudComparison[gpuType].aws * gpuCount * gpuHours + storageCost * 1.4 + networkCost * 1.3 + (supportTier === 'enterprise' ? 5000 : supportTier === 'professional' ? 1000 : 0);
    const gcpCost = cloudComparison[gpuType].gcp * gpuCount * gpuHours + storageCost * 1.35 + networkCost * 1.25 + (supportTier === 'enterprise' ? 4500 : supportTier === 'professional' ? 900 : 0);
    const azureCost = cloudComparison[gpuType].azure * gpuCount * gpuHours + storageCost * 1.38 + networkCost * 1.28 + (supportTier === 'enterprise' ? 4800 : supportTier === 'professional' ? 950 : 0);

    return {
      computeCost,
      storageCost,
      networkCost,
      supportCost,
      totalMonthly,
      totalAnnual,
      annualWithDiscount,
      awsCost,
      gcpCost,
      azureCost,
      savingsVsAws: Math.round((1 - totalMonthly / awsCost) * 100),
      savingsVsGcp: Math.round((1 - totalMonthly / gcpCost) * 100),
      savingsVsAzure: Math.round((1 - totalMonthly / azureCost) * 100),
    };
  }, [gpuType, gpuCount, gpuHours, storageType, storageCapacity, egressBandwidth, cdnEnabled, supportTier]);

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-[13px] text-[#666666] hover:text-white transition-colors mb-8">
              <ArrowLeft size={14} /> Pricing
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="section-label mb-6 text-[#10B981]">Cost Calculator /0.6</p>
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6">
              Cost Calculator<span className="text-[#10B981]">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed">
              Configure your infrastructure and see real-time cost estimates. Compare against AWS, GCP, and Azure pricing.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CALCULATOR
          ═══════════════════════════════════════════ */}
      <section className="pb-28 md:pb-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ─── Left: Configuration ─── */}
              <div className="lg:col-span-2 space-y-6">

                {/* Compute */}
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.08)] flex items-center justify-center">
                      <Cpu size={20} className="text-[#06B6D4]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Compute</h3>
                  </div>

                  {/* GPU Type */}
                  <div className="mb-6">
                    <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] mb-3 block">GPU Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['A100', 'H100', 'MI300X'].map((gpu) => (
                        <button
                          key={gpu}
                          onClick={() => setGpuType(gpu)}
                          className={`px-4 py-3 rounded-lg text-[13px] font-semibold transition-all border ${
                            gpuType === gpu
                              ? 'bg-[rgba(6,182,212,0.08)] border-[rgba(6,182,212,0.3)] text-white'
                              : 'border-white/[0.06] text-[#999999] hover:border-white/12 hover:text-white'
                          }`}
                        >
                          <p className="font-bold">{gpu}</p>
                          <p className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)] mt-0.5">${gpuPrices[gpu]}/hr</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GPU Count */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)]">Number of GPUs</label>
                      <span className="text-[13px] text-[#06B6D4] font-[family-name:var(--font-space-mono)] stat-mono">{gpuCount}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4096}
                      step={1}
                      value={gpuCount}
                      onChange={(e) => setGpuCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#06B6D4]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">1</span>
                      <span className="text-[10px] text-[#666666]">4,096</span>
                    </div>
                  </div>

                  {/* Hours per Month */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)]">Hours / Month</label>
                      <span className="text-[13px] text-[#06B6D4] font-[family-name:var(--font-space-mono)] stat-mono">{gpuHours}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={730}
                      step={1}
                      value={gpuHours}
                      onChange={(e) => setGpuHours(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#06B6D4]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">1 hr</span>
                      <span className="text-[10px] text-[#666666]">730 hrs (24/7)</span>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.08)] flex items-center justify-center">
                      <Database size={20} className="text-[#8B5CF6]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Storage</h3>
                  </div>

                  {/* Storage Type */}
                  <div className="mb-6">
                    <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] mb-3 block">Storage Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['SSD', 'NVMe'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setStorageType(type)}
                          className={`px-4 py-3 rounded-lg text-[13px] font-semibold transition-all border ${
                            storageType === type
                              ? 'bg-[rgba(139,92,246,0.08)] border-[rgba(139,92,246,0.3)] text-white'
                              : 'border-white/[0.06] text-[#999999] hover:border-white/12 hover:text-white'
                          }`}
                        >
                          <p className="font-bold">{type}</p>
                          <p className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)] mt-0.5">${storagePrices[type]}/GB/mo</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capacity */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)]">Capacity (GB)</label>
                      <span className="text-[13px] text-[#8B5CF6] font-[family-name:var(--font-space-mono)] stat-mono">{storageCapacity >= 1000 ? `${(storageCapacity / 1000).toFixed(1)} TB` : `${storageCapacity} GB`}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50000}
                      step={10}
                      value={storageCapacity}
                      onChange={(e) => setStorageCapacity(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#8B5CF6]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">10 GB</span>
                      <span className="text-[10px] text-[#666666]">50 TB</span>
                    </div>
                  </div>
                </div>

                {/* Network */}
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(245,158,11,0.08)] flex items-center justify-center">
                      <Network size={20} className="text-[#F59E0B]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Network</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[12px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)]">Egress Bandwidth (Gbps)</label>
                      <span className="text-[13px] text-[#F59E0B] font-[family-name:var(--font-space-mono)] stat-mono">{egressBandwidth} Gbps</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={egressBandwidth}
                      onChange={(e) => setEgressBandwidth(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#F59E0B]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">0 Gbps</span>
                      <span className="text-[10px] text-[#666666]">100 Gbps</span>
                    </div>
                  </div>

                  {/* CDN Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/[0.04]">
                    <div>
                      <p className="text-[13px] font-semibold text-white">CDN</p>
                      <p className="text-[11px] text-[#666666]">Global content delivery — $50/month</p>
                    </div>
                    <button
                      onClick={() => setCdnEnabled(!cdnEnabled)}
                      className={`w-11 h-6 rounded-full transition-all relative ${cdnEnabled ? 'bg-[#10B981]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${cdnEnabled ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>

                {/* Support Tier */}
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                      <Headphones size={20} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Support</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(supportPrices).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSupportTier(key)}
                        className={`px-4 py-4 rounded-lg text-[13px] font-semibold transition-all border text-left ${
                          supportTier === key
                            ? 'bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.3)] text-white'
                            : 'border-white/[0.06] text-[#999999] hover:border-white/12 hover:text-white'
                        }`}
                      >
                        <p className="font-bold capitalize">{value.label}</p>
                        <p className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)] mt-0.5">
                          {value.monthly === 0 ? 'Included' : `$${value.monthly.toLocaleString()}/mo`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── Right: Cost Summary ─── */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Monthly Estimate */}
                  <div className="card p-8">
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold mb-6 font-[family-name:var(--font-space-mono)]">Monthly Estimate</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-[#999999]">Compute</span>
                        <span className="text-[13px] text-white font-[family-name:var(--font-space-mono)] stat-mono">${costs.computeCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-[#999999]">Storage</span>
                        <span className="text-[13px] text-white font-[family-name:var(--font-space-mono)] stat-mono">${costs.storageCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-[#999999]">Network</span>
                        <span className="text-[13px] text-white font-[family-name:var(--font-space-mono)] stat-mono">${costs.networkCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      {costs.supportCost > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] text-[#999999]">Support</span>
                          <span className="text-[13px] text-white font-[family-name:var(--font-space-mono)] stat-mono">${costs.supportCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-white/[0.06] mb-4" />

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[15px] font-bold text-white">Total / Month</span>
                      <span className="text-2xl font-extrabold text-white stat-mono">${costs.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-[11px] text-[#666666]">Estimated, excludes taxes</p>
                  </div>

                  {/* Annual Savings */}
                  <div className="card p-8 border-[rgba(16,185,129,0.15)]">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingDown size={16} className="text-[#10B981]" />
                      <p className="text-[10px] text-[#10B981] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)]">Annual Pricing</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-[12px] text-[#666666] mb-1">Monthly (no commitment)</p>
                      <p className="text-[16px] text-white stat-mono">${costs.totalAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-[12px] text-[#666666]">/yr</span></p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[12px] text-[#10B981] mb-1 font-semibold">Annual (30% discount)</p>
                      <p className="text-[20px] font-bold text-white stat-mono">${costs.annualWithDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-[12px] text-[#666666]">/yr</span></p>
                    </div>
                    <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-[11px] text-[#10B981] font-semibold">
                        Save ${(costs.totalAnnual - costs.annualWithDiscount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/year with annual commitment
                      </p>
                    </div>
                  </div>

                  {/* Cloud Comparison */}
                  <div className="card p-8">
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold mb-6 font-[family-name:var(--font-space-mono)]">Cloud Comparison</p>

                    <div className="space-y-4">
                      {/* HarchOS */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.15)]">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-[#10B981]" />
                          <span className="text-[13px] font-bold text-white">HarchOS</span>
                        </div>
                        <span className="text-[14px] font-bold text-[#10B981] stat-mono">${costs.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
                      </div>

                      {/* AWS */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#999999]">AWS</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[13px] text-[#999999] stat-mono">${costs.awsCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
                          <span className="ml-2 text-[11px] font-bold text-[#EF4444]">+{costs.savingsVsAws > 0 ? Math.abs(costs.savingsVsAws) : 0}%</span>
                        </div>
                      </div>

                      {/* GCP */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#999999]">GCP</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[13px] text-[#999999] stat-mono">${costs.gcpCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
                          <span className="ml-2 text-[11px] font-bold text-[#EF4444]">+{costs.savingsVsGcp > 0 ? Math.abs(costs.savingsVsGcp) : 0}%</span>
                        </div>
                      </div>

                      {/* Azure */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#999999]">Azure</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[13px] text-[#999999] stat-mono">${costs.azureCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
                          <span className="ml-2 text-[11px] font-bold text-[#EF4444]">+{costs.savingsVsAzure > 0 ? Math.abs(costs.savingsVsAzure) : 0}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-[rgba(6,182,212,0.04)] border border-[rgba(6,182,212,0.1)]">
                      <Info size={14} className="text-[#06B6D4] mt-0.5 shrink-0" />
                      <p className="text-[11px] text-[#999999]">Comparison based on equivalent GPU types, storage, and network configuration. HarchOS includes 100% renewable energy and sovereign data residency at no extra cost.</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link href="/developers" className="w-full inline-flex items-center justify-center gap-2.5 bg-white text-black px-6 py-4 rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all">
                      Start Free Trial <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2.5 border border-white/12 text-white px-6 py-4 rounded-lg text-[13px] font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                      Contact Sales
                    </Link>
                    <button className="w-full inline-flex items-center justify-center gap-2 text-[12px] text-[#666666] hover:text-[#999999] transition-colors py-2">
                      <Download size={12} /> Download Estimate as PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
