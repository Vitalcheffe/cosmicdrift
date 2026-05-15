'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Linkedin,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function LeadershipPageClient() {
  const t = useTranslations('company');

  const executives = [
    {
      name: t('leadership.executives.0.name'),
      title: t('leadership.executives.0.title'),
      bio: t('leadership.executives.0.bio'),
      image: '/images/team/ceo.jpg',
      linkedin: '#',
    },
    {
      name: t('leadership.executives.1.name'),
      title: t('leadership.executives.1.title'),
      bio: t('leadership.executives.1.bio'),
      image: '/images/team/coo.jpg',
      linkedin: '#',
    },
    {
      name: t('leadership.executives.2.name'),
      title: t('leadership.executives.2.title'),
      bio: t('leadership.executives.2.bio'),
      image: '/images/team/cto.jpg',
      linkedin: '#',
    },
    {
      name: t('leadership.executives.3.name'),
      title: t('leadership.executives.3.title'),
      bio: t('leadership.executives.3.bio'),
      image: '/images/team/cfo.jpg',
      linkedin: '#',
    },
    {
      name: t('leadership.executives.4.name'),
      title: t('leadership.executives.4.title'),
      bio: t('leadership.executives.4.bio'),
      image: '/images/team/vp-intelligence.jpg',
      linkedin: '#',
    },
    {
      name: t('leadership.executives.5.name'),
      title: t('leadership.executives.5.title'),
      bio: t('leadership.executives.5.bio'),
      image: '/images/team/vp-sustainability.jpg',
      linkedin: '#',
    },
  ];

  const advisors = [
    {
      name: t('leadership.advisors.0.name'),
      title: t('leadership.advisors.0.title'),
      affiliation: t('leadership.advisors.0.affiliation'),
      bio: t('leadership.advisors.0.bio'),
    },
    {
      name: t('leadership.advisors.1.name'),
      title: t('leadership.advisors.1.title'),
      affiliation: t('leadership.advisors.1.affiliation'),
      bio: t('leadership.advisors.1.bio'),
    },
    {
      name: t('leadership.advisors.2.name'),
      title: t('leadership.advisors.2.title'),
      affiliation: t('leadership.advisors.2.affiliation'),
      bio: t('leadership.advisors.2.bio'),
    },
    {
      name: t('leadership.advisors.3.name'),
      title: t('leadership.advisors.3.title'),
      affiliation: t('leadership.advisors.3.affiliation'),
      bio: t('leadership.advisors.3.bio'),
    },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('leadership.label')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('leadership.heroTitle1')}<br />{t('leadership.heroTitle2')}
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              {t('leadership.heroDescription')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('leadership.execTeamLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('leadership.execTeamTitle')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec, i) => (
              <FadeIn key={exec.name} delay={i * 0.06}>
                <div className="card p-8 h-full group">
                  <div className="relative w-20 h-20 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/[0.08] overflow-hidden mb-5">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover industrial-image"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exec.name}</h3>
                  <p className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-4">{exec.title}</p>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-5">{exec.bio}</p>
                  <a href={exec.linkedin} className="inline-flex items-center gap-2 text-[12px] text-[#666666] hover:text-white transition-colors">
                    <Linkedin size={14} /> {t('leadership.linkedin')}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Advisors */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('leadership.advisoryLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('leadership.advisoryTitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              {t('leadership.advisoryDescription')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisors.map((advisor, i) => (
              <FadeIn key={advisor.name} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-white/40" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
                      <p className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{advisor.title}</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-[#666666] uppercase tracking-wider mb-3">{advisor.affiliation}</p>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{advisor.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">
              {t('leadership.ctaTitle')}
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              {t('leadership.ctaDescription')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/careers" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                {t('leadership.ctaButton1')} <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                {t('leadership.ctaButton2')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
