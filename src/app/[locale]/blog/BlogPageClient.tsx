'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Calendar, Clock, Mail, Rss, PenLine, Search, Code2, Brain, Building2, Zap, Wheat, Cpu, Landmark, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { blogArticles } from '@/data/blog-articles';
import { seoArticles } from '@/data/seo-articles';

import { FadeIn } from '@/components/ui/motion';

type Category = 'All' | 'Engineering' | 'AI & ML' | 'Infrastructure' | 'Energy' | 'Agriculture' | 'Company' | 'Finance' | 'Industry' | 'Technology' | 'Mining';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  readTime: string;
  slug: string;
  featured?: boolean;
  image: string;
  imageAlt?: string;
}

export default function BlogPageClient() {
  const t = useTranslations('blog');

  const categories: Category[] = ['All', 'Engineering', 'AI & ML', 'Infrastructure', 'Energy', 'Agriculture', 'Industry', 'Mining', 'Technology', 'Finance', 'Company'];

  const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
    Engineering: Code2,
    'AI & ML': Brain,
    Infrastructure: Building2,
    Energy: Zap,
    Agriculture: Wheat,
    Industry: Building2,
    Mining: Landmark,
    Technology: Cpu,
    Company: Cpu,
    Finance: Landmark,
  };

  const allBlogData = [...blogArticles, ...seoArticles];

  // Derive blog posts from the centralized data source
  const blogPosts: BlogPost[] = allBlogData.map((a, i) => ({
    title: a.title,
    excerpt: a.excerpt,
    date: a.date,
    category: a.category as Category,
    readTime: a.readTime,
    slug: a.slug,
    featured: i === 0,
    image: a.image,
    imageAlt: a.imageAlt,
  }));

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featuredPost = blogPosts.find(p => p.featured);
  const gridPosts = filteredPosts.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('title')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              {t('heroTitle')}
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              {t('heroDescription')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="py-8 bg-[#121212] border-y border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED POST ═══ */}
      {featuredPost && activeCategory === 'All' && (
        <section className="py-20 md:py-28 bg-[#121212]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <FadeIn>
              <p className="section-label mb-6 text-[#8B9DAF]">{t('featured')}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href={`/blog/${featuredPost.slug}`} className="block relative card overflow-hidden group cursor-pointer">
                {/* Featured Image */}
                {featuredPost.image && (
                  <div className="relative w-full aspect-[21/9] overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 1400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />
                  </div>
                )}
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8B9DAF]" />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">
                          {(() => { const Icon = categoryIcons[featuredPost.category]; return Icon ? <Icon size={10} /> : null; })()}
                          {featuredPost.category}
                        </span>
                        <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]">
                          <Calendar size={10} />{featuredPost.date}
                        </span>
                        <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]">
                          <Clock size={10} />{featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white tracking-tight mb-5 leading-[1.15] group-hover:text-[#CCCCCC] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[15px] text-[#999999] leading-[1.7] max-w-3xl mb-8">{featuredPost.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] group-hover:text-white transition-colors">
                        {t('readArticle')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.12)] shrink-0">
                      <ArrowUpRight size={24} className="text-[#8B9DAF] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ BLOG POSTS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('allArticles')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">
              {activeCategory === 'All' ? t('latestPosts') : `${activeCategory}`}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => {
              const Icon = categoryIcons[post.category];
              return (
                <FadeIn key={post.slug} delay={i * 0.06}>
                  <Link href={`/blog/${post.slug}`} className="block card overflow-hidden h-full flex flex-col group cursor-pointer">
                    {/* Thumbnail */}
                    {post.image && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.1)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">
                          {Icon ? <Icon size={10} /> : null}
                          {post.category}
                        </span>
                        <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{post.readTime}</span>
                      </div>
                      <h3 className="text-[16px] md:text-[18px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors mb-3 leading-snug flex-1">
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-[#999999] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.04)]">
                        <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)] flex items-center gap-1">
                          <Calendar size={9} />{post.date}
                        </span>
                        <ArrowRight size={14} className="text-[rgba(255,255,255,0.15)] group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER SIGNUP ═══ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <Mail size={32} className="text-[#8B9DAF] mx-auto mb-6" strokeWidth={1.5} />
              <p className="section-label mb-4 text-[#8B9DAF]">{t('newsletter')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">{t('stayInTheLoop')}</h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                {t('newsletterDescription')}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              {subscribed ? (
                <div className="card p-6 text-center">
                  <p className="text-white font-semibold">{t('subscribed')}</p>
                  <p className="text-[13px] text-[#999999] mt-1">{t('subscribedMessage')}</p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="flex-1 px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] placeholder-[#666666] focus:outline-none focus:border-[rgba(139,157,175,0.3)] transition-colors font-[family-name:var(--font-space-mono)]"
                  />
                  <button
                    onClick={() => { if (email) setSubscribed(true); }}
                    className="px-6 py-3 rounded-lg bg-white text-black text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#CCCCCC] transition-colors shrink-0"
                  >
                    {t('subscribe')}
                  </button>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CTA: Write for Us / RSS ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <PenLine size={20} className="text-[#8B9DAF] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">{t('writeForUs')}</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  {t('writeForUsDescription')}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] group-hover:text-white transition-colors">
                  {t('submitAPitch')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <Rss size={20} className="text-[#8B9DAF] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">{t('rssFeed')}</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  {t('rssFeedDescription')}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] group-hover:text-white transition-colors">
                  {t('copyFeedUrl')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
