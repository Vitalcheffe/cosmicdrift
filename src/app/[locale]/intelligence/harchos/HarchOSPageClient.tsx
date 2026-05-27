'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Shield, Leaf, Globe, Eye, Brain, Zap, ArrowRight,
  Server, Wifi, TrendingDown, Clock, Lock, Database,
  FileCheck, MapPin, Sun, Wind, Cpu, Activity,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';

/* ─── Helpers ─── */
const splitList = (s: string) => s.split(',').map((v) => v.trim());

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');

  const hubs = [
    { key: 'ouarzazate', renewable: 97, gpus: 800, icon: Sun, color: '#F59E0B' },
    { key: 'dakhla', renewable: 85, gpus: 400, icon: Wind, color: '#38BDF8' },
    { key: 'benguerir', renewable: 75, gpus: 350, icon: Sun, color: '#FBBF24' },
    { key: 'tanger', renewable: 65, gpus: 200, icon: Wind, color: '#67E8F9' },
    { key: 'casablanca', renewable: 40, gpus: 48, icon: Activity, color: '#94A3B8' },
  ] as const;

  const archLayers = [
    { key: 'sense', icon: Eye, color: '#8B9DAF', gradient: 'from-[#8B9DAF]/20 to-[#8B9DAF]/5' },
    { key: 'think', icon: Brain, color: '#A78BFA', gradient: 'from-[#A78BFA]/20 to-[#A78BFA]/5' },
    { key: 'act', icon: Zap, color: '#34D399', gradient: 'from-[#34D399]/20 to-[#34D399]/5' },
  ] as const;

  const specGroups = [
    { key: 'compute', icon: Cpu, color: '#8B9DAF' },
    { key: 'network', icon: Wifi, color: '#38BDF8' },
    { key: 'sustainability', icon: TrendingDown, color: '#34D399' },
    { key: 'reliability', icon: Clock, color: '#F59E0B' },
  ] as const;

  const securityItems = [
    { key: 'zeroTrust', icon: Shield, color: '#8B9DAF' },
    { key: 'dataResidency', icon: Database, color: '#38BDF8' },
    { key: 'encryption', icon: Lock, color: '#A78BFA' },
    { key: 'compliance', icon: FileCheck, color: '#34D399' },
  ] as const;

  const roadmapPhases = [
    { key: 'phase1', status: 'inProgress' as const },
    { key: 'phase2', status: 'planned' as const },
    { key: 'phase3', status: 'planned' as const },
    { key: 'phase4', status: 'planned' as const },
  ] as const;

  return (
    <div className="bg-[#050505]">

      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section className="relative min-h-screen bg-[#050505] overflow-hidden flex items-center">
        {/* Mesh grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,157,175,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,157,175,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#8B9DAF]/[0.05] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#34D399]/[0.03] blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-8 font-[family-name:var(--font-space-mono)]">
              {t('hero.label')}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-extrabold tracking-[-0.04em] leading-[0.95] mb-8">
              <span className="text-white">{t('hero.headline')}</span>
              <br />
              <span className="bg-gradient-to-r from-[#8B9DAF] via-[#A78BFA] to-[#34D399] bg-clip-text text-transparent">
                {t('hero.headlineLine2')}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-14">
              {t('hero.subtext')}
            </p>
          </FadeIn>

          {/* Stat badges with animated counters */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
              {[
                { num: 1798, suffix: '', label: t('hero.statGpusSub'), text: t('hero.statGpus') },
                { num: 5, suffix: '', label: t('hero.statHubsSub'), text: t('hero.statHubs') },
                { num: 47, suffix: '', label: t('hero.statCarbonSub'), text: t('hero.statCarbon') },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2, borderColor: 'rgba(139,157,175,0.2)' }}
                  className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-bold text-white stat-mono">
                      {i === 0 ? <Counter target={stat.num} /> : i === 1 ? <Counter target={stat.num} /> : <><Counter target={stat.num} /></>}
                    </span>
                    {i === 2 && <span className="text-lg text-[#888888]">gCO2/kWh</span>}
                  </div>
                  <p className="text-[13px] text-[#888888]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(139,157,175,0.15)]"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#architecture"
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/[0.12] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 2: WHY HARCHOS ═══════ */}
      <section className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A78BFA]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('why.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-20">
              {t('why.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'sovereign', icon: Shield, color: '#8B9DAF', glow: 'rgba(139,157,175,0.08)' },
              { key: 'carbon', icon: Leaf, color: '#34D399', glow: 'rgba(52,211,153,0.08)' },
              { key: 'panAfrican', icon: Globe, color: '#A78BFA', glow: 'rgba(167,139,250,0.08)' },
            ].map(({ key, icon: Icon, color, glow }, i) => (
              <FadeIn key={key} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, borderColor: `${color}30` }}
                  transition={{ duration: 0.25 }}
                  className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 h-full overflow-hidden group"
                >
                  {/* Glow on hover */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: glow }}
                  />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${color}10` }}
                    >
                      <Icon size={26} style={{ color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`why.${key}.title`)}</h3>
                    <div className="w-10 h-[2px] rounded-full mb-5" style={{ backgroundColor: `${color}40` }} />
                    <p className="text-[#CCCCCC] text-[15px] leading-[1.8]">{t(`why.${key}.desc`)}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 3: HUB NETWORK ═══════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        {/* Map background hint */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139,157,175,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(139,157,175,0.5) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('hubs.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              {t('hubs.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">
              {t('hubs.subtitle')}
            </p>
          </FadeIn>

          {/* Hub cards — featured first, then grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {hubs.map(({ key, renewable, gpus, icon: HubIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, borderColor: `${color}25` }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 overflow-hidden group"
                >
                  {/* Corner glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: `${color}15` }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}12` }}
                        >
                          <HubIcon size={18} style={{ color }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <MapPin size={14} style={{ color }} />
                            {t(`hubs.${key}.name`)}
                          </h3>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/[0.08] border border-amber-400/20 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {t('hubs.planned')}
                      </span>
                    </div>

                    <p className="text-[#8B9DAF] text-sm font-medium mb-5">{t(`hubs.${key}.energy`)}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                      <div className="bg-white/[0.02] rounded-xl p-3">
                        <p className="text-[11px] text-[#888888] uppercase tracking-wider mb-1">GPUs</p>
                        <p className="text-white font-bold text-lg stat-mono">{gpus}</p>
                      </div>
                      <div className="bg-white/[0.02] rounded-xl p-3">
                        <p className="text-[11px] text-[#888888] uppercase tracking-wider mb-1">{t('hubs.renewableLabel')}</p>
                        <p className="font-bold text-lg stat-mono" style={{ color: renewable >= 80 ? '#34D399' : renewable >= 60 ? '#FBBF24' : '#F87171' }}>
                          {renewable}%
                        </p>
                      </div>
                    </div>

                    {/* Renewable bar */}
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${renewable}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: renewable >= 80 ? '#34D399' : renewable >= 60 ? '#FBBF24' : '#F87171',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-[13px] text-[#666666] italic mt-4">{t('hubs.disclaimer')}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 4: ARCHITECTURE ═══════ */}
      <section id="architecture" className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#A78BFA]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('architecture.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              {t('architecture.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">
              {t('architecture.subtitle')}
            </p>
          </FadeIn>

          {/* Connected architecture layers */}
          <div className="relative">
            {archLayers.map(({ key, icon: Icon, color, gradient }, i) => (
              <FadeIn key={key} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.008, borderColor: `${color}30` }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 md:p-10 mb-6 last:mb-0 overflow-hidden"
                >
                  {/* Layer gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`} />

                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Icon size={30} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em]" style={{ color }}>{t(`architecture.${key}.title`)}</h3>
                        <span className="text-[13px] text-[#888888] font-medium">— {t(`architecture.${key}.subtitle`)}</span>
                      </div>
                      <p className="text-[#CCCCCC] leading-[1.8] mb-6 mt-2">{t(`architecture.${key}.desc`)}</p>
                      <div className="flex flex-wrap gap-2">
                        {splitList(t(`architecture.${key}.specs`)).map((spec) => (
                          <span
                            key={spec}
                            className="text-[12px] px-3.5 py-1.5 rounded-lg border text-[#CCCCCC] font-medium"
                            style={{ borderColor: `${color}20`, backgroundColor: `${color}06` }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
                      <div className="w-8 h-8 rounded-full bg-[#080808] border border-white/[0.08] flex items-center justify-center">
                        <ArrowRight size={14} className="text-[#8B9DAF] rotate-90" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: TARGET SPECIFICATIONS ═══════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('specs.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              {t('specs.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">
              {t('specs.subtitle')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {specGroups.map(({ key, icon: SpecIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${color}25` }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 h-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}10` }}
                    >
                      <SpecIcon size={22} style={{ color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{t(`specs.${key}.title`)}</h3>
                  </div>
                  <div className="w-10 h-[2px] rounded-full mb-6" style={{ backgroundColor: `${color}40` }} />
                  <ul className="space-y-4">
                    {splitList(t(`specs.${key}.items`)).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-[#CCCCCC] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 6: SECURITY & COMPLIANCE ═══════ */}
      <section className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#34D399]/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('security.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-20">
              {t('security.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {securityItems.map(({ key, icon: SecIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${color}25` }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 h-full group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}10` }}
                    >
                      <SecIcon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{t(`security.${key}.title`)}</h3>
                  </div>
                  <p className="text-[#CCCCCC] text-[15px] leading-[1.8]">{t(`security.${key}.desc`)}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Compliance badges */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {splitList(t('security.badges')).map((badge) => (
                <span
                  key={badge}
                  className="text-[12px] font-bold tracking-wide px-5 py-2.5 rounded-xl border border-[#8B9DAF]/15 text-[#8B9DAF] bg-[#8B9DAF]/[0.04] hover:bg-[#8B9DAF]/[0.08] transition-colors cursor-default"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ SECTION 7: ROADMAP ═══════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('roadmap.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              {t('roadmap.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg mb-20">{t('roadmap.subtitle')}</p>
          </FadeIn>

          {/* Vertical timeline on mobile, horizontal on desktop */}
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-[35px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-[#8B9DAF]/30 via-white/[0.06] to-white/[0.04]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5">
              {roadmapPhases.map(({ key, status }, i) => {
                const isInProgress = status === 'inProgress';
                const phaseColor = isInProgress ? '#8B9DAF' : '#666666';
                return (
                  <FadeIn key={key} delay={i * 0.12}>
                    <div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                      {/* Timeline dot */}
                      <div className="shrink-0 md:mb-6 relative">
                        <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center border-2 z-10 ${
                          isInProgress
                            ? 'bg-[#8B9DAF]/10 border-[#8B9DAF]/40'
                            : 'bg-[#0A0A0A] border-white/[0.08]'
                        }`}>
                          {isInProgress ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8B9DAF] animate-pulse" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-white/20" />
                          )}
                        </div>
                        {/* Mobile vertical line */}
                        {i < 3 && (
                          <div className="md:hidden absolute top-[44px] left-1/2 -translate-x-1/2 w-[2px] h-6 bg-white/[0.06]" />
                        )}
                      </div>

                      {/* Content card */}
                      <motion.div
                        whileHover={{ y: -3, borderColor: isInProgress ? 'rgba(139,157,175,0.25)' : 'rgba(255,255,255,0.1)' }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 md:w-full bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-white">{t(`roadmap.${key}.title`)}</h3>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              isInProgress
                                ? 'bg-[#8B9DAF]/10 text-[#8B9DAF] border border-[#8B9DAF]/20'
                                : 'bg-white/[0.03] text-[#666666] border border-white/[0.04]'
                            }`}
                          >
                            {isInProgress ? t('roadmap.inProgress') : t('roadmap.planned')}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#8B9DAF] font-semibold mb-4 stat-mono">{t(`roadmap.${key}.period`)}</p>
                        <ul className="space-y-2.5">
                          {splitList(t(`roadmap.${key}.items`)).map((item) => (
                            <li key={item} className="text-[13px] text-[#CCCCCC] flex items-start gap-2.5 leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: phaseColor }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 8: CTA ═══════ */}
      <section className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B9DAF]/[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#34D399]/[0.02] blur-[100px] pointer-events-none" />
        {/* Mesh pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,157,175,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,157,175,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-8">
              {t('cta.title')}
            </h2>
            <p className="text-[#CCCCCC] text-lg md:text-xl leading-relaxed mb-14 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 px-9 py-4.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(139,157,175,0.2)]"
              >
                {t('cta.primary')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2.5 px-9 py-4.5 border border-white/[0.12] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all"
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
