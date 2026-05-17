'use client';

import { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
import { PulseIndicator } from '@/components/PulseIndicator';
import { TypingText } from '@/components/PulseIndicator';

/* ─── Dynamic imports for below-fold / heavy components ─── */
const InteractivePlatform = dynamic(
  () => import('@/components/InteractivePlatform').then((mod) => mod.InteractivePlatform),
  { ssr: false, loading: () => <div className="h-[600px] bg-[#0A0A0A] animate-pulse" /> }
);

const AfricaMap = dynamic(
  () => import('@/components/AfricaMap').then((mod) => mod.AfricaMap),
  { ssr: false, loading: () => <div className="h-[400px] bg-[#0A0A0A] animate-pulse rounded-lg" /> }
);

const LiveFeed = dynamic(
  () => import('@/components/LiveFeed').then((mod) => mod.LiveFeed),
  { ssr: false, loading: () => <div className="h-[200px] bg-[#141414] animate-pulse rounded-lg" /> }
);

const DataStream = dynamic(
  () => import('@/components/DataStream').then((mod) => mod.DataStream),
  { ssr: false }
);

const NetworkGrid = dynamic(
  () => import('@/components/NetworkGrid').then((mod) => mod.NetworkGrid),
  { ssr: false }
);

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
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  /* ─── DATA — moved inside component to access t() ─── */
  const verticals = [
    { version: '/0.1', name: t('verticals.intelligence.name'), fullName: t('verticals.intelligence.name'), desc: t('verticals.intelligence.description'), stat: t('verticals.intelligence.stat'), href: '/subsidiaries/intelligence', gradient: 'from-[#1a2a3a] to-[#0d1520]', accent: '#8B9DAF', outcomes: [t('verticals.intelligence.outcomes.items.0'), t('verticals.intelligence.outcomes.items.1'), t('verticals.intelligence.outcomes.items.2')], image: '/images/sections/intelligence-gpu-cluster.jpg', deepDiveImage: '/images/sections/intelligence-exterior.jpg' },
    { version: '/0.2', name: t('verticals.cement.name'), fullName: t('verticals.cement.name'), desc: t('verticals.cement.description'), stat: t('verticals.cement.stat'), href: '/subsidiaries/cement', gradient: 'from-[#2a2420] to-[#151210]', accent: '#A08878', outcomes: [t('verticals.cement.outcomes.items.0'), t('verticals.cement.outcomes.items.1'), t('verticals.cement.outcomes.items.2')], image: '/images/sections/cement-kiln.jpg', deepDiveImage: '/images/sections/cement-quarry.jpg' },
    { version: '/0.3', name: t('verticals.energy.name'), fullName: t('verticals.energy.name'), desc: t('verticals.energy.description'), stat: t('verticals.energy.stat'), href: '/subsidiaries/energy', gradient: 'from-[#1a2a1a] to-[#0d150d]', accent: '#6B9F6B', outcomes: [t('verticals.energy.outcomes.items.0'), t('verticals.energy.outcomes.items.1'), t('verticals.energy.outcomes.items.2')], image: '/images/sections/energy-wind-farm.jpg', deepDiveImage: '/images/sections/energy-hydrogen-plant.jpg' },
    { version: '/0.4', name: t('verticals.technology.name'), fullName: t('verticals.technology.name'), desc: t('verticals.technology.description'), stat: t('verticals.technology.stat'), href: '/subsidiaries/technology', gradient: 'from-[#1a1a2a] to-[#0d0f14]', accent: '#7888A8', outcomes: [t('verticals.technology.outcomes.items.0'), t('verticals.technology.outcomes.items.1'), t('verticals.technology.outcomes.items.2')], image: '/images/sections/tech-ground-station.jpg', deepDiveImage: '/images/sections/tech-cyber.jpg' },
    { version: '/0.5', name: t('verticals.mining.name'), fullName: t('verticals.mining.name'), desc: t('verticals.mining.description'), stat: t('verticals.mining.stat'), href: '/subsidiaries/mining', gradient: 'from-[#2a1a1a] to-[#150d0d]', accent: '#A87878', outcomes: [t('verticals.mining.outcomes.items.0'), t('verticals.mining.outcomes.items.1'), t('verticals.mining.outcomes.items.2')], image: '/images/sections/mining-smelter.jpg', deepDiveImage: '/images/sections/mining-processing.jpg' },
    { version: '/0.6', name: t('verticals.agriculture.name'), fullName: t('verticals.agriculture.name'), desc: t('verticals.agriculture.description'), stat: t('verticals.agriculture.stat'), href: '/subsidiaries/agriculture', gradient: 'from-[#1a2a1a] to-[#0d150d]', accent: '#6BAF6B', outcomes: [t('verticals.agriculture.outcomes.items.0'), t('verticals.agriculture.outcomes.items.1'), t('verticals.agriculture.outcomes.items.2')], image: '/images/sections/agri-vertical-farm.jpg', deepDiveImage: '/images/sections/agri-iot-sensor.jpg' },
    { version: '/0.7', name: t('verticals.water.name'), fullName: t('verticals.water.name'), desc: t('verticals.water.description'), stat: t('verticals.water.stat'), href: '/subsidiaries/water', gradient: 'from-[#1a2030] to-[#0d1018]', accent: '#6888A8', outcomes: [t('verticals.water.outcomes.items.0'), t('verticals.water.outcomes.items.1'), t('verticals.water.outcomes.items.2')], image: '/images/sections/water-treatment.jpg', deepDiveImage: '/images/sections/water-desal-plant.jpg' },
    { version: '/0.8', name: t('verticals.finance.name'), fullName: t('verticals.finance.name'), desc: t('verticals.finance.description'), stat: t('verticals.finance.stat'), href: '/subsidiaries/finance', gradient: 'from-[#1a1a2a] to-[#0d0f14]', accent: '#8B9DAF', outcomes: [t('verticals.finance.outcomes.items.0'), t('verticals.finance.outcomes.items.1'), t('verticals.finance.outcomes.items.2')], image: '/images/sections/finance-trading.jpg', deepDiveImage: '/images/sections/finance-district.jpg' },
  ];

  const carouselSlides = [
    { title: t('verticals.intelligence.name'), subtitle: t('carouselSlides.slide1.title'), desc: t('carouselSlides.slide1.description'), href: '/subsidiaries/intelligence', image: '/images/sections/intelligence-rack.jpg', accent: '#8B9DAF' },
    { title: t('verticals.energy.name'), subtitle: t('carouselSlides.slide2.title'), desc: t('carouselSlides.slide2.description'), href: '/subsidiaries/energy', image: '/images/sections/energy-solar-farm.jpg', accent: '#6B9F6B' },
    { title: t('verticals.cement.name'), subtitle: t('carouselSlides.slide6.title'), desc: t('carouselSlides.slide6.description'), href: '/subsidiaries/cement', image: '/images/sections/cement-factory.jpg', accent: '#A08878' },
    { title: t('verticals.technology.name'), subtitle: t('carouselSlides.slide3.title'), desc: t('carouselSlides.slide3.description'), href: '/subsidiaries/technology', image: '/images/sections/tech-satellite.jpg', accent: '#7888A8' },
    { title: t('verticals.mining.name'), subtitle: t('carouselSlides.slide3.title'), desc: t('carouselSlides.slide3.description'), href: '/subsidiaries/mining', image: '/images/sections/mining-open-pit.jpg', accent: '#A87878' },
    { title: t('verticals.agriculture.name'), subtitle: t('carouselSlides.slide5.title'), desc: t('carouselSlides.slide5.description'), href: '/subsidiaries/agriculture', image: '/images/sections/agri-aerial-drone.jpg', accent: '#6BAF6B' },
    { title: t('verticals.water.name'), subtitle: t('carouselSlides.slide4.title'), desc: t('carouselSlides.slide4.description'), href: '/subsidiaries/water', image: '/images/sections/water-desal.jpg', accent: '#6888A8' },
  ];

  const stats = [
    { value: 2400, prefix: '$', suffix: 'M+', label: t('stats.investmentPipeline.label'), desc: t('stats.investmentPipeline.description') },
    { value: 47, prefix: '~', suffix: '', label: t('stats.carbonIntensity.label'), desc: t('stats.carbonIntensity.description') },
    { value: 81.5, prefix: '', suffix: '%', label: t('stats.renewableEnergy.label'), desc: t('stats.renewableEnergy.description'), decimals: 1 },
    { value: 25000, prefix: '', suffix: '+', label: t('stats.employment2030.label'), desc: t('stats.employment2030.description') },
  ];

  const roadmap = [
    { year: '2024', title: t('roadmap.2024.title'), desc: t('roadmap.2024.description'), status: 'completed' },
    { year: '2025', title: t('roadmap.2025.title'), desc: t('roadmap.2025.description'), status: 'completed' },
    { year: '2026', title: t('roadmap.2026.title'), desc: t('roadmap.2026.description'), status: 'active' },
    { year: '2027', title: t('roadmap.2027.title'), desc: t('roadmap.2027.description'), status: 'upcoming' },
    { year: '2028', title: t('roadmap.2028.title'), desc: t('roadmap.2028.description'), status: 'upcoming' },
    { year: '2030', title: t('roadmap.2030.title'), desc: t('roadmap.2030.description'), status: 'upcoming' },
  ];

  const africaStats = [
    { value: '30%', numValue: 30, desc: t('africaStats.mineralReserves.description') },
    { value: '60%', numValue: 60, desc: t('africaStats.arableLand.description') },
    { value: '1.4B', numValue: 1400, desc: t('africaStats.population.description') },
  ];

  const investmentTable = [
    { vertical: t('investmentTable.rows.intelligence.vertical'), investment: t('investmentTable.rows.intelligence.investment'), capacity: t('investmentTable.rows.intelligence.capacity'), timeline: t('investmentTable.rows.intelligence.timeline'), status: 'Engineering' },
    { vertical: t('investmentTable.rows.energy.vertical'), investment: t('investmentTable.rows.energy.investment'), capacity: t('investmentTable.rows.energy.capacity'), timeline: t('investmentTable.rows.energy.timeline'), status: 'Active' },
    { vertical: t('investmentTable.rows.technology.vertical'), investment: t('investmentTable.rows.technology.investment'), capacity: t('investmentTable.rows.technology.capacity'), timeline: t('investmentTable.rows.technology.timeline'), status: 'Design' },
    { vertical: t('investmentTable.rows.cement.vertical'), investment: t('investmentTable.rows.cement.investment'), capacity: t('investmentTable.rows.cement.capacity'), timeline: t('investmentTable.rows.cement.timeline'), status: 'Permitted' },
    { vertical: t('investmentTable.rows.mining.vertical'), investment: t('investmentTable.rows.mining.investment'), capacity: t('investmentTable.rows.mining.capacity'), timeline: t('investmentTable.rows.mining.timeline'), status: 'Exploration' },
    { vertical: t('investmentTable.rows.agriculture.vertical'), investment: t('investmentTable.rows.agriculture.investment'), capacity: t('investmentTable.rows.agriculture.capacity'), timeline: t('investmentTable.rows.agriculture.timeline'), status: 'Planning' },
    { vertical: t('investmentTable.rows.water.vertical'), investment: t('investmentTable.rows.water.investment'), capacity: t('investmentTable.rows.water.capacity'), timeline: t('investmentTable.rows.water.timeline'), status: 'Feasibility' },
    { vertical: t('investmentTable.rows.finance.vertical'), investment: t('investmentTable.rows.finance.investment'), capacity: t('investmentTable.rows.finance.capacity'), timeline: t('investmentTable.rows.finance.timeline'), status: 'Active' },
  ];

  const testimonials = [
    { quote: t('testimonials.testimonial1.quote'), name: t('testimonials.testimonial1.author'), title: t('testimonials.testimonial1.title'), company: t('testimonials.testimonial1.organization') },
    { quote: t('testimonials.testimonial2.quote'), name: t('testimonials.testimonial2.author'), title: t('testimonials.testimonial2.title'), company: t('testimonials.testimonial2.organization') },
    { quote: t('testimonials.testimonial3.quote'), name: t('testimonials.testimonial3.author'), title: t('testimonials.testimonial3.title'), company: t('testimonials.testimonial3.organization') },
    { quote: t('testimonials.testimonial4.quote'), name: t('testimonials.testimonial4.author'), title: t('testimonials.testimonial4.title'), company: t('testimonials.testimonial4.organization') },
  ];

  const operatorPrinciples = [
    { title: t('operatorPrinciples.verticalIntegration.title'), desc: t('operatorPrinciples.verticalIntegration.description') },
    { title: t('operatorPrinciples.sovereignByDesign.title'), desc: t('operatorPrinciples.sovereignByDesign.description') },
    { title: t('operatorPrinciples.speedAtScale.title'), desc: t('operatorPrinciples.speedAtScale.description') },
    { title: t('operatorPrinciples.worldClassStandards.title'), desc: t('operatorPrinciples.worldClassStandards.description') },
  ];

  const newsArticles = [
    { title: t('newsArticles.article2.title'), date: t('newsArticles.article2.date'), tag: t('newsArticles.article2.category'), desc: t('newsArticles.article2.excerpt'), image: '/images/sections/intelligence-gpu-cluster.jpg' },
    { title: t('newsArticles.article3.title'), date: t('newsArticles.article3.date'), tag: t('newsArticles.article3.category'), desc: t('newsArticles.article3.excerpt'), image: '/images/sections/energy-solar-farm.jpg' },
    { title: t('newsArticles.article1.title'), date: t('newsArticles.article1.date'), tag: t('newsArticles.article1.category'), desc: t('newsArticles.article1.excerpt'), image: '/images/sections/overview-casablanca.jpg' },
  ];

  /* ─── Component state ─── */
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
  }, [carouselSlides.length]);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  }, [carouselSlides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, [carouselSlides.length]);

  return (
    <div className="bg-[#0D0D0D]">

      {/* ═══════════════════════════════════════════════════════════
          STEP 1: HOOK — S1 HERO — Per-slide background images with text carousel
          ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100dvh] flex items-end overflow-hidden"
      >
        {/* Background images per slide — crossfade between them */}
        {carouselSlides.map((slide, i) => (
          <div
            key={slide.title}
            className="absolute inset-0 z-0"
            style={{
              opacity: i === activeSlide ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark gradient overlay for text readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.7) 40%, rgba(13,13,13,0.4) 70%, rgba(13,13,13,0.3) 100%)`,
          }}
        />

        {/* Accent glow — follows active slide */}
        <div
          className="absolute inset-0 z-[2] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at 30% 70%, ${carouselSlides[activeSlide].accent}10 0%, transparent 60%)`,
          }}
        />

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
            {/* SEO: Static H1 — always visible to Google, never hidden */}
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold text-white leading-[1.02] tracking-[-0.02em] mb-2">
              Harch Corp
            </h1>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm mb-6">
              <Globe size={12} className="text-[rgba(255,255,255,0.5)]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">{t('heroBadge')}</span>
            </span>

            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-white/80 leading-[1.05] tracking-[-0.01em] mb-2">
              {carouselSlides[activeSlide].title}
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/60 tracking-tight mb-3">
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
                {tCommon('learnMore')} <ArrowRight size={14} />
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
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-medium">{t('scroll')}</span>
          <ChevronDown size={14} className="text-white/30 animate-bounce-slow" />
        </motion.div>
      </motion.section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 2: PROBLEM — Why Africa Needs This
          Stark, urgent, minimal. Create the emotional deficit before the solution.
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[#000000] overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative z-10 max-w-[960px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[rgba(255,255,255,0.2)] font-[family-name:var(--font-space-mono)] mb-12">
              The Deficit
            </p>
            <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-8">
              1.4 billion people.<br />
              <span className="text-[rgba(255,255,255,0.3)]">The world&apos;s youngest continent.</span><br />
              <span className="text-[rgba(255,255,255,0.15)]">Running on infrastructure built for someone else.</span>
            </h2>
            <div className="accent-line mx-auto mb-8" />
            <p className="text-sm md:text-base text-[rgba(255,255,255,0.35)] leading-[1.7] max-w-lg mx-auto">
              Africa doesn&apos;t need another consultancy. It doesn&apos;t need another report. It needs sovereign infrastructure &mdash; owned, operated, and governed by Africans. That&apos;s the only thing that has ever moved a continent forward.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 3: PROOF OF EXISTENCE — S4 AFRICA MAP — Live deployments
          ═══════════════════════════════════════════════════════════ */}
      <section id="global-presence" className="py-16 md:py-20 bg-[#0D0D0D] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="section-label mb-4">{t('sectionLabels.deployments')}</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight">
                {t('sectionLabels.operations')}
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <AfricaMap />
          </FadeIn>

          {/* System Health + Live Feed */}
          <FadeIn delay={0.35}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
                      {t('systemHealth.title')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <PulseIndicator size={6} />
                      <span className="text-[8px] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">{t('systemHealth.allOperational')}</span>
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
          STEP 4: SCALE — S5 STATS — "By the Numbers" with CountUp
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('sectionLabels.scaleAndImpact')}</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16">
              {t('sectionLabels.inNumbers')}
            </h2>
          </FadeIn>

          {/* Pattern 6: Large Stat Displays — 2x2 grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="pb-6 border-b border-[rgba(255,255,255,0.04)]">
                  <p className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-none mb-4 stat-mono">
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} decimals={stat.decimals ?? 0} />
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">
                    {stat.label}
                  </p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.35)] leading-relaxed">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-[11px] text-[rgba(255,255,255,0.25)] italic">
              {t('footnote.disclaimer')}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 5: THE MACHINE — S2 VERTICALS GRID — 8 verticals = the integrated machine
          (Deep Dive Carousel removed — redundant, too long)
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-24">
          <FadeIn>
            <div className="mb-12">
              <p className="section-label mb-4">{t('sectionLabels.verticals')}</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight">
                {t('sectionLabels.infrastructure')}
              </h2>
            </div>
          </FadeIn>

          {/* Card Grid — Pattern 1: Explore Solutions, 2 col desktop */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16" staggerDelay={0.08}>
            {verticals.map((v) => (
              <StaggerItem key={v.version}>
                <div className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[8px] overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500">
                  {/* Full-width image at top */}
                  <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-[20px] font-bold text-white">{v.name}</h3>
                      <span
                        className="version-tag"
                        style={{ color: v.accent }}
                      >
                        {v.version}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#999999] leading-relaxed mb-4 line-clamp-2">
                      {v.desc}
                    </p>
                    {/* Pattern 1: Two buttons side by side */}
                    <div className="flex gap-3">
                      <Link
                        href={v.href}
                        className="inline-flex items-center gap-2 border border-white/12 text-white px-5 py-2.5 rounded-[8px] text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all"
                      >
                        {t('explore')}
                      </Link>
                      <Link
                        href={v.href}
                        className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-[8px] text-sm font-semibold hover:bg-white/90 transition-all"
                      >
                        {tCommon('learnMore')}
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 6: THE OS — S2.5 InteractivePlatform — HarchOS connects them all
          ═══════════════════════════════════════════════════════════ */}
      <InteractivePlatform slug="intelligence" accent="#8B9DAF" />

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 7: DEPLOYMENT DETAIL — S6 INVESTMENT TABLE — Where the money goes
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('sectionLabels.investment')}</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4">
              {t('sectionLabels.capitalDeployment')}
            </h2>
            <p className="max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-12">
              {t('footnote.disclaimer')}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#111111] rounded-lg border border-[rgba(255,255,255,0.06)] overflow-x-auto -mx-6 md:mx-0">
              {/* Header divider */}
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] min-w-[600px] md:min-w-0">
                <div className="grid grid-cols-[1fr_120px_180px_80px_auto] gap-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]">{t('investmentTable.headers.vertical')}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]">{t('investmentTable.headers.investment')}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]">{t('investmentTable.headers.capacity')}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]">{t('investmentTable.headers.timeline')}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]">{t('investmentTable.headers.status')}</span>
                </div>
              </div>
              {/* Rows — Pattern 2: Vertical List */}
              {investmentTable.map((row, i) => (
                <motion.div
                  key={row.vertical}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="px-6 py-4 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors min-w-[600px] md:min-w-0"
                >
                  <div className="grid grid-cols-[1fr_120px_180px_80px_auto] gap-4 items-center">
                    <span className="text-[14px] font-semibold text-white whitespace-nowrap">{row.vertical}</span>
                    <span className="text-[14px] font-semibold text-white stat-mono">{row.investment}</span>
                    <span className="text-[13px] text-[#999999]">{row.capacity}</span>
                    <span className="text-[13px] text-[#999999] stat-mono">{row.timeline}</span>
                    <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className="px-6 py-4 bg-[rgba(255,255,255,0.01)] min-w-[600px] md:min-w-0">
                <p className="text-[11px] text-[rgba(255,255,255,0.25)]">{t('footnote.disclaimer')}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 8: REAL IMPACT — S6.5 CASE STUDIES — Proof, not promises
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('sectionLabels.provenImpact')}</p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4">
              {t('sectionLabels.proofNotPromises')}
            </h2>
            <p className="max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-16">
              {t('sectionLabels.proofDescription')}
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
                      loading="lazy"
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
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.energy')}</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#4A7B5F] stat-mono">+15%</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.uptime')}</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#4A7B5F] stat-mono">$4.2M</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.savedPerYear')}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] text-[rgba(74,125,95,0.7)]">{t('caseStudy.readCaseStudy')}</span>
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
                      loading="lazy"
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
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.localized')}</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#8B9DAF] stat-mono">5</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.nations')}</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#8B9DAF] stat-mono">&lt;8ms</p>
                        <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wide font-[family-name:var(--font-space-mono)]">{t('caseStudy.metricLabels.latency')}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)] text-[rgba(139,157,175,0.7)]">{t('caseStudy.readCaseStudy')}</span>
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
                {t('caseStudy.viewAll')} <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 8 (continued): REAL IMPACT — S7 IMPACT STUDY — Intelligence (IMAGE + TEXT)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8">Impact Study &mdash; {t('verticals.intelligence.name')} /0.1</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image on left */}
            <FadeIn direction="right">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/images/sections/intelligence-rack.jpg"
                  alt={t('verticals.intelligence.name')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.6)] to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-md px-4 py-2 rounded-md border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70">{t('verticals.intelligence.stat')}</p>
                </div>
              </div>
            </FadeIn>
            {/* Text on right */}
            <FadeIn delay={0.15} direction="left">
              <TextReveal
                text={t('verticals.intelligence.tagline')}
                className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4"
              />
              <div className="accent-line mb-6" />
              <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8">
                {t('verticals.intelligence.description')}
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
                {tCommon('readMore')}
              </SmoothLink>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 9: BUILD ON IT — S9 HarchOS DEVELOPER PLATFORM
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-label mb-4">{t('sectionLabels.developerPlatform')}</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight">
                {t('sectionLabels.buildOnHarchOS')}<span className="text-[#8B9DAF]">.</span>
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                {t('sectionLabels.buildDescription')}
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
                    <h3 className="text-base font-bold text-white">{t('devPlatform.pythonSdk')}</h3>
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
                    <h3 className="text-base font-bold text-white">{t('devPlatform.typeScriptSdk')}</h3>
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
          STEP 10: THE WORD — S10 CEO QUOTE — Emotional anchor
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[960px] mx-auto px-6 md:px-12">
          <FadeIn>
            <ParallaxSection speed={0.1} className="mb-0">
              <span className="text-[clamp(4rem,12vw,9rem)] text-[rgba(255,255,255,0.04)] leading-none font-serif block -mb-12">&ldquo;</span>
            </ParallaxSection>
            <TextReveal
              text={t('ceoQuote.text')}
              className="text-[clamp(1.25rem,3vw,2rem)] font-light text-white leading-[1.4] mb-10"
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#8B9DAF]" />
              <div>
                <p className="text-sm text-white font-semibold">{t('ceoQuote.author')}</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.25)] mt-0.5">{t('ceoQuote.title')}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 11: THE FUTURE — S12 TIMELINE/ROADMAP
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('sectionLabels.roadmap')}</p>
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
                          <PulseIndicator size={14} color="#8B9DAF" speed={2} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#8B9DAF]" />
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
                        item.status === 'active' ? 'text-[#8B9DAF]' :
                        item.status === 'completed' ? 'text-white/50' :
                        'text-[rgba(255,255,255,0.25)]'
                      }`}>
                        {item.year}
                        {item.status === 'active' && ` — ${tCommon('active')}`}
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
          STEP 12: WHO WE ARE — S13 OPERATOR MODEL — The philosophy
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <p className="section-label mb-4">{t('sectionLabels.principles')}</p>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6">
                Not a Service Provider.<br />Not a Consultancy.<br />
                <TextReveal
                  text="An Operator."
                  className="gradient-text inline-block"
                />
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8">
                {t('footnote.text')}
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
          STEP 13: STAY INFORMED — S14 NEWSROOM PREVIEW
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">{t('sectionLabels.news')}</p>
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white tracking-tight">{t('sectionLabels.news')}</h2>
              </div>
              <Link href="/newsroom" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[rgba(255,255,255,0.25)] hover:text-white transition-colors group">
                {tCommon('viewAll')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {newsArticles.map((article, i) => (
              <StaggerItem key={i}>
                <Link href="/newsroom" className="group block">
                  <div className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[8px] overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500">
                    {/* Pattern 5: Image with text overlay at bottom */}
                    <div className="relative h-[180px] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.12em] uppercase text-white/70 bg-[rgba(0,0,0,0.5)] mb-1.5">{article.tag}</span>
                        <h4 className="text-[14px] font-bold text-white leading-snug">{article.title}</h4>
                        <p className="text-[12px] text-white/70 mt-0.5">{article.date}</p>
                      </div>
                    </div>
                    {/* Below image */}
                    <div className="p-5">
                      <p className="text-[14px] text-[#999999] leading-relaxed mb-4 line-clamp-2">{article.desc}</p>
                      <span className="text-[12px] text-[#8B9DAF] font-semibold flex items-center gap-1 group-hover:text-white transition-colors">
                        {tCommon('readMore')} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════
          STEP 14: ACT — S15 CTA SECTION — The inevitable next step
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxSection speed={0.1} className="relative bg-[#000000] overflow-hidden">
        <NetworkGrid nodeCount={35} maxDistance={100} opacity={0.04} />
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <FadeIn>
            <TextReveal
              text={t('sectionLabels.cta')}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-white tracking-tight mb-6 leading-tight"
            />
            <p className="max-w-xl mx-auto text-sm text-[rgba(255,255,255,0.3)] leading-relaxed mb-12">
              {t('footnote.text')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton className="inline-block">
                <Link href="/quote" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all duration-300">
                  {tCommon('requestQuote')} <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton className="inline-block">
                <Link href="/contact" className="inline-flex items-center gap-2.5 border border-[rgba(139,157,175,0.2)] bg-[rgba(139,157,175,0.04)] text-[#8B9DAF] px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(139,157,175,0.3)] hover:text-white transition-all duration-300">
                  {t('requestBriefing')}
                </Link>
              </MagneticButton>
              <MagneticButton className="inline-block">
                <Link href="/careers" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300">
                  {t('viewCareers')}
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>
    </div>
  );
}
