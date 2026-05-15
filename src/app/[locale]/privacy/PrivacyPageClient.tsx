'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function PrivacyPageClient() {
  const t = useTranslations('privacy');

  const privacySections = [
    { title: t('dataCollection'), text: t('dataCollectionText') },
    { title: t('dataUse'), text: t('dataUseText') },
    { title: t('dataSharing'), text: t('dataSharingText') },
    { title: t('dataSecurity'), text: t('dataSecurityText') },
    { title: t('cookies'), text: t('cookiesText') },
    { title: t('yourRights'), text: t('yourRightsText') },
    { title: t('internationalTransfers'), text: t('internationalTransfersText') },
    { title: t('contactUs'), text: t('contactUsText') },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('title')}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">{t('title')}</h1>
            <div className="accent-line mb-8" />
            <p className="text-[14px] text-[#999999] leading-relaxed mb-8">{t('lastUpdated')}: {t('lastUpdatedDate')}</p>
          </FadeIn>
          <div className="space-y-10">
            {privacySections.map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.05}>
                <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
                <p className="text-[14px] text-[#999999] leading-[1.8]">{section.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
