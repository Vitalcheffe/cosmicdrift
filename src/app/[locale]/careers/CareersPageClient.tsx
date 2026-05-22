'use client';

import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Zap,
  Users,
  Heart,
  GraduationCap,
  Globe,
  TrendingUp,
  Building2,
  Shield,
  Crosshair,
  Fingerprint,
  ChevronRight,
  Target,
  Skull,
  Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

export default function CareersPageClient() {
  const t = useTranslations('careers');

  const positions = [
    { key: 'sovereignInfraEngineer', title: t('positions.sovereignInfraEngineer.title'), department: t('positions.sovereignInfraEngineer.department'), location: t('positions.sovereignInfraEngineer.location'), type: t('positions.sovereignInfraEngineer.type'), level: t('positions.sovereignInfraEngineer.level'), clearance: true },
    { key: 'aiMlWeaponsLead', title: t('positions.aiMlWeaponsLead.title'), department: t('positions.aiMlWeaponsLead.department'), location: t('positions.aiMlWeaponsLead.location'), type: t('positions.aiMlWeaponsLead.type'), level: t('positions.aiMlWeaponsLead.level'), clearance: true },
    { key: 'renewableEnergyOps', title: t('positions.renewableEnergyOps.title'), department: t('positions.renewableEnergyOps.department'), location: t('positions.renewableEnergyOps.location'), type: t('positions.renewableEnergyOps.type'), level: t('positions.renewableEnergyOps.level'), clearance: false },
    { key: 'cementPlantDir', title: t('positions.cementPlantDir.title'), department: t('positions.cementPlantDir.department'), location: t('positions.cementPlantDir.location'), type: t('positions.cementPlantDir.type'), level: t('positions.cementPlantDir.level'), clearance: false },
    { key: 'miningGeologist', title: t('positions.miningGeologist.title'), department: t('positions.miningGeologist.department'), location: t('positions.miningGeologist.location'), type: t('positions.miningGeologist.type'), level: t('positions.miningGeologist.level'), clearance: false },
    { key: 'precisionAgriSpec', title: t('positions.precisionAgriSpec.title'), department: t('positions.precisionAgriSpec.department'), location: t('positions.precisionAgriSpec.location'), type: t('positions.precisionAgriSpec.type'), level: t('positions.precisionAgriSpec.level'), clearance: false },
    { key: 'waterDesalEngineer', title: t('positions.waterDesalEngineer.title'), department: t('positions.waterDesalEngineer.department'), location: t('positions.waterDesalEngineer.location'), type: t('positions.waterDesalEngineer.type'), level: t('positions.waterDesalEngineer.level'), clearance: false },
    { key: 'cybersecArchitect', title: t('positions.cybersecArchitect.title'), department: t('positions.cybersecArchitect.department'), location: t('positions.cybersecArchitect.location'), type: t('positions.cybersecArchitect.type'), level: t('positions.cybersecArchitect.level'), clearance: true },
    { key: 'corpFinanceAnalyst', title: t('positions.corpFinanceAnalyst.title'), department: t('positions.corpFinanceAnalyst.department'), location: t('positions.corpFinanceAnalyst.location'), type: t('positions.corpFinanceAnalyst.type'), level: t('positions.corpFinanceAnalyst.level'), clearance: false },
    { key: 'esgComplianceMgr', title: t('positions.esgComplianceMgr.title'), department: t('positions.esgComplianceMgr.department'), location: t('positions.esgComplianceMgr.location'), type: t('positions.esgComplianceMgr.type'), level: t('positions.esgComplianceMgr.level'), clearance: false },
    { key: 'constructionCmdr', title: t('positions.constructionCmdr.title'), department: t('positions.constructionCmdr.department'), location: t('positions.constructionCmdr.location'), type: t('positions.constructionCmdr.type'), level: t('positions.constructionCmdr.level'), clearance: false },
    { key: 'satcomEngineer', title: t('positions.satcomEngineer.title'), department: t('positions.satcomEngineer.department'), location: t('positions.satcomEngineer.location'), type: t('positions.satcomEngineer.type'), level: t('positions.satcomEngineer.level'), clearance: true },
  ];

  const benefits = [
    { key: 'compensation', icon: TrendingUp, title: t('benefits.compensation.title'), desc: t('benefits.compensation.desc') },
    { key: 'health', icon: Heart, title: t('benefits.health.title'), desc: t('benefits.health.desc') },
    { key: 'development', icon: GraduationCap, title: t('benefits.development.title'), desc: t('benefits.development.desc') },
    { key: 'deployment', icon: Globe, title: t('benefits.deployment.title'), desc: t('benefits.deployment.desc') },
    { key: 'impact', icon: Zap, title: t('benefits.impact.title'), desc: t('benefits.impact.desc') },
    { key: 'bureaucracy', icon: Building2, title: t('benefits.bureaucracy.title'), desc: t('benefits.bureaucracy.desc') },
  ];

  const selectionSteps = [
    { key: 'application', step: '01', title: t('selection.application.title'), desc: t('selection.application.desc'), icon: Fingerprint },
    { key: 'technical', step: '02', title: t('selection.technical.title'), desc: t('selection.technical.desc'), icon: Crosshair },
    { key: 'alignment', step: '03', title: t('selection.alignment.title'), desc: t('selection.alignment.desc'), icon: Target },
    { key: 'interview', step: '04', title: t('selection.interview.title'), desc: t('selection.interview.desc'), icon: Shield },
  ];

  const cultureCards = [
    { key: 'missionOverComfort', title: t('culture.missionOverComfort.title'), desc: t('culture.missionOverComfort.desc'), icon: Flame },
    { key: 'sovereignMindset', title: t('culture.sovereignMindset.title'), desc: t('culture.sovereignMindset.desc'), icon: Shield },
    { key: 'crossDomain', title: t('culture.crossDomain.title'), desc: t('culture.crossDomain.desc'), icon: Crosshair },
    { key: 'meritNoCompromise', title: t('culture.meritNoCompromise.title'), desc: t('culture.meritNoCompromise.desc'), icon: Skull },
  ];

  const departments = [
    { key: 'all', label: t('departments.all') },
    { key: 'technology', label: t('departments.technology') },
    { key: 'intelligence', label: t('departments.intelligence') },
    { key: 'energy', label: t('departments.energy') },
    { key: 'cement', label: t('departments.cement') },
    { key: 'mining', label: t('departments.mining') },
    { key: 'agri', label: t('departments.agri') },
    { key: 'water', label: t('departments.water') },
    { key: 'corporate', label: t('departments.corporate') },
  ];

  const missionStats = [
    { key: 'positions', value: t('missionStats.positions.value'), label: t('missionStats.positions.label'), desc: t('missionStats.positions.desc') },
    { key: 'verticals', value: t('missionStats.verticals.value'), label: t('missionStats.verticals.label'), desc: t('missionStats.verticals.desc') },
    { key: 'countries', value: t('missionStats.countries.value'), label: t('missionStats.countries.label'), desc: t('missionStats.countries.desc') },
  ];

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-60" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            {/* Clearance Banner */}
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-[rgba(139,157,175,0.2)] bg-[rgba(139,157,175,0.04)] rounded-sm">
              <Shield size={12} className="text-[#8B9DAF]" />
              <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-[0.25em] text-[#8B9DAF] uppercase">{t('clearanceBadge')}</span>
            </div>
            <p className="section-label mb-4">{t('heroLabel')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('heroTitleLine1')}<br />{t('heroTitleLine2')}
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              {t('heroDescription')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('missionLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('missionTitleLine1')}<br />{t('missionTitleLine2')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionStats.map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div className="card p-8 h-full text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2 stat-mono">{item.value}</p>
                  <div className="accent-line mx-auto mb-4" />
                  <p className="text-[14px] font-semibold text-white mb-2">{item.label}</p>
                  <p className="text-[13px] text-[#999999] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Active Deployments */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('deploymentsLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('openPositions')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-4">{t('openPositionsDescription')}</p>
          </FadeIn>

          {/* Department Filter Bar */}
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[rgba(255,255,255,0.04)]">
              {departments.map((dept, i) => (
                <button
                  key={dept.key}
                  className={`px-3 py-1.5 rounded-sm text-[11px] font-semibold tracking-wide uppercase transition-all ${
                    i === 0
                      ? 'bg-[rgba(139,157,175,0.12)] text-[#8B9DAF] border border-[rgba(139,157,175,0.2)]'
                      : 'bg-transparent text-[#666666] border border-[rgba(255,255,255,0.04)] hover:text-[#999999] hover:border-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-0">
            {positions.map((pos, i) => (
              <FadeIn key={pos.key} delay={i * 0.03}>
                <div className="vertical-row group flex flex-col md:flex-row md:items-center justify-between py-5 px-4 cursor-pointer">
                  <div className="flex-1 min-w-0 mb-2 md:mb-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-[15px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors">{pos.title}</h3>
                      {pos.clearance && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.15)] text-[9px] font-bold tracking-[0.15em] text-[#8B9DAF] uppercase font-[family-name:var(--font-space-mono)]">
                          <Shield size={9} /> {t('clearanceRequired')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[11px] text-[#666666] font-semibold uppercase tracking-wide">{pos.department}</span>
                      <span className="text-[11px] text-[#666666] flex items-center gap-1"><MapPin size={10} />{pos.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">{pos.type}</span>
                    <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">{pos.level}</span>
                    <ChevronRight size={14} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('selectionLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              {t('selectionTitle')}
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">{t('selectionDescription')}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {selectionSteps.map((step, i) => (
              <FadeIn key={step.key} delay={i * 0.1}>
                <div className="card p-6 md:p-8 h-full relative">
                  {/* Step number */}
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.2em] text-[rgba(139,157,175,0.35)] uppercase block mb-5">{t('phase')} {step.step}</span>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.1)] flex items-center justify-center mb-4">
                    <step.icon size={18} className="text-[#8B9DAF]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2">{step.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[13px] text-[#999999] leading-[1.7]">{step.desc}</p>
                  {/* Connector line to next step */}
                  {i < selectionSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[rgba(255,255,255,0.06)]" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Standard */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('standardLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('standardTitle')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureCards.map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.1)] flex items-center justify-center">
                      <item.icon size={16} className="text-[#8B9DAF]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('benefitsLabel')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              {t('benefitsTitle')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.key} delay={i * 0.06}>
                <div className="card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-3">
                    <b.icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{b.title}</h4>
                  <p className="text-[12px] text-[#999999] leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">{t('ctaTitle')}</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-4">{t('ctaDescription')}</p>
            <p className="text-[13px] text-[#666666] font-[family-name:var(--font-space-mono)] mb-12">{t('generalApplications')} <a href="mailto:amine@harchcorp.com" className="text-[rgba(139,157,175,0.7)] hover:text-[#8B9DAF] transition-colors">amine@harchcorp.com</a></p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">{t('applyForDeployment')} <ArrowRight size={14} /></Link>
              <Link href="/about" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">{t('aboutHarchCorp')}</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
