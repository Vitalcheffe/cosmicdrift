'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const featuredArticle = {
  title: 'Harch Intelligence Secures 500MW Data Center Site in Dakhla',
  date: 'March 15, 2026',
  tag: 'Intelligence',
  excerpt: 'Harch Intelligence, the AI infrastructure subsidiary of Harch Corp, has secured a 50-hectare site in Dakhla, Morocco for its flagship 500MW hyperscale data center. The facility will be the largest AI compute installation in Africa, powered entirely by renewable energy from Harch Energy\'s 2GW+ pipeline. Construction is expected to begin in Q3 2026 with the first 100MW module operational by mid-2027.',
};

const articles = [
  { title: 'Harch Energy Reaches 2GW Renewable Pipeline Milestone', date: 'February 28, 2026', tag: 'Energy', excerpt: 'Harch Energy has reached a major milestone with over 2 gigawatts of renewable energy projects in its pipeline, including solar, wind, and green hydrogen facilities across Morocco and the Sahel region.' },
  { title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals', date: 'January 15, 2026', tag: 'Corporate', excerpt: 'At its annual strategy summit in Casablanca, Harch Corp unveiled a $2.4B+ investment pipeline spanning 7 industrial verticals across 5 African countries.' },
  { title: 'Gambia Cement Plant Permits Approved', date: 'December 8, 2025', tag: 'Ciment', excerpt: 'The Republic of Gambia has approved all permits for Harch Ciment\'s 500kT/yr cement production facility, clearing the way for construction to begin in Q2 2026.' },
  { title: 'Harch Technology Launches Sovereign AI Platform', date: 'November 20, 2025', tag: 'Technology', excerpt: 'Harch Technology has launched its sovereign AI platform, designed to provide African enterprises and governments with independent AI compute capabilities without dependency on foreign infrastructure.' },
  { title: 'Partnership with MASEN for Green Hydrogen Production', date: 'October 5, 2025', tag: 'Energy', excerpt: 'Harch Energy has signed a strategic partnership with MASEN for green hydrogen production in southern Morocco, leveraging the region\'s exceptional solar resources.' },
  { title: 'Harch Mining Secures Exploration Rights in Mauritania', date: 'September 12, 2025', tag: 'Mining', excerpt: 'Harch Mining has secured exploration rights for phosphate, cobalt, and rare earth deposits in Mauritania, marking the company\'s entry into strategic mineral extraction.' },
  { title: 'Harch Water Pilot Desalination Project Launched', date: 'August 1, 2025', tag: 'Water', excerpt: 'Harch Water has launched a pilot desalination project in southern Morocco, testing AI-optimized distribution systems that will scale to 200M m³/yr by 2030.' },
  { title: 'Harch Corp Completes $400M Series A Funding Round', date: 'July 15, 2025', tag: 'Corporate', excerpt: 'Harch Corp has completed a $400M Series A funding round led by African Infrastructure Partners with participation from sovereign wealth funds and development finance institutions.' },
  { title: 'Harch Agri Initiates Precision Farming Trials in Senegal', date: 'June 20, 2025', tag: 'Agri', excerpt: 'Harch Agri has initiated precision farming trials across 5,000 hectares in Senegal, deploying IoT sensors, drone monitoring, and AI-optimized crop management systems.' },
];

const pressResources = [
  { title: 'Brand Guidelines', desc: 'Harch Corp brand assets, logos, and usage guidelines.' },
  { title: 'Executive Bios', desc: 'Biographies and headshots of Harch Corp leadership.' },
  { title: 'Fact Sheet', desc: 'Company overview, key metrics, and vertical summaries.' },
  { title: 'Media Contact', desc: 'press@harchcorp.com — Response within 4 hours.' },
];

export default function NewsroomPageClient() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Newsroom</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-[#000000] tracking-[-0.02em] leading-[1.05] mb-6">
              Latest Updates
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#6B7280] leading-[1.7]">
              News, announcements, and insights from Harch Corp and its seven industrial verticals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(0,0,0,0.04)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#000000]">{featuredArticle.tag}</span>
                <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1"><Calendar size={10} />{featuredArticle.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#000000] tracking-tight mb-4 leading-tight">{featuredArticle.title}</h2>
              <p className="text-[15px] text-[#6B7280] leading-[1.7] max-w-3xl mb-6">{featuredArticle.excerpt}</p>
              <Link href="/newsroom" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#000000] transition-colors group">
                Read Full Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">All Articles</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] tracking-[-0.01em] mb-12">News & Announcements</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <FadeIn key={article.title} delay={i * 0.05}>
                <div className="card p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(0,0,0,0.04)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#000000]">{article.tag}</span>
                    <span className="text-[10px] text-[#9CA3AF]">{article.date}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#000000] leading-snug mb-3">{article.title}</h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed flex-1">{article.excerpt}</p>
                  <Link href="/newsroom" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] hover:text-[#000000] transition-colors mt-4 group">
                    Read More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Press Resources */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Press Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] tracking-[-0.01em] mb-12">Media Kit</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressResources.map((resource, i) => (
              <FadeIn key={resource.title} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <Tag size={16} className="text-[rgba(0,0,0,0.15)] mb-3" strokeWidth={1.5} />
                  <h3 className="text-[14px] font-bold text-[#000000] mb-1">{resource.title}</h3>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed">{resource.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
