'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FadeIn,
  CountUp,
} from '@/components/ui/motion';

/* ═══════════════════════════════════════════════════════════════
   PALANTIR-STYLE HOMEPAGE — Minimal. Visual. Psychological.
   
   Two audiences:
   - Strollers: See beauty → leave impressed → never read text
   - Buyers: Click through → find data on subsidiary pages
   
   Homepage = feeling. Subsidiary pages = proof.
   ═══════════════════════════════════════════════════════════════ */

export default function HomePageClient() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [hoveredVertical, setHoveredVertical] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.05]);

  const verticals = [
    { num: '/01', name: t('verticals.intelligence.name'), stat: t('verticals.intelligence.stat'), href: '/subsidiaries/intelligence', accent: '#8B9DAF' },
    { num: '/02', name: t('verticals.cement.name'), stat: t('verticals.cement.stat'), href: '/subsidiaries/cement', accent: '#A08878' },
    { num: '/03', name: t('verticals.energy.name'), stat: t('verticals.energy.stat'), href: '/subsidiaries/energy', accent: '#6B9F6B' },
    { num: '/04', name: t('verticals.technology.name'), stat: t('verticals.technology.stat'), href: '/subsidiaries/technology', accent: '#7888A8' },
    { num: '/05', name: t('verticals.mining.name'), stat: t('verticals.mining.stat'), href: '/subsidiaries/mining', accent: '#A87878' },
    { num: '/06', name: t('verticals.agriculture.name'), stat: t('verticals.agriculture.stat'), href: '/subsidiaries/agriculture', accent: '#6BAF6B' },
    { num: '/07', name: t('verticals.water.name'), stat: t('verticals.water.stat'), href: '/subsidiaries/water', accent: '#6888A8' },
    { num: '/08', name: t('verticals.finance.name'), stat: t('verticals.finance.stat'), href: '/subsidiaries/finance', accent: '#8B9DAF' },
  ];

  return (
    <div className="bg-[#0A0A0A]">

      {/* ═══════════════════════════════════════════════════════════
          HERO — One image. One name. One door.
          ═══════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100dvh] flex items-end overflow-hidden"
      >
        {/* Single powerful background image */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/sections/intelligence-rack.jpg"
            alt="Harch Corp Infrastructure"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.2) 100%)',
          }}
        />

        {/* Content — minimal, powerful */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* SEO H1 */}
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
              Harch Corp
            </h1>

            <p className="text-[clamp(1.1rem,2.5vw,1.75rem)] font-light text-white/50 tracking-[-0.01em] mb-12 max-w-2xl leading-relaxed">
              {t('heroBadge')}
            </p>

            {/* Single CTA */}
            <Link
              href="#verticals"
              className="inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all group"
            >
              Explore
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04] z-30" />
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          STATEMENT — One powerful line. Palantir-style.
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
          IMAGE BREAK — Full-width visual, one stat overlay
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/images/sections/energy-solar-farm.jpg"
          alt="Renewable Energy Infrastructure"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.9)] via-[rgba(10,10,10,0.3)] to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <FadeIn>
            <p className="text-[clamp(3rem,7vw,6rem)] font-extrabold text-white/90 tracking-[-0.03em] leading-none">
              2GW+
            </p>
            <p className="text-sm text-white/40 tracking-[0.15em] uppercase mt-3 font-medium">
              {t('verticals.energy.stat')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VERTICALS — Clean list. Names, numbers, links.
          No cards. No images. No descriptions.
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
                  onMouseEnter={() => setHoveredVertical(i)}
                  onMouseLeave={() => setHoveredVertical(null)}
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
          NUMBERS — Just four big numbers. No descriptions.
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
          SECOND IMAGE BREAK
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
          "Request a Briefing" for the serious.
          "Explore the Platform" for the curious.
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Light card */}
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

              {/* Dark card */}
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
