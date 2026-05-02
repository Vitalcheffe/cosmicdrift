'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ExternalLink, Globe } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(
  () => import('@/components/Scene3D').then((mod) => mod.Scene3D),
  { ssr: false }
);

/* ═══ DATA ═══ */
const verticals = [
  { version: '/0.1', name: 'Intelligence', fullName: 'Harch Intelligence', desc: 'AI Data Centers & GPU Clusters — 500MW hyperscale facility in Dakhla, powered by 100% renewable energy. Hosts next-gen GPU clusters for sovereign AI compute.', stat: '500MW+', href: '/subsidiaries/intelligence' },
  { version: '/0.2', name: 'Ciment', fullName: 'Harch Ciment', desc: 'Industrial Cement Production — 500kT/yr capacity serving West African construction boom. Vertically integrated from quarry to delivery.', stat: '500kT/yr', href: '/subsidiaries/cement' },
  { version: '/0.3', name: 'Energy', fullName: 'Harch Energy', desc: 'Renewable Energy & Green Hydrogen — 2GW+ solar, wind, and green hydrogen pipeline across Morocco and Sahel. Zero-carbon electricity for industrial operations.', stat: '2GW+', href: '/subsidiaries/energy' },
  { version: '/0.4', name: 'Technology', fullName: 'Harch Technology', desc: 'AI Platforms, Cyber & Satellite — Sovereign tech stack from cybersecurity to satellite communications. 50K+ GPU clusters powering continental AI.', stat: '50K+ GPUs', href: '/subsidiaries/technology' },
  { version: '/0.5', name: 'Mining', fullName: 'Harch Mining', desc: 'Phosphates, Cobalt & Rare Earths — Strategic mineral extraction for the global energy transition. Africa holds 30% of reserves; we capture the value chain.', stat: '3 Minerals', href: '/subsidiaries/mining' },
  { version: '/0.6', name: 'Agri', fullName: 'Harch Agri', desc: 'Precision Agriculture & Vertical Farms — Deploying IoT, drone monitoring, and vertical farming across 60% of the world\'s uncultivated arable land.', stat: '$35B Market', href: '/subsidiaries/agriculture' },
  { version: '/0.7', name: 'Water', fullName: 'Harch Water', desc: 'Desalination & Smart Water Networks — 200M m³/yr desalination capacity with AI-optimized distribution. Solving Africa\'s water security crisis.', stat: '200M m³/yr', href: '/subsidiaries/water' },
];

const stats = [
  { value: 2.4, prefix: '$', suffix: 'B+', label: 'Investment Pipeline', desc: 'Active capital deployment across 7 verticals' },
  { value: 7, prefix: '', suffix: '', label: 'Industrial Verticals', desc: 'From AI compute to water security' },
  { value: 3200, prefix: '', suffix: '+', label: 'Jobs Created', desc: 'Direct employment by 2028' },
  { value: 5, prefix: '', suffix: '', label: 'Countries', desc: 'Morocco, Gambia, Senegal, Mauritania, Mali' },
];

const roadmap = [
  { year: '2024', title: 'Foundation', desc: 'Harch Corp S.A. founded in Casablanca. Capital registered at 100M MAD.', status: 'completed' },
  { year: '2025', title: 'Design & Engineering', desc: 'Dakhla data center engineering begins. Gambia cement plant permits secured.', status: 'completed' },
  { year: '2026', title: 'Energy Permits', desc: '2GW renewable energy licenses secured. Green hydrogen pilot approved.', status: 'active' },
  { year: '2027', title: 'First Module Live', desc: 'First 100MW data center module operational in Dakhla. GPU clusters online.', status: 'upcoming' },
  { year: '2028', title: 'Cement Plant Online', desc: 'Gambia 500kT/yr facility commissioned. Energy farm at 1GW.', status: 'upcoming' },
  { year: '2030', title: 'Continental Scale', desc: '7 verticals, 12+ markets. $2.4B deployed. Africa\'s industrial backbone.', status: 'upcoming' },
];

const africaStats = [
  { value: '30%', desc: 'of the world\'s mineral reserves are in Africa — yet the continent captures less than 5% of the value chain. Harch Mining changes that equation by building processing and refining capacity in-country, ensuring that resource wealth stays on the continent.' },
  { value: '60%', desc: 'of the world\'s uncultivated arable land is in Africa. Harch Agri deploys precision farming, IoT sensors, and vertical farming technology to convert this untapped potential into food security and export revenue at continental scale.' },
  { value: '1.4B', desc: 'people — the youngest population on Earth with a median age of 19. Harch Technology provides the digital infrastructure — from AI compute to satellite connectivity — to educate, connect, and empower the next generation of African innovators.' },
];

/* ═══ ANIMATED COUNTER ═══ */
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

/* ═══ FADE IN ═══ */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          S1: HERO — Full viewport white cinematic
          ═══════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        {/* 3D Background */}
        <div className="absolute inset-0">
          <Scene3D />
        </div>

        {/* White gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/70" />

        {/* Content */}
        <motion.div style={{ y: heroY }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0F1A]/[0.05] border border-[#0A0F1A]/[0.08]">
              <Globe size={12} className="text-[#C9A84C]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280]">Building Africa&apos;s Industrial Sovereignty</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-extrabold text-[#0A0F1A] leading-[1.02] tracking-[-0.02em] mb-8"
          >
            Infrastructure<br />
            <span className="gradient-gold">for the Next</span><br />
            Century
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-[#6B7280] leading-relaxed mb-12"
          >
            From 500MW AI data centers to 2GW renewable energy — Harch Corp builds
            the critical infrastructure that enables Africa&apos;s self-reliance across 7 industrial verticals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#0A0F1A] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0A0F1A]/90 transition-all duration-300">
              Get Started <ArrowRight size={14} />
            </Link>
            <Link href="/investors" className="inline-flex items-center gap-2.5 border border-[rgba(0,0,0,0.1)] text-[#0A0F1A] px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.02)] transition-all duration-300">
              Investor Relations <ExternalLink size={13} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#9CA3AF] font-medium">Scroll</span>
          <ChevronDown size={14} className="text-[#9CA3AF] animate-bounce-slow" />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          S2: VERTICALS — Palantir product-listing style
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="section-label mb-4">Our Verticals</p>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em]">
                  Seven Pillars<br />of Sovereignty
                </h2>
              </div>
              <Link href="/strategy" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] hover:text-[#0A0F1A] transition-colors group">
                View Strategy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Palantir-style list layout */}
          <div>
            {verticals.map((v, i) => (
              <FadeIn key={v.version} delay={i * 0.05}>
                <Link
                  href={v.href}
                  className="vertical-row group flex items-center justify-between py-8 md:py-10 px-2 md:px-4 cursor-pointer"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-baseline gap-4 mb-2">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A0F1A] group-hover:text-[#C9A84C] transition-colors tracking-tight">
                        {v.name}
                      </h3>
                      <span className="text-[11px] font-bold text-[#C9A84C] tracking-wide hidden sm:inline">{v.stat}</span>
                    </div>
                    <p className="text-[13px] md:text-[15px] text-[#6B7280] leading-relaxed max-w-xl group-hover:text-[#0A0F1A]/60 transition-colors">
                      {v.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="version-tag hidden md:inline">{v.version}</span>
                    <ArrowRight size={16} className="vertical-arrow text-[rgba(0,0,0,0.1)] group-hover:text-[#C9A84C] transition-all duration-300" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S3: CINEMATIC VIDEO BANNER
          ═══════════════════════════════════════════ */}
      <section className="py-0 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="cinematic-video relative w-full aspect-[21/9] md:aspect-[21/7] rounded-2xl overflow-hidden bg-[#F1F3F5]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-55"
                poster="/images/hero-video-frame.jpg"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 z-10 flex items-end p-8 md:p-14">
                <div className="max-w-lg">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-bold mb-3">Featured</p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3">
                    Building the Infrastructure<br />of Tomorrow
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">
                    A glimpse into the scale of our operations across Africa — from Dakhla to the Sahel.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S4: STATS — White card grid
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Scale & Impact</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-16">
              By the Numbers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="dark-card p-6">
                  <p className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#0A0F1A] tracking-tight leading-none mb-2">
                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#C9A84C] mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[12px] text-[#9CA3AF] leading-relaxed">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-[11px] text-[#9CA3AF] italic">
              * Projected targets based on current pipeline and regulatory approvals. Updated Q1 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S5: IMPACT STUDY — Intelligence
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Intelligence /0.1</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#F1F3F5] image-reveal">
                <Image src="/images/verticals/intelligence.jpg" alt="Harch Intelligence AI Data Center" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#0A0F1A]/70 backdrop-blur-md px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C9A84C]">500MW AI Hyperscale</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-4">
                Africa&apos;s Largest AI<br />Hyperscale Data Center
              </h2>
              <div className="golden-line mb-6" />
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-8">
                Harch Intelligence is building a 500MW AI-ready hyperscale data center in Dakhla,
                Morocco — powered entirely by renewable energy and designed to serve as the backbone
                of Africa&apos;s sovereign AI compute infrastructure. The facility will host
                next-generation GPU clusters, supporting large language model training and inference
                at continental scale, with direct submarine cable connectivity to Europe and the Americas.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { val: '500MW+', label: 'Capacity' },
                  { val: '50K+', label: 'GPUs' },
                  { val: '100%', label: 'Renewable' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-[#0A0F1A]">{s.val}</p>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#C9A84C] transition-colors duration-300 group">
                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S6: IMPACT STUDY — Energy (reversed)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Energy /0.3</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.15} className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-4">
                2GW+ of Renewable<br />Energy Pipeline
              </h2>
              <div className="golden-line mb-6" />
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-8">
                Harch Energy is developing over 2 gigawatts of renewable energy capacity across
                Morocco and the Sahel region — combining solar, wind, and green hydrogen production
                to power industrial operations and data centers with zero-carbon electricity. Our
                integrated approach ensures energy sovereignty for the continent while creating
                a model for sustainable industrialization worldwide.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { val: '2GW+', label: 'Capacity' },
                  { val: '3', label: 'Energy Sources' },
                  { val: 'Zero', label: 'Carbon' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-[#0A0F1A]">{s.val}</p>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/subsidiaries/energy" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#C9A84C] transition-colors duration-300 group">
                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
            <FadeIn className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#F1F3F5] image-reveal">
                <Image src="/images/verticals/energy.jpg" alt="Harch Energy Renewable Infrastructure" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#0A0F1A]/70 backdrop-blur-md px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C9A84C]">2GW+ Renewable Pipeline</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S7: QUOTE / PHILOSOPHY
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[960px] mx-auto px-6 md:px-12">
          <FadeIn>
            <span className="text-7xl md:text-9xl text-[rgba(0,0,0,0.04)] leading-none font-serif block -mb-12">&ldquo;</span>
            <blockquote className="text-xl md:text-2xl lg:text-[32px] font-light text-[#0A0F1A] leading-[1.4] mb-10">
              Africa doesn&apos;t need aid — it needs infrastructure. It doesn&apos;t need pity
              — it needs partnership on equal terms. We build the systems that convert
              potential into power.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#C9A84C]" />
              <div>
                <p className="text-sm text-[#0A0F1A] font-semibold">Amine Harch El Korane</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">Founder &amp; CEO, Harch Corp</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S8: AFRICA'S POTENTIAL — 3 stat cards
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">The Opportunity</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-16">
              Africa&apos;s Potential,<br />By the Numbers
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {africaStats.map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="dark-card p-8 h-full">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A0F1A] mb-2 leading-none">{item.value}</p>
                  <div className="golden-line mb-5" />
                  <p className="text-[13px] text-[#6B7280] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S9: ROADMAP — Timeline
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-16">
              2024 &mdash; 2030
            </h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(0,0,0,0.04)]" />
            <div className="space-y-10">
              {roadmap.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1.5 ${
                        item.status === 'completed' ? 'bg-[#C9A84C] border-[#C9A84C]' :
                        item.status === 'active' ? 'bg-[#0A0F1A] border-[#0A0F1A] shadow-md shadow-[#0A0F1A]/20' :
                        'bg-transparent border-[rgba(0,0,0,0.15)]'
                      }`} />
                    </div>
                    <div className="pb-2">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                        item.status === 'active' ? 'text-[#C9A84C]' : 'text-[#9CA3AF]'
                      }`}>
                        {item.year}
                        {item.status === 'active' && ' — Current'}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-[#0A0F1A] mt-1 mb-1">{item.title}</h3>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S10: OPERATOR MODEL
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <p className="section-label mb-4">Our Model</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0A0F1A] tracking-[-0.01em] mb-6">
                Not a Service Provider.<br />Not a Consultancy.<br />
                <span className="gradient-gold">An Operator.</span>
              </h2>
              <div className="golden-line mb-6" />
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-8">
                Harch Corp doesn&apos;t advise — we build. We own the entire value chain from raw materials
                to finished infrastructure. This vertically integrated model creates structural cost
                advantages of 30-50% versus competitors who rely on external supply chains. We don&apos;t
                write reports about Africa&apos;s potential — we convert it into industrial power.
              </p>
              <Link href="/strategy" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#C9A84C] transition-colors duration-300 group">
                Our Strategy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  { title: 'Vertically Integrated', desc: 'Energy + Materials + Technology + Operations — all under one roof. We control every link in the chain.' },
                  { title: 'Sovereign by Design', desc: 'Infrastructure that Africa owns, operates, and controls. No dependency on foreign operators or technology.' },
                  { title: 'Speed at Scale', desc: 'We move with urgency. The continent cannot afford to wait. Every project is executed with precision and pace.' },
                  { title: 'World-Class Standards', desc: 'From engineering to governance, we accept nothing less than the best. International certifications across all verticals.' },
                ].map((item, i) => (
                  <div key={i} className="dark-card p-5 hover:border-[rgba(0,0,0,0.08)] transition-colors">
                    <h4 className="text-sm font-bold text-[#0A0F1A] mb-1">{item.title}</h4>
                    <p className="text-[12px] text-[#6B7280] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S11: NEWSROOM PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Latest Updates</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F1A] tracking-[-0.01em]">Newsroom</h2>
              </div>
              <Link href="/newsroom" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] hover:text-[#0A0F1A] transition-colors group">
                All Updates <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Harch Intelligence Secures 500MW Data Center Site in Dakhla', date: 'March 2026', tag: 'Intelligence' },
              { title: 'Harch Energy Reaches 2GW Renewable Pipeline Milestone', date: 'February 2026', tag: 'Energy' },
              { title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals', date: 'January 2026', tag: 'Corporate' },
            ].map((article, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link href="/newsroom" className="group block dark-card p-6 hover:border-[rgba(0,0,0,0.08)] transition-all duration-300">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(0,0,0,0.04)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#C9A84C] mb-3">{article.tag}</span>
                  <h3 className="text-[15px] font-bold text-[#0A0F1A]/80 leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors">{article.title}</h3>
                  <p className="text-[11px] text-[#9CA3AF] tracking-wide">{article.date}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S12: CTA — Dark dramatic section (stays dark)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0F1A] relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-100" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6 leading-tight">
              The Next Century<br />Starts Now
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              Join the consortium building Africa&apos;s industrial sovereignty.
              From investment to partnership — the future is being built.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-[#C9A84C] text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#d4b85c] transition-all duration-300">
                Get Started <ArrowRight size={14} />
              </Link>
              <Link href="/careers" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all duration-300">
                View Careers
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
