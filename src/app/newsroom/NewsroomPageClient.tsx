'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { featuredArticle, regularArticles } from '@/data/articles';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const pressResources = [
  { title: 'Brand Guidelines', desc: 'Harch Corp brand assets, logos, and usage guidelines.' },
  { title: 'Executive Bios', desc: 'Biographies and headshots of Harch Corp leadership.' },
  { title: 'Fact Sheet', desc: 'Company overview, key metrics, and vertical summaries.' },
  { title: 'Media Contact', desc: 'press@harchcorp.com — Response within 4 hours.' },
];

export default function NewsroomPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Newsroom</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Latest Updates
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              News, announcements, and insights from Harch Corp and its seven industrial verticals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 md:py-28 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[9px] font-bold tracking-[0.12em] uppercase text-white">{featuredArticle.tag}</span>
                <span className="text-[11px] text-[#666666] flex items-center gap-1"><Calendar size={10} />{featuredArticle.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">{featuredArticle.title}</h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] max-w-3xl mb-6">{featuredArticle.excerpt}</p>
              <Link href={`/newsroom/${featuredArticle.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#999999] hover:text-white transition-colors group">
                Read Full Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">All Articles</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">News & Announcements</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.05}>
                <div className="card p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[9px] font-bold tracking-[0.12em] uppercase text-white">{article.tag}</span>
                    <span className="text-[10px] text-[#666666]">{article.date}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white leading-snug mb-3">{article.title}</h3>
                  <p className="text-[13px] text-[#999999] leading-relaxed flex-1">{article.excerpt}</p>
                  <Link href={`/newsroom/${article.slug}`} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#999999] hover:text-white transition-colors mt-4 group">
                    Read More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Press Resources */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Press Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">Media Kit</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressResources.map((resource, i) => (
              <FadeIn key={resource.title} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <Tag size={16} className="text-[rgba(255,255,255,0.15)] mb-3" strokeWidth={1.5} />
                  <h3 className="text-[14px] font-bold text-white mb-1">{resource.title}</h3>
                  <p className="text-[12px] text-[#999999] leading-relaxed">{resource.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
