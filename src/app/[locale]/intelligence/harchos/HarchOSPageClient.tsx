'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Shield, Leaf, Globe, Eye, Brain, Zap, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';

/* ─── Helpers ─── */
const splitList = (s: string) => s.split(',').map((v) => v.trim());

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');

  const hubs = [
    { key: 'ouarzazate', renewable: 97, gpus: 800 },
    { key: 'dakhla', renewable: 85, gpus: 400 },
    { key: 'benguerir', renewable: 75, gpus: 350 },
    { key: 'tanger', renewable: 65, gpus: 200 },
    { key: 'casablanca', renewable: 40, gpus: 48 },
  ] as const;

  const archLayers = [
    { key: 'sense', icon: Eye, color: '#8B9DAF' },
    { key: 'think', icon: Brain, color: '#A78BFA' },
    { key: 'act', icon: Zap, color: '#34D399' },
  ] as const;

  const specGroups = ['compute', 'network', 'sustainability', 'reliability'] as const;

  const securityItems = [
    { key: 'zeroTrust', icon: Lock },
    { key: 'dataResidency', icon: Shield },
    { key: 'encryption', icon: Lock },
    { key: 'compliance', icon: Shield },
  ] as const;

  const roadmapPhases = [
    { key: 'phase1', status: 'inProgress' as const },
    { key: 'phase2', status: 'planned' as const },
    { key: 'phase3', status: 'planned' as const },
    { key: 'phase4', status: 'planned' as const },
  ] as const;

  return (
    <div className="bg-[#0A0A0A]">

      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section className="relative min-h-[90vh] bg-[#0A0A0A] overflow-hidden flex items-center">
        {/* Gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B9DAF]/[0.04] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-6">
              {t('hero.label')}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-6">
              {t('hero.headline')}<br />{t('hero.headlineLine2')}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-12">
              {t('hero.subtext')}
            </p>
          </FadeIn>

          {/* Stat badges */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-12">
              {[
                { val: t('hero.statGpus'), sub: t('hero.statGpusSub') },
                { val: t('hero.statHubs'), sub: t('hero.statHubsSub') },
                { val: t('hero.statCarbon'), sub: t('hero.statCarbonSub') },
              ].map((stat) => (
                <div key={stat.val} className="bg-[#111111] border border-white/[0.06] rounded-xl px-6 py-4">
                  <p className="text-xl font-bold text-white">{stat.val}</p>
                  <p className="text-[13px] text-[#888888] mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                {t('hero.ctaPrimary')} <ArrowRight size={16} />
              </Link>
              <Link
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 2: WHY HARCHOS ═══════ */}
      <section className="bg-[#0D0D0D] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('why.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-16">
              {t('why.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'sovereign', icon: Shield },
              { key: 'carbon', icon: Leaf },
              { key: 'panAfrican', icon: Globe },
            ].map(({ key, icon: Icon }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-8 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#8B9DAF]/10 flex items-center justify-center mb-6">
                    <Icon size={24} className="text-[#8B9DAF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t(`why.${key}.title`)}</h3>
                  <div className="w-8 h-[2px] bg-[#8B9DAF]/40 mb-4" />
                  <p className="text-[#CCCCCC] text-[15px] leading-relaxed">{t(`why.${key}.desc`)}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 3: HUB NETWORK ═══════ */}
      <section className="bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('hubs.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
              {t('hubs.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-16">
              {t('hubs.subtitle')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {hubs.map(({ key, renewable, gpus }, i) => (
              <FadeIn key={key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{t(`hubs.${key}.name`)}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {t('hubs.planned')}
                    </span>
                  </div>
                  <p className="text-[#8B9DAF] text-sm font-medium mb-4">{t(`hubs.${key}.energy`)}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#888888]">GPUs</p>
                      <p className="text-white font-semibold">{gpus} {t('hubs.planned').toLowerCase()}</p>
                    </div>
                    <div>
                      <p className="text-[#888888]">{t('hubs.renewableLabel')}</p>
                      <p className="text-white font-semibold">{t(`hubs.${key}.renewable`)}</p>
                    </div>
                  </div>
                  {/* Renewable bar */}
                  <div className="mt-4 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${renewable}%`,
                        backgroundColor: renewable >= 80 ? '#34D399' : renewable >= 60 ? '#FBBF24' : '#F87171',
                      }}
                    />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-[13px] text-[#888888] italic">{t('hubs.disclaimer')}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 4: ARCHITECTURE ═══════ */}
      <section id="architecture" className="bg-[#0D0D0D] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('architecture.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
              {t('architecture.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-16">
              {t('architecture.subtitle')}
            </p>
          </FadeIn>

          <div className="space-y-6">
            {archLayers.map(({ key, icon: Icon, color }, i) => (
              <FadeIn key={key} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-8 md:p-10"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={28} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-white mb-1">{t(`architecture.${key}.title`)}</h3>
                      <p className="text-sm text-[#8B9DAF] font-medium mb-3">{t(`architecture.${key}.subtitle`)}</p>
                      <p className="text-[#CCCCCC] leading-relaxed mb-6">{t(`architecture.${key}.desc`)}</p>
                      <div className="flex flex-wrap gap-2">
                        {splitList(t(`architecture.${key}.specs`)).map((spec) => (
                          <span
                            key={spec}
                            className="text-[12px] px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#CCCCCC]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: TARGET SPECIFICATIONS ═══════ */}
      <section className="bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('specs.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
              {t('specs.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-16">
              {t('specs.subtitle')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specGroups.map((group, i) => (
              <FadeIn key={group} delay={i * 0.1}>
                <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-8">
                  <h3 className="text-lg font-bold text-white mb-1">{t(`specs.${group}.title`)}</h3>
                  <div className="w-8 h-[2px] bg-[#8B9DAF]/40 mb-6" />
                  <ul className="space-y-3">
                    {splitList(t(`specs.${group}.items`)).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-[#CCCCCC]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9DAF] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 6: SECURITY & COMPLIANCE ═══════ */}
      <section className="bg-[#0D0D0D] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('security.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-16">
              {t('security.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {securityItems.map(({ key, icon: Icon }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className="text-[#8B9DAF]" />
                    <h3 className="text-lg font-bold text-white">{t(`security.${key}.title`)}</h3>
                  </div>
                  <p className="text-[#CCCCCC] text-[15px] leading-relaxed">{t(`security.${key}.desc`)}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Compliance badges */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {splitList(t('security.badges')).map((badge) => (
                <span
                  key={badge}
                  className="text-[12px] font-semibold px-4 py-2 rounded-lg border border-[#8B9DAF]/20 text-[#8B9DAF] bg-[#8B9DAF]/[0.06]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 7: ROADMAP ═══════ */}
      <section className="bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8B9DAF] mb-4">
              {t('roadmap.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
              {t('roadmap.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg mb-16">{t('roadmap.subtitle')}</p>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-white/[0.06]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {roadmapPhases.map(({ key, status }, i) => {
                const isInProgress = status === 'inProgress';
                return (
                  <FadeIn key={key} delay={i * 0.1}>
                    <div className="relative">
                      {/* Dot */}
                      <div className="hidden md:flex items-center justify-center mb-6">
                        <div
                          className={`w-3 h-3 rounded-full border-2 z-10 ${
                            isInProgress
                              ? 'bg-[#8B9DAF] border-[#8B9DAF]'
                              : 'bg-[#111111] border-white/20'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-white">{t(`roadmap.${key}.title`)}</h3>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              isInProgress
                                ? 'bg-[#8B9DAF]/10 text-[#8B9DAF]'
                                : 'bg-white/[0.04] text-[#888888]'
                            }`}
                          >
                            {isInProgress ? t('roadmap.inProgress') : t('roadmap.planned')}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#8B9DAF] font-medium mb-4">{t(`roadmap.${key}.period`)}</p>
                        <ul className="space-y-2">
                          {splitList(t(`roadmap.${key}.items`)).map((item) => (
                            <li key={item} className="text-[13px] text-[#CCCCCC] flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#8B9DAF]/60 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 8: CTA ═══════ */}
      <section className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#8B9DAF]/[0.03] blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg leading-relaxed mb-12">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                {t('cta.primary')} <ArrowRight size={16} />
              </Link>
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
