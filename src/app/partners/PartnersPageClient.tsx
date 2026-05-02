'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu, Landmark, Building, Globe } from 'lucide-react';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const partnerCategories = [
  {
    icon: Cpu,
    title: 'Technology Partners',
    description: 'Leading technology companies providing hardware, software, and AI infrastructure to power Harch Intelligence and Harch Technology operations.',
    partners: ['GPU & Compute Providers', 'Cloud Platform Partners', 'AI/ML Framework Partners', 'Industrial IoT Providers', 'Cybersecurity Partners'],
  },
  {
    icon: Landmark,
    title: 'Financial Partners',
    description: 'International development finance institutions, sovereign wealth funds, and private equity firms providing capital for Harch Corp\'s $2.4B+ investment pipeline.',
    partners: ['Development Finance Institutions', 'Sovereign Wealth Funds', 'Infrastructure Funds', 'Commercial Banks', 'Export Credit Agencies'],
  },
  {
    icon: Building,
    title: 'Industrial Partners',
    description: 'Engineering firms, EPC contractors, and equipment suppliers collaborating on Harch Corp\'s construction and manufacturing projects.',
    partners: ['EPC Contractors', 'Engineering Consultancies', 'Equipment Manufacturers', 'Mining Services Companies', 'Construction Materials Suppliers'],
  },
  {
    icon: Globe,
    title: 'Government & Institutional Partners',
    description: 'National and regional governments, regulatory bodies, and international organizations supporting Harch Corp\'s mission of African industrial sovereignty.',
    partners: ['National Governments', 'Regional Development Agencies', 'Utility Companies', 'Academic Institutions', 'Industry Associations'],
  },
];

export default function PartnersPageClient() {
  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6">Partners</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.01em] mb-8">
              Partner<br/>Ecosystem
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-base md:text-lg text-white/40 leading-relaxed">
              Harch Corp works with world-class partners across technology, finance, industry, 
              and government to build Africa&apos;s critical infrastructure.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-20">
            {partnerCategories.map((category, i) => (
              <FadeIn key={category.title} delay={i * 0.15}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon size={18} className="text-[#C9A84C]/40" strokeWidth={1.5} />
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em]">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed mb-8 max-w-2xl">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {category.partners.map((partner) => (
                      <span
                        key={partner}
                        className="px-4 py-2 border border-[rgba(255,255,255,0.06)] rounded-xl text-xs text-white/30"
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
      <section className="py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-6">
              Become a Partner
            </h2>
            <p className="max-w-xl mx-auto text-base text-white/20 mb-10">
              Join the ecosystem building Africa&apos;s industrial sovereignty. We&apos;re always 
              looking for strategic partners who share our mission.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Partner With Us
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
