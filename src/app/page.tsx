'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Play, ExternalLink } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(
  () => import('@/components/Scene3D').then((mod) => mod.Scene3D),
  { ssr: false }
);

/* ─── Data ─── */
const verticals = [
  {
    num: '01',
    name: 'Harch Intelligence',
    desc: 'AI Data Centers & GPU Clusters',
    stat: '500MW+',
    location: 'Dakhla, Morocco',
    image: '/images/verticals/intelligence.jpg',
    href: '/subsidiaries/intelligence',
  },
  {
    num: '02',
    name: 'Harch Ciment',
    desc: 'Industrial Cement Production',
    stat: '500kT/yr',
    location: 'Gambia',
    image: '/images/verticals/cement.jpg',
    href: '/subsidiaries/cement',
  },
  {
    num: '03',
    name: 'Harch Energy',
    desc: 'Renewable Energy & Green Hydrogen',
    stat: '2GW+',
    location: 'Multi-Market',
    image: '/images/verticals/energy.jpg',
    href: '/subsidiaries/energy',
  },
  {
    num: '04',
    name: 'Harch Technology',
    desc: 'AI Platforms, Cyber & Satellite Comms',
    stat: '50K+ GPUs',
    location: '—',
    image: '/images/verticals/technology.jpg',
    href: '/subsidiaries/technology',
  },
  {
    num: '05',
    name: 'Harch Mining',
    desc: 'Phosphates, Cobalt & Rare Earths',
    stat: '3 Minerals',
    location: '—',
    image: '/images/verticals/mining.jpg',
    href: '/subsidiaries/mining',
  },
  {
    num: '06',
    name: 'Harch Agri',
    desc: 'Precision Agriculture & Vertical Farms',
    stat: '$35B Market',
    location: '—',
    image: '/images/verticals/agriculture.jpg',
    href: '/subsidiaries/agriculture',
  },
  {
    num: '07',
    name: 'Harch Water',
    desc: 'Desalination & Smart Water Networks',
    stat: '200M m\u00B3/yr',
    location: '—',
    image: '/images/verticals/water.jpg',
    href: '/subsidiaries/water',
  },
];

const stats = [
  { value: 2.4, prefix: '$', suffix: 'B+', label: 'Investment Pipeline' },
  { value: 7, prefix: '', suffix: '', label: 'Verticals' },
  { value: 3200, prefix: '', suffix: '+', label: 'Jobs Created' },
  { value: 5, prefix: '', suffix: '', label: 'Countries' },
];

const roadmap = [
  { year: '2024', title: 'Foundation', desc: 'Harch Corp founded in Casablanca, Morocco' },
  { year: '2025', title: 'Design Phase', desc: 'Data center & cement plant engineering begins' },
  { year: '2026', title: 'Energy Permits', desc: 'Renewable energy licenses secured' },
  { year: '2027', title: 'First Module Live', desc: 'First data center module operational in Dakhla' },
  { year: '2028', title: 'Cement Plant Online', desc: 'Gambia cement facility commissioned' },
  { year: '2030', title: 'Continental Scale', desc: '7 verticals, 12+ markets across Africa' },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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

/* ─── Fade In Section Wrapper ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — White with 3D Wireframe
          ═══════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-60">
          <Scene3D />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label mb-6"
          >
            Building Africa&apos;s Industrial Sovereignty
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-semibold text-[#101820] leading-[1.05] tracking-tight mb-8"
          >
            Infrastructure for<br />the Next Century
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-[#6B7280] leading-relaxed mb-10"
          >
            From 500MW AI data centers to 2GW renewable energy — Harch Corp builds
            the critical infrastructure that enables Africa&apos;s self-reliance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#101820] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-[#1f2937] transition-colors"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[rgba(0,0,0,0.12)] text-[#101820] px-8 py-3.5 rounded-md text-sm font-medium hover:border-[rgba(0,0,0,0.3)] transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF]">Scroll to Explore</span>
          <ChevronDown size={16} className="text-[#9CA3AF] animate-bounce-slow" />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 2: VERTICALS — 7 Cards with Images
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Our Verticals</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101820] tracking-tight mb-4">
              Seven Pillars of Sovereignty
            </h2>
            <p className="max-w-xl text-base text-[#6B7280] leading-relaxed mb-16">
              Each vertical addresses a critical infrastructure gap — building the systems
              Africa needs to convert its resources into industrial power.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v, i) => (
              <FadeIn key={v.num} delay={i * 0.08}>
                <Link
                  href={v.href}
                  className={`vertical-card group block bg-white border border-[rgba(0,0,0,0.06)] rounded-lg overflow-hidden ${
                    i === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F7F7F8]">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Number overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
                      <span className="text-xs font-semibold text-[#101820] tracking-[0.1em]">{v.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-[#101820] tracking-tight">
                        {v.name}
                      </h3>
                      <span className="text-sm font-semibold text-[#C9A84C] whitespace-nowrap">
                        {v.stat}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
                      {v.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9CA3AF] tracking-[0.05em]">{v.location}</span>
                      <ArrowRight
                        size={14}
                        className="text-[#9CA3AF] group-hover:text-[#101820] group-hover:translate-x-1 transition-all duration-200"
                      />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: CINEMATIC VIDEO INSERT
          ═══════════════════════════════════════════ */}
      <section className="py-0 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="cinematic-video relative w-full aspect-[21/9] md:aspect-[21/7] rounded-lg overflow-hidden bg-[#101820]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-60"
                poster="/images/hero-video-frame.jpg"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
              {/* Overlay content */}
              <div className="absolute inset-0 z-10 flex items-end p-8 md:p-12">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-3">Featured</p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-2">
                    Building the Infrastructure of Tomorrow
                  </h3>
                  <p className="text-sm text-white/50 max-w-lg">
                    A glimpse into the scale of our operations across Africa.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: STATS — Animated Counters
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#F7F7F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-12">Scale</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101820] tracking-tight">
                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs tracking-[0.1em] uppercase text-[#9CA3AF]">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p className="mt-8 text-xs text-[#9CA3AF] italic">
              * Projected targets based on current pipeline and regulatory approvals
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: FEATURED IMPACT — Intelligence
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Intelligence</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-[#F7F7F8] image-reveal">
                <Image
                  src="/images/verticals/intelligence.jpg"
                  alt="Harch Intelligence AI Data Center"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101820] tracking-tight mb-6">
                Africa&apos;s Largest AI<br />Hyperscale Data Center
              </h2>
              <div className="golden-line mb-6" />
              <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                Harch Intelligence is building a 500MW AI-ready hyperscale data center in Dakhla,
                Morocco — powered entirely by renewable energy and designed to serve as the backbone
                of Africa&apos;s sovereign AI compute infrastructure. The facility will host
                next-generation GPU clusters, supporting large language model training and inference
                at continental scale.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">500MW+</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Capacity</p>
                </div>
                <div className="w-px h-10 bg-[rgba(0,0,0,0.08)]" />
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">50K+</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">GPUs</p>
                </div>
                <div className="w-px h-10 bg-[rgba(0,0,0,0.08)]" />
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">100%</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Renewable</p>
                </div>
              </div>
              <Link
                href="/subsidiaries/intelligence"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#101820] hover:text-[#C9A84C] transition-colors group"
              >
                Read More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: FEATURED IMPACT — Energy
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#F7F7F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Energy</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn delay={0.15} className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101820] tracking-tight mb-6">
                2GW+ of Renewable<br />Energy Pipeline
              </h2>
              <div className="golden-line mb-6" />
              <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                Harch Energy is developing over 2 gigawatts of renewable energy capacity across
                Morocco and the Sahel region — combining solar, wind, and green hydrogen production
                to power industrial operations and data centers with zero-carbon electricity. Our
                integrated approach ensures energy sovereignty for the continent.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">2GW+</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Capacity</p>
                </div>
                <div className="w-px h-10 bg-[rgba(0,0,0,0.08)]" />
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">3</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Energy Sources</p>
                </div>
                <div className="w-px h-10 bg-[rgba(0,0,0,0.08)]" />
                <div>
                  <p className="text-2xl font-semibold text-[#101820]">0</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Carbon Emissions</p>
                </div>
              </div>
              <Link
                href="/subsidiaries/energy"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#101820] hover:text-[#C9A84C] transition-colors group"
              >
                Read More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
            <FadeIn className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-[#E5E7EB] image-reveal">
                <Image
                  src="/images/verticals/energy.jpg"
                  alt="Harch Energy Renewable Infrastructure"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: PHILOSOPHY / QUOTE
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <span className="text-6xl md:text-8xl text-[rgba(0,0,0,0.04)] leading-none font-serif block mb-[-1rem]">
              &ldquo;
            </span>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-[#101820] leading-relaxed mb-8">
              Africa doesn&apos;t need aid — it needs infrastructure. It doesn&apos;t need pity
              — it needs partnership on equal terms. We build the systems that convert
              potential into power.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-px h-8 bg-[rgba(0,0,0,0.15)]" />
              <div>
                <p className="text-sm text-[#101820] font-medium">Amine Harch El Korane</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Founder &amp; CEO, Harch Corp</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: ROADMAP / TIMELINE
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#F7F7F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101820] tracking-tight mb-16">
              2024 — 2030
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[rgba(0,0,0,0.08)]" />

            <div className="space-y-12">
              {roadmap.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-12 relative">
                    {/* Dot */}
                    <div className="relative z-10 shrink-0 w-8 md:w-16 flex justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#101820] border-2 border-white shadow-sm mt-1.5" />
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <span className="text-xs font-semibold text-[#C9A84C] tracking-[0.15em] uppercase">
                        {item.year}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold text-[#101820] mt-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9: PHILOSOPHY — Africa's Potential
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <FadeIn>
              <div>
                <p className="text-5xl md:text-6xl font-semibold text-[#101820] mb-2">30%</p>
                <p className="golden-line mb-4" />
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  of the world&apos;s mineral reserves are in Africa. Yet the continent
                  captures less than 5% of the value chain. Harch Mining changes that equation.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <p className="text-5xl md:text-6xl font-semibold text-[#101820] mb-2">60%</p>
                <p className="golden-line mb-4" />
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  of the world&apos;s uncultivated arable land is in Africa. Harch Agri deploys
                  precision farming to convert this potential into food security and export revenue.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p className="text-5xl md:text-6xl font-semibold text-[#101820] mb-2">1.4B</p>
                <p className="golden-line mb-4" />
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  people — the youngest population on Earth. Harch Technology provides the digital
                  infrastructure to educate, connect, and empower the next generation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10: CTA
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#101820]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
              Ready to Build the Future?
            </h2>
            <p className="max-w-xl mx-auto text-base text-white/50 mb-10">
              Join the consortium building Africa&apos;s industrial sovereignty. From
              investment to partnership, the next century starts now.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#101820] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/investors"
                className="inline-flex items-center gap-2 border border-white/[0.15] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:border-white/30 transition-colors"
              >
                Investor Relations
                <ExternalLink size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
