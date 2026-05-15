'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu, Landmark, Building, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function PartnersPageClient() {
  const t = useTranslations('partners');

  const partnerCategories = [
    {
      icon: Cpu,
      title: t('categories.technology.title'),
      description: t('categories.technology.description'),
      partners: [
        t('categories.technology.partners.0'),
        t('categories.technology.partners.1'),
        t('categories.technology.partners.2'),
        t('categories.technology.partners.3'),
        t('categories.technology.partners.4'),
      ],
    },
    {
      icon: Landmark,
      title: t('categories.financial.title'),
      description: t('categories.financial.description'),
      partners: [
        t('categories.financial.partners.0'),
        t('categories.financial.partners.1'),
        t('categories.financial.partners.2'),
        t('categories.financial.partners.3'),
        t('categories.financial.partners.4'),
      ],
    },
    {
      icon: Building,
      title: t('categories.industrial.title'),
      description: t('categories.industrial.description'),
      partners: [
        t('categories.industrial.partners.0'),
        t('categories.industrial.partners.1'),
        t('categories.industrial.partners.2'),
        t('categories.industrial.partners.3'),
        t('categories.industrial.partners.4'),
      ],
    },
    {
      icon: Globe,
      title: t('categories.government.title'),
      description: t('categories.government.description'),
      partners: [
        t('categories.government.partners.0'),
        t('categories.government.partners.1'),
        t('categories.government.partners.2'),
        t('categories.government.partners.3'),
        t('categories.government.partners.4'),
      ],
    },
  ];

  return (
    <div className="bg-[#121212]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6">{t('hero.label')}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.01em] mb-8">
              {t('hero.title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-base md:text-lg text-[#999999] leading-relaxed">
              {t('hero.description')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.06)] bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-20">
            {partnerCategories.map((category, i) => (
              <FadeIn key={category.title} delay={i * 0.15}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon size={18} className="text-white" strokeWidth={1.5} />
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em]">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-sm text-[#999999] leading-relaxed mb-8 max-w-2xl">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {category.partners.map((partner) => (
                      <span
                        key={partner}
                        className="px-4 py-2 border border-[rgba(255,255,255,0.06)] rounded-xl text-xs text-[#999999]"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.06)] bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-6">
              {t('becomePartner.title')}
            </h2>
            <p className="max-w-xl mx-auto text-base text-[#666666] mb-10">
              {t('becomePartner.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0A0F1A] text-white px-8 py-4 rounded-xl text-sm font-medium hover:bg-[#0A0F1A]/90 transition-colors"
            >
              {t('becomePartner.cta')}
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
