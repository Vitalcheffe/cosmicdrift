'use client';

import Link from 'next/link';
import {
  ArrowRight,
  DollarSign,
  Users,
  Rocket,
  Handshake,
  MessageSquare,
  Headphones,
  CheckCircle,
  Globe,
  Cpu,
  Zap,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function StartupProgramPageClient() {
  const t = useTranslations('startupProgram');

  const benefits = [
    {
      icon: DollarSign,
      title: t('benefits.0.title'),
      description: t('benefits.0.description'),
      details: [t('benefits.0.details.0'), t('benefits.0.details.1'), t('benefits.0.details.2'), t('benefits.0.details.3')],
      color: 'rgba(139, 157, 175, 0.7)',
    },
    {
      icon: Users,
      title: t('benefits.1.title'),
      description: t('benefits.1.description'),
      details: [t('benefits.1.details.0'), t('benefits.1.details.1'), t('benefits.1.details.2'), t('benefits.1.details.3')],
      color: 'rgba(0, 255, 136, 0.7)',
    },
    {
      icon: Rocket,
      title: t('benefits.2.title'),
      description: t('benefits.2.description'),
      details: [t('benefits.2.details.0'), t('benefits.2.details.1'), t('benefits.2.details.2'), t('benefits.2.details.3')],
      color: 'rgba(255, 200, 0, 0.7)',
    },
    {
      icon: Handshake,
      title: t('benefits.3.title'),
      description: t('benefits.3.description'),
      details: [t('benefits.3.details.0'), t('benefits.3.details.1'), t('benefits.3.details.2'), t('benefits.3.details.3')],
      color: 'rgba(255, 100, 100, 0.7)',
    },
    {
      icon: MessageSquare,
      title: t('benefits.4.title'),
      description: t('benefits.4.description'),
      details: [t('benefits.4.details.0'), t('benefits.4.details.1'), t('benefits.4.details.2'), t('benefits.4.details.3')],
      color: 'rgba(180, 130, 255, 0.7)',
    },
    {
      icon: Headphones,
      title: t('benefits.5.title'),
      description: t('benefits.5.description'),
      details: [t('benefits.5.details.0'), t('benefits.5.details.1'), t('benefits.5.details.2'), t('benefits.5.details.3')],
      color: 'rgba(255, 160, 60, 0.7)',
    },
  ];

  const successStories = [
    {
      name: t('successStories.0.name'),
      description: t('successStories.0.description'),
      location: t('successStories.0.location'),
      stage: t('successStories.0.stage'),
      metric: t('successStories.0.metric'),
    },
    {
      name: t('successStories.1.name'),
      description: t('successStories.1.description'),
      location: t('successStories.1.location'),
      stage: t('successStories.1.stage'),
      metric: t('successStories.1.metric'),
    },
    {
      name: t('successStories.2.name'),
      description: t('successStories.2.description'),
      location: t('successStories.2.location'),
      stage: t('successStories.2.stage'),
      metric: t('successStories.2.metric'),
    },
  ];

  const applicationSteps = [
    {
      step: '01',
      title: t('process.0.title'),
      description: t('process.0.description'),
    },
    {
      step: '02',
      title: t('process.1.title'),
      description: t('process.1.description'),
    },
    {
      step: '03',
      title: t('process.2.title'),
      description: t('process.2.description'),
    },
    {
      step: '04',
      title: t('process.3.title'),
      description: t('process.3.description'),
    },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('heroTitle1')}<br />{t('heroTitle2')}
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              {t('heroDescription')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <Link href="#apply" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                {t('heroButton1')} <ArrowRight size={14} />
              </Link>
              <Link href="#benefits" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                {t('heroButton2')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Program Benefits */}
      <section id="benefits" className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('benefitsLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('benefitsTitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('benefitsDescription')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.06}>
                <div className="card p-8 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-5">
                    <benefit.icon size={18} style={{ color: benefit.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-5">{benefit.description}</p>
                  <ul className="space-y-2 border-t border-white/[0.06] pt-4">
                    {benefit.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-[12px] text-[#999999]">
                        <CheckCircle size={10} className="text-white/30 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-4">{t('eligibilityLabel')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                {t('eligibilityTitle')}
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[16px] text-[#999999] leading-[1.7]">
                {t('eligibilityDescription')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="card p-8">
                <h3 className="text-lg font-bold text-white mb-6">{t('requirementsTitle')}</h3>
                <div className="space-y-5">
                  {[
                    { title: t('requirements.0.title'), desc: t('requirements.0.desc') },
                    { title: t('requirements.1.title'), desc: t('requirements.1.desc') },
                    { title: t('requirements.2.title'), desc: t('requirements.2.desc') },
                    { title: t('requirements.3.title'), desc: t('requirements.3.desc') },
                    { title: t('requirements.4.title'), desc: t('requirements.4.desc') },
                  ].map((req) => (
                    <div key={req.title} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-white/50 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[14px] font-semibold text-white">{req.title}</p>
                        <p className="text-[13px] text-[#999999] leading-relaxed">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('successStoriesLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('successStoriesTitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('successStoriesDescription')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <FadeIn key={story.name} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <Building2 size={20} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{story.name}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-[#666666]">
                        <MapPin size={10} /> {story.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-5">{story.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">
                      {story.stage}
                    </span>
                    <span className="text-[12px] text-white font-semibold">{story.metric}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('processLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('processTitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('processDescription')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="card p-8 h-full relative">
                  <span className="text-[48px] font-extrabold text-white/[0.06] leading-none stat-mono">{step.step}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              {t('ctaDescription')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                {t('ctaButton1')} <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                {t('ctaButton2')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
