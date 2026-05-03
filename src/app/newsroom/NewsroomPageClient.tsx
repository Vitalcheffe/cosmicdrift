'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar, Tag, Bolt, Cpu, Factory, Mountain, Droplets, Wheat, Shield, Zap } from 'lucide-react';
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

const tagIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Intelligence: Cpu,
  Energy: Bolt,
  Corporate: Zap,
  Cement: Factory,
  Technology: Shield,
  Mining: Mountain,
  Water: Droplets,
  Agri: Wheat,
};

const pressResources = [
  { title: 'Brand Guidelines', desc: 'Harch Corp brand assets, logos, and usage guidelines for media partners.' },
  { title: 'Executive Bios', desc: 'Leadership biographies, headshots, and public speaking topics.' },
  { title: 'Fact Sheet', desc: 'Key metrics, vertical summaries, and investment pipeline data.' },
  { title: 'Media Contact', desc: 'press@harchcorp.com — Response within 4 hours, 24/7.' },
];

export default function NewsroomPageClient() {
  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Newsroom</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Dispatches from<br/>the Front Line
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Announcements, deployments, and strategic updates from Harch Corp and its seven industrial verticals. No spin. No fluff. Just the facts that matter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLE — Full-width statement piece ═══ */}
      <section className="py-20 md:py-28 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6 text-[#06B6D4]">Featured</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href={`/newsroom/${featuredArticle.slug}`} className="group block">
              <div className="relative card p-8 md:p-12 lg:p-16 overflow-hidden">
                {/* Accent glow */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#06B6D4]" />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#06B6D4]">
                        {(() => { const Icon = tagIcons[featuredArticle.tag]; return Icon ? <Icon size={10} /> : null; })()}
                        {featuredArticle.tag}
                      </span>
                      <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]"><Calendar size={10} />{featuredArticle.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white tracking-tight mb-5 leading-[1.15] group-hover:text-[#CCCCCC] transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-[15px] text-[#999999] leading-[1.7] max-w-3xl mb-8">{featuredArticle.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] group-hover:text-white transition-colors">
                      Read Full Dispatch <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.12)] shrink-0">
                    <ArrowUpRight size={24} className="text-[#06B6D4] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ALL ARTICLES — Palantir-style vertical list ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">All Dispatches</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">News & Announcements</h2>
          </FadeIn>

          <div className="space-y-2">
            {regularArticles.map((article, i) => {
              const Icon = tagIcons[article.tag];
              return (
                <FadeIn key={article.slug} delay={i * 0.04}>
                  <Link href={`/newsroom/${article.slug}`} className="vertical-row group block p-6 md:p-8 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                          {Icon ? <Icon size={18} className="text-white" strokeWidth={1.5} /> : <Tag size={18} className="text-white" strokeWidth={1.5} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.1)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#06B6D4]">{article.tag}</span>
                            <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{article.date}</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#CCCCCC] transition-colors mt-1 leading-snug">{article.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 md:pt-7">
                        <p className="text-[14px] text-[#999999] leading-relaxed">{article.excerpt}</p>
                      </div>
                      <ArrowRight size={16} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all shrink-0 mt-2 md:mt-8" />
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRESS RESOURCES ═══ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Press</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">Media Kit</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressResources.map((resource, i) => (
              <FadeIn key={resource.title} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <Tag size={16} className="text-[rgba(6,182,212,0.4)] mb-3" strokeWidth={1.5} />
                  <h3 className="text-[14px] font-bold text-white mb-2">{resource.title}</h3>
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
