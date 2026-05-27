'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Shield, Leaf, Globe, Eye, Brain, Zap, ArrowRight, ArrowUpRight,
  Server, Wifi, TrendingDown, Clock, Lock, Database,
  FileCheck, MapPin, Sun, Wind, Cpu, Activity,
  Code, Terminal, GitBranch, Package, BarChart3,
  Network, Layers, ChevronRight, Monitor, Box,
  RefreshCw, Rocket, CheckCircle2, Github, Search,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { FadeIn, AnimatedCounter, ParallaxSection } from '@/components/ui/motion';

/* ─── Helpers ─── */
const splitList = (s: string) => s.split(',').map((v) => v.trim());

/* ─── Video Background ─── */
function VideoBg({ src, overlay = 'bg-black/60' }: { src: string; overlay?: string }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}

/* ─── Photo Background ─── */
function PhotoBg({ src, overlay = 'bg-black/70' }: { src: string; overlay?: string }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
      {children}
    </p>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4 ${className}`}>
      {children}
    </h2>
  );
}

/* ─── Code Block (terminal style) ─── */
function CodeBlock({ title, children, lang }: { title: string; children: string; lang?: string }) {
  return (
    <div className="bg-[#0D0D0D] rounded-xl border border-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-[11px] text-[#666] ml-2 font-mono">{title}</span>
        {lang && <span className="ml-auto text-[10px] text-[#555] font-mono uppercase">{lang}</span>}
      </div>
      <pre className="p-5 text-[13px] leading-[1.7] text-[#CCCCCC] font-mono overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ─── Language Badge ─── */
function LangBadge({ lang, color }: { lang: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] text-[#AAAAAA]">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      {lang}
    </span>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');

  /* ─── Data ─── */
  const hubs = [
    { key: 'ouarzazate', renewable: 97, gpus: 800, icon: Sun, color: '#F59E0B' },
    { key: 'dakhla', renewable: 85, gpus: 400, icon: Wind, color: '#38BDF8' },
    { key: 'benguerir', renewable: 75, gpus: 350, icon: Sun, color: '#FBBF24' },
    { key: 'tanger', renewable: 65, gpus: 200, icon: Wind, color: '#67E8F9' },
    { key: 'casablanca', renewable: 40, gpus: 48, icon: Activity, color: '#94A3B8' },
  ] as const;

  const archLayers = [
    { key: 'sense', icon: Eye, color: '#8B9DAF' },
    { key: 'think', icon: Brain, color: '#A78BFA' },
    { key: 'act', icon: Zap, color: '#34D399' },
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

  const repos = [
    { key: 'server', lang: 'Python', langColor: '#3572A5', license: 'Apache 2.0', url: 'https://github.com/HarchCorp/harchos-server', icon: Server },
    { key: 'sdkPython', lang: 'Python', langColor: '#3572A5', license: 'MPL', url: 'https://github.com/HarchCorp/harchos-sdk-python', icon: Package },
    { key: 'sdkJs', lang: 'TypeScript', langColor: '#2B7489', license: 'MIT', url: 'https://github.com/HarchCorp/harchos-sdk-js', icon: Package },
    { key: 'cli', lang: 'Go', langColor: '#00ADD8', license: 'MPL', url: 'https://github.com/HarchCorp/harchos-cli', icon: Terminal },
    { key: 'terraform', lang: 'Go', langColor: '#00ADD8', license: 'MPL', url: 'https://github.com/HarchCorp/harchos-terraform-provider', icon: Layers },
    { key: 'grafana', lang: 'TypeScript', langColor: '#2B7489', license: 'MPL', url: 'https://github.com/HarchCorp/harchos-grafana-plugins', icon: BarChart3 },
    { key: 'examples', lang: 'Python+TS', langColor: '#3572A5', license: 'MPL', url: 'https://github.com/HarchCorp/harchos-examples', icon: Code },
  ] as const;

  const sovereigntyLevels = [
    { key: 'strict', color: '#F87171', icon: Lock },
    { key: 'regional', color: '#FBBF24', icon: Globe },
    { key: 'global', color: '#34D399', icon: Network },
  ] as const;

  return (
    <div className="bg-[#050505]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO — VIDEO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <VideoBg src="/videos/hero.mp4" overlay="bg-black/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <FadeIn>
            <SectionLabel>{t('hero.label')}</SectionLabel>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.92] mb-8">
              <span className="text-white">{t('hero.headline')}</span>
              <br />
              <span className="bg-gradient-to-r from-[#8B9DAF] via-[#A78BFA] to-[#34D399] bg-clip-text text-transparent">
                {t('hero.headlineLine2')}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-14">
              {t('hero.subtext')}
            </p>
          </FadeIn>

          {/* Stat badges */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
              {[
                { num: 1798, suffix: '', label: t('hero.statGpusSub') },
                { num: 5, suffix: '', label: t('hero.statHubsSub') },
                { num: 47, suffix: '', label: t('hero.statCarbonSub') },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.15)' }}
                  className="bg-black/40 border border-white/[0.1] rounded-2xl p-6 backdrop-blur-md"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-bold text-white stat-mono">
                      <AnimatedCounter value={stat.num} />
                    </span>
                    {i === 2 && <span className="text-lg text-white/50">gCO2/kWh</span>}
                  </div>
                  <p className="text-[13px] text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://github.com/HarchCorp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/[0.2] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.08] hover:border-white/[0.3] transition-all backdrop-blur-sm"
              >
                <Github size={16} />
                {t('hero.ctaGithub')}
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: WHY HARCHOS — PHOTO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <PhotoBg src="/images/real/intel-datacenter.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('why.label')}</SectionLabel>
            <SectionTitle>{t('why.title')}</SectionTitle>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('why.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'sovereign', icon: Shield, color: '#8B9DAF', glow: 'rgba(139,157,175,0.12)' },
              { key: 'carbon', icon: Leaf, color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
              { key: 'panAfrican', icon: Globe, color: '#A78BFA', glow: 'rgba(167,139,250,0.12)' },
            ].map(({ key, icon: Icon, color, glow }, i) => (
              <FadeIn key={key} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, borderColor: `${color}40` }}
                  transition={{ duration: 0.25 }}
                  className="relative bg-black/50 border border-white/[0.08] rounded-2xl p-8 h-full overflow-hidden group backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: glow }}
                  />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15` }}>
                      <Icon size={26} style={{ color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`why.${key}.title`)}</h3>
                    <div className="w-10 h-[2px] rounded-full mb-5" style={{ backgroundColor: `${color}40` }} />
                    <p className="text-white/70 text-[15px] leading-[1.8]">{t(`why.${key}.desc`)}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: HUB NETWORK — DARK + MAP
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139,157,175,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(139,157,175,0.5) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('hubs.label')}</SectionLabel>
            <SectionTitle>{t('hubs.title')}</SectionTitle>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('hubs.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {hubs.map(({ key, renewable, gpus, icon: HubIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, borderColor: `${color}30` }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: `${color}15` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                          <HubIcon size={18} style={{ color }} />
                        </div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <MapPin size={14} style={{ color }} />
                          {t(`hubs.${key}.name`)}
                        </h3>
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
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${renewable}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: renewable >= 80 ? '#34D399' : renewable >= 60 ? '#FBBF24' : '#F87171' }}
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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: ARCHITECTURE — VIDEO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section id="architecture" className="relative py-28 md:py-40 overflow-hidden">
        <VideoBg src="/videos/infrastructure.mp4" overlay="bg-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('architecture.label')}</SectionLabel>
            <SectionTitle>{t('architecture.title')}</SectionTitle>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('architecture.subtitle')}</p>
          </FadeIn>

          <div className="relative">
            {archLayers.map(({ key, icon: Icon, color }, i) => (
              <FadeIn key={key} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.005, borderColor: `${color}30` }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-black/50 border border-white/[0.08] rounded-2xl p-8 md:p-10 mb-6 last:mb-0 overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${color}20, ${color}05)` }} />
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                      <Icon size={30} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em]" style={{ color }}>{t(`architecture.${key}.title`)}</h3>
                        <span className="text-[13px] text-white/40 font-medium">— {t(`architecture.${key}.subtitle`)}</span>
                      </div>
                      <p className="text-white/65 leading-[1.8] mb-6 mt-2">{t(`architecture.${key}.desc`)}</p>
                      <div className="flex flex-wrap gap-2">
                        {splitList(t(`architecture.${key}.specs`)).map((spec) => (
                          <span key={spec} className="text-[12px] px-3.5 py-1.5 rounded-lg border text-white/60 font-medium"
                            style={{ borderColor: `${color}20`, backgroundColor: `${color}08` }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
                      <div className="w-8 h-8 rounded-full bg-black/60 border border-white/[0.1] flex items-center justify-center backdrop-blur-sm">
                        <ArrowRight size={14} className="text-white/40 rotate-90" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: OPEN SOURCE ECOSYSTEM — WHITE BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('opensource.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('opensource.title')}
            </h2>
            <p className="text-[#555555] text-lg max-w-3xl leading-relaxed mb-6">
              {t('opensource.subtitle')}
            </p>
            <p className="text-[#777777] text-[15px] max-w-3xl leading-relaxed mb-20">
              {t('opensource.desc')}
            </p>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { num: 9, label: t('opensource.statRepos') },
                { num: 5, label: t('opensource.statLanguages') },
                { num: 3, label: t('opensource.statRegistries') },
                { num: 7, label: t('opensource.statOpenSource') },
              ].map(({ num, label }) => (
                <div key={label} className="bg-[#F5F5F5] rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-[#111] stat-mono mb-1">{num}</p>
                  <p className="text-[13px] text-[#777]">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Repo cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map(({ key, lang, langColor, license, url, icon: RepoIcon }, i) => (
              <FadeIn key={key} delay={i * 0.06}>
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, borderColor: 'rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.2 }}
                  className="block bg-white border border-[#E5E5E5] rounded-2xl p-6 h-full group shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
                      <RepoIcon size={18} className="text-[#555]" />
                    </div>
                    <ArrowUpRight size={16} className="text-[#BBBBBB] group-hover:text-[#555] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-[#111] mb-2">{t(`repos.${key}.name`)}</h3>
                  <p className="text-[13px] text-[#777] leading-relaxed mb-4">{t(`repos.${key}.desc`)}</p>
                  <div className="flex items-center gap-3">
                    <LangBadge lang={lang} color={langColor} />
                    <span className="text-[11px] text-[#AAAAAA]">{license}</span>
                  </div>
                </motion.a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: PYTHON SDK — LIGHT GRAY
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F8F8F8] py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <SectionLabel>{t('sdkPython.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-6">
                {t('sdkPython.title')}
              </h2>
              <p className="text-[#555] text-[15px] leading-[1.8] mb-8">
                {t('sdkPython.desc')}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {splitList(t('sdkPython.features')).map((f) => (
                  <span key={f} className="text-[12px] px-3 py-1.5 rounded-lg bg-[#3572A5]/10 text-[#3572A5] font-medium border border-[#3572A5]/15">
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <code className="text-sm bg-[#111] text-white px-4 py-2.5 rounded-lg font-mono">pip install harchos</code>
                <span className="text-[12px] text-[#999]">v0.2.1 on PyPI</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <CodeBlock title="main.py" lang="python">
{`from harchos import HarchOS

client = HarchOS(api_key="hsk_...")

# OpenAI-compatible inference
response = client.chat.completions.create(
    model="harchos/h100-llama3",
    messages=[{"role": "user", "content": "Hello"}],
    region="morocco",
    sovereignty="strict"
)

# Built-in carbon tracking
print(response.carbon_footprint.gco2)    # e.g. 2.4
print(response.carbon_footprint.renewable) # e.g. 0.97
print(response.carbon_footprint.hub)     # e.g. "ouarzazate"`}
              </CodeBlock>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: TYPESCRIPT SDK — WHITE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="lg:order-2">
                <SectionLabel>{t('sdkJs.label')}</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-6">
                  {t('sdkJs.title')}
                </h2>
                <p className="text-[#555] text-[15px] leading-[1.8] mb-8">
                  {t('sdkJs.desc')}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {splitList(t('sdkJs.features')).map((f) => (
                    <span key={f} className="text-[12px] px-3 py-1.5 rounded-lg bg-[#2B7489]/10 text-[#2B7489] font-medium border border-[#2B7489]/15">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <code className="text-sm bg-[#111] text-white px-4 py-2.5 rounded-lg font-mono">npm install @harchos/sdk</code>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="lg:order-1">
                <CodeBlock title="app.ts" lang="typescript">
{`import { HarchOSClient } from "@harchos/sdk";

const client = new HarchOSClient({
  apiKey: "hsk_...",
  region: "morocco",
  sovereignty: "strict",
  carbonAware: true   // default: true
});

// Carbon intensity query
const intensity = await client.carbon
  .getIntensity("MA");
console.log(intensity.gco2PerKwh); // ~47

// Find optimal hub
const hub = await client.carbon
  .optimalHub({ gpus: 8, type: "H100" });

// Deploy workload
const workload = await client.workloads
  .create({ image: "pytorch/pytorch", gpus: 4 });`}
                </CodeBlock>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8: CLI — DARK TERMINAL
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#00ADD8]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <SectionLabel>{t('cli.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                {t('cli.title')}
              </h2>
              <p className="text-[#CCCCCC] text-[15px] leading-[1.8] mb-8">
                {t('cli.desc')}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {splitList(t('cli.features')).map((f) => (
                  <span key={f} className="text-[12px] px-3 py-1.5 rounded-lg border text-[#CCCCCC] font-medium"
                    style={{ borderColor: '#00ADD820', backgroundColor: '#00ADD808' }}>
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <code className="text-sm bg-[#111] text-white px-4 py-2.5 rounded-lg font-mono">brew install HarchCorp/tap/harchos</code>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <CodeBlock title="terminal" lang="bash">
{`# Authenticate
$ harchos auth login
✓ Authenticated as user@harchcorp.com

# Deploy a workload
$ harchos workloads deploy \\
    --image pytorch/pytorch \\
    --gpus 8 --type H100 \\
    --region morocco \\
    --sovereignty strict

✓ Workload deployed to ouarzazate
  ID: wrk-7f3a2b1c
  Hub: ouarzazate (97% renewable)
  Carbon: ~2.1 gCO2/kWh

# Scale up
$ harchos workloads scale wrk-7f3a2b1c --gpus 16

# Migrate to greener hub
$ harchos workloads migrate wrk-7f3a2b1c --hub dakhla`}
              </CodeBlock>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9: TERRAFORM PROVIDER — DARK
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7B42BC]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="lg:order-2">
                <SectionLabel>{t('terraform.label')}</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                  {t('terraform.title')}
                </h2>
                <p className="text-[#CCCCCC] text-[15px] leading-[1.8] mb-8">
                  {t('terraform.desc')}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {splitList(t('terraform.features')).map((f) => (
                    <span key={f} className="text-[12px] px-3 py-1.5 rounded-lg border text-[#CCCCCC] font-medium"
                      style={{ borderColor: '#7B42BC20', backgroundColor: '#7B42BC08' }}>
                      {f}
                    </span>
                  ))}
                </div>
                <code className="text-sm bg-[#111] text-white px-4 py-2.5 rounded-lg font-mono inline-block">terraform init &amp;&amp; terraform apply</code>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="lg:order-1">
                <CodeBlock title="main.tf" lang="hcl">
{`terraform {
  required_providers {
    harchos = {
      source  = "HarchCorp/harchos"
      version = "~> 0.1"
    }
  }
}

# Deploy with strict sovereignty
resource "harchos_workload" "training" {
  name       = "llm-finetune"
  image      = "pytorch/pytorch:latest"
  gpus       = 8
  gpu_type   = "H100"
  region     = "morocco"
  sovereignty = "strict"  # cannot be downgraded

  carbon_aware = true
  max_gco2    = 50  # gCO2/kWh threshold
}

data "harchos_hubs" "available" {
  region = "morocco"
  min_renewable = 75
}`}
                </CodeBlock>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10: GRAFANA PLUGINS — PHOTO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <PhotoBg src="/images/real/intel-control-room.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('grafana.label')}</SectionLabel>
            <SectionTitle>{t('grafana.title')}</SectionTitle>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('grafana.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { key: 'datasource', icon: Database, color: '#F97316' },
              { key: 'gpuPanel', icon: Cpu, color: '#8B9DAF' },
              { key: 'carbonPanel', icon: Leaf, color: '#34D399' },
              { key: 'hubHealth', icon: Activity, color: '#38BDF8' },
              { key: 'workloadDist', icon: BarChart3, color: '#A78BFA' },
              { key: 'forecast', icon: TrendingDown, color: '#FBBF24' },
            ].map(({ key, icon: GIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${color}30` }}
                  className="bg-black/40 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-md h-full"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}12` }}>
                    <GIcon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{t(`grafana.${key}.title`)}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">{t(`grafana.${key}.desc`)}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="text-[12px] font-bold tracking-wide px-4 py-2 rounded-xl border border-[#F97316]/20 text-[#F97316] bg-[#F97316]/[0.06]">EnergyQL</span>
              <span className="text-[12px] font-bold tracking-wide px-4 py-2 rounded-xl border border-[#8B9DAF]/20 text-[#8B9DAF] bg-[#8B9DAF]/[0.06]">SovereigntyQL</span>
              <span className="text-[12px] font-bold tracking-wide px-4 py-2 rounded-xl border border-[#34D399]/20 text-[#34D399] bg-[#34D399]/[0.06]">PromQL</span>
              <span className="text-[12px] font-bold tracking-wide px-4 py-2 rounded-xl border border-[#38BDF8]/20 text-[#38BDF8] bg-[#38BDF8]/[0.06]">LogQL</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11: CARBON INTELLIGENCE — PHOTO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <PhotoBg src="/images/sections/energy-solar-farm.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('carbon.label')}</SectionLabel>
            <SectionTitle>{t('carbon.title')}</SectionTitle>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('carbon.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { key: 'realtime', icon: Activity, color: '#34D399' },
              { key: 'prediction', icon: Brain, color: '#A78BFA' },
              { key: 'routing', icon: Zap, color: '#F59E0B' },
              { key: 'reporting', icon: FileCheck, color: '#38BDF8' },
            ].map(({ key, icon: CIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${color}30` }}
                  className="bg-black/40 border border-white/[0.08] rounded-2xl p-8 backdrop-blur-md h-full"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}12` }}>
                    <CIcon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{t(`carbon.${key}.title`)}</h3>
                  <p className="text-white/55 text-[15px] leading-[1.8]">{t(`carbon.${key}.desc`)}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Carbon comparison */}
          <FadeIn delay={0.2}>
            <div className="bg-black/40 border border-white/[0.08] rounded-2xl p-8 md:p-10 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6">{t('carbon.comparison.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'us', color: '#F87171' },
                  { key: 'eu', color: '#FBBF24' },
                  { key: 'morocco', color: '#34D399' },
                ].map(({ key, color }) => (
                  <div key={key} className="text-center">
                    <p className="text-[13px] text-white/40 uppercase tracking-wider mb-2">{t(`carbon.comparison.${key}.label`)}</p>
                    <p className="text-4xl font-bold stat-mono" style={{ color }}>{t(`carbon.comparison.${key}.value`)}</p>
                    <p className="text-[12px] text-white/30 mt-1">{t(`carbon.comparison.${key}.unit`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12: SOVEREIGNTY MODEL — WHITE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('sovereignty.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('sovereignty.title')}
            </h2>
            <p className="text-[#555] text-lg max-w-2xl leading-relaxed mb-20">{t('sovereignty.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sovereigntyLevels.map(({ key, color, icon: SovIcon }, i) => (
              <FadeIn key={key} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4, borderColor: `${color}30` }}
                  className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 h-full"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}12` }}>
                    <SovIcon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#111] mb-3" style={{ color }}>{t(`sovereignty.${key}.title`)}</h3>
                  <div className="w-10 h-[2px] rounded-full mb-5" style={{ backgroundColor: `${color}30` }} />
                  <p className="text-[#555] text-[15px] leading-[1.8] mb-5">{t(`sovereignty.${key}.desc`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {splitList(t(`sovereignty.${key}.rules`)).map((rule) => (
                      <span key={rule} className="text-[11px] px-2.5 py-1 rounded-md font-medium border"
                        style={{ borderColor: `${color}20`, backgroundColor: `${color}06`, color }}>
                        {rule}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="bg-[#F5F5F5] rounded-2xl p-6 flex items-start gap-4">
              <Shield size={20} className="text-[#8B9DAF] shrink-0 mt-0.5" />
              <p className="text-[14px] text-[#555] leading-[1.7]">{t('sovereignty.rule')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13: TARGET SPECS — DARK
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8B9DAF]/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('specs.label')}</SectionLabel>
            <SectionTitle>{t('specs.title')}</SectionTitle>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('specs.subtitle')}</p>
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14: SECURITY & COMPLIANCE — DARK + PHOTO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#080808] py-28 md:py-40 overflow-hidden">
        <PhotoBg src="/images/real/intel-server-room.jpg" overlay="bg-[#080808]/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('security.label')}</SectionLabel>
            <SectionTitle>{t('security.title')}</SectionTitle>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 mb-14">
            {securityItems.map(({ key, icon: SecIcon, color }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${color}25` }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/40 border border-white/[0.08] rounded-2xl p-8 h-full backdrop-blur-md"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
                      <SecIcon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{t(`security.${key}.title`)}</h3>
                  </div>
                  <p className="text-white/55 text-[15px] leading-[1.8]">{t(`security.${key}.desc`)}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {splitList(t('security.badges')).map((badge) => (
                <span key={badge} className="text-[12px] font-bold tracking-wide px-5 py-2.5 rounded-xl border border-[#8B9DAF]/15 text-[#8B9DAF] bg-[#8B9DAF]/[0.04] hover:bg-[#8B9DAF]/[0.08] transition-colors cursor-default">
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15: ROADMAP — LIGHT
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FAFAFA] py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
              {t('roadmap.label')}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('roadmap.title')}
            </h2>
            <p className="text-[#555] text-lg mb-20">{t('roadmap.subtitle')}</p>
          </FadeIn>

          <div className="relative">
            <div className="hidden md:block absolute top-[35px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-[#8B9DAF]/20 via-[#E5E5E5] to-[#E5E5E5]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5">
              {roadmapPhases.map(({ key, status }, i) => {
                const isInProgress = status === 'inProgress';
                const phaseColor = isInProgress ? '#8B9DAF' : '#BBBBBB';
                return (
                  <FadeIn key={key} delay={i * 0.12}>
                    <div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                      <div className="shrink-0 md:mb-6 relative">
                        <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center border-2 z-10 ${
                          isInProgress
                            ? 'bg-[#8B9DAF]/10 border-[#8B9DAF]/40'
                            : 'bg-white border-[#E5E5E5]'
                        }`}>
                          {isInProgress ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8B9DAF] animate-pulse" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
                          )}
                        </div>
                        {i < 3 && (
                          <div className="md:hidden absolute top-[44px] left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#E5E5E5]" />
                        )}
                      </div>

                      <motion.div
                        whileHover={{ y: -3, borderColor: isInProgress ? 'rgba(139,157,175,0.25)' : 'rgba(0,0,0,0.08)' }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 md:w-full bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-[#111]">{t(`roadmap.${key}.title`)}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isInProgress
                              ? 'bg-[#8B9DAF]/10 text-[#8B9DAF] border border-[#8B9DAF]/20'
                              : 'bg-[#F5F5F5] text-[#999] border border-[#E5E5E5]'
                          }`}>
                            {isInProgress ? t('roadmap.inProgress') : t('roadmap.planned')}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#8B9DAF] font-semibold mb-4 stat-mono">{t(`roadmap.${key}.period`)}</p>
                        <ul className="space-y-2.5">
                          {splitList(t(`roadmap.${key}.items`)).map((item) => (
                            <li key={item} className="text-[13px] text-[#555] flex items-start gap-2.5 leading-relaxed">
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

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 16: GITHUB REPOS SHOWCASE — DARK
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#34D399]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('reposLabel')}</SectionLabel>
            <SectionTitle>{t('repos.title')}</SectionTitle>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('repos.subtitle')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {repos.map(({ key, lang, langColor, license, url, icon: RepoIcon }, i) => (
              <FadeIn key={key} delay={i * 0.07}>
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, borderColor: `${langColor}30` }}
                  transition={{ duration: 0.2 }}
                  className="block bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${langColor}12` }}>
                        <RepoIcon size={18} style={{ color: langColor }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{t(`repos.${key}.name`)}</h3>
                        <p className="text-[11px] text-[#666]">HarchCorp/{t(`repos.${key}.name`).replace('HarchOS ', '').toLowerCase().replace(' ', '-')}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#444] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[13px] text-[#999] leading-relaxed mb-4">{t(`repos.${key}.desc`)}</p>
                  <div className="flex items-center gap-3">
                    <LangBadge lang={lang} color={langColor} />
                    <span className="text-[11px] text-[#555]">{license}</span>
                  </div>
                </motion.a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <a
                href="https://github.com/HarchCorp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/[0.12] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all"
              >
                <Github size={16} />
                {t('repos.viewAll')}
                <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 17: CTA — VIDEO BACKGROUND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <VideoBg src="/videos/hero.mp4" overlay="bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-8">
              {t('cta.title')}
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-14 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 px-9 py-4.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
              >
                {t('cta.primary')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://github.com/HarchCorp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-9 py-4.5 border border-white/[0.2] text-white text-sm font-semibold rounded-xl hover:bg-white/[0.08] hover:border-white/[0.3] transition-all backdrop-blur-sm"
              >
                <Github size={16} />
                {t('cta.github')}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
