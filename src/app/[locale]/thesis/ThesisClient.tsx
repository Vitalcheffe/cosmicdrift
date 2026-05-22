'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollRevealSection from '@/components/ScrollRevealSection';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function ThesisClient() {
  const t = useTranslations('thesis');

  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══ HERO ═══ */}
      <section className="photo-section relative min-h-[70vh] flex items-end">
        <Image
          src="/images/hero-intelligence.jpg"
          alt={t('introduction.title')}
          fill
          className="object-cover industrial-image"
          priority
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">{t('manifesto')}</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6">
              {t('introduction.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
              {t('introduction.description')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Scroll Reveal Sections */}
      <ScrollRevealSection
        imageSrc="/images/section-energy-1.jpg"
        imageAlt={t('theProblem.title')}
        heading={t('theProblem.title')}
        description={t('theProblem.description')}
        variant="diagonal-left"
      />

      <ScrollRevealSection
        imageSrc="/images/section-intelligence-1.jpg"
        imageAlt={t('theSolution.pillars.compute.title')}
        heading={t('theSolution.pillars.compute.title')}
        description={t('theSolution.pillars.compute.description')}
        variant="diagonal-right"
      />

      {/* ═══ ARTICLE BODY ═══ */}
      <article className="prose-article max-w-[800px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* ── Section 1: The Problem ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theProblem.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theProblem.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theProblem.dependencies.materials.description')}
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 2: The Sovereignty Gap ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('competitiveAdvantage.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('competitiveAdvantage.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theProblem.dependencies.technology.description')}
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-energy-1.jpg" alt={t('theSolution.pillars.energy.title')} fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 3: The Harch Model ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theSolution.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('competitiveAdvantage.moats.verticalIntegration.description')}
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 4: Intelligence ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theSolution.pillars.compute.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.pillars.compute.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('competitiveAdvantage.moats.carbonAdvantage.description')}
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-intelligence-1.jpg" alt={t('theSolution.pillars.compute.title')} fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 5: Energy ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theSolution.pillars.energy.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.pillars.energy.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('competitiveAdvantage.moats.geographicPosition.description')}
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 6: Mining & Value Chain ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theSolution.pillars.materials.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.pillars.materials.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theProblem.dependencies.materials.description')}
          </p>
        </FadeIn>

        {/* ── Section 7: Water & Agriculture ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('theSolution.pillars.water.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.pillars.water.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('theSolution.pillars.food.description')}
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-agriculture-1.jpg" alt={t('theSolution.pillars.food.title')} fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 8: The Path Forward ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            {t('marketOpportunity.title')}
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('marketOpportunity.description')}
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            {t('competitiveAdvantage.moats.sovereignData.description')}
          </p>
        </FadeIn>

        <div className="my-16 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── CTA ── */}
        <FadeIn>
          <div className="card p-8 md:p-12 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-4">{t('cta.subtitle')}</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-[14px] text-[#999999] leading-relaxed mb-8 max-w-lg mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-md hover:bg-white/90 transition-colors"
              >
                {t('cta.primary')} <ArrowRight size={14} />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.2)] text-white/60 text-sm font-semibold rounded-md hover:text-white hover:border-white/40 transition-colors"
              >
                {t('cta.secondary')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>

      </article>
    </div>
  );
}
