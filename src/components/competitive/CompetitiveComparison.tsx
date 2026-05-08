'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Types ─── */
export interface MetricComparison {
  label: string;
  harchValue: string;
  competitorValue: string;
  unit?: string;
  note?: string;
  /** Whether Harch wins on this metric (for accent indicator) */
  harchWins?: boolean;
}

export interface Competitor {
  name: string;
  country: string;
  metrics: MetricComparison[];
  verdict: string;
}

export interface CompetitiveComparisonProps {
  title?: string;
  subtitle?: string;
  accentColor: string;
  sectionLabel?: string;
  competitors: Competitor[];
  harchName?: string;
}

/* ─── FadeIn helper ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function CompetitiveComparison({
  title = 'Competitive Landscape',
  subtitle,
  accentColor,
  sectionLabel = 'Competitive Landscape',
  competitors,
  harchName = 'Harch',
}: CompetitiveComparisonProps) {
  return (
    <section className="py-28 md:py-36 bg-[#121212]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <FadeIn>
          <p className="section-label mb-4" style={{ color: accentColor }}>
            {sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
            {title}
          </h2>
          <div className="accent-line mb-6" />
          {subtitle && (
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              {subtitle}
            </p>
          )}
        </FadeIn>

        {/* Competitor Cards */}
        <div className="space-y-6">
          {competitors.map((competitor, i) => (
            <FadeIn key={competitor.name} delay={i * 0.08}>
              <div className="card p-6 md:p-8">
                {/* Competitor Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <h3 className="text-lg font-bold text-white">{competitor.name}</h3>
                  <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
                    {competitor.country}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.06)]">
                        <th className="text-left text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] px-4 py-3 w-[35%]">
                          Metric
                        </th>
                        <th className="text-left text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] px-4 py-3 w-[30%]">
                          {harchName}
                        </th>
                        <th className="text-left text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] px-4 py-3 w-[30%]">
                          {competitor.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitor.metrics.map((metric, j) => (
                        <tr
                          key={metric.label}
                          className="border-b border-[rgba(255,255,255,0.03)] last:border-0"
                        >
                          <td className="px-4 py-3 text-[13px] text-[#999999]">
                            {metric.label}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {metric.harchWins && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: accentColor }}
                                />
                              )}
                              <span className="text-[13px] font-bold text-white stat-mono">
                                {metric.harchValue}
                                {metric.unit && (
                                  <span className="text-[#999999] font-normal ml-1">
                                    {metric.unit}
                                  </span>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#999999] stat-mono">
                            {metric.competitorValue}
                            {metric.unit && (
                              <span className="text-[#666666] ml-1">{metric.unit}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Verdict */}
                <div
                  className="mt-6 px-5 py-4 rounded-lg"
                  style={{
                    borderLeft: `3px solid ${accentColor}`,
                    backgroundColor: `${accentColor}08`,
                  }}
                >
                  <p className="text-[13px] text-[#CCCCCC] leading-[1.7]">
                    <span
                      className="font-bold font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wider mr-2"
                      style={{ color: accentColor }}
                    >
                      Verdict
                    </span>
                    {competitor.verdict}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
