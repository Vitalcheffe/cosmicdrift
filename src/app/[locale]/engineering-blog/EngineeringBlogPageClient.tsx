'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Calendar, Clock, Terminal, Server, Brain, Shield, GitBranch, Network, Rss, Users, Cpu, Code2, Layers, Lock, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/ui/motion';

type EngCategory = 'All' | 'Backend' | 'Infrastructure' | 'AI/ML' | 'DevOps' | 'Security';

interface EngPost {
  title: string;
  excerpt: string;
  date: string;
  category: EngCategory;
  readTime: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  featured?: boolean;
  image: string;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.15)] text-[#22C55E]',
  Intermediate: 'bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.15)] text-[#EAB308]',
  Advanced: 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.15)] text-[#EF4444]',
};

export default function EngineeringBlogPageClient() {
  const t = useTranslations('engineeringBlog');

  const engCategories: EngCategory[] = ['All', 'Backend', 'Infrastructure', 'AI/ML', 'DevOps', 'Security'];

  const catKeyMap: Record<string, string> = {
    'All': 'all',
    'Backend': 'backend',
    'Infrastructure': 'infrastructure',
    'AI/ML': 'aiMl',
    'DevOps': 'devOps',
    'Security': 'security',
  };

  const diffKeyMap: Record<string, string> = {
    'Beginner': 'beginner',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced',
  };

  const engCategoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
    Backend: Server,
    Infrastructure: Network,
    'AI/ML': Brain,
    DevOps: GitBranch,
    Security: Shield,
  };

  const engPosts: EngPost[] = [
    {
      title: t('posts.insideHarchos.title'),
      excerpt: t('posts.insideHarchos.excerpt'),
      date: t('posts.insideHarchos.date'),
      category: 'Infrastructure',
      readTime: t('posts.insideHarchos.readTime'),
      slug: 'inside-harchos-distributed-ai-operating-system',
      difficulty: 'Advanced',
      featured: true,
      image: '/images/intelligence/harchos-dashboard.png',
    },
    {
      title: t('posts.designingSenseLayer.title'),
      excerpt: t('posts.designingSenseLayer.excerpt'),
      date: t('posts.designingSenseLayer.date'),
      category: 'Backend',
      readTime: t('posts.designingSenseLayer.readTime'),
      slug: 'designing-sense-layer-real-time-ingestion',
      difficulty: 'Advanced',
      image: '/images/intelligence/harchos-ops-center.png',
    },
    {
      title: t('posts.gpuScheduling.title'),
      excerpt: t('posts.gpuScheduling.excerpt'),
      date: t('posts.gpuScheduling.date'),
      category: 'AI/ML',
      readTime: t('posts.gpuScheduling.readTime'),
      slug: 'gpu-scheduling-algorithm-throughput-fairness',
      difficulty: 'Advanced',
      image: '/images/intelligence/harchos-gpu-cluster.png',
    },
    {
      title: t('posts.zeroTrust.title'),
      excerpt: t('posts.zeroTrust.excerpt'),
      date: t('posts.zeroTrust.date'),
      category: 'Security',
      readTime: t('posts.zeroTrust.readTime'),
      slug: 'zero-trust-networking-multi-tenant-ai',
      difficulty: 'Intermediate',
      image: '/images/sections/tech-cyber.jpg',
    },
    {
      title: t('posts.terraformToProduction.title'),
      excerpt: t('posts.terraformToProduction.excerpt'),
      date: t('posts.terraformToProduction.date'),
      category: 'DevOps',
      readTime: t('posts.terraformToProduction.readTime'),
      slug: 'terraform-to-production-iac-journey',
      difficulty: 'Intermediate',
      image: '/images/intelligence/harchos-facility-night.png',
    },
    {
      title: t('posts.latencyOptimization.title'),
      excerpt: t('posts.latencyOptimization.excerpt'),
      date: t('posts.latencyOptimization.date'),
      category: 'Infrastructure',
      readTime: t('posts.latencyOptimization.readTime'),
      slug: 'latency-optimization-sub-12ms-inference-africa',
      difficulty: 'Advanced',
      image: '/images/sections/intelligence-cable.jpg',
    },
  ];

  const openSourceRepos = [
    { name: 'harchos-scheduler', desc: t('openSourceRepos.harchosScheduler.desc'), stars: '1,200', lang: 'Rust' },
    { name: 'sense-ingest', desc: t('openSourceRepos.senseIngest.desc'), stars: '890', lang: 'Rust' },
    { name: 'act-sdk', desc: t('openSourceRepos.actSdk.desc'), stars: '650', lang: 'TypeScript' },
  ];

  const [activeCategory, setActiveCategory] = useState<EngCategory>('All');

  const filteredPosts = activeCategory === 'All'
    ? engPosts
    : engPosts.filter(p => p.category === activeCategory);

  const featuredPost = engPosts.find(p => p.featured);
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
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                <Terminal size={14} className="text-[#8B9DAF]" />
                <span className="text-[11px] font-[family-name:var(--font-space-mono)] text-[#999999]">{t('articlesCount')}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                <Activity size={14} className="text-[#8B9DAF]" />
                <span className="text-[11px] font-[family-name:var(--font-space-mono)] text-[#999999]">{t('updatedWeekly')}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="py-8 bg-[#121212] border-y border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-2">
            {engCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                {t(`categories.${catKeyMap[cat]}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED TECHNICAL POST ═══ */}
      {featuredPost && activeCategory === 'All' && (
        <section className="py-20 md:py-28 bg-[#121212]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <FadeIn>
              <p className="section-label mb-6 text-[#8B9DAF]">{t('featuredTechnicalDeepDive')}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href={`/engineering-blog/${featuredPost.slug}`} className="block relative card overflow-hidden group cursor-pointer">
                {/* Featured Image */}
                {featuredPost.image && (
                  <div className="relative w-full aspect-[21/9] overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
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
                  {/* Code-style decorative element */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 hidden md:block">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[rgba(239,68,68,0.5)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[rgba(234,179,8,0.5)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[rgba(34,197,94,0.5)]" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(139,157,175,0.08)] border border-[rgba(139,157,175,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">
                          <Network size={10} />{t(`categories.${catKeyMap[featuredPost.category]}`)}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold tracking-[0.08em] uppercase ${difficultyColors[featuredPost.difficulty]}`}>
                          {t(`difficulties.${diffKeyMap[featuredPost.difficulty]}`)}
                        </span>
                        <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]">
                          <Calendar size={10} />{featuredPost.date}
                        </span>
                        <span className="text-[11px] text-[#666666] flex items-center gap-1 font-[family-name:var(--font-space-mono)]">
                          <Clock size={10} />{featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-white tracking-tight mb-5 leading-[1.15] group-hover:text-[#CCCCCC] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[15px] text-[#999999] leading-[1.7] max-w-3xl mb-8">{featuredPost.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] group-hover:text-white transition-colors">
                        {t('readTechnicalDeepDive')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.12)] shrink-0">
                      <Terminal size={24} className="text-[#8B9DAF] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ ENGINEERING POSTS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">{t('allTechnicalPosts')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">
              {activeCategory === 'All' ? t('engineeringArchive') : t(`categories.${catKeyMap[activeCategory]}`)}
            </h2>
          </FadeIn>

          <div className="space-y-2">
            {gridPosts.map((post, i) => {
              const Icon = engCategoryIcons[post.category];
              return (
                <FadeIn key={post.slug} delay={i * 0.04}>
                  <Link href={`/engineering-blog/${post.slug}`} className="block vertical-row group p-6 md:p-8 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      {/* Thumbnail */}
                      {post.image && (
                        <div className="relative w-full md:w-48 lg:w-56 shrink-0 aspect-video rounded-lg overflow-hidden border border-[rgba(255,255,255,0.06)]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 224px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(139,157,175,0.06)] border border-[rgba(139,157,175,0.1)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">{t(`categories.${catKeyMap[post.category]}`)}</span>
                          <span className={`inline-block px-2 py-0.5 rounded-md border text-[8px] font-bold tracking-[0.08em] uppercase ${difficultyColors[post.difficulty]}`}>{t(`difficulties.${diffKeyMap[post.difficulty]}`)}</span>
                          <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#CCCCCC] transition-colors mt-1 leading-snug">{post.title}</h3>
                        <p className="text-[14px] text-[#999999] leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
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

      {/* ═══ OPEN SOURCE CONTRIBUTIONS ═══ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">{t('openSource')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-6">{t('builtInTheOpen')}</h2>
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              {t('openSourceDescription')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openSourceRepos.map((repo, i) => (
              <FadeIn key={repo.name} delay={i * 0.08}>
                <Link href="/developers/open-source" className="block">
                  <div className="card p-6 h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <GitBranch size={14} className="text-[#8B9DAF]" strokeWidth={1.5} />
                        <span className="text-[12px] font-[family-name:var(--font-space-mono)] text-[#8B9DAF]">{repo.name}</span>
                      </div>
                      <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{repo.lang}</span>
                    </div>
                    <p className="text-[13px] text-[#999999] leading-relaxed mb-4">{repo.desc}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#666666]">
                      <span className="text-[#EAB308]">★</span>
                      <span className="font-[family-name:var(--font-space-mono)]">{repo.stars}</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <Link href="/developers/open-source" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] hover:text-white transition-colors">
                {t('viewAllOpenSourceProjects')} <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA: Join Engineering / RSS ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <Users size={20} className="text-[#8B9DAF] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">{t('joinEngineeringTeam')}</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  {t('joinEngineeringDescription')}
                </p>
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B9DAF] group-hover:text-white transition-colors">
                  {t('viewOpenRoles')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <Rss size={20} className="text-[#8B9DAF] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">{t('engineeringRssFeed')}</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  {t('engineeringRssFeedDescription')}
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
