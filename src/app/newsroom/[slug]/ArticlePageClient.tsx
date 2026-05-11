'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Cpu, Bolt, Factory, Mountain, Droplets, Wheat, Shield, Zap, Tag } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { articles } from '@/data/articles';

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

export default function ArticlePageClient({ slug }: { slug: string }) {
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Dispatch Not Found</h1>
          <p className="text-[#999999] mb-8">The article you are looking for does not exist.</p>
          <Link href="/newsroom" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Newsroom
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tagIcons[article.tag] || Tag;

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <Link href="/newsroom" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#999999] hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dispatches
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(199,146,62,0.08)] border border-[rgba(199,146,62,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#C7923E]">
                <Icon size={10} />
                {article.tag}
              </span>
              <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]"><Calendar size={10} />{article.date}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-6">
              {article.title}
            </h1>
            <div className="accent-line mb-6" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[16px] text-[#CCCCCC] leading-[1.7] max-w-3xl">{article.excerpt}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="h-px bg-white/[0.04]" />
      </div>

      {/* ═══ ARTICLE BODY ═══ */}
      <section className="py-16 md:py-24 bg-[#121212]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="prose-article text-[15px] text-[#CCCCCC] leading-[1.9]"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </FadeIn>

          {/* Keywords */}
          <FadeIn delay={0.1}>
            <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] mb-3 font-[family-name:var(--font-space-mono)]">Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.seoKeywords.map((keyword) => (
                  <span key={keyword} className="inline-block px-3 py-1.5 rounded-md bg-[rgba(199,146,62,0.04)] border border-[rgba(199,146,62,0.08)] text-[11px] font-medium text-[#C7923E]">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Back Link */}
          <FadeIn delay={0.15}>
            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              <Link href="/newsroom" className="inline-flex items-center gap-2 text-sm font-semibold text-[#999999] hover:text-white transition-colors group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Dispatches
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MORE ARTICLES ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#C7923E]">More Dispatches</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-8">Continue Reading</h2>
          </FadeIn>
          <div className="space-y-2">
            {articles.filter(a => a.slug !== slug).slice(0, 3).map((a, i) => {
              const AIcon = tagIcons[a.tag] || Tag;
              return (
                <FadeIn key={a.slug} delay={i * 0.05}>
                  <Link href={`/newsroom/${a.slug}`} className="vertical-row group block p-6 hover:border-[rgba(255,255,255,0.12)]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[rgba(199,146,62,0.06)] border border-[rgba(199,146,62,0.1)] text-[8px] font-bold tracking-[0.12em] uppercase text-[#C7923E]">
                        <AIcon size={8} />
                        {a.tag}
                      </span>
                      <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{a.date}</span>
                    </div>
                    <h3 className="text-[14px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors leading-snug">{a.title}</h3>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
