'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Card3D,
  MagneticButton,
  ParallaxSection,
  SmoothLink,
  TextReveal,
  SectionDivider,
  CountUp,
} from '@/components/ui/motion';
import { InteractivePlatform } from '@/components/InteractivePlatform';
import { AfricaMap } from '@/components/AfricaMap';
import { LiveFeed } from '@/components/LiveFeed';
import { DataStream } from '@/components/DataStream';
import { PulseIndicator } from '@/components/PulseIndicator';
import { NetworkGrid } from '@/components/NetworkGrid';
import { TypingText } from '@/components/PulseIndicator';

/* ═══════════════════════════════════════════════════════════════
   DATA — All existing data preserved, images added
   ═══════════════════════════════════════════════════════════════ */

const verticals = [
  { version: '/0.1', name: 'Intelligence', fullName: 'Harch Intelligence', desc: 'Carbon-Aware GPU Cloud — 1,798 GPUs across 5 hubs in Morocco, powered by ~81.5% renewable energy at ~47 gCO2/kWh average. Carbon-aware scheduling with zero competitors in Africa.', stat: '1,798 GPUs', href: '/subsidiaries/intelligence', gradient: 'from-[#1a2a3a] to-[#0d1520]', accent: '#8B9DAF', outcomes: ['1,798 GPUs Carbon-Optimized', 'Carbon-Aware Scheduling', '~47 gCO2/kWh Average'], image: '/images/sections/intelligence-gpu-cluster.jpg', deepDiveImage: '/images/sections/intelligence-exterior.jpg' },
  { version: '/0.2', name: 'Cement', fullName: 'Harch Cement', desc: 'Industrial Cement Production — 500kT/yr capacity serving West African construction boom. Vertically integrated from quarry to delivery.', stat: '500kT/yr', href: '/subsidiaries/cement', gradient: 'from-[#2a2420] to-[#151210]', accent: '#A08878', outcomes: ['500kT/yr Production Output', 'Quarry-to-Delivery Integration', 'West Africa Supply Chain'], image: '/images/sections/cement-kiln.jpg', deepDiveImage: '/images/sections/cement-quarry.jpg' },
  { version: '/0.3', name: 'Energy', fullName: 'Harch Energy', desc: 'Renewable Energy & Green Hydrogen — 2GW+ solar, wind, and green hydrogen pipeline across Morocco and Sahel. Zero-carbon electricity for industrial operations.', stat: '2GW+ Pipeline', href: '/subsidiaries/energy', gradient: 'from-[#1a2a1a] to-[#0d150d]', accent: '#6B9F6B', outcomes: ['2GW+ Pipeline', 'Green Hydrogen Export', 'Grid Stabilization'], image: '/images/sections/energy-wind-farm.jpg', deepDiveImage: '/images/sections/energy-hydrogen-plant.jpg' },
  { version: '/0.4', name: 'Technology', fullName: 'Harch Technology', desc: 'Carbon-Aware GPU Cloud, Cyber & Satellite — Sovereign tech stack with the world\'s most carbon-efficient GPU cloud. Cybersecurity, satellite communications, and AI orchestration.', stat: '1,798 GPUs', href: '/subsidiaries/technology', gradient: 'from-[#1a1a2a] to-[#0d0d15]', accent: '#7888A8', outcomes: ['Carbon-Aware GPU Cloud', 'Cybersecurity Platforms', 'Satellite Communications'], image: '/images/sections/tech-ground-station.jpg', deepDiveImage: '/images/sections/tech-cyber.jpg' },
  { version: '/0.5', name: 'Mining', fullName: 'Harch Mining', desc: 'Phosphates, Cobalt & Rare Earths — Strategic mineral extraction for the global energy transition. Africa holds 30% of reserves; we capture the value chain.', stat: '3 Minerals', href: '/subsidiaries/mining', gradient: 'from-[#2a1a1a] to-[#150d0d]', accent: '#A87878', outcomes: ['Phosphate Processing', 'Cobalt Refining', 'In-Country Value Capture'], image: '/images/sections/mining-smelter.jpg', deepDiveImage: '/images/sections/mining-processing.jpg' },
  { version: '/0.6', name: 'Agri', fullName: 'Harch Agri', desc: 'Precision Agriculture & Vertical Farms — Deploying IoT, drone monitoring, and vertical farming across 60% of the world\'s uncultivated arable land.', stat: '$35B Market', href: '/subsidiaries/agriculture', gradient: 'from-[#1a2a1a] to-[#0d150d]', accent: '#6BAF6B', outcomes: ['Precision IoT Farming', 'Drone Crop Monitoring', 'Vertical Farm Networks'], image: '/images/sections/agri-vertical-farm.jpg', deepDiveImage: '/images/sections/agri-iot-sensor.jpg' },
  { version: '/0.7', name: 'Water', fullName: 'Harch Water', desc: 'Desalination & Smart Water Networks — 200M m³/yr desalination capacity with AI-optimized distribution. Solving Africa\'s water security crisis.', stat: '200M m³/yr', href: '/subsidiaries/water', gradient: 'from-[#1a2030] to-[#0d1018]', accent: '#6888A8', outcomes: ['200M m³/yr Desalination', 'AI-Optimized Distribution', 'Continental Water Security'], image: '/images/sections/water-treatment.jpg', deepDiveImage: '/images/sections/water-desal-plant.jpg' },
  { version: '/0.8', name: 'Finance', fullName: 'Harch Finance', desc: 'Green Bonds, Project Finance & Islamic Finance — Structuring capital flows for sovereign infrastructure. Green bonds, sustainability-linked loans, trade finance, and carbon credit monetization.', stat: '$2.4B+', href: '/subsidiaries/finance', gradient: 'from-[#2a2a1a] to-[#15150d]', accent: '#A8A068', outcomes: ['Green Bonds & Sukuk', 'Project Finance Structuring', 'Carbon Credit Monetization'], image: '/images/sections/finance-trading.jpg', deepDiveImage: '/images/sections/finance-district.jpg' },
];

const carouselSlides = [
  { title: 'Harch Intelligence', subtitle: 'Carbon-Aware Sovereign AI', desc: '1,798 GPUs across 5 Moroccan hubs at ~47 gCO2/kWh — the world\'s most carbon-efficient GPU cloud, with carbon-aware scheduling and sovereign data residency.', href: '/subsidiaries/intelligence', image: '/images/sections/intelligence-rack.jpg', accent: '#8B9DAF' },
  { title: 'Harch Energy', subtitle: '2GW+ Renewable Energy Pipeline', desc: 'Solar, wind, and green hydrogen across Morocco and the Sahel — zero-carbon electricity for industrial sovereignty.', href: '/subsidiaries/energy', image: '/images/sections/energy-solar-farm.jpg', accent: '#6B9F6B' },
  { title: 'Harch Cement', subtitle: 'Building West Africa\'s Future', desc: '500kT/yr cement production — vertically integrated from quarry to delivery, serving the construction boom.', href: '/subsidiaries/cement', image: '/images/sections/cement-factory.jpg', accent: '#A08878' },
  { title: 'Harch Technology', subtitle: 'Sovereign Digital Infrastructure', desc: 'AI platforms, cybersecurity, and satellite communications — the technology stack that Africa controls.', href: '/subsidiaries/technology', image: '/images/sections/tech-satellite.jpg', accent: '#7888A8' },
  { title: 'Harch Mining', subtitle: 'Capturing the Value Chain', desc: 'Strategic mineral extraction — phosphates, cobalt, and rare earths processed in-country for the energy transition.', href: '/subsidiaries/mining', image: '/images/sections/mining-open-pit.jpg', accent: '#A87878' },
  { title: 'Harch Agri', subtitle: 'Precision Agriculture at Scale', desc: 'Deploying IoT, drone monitoring, and vertical farming across Africa\'s uncultivated arable land.', href: '/subsidiaries/agriculture', image: '/images/sections/agri-aerial-drone.jpg', accent: '#6BAF6B' },
  { title: 'Harch Water', subtitle: '200M m³/yr Desalination', desc: 'AI-optimized desalination and smart water networks solving Africa\'s water security crisis.', href: '/subsidiaries/water', image: '/images/sections/water-desal.jpg', accent: '#6888A8' },
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
  { value: '30%', numValue: 30, desc: 'of the world\'s mineral reserves are in Africa — yet the continent captures less than 5% of the value chain. Morocco alone holds 75% of global phosphate reserves, while the DRC produces 70% of the world\'s cobalt. Harch Mining builds in-country processing and refining capacity to ensure that resource wealth stays on the continent, converting raw extraction into industrial value.' },
  { value: '60%', numValue: 60, desc: 'of the world\'s uncultivated arable land is in Africa, yet the continent spends $50 billion annually on food imports. Harch Agri deploys precision IoT sensors, drone monitoring, and vertical farming technology across this untapped potential, converting it into food security and export revenue at continental scale — with an integrated carbon credit API that no competitor offers.' },
  { value: '1.4B', numValue: 1400, desc: 'people — the youngest population on Earth with a median age of 19.7 years. Africa\'s digital economy is projected to grow from $115 billion to $712 billion by 2050, yet the continent hosts less than 1% of global data center capacity. Harch Intelligence provides the sovereign AI compute infrastructure — 1,798 GPUs scaling to 100,000+ — to educate, connect, and empower the next generation of African innovators.' },
];

const investmentTable = [
  { vertical: 'Intelligence', investment: '$800M', capacity: '500 MW / 100K+ GPUs', timeline: '2027', status: 'Engineering' },
  { vertical: 'Energy', investment: '$600M', capacity: '2GW+ Pipeline', timeline: '2027', status: 'Active' },
  { vertical: 'Technology', investment: '$400M', capacity: '50K+ GPUs / HarchOS', timeline: '2028', status: 'Design' },
  { vertical: 'Cement', investment: '$200M', capacity: '500kT/yr — Gambia', timeline: '2028', status: 'Permitted' },
  { vertical: 'Mining', investment: '$200M', capacity: 'Phosphates / Cobalt / REE', timeline: '2029', status: 'Exploration' },
  { vertical: 'Agri', investment: '$150M', capacity: 'Precision IoT / Vertical', timeline: '2029', status: 'Planning' },
  { vertical: 'Water', investment: '$150M', capacity: '200M m³/yr Desal.', timeline: '2030', status: 'Feasibility' },
  { vertical: 'Finance', investment: '$100M', capacity: 'Green Bonds / Sukuk', timeline: '2026', status: 'Active' },
];

const testimonials = [
  { quote: 'Harch Corp represents a new paradigm for African industrialization — one built on sovereignty, integration, and speed. Their model is exactly what the continent needs.', name: 'Dr. Aïcha Diallo', title: 'Former Minister of Industry', company: 'Republic of Senegal' },
  { quote: 'The Dakhla AI data center project is the most ambitious technology infrastructure initiative in African history. It will fundamentally reshape the continent\'s digital economy.', name: 'James Okonkwo', title: 'Managing Director', company: 'Africa Infrastructure Partners' },
  { quote: 'We evaluated over 30 industrial conglomerates for our Sahel energy partnership. Harch Corp\'s vertically integrated model and execution speed made them the clear choice.', name: 'Marie-Claire Dupont', title: 'Head of Infrastructure Investments', company: 'Sovereign Wealth Fund of Morocco' },
  { quote: 'Harch\'s approach to water infrastructure — combining desalination with AI-optimized distribution — is exactly the kind of innovation Africa needs to solve its water crisis at scale.', name: 'Prof. Youssef El Amrani', title: 'Director', company: 'Pan-African Water Council' },
];

const operatorPrinciples = [
  { title: 'Vertically Integrated', desc: 'Energy + Materials + Technology + Operations — all under one roof. We control every link in the chain.' },
  { title: 'Sovereign by Design', desc: 'Infrastructure that Africa owns, operates, and controls. No dependency on foreign operators or technology.' },
  { title: 'Speed at Scale', desc: 'We move with urgency. The continent cannot afford to wait. Every project is executed with precision and pace.' },
  { title: 'World-Class Standards', desc: 'From engineering to governance, we accept nothing less than the best. International certifications across all verticals.' },
];

const newsArticles = [
  { title: 'Harch Intelligence Deploys 1,798 GPUs Across 5 Carbon-Optimized Hubs', date: 'March 2026', tag: 'Intelligence' },
  { title: 'Harch Energy Reaches 2GW+ Renewable Pipeline Milestone', date: 'February 2026', tag: 'Energy' },
  { title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals', date: 'January 2026', tag: 'Corporate' },
];

/* ═══════════════════════════════════════════════════════════════
   STATUS BADGE HELPER
   ═══════════════════════════════════════════════════════════════ */

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'Active': return 'status-badge-active';
    case 'Engineering': return 'status-badge-engineering';
    case 'Permitted': return 'status-badge-permitted';
    default: return 'status-badge-design';
  }
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

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
    <div className="bg-[#0D0D0D]">

      {/* ═══════════════════════════════════════════════════════════
          S1: HERO CAROUSEL — Real images, TextReveal, Parallax
          ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100dvh] flex items-end overflow-hidden"
      >
        {/* Background images with crossfade */}
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
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
            {/* Dark gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.7) 40%, rgba(13,13,13,0.4) 70%, rgba(13,13,13,0.3) 100%)`,
              }}
            />
            {/* Accent glow */}
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                background: `radial-gradient(ellipse at 30% 70%, ${slide.accent}10 0%, transparent 60%)`,
              }}
            />
          </div>
        ))}

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern z-10 opacity-30" />

        {/* Content overlay */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm mb-6">
              <Globe size={12} className="text-[rgba(255,255,255,0.5)]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">Building Africa&apos;s Industrial Sovereignty</span>
            </span>

            <div className="mb-4">
              <TextReveal
                text={carouselSlides[activeSlide].title}
                className="text-[clamp(2rem,6vw,5.25rem)] font-extrabold text-white leading-[1.02] tracking-[-0.02em]"
              />
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-tight mb-3">
              {carouselSlides[activeSlide].subtitle}
            </p>

            <p className="max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-8">
              {carouselSlides[activeSlide].desc}
            </p>

            <MagneticButton className="inline-block">
              <Link
                href={carouselSlides[activeSlide].href}
                className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Carousel navigation */}
        <div className="absolute right-6 md:right-12 bottom-24 md:bottom-32 z-30 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] text-white/30 font-medium tabular-nums font-[family-name:var(--font-space-mono)]">
            {String(activeSlide + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}
          </span>
          <button
            onClick={nextSlide}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors"
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
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-medium">Scroll</span>
          <ChevronDown size={14} className="text-white/30 animate-bounce-slow" />
        </motion.div>
      </motion.section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S2: VERTICALS GRID — Card3D, StaggerContainer, real images
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28">
          <FadeIn>
            <div className="mb-12">
              <p className="section-label mb-4">Our Verticals</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight">
                Infrastructure for<br />the Next Century
              </h2>
            </div>
          </FadeIn>

          {/* Card Grid — 4 col desktop, 2 tablet, 1 mobile */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.08}>
            {verticals.map((v) => (
              <StaggerItem key={v.version}>
                <Link href={v.href} className="group block">
                  <Card3D className="bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500 p-0">
                    {/* Image header */}
                    <div className="relative h-[140px] md:h-[160px] overflow-hidden">
                      <Image
                        src={v.image}
                        alt={v.fullName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                      {/* Version tag */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] bg-[rgba(0,0,0,0.5)] backdrop-blur-md"
                          style={{ color: v.accent, border: `1px solid ${v.accent}30` }}
                        >
                          {v.version}
                        </span>
                      </div>
                      {/* Stat badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.1em] stat-mono bg-[rgba(0,0,0,0.5)] text-white/70 backdrop-blur-md border border-[rgba(255,255,255,0.06)]">
                          {v.stat}
                        </span>
                      </div>
                    </div>
                    {/* Text content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.accent }} />
                        <h3 className="text-base font-bold text-white tracking-tight">{v.name}</h3>
                      </div>
                      <p className="text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed mb-3 line-clamp-2">
                        {v.desc}
                      </p>
                      {/* CTA */}
                      <div className="pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)]" style={{ color: `${v.accent}90` }}>
                          Explore
                        </span>
                        <ArrowRight size={12} className="text-[rgba(255,255,255,0.25)] group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                    </div>
                  </Card3D>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Deep Dive Carousel — enhanced with real images */}
        <div className="border-t border-[rgba(255,255,255,0.04)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">Deep Dive</p>
              <div className="flex gap-1 overflow-x-auto no-scrollbar">
                {verticals.map((v, i) => (
                  <button
                    key={v.version}
                    onClick={() => setActiveVertical(i)}
                    className={`shrink-0 px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase rounded transition-all duration-300 ${
                      i === activeVertical
                        ? 'bg-white text-black'
                        : 'text-[rgba(255,255,255,0.25)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deep dive feature section with real background image */}
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            {verticals.map((v, i) => (
              <div
                key={v.version}
                className={`absolute inset-0 transition-opacity ${
                  i === activeVertical ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{ transition: 'opacity 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <Image
                  src={v.deepDiveImage}
                  alt={v.fullName}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.95)] via-[rgba(13,13,13,0.6)] to-[rgba(13,13,13,0.3)]" />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 30% 50%, ${v.accent}10, transparent 60%)` }}
                />
              </div>
            ))}

            {/* Text overlay */}
            <div className="relative z-30 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-end pb-12 md:pb-16">
              <motion.div
                key={activeVertical}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{verticals[activeVertical].version}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 stat-mono">{verticals[activeVertical].stat}</span>
                </div>
                <TextReveal
                  text={verticals[activeVertical].name}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em] mb-3"
                />
                <p className="max-w-lg text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-6">
                  {verticals[activeVertical].desc}
                </p>
                <SmoothLink href={verticals[activeVertical].href} className="text-sm font-semibold text-white">
                  Learn More
                </SmoothLink>
              </motion.div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute right-6 md:right-12 bottom-12 md:bottom-16 z-30 flex items-center gap-3">
              <button onClick={() => setActiveVertical((prev) => (prev - 1 + verticals.length) % verticals.length)} className="w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors" aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[11px] text-white/30 font-medium tabular-nums font-[family-name:var(--font-space-mono)]">
                {String(activeVertical + 1).padStart(2, '0')} / {String(verticals.length).padStart(2, '0')}
              </span>
              <button onClick={() => setActiveVertical((prev) => (prev + 1) % verticals.length)} className="w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors" aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S2.5: PLATFORM PREVIEW — Interactive HarchOS Console
          ═══════════════════════════════════════════════════════════ */}
      <InteractivePlatform slug="intelligence" accent="#8B9DAF" />

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S3: OVERVIEW BREAK — Parallax with real image
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxSection speed={0.15} className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/sections/overview-casablanca.jpg"
          alt="Casablanca overview"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.8)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 text-center">
          <FadeIn>
            <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white tracking-[-0.02em] mb-4">
              8 Verticals. 5 Countries.
            </p>
            <p className="text-xl md:text-2xl font-light text-[rgba(255,255,255,0.4)]">$2.4B Investment Pipeline</p>
          </FadeIn>
        </div>
      </ParallaxSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S4: AFRICA MAP — Import from component, FadeIn
          ═══════════════════════════════════════════════════════════ */}
      <section id="global-presence" className="py-28 md:py-36 bg-[#0D0D0D] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="section-label mb-4">Deployments / Real-Time</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight">
                Operating Across<br />Africa
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                From our Casablanca headquarters to Dakhla, Gambia, and the Sahel — our operations span the continent&apos;s most strategic industrial corridors.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <AfricaMap />
          </FadeIn>

          {/* System Health + Live Feed */}
          <FadeIn delay={0.35}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
                      System Health
                    </span>
                    <div className="flex items-center gap-1.5">
                      <PulseIndicator size={6} />
                      <span className="text-[8px] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">ALL NOMINAL</span>
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
                          <span className="text-[9px] font-bold tracking-[0.1em] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">
                            {item.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">{item.status.toUpperCase()}</span>
                            <span className="text-[9px] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">{item.value}%</span>
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

        <DataStream opacity={0.02} count={15} speed={0.3} />
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S5: STATS — "By the Numbers" with CountUp, Card3D, PulseIndicator
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Scale &amp; Impact</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16">
              By the Numbers
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card3D className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <PulseIndicator size={5} speed={3} color="#8B9DAF" />
                    <span className="text-[8px] font-bold tracking-[0.15em] uppercase text-[rgba(139,157,175,0.7)] font-[family-name:var(--font-space-mono)]">LIVE</span>
                  </div>
                  <p className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-none mb-2 stat-mono">
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.35)] leading-relaxed">{stat.desc}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-[11px] text-[rgba(255,255,255,0.25)] italic">
              * Projected targets based on current pipeline and regulatory approvals. Updated Q1 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S6: INVESTMENT TABLE — Row stagger, consistent badges
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Investment Pipeline</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4">
              Capital Deployment
            </h2>
            <p className="max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-12">
              $2.4B+ in active capital deployment across 7 industrial verticals, spanning 5 countries and multiple project phases.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#141414] rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden">
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
                    {investmentTable.map((row, i) => (
                      <motion.tr
                        key={row.vertical}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                      >
                        <td>{row.vertical}</td>
                        <td className="font-semibold">{row.investment}</td>
                        <td>{row.capacity}</td>
                        <td>{row.timeline}</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {row.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[11px] text-[rgba(255,255,255,0.25)]">Total investment pipeline: $2.4B+ across 7 verticals. Data as of Q1 2026.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S6.5: PROVEN IMPACT — Case Studies Preview
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Proven Impact</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4">
              Proof, Not Promises
            </h2>
            <p className="max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-16">
              Real deployments. Real metrics. Real sovereignty. See how Harch Corp infrastructure delivers measurable outcomes across industrial and government sectors.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.12}>
            {/* Case Study 1: Industrial */}
            <StaggerItem>
              <Link href="/case-studies/tanger-cement-predictive-maintenance" className="group block">
                <div className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(74,125,95,0.3)] transition-all duration-500 bg-[#141414]">
                  <div className="relative h-[200px] md:h-[240px] overflow-hidden">
                    <Image
                      src="/images/sections/cement-kiln.jpg"
                      alt="Tanger Cement Predictive Maintenance"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[rgba(20,20,20,0.5)] to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] bg-[rgba(74,125,95,0.15)] border border-[rgba(74,125,95,0.3)] text-[#4A7B5F]">
                        Industrial
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[rgba(74,125,95,0.9)] transition-colors">
                      Predictive Maintenance at Tanger Cement
                    </h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed mb-4">
                      AI-driven kiln optimization with 2,400 IoT sensors. 99.7% prediction accuracy. $4.2M annual savings.
                    </p>
                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <p className="text-xl font-bold text-[#4A7B5F] stat-mono">-20%</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Energy</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#4A7B5F] stat-mono">+15%</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Uptime</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#4A7B5F] stat-mono">$4.2M</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Saved/yr</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] text-[rgba(74,125,95,0.7)]">Read Case Study</span>
                      <ArrowRight size={12} className="text-[rgba(255,255,255,0.25)] group-hover:translate-x-1 group-hover:text-[#4A7B5F] transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>

            {/* Case Study 2: Government */}
            <StaggerItem>
              <Link href="/case-studies/west-african-alliance-sovereign-infrastructure" className="group block">
                <div className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(139,157,175,0.3)] transition-all duration-500 bg-[#141414]">
                  <div className="relative h-[200px] md:h-[240px] overflow-hidden">
                    <Image
                      src="/images/sections/intelligence-exterior.jpg"
                      alt="West African Alliance Sovereign Infrastructure"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[rgba(20,20,20,0.5)] to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] bg-[rgba(139,157,175,0.15)] border border-[rgba(139,157,175,0.3)] text-[#8B9DAF]">
                        Government
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[rgba(139,157,175,0.9)] transition-colors">
                      Sovereign Data Infrastructure for West African Alliance
                    </h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed mb-4">
                      100% data localization across 5 nations. Quantum-resistant encryption. Zero security breaches in 24 months.
                    </p>
                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <p className="text-xl font-bold text-[#8B9DAF] stat-mono">100%</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Localized</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#8B9DAF] stat-mono">5</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Nations</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#8B9DAF] stat-mono">&lt;8ms</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">Latency</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] text-[rgba(139,157,175,0.7)]">Read Case Study</span>
                      <ArrowRight size={12} className="text-[rgba(255,255,255,0.25)] group-hover:translate-x-1 group-hover:text-[#8B9DAF] transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
                View All Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S7: IMPACT STUDY — Intelligence (IMAGE + TEXT)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Intelligence /0.1</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image on left */}
            <FadeIn direction="right">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/images/sections/intelligence-rack.jpg"
                  alt="Harch Intelligence GPU rack"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.6)] to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-md px-4 py-2 rounded-md border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70">1,798 GPUs Carbon-Optimized</p>
                </div>
              </div>
            </FadeIn>
            {/* Text on right */}
            <FadeIn delay={0.15} direction="left">
              <TextReveal
                text="Africa's Carbon-Aware GPU Cloud"
                className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4"
              />
              <div className="accent-line mb-6" />
              <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8">
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
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white stat-mono">{s.val}</p>
                    <p className="text-[10px] text-[rgba(255,255,255,0.25)] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <SmoothLink href="/subsidiaries/intelligence" className="text-sm font-semibold text-[rgba(255,255,255,0.5)] hover:text-white">
                Read More
              </SmoothLink>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S8: IMPACT STUDY — Energy (TEXT + IMAGE, reversed)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; Harch Energy /0.3</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text on left */}
            <FadeIn delay={0.15} direction="right" className="order-2 lg:order-1">
              <TextReveal
                text="2GW+ of Renewable Energy Pipeline"
                className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4"
              />
              <div className="accent-line mb-6" />
              <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8">
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
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white stat-mono">{s.val}</p>
                    <p className="text-[10px] text-[rgba(255,255,255,0.25)] uppercase tracking-[0.1em] font-bold">{s.label}</p>
                  </div>
                ))}
              </div>
              <SmoothLink href="/subsidiaries/energy" className="text-sm font-semibold text-[rgba(255,255,255,0.5)] hover:text-white">
                Read More
              </SmoothLink>
            </FadeIn>
            {/* Image on right */}
            <FadeIn direction="left" className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/images/sections/energy-solar-farm.jpg"
                  alt="Harch Energy solar farm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.6)] to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-md px-4 py-2 rounded-md border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70">2GW+ Renewable Pipeline</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S9: HarchOS DEVELOPER PLATFORM — Typing animation on code
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-label mb-4">Developer Platform</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight">
                Build on HarchOS<span className="text-[#8B9DAF]">.</span>
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
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
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3572A5]/15 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3572A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Python SDK</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src="https://img.shields.io/pypi/v/harchos.svg?label=PyPI" alt="PyPI" className="h-4" />
                      <span className="text-[10px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
                        <TypingText text="pip install harchos" speed={50} delay={800} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0D0D0D] rounded-md p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto">
                  <p className="text-[#666666]">{'# Install'}</p>
                  <p><span className="text-[#8B9DAF]">pip install</span> <span className="text-[#98C379]">harchos</span></p>
                  <br/>
                  <p className="text-[#666666]">{'# Get carbon intensity for Morocco'}</p>
                  <p><span className="text-[#C678DD]">from</span> harchos <span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">HarchOSClient</span></p>
                  <br/>
                  <p><span className="text-[#C678DD]">with</span> <span className="text-[#E5C07B]">HarchOSClient</span>(<span className="text-[#98C379]">api_key</span>=<span className="text-[#98C379]">&quot;hsk_...&quot;</span>) <span className="text-[#C678DD]">as</span> client:</p>
                  <p>&nbsp;&nbsp;carbon = client.carbon.get_intensity(<span className="text-[#98C379]">&quot;MA&quot;</span>)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Morocco: </span><span className="text-[#8B9DAF]">{'{carbon.carbon_intensity_gco2_kwh}'}</span><span className="text-[#98C379]"> gCO2/kWh&quot;</span>)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Renewable: </span><span className="text-[#8B9DAF]">{'{carbon.renewable_percentage}'}</span><span className="text-[#98C379]">%&quot;</span>)</p>
                  <br/>
                  <p className="text-[#666666]">{'# Find the greenest hub'}</p>
                  <p>&nbsp;&nbsp;optimal = client.carbon.optimal_hub(</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">region</span>=<span className="text-[#98C379]">&quot;morocco&quot;</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#98C379]">gpu_count</span>=<span className="text-[#D19A66]">4</span>,</p>
                  <p>&nbsp;&nbsp;)</p>
                  <p>&nbsp;&nbsp;<span className="text-[#E5C07B]">print</span>(<span className="text-[#98C379]">f&quot;Best hub: </span><span className="text-[#8B9DAF]">{'{optimal.recommended_hub_name}'}</span><span className="text-[#98C379]">&quot;</span>)</p>
                </div>
              </div>
            </FadeIn>

            {/* TypeScript SDK */}
            <FadeIn delay={0.15}>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#2B7489]/15 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B7489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">TypeScript SDK</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src="https://img.shields.io/npm/v/@harchos/sdk.svg?label=npm" alt="npm" className="h-4" />
                      <span className="text-[10px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
                        <TypingText text="npm i @harchos/sdk" speed={50} delay={1200} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0D0D0D] rounded-md p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto">
                  <p className="text-[#666666]">{'// Install'}</p>
                  <p><span className="text-[#8B9DAF]">npm install</span> <span className="text-[#98C379]">@harchos/sdk</span></p>
                  <br/>
                  <p className="text-[#666666]">{'// Get carbon intensity for Morocco'}</p>
                  <p><span className="text-[#C678DD]">import</span> {'{'} <span className="text-[#E5C07B]">HarchOSClient</span> {'}'} <span className="text-[#C678DD]">from</span> <span className="text-[#98C379]">&quot;@harchos/sdk&quot;</span>;</p>
                  <br/>
                  <p><span className="text-[#C678DD]">const</span> client = <span className="text-[#C678DD]">new</span> <span className="text-[#E5C07B]">HarchOSClient</span>({'{'} <span className="text-[#98C379]">apiKey</span>: <span className="text-[#98C379]">&quot;hsk_...&quot;</span> {'}'});</p>
                  <p><span className="text-[#C678DD]">const</span> carbon = <span className="text-[#C678DD]">await</span> client.carbon.getIntensity(<span className="text-[#98C379]">&quot;MA&quot;</span>);</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Morocco: </span><span className="text-[#8B9DAF]">{'${carbon.carbon_intensity_gco2_kwh}'}</span><span className="text-[#98C379]"> gCO2/kWh`</span>);</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Renewable: </span><span className="text-[#8B9DAF]">{'${carbon.renewable_percentage}'}</span><span className="text-[#98C379]">%`</span>);</p>
                  <br/>
                  <p className="text-[#666666]">{'// Find the greenest hub'}</p>
                  <p><span className="text-[#C678DD]">const</span> optimal = <span className="text-[#C678DD]">await</span> client.carbon.optimalHub({'{'}</p>
                  <p>&nbsp;&nbsp;<span className="text-[#98C379]">region</span>: <span className="text-[#98C379]">&quot;morocco&quot;</span>,</p>
                  <p>&nbsp;&nbsp;<span className="text-[#98C379]">gpu_count</span>: <span className="text-[#D19A66]">4</span>,</p>
                  <p>{'}'});</p>
                  <p>console.<span className="text-[#E5C07B]">log</span>(<span className="text-[#98C379]">`Best hub: </span><span className="text-[#8B9DAF]">{'${optimal.recommended_hub_name}'}</span><span className="text-[#98C379]">`</span>);</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <SmoothLink href="/developers" className="text-[14px] text-[#8B9DAF] font-semibold">
                Full Developer Documentation
              </SmoothLink>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S10: CEO QUOTE — TextReveal, subtle parallax quotation mark
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[960px] mx-auto px-6 md:px-12">
          <FadeIn>
            <ParallaxSection speed={0.1} className="mb-0">
              <span className="text-[clamp(4rem,12vw,9rem)] text-[rgba(255,255,255,0.04)] leading-none font-serif block -mb-12">&ldquo;</span>
            </ParallaxSection>
            <TextReveal
              text="Africa doesn't need aid — it needs infrastructure. It doesn't need pity — it needs partnership on equal terms. We build the systems that convert potential into power."
              className="text-[clamp(1.25rem,3vw,2rem)] font-light text-white leading-[1.4] mb-10"
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#B8965A]" />
              <div>
                <p className="text-sm text-white font-semibold">Amine Harch El Korane</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.25)] mt-0.5">Founder &amp; CEO, Harch Corp</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S11: AFRICA'S POTENTIAL — CountUp, StaggerContainer
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">The Opportunity</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16">
              Africa&apos;s Potential,<br />By the Numbers
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {africaStats.map((item, i) => (
              <StaggerItem key={i}>
                <Card3D className="card h-full">
                  <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white mb-2 leading-none stat-mono">
                    {i === 0 && <CountUp to={30} suffix="%" duration={2} />}
                    {i === 1 && <CountUp to={60} suffix="%" duration={2} />}
                    {i === 2 && <CountUp to={1400} suffix="M+" duration={2.5} />}
                  </p>
                  <div className="accent-line mb-5" />
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{item.desc}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S12: TIMELINE/ROADMAP — Animated line, pulse dots, stagger
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Roadmap</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16">
              2024 &mdash; 2030
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Animated vertical line */}
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]">
              <motion.div
                className="w-full bg-[#8B9DAF]/30"
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>

            <StaggerContainer className="space-y-10" staggerDelay={0.12}>
              {roadmap.map((item) => (
                <StaggerItem key={item.year}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      {item.status === 'active' ? (
                        <div className="relative">
                          <PulseIndicator size={14} color="#B8965A" speed={2} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#B8965A]" />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1.5 ${
                          item.status === 'completed' ? 'bg-white border-white' :
                          'bg-transparent border-[rgba(255,255,255,0.15)]'
                        }`} />
                      )}
                    </div>
                    <div className="pb-2">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-space-mono)] ${
                        item.status === 'active' ? 'text-[#B8965A]' :
                        item.status === 'completed' ? 'text-white/50' :
                        'text-[rgba(255,255,255,0.25)]'
                      }`}>
                        {item.year}
                        {item.status === 'active' && ' — Current'}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S13: OPERATOR MODEL — TextReveal, Card3D principles
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <p className="section-label mb-4">Our Model</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6">
                Not a Service Provider.<br />Not a Consultancy.<br />
                <TextReveal
                  text="An Operator."
                  className="gradient-text inline-block"
                />
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8">
                Harch Corp doesn&apos;t advise — we build. We own the entire value chain from raw materials
                to finished infrastructure. This vertically integrated model creates structural cost
                advantages of 30-50% versus competitors who rely on external supply chains. We don&apos;t
                write reports about Africa&apos;s potential — we convert it into industrial power.
              </p>
              <SmoothLink href="/strategy" className="text-sm font-semibold text-[rgba(255,255,255,0.5)] hover:text-white">
                Our Strategy
              </SmoothLink>
            </FadeIn>
            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {operatorPrinciples.map((item, i) => (
                <StaggerItem key={i}>
                  <Card3D className="card">
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed">{item.desc}</p>
                  </Card3D>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S14: NEWSROOM PREVIEW — Card3D, Stagger entrance
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Latest Updates</p>
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white tracking-tight">Newsroom</h2>
              </div>
              <Link href="/newsroom" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[rgba(255,255,255,0.25)] hover:text-white transition-colors group">
                All Updates <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {newsArticles.map((article, i) => (
              <StaggerItem key={i}>
                <Link href="/newsroom" className="group block">
                  <Card3D className="card h-full">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[9px] font-bold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.4)] mb-3">{article.tag}</span>
                    <h3 className="text-sm font-bold text-[rgba(255,255,255,0.7)] leading-snug mb-3 group-hover:text-white transition-colors">{article.title}</h3>
                    <p className="text-[11px] text-[rgba(255,255,255,0.25)] tracking-wide">{article.date}</p>
                  </Card3D>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          S15: CTA SECTION — NetworkGrid, ParallaxSection, MagneticButton
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxSection speed={0.1} className="relative bg-[#000000] overflow-hidden">
        <NetworkGrid nodeCount={35} maxDistance={100} opacity={0.04} />
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <FadeIn>
            <TextReveal
              text="The Next Century Starts Now"
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-white tracking-tight mb-6 leading-tight"
            />
            <p className="max-w-xl mx-auto text-sm text-[rgba(255,255,255,0.3)] leading-relaxed mb-12">
              Join the consortium building Africa&apos;s industrial sovereignty.
              From investment to partnership — the future is being built.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton className="inline-block">
                <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all duration-300">
                  Get Started <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton className="inline-block">
                <Link href="/careers" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300">
                  View Careers
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

    </div>
  );
}
