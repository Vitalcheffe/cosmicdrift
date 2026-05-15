'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/motion';
import {
  ArrowRight, CheckCircle2, X, Zap, Shield, Globe, Server,
  Headphones, Lock, Cpu, Database, HelpCircle, ChevronDown,
  Calculator, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── MAIN COMPONENT ─── */
export default function PricingPageClient() {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [gpuHours, setGpuHours] = useState(100);
  const [storage, setStorage] = useState(500);

  const estimatedCost = (gpuHours * 0.5 + storage * 0.02).toFixed(2);

  const tiers = [
    {
      name: t('tiers.starter.name'),
      price: t('tiers.starter.price'),
      priceDetail: t('tiers.starter.priceDetail'),
      description: t('tiers.starter.description'),
      features: [
        { text: t('tiers.starter.features.0'), included: true },
        { text: t('tiers.starter.features.1'), included: true },
        { text: t('tiers.starter.features.2'), included: true },
        { text: t('tiers.starter.features.3'), included: true },
        { text: t('tiers.starter.features.4'), included: true },
        { text: t('tiers.starter.features.5'), included: true },
        { text: t('tiers.starter.features.6'), included: false },
        { text: t('tiers.starter.features.7'), included: false },
        { text: t('tiers.starter.features.8'), included: false },
        { text: t('tiers.starter.features.9'), included: false },
      ],
      cta: t('tiers.starter.cta'),
      ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
      highlight: false,
      badge: '',
      badgeKey: '',
    },
    {
      name: t('tiers.professional.name'),
      price: t('tiers.professional.price'),
      priceDetail: t('tiers.professional.priceDetail'),
      description: t('tiers.professional.description'),
      features: [
        { text: t('tiers.professional.features.0'), included: true },
        { text: t('tiers.professional.features.1'), included: true },
        { text: t('tiers.professional.features.2'), included: true },
        { text: t('tiers.professional.features.3'), included: true },
        { text: t('tiers.professional.features.4'), included: true },
        { text: t('tiers.professional.features.5'), included: true },
        { text: t('tiers.professional.features.6'), included: true },
        { text: t('tiers.professional.features.7'), included: true },
        { text: t('tiers.professional.features.8'), included: false },
        { text: t('tiers.professional.features.9'), included: false },
      ],
      cta: t('tiers.professional.cta'),
      ctaStyle: 'bg-white text-black hover:bg-white/90',
      highlight: true,
      badge: t('tiers.professional.badge'),
      badgeKey: 'popular',
    },
    {
      name: t('tiers.enterprise.name'),
      price: t('tiers.enterprise.price'),
      priceDetail: t('tiers.enterprise.priceDetail'),
      description: t('tiers.enterprise.description'),
      features: [
        { text: t('tiers.enterprise.features.0'), included: true },
        { text: t('tiers.enterprise.features.1'), included: true },
        { text: t('tiers.enterprise.features.2'), included: true },
        { text: t('tiers.enterprise.features.3'), included: true },
        { text: t('tiers.enterprise.features.4'), included: true },
        { text: t('tiers.enterprise.features.5'), included: true },
        { text: t('tiers.enterprise.features.6'), included: true },
        { text: t('tiers.enterprise.features.7'), included: true },
        { text: t('tiers.enterprise.features.8'), included: true },
        { text: t('tiers.enterprise.features.9'), included: true },
      ],
      cta: t('tiers.enterprise.cta'),
      ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
      highlight: false,
      badge: '',
      badgeKey: '',
    },
    {
      name: t('tiers.sovereign.name'),
      price: t('tiers.sovereign.price'),
      priceDetail: t('tiers.sovereign.priceDetail'),
      description: t('tiers.sovereign.description'),
      features: [
        { text: t('tiers.sovereign.features.0'), included: true },
        { text: t('tiers.sovereign.features.1'), included: true },
        { text: t('tiers.sovereign.features.2'), included: true },
        { text: t('tiers.sovereign.features.3'), included: true },
        { text: t('tiers.sovereign.features.4'), included: true },
        { text: t('tiers.sovereign.features.5'), included: true },
        { text: t('tiers.sovereign.features.6'), included: true },
        { text: t('tiers.sovereign.features.7'), included: true },
        { text: t('tiers.sovereign.features.8'), included: true },
        { text: t('tiers.sovereign.features.9'), included: true },
      ],
      cta: t('tiers.sovereign.cta'),
      ctaStyle: 'border border-[rgba(139,157,175,0.3)] text-[#8B9DAF] hover:bg-[rgba(139,157,175,0.06)]',
      highlight: false,
      badge: t('tiers.sovereign.badge'),
      badgeKey: 'government',
    },
  ];

  const faqs = [
    {
      question: t('faq.items.q1.question'),
      answer: t('faq.items.q1.answer'),
    },
    {
      question: t('faq.items.q2.question'),
      answer: t('faq.items.q2.answer'),
    },
    {
      question: t('faq.items.q3.question'),
      answer: t('faq.items.q3.answer'),
    },
    {
      question: t('faq.items.q4.question'),
      answer: t('faq.items.q4.answer'),
    },
    {
      question: t('faq.items.q5.question'),
      answer: t('faq.items.q5.answer'),
    },
    {
      question: t('faq.items.q6.question'),
      answer: t('faq.items.q6.answer'),
    },
    {
      question: t('faq.items.q7.question'),
      answer: t('faq.items.q7.answer'),
    },
  ];

  const gpuPricingPlans = [
    { gpu: t('gpuPricing.plans.0.gpu'), tier: t('gpuPricing.plans.0.tier'), hub: t('gpuPricing.plans.0.hub'), price: 1.40, carbon: 32, renewable: t('gpuPricing.plans.0.renewable'), sovereignty: t('gpuPricing.plans.0.sovereignty') },
    { gpu: t('gpuPricing.plans.1.gpu'), tier: t('gpuPricing.plans.1.tier'), hub: t('gpuPricing.plans.1.hub'), price: 1.55, carbon: 55, renewable: t('gpuPricing.plans.1.renewable'), sovereignty: t('gpuPricing.plans.1.sovereignty') },
    { gpu: t('gpuPricing.plans.2.gpu'), tier: t('gpuPricing.plans.2.tier'), hub: t('gpuPricing.plans.2.hub'), price: 1.80, carbon: 95, renewable: t('gpuPricing.plans.2.renewable'), sovereignty: t('gpuPricing.plans.2.sovereignty') },
    { gpu: t('gpuPricing.plans.3.gpu'), tier: t('gpuPricing.plans.3.tier'), hub: t('gpuPricing.plans.3.hub'), price: 1.95, carbon: 210, renewable: t('gpuPricing.plans.3.renewable'), sovereignty: t('gpuPricing.plans.3.sovereignty') },
    { gpu: t('gpuPricing.plans.4.gpu'), tier: t('gpuPricing.plans.4.tier'), hub: t('gpuPricing.plans.4.hub'), price: 2.10, carbon: 18, renewable: t('gpuPricing.plans.4.renewable'), sovereignty: t('gpuPricing.plans.4.sovereignty') },
    { gpu: t('gpuPricing.plans.5.gpu'), tier: t('gpuPricing.plans.5.tier'), hub: t('gpuPricing.plans.5.hub'), price: 2.35, carbon: 55, renewable: t('gpuPricing.plans.5.renewable'), sovereignty: t('gpuPricing.plans.5.sovereignty') },
  ];

  const costOptimizationTips = [
    {
      icon: Sparkles,
      title: t('costOptimization.tips.0.title'),
      description: t('costOptimization.tips.0.description'),
    },
    {
      icon: Calculator,
      title: t('costOptimization.tips.1.title'),
      description: t('costOptimization.tips.1.description'),
    },
    {
      icon: Zap,
      title: t('costOptimization.tips.2.title'),
      description: t('costOptimization.tips.2.description'),
    },
    {
      icon: Server,
      title: t('costOptimization.tips.3.title'),
      description: t('costOptimization.tips.3.description'),
    },
  ];

  const starterTierItems = [
    { icon: Cpu, title: t('starterTier.items.0.title'), description: t('starterTier.items.0.description') },
    { icon: Database, title: t('starterTier.items.1.title'), description: t('starterTier.items.1.description') },
    { icon: Zap, title: t('starterTier.items.2.title'), description: t('starterTier.items.2.description') },
    { icon: Globe, title: t('starterTier.items.3.title'), description: t('starterTier.items.3.description') },
    { icon: Shield, title: t('starterTier.items.4.title'), description: t('starterTier.items.4.description') },
    { icon: Headphones, title: t('starterTier.items.5.title'), description: t('starterTier.items.5.description') },
  ];

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
            <p className="section-label mb-6 text-[#10B981]">{t('hero.label')}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6">
              {t('hero.titleLine1')}<br/>{t('hero.titleLine2')}<span className="text-[#10B981]">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-[15px] text-[#999999] max-w-xl leading-[1.7]">
              {t('hero.description')}
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
                      tier.badgeKey === 'popular' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[rgba(139,157,175,0.1)] text-[#8B9DAF]'
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
                  <Link href={tier.name === t('tiers.starter.name') || tier.name === t('tiers.professional.name') ? '/developers' : '/contact'} className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[13px] font-semibold transition-all ${tier.ctaStyle}`}>
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
            <p className="section-label mb-4 text-[#10B981]">{t('calculator.sectionLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('calculator.titleLine1')}<br/>{t('calculator.titleLine2')}<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('calculator.descriptionPrefix')}<Link href="/pricing/calculator" className="text-[#10B981] hover:underline">{t('calculator.fullCalculatorLink')}</Link>{t('calculator.descriptionSuffix')}
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
                      <label className="text-[13px] font-semibold text-white">{t('calculator.gpuHoursLabel')}</label>
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
                      <label className="text-[13px] font-semibold text-white">{t('calculator.storageLabel')}</label>
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
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold mb-2 font-[family-name:var(--font-space-mono)]">{t('calculator.estimatedMonthlyCost')}</p>
                    <p className="text-5xl font-extrabold text-white stat-mono mb-1">${estimatedCost}</p>
                    <p className="text-[12px] text-[#666666]">{t('calculator.perMonthEstimated')}</p>
                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <p className="text-[11px] text-[#10B981] font-semibold">{t('calculator.saveVsCloud')}</p>
                    </div>
                  </div>
                  <Link href="/pricing/calculator" className="mt-4 inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all">
                    {t('calculator.fullCalculatorButton')} <ArrowRight size={14} />
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
            <p className="section-label mb-4 text-[#10B981]">{t('starterTier.label')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('starterTier.title')}<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {starterTierItems.map((item, i) => (
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
            <p className="section-label mb-4 text-[#10B981]">{t('gpuPricing.sectionLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('gpuPricing.titleLine1')}<br/>{t('gpuPricing.titleLine2')}<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('gpuPricing.description')}
            </p>
          </FadeIn>

          <FadeIn>
            <div className="bg-[#1E1E1E] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('gpuPricing.tableHeaders.gpu')}</th>
                      <th>{t('gpuPricing.tableHeaders.tier')}</th>
                      <th>{t('gpuPricing.tableHeaders.hub')}</th>
                      <th>{t('gpuPricing.tableHeaders.price')}</th>
                      <th>{t('gpuPricing.tableHeaders.carbon')}</th>
                      <th>{t('gpuPricing.tableHeaders.renewable')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gpuPricingPlans.map((plan, idx) => (
                      <tr key={`${plan.gpu}-${plan.tier}-${plan.hub}-${idx}`}>
                        <td className="font-semibold">{plan.gpu}</td>
                        <td>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            plan.tier === t('gpuPricing.tierEnterprise') ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' :
                            plan.tier === t('gpuPricing.tierPerformance') ? 'bg-[rgba(139,157,175,0.1)] text-[#8B9DAF]' :
                            'bg-[rgba(255,255,255,0.04)] text-[#999999]'
                          }`}>
                            {plan.tier}
                          </span>
                        </td>
                        <td>{plan.hub}</td>
                        <td className="font-semibold">${plan.price.toFixed(2)}/{t('gpuPricing.priceUnit')}</td>
                        <td>
                          <span className={`font-[family-name:var(--font-space-mono)] ${
                            plan.carbon <= 50 ? 'text-[#10B981]' :
                            plan.carbon <= 100 ? 'text-[#F59E0B]' :
                            'text-[#EF4444]'
                          }`}>
                            {plan.carbon} {t('gpuPricing.carbonUnit')}
                          </span>
                        </td>
                        <td>{plan.renewable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[11px] text-[#666666]">{t('gpuPricing.tableFooter')}</p>
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
                  <h3 className="text-xl font-bold text-white mb-2">{t('carbonSavings.title')}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-4">
                    {t('carbonSavings.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">25%</p>
                      <p className="text-[11px] text-[#999999]">{t('carbonSavings.stat1Label')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">89%</p>
                      <p className="text-[11px] text-[#999999]">{t('carbonSavings.stat2Label')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.1)]">
                      <p className="text-2xl font-bold text-white stat-mono">0</p>
                      <p className="text-[11px] text-[#999999]">{t('carbonSavings.stat3Label')}</p>
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
            <p className="section-label mb-4 text-[#10B981]">{t('costOptimization.label')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              {t('costOptimization.titleLine1')}<br/>{t('costOptimization.titleLine2')}<span className="text-[#10B981]">.</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {t('costOptimization.description')}
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
            <p className="section-label mb-4 text-[#10B981]">{t('faq.label')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('faq.title')}<span className="text-[#10B981]">.</span>
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
            <p className="section-label mb-6 text-[#10B981]">{t('cta.label')}</p>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('cta.titleLine1')}<br/>{t('cta.titleLine2')}<span className="text-[#10B981]">.</span>
            </h2>
            <p className="text-[16px] text-[#999999] max-w-lg mx-auto leading-[1.7] mb-10">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/developers" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all">
                {t('cta.startFree')} <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                {t('cta.contactSales')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
