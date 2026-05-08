'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowRight, Cpu, Zap, Globe, Shield, BarChart3, Wheat, Droplets,
  Plane, Radio, Building2, Leaf, MapPin, TrendingUp, Clock, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const HeroScene = dynamic(() => import('@/components/harchagri/HeroScene'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/harchagri/ParticleField'), { ssr: false });
const AfricaMap = dynamic(() => import('@/components/harchagri/AfricaMap'), { ssr: false });
const IoTDashboard = dynamic(() => import('@/components/harchagri/IoTDashboard'), { ssr: false });

/* ─── FADE IN — Palantir standard animation (enhanced) ─── */
function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stagger = false,
  staggerDelay = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  stagger?: boolean;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const directionOffset = {
    up: { x: 0, y: 40 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 1.02 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: offset.x, y: offset.y, scale: 1.02 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {stagger && React.Children.count(children) > 1
        ? React.Children.map(children, (child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: delay + i * staggerDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

/* ─── SECTION LABEL with extending line ─── */
function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className={`flex items-center gap-3 mb-4 ${className}`}>
      <motion.p
        className="section-label !mb-0"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.p>
      <motion.div
        className="h-px bg-white/20"
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  const format = () => {
    if (target >= 1000) return `${prefix}${Math.round(count).toLocaleString()}${suffix}`;
    if (target < 10) return `${prefix}${count.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(count)}${suffix}`;
  };
  return <span ref={ref}>{format()}</span>;
}

/* ─── MICRO COUNT UP — for hover-activated counters ─── */
function MicroCountUp({ value, isActive }: { value: string; isActive: boolean }) {
  const numericMatch = value.match(/([\d,]+)/);
  if (!numericMatch) return <>{value}</>;
  const numericStr = numericMatch[1];
  const numericVal = parseInt(numericStr.replace(/,/g, ''), 10);
  const prefix = value.substring(0, value.indexOf(numericStr));
  const suffix = value.substring(value.indexOf(numericStr) + numericStr.length);
  const [display, setDisplay] = useState(isActive ? numericVal : 0);
  const prevActive = useRef(isActive);

  useEffect(() => {
    if (isActive && !prevActive.current) {
      const duration = 400;
      const startTime = Date.now();
      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * numericVal));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    prevActive.current = isActive;
  }, [isActive, numericVal]);

  useEffect(() => {
    if (!isActive) setDisplay(0);
  }, [isActive]);

  const formatted = display.toLocaleString();
  return <>{prefix}{formatted}{suffix}</>;
}

/* ─── FULL-BLEED IMAGE BREAK with parallax ─── */
function FullBleedImage({ src, alt, height = '50vh' }: { src: string; alt: string; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-[-10%] will-change-transform" style={{ y }}>
        <Image src={src} alt={alt} fill className="object-cover industrial-image" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
    </div>
  );
}

/* ─── SPLIT SECTION with parallax on image ─── */
function SplitSection({ children, imageSrc, imageAlt, reverse = false }: { children: React.ReactNode; imageSrc: string; imageAlt: string; reverse?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={sectionRef} className="bg-[#1A1A1A]">
      <div className="max-w-[1800px] mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] ${reverse ? 'lg:dir-rtl' : ''}`}>
          <div className={`flex items-center px-8 md:px-16 lg:px-24 py-20 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className={`max-w-xl ${reverse ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'}`}>
              {children}
            </div>
          </div>
          <div className={`relative min-h-[40vh] lg:min-h-0 overflow-hidden ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            <motion.div className="absolute inset-[-10%] will-change-transform" style={{ y: imgY }}>
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover industrial-image" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STAT BAR with bounce animation ─── */
function StatBar({ stat, value, max }: { stat: string; value: number; max: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-[12px] text-[#999999]">{stat}</span>
        <span className="text-[12px] font-bold text-white">{value}%</span>
      </div>
      <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/60 rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${(value / max) * 100}%` } : { width: '0%' }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── STAGGERED TABLE ROW ─── */
function StaggeredRow({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLTableRowElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      {children}
    </motion.tr>
  );
}

/* ─── INTERACTIVE CARD WRAPPER ─── */
function InteractiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`card group relative overflow-hidden ${className}`}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Gradient reveal on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
}

/* ─── METRIC CARD with hover glow ─── */
function MetricCard({ m }: { m: { value: number; prefix: string; suffix: string; label: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="card p-6 text-center relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: '0 0 30px rgba(255,255,255,0.04)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(255,255,255,0.03) inset' }} />
      <p className="text-3xl md:text-4xl font-bold text-white stat-mono relative z-10">
        <motion.span
          animate={hovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block"
        >
          <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
        </motion.span>
      </p>
      <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 relative z-10">{m.label}</p>
    </motion.div>
  );
}

/* ─── ANIMATED ROADMAP TIMELINE ─── */
function AnimatedRoadmap({ roadmap }: { roadmap: typeof agriData.roadmap }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line that draws on scroll */}
      <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px overflow-hidden">
        <motion.div
          className="w-full bg-white/20 origin-top"
          initial={{ height: '0%' }}
          animate={isInView ? { height: '100%' } : { height: '0%' }}
          transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <div className="space-y-12">
        {roadmap.map((phase, i) => (
          <RoadmapPhase key={phase.phase} phase={phase} index={i} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}

/* ─── ROADMAP PHASE with scroll-triggered reveal ─── */
function RoadmapPhase({ phase, index, isInView }: { phase: typeof agriData.roadmap[0]; index: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const phaseInView = useInView(ref, { once: true, margin: '-80px' });
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (phaseInView && !statsActive) {
      const timer = setTimeout(() => setStatsActive(true), 300 + index * 200);
      return () => clearTimeout(timer);
    }
  }, [phaseInView, statsActive, index]);

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 md:pl-16"
      initial={{ opacity: 0, x: -20 }}
      animate={phaseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Phase dot */}
      <div className="absolute left-[12px] md:left-[16px] top-2">
        <motion.div
          className="w-[15px] h-[15px] rounded-full border-2 border-white/30 bg-[#1A1A1A] flex items-center justify-center"
          animate={phaseInView ? { borderColor: 'rgba(255,255,255,0.6)' } : { borderColor: 'rgba(255,255,255,0.15)' }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          <motion.div
            className="w-[5px] h-[5px] rounded-full bg-white/60"
            animate={phaseInView ? { scale: [0, 1.2, 1], opacity: [0, 1, 1] } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          />
        </motion.div>
        {/* Pulse ring */}
        {phaseInView && (
          <motion.div
            className="absolute inset-[-4px] rounded-full border border-white/10"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: index * 0.15 }}
          />
        )}
      </div>

      {/* Content card */}
      <div className="card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Phase header */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{phase.phase}</span>
            <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
            <p className="text-[12px] text-[#666666] mt-1">{phase.period}</p>
            <p className="text-[11px] text-[#666666] mt-1">{phase.funding}</p>
          </div>
          {/* Key metrics */}
          <div className="md:col-span-3 grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <p className="text-lg font-bold text-white stat-mono">
                {statsActive ? <AnimatedCounter target={phase.hectares} /> : '0'}
              </p>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Hectares</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <p className="text-lg font-bold text-white stat-mono">
                {statsActive ? <AnimatedCounter target={phase.farmers} /> : '0'}
              </p>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Farmers</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <p className="text-sm font-bold text-white stat-mono">{phase.revenue}</p>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenue</p>
            </div>
          </div>
          {/* Actions */}
          <div className="md:col-span-6">
            <div className="space-y-2">
              {phase.actions.map((action, j) => (
                <motion.div
                  key={j}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={phaseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + j * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                  <span className="text-[12px] text-[#999999] leading-relaxed">{action}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MOAT CARD with hover effects ─── */
function MoatCard({ moat }: { moat: typeof agriData.moats[0] }) {
  const Icon = moat.icon;
  return (
    <motion.div
      className="flex gap-4 group cursor-default p-4 -m-4 rounded-lg transition-colors duration-300 hover:bg-[rgba(255,255,255,0.02)]"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0 mt-1"
        whileHover={{ rotate: 8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Icon size={18} className="text-white" strokeWidth={1.5} />
      </motion.div>
      <div>
        <h3 className="text-[15px] font-bold text-white mb-2">{moat.title}</h3>
        <p className="text-[13px] text-[#999999] leading-relaxed group-hover:text-[#BBBBBB] transition-colors duration-300">{moat.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── COMPETITOR ROW with hover highlight ─── */
function CompetitorCard({ comp, index }: { comp: typeof agriData.competitors[0]; index: number }) {
  return (
    <FadeIn delay={index * 0.06}>
      <motion.div
        className="card p-6 group cursor-default"
        whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
        transition={{ duration: 0.25 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Name + Country */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-white text-[15px]">{comp.name}</h3>
            <p className="text-[11px] text-[#666666]">{comp.country} &middot; {comp.maturity}</p>
            <p className="text-[11px] text-[#999999] mt-1">{comp.model}</p>
          </div>
          {/* Key data */}
          <div className="md:col-span-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenue</p>
              <p className="text-[13px] text-white stat-mono">{comp.revenue}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Funding</p>
              <p className="text-[13px] text-white stat-mono">{comp.funding}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Farmers</p>
              <p className="text-[13px] text-white">{comp.farmers}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">Africa</p>
              <p className="text-[13px] text-white">{comp.africa}</p>
            </div>
          </div>
          {/* HarchAgri Advantage */}
          <div className="md:col-span-4">
            <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">HarchAgri Advantage</p>
            <p className="text-[12px] text-[#999999] leading-relaxed group-hover:text-[#BBBBBB] transition-colors duration-300">{comp.advantage}</p>
          </div>
          {/* Weakness */}
          <div className="md:col-span-2">
            <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Key Weakness</p>
            <p className="text-[12px] text-[#999999] leading-relaxed group-hover:text-[#BBBBBB] transition-colors duration-300">{comp.weakness}</p>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════
   DATA — From HarchAgri Strategy PDF
   ═══════════════════════════════════════════ */

const agriData = {
  name: 'HarchAgri',
  version: '/0.6',
  heroTitle: "Carbon-Aware\nAgriculture\nfor Africa",
  heroSubtitle: 'Drones, IoT, vertical farms, and carbon credits — powered by 1,798 GPUs across 5 hubs. The only integrated AgTech platform on the African continent.',
  heroImage: '/images/sections/agri-aerial-drone.jpg',
  sectionImage1: '/images/sections/agri-carbon-credit.jpg',
  sectionImage2: '/images/sections/agri-drone-hightech.jpg',
  sectionImage3: '/images/sections/agri-aerofarms-interior.jpg',
  sectionImage4: '/images/sections/agri-iot-sensor.jpg',

  overview: 'HarchAgri is the agriculture subsidiary of Harch Corp, built on a unique foundation: 1,798 carbon-optimized GPUs, a native Carbon API already in production, and operations across 5 hubs in Morocco. Unlike every competitor who starts with a single product, HarchAgri launches with five integrated pillars — Drone-as-a-Service, IoT irrigation, vertical farms, carbon credit monetization, and a starter kit for smallholders — that reinforce each other into a network effect no single-product player can replicate. Africa holds 60% of the world\'s uncultivated arable land yet imports $50 billion in food annually. HarchAgri exists to close that gap with technology, not charity.',

  strategicContext: 'Africa holds 60% of the world\'s uncultivated arable land — approximately 600 million hectares — yet the continent remains a net food importer, spending $50 billion annually on food imports. African cereal yields average 1.5 tonnes/hectare versus 4 tonnes/hectare globally, only 6% of cultivated land is irrigated versus 37% globally, and post-harvest losses exceed 30%. The 30 million smallholder farmers who produce 70% of locally consumed food face systemic barriers: no access to credit, limited weather data, and fragmented supply chains. Morocco\'s Plan Vert (2008-2020) proved that national strategy works — agricultural GDP doubled, exports tripled, cereal production rose 67%. Generation Green (2020-2030) continues this push with technology and sustainability at its core. HarchAgri addresses each constraint with integrated, GPU-powered solutions.',

  marketAnalysis: 'The African agritech market is valued at $35 billion and growing rapidly, despite a volatile funding environment — agritech financing dropped 18% to $168M in 2025 (Briter Intelligence). The market divides into five segments: agricultural drones ($8.5B, 25% CAGR), IoT irrigation ($3.2B, 18% CAGR), vertical farming ($8.5B global, 26.8% CAGR), carbon credits ($2B Africa, 30%+ CAGR), and agricultural marketplaces ($15B Africa, 12% CAGR — the most crowded and most troubled segment, as Twiga Foods\' collapse demonstrates). HarchAgri targets the four highest-growth, least-served segments while avoiding the commoditized marketplace space entirely. The ACMI initiative aims to multiply African carbon credits 20x by 2030, creating a market HarchAgri is uniquely positioned to capture.',

  sustainability: 'Sustainability is not an add-on — it is HarchAgri\'s business model. Every hectare under IoT irrigation saves 0.5-1.5 tonnes CO2/year. Every vertical farm avoids 2-5 tonnes CO2 versus conventional agriculture. Every hectare in regenerative farming sequesters 1-3 tonnes CO2 in soil. Harch Corp\'s Carbon API, already operational, calculates and certifies these credits automatically via Verra (VCS) and Gold Standard. With 81.5% renewable energy across our 5 hubs and 47 gCO2/kWh carbon intensity — 89% below the industry average — every product we sell is verifiably low-carbon. Vertical farms powered by renewable energy from Harch Corp hubs produce vegetables that are certified low-carbon, commanding premium prices from hotels, restaurants, and retailers seeking to reduce their Scope 3 emissions.',

  investment: '$250K',
  metrics: [
    { value: 60, prefix: '', suffix: '%', label: 'Uncultivated Arable Land' },
    { value: 50, prefix: '$', suffix: 'B', label: 'Annual Food Imports' },
    { value: 1798, prefix: '', suffix: '', label: 'GPU Infrastructure' },
    { value: 5, prefix: '', suffix: ' hubs', label: 'Operational' },
  ],

  /* ─── 5 PILLARS FROM STRATEGY PDF ─── */
  products: [
    {
      icon: Plane,
      name: 'HarchAgri Drone',
      tagline: 'Drone-as-a-Service Monitoring',
      price: '$50',
      unit: '/hectare/month',
      roi: '6-8 months',
      target: 'Farms >5ha',
      description: 'Autonomous drones equipped with multispectral sensors for NDVI analysis, early disease detection 48 hours before visible symptoms, precision irrigation mapping, and yield prediction at 2 weeks. Unlike Western solutions that require purchasing a drone ($15,000+), HarchAgri operates a DaaS model — the farmer pays a monthly subscription and HarchAgri handles flights, GPU-based data processing, and delivers actionable insights directly to their phone.',
      features: [
        'NDVI analysis — stress detection 48h before visible symptoms',
        'GPU-processed real-time analytics on Harch Corp infrastructure',
        'Yield prediction 2 weeks ahead with 90%+ accuracy',
        'DaaS model — no drone purchase required',
        '1 drone covers 40 ha/day, ROI 150% year 1',
      ],
      stats: [
        { label: 'Coverage/day', value: '40 ha' },
        { label: 'ROI Year 1', value: '150%' },
        { label: 'Detection Lead', value: '48h' },
      ],
    },
    {
      icon: Radio,
      name: 'HarchAgri IoT',
      tagline: 'Intelligent Irrigation Network',
      price: '$500',
      unit: '/hectare/year',
      roi: '12-18 months',
      target: 'Farms >2ha',
      description: 'Solar-powered sensor networks monitoring soil moisture, temperature, pH, and nutrient levels continuously. Data transmitted via LoRaWAN (15km range) to Harch Corp servers where AI optimizes irrigation schedules based on weather forecasts, growth stage, and water quotas. Reduces water consumption 30-50% while increasing yields 15-25%. Pay-as-you-grow model: start with a $200 starter kit (3 sensors + LoRaWAN gateway) and scale as results confirm.',
      features: [
        'Soil sensors: moisture, temperature, pH, NPK',
        'LoRaWAN network — 15 km range, solar-powered',
        'AI-optimized irrigation scheduling via GPU compute',
        'Automatic Carbon API integration — CO2 savings calculated',
        'Pay-as-you-grow: starter kit at $200',
      ],
      stats: [
        { label: 'Water Savings', value: '30-50%' },
        { label: 'Yield Increase', value: '15-25%' },
        { label: 'Starter Kit', value: '$200' },
      ],
    },
    {
      icon: Building2,
      name: 'HarchAgri Vertical',
      tagline: 'Modular Vertical Farms',
      price: '$50,000',
      unit: '/container (500m\u00B2)',
      roi: '12-18 months',
      target: 'Hotels, restaurants, retail',
      description: '20-foot container transformed into a 500m\u00B2 equivalent hydroponic vertical farm — LED lighting, hydroponic circulation, IoT sensors, cloud connectivity included. Produces 2 tonnes of vegetables/month (lettuce, basil, mint, cherry tomatoes) generating $4,000-6,000/month revenue. Unlike AeroFarms\' capital-intensive aeroponie model that failed, HarchAgri uses affordable hydroponics adapted for African markets, targeting premium buyers (hotels, restaurants, supermarkets) and integrating carbon credit revenue.',
      features: [
        '500m\u00B2 equivalent in a 20-foot container',
        '2 tonnes/month production — herbs, greens, cherry tomatoes',
        'Cloud-connected for real-time climate optimization',
        'Generates verified carbon credits per container',
        'Powered by Harch Corp renewable energy — certified low-carbon',
      ],
      stats: [
        { label: 'Revenue/month', value: '$4-6K' },
        { label: 'Water Savings', value: '95%' },
        { label: 'ROI', value: '12-18mo' },
      ],
    },
    {
      icon: Leaf,
      name: 'HarchAgri Carbon',
      tagline: 'Agricultural Carbon Credits',
      price: '2%',
      unit: 'commission on credits',
      roi: 'Immediate',
      target: 'All HarchAgri clients',
      description: 'The product no competitor has. Harch Corp\'s Carbon API, already operational, automatically calculates, certifies, and monetizes agricultural carbon credits. Every hectare under IoT irrigation saves 0.5-1.5 tCO2/year. Every vertical farm avoids 2-5 tCO2. Every regenerative hectare sequesters 1-3 tCO2. Certified via Verra (VCS) and Gold Standard. The ACMI initiative targets 20x growth in African carbon credits by 2030 — HarchAgri is positioned to capture this explosion. Revenue model: 2% commission on credit value, with 100,000 ha target by 2030 generating $150K-450K/year in commissions alone.',
      features: [
        'Native Carbon API — already operational, zero build needed',
        'Automatic certification via Verra VCS + Gold Standard',
        'Real-time CO2 calculation from IoT sensor data',
        'Integrated across all HarchAgri products by default',
        'ACMI-aligned — 20x market growth by 2030',
      ],
      stats: [
        { label: 'Credits/ha/yr', value: '0.5-3 tCO2' },
        { label: 'Target 2030', value: '100K ha' },
        { label: 'Commission', value: '2%' },
      ],
    },
  ],

  /* ─── STARTER KIT ─── */
  starterKit: {
    price: '$200',
    contents: '3 soil sensors + LoRaWAN gateway',
    roi: '3-6 months',
    target: 'Smallholder farmers',
  },

  /* ─── COMPETITOR DATA FROM STRATEGY PDF ─── */
  competitors: [
    {
      name: 'OCP Group / Al Moutmir',
      country: 'Morocco',
      revenue: '$11.4B (2025)',
      funding: 'State-owned',
      farmers: '580K+ (40K direct)',
      model: 'Precision + fertilizer',
      maturity: 'Advanced',
      africa: 'Morocco + 5 countries',
      advantage: 'Complementary — HarchAgri provides drones + IoT + carbon for their 580K farmer ecosystem',
      weakness: 'Slow innovation, not a tech startup culture',
    },
    {
      name: 'Twiga Foods',
      country: 'Kenya',
      revenue: 'Declining',
      funding: '$145.65M (12 rounds)',
      farmers: 'Indirect',
      model: 'B2B Marketplace',
      maturity: 'Crisis — restructured',
      africa: 'Kenya only',
      advantage: 'Cautionary tale — we avoid the capital-intensive marketplace model',
      weakness: 'Over-expanded, unprofitable, 300+ layoffs, ops suspended',
    },
    {
      name: 'Apollo Agriculture',
      country: 'Kenya',
      revenue: 'Non-public',
      funding: '$50M+ (Series B)',
      farmers: '350K+',
      model: 'ML credit + inputs',
      maturity: 'Growing',
      africa: 'Kenya + Zambia',
      advantage: 'Credit integration model — HarchAgri IoT data reduces default risk 40%',
      weakness: 'FX-dependent, single product (credit)',
    },
    {
      name: 'AeroFarms',
      country: 'USA',
      revenue: 'Post-bankruptcy',
      funding: '$100M+ (pre-BK)',
      farmers: 'N/A (B2C retail)',
      model: 'Aeroponie microgreens',
      maturity: 'Post-failure pivot',
      africa: 'None',
      advantage: 'Proof that vertical farming works only with focused model + premium retail',
      weakness: 'Capital-intensive aeroponie, no Africa presence',
    },
    {
      name: 'Climate Corp / FieldView',
      country: 'USA (Bayer)',
      revenue: '$50B+ (Bayer total)',
      funding: '$930M acquisition',
      farmers: '250M acres, 23 countries',
      model: 'Insurance + data platform',
      maturity: 'Mature',
      africa: 'Indirect only',
      advantage: 'Data moat model — HarchAgri builds a GPU-powered data moat for Africa',
      weakness: 'Not present in Africa, requires massive data volume',
    },
  ],

  /* ─── PRICING GRID ─── */
  pricing: [
    { product: 'HarchAgri Drone', price: '$50/ha/month', unit: 'DaaS subscription', roi: '6-8 months', target: 'Exploitations >5ha' },
    { product: 'HarchAgri IoT', price: '$500/ha/year', unit: 'Annual subscription', roi: '12-18 months', target: 'Exploitations >2ha' },
    { product: 'HarchAgri Vertical', price: '$50,000/container', unit: '500m\u00B2 module', roi: '12-18 months', target: 'Hotels, restaurants, retail' },
    { product: 'HarchAgri Carbon', price: '2% commission', unit: 'On carbon credits', roi: 'Immediate', target: 'All HarchAgri clients' },
    { product: 'Starter Kit', price: '$200', unit: '3 sensors + LoRaWAN', roi: '3-6 months', target: 'Smallholder farmers' },
  ],

  /* ─── PARTNERSHIPS FROM STRATEGY PDF ─── */
  partners: [
    {
      name: 'Plan Vert Maroc',
      type: 'Government',
      country: 'Morocco',
      priority: 'P1 — Critical',
      harchContribution: 'Tech agriculture',
      partnerContribution: 'Subventions, labels, cadre r\u00e9glementaire',
      status: 'Active' as const,
    },
    {
      name: 'OCP / Al Moutmir',
      type: 'Strategic',
      country: 'Morocco',
      priority: 'P1 — Critical',
      harchContribution: 'Drones + IoT + Carbon API',
      partnerContribution: '580K farmers ecosystem, agronomie, distribution',
      status: 'Active' as const,
    },
    {
      name: 'FAO Maroc',
      type: 'Institutional',
      country: 'Morocco',
      priority: 'P1 — Critical',
      harchContribution: 'Carbon API + data platform',
      partnerContribution: 'Certification standards, international credibility',
      status: 'In Negotiation' as const,
    },
    {
      name: 'ISRA S\u00e9n\u00e9gal',
      type: 'Research',
      country: 'Senegal',
      priority: 'P2 — Important',
      harchContribution: 'Technology transfer',
      partnerContribution: 'R&D, local adaptation, farmer networks',
      status: 'Prospect' as const,
    },
    {
      name: 'AgriTech Kenya',
      type: 'Ecosystem',
      country: 'Kenya',
      priority: 'P2 — Important',
      harchContribution: 'Platform + data',
      partnerContribution: 'Market entry, mature ecosystem',
      status: 'Prospect' as const,
    },
    {
      name: 'Ghana MoFA',
      type: 'Government',
      country: 'Ghana',
      priority: 'P3 — Future',
      harchContribution: 'IoT solutions',
      partnerContribution: 'Planting for Food and Jobs program',
      status: 'Prospect' as const,
    },
  ],

  /* ─── ROADMAP FROM STRATEGY PDF ─── */
  roadmap: [
    {
      phase: 'Phase 1',
      period: '2026',
      title: 'Proof of Concept',
      hectares: 100,
      farmers: 50,
      revenue: '$0.1M',
      funding: 'Auto-financed ($250K)',
      actions: [
        'Deploy 2 DJI Agras drones across 5 hub pilot sites',
        'Install 30 IoT sensors on 5 pilot parcels',
        'Recruit 3 agronomists for field operations',
        'Integrate Carbon API for automatic CO2 calculation',
        'Deploy 5 vertical farm containers (1 per hub)',
        'Obtain Verra certification for carbon methodology',
        'Measure impact: NPS > 70, ROI > 100%',
      ],
    },
    {
      phase: 'Phase 2',
      period: '2027-2028',
      title: 'Scale in Morocco',
      hectares: 5000,
      farmers: 1000,
      revenue: '$2.5M ARR',
      funding: 'Series A ($3-5M)',
      actions: [
        'Scale to 1,000 farmers and 5,000 hectares across Morocco',
        'Leverage OCP/Al Moutmir partnership for 580K farmer access',
        'Expand vertical farms from 5 to 25 units',
        'Launch HarchAgri Marketplace v1 for urban market access',
        'Achieve operational break-even by end of 2028',
        'Secure government subsidies via Plan Vert certification',
      ],
    },
    {
      phase: 'Phase 3',
      period: '2028-2029',
      title: 'African Expansion',
      hectares: 25000,
      farmers: 5000,
      revenue: '$10M ARR',
      funding: 'Series B ($15-20M)',
      actions: [
        'Expand to Senegal (ISRA partnership), Kenya (AgriTech ecosystem), Ghana (MoFA/PFJ)',
        'Same playbook: 5 pilots per country, measure, then scale',
        '4 countries, 5,000 farmers, 25,000 hectares under management',
        'Target investors: CDC, Swedfund, IFC — Africa-focused DFIs',
        'Launch index-based crop insurance (inspired by Climate Corp, adapted for Africa)',
      ],
    },
    {
      phase: 'Phase 4',
      period: '2029-2031',
      title: 'Continental Leadership',
      hectares: 100000,
      farmers: 50000,
      revenue: '$50M ARR',
      funding: 'Pre-IPO / Strategic',
      actions: [
        '50,000 farmers, 100,000 hectares, 10 countries',
        'Full platform: drones + IoT + vertical + carbon + marketplace + insurance',
        'HarchAgri becomes the reference platform for precision agriculture in Africa',
        'Virtuous cycle: more data improves AI models, more carbon credits attract ESG investors',
        'Position for IPO or strategic acquisition',
      ],
    },
  ],

  /* ─── TRIPLE MOAT ─── */
  moats: [
    {
      title: 'GPU Infrastructure',
      desc: '1,798 GPUs across 5 hubs already operational. A competitor would need to invest millions to replicate this compute capacity. The marginal cost of processing one drone image on existing infrastructure is near zero — a competitor pays full cloud price (AWS/GCP). This cost advantage translates directly to lower prices for farmers and higher margins for HarchAgri.',
      icon: Cpu,
    },
    {
      title: 'Native Carbon API',
      desc: 'Already operational. No African agritech competitor can calculate, certify, and monetize agricultural carbon credits in real time. This transforms every hectare under management into an additional revenue stream, making the HarchAgri offer economically irresistible for farmers. The Carbon API is the connective tissue linking all four products into a coherent ecosystem.',
      icon: Zap,
    },
    {
      title: 'ESG Premium Positioning',
      desc: '81.5% renewable energy, 47 gCO2/kWh — 89% below industry average. This positioning attracts impact investors (CDC, IFC, Swedfund), unlocks government subsidies, and enables premium pricing for low-carbon verified produce. Vertical farms powered by Harch Corp renewable energy produce vegetables that are verifiably low-carbon — a unique selling proposition no competitor can match.',
      icon: Shield,
    },
  ],

  /* ─── RISKS FROM STRATEGY PDF ─── */
  risks: [
    { risk: 'Over-expansion (Twiga mistake)', probability: 'Medium', impact: 'Critical', mitigation: 'Lean startup: validate before scaling. Threshold of 100 paying farmers before expansion.' },
    { risk: 'Vertical farm failure (AeroFarms mistake)', probability: 'Medium', impact: 'High', mitigation: 'Start with DaaS/IoT (low capex). Vertical farms only in Phase 2 after proof of concept.' },
    { risk: 'Agritech funding downturn', probability: 'High', impact: 'Medium', mitigation: 'Self-financed from day one. Break-even by Phase 2. Carbon credits = recurring revenue.' },
    { risk: 'Farmer tech adoption barrier', probability: 'High', impact: 'Critical', mitigation: 'Mobile-first UX. OCP partnership for trust. $200 starter kit eliminates price barrier.' },
    { risk: 'Carbon credit regulation', probability: 'Low', impact: 'Medium', mitigation: 'Verra certification in Phase 1. FAO partnership for legitimacy.' },
    { risk: 'OCP enters drone market', probability: 'Low', impact: 'High', mitigation: 'Partnership over competition. OCP lacks startup tech culture.' },
  ],

  stats: [
    { stat: 'Renewable Energy', value: 81, max: 100 },
    { stat: 'Carbon Below Industry', value: 89, max: 100 },
    { stat: 'Water Efficiency Gain', value: 75, max: 100 },
    { stat: 'Yield Improvement', value: 70, max: 100 },
  ],

  location: 'Morocco (5 Hubs)',
  locationDesc: 'Casablanca, Marrakech, Tanger, Rabat, Agadir — each hub covers a 100km radius for drone and IoT operations. Morocco\'s Generation Green strategy (2020-2030) provides institutional support, OCP\'s Al Moutmir program offers a 580K farmer ecosystem, and Harch Corp\'s existing GPU infrastructure delivers zero-marginal-cost compute for all agricultural AI processing.',
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function HarchAgriPage() {
  const data = agriData;

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%']);

  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══════════════════════════════════════════
          HERO — with parallax
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="photo-section relative min-h-[85vh] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY }}>
          <Image src={data.heroImage} alt={data.name} fill className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 z-[1] opacity-30">
          <HeroScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[2]" />
        <div className="relative z-[3] max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">{data.name} {data.version}</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-4 whitespace-pre-line">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl">{data.heroSubtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW + METRICS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel>Overview</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                {data.name}
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
              {/* Brutal truth callout */}
              <div className="mt-6 p-4 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
                <p className="text-[11px] text-white/50 font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">Brutal Truth</p>
                <p className="text-[13px] text-white/70 leading-relaxed">HarchAgri has $0 revenue, $0 funding, 0 farmers served. But no competitor integrates carbon credits + GPU orchestration + precision agriculture. Our advantage is Harch Corp&apos;s existing infrastructure and Carbon API.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <MetricCard key={m.label} m={m} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET SEGMENTS TABLE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Market Analysis</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Five Segments, One Platform</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">The African agritech market divides into five segments. HarchAgri targets the four highest-growth, least-served — avoiding the commoditized marketplace space entirely.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#1A1A1A] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>Market Size</th>
                      <th>CAGR</th>
                      <th>Africa Maturity</th>
                      <th>HarchAgri Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { segment: 'Agricultural Drones', size: '$8.5B (2025)', cagr: '25%', maturity: 'Nascent', opportunity: 'Very strong', oppStrong: true },
                      { segment: 'IoT Irrigation', size: '$3.2B (2025)', cagr: '18%', maturity: 'Low', opportunity: 'Strong', oppStrong: true },
                      { segment: 'Vertical Farming', size: '$8.5B (2025)', cagr: '26.8%', maturity: 'Non-existent', opportunity: 'Medium', oppStrong: false },
                      { segment: 'Carbon Credits', size: '$2B Africa', cagr: '30%+', maturity: 'Emerging', opportunity: 'Very strong', oppStrong: true },
                      { segment: 'Marketplace', size: '$15B Africa', cagr: '12%', maturity: 'Crowded', opportunity: 'Low (avoid)', oppStrong: false },
                    ].map((row, i) => (
                      <StaggeredRow key={row.segment} index={i}>
                        <td className="font-semibold text-white">{row.segment}</td>
                        <td className="text-white">{row.size}</td>
                        <td className="text-white">{row.cagr}</td>
                        <td>{row.maturity}</td>
                        <td className={`text-white ${row.oppStrong ? 'font-semibold' : ''}`}>{row.opportunity}</td>
                      </StaggeredRow>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[11px] text-[#666666]">Sources: Briter Intelligence 2025, ACMI, Grand View Research. ACMI targets 20x growth in African carbon credits by 2030.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FULL-BLEED IMAGE BREAK
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage1} alt={`${data.name} infrastructure`} height="55vh" />

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage2} imageAlt={`${data.name} operations`}>
        <FadeIn>
          <SectionLabel>Strategic Context</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Why This Matters
          </h2>
          <div className="accent-line mb-6" />
          <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
        </FadeIn>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          5 PILLARS — PRODUCT CARDS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Products</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Five Integrated Pillars
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              Each product works standalone or in full synergy. Together, they create a network effect no single-product competitor can replicate.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.products.map((product, i) => {
              const Icon = product.icon;
              return (
                <FadeIn key={product.name} delay={i * 0.08}>
                  <InteractiveCard className="p-6 h-full">
                    {/* Top accent line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                          <Icon size={18} className="text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[14px] text-white">{product.name}</h3>
                          <p className="text-[11px] text-[#666666]">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white stat-mono">{product.price}</p>
                        <p className="text-[10px] text-[#666666]">{product.unit}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-[12px] text-[#999999] leading-relaxed mb-4 relative z-10">{product.description}</p>
                    {/* Stats — animate on hover */}
                    <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
                      {product.stats.map((stat, j) => (
                        <motion.div
                          key={j}
                          className="text-center p-2 rounded-lg bg-[rgba(255,255,255,0.03)]"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.06)' }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
                          <p className="text-[9px] text-[#666666] uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-4 relative z-10">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                          <span className="text-[11px] text-[#999999]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* Footer: ROI + Target */}
                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.04)] relative z-10">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[#666666]" />
                        <span className="text-[10px] text-[#666666]">ROI: {product.roi}</span>
                      </div>
                      <span className="text-[10px] text-[#666666]">{product.target}</span>
                    </div>
                  </InteractiveCard>
                </FadeIn>
              );
            })}
          </div>

          {/* STARTER KIT — Highlighted */}
          <FadeIn delay={0.4}>
            <InteractiveCard className="mt-6 p-6 border-dashed border-[rgba(255,255,255,0.12)]">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                    <Wheat size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-white">Starter Kit</h3>
                    <p className="text-[12px] text-[#999999]">{data.starterKit.contents}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white stat-mono">{data.starterKit.price}</p>
                  <p className="text-[10px] text-[#666666]">ROI: {data.starterKit.roi}</p>
                </div>
              </div>
              <p className="text-[12px] text-[#666666] mt-3 relative z-10">For {data.starterKit.target} — eliminates price barrier to technology adoption.</p>
            </InteractiveCard>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING GRID
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Transparent Pricing</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Simple, transparent pricing designed for African agricultural economics. No hidden fees. Carbon credit revenue included by default.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#121212] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>ROI</th>
                      <th>Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pricing.map((row, i) => (
                      <StaggeredRow key={row.product} index={i}>
                        <td className="font-semibold text-white">{row.product}</td>
                        <td className="text-white stat-mono">{row.price}</td>
                        <td className="text-[#999999]">{row.unit}</td>
                        <td className="text-white">{row.roi}</td>
                        <td className="text-[#999999]">{row.target}</td>
                      </StaggeredRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITIVE ANALYSIS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Competitive Analysis</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              HarchAgri vs. The Field
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              Five competitors, five different market entry points. None have integrated carbon credits + GPU orchestration + precision agriculture on the African continent.
            </p>
          </FadeIn>

          {/* Competitor cards */}
          <div className="space-y-4">
            {data.competitors.map((comp, i) => (
              <CompetitorCard key={comp.name} comp={comp} index={i} />
            ))}
          </div>

          {/* HarchAgri comparison highlight */}
          <FadeIn delay={0.4}>
            <motion.div
              className="mt-6 card p-6 border border-white/10"
              whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-white font-[family-name:var(--font-space-mono)]">{data.version}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">HarchAgri</h4>
                  <p className="text-[11px] text-[#666666]">5 hubs, 1,798 GPUs, 81.5% renewable</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Model</p>
                  <p className="text-[14px] text-white font-semibold">SaaS + Hardware + Carbon</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Differentiator</p>
                  <p className="text-[14px] text-white font-semibold">Only integrated AgTech + Carbon + GPU platform</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Africa Presence</p>
                  <p className="text-[14px] text-white font-semibold">5 hubs operational (Morocco)</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Target 2031</p>
                  <p className="text-[14px] text-white font-semibold stat-mono">50K farmers / $50M ARR</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRIPLE MOAT — Competitive Advantages
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <SectionLabel>Competitive Moat</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                Three Advantages Nobody Can Replicate
              </h2>
              <div className="accent-line mb-8" />
              <div className="space-y-4">
                {data.moats.map((moat) => (
                  <MoatCard key={moat.title} moat={moat} />
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-2 mt-8 lg:mt-0">
                {data.stats.map((s) => (
                  <StatBar key={s.stat} stat={s.stat} value={s.value} max={s.max} />
                ))}
              </div>
              <motion.div
                className="mt-12 p-6 card"
                whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-2">Carbon Intensity</p>
                <p className="text-4xl font-bold text-white stat-mono">47 gCO2/kWh</p>
                <p className="text-[12px] text-[#999999] mt-2">89% below industry average of ~450 gCO2/kWh</p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SUSTAINABILITY — Split section
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage4} imageAlt={`${data.name} sustainability`}>
        <FadeIn>
          <SectionLabel>Sustainability & ESG</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Sustainability Is the Business Model
          </h2>
          <div className="accent-line mb-6" />
          <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
        </FadeIn>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          FULL-BLEED IMAGE BREAK
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage3} alt={`${data.name} vertical farming`} height="50vh" />

      {/* ═══════════════════════════════════════════
          STRATEGIC PARTNERSHIPS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Partnerships</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Strategic Partners
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              Selective, symbiotic partnerships — each partner brings competence HarchAgri lacks; HarchAgri brings technology and carbon credits they don&apos;t have.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.partners.map((partner, i) => (
              <FadeIn key={partner.name} delay={i * 0.08}>
                <InteractiveCard className="p-6 h-full">
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <div>
                      <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                      <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                    </div>
                    <span className={`status-badge ${partner.status === 'Active' ? 'status-badge-active' : 'status-badge-engineering'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {partner.status}
                    </span>
                  </div>
                  <div className="mb-3 relative z-10">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">We bring</p>
                    <p className="text-[11px] text-white">{partner.harchContribution}</p>
                  </div>
                  <div className="mb-3 relative z-10">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">They bring</p>
                    <p className="text-[11px] text-[#999999]">{partner.partnerContribution}</p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.04)] relative z-10">
                    <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">{partner.priority}</span>
                  </div>
                </InteractiveCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROADMAP — Animated Timeline
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">Four Phases to Continental Leadership</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">Lean startup philosophy: validate with minimum viable product before scaling. Avoid the fatal mistake of Twiga Foods — over-investing before proving the model.</p>
          </FadeIn>

          <AnimatedRoadmap roadmap={data.roadmap} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RISKS — From Strategy PDF
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Risk Analysis</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Identified Risks & Mitigations</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Prudence is not an option — it is a necessity. The failures of Twiga Foods, AeroFarms, and the volatile agritech funding environment in 2025 teach us this.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#121212] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Risk</th>
                      <th>Probability</th>
                      <th>Impact</th>
                      <th>Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.risks.map((r, i) => (
                      <StaggeredRow key={r.risk} index={i}>
                        <td className="font-semibold text-white">{r.risk}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 text-[11px] ${r.probability === 'High' ? 'text-white' : r.probability === 'Medium' ? 'text-[#999999]' : 'text-[#666666]'}`}>
                            {r.probability === 'High' && <AlertTriangle size={10} />}
                            {r.probability}
                          </span>
                        </td>
                        <td>
                          <span className={`text-[11px] ${r.impact === 'Critical' ? 'text-white font-semibold' : r.impact === 'High' ? 'text-[#999999]' : 'text-[#666666]'}`}>
                            {r.impact}
                          </span>
                        </td>
                        <td className="text-[12px] text-[#999999] max-w-md">{r.mitigation}</td>
                      </StaggeredRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IoT DASHBOARD
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] relative overflow-hidden">
        <ParticleField />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <SectionLabel>Live Monitoring</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              IoT Dashboard
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              Real-time sensor data — temperature, soil moisture, crop health, and carbon credits. All processed on Harch Corp GPU infrastructure with near-zero marginal cost.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <IoTDashboard />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AFRICA MAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212] relative overflow-hidden">
        <ParticleField />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <SectionLabel className="justify-center">Deployments / Real-Time</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em]">
                Operating Across<br />Africa
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-[15px] text-[#999999] leading-relaxed">
                5 hubs in Morocco — Casablanca, Marrakech, Tanger, Rabat, Agadir — each covering 100km radius for drone and IoT operations. Expansion to Senegal, Kenya, Ghana in Phase 3.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="card overflow-hidden" style={{ height: '520px' }}>
              <AfricaMap />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <SectionLabel>Performance</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                By the Numbers
              </h2>
              <div className="accent-line mb-8" />
              <div className="space-y-2">
                {data.stats.map((s) => (
                  <StatBar key={s.stat} stat={s.stat} value={s.value} max={s.max} />
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 lg:mt-0">
                <motion.div
                  className="p-6 card mb-6"
                  whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-2">Carbon Intensity</p>
                  <p className="text-4xl font-bold text-white stat-mono">47 gCO2/kWh</p>
                  <p className="text-[12px] text-[#999999] mt-2">89% below industry average of ~450 gCO2/kWh</p>
                </motion.div>
                <motion.div
                  className="p-6 card"
                  whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-2">Renewable Energy</p>
                  <p className="text-4xl font-bold text-white stat-mono">81.5%</p>
                  <p className="text-[12px] text-[#999999] mt-2">Across 5 operational hubs in Morocco</p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCATION
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionLabel>Location</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">{data.location}</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-8">{data.locationDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Casablanca', 'Marrakech', 'Tanger', 'Rabat', 'Agadir'].map((city, i) => (
                <FadeIn key={city} delay={i * 0.06}>
                  <motion.div
                    className="card p-4 text-center"
                    whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.12)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={14} className="text-white/40 mx-auto mb-2" />
                    <p className="text-[12px] font-semibold text-white">{city}</p>
                    <p className="text-[9px] text-[#666666]">100km radius</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BACKGROUND — Investment & Location
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[50vh] flex items-center">
        <Image src={data.heroImage} alt={data.name} fill className="object-cover" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              {data.investment} Phase 1<br />in {data.location}
            </h2>
            <p className="max-w-lg text-[15px] text-white/60 leading-relaxed">{data.locationDesc}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Build With Us</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">Partnership, investment, and pilot program inquiries. HarchAgri is looking for farmers, governments, and investors who share our vision for African agricultural sovereignty.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">Get Started <ArrowRight size={14} /></Link>
              <Link href="/investors" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">Investor Details</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
