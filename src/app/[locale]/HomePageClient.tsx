'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FadeIn,
  CountUp,
} from '@/components/ui/motion';

/* ═══════════════════════════════════════════════════════════════
   EXACT PALANTIR LAYOUT — Section by section:
   1. HERO — Full-screen image + centered headline
   2. VERTICALS SHOWCASE — Tags row + big image (click to switch)
   3. TEXT — White bg, centered statement
   4. FEATURE LIST — Numbered items with /0.x indicators
   5. SPLIT — Image LEFT + text RIGHT
   6. NUMBERS — Four big stats
   7. VIDEO BREAK — Infrastructure footage
   8. CTA — Two doors side by side
   ═══════════════════════════════════════════════════════════════ */

export default function HomePageClient() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  const [activeVertical, setActiveVertical] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ─── Verticals data ─── */
  const verticals = [
    { num: '/01', name: t('verticals.intelligence.name'), tagline: t('verticals.intelligence.tagline'), stat: t('verticals.intelligence.stat'), headline: t('verticals.intelligence.headline'), description: t('verticals.intelligence.description'), href: '/subsidiaries/intelligence', image: '/images/sections/intelligence-rack.jpg', accent: '#8B9DAF' },
    { num: '/02', name: t('verticals.cement.name'), tagline: t('verticals.cement.tagline'), stat: t('verticals.cement.stat'), headline: t('verticals.cement.headline'), description: t('verticals.cement.description'), href: '/subsidiaries/cement', image: '/images/sections/cement-kiln.jpg', accent: '#A08878' },
    { num: '/03', name: t('verticals.energy.name'), tagline: t('verticals.energy.tagline'), stat: t('verticals.energy.stat'), headline: t('verticals.energy.headline'), description: t('verticals.energy.description'), href: '/subsidiaries/energy', image: '/images/sections/energy-solar-farm.jpg', accent: '#6B9F6B' },
    { num: '/04', name: t('verticals.technology.name'), tagline: t('verticals.technology.tagline'), stat: t('verticals.technology.stat'), headline: t('verticals.technology.headline'), description: t('verticals.technology.description'), href: '/subsidiaries/technology', image: '/images/sections/tech-ground-station.jpg', accent: '#7888A8' },
    { num: '/05', name: t('verticals.mining.name'), tagline: t('verticals.mining.tagline'), stat: t('verticals.mining.stat'), headline: t('verticals.mining.headline'), description: t('verticals.mining.description'), href: '/subsidiaries/mining', image: '/images/sections/mining-smelter.jpg', accent: '#A87878' },
    { num: '/06', name: t('verticals.agriculture.name'), tagline: t('verticals.agriculture.tagline'), stat: t('verticals.agriculture.stat'), headline: t('verticals.agriculture.headline'), description: t('verticals.agriculture.description'), href: '/subsidiaries/agriculture', image: '/images/sections/agri-vertical-farm.jpg', accent: '#6BAF6B' },
    { num: '/07', name: t('verticals.water.name'), tagline: t('verticals.water.tagline'), stat: t('verticals.water.stat'), headline: t('verticals.water.headline'), description: t('verticals.water.description'), href: '/subsidiaries/water', image: '/images/sections/water-treatment.jpg', accent: '#6888A8' },
    { num: '/08', name: t('verticals.finance.name'), tagline: t('verticals.finance.tagline'), stat: t('verticals.finance.stat'), headline: t('verticals.finance.headline'), description: t('verticals.finance.description'), href: '/subsidiaries/finance', image: '/images/sections/finance-trading.jpg', accent: '#8B9DAF' },
  ];

  /* ─── Feature items for the numbered list ─── */
  const features = [
    { label: t('operatorPrinciples.sovereignByDesign.title'), description: t('operatorPrinciples.sovereignByDesign.description') },
    { label: t('operatorPrinciples.verticalIntegration.title'), description: t('operatorPrinciples.verticalIntegration.description') },
    { label: t('operatorPrinciples.speedAtScale.title'), description: t('operatorPrinciples.speedAtScale.description') },
    { label: t('operatorPrinciples.worldClassStandards.title'), description: t('operatorPrinciples.worldClassStandards.description') },
  ];

  return (
    <div className="bg-white">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO: Full-screen image + centered headline
          Like Palantir's hero: big image, headline centered
          ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100dvh] overflow-hidden bg-black"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/sections/overview-casablanca.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content — centered like Palantir */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6 max-w-4xl">
            {t('heroTitle')}
          </h1>
          <p className="text-[clamp(1rem,2vw,1.35rem)] font-normal text-white/60 max-w-2xl leading-relaxed mb-10">
            {t('heroSubtitle')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/subsidiaries/intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[14px] font-semibold rounded hover:bg-white/90 transition-colors"
            >
              {t('ctaPrimary')}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white text-[14px] font-semibold rounded hover:border-white/60 transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — VERTICALS SHOWCASE: Tags + Big Image
          Like Palantir's product showcase:
          - Row of clickable tags at top
          - Full-width image below with overlay text
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F5]">
        {/* Tags row — like Palantir's ShipOS, Warp Speed, etc. */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-6">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            {verticals.map((v, i) => (
              <button
                key={v.num}
                onClick={() => setActiveVertical(i)}
                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
                  i === activeVertical
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white text-black/60 hover:bg-black/5 hover:text-black/80'
                }`}
              >
                {v.name}
              </button>
            ))}
            <Link
              href="/subsidiaries/intelligence"
              className="px-4 py-2 text-[13px] font-medium text-black/40 hover:text-black/60 transition-colors ml-auto"
            >
              {t('sectionLabels.verticals')} →
            </Link>
          </div>
        </div>

        {/* Big image with overlay text — like Palantir's product image */}
        <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVertical}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={verticals[activeVertical].image}
                alt={verticals[activeVertical].name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Overlay text — bottom-left like Palantir */}
          <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">
                  {verticals[activeVertical].tagline}
                </span>
                <Link
                  href={verticals[activeVertical].href}
                  className="group inline-flex items-center gap-3"
                >
                  <span className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight">
                    {verticals[activeVertical].headline}
                  </span>
                  <ArrowUpRight size={28} className="text-white/40 group-hover:text-white/80 transition-colors shrink-0" />
                </Link>
                <p className="text-[14px] text-white/50 mt-3 max-w-lg leading-relaxed">
                  {verticals[activeVertical].stat} — {verticals[activeVertical].description.split('—')[0].trim()}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — TEXT: White bg, centered statement
          Like Palantir's "Software that powers real-time decisions"
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="text-[clamp(1.75rem,4vw,3rem)] font-semibold text-black/90 leading-[1.2] tracking-[-0.02em]">
              {t('statement')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — FEATURE LIST: Numbered items with /0.x
          Like Palantir's feature section with /0.1 /0.2 indicators
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/30 mb-16">
              {t('sectionLabels.principles')}
            </p>
          </FadeIn>

          <div className="space-y-0">
            {features.map((f, i) => (
              <FadeIn key={f.label} delay={i * 0.08}>
                <div className="group flex items-start justify-between py-8 md:py-10 border-b border-black/[0.06] hover:border-black/[0.15] transition-colors">
                  <div className="flex-1 pr-8">
                    <h3 className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-black/90 tracking-[-0.01em] mb-2">
                      {f.label}
                    </h3>
                    <p className="text-[15px] text-black/50 leading-relaxed max-w-xl">
                      {f.description}
                    </p>
                  </div>
                  <span className="text-[12px] font-medium text-black/20 font-mono tracking-tight pt-2 shrink-0">
                    /0.{i + 1}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — SPLIT: Image LEFT + text RIGHT
          Like Palantir's "There is so much left to build"
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
            {/* Image LEFT */}
            <div className="relative h-[50vh] md:h-auto overflow-hidden">
              <Image
                src="/images/sections/energy-solar-farm.jpg"
                alt={t('splitImageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            {/* Text RIGHT */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-20 bg-[#F5F5F5]">
              <FadeIn>
                <blockquote className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-black/90 leading-[1.2] tracking-[-0.02em] mb-6">
                  {t('ceoQuote.text')}
                </blockquote>
                <div className="mb-8">
                  <p className="text-[14px] font-semibold text-black/80">{t('ceoQuote.author')}</p>
                  <p className="text-[13px] text-black/40">{t('ceoQuote.title')}</p>
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-black/70 hover:text-black transition-colors"
                >
                  {tCommon('learnMore')}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — NUMBERS: Four big stats
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/30 mb-16">
              {t('sectionLabels.inNumbers')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:gap-x-20 md:gap-y-20">
            {[
              { value: 2400, prefix: '$', suffix: 'M+', label: t('stats.investmentPipeline.label') },
              { value: 47, prefix: '~', suffix: '', label: t('stats.carbonIntensity.label') },
              { value: 81.5, prefix: '', suffix: '%', label: t('stats.renewableEnergy.label'), decimals: 1 },
              { value: 25000, prefix: '', suffix: '+', label: t('stats.employment2030.label') },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <p className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-black tracking-[-0.03em] leading-none mb-3 font-mono">
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} decimals={stat.decimals ?? 0} />
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — VIDEO BREAK: Infrastructure drone footage
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/sections/overview-casablanca.jpg"
        >
          <source src="/videos/infrastructure.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <FadeIn>
            <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white/90 tracking-[-0.02em] leading-tight max-w-xl">
              {t('sectionLabels.eightVerticals')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — CTA: Two doors side by side
          Like Palantir's "Request a Demo" + "Start Building"
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#F5F5F5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/contact"
                className="group flex items-center justify-between p-8 md:p-12 bg-white rounded-lg hover:bg-black/5 transition-all duration-300 border border-black/[0.06]"
              >
                <div>
                  <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-black tracking-[-0.01em] mb-2">
                    {t('cta.requestBriefing')}
                  </p>
                  <p className="text-[14px] text-black/40">
                    {t('cta.requestBriefingDesc')}
                  </p>
                </div>
                <ArrowUpRight size={24} className="text-black/20 group-hover:text-black/60 transition-colors shrink-0 ml-4" />
              </Link>

              <Link
                href="/subsidiaries/intelligence"
                className="group flex items-center justify-between p-8 md:p-12 bg-[#0A0A0A] rounded-lg hover:bg-[#1A1A1A] transition-all duration-300"
              >
                <div>
                  <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-white tracking-[-0.01em] mb-2">
                    {t('cta.explorePlatform')}
                  </p>
                  <p className="text-[14px] text-white/40">
                    {t('cta.explorePlatformDesc')}
                  </p>
                </div>
                <ArrowUpRight size={24} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0 ml-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
