'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

interface GlossaryTerm {
  term: string;
  definition: string;
  letter: string;
}

export default function GlossaryPageClient() {
  const t = useTranslations('glossary');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const glossaryTerms: GlossaryTerm[] = [
    // A
    { term: t('terms.aiInference.term'), definition: t('terms.aiInference.definition'), letter: 'A' },
    { term: t('terms.api.term'), definition: t('terms.api.definition'), letter: 'A' },
    { term: t('terms.airGapped.term'), definition: t('terms.airGapped.definition'), letter: 'A' },
    // C
    { term: t('terms.cloudComputing.term'), definition: t('terms.cloudComputing.definition'), letter: 'C' },
    { term: t('terms.compute.term'), definition: t('terms.compute.definition'), letter: 'C' },
    { term: t('terms.containerization.term'), definition: t('terms.containerization.definition'), letter: 'C' },
    { term: t('terms.carbonAwareComputing.term'), definition: t('terms.carbonAwareComputing.definition'), letter: 'C' },
    { term: t('terms.carbonIntensity.term'), definition: t('terms.carbonIntensity.definition'), letter: 'C' },
    // D
    { term: t('terms.dataCenter.term'), definition: t('terms.dataCenter.definition'), letter: 'D' },
    { term: t('terms.dataSovereignty.term'), definition: t('terms.dataSovereignty.definition'), letter: 'D' },
    { term: t('terms.dpa.term'), definition: t('terms.dpa.definition'), letter: 'D' },
    { term: t('terms.desalination.term'), definition: t('terms.desalination.definition'), letter: 'D' },
    // E
    { term: t('terms.edgeComputing.term'), definition: t('terms.edgeComputing.definition'), letter: 'E' },
    { term: t('terms.esg.term'), definition: t('terms.esg.definition'), letter: 'E' },
    { term: t('terms.egress.term'), definition: t('terms.egress.definition'), letter: 'E' },
    // F
    { term: t('terms.fogComputing.term'), definition: t('terms.fogComputing.definition'), letter: 'F' },
    { term: t('terms.freeTier.term'), definition: t('terms.freeTier.definition'), letter: 'F' },
    // G
    { term: t('terms.gpu.term'), definition: t('terms.gpu.definition'), letter: 'G' },
    { term: t('terms.greenComputing.term'), definition: t('terms.greenComputing.definition'), letter: 'G' },
    { term: t('terms.grpc.term'), definition: t('terms.grpc.definition'), letter: 'G' },
    { term: t('terms.greenHydrogen.term'), definition: t('terms.greenHydrogen.definition'), letter: 'G' },
    // H
    { term: t('terms.harchOS.term'), definition: t('terms.harchOS.definition'), letter: 'H' },
    { term: t('terms.hyperscale.term'), definition: t('terms.hyperscale.definition'), letter: 'H' },
    // I
    { term: t('terms.iaas.term'), definition: t('terms.iaas.definition'), letter: 'I' },
    { term: t('terms.inference.term'), definition: t('terms.inference.definition'), letter: 'I' },
    { term: t('terms.iso27001.term'), definition: t('terms.iso27001.definition'), letter: 'I' },
    { term: t('terms.islamicFinance.term'), definition: t('terms.islamicFinance.definition'), letter: 'I' },
    // K
    { term: t('terms.kubernetes.term'), definition: t('terms.kubernetes.definition'), letter: 'K' },
    // L
    { term: t('terms.latency.term'), definition: t('terms.latency.definition'), letter: 'L' },
    { term: t('terms.llm.term'), definition: t('terms.llm.definition'), letter: 'L' },
    { term: t('terms.loadBalancer.term'), definition: t('terms.loadBalancer.definition'), letter: 'L' },
    // M
    { term: t('terms.multiTenant.term'), definition: t('terms.multiTenant.definition'), letter: 'M' },
    { term: t('terms.microservices.term'), definition: t('terms.microservices.definition'), letter: 'M' },
    // O
    { term: t('terms.onPremises.term'), definition: t('terms.onPremises.definition'), letter: 'O' },
    { term: t('terms.openapi.term'), definition: t('terms.openapi.definition'), letter: 'O' },
    // P
    { term: t('terms.paas.term'), definition: t('terms.paas.definition'), letter: 'P' },
    { term: t('terms.pemElectrolysis.term'), definition: t('terms.pemElectrolysis.definition'), letter: 'P' },
    { term: t('terms.phosphateMining.term'), definition: t('terms.phosphateMining.definition'), letter: 'P' },
    { term: t('terms.precisionAgriculture.term'), definition: t('terms.precisionAgriculture.definition'), letter: 'P' },
    { term: t('terms.pue.term'), definition: t('terms.pue.definition'), letter: 'P' },
    // R
    { term: t('terms.restApi.term'), definition: t('terms.restApi.definition'), letter: 'R' },
    { term: t('terms.rbac.term'), definition: t('terms.rbac.definition'), letter: 'R' },
    { term: t('terms.renewableEnergy.term'), definition: t('terms.renewableEnergy.definition'), letter: 'R' },
    // S
    { term: t('terms.saas.term'), definition: t('terms.saas.definition'), letter: 'S' },
    { term: t('terms.soc2.term'), definition: t('terms.soc2.definition'), letter: 'S' },
    { term: t('terms.sovereignCloud.term'), definition: t('terms.sovereignCloud.definition'), letter: 'S' },
    { term: t('terms.senseThinkAct.term'), definition: t('terms.senseThinkAct.definition'), letter: 'S' },
    { term: t('terms.sovereignAi.term'), definition: t('terms.sovereignAi.definition'), letter: 'S' },
    { term: t('terms.submarineCable.term'), definition: t('terms.submarineCable.definition'), letter: 'S' },
    { term: t('terms.sukuk.term'), definition: t('terms.sukuk.definition'), letter: 'S' },
    // T
    { term: t('terms.terraform.term'), definition: t('terms.terraform.definition'), letter: 'T' },
    { term: t('terms.throughput.term'), definition: t('terms.throughput.definition'), letter: 'T' },
    // V
    { term: t('terms.verticalIntegration.term'), definition: t('terms.verticalIntegration.definition'), letter: 'V' },
    { term: t('terms.virtualization.term'), definition: t('terms.virtualization.definition'), letter: 'V' },
    { term: t('terms.verticalFarming.term'), definition: t('terms.verticalFarming.definition'), letter: 'V' },
    // W
    { term: t('terms.waterDesalination.term'), definition: t('terms.waterDesalination.definition'), letter: 'W' },
    { term: t('terms.webhook.term'), definition: t('terms.webhook.definition'), letter: 'W' },
  ];

  const allLetters = 'ACDEFGHIKLMNOPRSTVW'.split('');

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    if (activeLetter) {
      terms = terms.filter(t => t.letter === activeLetter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(t =>
        t.term.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query)
      );
    }
    return terms;
  }, [searchQuery, activeLetter, glossaryTerms]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      if (!groups[term.letter]) groups[term.letter] = [];
      groups[term.letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const availableLetters = allLetters.filter(letter =>
    glossaryTerms.some(g => g.letter === letter)
  );

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('hero.label')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('hero.title')}
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7] mb-10">
              {t('hero.description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-xl relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] placeholder-[#666666] focus:outline-none focus:border-[rgba(139,157,175,0.3)] transition-colors"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ A-Z NAVIGATION ═══ */}
      <section className="py-6 bg-[#121212] border-y border-[rgba(255,255,255,0.04)] sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveLetter(null)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 shrink-0 ${
                activeLetter === null
                  ? 'bg-white text-black'
                  : 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
              }`}
            >
              {t('allLabel')}
            </button>
            <span className="w-px h-4 bg-[rgba(255,255,255,0.06)] mx-1" />
            {allLetters.map((letter) => {
              const hasTerms = availableLetters.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => hasTerms ? setActiveLetter(activeLetter === letter ? null : letter) : undefined}
                  disabled={!hasTerms}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 shrink-0 ${
                    activeLetter === letter
                      ? 'bg-white text-black'
                      : hasTerms
                        ? 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
                        : 'text-[rgba(255,255,255,0.1)] cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TERMS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {filteredTerms.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <Search size={32} className="text-[#666666] mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">{t('noResultsTitle')}</p>
                <p className="text-[14px] text-[#999999] mt-2">{t('noResultsDescription')}</p>
              </div>
            </FadeIn>
          ) : (
            Object.entries(groupedTerms).sort(([a], [b]) => a.localeCompare(b)).map(([letter, terms]) => (
              <div key={letter} className="mb-16 last:mb-0">
                <FadeIn>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[48px] md:text-[64px] font-extrabold text-[rgba(255,255,255,0.04)] leading-none stat-mono">{letter}</span>
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.04)]" />
                  </div>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {terms.map((term, i) => (
                    <FadeIn key={term.term} delay={i * 0.04}>
                      <div className="card p-5 h-full group cursor-pointer">
                        <h3 className="text-[15px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors mb-2">{term.term}</h3>
                        <p className="text-[13px] text-[#999999] leading-relaxed">{term.definition}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ═══ CTA: Explore Documentation ═══ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen size={32} className="text-[#8B9DAF] mx-auto mb-6" strokeWidth={1.5} />
              <p className="section-label mb-4 text-[#8B9DAF]">{t('cta.label')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">{t('cta.title')}</h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/docs"
                  className="px-8 py-3 rounded-lg bg-white text-black text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#CCCCCC] transition-colors inline-flex items-center gap-2"
                >
                  {t('cta.exploreDocs')} <ArrowRight size={14} />
                </Link>
                <Link
                  href="/docs/api"
                  className="px-8 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[rgba(255,255,255,0.08)] transition-colors inline-flex items-center gap-2"
                >
                  {t('cta.apiReference')}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
