'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FadeIn,
  CountUp,
} from '@/components/ui/motion';

/* ═══════════════════════════════════════════════════════════════
   PALANTIR-STYLE HOMEPAGE — Every vertical gets a full-screen hero
   that auto-cycles. Like Palantir's scrolling product showcase.
   ═══════════════════════════════════════════════════════════════ */

export default function HomePageClient() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ─── Verticals with images for the full-screen carousel ─── */
  const verticals = [
    { num: '/01', name: t('verticals.intelligence.name'), stat: t('verticals.intelligence.stat'), headline: t('verticals.intelligence.headline'), href: '/subsidiaries/intelligence', image: '/images/sections/intelligence-rack.jpg', accent: '#8B9DAF' },
    { num: '/02', name: t('verticals.cement.name'), stat: t('verticals.cement.stat'), headline: t('verticals.cement.headline'), href: '/subsidiaries/cement', image: '/images/sections/cement-kiln.jpg', accent: '#A08878' },
    { num: '/03', name: t('verticals.energy.name'), stat: t('verticals.energy.stat'), headline: t('verticals.energy.headline'), href: '/subsidiaries/energy', image: '/images/sections/energy-solar-farm.jpg', accent: '#6B9F6B' },
    { num: '/04', name: t('verticals.technology.name'), stat: t('verticals.technology.stat'), headline: t('verticals.technology.headline'), href: '/subsidiaries/technology', image: '/images/sections/tech-ground-station.jpg', accent: '#7888A8' },
    { num: '/05', name: t('verticals.mining.name'), stat: t('verticals.mining.stat'), headline: t('verticals.mining.headline'), href: '/subsidiaries/mining', image: '/images/sections/mining-smelter.jpg', accent: '#A87878' },
    { num: '/06', name: t('verticals.agriculture.name'), stat: t('verticals.agriculture.stat'), headline: t('verticals.agriculture.headline'), href: '/subsidiaries/agriculture', image: '/images/sections/agri-vertical-farm.jpg', accent: '#6BAF6B' },
    { num: '/07', name: t('verticals.water.name'), stat: t('verticals.water.stat'), headline: t('verticals.water.headline'), href: '/subsidiaries/water', image: '/images/sections/water-treatment.jpg', accent: '#6888A8' },
    { num: '/08', name: t('verticals.finance.name'), stat: t('verticals.finance.stat'), headline: t('verticals.finance.headline'), href: '/subsidiaries/finance', image: '/images/sections/finance-trading.jpg', accent: '#8B9DAF' },
  ];

  /* ─── Auto-cycle through verticals ─── */
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % verticals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, verticals.length]);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % verticals.length);
  }, [verticals.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + verticals.length) % verticals.length);
  }, [verticals.length]);

  return (
    <div className="bg-[#0A0A0A]">

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-screen auto-cycling vertical showcase
          Each vertical gets a monumental image + headline + arrow
          Like Palantir's scrolling product sections
          ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100dvh] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background images per slide — crossfade */}
        {verticals.map((v, i) => (
          <div
            key={v.num}
            className="absolute inset-0 z-0"
            style={{
              opacity: i === activeSlide ? 1 : 0,
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Image
              src={v.image}
              alt={v.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark overlay — heavy at bottom for text */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.3) 65%, rgba(10,10,10,0.15) 100%)',
          }}
        />

        {/* Accent glow per vertical */}
        <div
          className="absolute inset-0 z-[2] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at 20% 80%, ${verticals[activeSlide].accent}08 0%, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-20 md:pb-28">
          {/* SEO H1 — always visible */}
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-2">
            Harch Corp
          </h1>

          <p className="text-[clamp(0.9rem,2vw,1.2rem)] font-light text-white/40 tracking-[-0.01em] mb-10 max-w-xl">
            {t('heroBadge')}
          </p>

          {/* Slide content — animated per vertical */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Vertical number */}
              <span className="text-[11px] font-bold tracking-[0.15em] text-white/20 font-mono mb-3 block">
                {verticals[activeSlide].num}
              </span>

              {/* Headline — Palantir style: big text + arrow */}
              <Link
                href={verticals[activeSlide].href}
                className="group inline-flex items-center gap-4 mb-3"
              >
                <span className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-white tracking-[-0.02em] group-hover:text-white/90 transition-colors">
                  {verticals[activeSlide].headline}
                </span>
                <ArrowRight size={24} className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Stat */}
              <p className="text-[13px] font-medium text-white/30 font-mono tracking-tight">
                {verticals[activeSlide].stat}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide navigation — dots on the right */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2">
          {verticals.map((v, i) => (
            <button
              key={v.num}
              onClick={() => setActiveSlide(i)}
              className="group relative flex items-center justify-end"
              aria-label={v.name}
            >
              {/* Label on hover */}
              <span className="absolute right-5 text-[10px] font-medium text-white/0 group-hover:text-white/60 transition-all duration-300 whitespace-nowrap pr-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                {v.name}
              </span>
              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === activeSlide
                    ? 'w-[3px] h-8 bg-white/80'
                    : 'w-[3px] h-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/[0.06]">
          <motion.div
            className="h-full bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            key={activeSlide}
            transition={{ duration: 4, ease: 'linear' }}
          />
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          STATEMENT — One powerful line.
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold text-white/90 leading-[1.15] tracking-[-0.02em] max-w-4xl">
              {t('statement')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VERTICALS LIST — Clean numbered list. Quick scan.
          ═══════════════════════════════════════════════════════════ */}
      <section id="verticals" className="py-32 md:py-40 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/25 mb-16">
              {t('sectionLabels.verticals')}
            </p>
          </FadeIn>

          <div className="space-y-0">
            {verticals.map((v, i) => (
              <FadeIn key={v.num} delay={i * 0.05}>
                <Link
                  href={v.href}
                  className="group flex items-center justify-between py-6 md:py-8 border-b border-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-[11px] font-bold tracking-[0.1em] text-white/20 font-mono w-10 shrink-0">
                      {v.num}
                    </span>
                    <span className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-white/80 group-hover:text-white tracking-[-0.01em] transition-colors duration-300">
                      {v.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium text-white/30 font-mono tracking-tight hidden sm:block">
                      {v.stat}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NUMBERS — Four big numbers. No descriptions.
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-[#0A0A0A] border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:gap-x-20 md:gap-y-20">
            {[
              { value: 2400, prefix: '$', suffix: 'M+', label: t('stats.investmentPipeline.label') },
              { value: 47, prefix: '~', suffix: '', label: t('stats.carbonIntensity.label') },
              { value: 81.5, prefix: '', suffix: '%', label: t('stats.renewableEnergy.label'), decimals: 1 },
              { value: 25000, prefix: '', suffix: '+', label: t('stats.employment2030.label') },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <p className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-[-0.03em] leading-none mb-3 font-mono">
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} decimals={stat.decimals ?? 0} />
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE BREAK — Casablanca
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/sections/overview-casablanca.jpg"
          alt="Casablanca Operations Hub"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.95)] via-[rgba(10,10,10,0.4)] to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <FadeIn>
            <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white/80 tracking-[-0.02em] leading-tight max-w-xl">
              8 Verticals. 5 Countries.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — Two doors. Palantir-style.
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/contact"
                className="group flex items-center justify-between p-8 md:p-12 bg-[#E8E8E8] rounded-lg hover:bg-[#DEDEDE] transition-all duration-300"
              >
                <div>
                  <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-black tracking-[-0.01em] mb-2">
                    {t('cta.requestBriefing')}
                  </p>
                  <p className="text-sm text-black/50">
                    {t('cta.requestBriefingDesc')}
                  </p>
                </div>
                <ArrowUpRight size={24} className="text-black/30 group-hover:text-black/70 transition-colors shrink-0 ml-4" />
              </Link>

              <Link
                href="/subsidiaries/intelligence"
                className="group flex items-center justify-between p-8 md:p-12 bg-[#1A1A1A] border border-white/[0.08] rounded-lg hover:border-white/[0.2] transition-all duration-300"
              >
                <div>
                  <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-white tracking-[-0.01em] mb-2">
                    {t('cta.explorePlatform')}
                  </p>
                  <p className="text-sm text-white/40">
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
