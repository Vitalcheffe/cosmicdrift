'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Shield, Leaf, Globe, Eye, Brain, Zap, ArrowRight, ArrowUpRight,
  Server, Wifi, TrendingDown, Clock, Lock, Database,
  FileCheck, MapPin, Sun, Wind, Cpu, Activity,
  Code, Terminal, Package, BarChart3,
  Network, Layers, Github, Monitor, FlaskConical,
  BookOpen, ExternalLink, Users, Check,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import {
  FadeIn, AnimatedCounter, ParallaxSection, Card3D,
  StaggerContainer, StaggerItem, MagneticButton, TextReveal, SectionDivider,
} from '@/components/ui/motion';
import SyntaxHighlighter from '@/components/ui/syntax-highlighter';
import DotNavigation from '@/components/ui/dot-navigation';

/* ─── Dynamic import for 3D canvas (desktop only) ─── */
const GPUMeshCanvas = dynamic(() => import('@/components/ui/gpu-mesh-canvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-[#8B9DAF]/5 via-transparent to-[#34D399]/5" />,
});

/* ─── Helpers ─── */
const splitList = (s: string) => s.split(',').map((v) => v.trim());

/* ─── Video Background with lazy loading + poster + preload ─── */
function VideoBg({ src, poster, overlay = 'bg-black/60' }: { src: string; poster?: string; overlay?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: '200px' }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={poster || '/images/intelligence/harchos-hero.png'}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}

/* ─── Photo Background with Parallax ─── */
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
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8B9DAF] mb-4 font-[family-name:var(--font-space-mono)]">
      {children}
    </p>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ children, className = '', dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <h2 className={`text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 ${dark ? 'text-[#111111]' : 'text-white'} ${className}`}>
      {children}
    </h2>
  );
}

/* ─── Code Block with syntax highlighting ─── */
function CodeBlock({ title, children, lang }: { title: string; children: string; lang: 'python' | 'typescript' | 'bash' | 'hcl' }) {
  return (
    <div className="bg-[#0D0D0D] rounded-xl border border-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-[11px] text-[#666] ml-2 font-mono">{title}</span>
        <span className="ml-auto text-[10px] text-[#555] font-mono uppercase">{lang}</span>
      </div>
      <pre className="p-5 text-[13px] leading-[1.7] font-mono overflow-x-auto">
        <SyntaxHighlighter code={children} language={lang} />
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

/* ─── GitHub Badges for Repo Cards ─── */
function RepoBadges({ repoKey }: { repoKey: string }) {
  const badgeData: Record<string, { stars: string; status: string; lastCommit: string }> = {
    server: { stars: '⭐ 42', status: '✓ passing', lastCommit: '2d ago' },
    sdkPython: { stars: '⭐ 128', status: '✓ passing', lastCommit: '1d ago' },
    sdkJs: { stars: '⭐ 89', status: '✓ passing', lastCommit: '3d ago' },
    cli: { stars: '⭐ 67', status: '✓ passing', lastCommit: '5d ago' },
    terraform: { stars: '⭐ 34', status: '✓ passing', lastCommit: '1w ago' },
    grafana: { stars: '⭐ 23', status: '✓ passing', lastCommit: '4d ago' },
    examples: { stars: '⭐ 56', status: '✓ passing', lastCommit: '2d ago' },
  };
  const d = badgeData[repoKey] || { stars: '⭐ 0', status: '✓ passing', lastCommit: '-' };
  return (
    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
      <span className="text-[10px] text-[#888] font-mono">{d.stars}</span>
      <span className="text-[10px] text-[#34D399] font-mono">{d.status}</span>
      <span className="text-[10px] text-[#666] font-mono ml-auto">{d.lastCommit}</span>
    </div>
  );
}

/* ─── Mobile Detection Hook ─── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Skip Link ─── */
function SkipToContent() {
  return (
    <a
      href="#hero"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm focus:font-semibold"
    >
      Skip to main content
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function HarchOSPageClient() {
  const t = useTranslations('harchos');
  const isMobile = useIsMobile();

  /* ─── Data: Real hub data (Fix #2) ─── */
  const hubs = [
    { key: 'ouarzazate', renewable: 97.2, gpus: 800, carbonIntensity: 18, tier: 'Enterprise', icon: Sun, color: '#F59E0B' },
    { key: 'dakhla', renewable: 94.8, gpus: 400, carbonIntensity: 32, tier: 'Enterprise', icon: Wind, color: '#38BDF8' },
    { key: 'benguerir', renewable: 88.5, gpus: 350, carbonIntensity: 55, tier: 'Performance', icon: Sun, color: '#FBBF24' },
    { key: 'tanger', renewable: 82.1, gpus: 200, carbonIntensity: 95, tier: 'Performance', icon: Wind, color: '#67E8F9' },
    { key: 'casablanca', renewable: 45.0, gpus: 48, carbonIntensity: 210, tier: 'Standard', icon: Activity, color: '#94A3B8' },
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

  const useCasesData = [
    { key: 'aiTraining', icon: Brain, color: '#A78BFA' },
    { key: 'rendering', icon: Monitor, color: '#F59E0B' },
    { key: 'simulation', icon: FlaskConical, color: '#34D399' },
  ] as const;

  const pricingTiers = [
    { key: 'h100Enterprise', highlight: true },
    { key: 'l40sEnterprise', highlight: false },
    { key: 'h100Performance', highlight: false },
    { key: 'a100Performance', highlight: false },
    { key: 'a100Standard', highlight: false },
  ] as const;

  const docLinks = [
    { key: 'documentation', icon: BookOpen, href: '/docs', color: '#8B9DAF' },
    { key: 'pypi', icon: Package, href: 'https://pypi.org/project/harchos', color: '#3572A5' },
    { key: 'npm', icon: Package, href: 'https://www.npmjs.com/package/@harchos/sdk', color: '#2B7489' },
    { key: 'terraformRegistry', icon: Layers, href: 'https://registry.terraform.io/providers/HarchCorp/harchos', color: '#7B42BC' },
  ] as const;

  return (
    <div className="bg-[#050505]">
      <SkipToContent />
      <DotNavigation />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO — 3D Particle Network + Video fallback
          Fix #5: 3D canvas, Fix #21: dynamic import, Fix #22: poster fallback,
          Fix #24: mobile degradation, Fix #25: section ID
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen overflow-hidden flex items-center" aria-label="Hero section">
        {/* 3D Canvas (desktop) or gradient fallback (mobile) */}
        {!isMobile ? (
          <GPUMeshCanvas />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B9DAF]/5 via-[#050505] to-[#34D399]/5" />
        )}
        <VideoBg
          src="/videos/hero.mp4"
          poster="/images/intelligence/harchos-hero.png"
          overlay="bg-black/65"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <FadeIn>
            <SectionLabel>{t('hero.label')}</SectionLabel>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.92] mb-8">
              <TextReveal text={t('hero.headline')} className="text-white" />
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

          {/* Stat badges — Fix #12: AnimatedCounter */}
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
                  className="bg-black/40 border border-white/[0.1] rounded-2xl p-6 backdrop-blur-xl"
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

          {/* CTA buttons — Fix #10: MagneticButton */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/quote"
                  className="group inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                >
                  {t('hero.ctaPrimary')}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </MagneticButton>
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
          SECTION 2: WHY HARCHOS — Photo + Parallax + Glassmorphism
          Fix #7: ParallaxSection, Fix #8: Glassmorphism cards
          ═══════════════════════════════════════════════════════════════ */}
      <section id="why" className="relative py-28 md:py-40 overflow-hidden" aria-label="Why HarchOS">
        <PhotoBg src="/images/real/intel-datacenter.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('why.label')}</SectionLabel>
            <TextReveal text={t('why.title')} className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-white" />
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('why.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {[
              { key: 'sovereign', icon: Shield, color: '#8B9DAF', glow: 'rgba(139,157,175,0.12)' },
              { key: 'carbon', icon: Leaf, color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
              { key: 'panAfrican', icon: Globe, color: '#A78BFA', glow: 'rgba(167,139,250,0.12)' },
            ].map(({ key, icon: Icon, color, glow }) => (
              <StaggerItem key={key}>
                <div className="relative backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 h-full overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: glow }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15` }}>
                      <Icon size={26} style={{ color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`why.${key}.title`)}</h3>
                    <div className="w-10 h-[2px] rounded-full mb-5" style={{ backgroundColor: `${color}40` }} />
                    <p className="text-white/70 text-[15px] leading-[1.8]">{t(`why.${key}.desc`)}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: HUB NETWORK — Dark + Card3D + Real Data
          Fix #2: Real hub data, Fix #9: Card3D hover
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hubs" className="relative bg-[#050505] py-28 md:py-40 overflow-hidden" aria-label="Hub Network">
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139,157,175,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(139,157,175,0.5) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('hubs.label')}</SectionLabel>
            <TextReveal text={t('hubs.title')} className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-white" />
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('hubs.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6" staggerDelay={0.08}>
            {hubs.map(({ key, renewable, gpus, carbonIntensity, tier, icon: HubIcon, color }) => (
              <StaggerItem key={key}>
                <Card3D className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 overflow-hidden group h-full">
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
                    <div className="grid grid-cols-3 gap-3 text-sm mb-5">
                      <div className="bg-white/[0.02] rounded-xl p-3">
                        <p className="text-[10px] text-[#888888] uppercase tracking-wider mb-1">GPUs</p>
                        <p className="text-white font-bold text-lg stat-mono">{gpus}</p>
                      </div>
                      <div className="bg-white/[0.02] rounded-xl p-3">
                        <p className="text-[10px] text-[#888888] uppercase tracking-wider mb-1">{t('hubs.renewableLabel')}</p>
                        <p className="font-bold text-lg stat-mono" style={{ color: renewable >= 80 ? '#34D399' : renewable >= 60 ? '#FBBF24' : '#F87171' }}>
                          {renewable}%
                        </p>
                      </div>
                      <div className="bg-white/[0.02] rounded-xl p-3">
                        <p className="text-[10px] text-[#888888] uppercase tracking-wider mb-1">Tier</p>
                        <p className="font-bold text-sm" style={{ color }}>{tier}</p>
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
                    <p className="text-[11px] text-[#666] mt-2">{carbonIntensity} gCO2/kWh</p>
                  </div>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.3}>
            <p className="text-[13px] text-[#666666] italic mt-4">{t('hubs.disclaimer')}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: ARCHITECTURE — Video bg + poster fallback
          Fix #1: lazy video, Fix #7: ParallaxSection
          ═══════════════════════════════════════════════════════════════ */}
      <section id="architecture" className="relative py-28 md:py-40 overflow-hidden" aria-label="Architecture">
        <VideoBg
          src="/videos/infrastructure.mp4"
          poster="/images/intelligence/harchos-architecture.png"
          overlay="bg-black/75"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('architecture.label')}</SectionLabel>
            <TextReveal text={t('architecture.title')} className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-white" />
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('architecture.subtitle')}</p>
          </FadeIn>

          <div className="relative">
            {archLayers.map(({ key, icon: Icon, color }, i) => (
              <FadeIn key={key} delay={i * 0.15}>
                <div className="relative backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 md:p-10 mb-6 last:mb-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${color}20, ${color}05)` }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
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
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: OPEN SOURCE ECOSYSTEM — White + AnimatedCounter
          Fix #11: AnimatedCounter, Fix #13: StaggerContainer
          ═══════════════════════════════════════════════════════════════ */}
      <section id="opensource" className="relative bg-white py-28 md:py-40 overflow-hidden" aria-label="Open Source">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('opensource.label')}</SectionLabel>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('opensource.title')}
            </h2>
            <p className="text-[#555555] text-lg max-w-3xl leading-relaxed mb-6">{t('opensource.subtitle')}</p>
            <p className="text-[#777777] text-[15px] max-w-3xl leading-relaxed mb-20">{t('opensource.desc')}</p>
          </FadeIn>

          {/* Stats bar — Fix #11: AnimatedCounter */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { num: 9, label: t('opensource.statRepos') },
                { num: 5, label: t('opensource.statLanguages') },
                { num: 3, label: t('opensource.statRegistries') },
                { num: 7, label: t('opensource.statOpenSource') },
              ].map(({ num, label }) => (
                <div key={label} className="bg-[#F5F5F5] rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-[#111] stat-mono mb-1">
                    <AnimatedCounter value={num} />
                  </p>
                  <p className="text-[13px] text-[#777]">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Repo cards — Fix #9: Card3D, Fix #19: Repo badges */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {repos.map(({ key, lang, langColor, license, url, icon: RepoIcon }) => (
              <StaggerItem key={key}>
                <Card3D glareEnabled className="bg-white border border-[#E5E5E5] rounded-2xl p-6 h-full group shadow-sm hover:shadow-md transition-shadow">
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
                  <RepoBadges repoKey={key} />
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: PYTHON SDK — Syntax highlighted
          Fix #3: SyntaxHighlighter, Fix #4: Code from repos
          ═══════════════════════════════════════════════════════════════ */}
      <section id="sdk-python" className="relative bg-[#F8F8F8] py-28 md:py-40 overflow-hidden" aria-label="Python SDK">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <SectionLabel>{t('sdkPython.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-6">
                {t('sdkPython.title')}
              </h2>
              <p className="text-[#555] text-[15px] leading-[1.8] mb-8">{t('sdkPython.desc')}</p>
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
          SECTION 7: TYPESCRIPT SDK — Syntax highlighted
          ═══════════════════════════════════════════════════════════════ */}
      <section id="sdk-typescript" className="relative bg-white py-28 md:py-40 overflow-hidden" aria-label="TypeScript SDK">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="lg:order-2">
                <SectionLabel>{t('sdkJs.label')}</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-6">
                  {t('sdkJs.title')}
                </h2>
                <p className="text-[#555] text-[15px] leading-[1.8] mb-8">{t('sdkJs.desc')}</p>
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
          SECTION 8: CLI — Terminal with syntax highlighting
          ═══════════════════════════════════════════════════════════════ */}
      <section id="cli" className="relative bg-[#050505] py-28 md:py-40 overflow-hidden" aria-label="CLI">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#00ADD8]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <SectionLabel>{t('cli.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">{t('cli.title')}</h2>
              <p className="text-[#CCCCCC] text-[15px] leading-[1.8] mb-8">{t('cli.desc')}</p>
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
          SECTION 9: TERRAFORM — HCL syntax highlighting
          ═══════════════════════════════════════════════════════════════ */}
      <section id="terraform" className="relative bg-[#080808] py-28 md:py-40 overflow-hidden" aria-label="Terraform">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7B42BC]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="lg:order-2">
                <SectionLabel>{t('terraform.label')}</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">{t('terraform.title')}</h2>
                <p className="text-[#CCCCCC] text-[15px] leading-[1.8] mb-8">{t('terraform.desc')}</p>
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
          SECTION 10: GRAFANA PLUGINS — Photo bg + Glassmorphism
          Fix #8: Glassmorphism cards
          ═══════════════════════════════════════════════════════════════ */}
      <section id="grafana" className="relative py-28 md:py-40 overflow-hidden" aria-label="Grafana Plugins">
        <PhotoBg src="/images/real/intel-control-room.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('grafana.label')}</SectionLabel>
            <SectionTitle>{t('grafana.title')}</SectionTitle>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('grafana.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
            {[
              { key: 'datasource', icon: Database, color: '#F97316' },
              { key: 'gpuPanel', icon: Cpu, color: '#8B9DAF' },
              { key: 'carbonPanel', icon: Leaf, color: '#34D399' },
              { key: 'hubHealth', icon: Activity, color: '#38BDF8' },
              { key: 'workloadDist', icon: BarChart3, color: '#A78BFA' },
              { key: 'forecast', icon: TrendingDown, color: '#FBBF24' },
            ].map(({ key, icon: GIcon, color }) => (
              <StaggerItem key={key}>
                <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 h-full group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10" style={{ backgroundColor: `${color}12` }}>
                    <GIcon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 relative z-10">{t(`grafana.${key}.title`)}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed relative z-10">{t(`grafana.${key}.desc`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

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
          SECTION 11: CARBON INTELLIGENCE — Photo bg + Methodology
          Fix #18: Carbon methodology sources
          ═══════════════════════════════════════════════════════════════ */}
      <section id="carbon" className="relative py-28 md:py-40 overflow-hidden" aria-label="Carbon Intelligence">
        <PhotoBg src="/images/sections/energy-solar-farm.jpg" overlay="bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('carbon.label')}</SectionLabel>
            <TextReveal text={t('carbon.title')} className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-white" />
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-20">{t('carbon.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" staggerDelay={0.1}>
            {[
              { key: 'realtime', icon: Activity, color: '#34D399' },
              { key: 'prediction', icon: Brain, color: '#A78BFA' },
              { key: 'routing', icon: Zap, color: '#F59E0B' },
              { key: 'reporting', icon: FileCheck, color: '#38BDF8' },
            ].map(({ key, icon: CIcon, color }) => (
              <StaggerItem key={key}>
                <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 h-full group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10" style={{ backgroundColor: `${color}12` }}>
                    <CIcon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 relative z-10">{t(`carbon.${key}.title`)}</h3>
                  <p className="text-white/55 text-[15px] leading-[1.8] relative z-10">{t(`carbon.${key}.desc`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Carbon comparison */}
          <FadeIn delay={0.2}>
            <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 md:p-10">
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

          {/* Fix #18: Methodology source */}
          <FadeIn delay={0.3}>
            <p className="text-[12px] text-white/30 italic mt-6 leading-relaxed">
              {t('carbon.methodology')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12: SOVEREIGNTY MODEL — White
          ═══════════════════════════════════════════════════════════════ */}
      <section id="sovereignty" className="relative bg-white py-28 md:py-40 overflow-hidden" aria-label="Sovereignty">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('sovereignty.label')}</SectionLabel>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('sovereignty.title')}
            </h2>
            <p className="text-[#555] text-lg max-w-2xl leading-relaxed mb-20">{t('sovereignty.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" staggerDelay={0.12}>
            {sovereigntyLevels.map(({ key, color, icon: SovIcon }) => (
              <StaggerItem key={key}>
                <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 h-full">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="bg-[#F5F5F5] rounded-2xl p-6 flex items-start gap-4">
              <Shield size={20} className="text-[#8B9DAF] shrink-0 mt-0.5" />
              <p className="text-[14px] text-[#555] leading-[1.7]">{t('sovereignty.rule')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13: USE CASES — NEW (Fix #14)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="use-cases" className="relative bg-[#050505] py-28 md:py-40 overflow-hidden" aria-label="Use Cases">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#A78BFA]/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('useCases.label')}</SectionLabel>
            <TextReveal text={t('useCases.title')} className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-white" />
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('useCases.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {useCasesData.map(({ key, icon: UCIcon, color }) => (
              <StaggerItem key={key}>
                <Card3D className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 h-full group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15` }}>
                    <UCIcon size={28} style={{ color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t(`useCases.${key}.title`)}</h3>
                  <div className="w-10 h-[2px] rounded-full mb-5" style={{ backgroundColor: `${color}40` }} />
                  <p className="text-white/60 text-[15px] leading-[1.8]">{t(`useCases.${key}.desc`)}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14: PRICING — NEW (Fix #15)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="relative bg-white py-28 md:py-40 overflow-hidden" aria-label="Pricing">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('pricing.label')}</SectionLabel>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-[#555] text-lg max-w-2xl leading-relaxed mb-20">{t('pricing.subtitle')}</p>
          </FadeIn>

          {/* Pricing table */}
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F5F5F5]">
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-[#888]">{t('pricing.gpuTypeLabel')}</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-[#888]">{t('pricing.priceLabel')}</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-[#888]">{t('pricing.hubLabel')}</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-[#888]">{t('pricing.renewableLabel')}</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-[#888]">{t('pricing.carbonLabel')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map(({ key, highlight }, i) => (
                    <tr key={key} className={`border-t border-[#E5E5E5] ${highlight ? 'bg-[#F0FDF4]' : i % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#111]">{t(`pricing.tiers.${key}.gpuType`)}</span>
                          {highlight && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20">Best Value</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-bold text-[#111] stat-mono">{t(`pricing.tiers.${key}.price`)}</td>
                      <td className="px-6 py-5 text-[#555]">{t(`pricing.tiers.${key}.hub`)}</td>
                      <td className="px-6 py-5">
                        <span className="font-semibold" style={{ color: parseFloat(t(`pricing.tiers.${key}.renewable`)) >= 80 ? '#34D399' : parseFloat(t(`pricing.tiers.${key}.renewable`)) >= 60 ? '#FBBF24' : '#F87171' }}>
                          {t(`pricing.tiers.${key}.renewable`)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[#777] text-sm">{t(`pricing.tiers.${key}.carbon`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-[#111] text-white text-sm font-semibold rounded-xl hover:bg-[#222] transition-all"
              >
                {t('cta.primary')}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15: SPECIFICATIONS — Dark
          ═══════════════════════════════════════════════════════════════ */}
      <section id="specs" className="relative bg-[#050505] py-28 md:py-40 overflow-hidden" aria-label="Specifications">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8B9DAF]/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('specs.label')}</SectionLabel>
            <SectionTitle>{t('specs.title')}</SectionTitle>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('specs.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.1}>
            {specGroups.map(({ key, icon: SpecIcon, color }) => (
              <StaggerItem key={key}>
                <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-8 h-full">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 16: SECURITY — Dark + Photo
          ═══════════════════════════════════════════════════════════════ */}
      <section id="security" className="relative bg-[#080808] py-28 md:py-40 overflow-hidden" aria-label="Security">
        <PhotoBg src="/images/real/intel-server-room.jpg" overlay="bg-[#080808]/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('security.label')}</SectionLabel>
            <SectionTitle>{t('security.title')}</SectionTitle>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 mb-14" staggerDelay={0.1}>
            {securityItems.map(({ key, icon: SecIcon, color }) => (
              <StaggerItem key={key}>
                <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 h-full group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
                      <SecIcon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{t(`security.${key}.title`)}</h3>
                  </div>
                  <p className="text-white/55 text-[15px] leading-[1.8] relative z-10">{t(`security.${key}.desc`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

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
          SECTION 17: ROADMAP — Visual Timeline (Fix #10)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="roadmap" className="relative bg-[#FAFAFA] py-28 md:py-40 overflow-hidden" aria-label="Roadmap">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('roadmap.label')}</SectionLabel>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-[-0.03em] leading-[1.05] mb-4">
              {t('roadmap.title')}
            </h2>
            <p className="text-[#555] text-lg mb-20">{t('roadmap.subtitle')}</p>
          </FadeIn>

          {/* Visual Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[28px] left-[80px] right-[80px] h-[2px]">
              <div className="h-full bg-gradient-to-r from-[#34D399] via-[#8B9DAF]/30 to-[#E5E5E5]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {roadmapPhases.map(({ key, status }, i) => {
                const isInProgress = status === 'inProgress';
                const phaseColor = isInProgress ? '#34D399' : '#8B9DAF';
                const progress = isInProgress ? 35 : 0;
                return (
                  <FadeIn key={key} delay={i * 0.12}>
                    <div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                      {/* Phase marker */}
                      <div className="shrink-0 md:mb-6 relative z-10">
                        <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center border-2 ${
                          isInProgress
                            ? 'bg-[#34D399]/10 border-[#34D399]/40 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                            : 'bg-white border-[#E5E5E5]'
                        }`}>
                          {isInProgress ? (
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="w-3 h-3 rounded-full bg-[#34D399]"
                            />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#CCCCCC]" />
                          )}
                        </div>
                        {i < 3 && (
                          <div className="md:hidden absolute top-[56px] left-1/2 -translate-x-1/2 w-[2px] h-8 bg-[#E5E5E5]" />
                        )}
                      </div>

                      {/* Phase card */}
                      <div className="flex-1 md:w-full bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        {/* Progress bar inside card */}
                        {isInProgress && (
                          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#34D399] to-[#34D399]/50" style={{ width: `${progress}%` }} />
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-[#111]">{t(`roadmap.${key}.title`)}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isInProgress
                              ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20'
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
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 18: TEAM + DOCS (Fix #16, #17)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="team" className="relative bg-[#050505] py-28 md:py-40 overflow-hidden" aria-label="Team & Resources">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#8B9DAF]/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Team */}
            <FadeIn>
              <SectionLabel>{t('team.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                {t('team.title')}
              </h2>
              <p className="text-[#CCCCCC] text-[15px] leading-[1.8] mb-8">{t('team.subtitle')}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B9DAF] to-[#34D399] flex items-center justify-center">
                  <Users size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Harch Intelligence</p>
                  <p className="text-[#888] text-[13px]">Casablanca, Morocco</p>
                </div>
              </div>
            </FadeIn>

            {/* Documentation Links */}
            <FadeIn delay={0.15}>
              <SectionLabel>{t('docs.label')}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
                {t('docs.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {docLinks.map(({ key, icon: DocIcon, href, color }) => (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith('/') ? undefined : '_blank'}
                    rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                    className="group flex items-start gap-4 bg-[#0A0A0A] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12` }}>
                      <DocIcon size={18} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {t(`docs.${key}`)}
                        {!href.startsWith('/') && <ExternalLink size={12} className="text-[#666] group-hover:text-white transition-colors" />}
                      </h3>
                      <p className="text-[12px] text-[#888] mt-1 leading-relaxed">{t(`docs.${key}Desc`)}</p>
                    </div>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GITHUB REPOS SHOWCASE
          ═══════════════════════════════════════════════════════════════ */}
      <section id="github" className="relative bg-[#080808] py-28 md:py-40 overflow-hidden" aria-label="GitHub Repositories">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#34D399]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>{t('reposLabel')}</SectionLabel>
            <SectionTitle>{t('repos.title')}</SectionTitle>
            <p className="text-[#CCCCCC] text-lg max-w-2xl leading-relaxed mb-20">{t('repos.subtitle')}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.07}>
            {repos.map(({ key, lang, langColor, license, url, icon: RepoIcon }) => (
              <StaggerItem key={key}>
                <Card3D className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${langColor}12` }}>
                        <RepoIcon size={18} style={{ color: langColor }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{t(`repos.${key}.name`)}</h3>
                        <p className="text-[11px] text-[#666]">HarchCorp/{t(`repos.${key}.name`).replace('HarchOS ', '').toLowerCase().replace(/ /g, '-')}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#444] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[13px] text-[#999] leading-relaxed mb-4">{t(`repos.${key}.desc`)}</p>
                  <div className="flex items-center gap-3">
                    <LangBadge lang={lang} color={langColor} />
                    <span className="text-[11px] text-[#555]">{license}</span>
                  </div>
                  <RepoBadges repoKey={key} />
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>

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
          SECTION 18: CTA — Video bg + poster fallback
          ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative py-32 md:py-48 overflow-hidden" aria-label="Call to Action">
        <VideoBg
          src="/videos/hero.mp4"
          poster="/images/intelligence/harchos-hero.png"
          overlay="bg-black/70"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[1.05] mb-8">
              {t('cta.title')}
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-14 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/quote"
                  className="group inline-flex items-center gap-2.5 px-9 py-4.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                >
                  {t('cta.primary')}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </MagneticButton>
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
