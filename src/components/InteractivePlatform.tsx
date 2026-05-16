'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   HARCH OS — Professional Platform Overview
   Mirrors Palantir's product page structure:
   - Numbered capability cards (01, 02, 03...)
   - Dense, precise professional text
   - Dark brutal palette — no fluo, no game aesthetics
   - Honest: describes what the platform DOES, not fake live data
   ═══════════════════════════════════════════════════════════════ */

interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

// Professional colors — slate, no fluo
const CARD_BORDER = 'rgba(255,255,255,0.08)';
const CARD_BG = '#111113';
const DIVIDER = 'rgba(255,255,255,0.06)';

type ModuleId = 'ontology' | 'foundry' | 'aip' | 'apollo' | 'build';

const MODULES: ModuleId[] = ['ontology', 'foundry', 'aip', 'apollo', 'build'];

// ═══════════════════════════════════════════════════════════════
// Capability Card — exactly like Palantir ShipOS cards
// Numbered, bordered, text-driven
// ═══════════════════════════════════════════════════════════════
function CapabilityCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="border-b pb-5"
      style={{ borderColor: DIVIDER }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[11px] font-mono text-white/20 tracking-wider">{number}</span>
        <h4 className="text-[15px] font-semibold text-white/85 leading-snug">{title}</h4>
      </div>
      <p className="text-[13px] text-white/35 leading-relaxed pl-7">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Module Section — one product per section
// Like Palantir: product name, description paragraph, capabilities
// ═══════════════════════════════════════════════════════════════
function ModuleSection({
  id,
  index,
  t,
}: {
  id: ModuleId;
  index: number;
  t: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const capabilityCount = parseInt(t(`modules.${id}.capabilityCount`));

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left column: Product header */}
        <div className="md:col-span-5">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase block mb-3">
            {String(index + 1).padStart(2, '0')} — {t(`modules.${id}.label`)}
          </span>
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-4 leading-[1.1]">
            {t(`modules.${id}.name`)}
          </h3>
          <p className="text-[14px] text-white/45 leading-[1.7] mb-6">
            {t(`modules.${id}.description`)}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-white/60 hover:text-white/90 transition-colors group"
          >
            {t(`modules.${id}.cta`)}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Right column: Capabilities */}
        <div className="md:col-span-7">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase block mb-5">
            {t(`modules.${id}.capabilitiesLabel`)}
          </span>
          <div className="space-y-5">
            {Array.from({ length: capabilityCount }, (_, i) => (
              <CapabilityCard
                key={i}
                number={String(i + 1).padStart(2, '0')}
                title={t(`modules.${id}.capabilities.${i}.title`)}
                description={t(`modules.${id}.capabilities.${i}.description`)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export function InteractivePlatform({ slug, accent: _accentOverride }: InteractivePlatformProps) {
  const t = useTranslations('interactivePlatform');

  return (
    <div className="w-full bg-[#0A0A0A]">
      {/* Section header — like Palantir's dark product overview */}
      <div className="border-b" style={{ borderColor: DIVIDER }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase block mb-4">
            {t('headerLabel')}
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
            {t('headerTitle')}
          </h2>
          <p className="text-[15px] text-white/40 leading-[1.7] max-w-2xl">
            {t('headerDescription')}
          </p>
        </div>
      </div>

      {/* Product modules */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {MODULES.map((id, index) => (
          <React.Fragment key={id}>
            {index > 0 && (
              <div className="h-[1px] w-full" style={{ backgroundColor: DIVIDER }} />
            )}
            <ModuleSection id={id} index={index} t={t} />
          </React.Fragment>
        ))}
      </div>

      {/* Bottom border */}
      <div className="h-[1px] w-full" style={{ backgroundColor: DIVIDER }} />
    </div>
  );
}
