'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Handshake, Cpu, Building } from 'lucide-react';

const strategicPartners = [
  { name: 'Office Chérifien des Phosphates', description: 'Strategic partnership for phosphate extraction and value-added mineral processing across Morocco\'s mining corridor.' },
  { name: 'Office National de l\'Électricité', description: 'Grid integration and power purchase agreements for Harch Energy\'s renewable energy portfolio.' },
  { name: 'Kingdom of Morocco — Ministry of Industry', description: 'Framework agreement for industrial zone development and investment incentives across strategic sectors.' },
];

const technologyPartners = [
  { name: 'NVIDIA', description: 'AI compute infrastructure and GPU cluster design for Harch Intelligence\'s hyperscale data center.' },
  { name: 'Schneider Electric', description: 'Power distribution, cooling systems, and energy management for data center and industrial operations.' },
  { name: 'Siemens', description: 'Industrial automation, IoT platforms, and digital twin technology for manufacturing and mining operations.' },
  { name: 'SAP', description: 'Enterprise resource planning and business intelligence platforms across Harch Corp\'s seven verticals.' },
];

const financialPartners = [
  { name: 'Banque Africaine de Développement', description: 'Project finance and development funding for infrastructure investments across the Sahel region.' },
  { name: 'CDG Capital', description: 'Moroccan investment banking partner for capital markets, bond issuance, and M&A advisory.' },
  { name: 'International Finance Corporation', description: 'Co-investment and risk-sharing framework for renewable energy and industrial projects.' },
  { name: 'BNP Paribas', description: 'Structured finance and trade finance solutions for cross-border operations and export credit.' },
];

function PartnerCategory({ icon: Icon, title, partners }: { icon: React.ComponentType<{ className?: string }>; title: string; partners: { name: string; description: string }[] }) {
  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-3 mb-6">
          <Icon className="w-6 h-6 text-harch-gold" />
          <h2 className="text-2xl font-bold text-harch-text uppercase tracking-tight">{title}</h2>
        </div>
        <div className="w-12 h-0.5 bg-harch-gold" />
      </FadeIn>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {partners.map((partner, index) => (
          <FadeIn key={partner.name} delay={index * 0.08}>
            <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow h-full">
              {/* Placeholder Logo */}
              <div className="flex items-center justify-center h-12 mb-4 rounded-lg bg-[#111627] border border-harch-border">
                <span className="text-sm font-bold tracking-wider text-harch-muted uppercase">{partner.name.split(' ').map(w => w[0]).join('')}</span>
              </div>
              <h3 className="text-base font-semibold text-harch-text">{partner.name}</h3>
              <p className="mt-2 text-xs text-harch-muted leading-relaxed">{partner.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export default function PartnersPageClient() {
  return (
    <>
      <PageHero
        title="Our Partners"
        subtitle="Strategic alliances powering Africa's industrial future"
      />

      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            <PartnerCategory icon={Handshake} title="Strategic Partners" partners={strategicPartners} />
            <PartnerCategory icon={Cpu} title="Technology Partners" partners={technologyPartners} />
            <PartnerCategory icon={Building} title="Financial Partners" partners={financialPartners} />
          </div>
        </div>
      </section>

      {/* Partnership Inquiry */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Become a Partner
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-xl mx-auto">
              We are always open to strategic partnerships that advance Africa&apos;s industrial
              sovereignty. If your organization shares our vision, we would like to hear from you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="mailto:partnerships@harchcorp.com"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
            >
              Contact Partnerships Team
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
