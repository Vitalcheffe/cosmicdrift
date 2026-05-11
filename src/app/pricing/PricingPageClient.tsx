'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, X, Zap, Shield, Globe, Server,
  Headphones, Lock, Cpu, Database, HelpCircle, ChevronDown,
  Calculator, Sparkles
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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

/* ─── DATA ─── */
const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    priceDetail: '',
    description: 'Perfect for exploration and prototyping. No credit card required.',
    features: [
      { text: '10 GPU hours/month', included: true },
      { text: '100GB storage', included: true },
      { text: '1M API calls', included: true },
      { text: 'Community support', included: true },
      { text: 'HarchOS dashboard', included: true },
      { text: 'Carbon metrics', included: true },
      { text: 'Priority support', included: false },
      { text: 'SLA guarantee', included: false },
      { text: 'Custom compliance', included: false },
      { text: 'On-premise deployment', included: false },
    ],
    cta: 'Start Free',
    ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
    highlight: false,
    badge: '',
  },
  {
    name: 'Professional',
    price: '$0.50',
    priceDetail: '/GPU hour',
    description: 'For teams scaling AI workloads with predictable costs and priority support.',
    features: [
      { text: '1,000 GPU hours/month', included: true },
      { text: '5TB storage', included: true },
      { text: '100M API calls', included: true },
      { text: 'Priority support', included: true },
      { text: 'SLA 99.9%', included: true },
      { text: 'HarchOS dashboard', included: true },
      { text: 'Carbon metrics', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom compliance', included: false },
      { text: 'On-premise deployment', included: false },
    ],
    cta: 'Get Started',
    ctaStyle: 'bg-white text-black hover:bg-white/90',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceDetail: '',
    description: 'Unlimited scale for organizations with advanced compliance and support needs.',
    features: [
      { text: 'Unlimited GPU', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Unlimited API calls', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'SLA 99.95%', included: true },
      { text: 'Custom compliance', included: true },
      { text: 'On-premise available', included: true },
      { text: 'Private hub option', included: true },
      { text: 'SOC 2 / ISO 27001', included: true },
      { text: '24/7 incident response', included: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
    highlight: false,
    badge: '',
  },
  {
    name: 'Sovereign',
    price: 'Custom',
    priceDetail: '',
    description: 'Air-gapped deployments for government and defense. Maximum data sovereignty.',
    features: [
      { text: 'Air-gapped deployment', included: true },
      { text: 'Government compliance', included: true },
      { text: 'Dedicated infrastructure', included: true },
      { text: 'Sovereign data residency', included: true },
      { text: 'Military-grade security', included: true },
      { text: 'FIPS 140-2 Level 3', included: true },
      { text: 'Classified workload support', included: true },
      { text: 'Dedicated security team', included: true },
      { text: 'Sovereign key management', included: true },
      { text: 'National compliance', included: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-[rgba(199,146,62,0.3)] text-[#C7923E] hover:bg-[rgba(199,146,62,0.06)]',
    highlight: false,
    badge: 'Government',
  },
];

const faqs = [
  {
    question: 'What GPU types are available?',
    answer: 'HarchOS supports NVIDIA H100, A100, and L40S GPUs across all tiers. Starter tier provides A100 access. Professional and above include all GPU types. Enterprise and Sovereign tiers offer custom GPU configurations and dedicated clusters.',
  },
  {
    question: 'How does billing work?',
    answer: 'You are billed only for the GPU hours you actually use. There are no upfront commitments on the Starter and Professional tiers. Storage and API calls are billed monthly based on usage. Enterprise and Sovereign tiers offer committed-use discounts of up to 40%.',
  },
  {
    question: 'Can I switch between tiers?',
    answer: 'Yes, you can upgrade or downgrade your tier at any time. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle. No penalty fees for switching.',
  },
  {
    question: 'What is the SLA guarantee?',
    answer: 'Professional tier guarantees 99.9% uptime with credits for violations. Enterprise tier guarantees 99.95% uptime with custom credit terms. Sovereign tier offers 99.99% uptime for air-gapped deployments. All SLAs include response time guarantees for support tickets.',
  },
  {
    question: 'Is there a free trial for paid tiers?',
    answer: 'Yes, all new accounts receive a 30-day free trial of Professional tier features, including 50 GPU hours. No credit card required to start. After the trial, you can choose any tier or continue on the free Starter plan.',
  },
  {
    question: 'How does HarchOS pricing compare to AWS/GCP/Azure?',
    answer: 'HarchOS is 40-60% cheaper than equivalent GPU compute on AWS, GCP, and Azure. Our renewable energy infrastructure and Moroccan operations reduce costs significantly. H100 Enterprise at $2.10/gpu-hr vs AWS ~$3-4/gpu-hr. Use our pricing calculator to compare exact costs for your workload.',
  },
  {
    question: 'What is carbon-aware scheduling?',
    answer: 'Carbon-aware scheduling automatically routes your workloads to the hub with the lowest carbon intensity at any given time. Harch Ouarzazate runs at just 18 gCO2/kWh with 97.2% renewable energy. This reduces your carbon footprint by up to 89% compared to industry average, and can reduce compute costs by up to 25% by shifting batch workloads to green energy windows.',
  },
];

const gpuPricingPlans = [
  { gpu: 'L40S', tier: 'Enterprise', hub: 'Dakhla', price: 1.40, carbon: 32, renewable: '94.8%', sovereignty: 'Strict' },
  { gpu: 'L40S', tier: 'Performance', hub: 'Benguerir', price: 1.55, carbon: 55, renewable: '88.5%', sovereignty: 'Standard' },
  { gpu: 'A100', tier: 'Performance', hub: 'Tanger', price: 1.80, carbon: 95, renewable: '82.1%', sovereignty: 'Standard' },
  { gpu: 'A100', tier: 'Standard', hub: 'Casablanca', price: 1.95, carbon: 210, renewable: '45.0%', sovereignty: 'Standard' },
  { gpu: 'H100', tier: 'Enterprise', hub: 'Ouarzazate', price: 2.10, carbon: 18, renewable: '97.2%', sovereignty: 'Strict' },
  { gpu: 'H100', tier: 'Performance', hub: 'Benguerir', price: 2.35, carbon: 55, renewable: '88.5%', sovereignty: 'Standard' },
];

const costOptimizationTips = [
  {
    icon: Sparkles,
    title: 'Carbon-Aware Scheduling',
    description: 'Schedule batch workloads during peak renewable energy hours. HarchOS automatically shifts jobs to the lowest-carbon hub, reducing both your carbon footprint and your compute costs by up to 25%.',
  },
  {
    icon: Calculator,
    title: 'Reserved Capacity',
    description: 'Commit to 1-year or 3-year capacity reservations for 30-40% discounts. Ideal for sustained workloads like model training, fine-tuning, and production inference.',
  },
  {
    icon: Zap,
    title: 'Spot GPU Instances',
    description: 'Access unused GPU capacity at up to 70% off standard pricing. Perfect for fault-tolerant batch jobs, distributed training, and development workloads.',
  },
  {
    icon: Server,
    title: 'Right-Sizing',
    description: 'HarchOS automatically recommends optimal GPU configurations based on your workload profile. Avoid over-provisioning and pay only for the compute you actually need.',
  },
];

/* ─── MAIN COMPONENT ─── */
export default function PricingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [gpuHours, setGpuHours] = useState(100);
  const [storage, setStorage] = useState(500);

  const estimatedCost = (gpuHours * 0.5 + storage * 0.02).toFixed(2);

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#10B981]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6 text-[#10B981]">Pricing /0.5</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6">
              Transparent<br/>Pricing<span className="text-[#10B981]">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">
              No hidden fees. No surprise invoices. No negotiated discounts.
            </p>
            <p className="text-[15px] text-[#999999] max-w-xl leading-[1.7]">
              Predictable pricing for sovereign AI compute. 40-60% cheaper than AWS, GCP, and Azure — powered by 100% renewable energy across Morocco.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING TIERS
          ═══════════════════════════════════════════ */}
      <section className="pb-28 md:pb-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.08}>
                <div className={`card p-8 h-full flex flex-col relative ${tier.highlight ? 'ring-1 ring-[#10B981]/30' : ''}`}>
                  {tier.badge && (
                    <span className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold ${
                      tier.badge === 'Most Popular' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[rgba(199,146,62,0.1)] text-[#C7923E]'
                    }`}>
                      {tier.badge}
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-extrabold text-white stat-mono">{tier.price}</span>
                      {tier.priceDetail && <span className="text-[14px] text-[#999999]">{tier.priceDetail}</span>}
                    </div>
                    <p className="text-[13px] text-[#666666] leading-[1.6]">{tier.description}</p>
                  </div>
                  <div className="accent-line mb-6" />
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                        ) : (
                          <X size={16} className="text-[#333333] mt-0.5 shrink-0" />
                        )}
                        <span className={`text-[13px] ${feature.included ? 'text-[#CCCCCC]' : 'text-[#444444]'}`}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.name === 'Starter' || tier.name === 'Professional' ? '/developers' : '/contact'} className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[13px] font-semibold transition-all ${tier.ctaStyle}`}>
                    {tier.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COST CALCULATOR (Decorative)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#10B981]">Cost Calculator</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Estimate Your<br/>Monthly Cost<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Quick cost estimation. For detailed calculations, use our <Link href="/pricing/calculator" className="text-[#10B981] hover:underline">full calculator</Link>.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="card p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Sliders */}
                <div className="lg:col-span-2 space-y-8">
                  {/* GPU Hours */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[13px] font-semibold text-white">GPU Hours / Month</label>
                      <span className="text-[13px] text-[#10B981] font-[family-name:var(--font-space-mono)] stat-mono">{gpuHours}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={10000}
                      step={10}
                      value={gpuHours}
                      onChange={(e) => setGpuHours(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#10B981]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">10</span>
                      <span className="text-[10px] text-[#666666]">10,000</span>
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[13px] font-semibold text-white">Storage (GB)</label>
                      <span className="text-[13px] text-[#10B981] font-[family-name:var(--font-space-mono)] stat-mono">{storage} GB</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={10000}
                      step={10}
                      value={storage}
                      onChange={(e) => setStorage(Number(e.target.value))}
                      className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#10B981]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#666666]">10 GB</span>
                      <span className="text-[10px] text-[#666666]">10,000 GB</span>
                    </div>
                  </div>
                </div>

                {/* Estimate Display */}
                <div className="flex flex-col justify-center">
                  <div className="text-center lg:text-left p-6 rounded-xl bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold mb-2 font-[family-name:var(--font-space-mono)]">Estimated Monthly Cost</p>
                    <p className="text-5xl font-extrabold text-white stat-mono mb-1">${estimatedCost}</p>
                    <p className="text-[12px] text-[#666666]">per month (estimated)</p>
                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <p className="text-[11px] text-[#10B981] font-semibold">Save 40-60% vs AWS/GCP/Azure</p>
                    </div>
                  </div>
                  <Link href="/pricing/calculator" className="mt-4 inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all">
                    Full Calculator <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FREE TIER DETAILS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#10B981]">Starter Tier</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Everything You Get for Free<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Cpu, title: '10 GPU Hours / Month', description: 'Enough for prototyping, testing, and small inference workloads. A100 GPUs included. No credit card required.' },
                { icon: Database, title: '100 GB Storage', description: 'High-performance NVMe storage for datasets, model weights, and artifacts. 11 nines data durability.' },
                { icon: Zap, title: '1M API Calls', description: 'Full API access with no feature restrictions. Same endpoints, same performance, same sovereignty guarantees.' },
                { icon: Globe, title: 'HarchOS Dashboard', description: 'Full access to the HarchOS operations dashboard. Monitor GPU utilization, carbon metrics, and deployment health.' },
                { icon: Shield, title: 'Carbon Metrics', description: 'Real-time carbon scoring for every workload. See the renewable energy mix and CO2 savings for each deployment.' },
                { icon: Headphones, title: 'Community Support', description: 'Access to Discord, GitHub Discussions, and Stack Overflow. Community-driven help with core team participation.' },
              ].map((item, i) => (
                <div key={item.title} className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                      <item.icon size={16} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-[14px] font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-[13px] text-[#999999] leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GPU PRICING PLANS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#10B981]">GPU Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Per-GPU Pricing<br/>by Hub<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Transparent per-GPU pricing across all 5 hubs. Lower carbon intensity hubs offer the best value — carbon-aware scheduling automatically routes your workloads to the greenest, cheapest option.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="bg-[#1E1E1E] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>GPU</th>
                      <th>Tier</th>
                      <th>Hub</th>
                      <th>Price</th>
                      <th>Carbon</th>
                      <th>Renewable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gpuPricingPlans.map((plan) => (
                      <tr key={`${plan.gpu}-${plan.tier}-${plan.hub}`}>
                        <td className="font-semibold">{plan.gpu}</td>
                        <td>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            plan.tier === 'Enterprise' ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' :
                            plan.tier === 'Performance' ? 'bg-[rgba(199,146,62,0.1)] text-[#C7923E]' :
                            'bg-[rgba(255,255,255,0.04)] text-[#999999]'
                          }`}>
                            {plan.tier}
                          </span>
                        </td>
                        <td>{plan.hub}</td>
                        <td className="font-semibold">${plan.price.toFixed(2)}/gpu-hr</td>
                        <td>
                          <span className={`font-[family-name:var(--font-space-mono)] ${
                            plan.carbon <= 50 ? 'text-[#10B981]' :
                            plan.carbon <= 100 ? 'text-[#F59E0B]' :
                            'text-[#EF4444]'
                          }`}>
                            {plan.carbon} gCO2/kWh
                          </span>
                        </td>
                        <td>{plan.renewable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[11px] text-[#666666]">Prices in USD. Carbon intensity color: <span className="text-[#10B981]">green</span> (&lt;50), <span className="text-[#F59E0B]">amber</span> (50-100), <span className="text-[#EF4444]">red</span> (&gt;100 gCO2/kWh). All hubs in Morocco with sovereign data residency.</p>
              </div>
            </div>
          </FadeIn>

          {/* Carbon-Aware Savings Callout */}
          <FadeIn>
            <div className="mt-8 card p-8 border-[rgba(16,185,129,0.15)]">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-[rgba(16,185,129,0.08)] flex items-center justify-center shrink-0">
                  <Sparkles size={24} className="text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Carbon-Aware Savings</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-4">
                    HarchOS carbon-aware scheduling automatically routes your workloads to the lowest-carbon hub in real-time. 
                    Harch Ouarzazate runs at just <span className="text-[#10B981] font-semibold">18 gCO2/kWh</span> with <span className="text-[#10B981] font-semibold">97.2% renewable</span> energy — 
                    that&apos;s <span className="text-white font-semibold">89% lower</span> than the industry average of ~450 gCO2/kWh.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">25%</p>
                      <p className="text-[11px] text-[#999999]">Cost savings with carbon-aware scheduling</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">89%</p>
                      <p className="text-[11px] text-[#999999]">Lower carbon vs industry average</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">0</p>
                      <p className="text-[11px] text-[#999999]">Competitors in Africa with carbon-aware</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COST OPTIMIZATION
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#10B981]">Cost Optimization</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Reduce Your<br/>Compute Cost<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              HarchOS is designed to minimize costs without sacrificing performance. Four built-in strategies for optimizing your GPU spend.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costOptimizationTips.map((tip, i) => (
              <FadeIn key={tip.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="w-12 h-12 rounded-lg bg-[rgba(16,185,129,0.08)] flex items-center justify-center mb-5">
                    <tip.icon size={22} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{tip.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{tip.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#10B981]">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Common Questions<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-[15px] font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown size={18} className={`text-[#666666] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="h-px bg-white/[0.04] mb-4" />
                          <p className="text-[14px] text-[#999999] leading-[1.7]">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="section-label mb-6 text-[#10B981]">Get Started</p>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Start Free.<br/>Scale When Ready<span className="text-[#10B981]">.</span>
            </h2>
            <p className="text-[16px] text-[#999999] max-w-lg mx-auto leading-[1.7] mb-10">
              No credit card required. 10 free GPU hours every month. Deploy on 100% renewable sovereign infrastructure in Morocco.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/developers" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all">
                Start Free <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                Contact Sales
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
