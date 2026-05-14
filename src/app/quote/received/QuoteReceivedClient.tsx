'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Shield,
  FileText,
  Building2,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';

const nextSteps = [
  {
    step: '01',
    title: 'Verification',
    desc: 'Notre equipe verifie votre identite et vos references organisationnelles.',
    icon: Shield,
  },
  {
    step: '02',
    title: 'Classification',
    desc: 'Votre demande est classee et routed vers la division competente parmi nos 8 verticales.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'Devis Detaille',
    desc: 'Un devis complet est elabore par nos experts sectoriels avec specifications techniques et financieres.',
    icon: Building2,
  },
  {
    step: '04',
    title: 'Canal Securise',
    desc: 'Un canal de communication chiffre est etabli dans les 24 heures pour finaliser les termes.',
    icon: Phone,
  },
];

export default function QuoteReceivedClient() {
  const [refCode, setRefCode] = useState('');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setRefCode(`HC-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Success Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-[rgba(74,123,95,0.1)] border border-[rgba(74,123,95,0.2)] flex items-center justify-center mb-8"
              >
                <CheckCircle2 size={36} className="text-[#4A7B5F]" strokeWidth={1.5} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                Demande de Devis Recue
              </h1>

              <div className="accent-line mb-6" />

              <p className="text-[16px] text-[#999999] leading-[1.7] mb-8">
                Votre demande de devis chiffree a ete transmise avec succes. Notre equipe
                dedicacee examinera votre projet et vous contactera dans les 24 heures via un
                canal securise.
              </p>

              {/* Reference badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg mb-6">
                <Lock size={12} className="text-[#8B9DAF]" />
                <span className="text-[11px] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                  REF: {refCode}
                </span>
                <div className="w-px h-3 bg-[rgba(255,255,255,0.06)]" />
                <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">
                  AES-256
                </span>
                <div className="w-px h-3 bg-[rgba(255,255,255,0.06)]" />
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F] animate-pulse" />
                  <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">
                    {formatElapsed(elapsed)}
                  </span>
                </div>
              </div>

              {/* Timeline estimate */}
              <div className="flex items-center gap-2 text-[#666666]">
                <Clock size={14} strokeWidth={1.5} />
                <span className="text-[13px]">
                  Delai de reponse estime : <span className="text-[#8B9DAF] font-semibold">24 heures</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Prochaines Etapes</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-12">
              Ce qui se passe maintenant
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                      <item.icon size={16} className="text-[#8B9DAF]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.12em] text-[#666666] font-[family-name:var(--font-space-mono)]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[12px] text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sovereignty Notice */}
      <section className="py-16 bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="card p-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Shield size={18} className="text-[#8B9DAF] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-[14px] font-bold text-white mb-2">Souverainete des Donnees</h3>
                  <p className="text-[13px] text-[#999999] leading-[1.7] mb-4">
                    Vos donnees sont traitees sur une infrastructure souveraine situee sur le
                    territoire marocain. Nous ne partageons aucune information avec des tiers.
                    Toutes les communications sont chiffrees en AES-256 au repos et TLS 1.3 en
                    transit, conformement a la loi 09-08 relative a la protection des donnees
                    personnelles.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CNDP Maroc', 'AES-256', 'TLS 1.3'].map(
                      (badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded text-[10px] font-semibold text-[#999999] tracking-wide"
                        >
                          {badge}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  En savoir plus sur Harch Corp
                </h3>
                <p className="text-[14px] text-[#666666]">
                  Decouvrez notre infrastructure souveraine a travers l&apos;Afrique.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#CCCCCC] transition-all"
                >
                  Retour a l&apos;Accueil <ArrowRight size={14} />
                </Link>
                <Link
                  href="/subsidiaries"
                  className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
                >
                  Nos Verticales
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
