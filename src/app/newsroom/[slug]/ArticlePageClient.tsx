'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
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

export default function ArticlePageClient({ slug }: { slug: string }) {
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-[#999999] mb-8">The article you are looking for does not exist.</p>
          <Link href="/newsroom" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Newsroom
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <Link href="/newsroom" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#999999] hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Back to Newsroom
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[9px] font-bold tracking-[0.12em] uppercase text-white">{article.tag}</span>
              <span className="text-[11px] text-[#666666] flex items-center gap-1"><Calendar size={10} />{article.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-6">
              {article.title}
            </h1>
            <div className="accent-line mb-6" />
          </FadeIn>
        </div>
      </section>

      {/* Article Body */}
      <section className="pb-28 md:pb-36 bg-[#121212]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="prose-article text-[15px] text-[#CCCCCC] leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </FadeIn>

          {/* Keywords */}
          <FadeIn delay={0.1}>
            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] mb-3 font-[family-name:var(--font-space-mono)]">Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.seoKeywords.map((keyword) => (
                  <span key={keyword} className="inline-block px-3 py-1.5 rounded-md bg-[rgba(255,255,255,0.04)] text-[11px] font-medium text-[#999999] border border-[rgba(255,255,255,0.06)]">
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
                Back to Newsroom
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">More Articles</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-8">Continue Reading</h2>
          </FadeIn>
          <div className="space-y-4">
            {articles.filter(a => a.slug !== slug).slice(0, 3).map((a, i) => (
              <FadeIn key={a.slug} delay={i * 0.05}>
                <Link href={`/newsroom/${a.slug}`} className="block card p-6 hover:border-[rgba(255,255,255,0.12)] group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.06)] text-[8px] font-bold tracking-[0.12em] uppercase text-white">{a.tag}</span>
                    <span className="text-[10px] text-[#666666]">{a.date}</span>
                  </div>
                  <h3 className="text-[14px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors leading-snug">{a.title}</h3>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
