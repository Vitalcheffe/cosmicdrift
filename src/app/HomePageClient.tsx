'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Globe } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { AfricaMap } from '@/components/AfricaMap';
import { LiveFeed } from '@/components/LiveFeed';
import { DataStream } from '@/components/DataStream';
import { PulseIndicator } from '@/components/PulseIndicator';
import { NetworkGrid } from '@/components/NetworkGrid';

/* ═══ DATA ═══ */
const verticals = [
  { version: '/0.1', name: 'Intelligence', fullName: 'Harch Intelligence', desc: 'Carbon-Aware GPU Cloud — 1,798 GPUs across 5 hubs in Morocco, powered by ~81.5% renewable energy at ~47 gCO2/kWh average. Carbon-aware scheduling with zero competitors in Africa.', stat: '1,798 GPUs', href: '/subsidiaries/intelligence', image: '/images/sections/comp-intel-dc.jpg', outcomes: ['1,798 GPUs Carbon-Optimized', 'Carbon-Aware Scheduling', '~47 gCO2/kWh Average'] },
  { version: '/0.2', name: 'Cement', fullName: 'Harch Cement', desc: 'Industrial Cement Production — 500kT/yr capacity serving West African construction boom. Vertically integrated from quarry to delivery.', stat: '500kT/yr', href: '/subsidiaries/cement', image: '/images/sections/comp-cement-const.jpg', outcomes: ['500kT/yr Production Output', 'Quarry-to-Delivery Integration', 'West Africa Supply Chain'] },
  { version: '/0.3', name: 'Energy', fullName: 'Harch Energy', desc: 'Renewable Energy & Green Hydrogen — 2GW+ solar, wind, and green hydrogen pipeline across Morocco and Sahel. Zero-carbon electricity for industrial operations.', stat: '2GW+ Pipeline', href: '/subsidiaries/energy', image: '/images/sections/comp-energy-wind.jpg', outcomes: ['2GW+ Pipeline', 'Green Hydrogen Export', 'Grid Stabilization'] },
  { version: '/0.4', name: 'Technology', fullName: 'Harch Technology', desc: 'Carbon-Aware GPU Cloud, Cyber & Satellite — Sovereign tech stack with the world\'s most carbon-efficient GPU cloud. Cybersecurity, satellite communications, and AI orchestration.', stat: '1,798 GPUs', href: '/subsidiaries/technology', image: '/images/sections/comp-tech-dish.jpg', outcomes: ['Carbon-Aware GPU Cloud', 'Cybersecurity Platforms', 'Satellite Communications'] },
  { version: '/0.5', name: 'Mining', fullName: 'Harch Mining', desc: 'Phosphates, Cobalt & Rare Earths — Strategic mineral extraction for the global energy transition. Africa holds 30% of reserves; we capture the value chain.', stat: '3 Minerals', href: '/subsidiaries/mining', image: '/images/sections/comp-mining-site.jpg', outcomes: ['Phosphate Processing', 'Cobalt Refining', 'In-Country Value Capture'] },
  { version: '/0.6', name: 'Agri', fullName: 'Harch Agri', desc: 'Precision Agriculture & Vertical Farms — Deploying IoT, drone monitoring, and vertical farming across 60% of the world\'s uncultivated arable land.', stat: '$35B Market', href: '/subsidiaries/agriculture', image: '/images/sections/comp-agri-aerial.jpg', outcomes: ['Precision IoT Farming', 'Drone Crop Monitoring', 'Vertical Farm Networks'] },
  { version: '/0.7', name: 'Water', fullName: 'Harch Water', desc: 'Desalination & Smart Water Networks — 200M m³/yr desalination capacity with AI-optimized distribution. Solving Africa\'s water security crisis.', stat: '200M m³/yr', href: '/subsidiaries/water', image: '/images/sections/comp-water-plant.jpg', outcomes: ['200M m³/yr Desalination', 'AI-Optimized Distribution', 'Continental Water Security'] },
];

const carouselSlides = [
  { title: 'Harch Intelligence', subtitle: 'Carbon-Aware Sovereign AI', desc: '1,798 GPUs across 5 Moroccan hubs at ~47 gCO2/kWh — the world\'s most carbon-efficient GPU cloud, with carbon-aware scheduling and sovereign data residency.', image: '/images/sections/comp-intel-dc.jpg', href: '/subsidiaries/intelligence' },
  { title: 'Harch Energy', subtitle: '2GW+ Renewable Energy Pipeline', desc: 'Solar, wind, and green hydrogen across Morocco and the Sahel — zero-carbon electricity for industrial sovereignty.', image: '/images/sections/comp-energy-wind.jpg', href: '/subsidiaries/energy' },
  { title: 'Harch Cement', subtitle: 'Building West Africa\'s Future', desc: '500kT/yr cement production — vertically integrated from quarry to delivery, serving the construction boom.', image: '/images/sections/comp-cement-const.jpg', href: '/subsidiaries/cement' },
  { title: 'Harch Technology', subtitle: 'Sovereign Digital Infrastructure', desc: 'AI platforms, cybersecurity, and satellite communications — the technology stack that Africa controls.', image: '/images/sections/comp-tech-dish.jpg', href: '/subsidiaries/technology' },
  { title: 'Harch Mining', subtitle: 'Capturing the Value Chain', desc: 'Strategic mineral extraction — phosphates, cobalt, and rare earths processed in-country for the energy transition.', image: '/images/sections/comp-mining-site.jpg', href: '/subsidiaries/mining' },
  { title: 'Harch Agri', subtitle: 'Precision Agriculture at Scale', desc: 'Deploying IoT, drone monitoring, and vertical farming across Africa\'s uncultivated arable land.', image: '/images/sections/comp-agri-aerial.jpg', href: '/subsidiaries/agriculture' },
  { title: 'Harch Water', subtitle: '200M m³/yr Desalination', desc: 'AI-optimized desalination and smart water networks solving Africa\'s water security crisis.', image: '/images/sections/comp-water-pipes.jpg', href: '/subsidiaries/water' },
];

const stats = [
  { value: 2400, prefix: '$', suffix: 'M+', label: 'Investment Pipeline', desc: 'Active capital deployment across 7 industrial verticals and 5 countries' },
  { value: 47, prefix: '~', suffix: '', label: 'gCO2/kWh Avg', desc: 'Carbon intensity — 89% lower than industry average of ~450 gCO2/kWh' },
  { value: 81.5, prefix: '', suffix: '%', label: 'Renewable Energy', desc: 'Average across all 5 GPU hubs — targeting 100% by 2028' },
  { value: 25000, prefix: '', suffix: '+', label: 'Jobs by 2030', desc: 'Direct employment target across all verticals' },
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
  { value: '30%', desc: 'of the world\'s mineral reserves are in Africa — yet the continent captures less than 5% of the value chain. Morocco alone holds 75% of global phosphate reserves, while the DRC produces 70% of the world\'s cobalt. Harch Mining builds in-country processing and refining capacity to ensure that resource wealth stays on the continent, converting raw extraction into industrial value.' },
  { value: '60%', desc: 'of the world\'s uncultivated arable land is in Africa, yet the continent spends $50 billion annually on food imports. Harch Agri deploys precision IoT sensors, drone monitoring, and vertical farming technology across this untapped potential, converting it into food security and export revenue at continental scale — with an integrated carbon credit API that no competitor offers.' },
  { value: '1.4B', desc: 'people — the youngest population on Earth with a median age of 19.7 years. Africa\'s digital economy is projected to grow from $115 billion to $712 billion by 2050, yet the continent hosts less than 1% of global data center capacity. Harch Intelligence provides the sovereign AI compute infrastructure — 1,798 GPUs scaling to 100,000+ — to educate, connect, and empower the next generation of African innovators.' },
];

const investmentTable = [
  { vertical: 'Intelligence', investment: '$800M', capacity: '500 MW / 100K+ GPUs', timeline: '2027', status: 'Engineering' },
  { vertical: 'Energy', investment: '$600M', capacity: '2GW+ Pipeline', timeline: '2027', status: 'Active' },
  { vertical: 'Technology', investment: '$400M', capacity: '50K+ GPUs / HarchOS', timeline: '2028', status: 'Design' },
  { vertical: 'Cement', investment: '$200M', capacity: '500kT/yr — Gambia', timeline: '2028', status: 'Permitted' },
  { vertical: 'Mining', investment: '$200M', capacity: 'Phosphates / Cobalt / REE', timeline: '2029', status: 'Exploration' },
  { vertical: 'Agri', investment: '$150M', capacity: 'Precision IoT / Vertical', timeline: '2029', status: 'Planning' },
  { vertical: 'Water', investment: '$150M', capacity: '200M m³/yr Desal.', timeline: '2030', status: 'Feasibility' },
];

const testimonials = [
  { quote: 'Harch Corp represents a new paradigm for African industrialization — one built on sovereignty, integration, and speed. Their model is exactly what the continent needs.', name: 'Dr. Aïcha Diallo', title: 'Former Minister of Industry', company: 'Republic of Senegal' },
  { quote: 'The Dakhla AI data center project is the most ambitious technology infrastructure initiative in African history. It will fundamentally reshape the continent\'s digital economy.', name: 'James Okonkwo', title: 'Managing Director', company: 'Africa Infrastructure Partners' },
  { quote: 'We evaluated over 30 industrial conglomerates for our Sahel energy partnership. Harch Corp\'s vertically integrated model and execution speed made them the clear choice.', name: 'Marie-Claire Dupont', title: 'Head of Infrastructure Investments', company: 'Sovereign Wealth Fund of Morocco' },
  { quote: 'Harch\'s approach to water infrastructure — combining desalination with AI-optimized distribution — is exactly the kind of innovation Africa needs to solve its water crisis at scale.', name: 'Prof. Youssef El Amrani', title: 'Director', company: 'Pan-African Water Council' },
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
export default function HomePageClient() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVertical, setActiveVertical] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══════════════════════════════════════════
          S1: HERO CAROUSEL — Full-bleed photo backgrounds
          ═══════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-end overflow-hidden"
      >
        {/* Slides */}
        {carouselSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover industrial-image"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-20" />

        {/* Content overlay */}
        <div className="relative z-30 max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <Globe size={12} className="text-white/60" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">Building Africa&apos;s Industrial Sovereignty</span>
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-extrabold text-white leading-[1.02] tracking-[-0.02em] mb-4">
              {carouselSlides[activeSlide].title}
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-tight mb-3">
              {carouselSlides[activeSlide].subtitle}
            </p>

            <p className="max-w-xl text-[15px] text-white/50 leading-relaxed mb-8">
              {carouselSlides[activeSlide].desc}
            </p>

            <Link
              href={carouselSlides[activeSlide].href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group"
            >
              Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel navigation */}
        <div className="absolute right-6 md:right-12 bottom-24 md:bottom-32 z-30 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] text-white/40 font-medium tabular-nums font-[family-name:var(--font-space-mono)]">
            {String(activeSlide + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}
          </span>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-medium">Scroll</span>
          <ChevronDown size={14} className="text-white/40 animate-bounce-slow" />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          S2: VERTICALS — Palantir Visual Grid + Carousel
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28">
          <FadeIn>
            <div className="mb-12">
              <p className="section-label mb-4">Our Verticals</p>
              <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-tight">
                Infrastructure for<br />the Next Century
              </h2>
            </div>
          </FadeIn>

          {/* ── Visual Card Grid — All 7 verticals visible at once ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
            {verticals.map((v, i) => {
              const accentColors = ['#C7923E', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#22C55E', '#3B82F6'];
              const sectionImages = [
                '/images/sections/comp-intel-server2.jpg',
                '/images/sections/comp-cement-mixer.jpg',
                '/images/sections/comp-energy-solar.jpg',
                '/images/sections/comp-tech-ai.jpg',
                '/images/sections/comp-mining-excavator.jpg',
                '/images/sections/comp-agri-green.jpg',
                '/images/sections/comp-water-pipes.jpg',
              ];
              const color = accentColors[i];
              return (
                <Link key={v.version} href={v.href} className="group block">
                  <FadeIn delay={i * 0.06}>
                    <div className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#121212] transition-all duration-500 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                      {/* Image — 40% of card height */}
                      <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                        <Image
                          src={sectionImages[i]}
                          alt={v.fullName}
                          fill
                          className="object-cover industrial-image group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Color gradient overlay — sector-specific */}
                        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, ${color}15 70%, ${color}30 100%)` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                        {/* Version + Stat badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] backdrop-blur-md" style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}30` }}>
                            {v.version}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.1em] stat-mono backdrop-blur-md bg-black/40 text-white/80 border border-[rgba(255,255,255,0.1)]">
                            {v.stat}
                          </span>
                        </div>
                      </div>
                      {/* Text content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }} />
                          <h3 className="text-lg font-bold text-white tracking-[-0.01em] group-hover:tracking-[0.01em] transition-all">
                            {v.name}
                          </h3>
                        </div>
                        <p className="text-[13px] text-[#999999] leading-[1.6] mb-4 line-clamp-2">
                          {v.desc}
                        </p>
                        {/* Outcomes — color-coded dots */}
                        <div className="space-y-1.5">
                          {v.outcomes.map((outcome) => (
                            <div key={outcome} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: `${color}80` }} />
                              <span className="text-[11px] text-[#666666]">{outcome}</span>
                            </div>
                          ))}
                        </div>
                        {/* CTA */}
                        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)]" style={{ color: `${color}90` }}>
                            Explore
                          </span>
                          <ArrowRight size={12} className="text-[#666666] group-hover:translate-x-1 group-hover:text-white transition-all" />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Full-bleed carousel — selected vertical deep-dive ── */}
        <div className="border-t border-[rgba(255,255,255,0.04)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">Deep Dive</p>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {verticals.map((v, i) => (
                  <button
                    key={v.version}
                    onClick={() => setActiveVertical(i)}
                    className={`shrink-0 px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase rounded transition-all duration-300 ${
                      i === activeVertical
                        ? 'bg-white text-black'
                        : 'text-[#666666] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Full-bleed feature image */}
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            {verticals.map((v, i) => (
              <div
                key={v.version}
                className={`absolute inset-0 transition-opacity duration-800 ${
                  i === activeVertical ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{ transition: 'opacity 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <Image src={v.image} alt={v.fullName} fill className="object-cover industrial-image" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
            {/* Text overlay — bottom left */}
            <div className="relative z-30 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-end pb-12 md:pb-16">
              <motion.div
                key={activeVertical}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 font-[family-name:var(--font-space-mono)]">{verticals[activeVertical].version}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80 stat-mono">{verticals[activeVertical].stat}</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em] mb-3">
                  {verticals[activeVertical].name}
                </h3>
                <p className="max-w-lg text-[14px] text-white/60 leading-relaxed mb-6">
                  {verticals[activeVertical].desc}
                </p>
                <Link href={verticals[activeVertical].href} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group">
                  Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            {/* Navigation arrows */}
            <div className="absolute right-6 md:right-12 bottom-12 md:bottom-16 z-30 flex items-center gap-3">
              <button onClick={() => setActiveVertical((prev) => (prev - 1 + verticals.length) % verticals.length)} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors" aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[11px] text-white/40 font-medium tabular-nums font-[family-name:var(--font-space-mono)]">
                {String(activeVertical + 1).padStart(2, '0')} / {String(verticals.length).padStart(2, '0')}
              </span>
              <button onClick={() => setActiveVertical((prev) => (prev + 1) % verticals.length)} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors" aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image break — Overview */}
      <section className="photo-section relative min-h-[40vh] flex items-center justify-center">
        <Image src="/images/sections/overview-construction.jpg" alt="Harch Corp Industrial Operations" fill className="object-cover industrial-image" />
        <div className="relative z-10 text-center">
          <FadeIn>
            <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.02em] mb-4">
              7 Verticals. 5 Countries.
            </p>
            <p className="text-2xl md:text-3xl font-light text-white/60">$2.4B Investment Pipeline</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S3: INTERACTIVE WORLD MAP — Africa with blinking dots
          ═══════════════════════════════════════════ */}
      <section id="global-presence" className="py-28 md:py-36 bg-[#121212] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="section-label mb-4">Deployments / Real-Time</p>
              <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em]">
                Operating Across<br />Africa
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-[15px] text-[#999999] leading-relaxed">
                From our Casablanca headquarters to Dakhla, Gambia, and the Sahel — our operations span the continent&apos;s most strategic industrial corridors.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <AfricaMap />
          </FadeIn>

          {/* Live Feed + Map side panel */}
          <FadeIn delay={0.35}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              <div className="lg:col-span-2">
                {/* Operational status bars */}
                <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">
                      System Health
                    </span>
                    <div className="flex items-center gap-1.5">
                      <PulseIndicator size={6} />
                      <span className="text-[8px] text-[#999999] font-[family-name:var(--font-space-mono)]">ALL NOMINAL</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Intelligence /0.1', value: 87, status: 'Engineering' },
                      { label: 'Energy /0.3', value: 94, status: 'Active' },
                      { label: 'Cement /0.2', value: 72, status: 'Permitted' },
                      { label: 'Technology /0.4', value: 55, status: 'Design' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-bold tracking-[0.1em] text-[#999999] font-[family-name:var(--font-space-mono)]">
                            {item.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] text-[#666666] font-[family-name:var(--font-space-mono)]">{item.status.toUpperCase()}</span>
                            <span className="text-[9px] text-white/60 font-[family-name:var(--font-space-mono)]">{item.value}%</span>
                          </div>
                        </div>
                        <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.value > 80 ? 'rgba(255,255,255,0.4)' : item.value > 60 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <LiveFeed />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Subtle data stream background */}
        <DataStream opacity={0.02} count={15} speed={0.3} />
      </section>

      {/* ═══════════════════════════════════════════
          S4: TESTIMONIALS — Palantir partner quotes
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Partners & Endorsements</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Trusted by Leaders<br />Across Africa
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <p className="text-[15px] text-[#CCCCCC] leading-[1.7] italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[12px] font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{t.name}</p>
                      <p className="text-[11px] text-[#666666]">{t.title}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S5: PHOTO BACKGROUND SECTION — Energy
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[70vh] flex items-center">
        <Image
          src="/images/sections/energy-solar-farm.jpg"
          alt="Harch Energy Renewable Infrastructure"
          fill
          className="object-cover industrial-image"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">Harch Energy /0.3</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[64px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              2GW+ Renewable<br />Energy Pipeline
            </h2>
            <p className="max-w-lg text-[15px] text-white/60 leading-relaxed mb-8">
              Harch Energy is developing over 2 gigawatts of renewable energy capacity across Morocco and the Sahel — combining solar, wind, and green hydrogen production to power industrial operations with zero-carbon electricity.
            </p>
            <Link href="/subsidiaries/energy" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group">
              Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S6: STATS WITH ANIMATED COUNTERS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Scale & Impact</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              By the Numbers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <PulseIndicator size={5} speed={3} color="#C7923E" />
                    <span className="text-[8px] font-bold tracking-[0.15em] uppercase cmd-amber font-[family-name:var(--font-space-mono)]">LIVE</span>
                  </div>
                  <p className={`text-3xl md:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-none mb-2 stat-mono stat-jitter ${i === 1 ? '' : i === 2 ? 'stat-jitter-delay-1' : i === 3 ? 'stat-jitter-delay-2' : 'stat-jitter-delay-3'}`}>
                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[12px] text-[#666666] leading-relaxed">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-[11px] text-[#666666] italic">
              * Projected targets based on current pipeline and regulatory approvals. Updated Q1 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S7: DATA TABLE — Investment breakdown
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Investment Pipeline</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Capital Deployment
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              $2.4B+ in active capital deployment across 7 industrial verticals, spanning 5 countries and multiple project phases.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#1E1E1E] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vertical</th>
                      <th>Investment</th>
                      <th>Capacity</th>
                      <th>Timeline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentTable.map((row) => (
                      <tr key={row.vertical}>
                        <td>{row.vertical}</td>
                        <td className="font-semibold">{row.investment}</td>
                        <td>{row.capacity}</td>
                        <td>{row.timeline}</td>
                        <td>
                          <span className={`status-badge ${
                            row.status === 'Active' ? 'status-badge-active' :
                            row.status === 'Engineering' ? 'status-badge-engineering' :
                            row.status === 'Permitted' ? 'status-badge-permitted' :
                            'status-badge-design'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[11px] text-[#666666]">Total investment pipeline: $2.4B+ across 7 verticals. Data as of Q1 2026.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S8: IMPACT STUDY — Intelligence
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Intelligence /0.1</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#1E1E1E] image-reveal">
                <Image src="/images/sections/intelligence-detail.jpg" alt="Harch Intelligence AI Data Center" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#000000]/70 backdrop-blur-md px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">1,798 GPUs Carbon-Optimized</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
                Africa&apos;s Carbon-Aware<br />GPU Cloud
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                Harch Intelligence operates 1,798 GPUs across 5 carbon-optimized hubs in Morocco —
                with an average carbon intensity of ~47 gCO2/kWh and ~81.5% renewable energy.
                Carbon-aware scheduling automatically routes workloads to the greenest hub in real-time,
                delivering 40-60% cost savings vs. AWS/GCP/Azure while maintaining sovereign data residency
                under Moroccan jurisdiction. Zero competitors in Africa offer carbon-aware GPU scheduling.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { val: '1,798', label: 'GPUs' },
                  { val: '~47', label: 'gCO2/kWh' },
                  { val: '81.5%', label: 'Renewable' },
                ].map((s, j) => (
                  <div key={s.label}>
                    <p className={`text-2xl font-bold text-white stat-mono stat-jitter ${j === 1 ? 'stat-jitter-delay-1' : j === 2 ? 'stat-jitter-delay-2' : ''}`}>{s.val}</p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2 text-sm font-semibold text-[#999999] hover:text-white transition-colors duration-300 group">
                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S8.5: BUILD ON HARCHOS — SDK Install + Code Examples
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-label mb-4">Developer Platform</p>
              <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em]">
                Build on HarchOS<span className="text-[#C7923E]">.</span>
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-[15px] text-[#999999] leading-relaxed">
                Native SDKs for Python and TypeScript. Carbon-aware scheduling, sovereign defaults, and zero-config onboarding.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <img src="https://img.shields.io/pypi/v/harchos.svg" alt="PyPI" className="h-6" />
                <img src="https://img.shields.io/npm/v/@harchos/sdk.svg" alt="npm" className="h-6" />
                <img src="https://img.shields.io/pypi/dm/harchos.svg" alt="Downloads" className="h-6" />
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Python SDK */}
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#121212] p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3572A5]/15 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3572A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Python SDK</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src="https://img.shields.io/pypi/v/harchos.svg?label=PyPI" alt="PyPI" className="h-4" />
                      <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">pip install harchos</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0D0D0D] rounded-lg p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto">
                  <p className="text-[#666666]">{'# Install'}</p>
                  <p><span className="text-[#C7923E]">pip install</span> <span className="text-[#98C379]">harchos</span></p>
                  <br/>
                  <p className="text-[#666666]">{'# Get carbon intensity for Morocco'}</p>
                  <p><span className="text-[#C678DD]">from</span> harchos <span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">HarchOSClient</span></p>
                  <br/>
                  <p><span className="text-[#C678DD]">with</span> <span className="text-[#E5C07B]">HarchOSClient</span>(<span className="text-[#98C379]">api_key</span>=<span className="text-[#98C379]">&quot;hsk_...&quot;</span>) <span className="text-[#C678DD]">as</span> client:</p>
                  <p>&nbsp;&nbsp;carbon = client.carbon.get_intensity(<span className="text-[#98C379]">&quot;MA&quot;</span>)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Morocco: </span><span className="text-[#C7923E]">{'{carbon.carbon_intensity_gco2_kwh}'}</span><span className="text-[#98C379]"> gCO2/kWh&quot;</span>)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Renewable: </span><span className="text-[#C7923E]">{'{carbon.renewable_percentage}'}</span><span className="text-[#98C379]">%&quot;</span>)</p>
                  <br/>
                  <p className="text-[#666666]">{'# Find the greenest hub'}</p>
                  <p>&nbsp;&nbsp;optimal = client.carbon.optimal_hub(</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">region</span>=<span className="text-[#98C379]">&quot;morocco&quot;</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">gpu_count</span>=<span className="text-[#D19A66]">4</span>,</p>
                  <p>&nbsp;&nbsp;)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Best hub: </span><span className="text-[#C7923E]">{'{optimal.recommended_hub_name}'}</span><span className="text-[#98C379]">&quot;</span>)</p>
                </div>
              </div>
            </FadeIn>

            {/* TypeScript SDK */}
            <FadeIn delay={0.15}>
              <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#121212] p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#2B7489]/15 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B7489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">TypeScript SDK</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src="https://img.shields.io/npm/v/@harchos/sdk.svg?label=npm" alt="npm" className="h-4" />
                      <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">npm i @harchos/sdk</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0D0D0D] rounded-lg p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto">
                  <p className="text-[#666666]">{'// Install'}</p>
                  <p><span className="text-[#C7923E]">npm install</span> <span className="text-[#98C379]">@harchos/sdk</span></p>
                  <br/>
                  <p className="text-[#666666]">{'// Get carbon intensity for Morocco'}</p>
                  <p><span className="text-[#C678DD]">import</span> {'{'} <span className="text-[#E5C07B]">HarchOSClient</span> {'}'} <span className="text-[#C678DD]">from</span> <span className="text-[#98C379]">&quot;@harchos/sdk&quot;</span>;</p>
                  <br/>
                  <p><span className="text-[#C678DD]">const</span> client = <span className="text-[#C678DD]">new</span> <span className="text-[#E5C07B]">HarchOSClient</span>({'{'} <span className="text-[#98C379]">apiKey</span>: <span className="text-[#98C379]">&quot;hsk_...&quot;</span> {'}'});</p>
                  <p><span className="text-[#C678DD]">const</span> carbon = <span className="text-[#C678DD]">await</span> client.carbon.getIntensity(<span className="text-[#98C379]">&quot;MA&quot;</span>);</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Morocco: </span><span className="text-[#C7923E]">{'${carbon.carbon_intensity_gco2_kwh}'}</span><span className="text-[#98C379]"> gCO2/kWh`</span>);</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Renewable: </span><span className="text-[#C7923E]">{'${carbon.renewable_percentage}'}</span><span className="text-[#98C379]">%`</span>);</p>
                  <br/>
                  <p className="text-[#666666]">{'// Find the greenest hub'}</p>
                  <p><span className="text-[#C678DD]">const</span> optimal = <span className="text-[#C678DD]">await</span> client.carbon.optimalHub({'{'}</p>
                  <p>&nbsp;&nbsp;<span className="text-[#98C379]">region</span>: <span className="text-[#98C379]">&quot;morocco&quot;</span>,</p>
                  <p>&nbsp;&nbsp;<span className="text-[#98C379]">gpu_count</span>: <span className="text-[#D19A66]">4</span>,</p>
                  <p>{'}'});</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Best hub: </span><span className="text-[#C7923E]">{'${optimal.recommended_hub_name}'}</span><span className="text-[#98C379]">`</span>);</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <Link href="/developers" className="inline-flex items-center gap-2 text-[14px] text-[#C7923E] font-semibold hover:text-[#C7923E]/80 transition-colors">
                Full Developer Documentation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S9: SECOND PHOTO BACKGROUND — Mining/Cement
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[70vh] flex items-center">
        <Image
          src="/images/sections/mining-smelter.jpg"
          alt="Harch Mining Operations"
          fill
          className="object-cover industrial-image"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">Harch Mining /0.5</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[64px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              Capturing the<br />Value Chain
            </h2>
            <p className="max-w-lg text-[15px] text-white/60 leading-relaxed mb-8">
              Africa holds 30% of the world&apos;s mineral reserves yet captures less than 5% of the value chain. Harch Mining builds processing and refining capacity in-country — ensuring resource wealth stays on the continent.
            </p>
            <Link href="/subsidiaries/mining" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group">
              Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S10: IMPACT STUDY — Energy (reversed)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Energy /0.3</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.15} className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
                2GW+ of Renewable<br />Energy Pipeline
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                Harch Energy is developing over 2 gigawatts of renewable energy capacity across
                Morocco and the Sahel region — combining solar, wind, and green hydrogen production
                to power industrial operations and data centers with zero-carbon electricity. Our
                integrated approach ensures energy sovereignty for the continent while creating
                a model for sustainable industrialization worldwide.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { val: '2GW+', label: 'Pipeline' },
                  { val: '3', label: 'Energy Sources' },
                  { val: 'Zero', label: 'Carbon' },
                ].map((s, j) => (
                  <div key={s.label}>
                    <p className={`text-2xl font-bold text-white stat-mono stat-jitter ${j === 1 ? 'stat-jitter-delay-1' : j === 2 ? 'stat-jitter-delay-2' : ''}`}>{s.val}</p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/subsidiaries/energy" className="inline-flex items-center gap-2 text-sm font-semibold text-[#999999] hover:text-white transition-colors duration-300 group">
                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
            <FadeIn className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#1E1E1E] image-reveal">
                <Image src="/images/sections/energy-hydrogen.jpg" alt="Harch Energy Green Hydrogen" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#000000]/70 backdrop-blur-md px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">2GW+ Renewable Pipeline</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S11: CEO QUOTE / PHILOSOPHY
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[960px] mx-auto px-6 md:px-12">
          <FadeIn>
            <span className="text-7xl md:text-9xl text-[rgba(255,255,255,0.04)] leading-none font-serif block -mb-12">&ldquo;</span>
            <blockquote className="text-xl md:text-2xl lg:text-[32px] font-light text-white leading-[1.4] mb-10">
              Africa doesn&apos;t need aid — it needs infrastructure. It doesn&apos;t need pity
              — it needs partnership on equal terms. We build the systems that convert
              potential into power.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white" />
              <div>
                <p className="text-sm text-white font-semibold">Amine Harch El Korane</p>
                <p className="text-[11px] text-[#666666] mt-0.5">Founder &amp; CEO, Harch Corp</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S12: AFRICA'S POTENTIAL — 3 stat cards
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">The Opportunity</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Africa&apos;s Potential,<br />By the Numbers
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {africaStats.map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="card p-8 h-full">
                  <p className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-none stat-mono stat-jitter ${i === 1 ? 'stat-jitter-delay-1' : i === 2 ? 'stat-jitter-delay-2' : ''}`}>{item.value}</p>
                  <div className="accent-line mb-5" />
                  <p className="text-[13px] text-[#999999] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S13: TIMELINE/ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              2024 &mdash; 2030
            </h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-10">
              {roadmap.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1.5 ${
                        item.status === 'completed' ? 'bg-white border-white' :
                        item.status === 'active' ? 'bg-white border-white shadow-md shadow-white/20' :
                        'bg-transparent border-[rgba(255,255,255,0.15)]'
                      }`} />
                    </div>
                    <div className="pb-2">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-space-mono)] ${
                        item.status === 'active' ? 'text-white' : 'text-[#666666]'
                      }`}>
                        {item.year}
                        {item.status === 'active' && ' — Current'}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-1">{item.title}</h3>
                      <p className="text-[13px] text-[#999999] leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S14: OPERATOR MODEL
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <p className="section-label mb-4">Our Model</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                Not a Service Provider.<br />Not a Consultancy.<br />
                <span className="gradient-text">An Operator.</span>
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                Harch Corp doesn&apos;t advise — we build. We own the entire value chain from raw materials
                to finished infrastructure. This vertically integrated model creates structural cost
                advantages of 30-50% versus competitors who rely on external supply chains. We don&apos;t
                write reports about Africa&apos;s potential — we convert it into industrial power.
              </p>
              <Link href="/strategy" className="inline-flex items-center gap-2 text-sm font-semibold text-[#999999] hover:text-white transition-colors duration-300 group">
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
                  <div key={i} className="card p-5">
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[12px] text-[#999999] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S15: NEWSROOM PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Latest Updates</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em]">Newsroom</h2>
              </div>
              <Link href="/newsroom" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-white transition-colors group">
                All Updates <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Harch Intelligence Deploys 1,798 GPUs Across 5 Carbon-Optimized Hubs', date: 'March 2026', tag: 'Intelligence' },
              { title: 'Harch Energy Reaches 2GW+ Renewable Pipeline Milestone', date: 'February 2026', tag: 'Energy' },
              { title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals', date: 'January 2026', tag: 'Corporate' },
            ].map((article, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link href="/newsroom" className="group block card p-6 transition-all duration-300">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[9px] font-bold tracking-[0.12em] uppercase text-white mb-3">{article.tag}</span>
                  <h3 className="text-[15px] font-bold text-[#CCCCCC] leading-snug mb-3 group-hover:text-white transition-colors">{article.title}</h3>
                  <p className="text-[11px] text-[#666666] tracking-wide">{article.date}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S16: CTA SECTION — Dark dramatic
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
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
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all duration-300">
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
