'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, Mail, Phone, Calendar, FileText, Image as ImageIcon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

import { FadeIn } from '@/components/ui/motion';

const pressReleases = [
  {
    date: 'April 14, 2026',
    title: 'Harch Finance Launches $500M Green Bond Program for Sovereign Infrastructure',
    excerpt: 'Harch Corp S.A. announces the launch of a $500 million green bond program through its Harch Finance subsidiary, targeting sovereign infrastructure projects across Africa. The program is the largest green bond issuance by an African industrial conglomerate and has received an independent second-party opinion from Sustainalytics confirming alignment with ICMA Green Bond Principles.',
    category: 'Finance',
    image: '/images/finance/green-bonds-africa.jpg',
  },
  {
    date: 'March 12, 2026',
    title: 'Harch Intelligence: 500MW Dakhla Data Center Enters Engineering Phase',
    excerpt: 'Harch Corp S.A. announces the commencement of engineering design for the 500MW Dakhla AI Hyperscale Data Center, set to become Africa\'s largest sovereign AI compute facility. The facility will house over 100,000 GPUs powered by 97%+ renewable energy, with direct submarine cable connectivity to Europe and the Americas.',
    category: 'Intelligence',
    image: '/images/blog/dakhla-data-center-construction.jpg',
  },
  {
    date: 'February 28, 2026',
    title: 'Harch Cement Secures Gambia Permits — 500kT/yr Facility Greenlit',
    excerpt: 'Harch Corp S.A. has received all environmental and construction permits for its 500kT/yr cement production facility in Gambia. The $200M investment represents Gambia\'s first domestic cement manufacturing operation, creating 800+ direct jobs and eliminating the country\'s 100% import dependency.',
    category: 'Cement',
    image: '/images/case-studies/gambia-cement-operations.jpg',
  },
  {
    date: 'January 15, 2026',
    title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals',
    excerpt: 'Moroccan industrial conglomerate Harch Corp S.A. has unveiled a $2.4 billion investment pipeline spanning seven industrial verticals: AI data centers, renewable energy, cement, sovereign technology, strategic mining, precision agriculture, and water infrastructure. The pipeline spans 5 countries and targets 25,000+ jobs by 2030.',
    category: 'Corporate',
    image: '/images/company/hq-casablanca.jpg',
  },
  {
    date: 'December 18, 2025',
    title: 'Harch Corp Publishes Inaugural ESG Report: Carbon Intensity 89% Below Industry Average',
    excerpt: 'Harch Corp S.A. has published its inaugural Environmental, Social, and Governance report, documenting carbon intensity of ~47 gCO2/kWh across its GPU cloud operations — 89% below the global data center industry average. The report covers environmental performance, community impact, governance practices, and workforce development across all eight subsidiaries.',
    category: 'Corporate',
    image: '/images/esg/esg-report-2025.jpg',
  },
  {
    date: 'December 10, 2025',
    title: 'Harch Energy Secures 2GW Renewable Energy Pipeline in Morocco',
    excerpt: 'Harch Energy has secured licensing and land rights for over 2 gigawatts of renewable energy capacity across Morocco, including solar CSP, photovoltaic, onshore wind, and green hydrogen production facilities. The pipeline positions Morocco as a leading green energy exporter to Europe.',
    category: 'Energy',
    image: '/images/blog/energy-2gw-pipeline.jpg',
  },
  {
    date: 'November 20, 2025',
    title: 'HarchOS SDK v0.2 Released: Carbon-Aware AI Workload Orchestration',
    excerpt: 'Harch Intelligence has released HarchOS SDK v0.2, introducing real-time carbon-aware workload scheduling across all 5 GPU hubs. The SDK enables developers to deploy AI workloads with automatic routing to the lowest-carbon hub, achieving an average of ~47 gCO2/kWh — 89% below the industry average.',
    category: 'Technology',
    image: '/images/blog/carbon-aware-gpu-cloud.jpg',
  },
];

const brandAssets = [
  { name: 'Harch Corp Logo (SVG)', format: 'SVG', desc: 'Vector logo for light and dark backgrounds' },
  { name: 'Harch Corp Logo (PNG, 512x512)', format: 'PNG', desc: 'Square logo for social media and press' },
  { name: 'Harch Corp Logo (PNG, 1200x630)', format: 'PNG', desc: 'OG image for social sharing' },
  { name: 'Brand Guidelines', format: 'PDF', desc: 'Color palette, typography, spacing rules' },
  { name: 'Executive Headshots', format: 'PNG', desc: 'High-resolution executive portraits' },
  { name: 'Facility Photography', format: 'JPG', desc: 'Data center, energy, mining, agriculture imagery' },
];

const factSheet = [
  { label: 'Legal Name', value: 'Harch Corp S.A.' },
  { label: 'Founded', value: '2024' },
  { label: 'Headquarters', value: 'Casablanca, Morocco' },
  { label: 'Capital', value: '100M MAD' },
  { label: 'Industry', value: 'Conglomerate / Holding Company' },
  { label: 'NAICS Code', value: '551112 (Offices of Bank Holding Companies)' },
  { label: 'Subsidiaries', value: '7 (Intelligence, Energy, Cement, Technology, Mining, Agriculture, Water)' },
  { label: 'Investment Pipeline', value: '$2.4B+' },
  { label: 'Countries', value: '5 (Morocco, Gambia, Senegal, Sahel Region, MENA)' },
  { label: 'Target Jobs', value: '25,000+ by 2030' },
  { label: 'GPU Capacity', value: '1,798 current / 100,000+ target' },
  { label: 'Energy Pipeline', value: '2GW+ renewable' },
  { label: 'Tagline', value: "Africa's Sovereign Infrastructure OS" },
  { label: 'Website', value: 'www.harchcorp.com' },
];

export default function PressPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Press & Media</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Newsroom Resources
            </h1>
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Official press resources, brand assets, fact sheet, and media contact information for Harch Corp S.A. Journalists and analysts may use these materials with attribution.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-28 md:py-36 bg-[#121212] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Press Releases</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">Latest Announcements</h2>
          </FadeIn>

          <div className="space-y-6">
            {pressReleases.map((release, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="card p-6 md:p-8">
                  {/* Image */}
                  {release.image && (
                    <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden mb-6 border border-[rgba(255,255,255,0.06)]">
                      <Image
                        src={release.image}
                        alt={release.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 900px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">
                      {release.category}
                    </span>
                    <span className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)] flex items-center gap-1">
                      <Calendar size={10} /> {release.date}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">{release.title}</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{release.excerpt}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fact Sheet */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Company Fact Sheet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">At a Glance</h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#1E1E1E] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factSheet.map((item) => (
                      <tr key={item.label}>
                        <td className="font-semibold">{item.label}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-28 md:py-36 bg-[#121212] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Brand Assets</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">Media Kit</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandAssets.map((asset, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {asset.format === 'SVG' || asset.format === 'PNG' ? (
                      <ImageIcon size={18} className="text-[#8B9DAF]" />
                    ) : asset.format === 'PDF' ? (
                      <FileText size={18} className="text-[#8B9DAF]" />
                    ) : (
                      <Globe size={18} className="text-[#8B9DAF]" />
                    )}
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.1em] uppercase bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.15)] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                      {asset.format}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-bold text-white mb-1">{asset.name}</h3>
                  <p className="text-[12px] text-[#666666] mb-4">{asset.desc}</p>
                  <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B9DAF] hover:text-white transition-colors">
                    <Download size={12} /> Download
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">Media Relations</h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-8">
                <h3 className="text-lg font-bold text-white mb-4">Press Inquiries</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-[#8B9DAF]" />
                    <div>
                      <p className="text-[12px] text-[#666666]">Email</p>
                      <a href="mailto:press@harchcorp.com" className="text-[14px] text-white hover:text-[#8B9DAF] transition-colors">press@harchcorp.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-[#8B9DAF]" />
                    <div>
                      <p className="text-[12px] text-[#666666]">Phone</p>
                      <p className="text-[14px] text-white">Contact us for phone support</p>
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-[#666666] leading-relaxed mt-4">
                  Our media relations team responds to press inquiries within 4 business hours during weekdays. Please include your publication name, deadline, and specific questions.
                </p>
              </div>

              <div className="card p-8">
                <h3 className="text-lg font-bold text-white mb-4">Interview Requests</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-[#8B9DAF]" />
                    <div>
                      <p className="text-[12px] text-[#666666]">Email</p>
                      <a href="mailto:ir@harchcorp.com" className="text-[14px] text-white hover:text-[#8B9DAF] transition-colors">ir@harchcorp.com</a>
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-[#666666] leading-relaxed mt-4">
                  For interview requests with Harch Corp executives or subsidiary leaders, please contact our investor relations team. We accommodate broadcast, print, and podcast formats.
                </p>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] hover:text-white transition-colors">
                    General Contact <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
