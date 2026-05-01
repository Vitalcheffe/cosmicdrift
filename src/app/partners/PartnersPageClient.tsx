'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Landmark, Building, Globe } from 'lucide-react';

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
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Partners</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#101820] tracking-tight mb-8">
            Partner<br/>Ecosystem
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-[#6B7280] leading-relaxed">
            Harch Corp works with world-class partners across technology, finance, industry, 
            and government to build Africa&apos;s critical infrastructure.
          </p>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-20">
            {partnerCategories.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-3 mb-4">
                  <category.icon size={18} className="text-[#9CA3AF]" strokeWidth={1.5} />
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#101820] tracking-tight">
                    {category.title}
                  </h2>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-8 max-w-2xl">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {category.partners.map((partner) => (
                    <span
                      key={partner}
                      className="px-4 py-2 border border-[rgba(0,0,0,0.08)] rounded-md text-xs text-[#9CA3AF]"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#101820] tracking-tight mb-6">
            Become a Partner
          </h2>
          <p className="max-w-xl mx-auto text-base text-[#9CA3AF] mb-10">
            Join the ecosystem building Africa&apos;s industrial sovereignty. We&apos;re always 
            looking for strategic partners who share our mission.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#101820] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-[#1f2937] transition-colors"
          >
            Partner With Us
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
