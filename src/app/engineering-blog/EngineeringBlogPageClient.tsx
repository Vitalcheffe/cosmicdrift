'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar, Clock, Terminal, Server, Brain, Shield, GitBranch, Network, Rss, Users, Cpu, Code2, Layers, Lock, Zap, Activity } from 'lucide-react';
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

type EngCategory = 'All' | 'Backend' | 'Infrastructure' | 'AI/ML' | 'DevOps' | 'Security';

const engCategories: EngCategory[] = ['All', 'Backend', 'Infrastructure', 'AI/ML', 'DevOps', 'Security'];

const engCategoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Backend: Server,
  Infrastructure: Network,
  'AI/ML': Brain,
  DevOps: GitBranch,
  Security: Shield,
};

interface EngPost {
  title: string;
  excerpt: string;
  date: string;
  category: EngCategory;
  readTime: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  featured?: boolean;
}

const engPosts: EngPost[] = [
  {
    title: 'Inside HarchOS: How We Built a Distributed AI Operating System from Scratch',
    excerpt: 'A complete walkthrough of HarchOS internals — from the custom scheduler and GPU topology awareness to the SENSE/THINK/ACT pipeline that orchestrates 50,000 GPUs across three data centers. No off-the-shelf orchestrator could handle our requirements, so we built one.',
    date: 'March 2026',
    category: 'Infrastructure',
    readTime: '24 min read',
    slug: 'inside-harchos-distributed-ai-operating-system',
    difficulty: 'Advanced',
    featured: true,
  },
  {
    title: 'Designing the SENSE Layer: Real-Time Data Ingestion at 10M Events/Second',
    excerpt: 'How we built a Kafka-free ingestion pipeline using a custom Rust-based event router that handles 10M events/sec with p99 latency under 4ms. Includes our benchmarking methodology and failure mode analysis.',
    date: 'February 2026',
    category: 'Backend',
    readTime: '19 min read',
    slug: 'designing-sense-layer-real-time-ingestion',
    difficulty: 'Advanced',
  },
  {
    title: 'Our GPU Scheduling Algorithm: Balancing Throughput and Fairness Across 50,000 GPUs',
    excerpt: 'We rejected bin-packing and FIFO for a weighted fair queuing approach with topology-aware placement. This post covers the math, the trade-offs, and why latency-sensitive inference workloads changed everything.',
    date: 'January 2026',
    category: 'AI/ML',
    readTime: '16 min read',
    slug: 'gpu-scheduling-algorithm-throughput-fairness',
    difficulty: 'Advanced',
  },
  {
    title: 'Zero-Trust Networking in Multi-Tenant AI Infrastructure',
    excerpt: 'When every customer runs arbitrary CUDA kernels on shared hardware, network isolation is existential. We describe our SPIFFE-based identity layer, eBPF firewall, and runtime threat detection.',
    date: 'December 2025',
    category: 'Security',
    readTime: '14 min read',
    slug: 'zero-trust-networking-multi-tenant-ai',
    difficulty: 'Intermediate',
  },
  {
    title: 'From Terraform to Production: Our Infrastructure-as-Code Journey',
    excerpt: 'Managing 200+ resources across Morocco, Senegal, and Côte d\'Ivoire required more than Terraform modules. We built a custom provider, a drift detection system, and a deployment pipeline that validates before it applies.',
    date: 'November 2025',
    category: 'DevOps',
    readTime: '12 min read',
    slug: 'terraform-to-production-iac-journey',
    difficulty: 'Intermediate',
  },
  {
    title: 'Latency Optimization: How We Achieved Sub-12ms Inference for African Markets',
    excerpt: 'Most LLM inference benchmarks assume US-East to US-East. We optimized for Casablanca-to-Dakar, Tunis-to-Lagos, and achieved p95 inference under 12ms using speculative decoding, model quantization, and edge caching.',
    date: 'October 2025',
    category: 'Infrastructure',
    readTime: '15 min read',
    slug: 'latency-optimization-sub-12ms-inference-africa',
    difficulty: 'Advanced',
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.15)] text-[#22C55E]',
  Intermediate: 'bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.15)] text-[#EAB308]',
  Advanced: 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.15)] text-[#EF4444]',
};

export default function EngineeringBlogPageClient() {
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
            <p className="section-label mb-4 text-[#06B6D4]">Engineering Blog</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Build. Break.<br/>Document. Repeat.
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Technical deep-dives, architecture decision records, and engineering war stories from the teams building HarchOS, SENSE, and Africa&apos;s sovereign compute platform. Written by engineers, for engineers.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                <Terminal size={14} className="text-[#06B6D4]" />
                <span className="text-[11px] font-[family-name:var(--font-space-mono)] text-[#999999]">6 Articles</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                <Activity size={14} className="text-[#06B6D4]" />
                <span className="text-[11px] font-[family-name:var(--font-space-mono)] text-[#999999]">Updated Weekly</span>
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
                {cat}
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
              <p className="section-label mb-6 text-[#06B6D4]">Featured Technical Deep-Dive</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative card p-8 md:p-12 lg:p-16 overflow-hidden group cursor-pointer">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#06B6D4]" />
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#06B6D4]">
                        <Network size={10} />{featuredPost.category}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold tracking-[0.08em] uppercase ${difficultyColors[featuredPost.difficulty]}`}>
                        {featuredPost.difficulty}
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
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] group-hover:text-white transition-colors">
                      Read Technical Deep-Dive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.12)] shrink-0">
                    <Terminal size={24} className="text-[#06B6D4] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ ENGINEERING POSTS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">All Technical Posts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">
              {activeCategory === 'All' ? 'Engineering Archive' : activeCategory}
            </h2>
          </FadeIn>

          <div className="space-y-2">
            {gridPosts.map((post, i) => {
              const Icon = engCategoryIcons[post.category];
              return (
                <FadeIn key={post.slug} delay={i * 0.04}>
                  <div className="vertical-row group block p-6 md:p-8 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                          {Icon ? <Icon size={18} className="text-white" strokeWidth={1.5} /> : <Code2 size={18} className="text-white" strokeWidth={1.5} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.1)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#06B6D4]">{post.category}</span>
                            <span className={`inline-block px-2 py-0.5 rounded-md border text-[8px] font-bold tracking-[0.08em] uppercase ${difficultyColors[post.difficulty]}`}>{post.difficulty}</span>
                            <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{post.readTime}</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#CCCCCC] transition-colors mt-1 leading-snug">{post.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 md:pt-7">
                        <p className="text-[14px] text-[#999999] leading-relaxed line-clamp-2">{post.excerpt}</p>
                      </div>
                      <ArrowRight size={16} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all shrink-0 mt-2 md:mt-8" />
                    </div>
                  </div>
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
            <p className="section-label mb-4 text-[#06B6D4]">Open Source</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-6">Built in the Open</h2>
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              We believe sovereign infrastructure should be built transparently. Key components of HarchOS, our scheduling algorithms, and the SENSE ingestion layer are open source.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'harchos-scheduler', desc: 'GPU-aware scheduling algorithm with weighted fair queuing and topology-aware placement', stars: '1,200', lang: 'Rust' },
              { name: 'sense-ingest', desc: 'High-throughput event ingestion engine handling 10M events/sec with sub-4ms p99 latency', stars: '890', lang: 'Rust' },
              { name: 'act-sdk', desc: 'Client SDK for the ACT automation layer — control infrastructure from code', stars: '650', lang: 'TypeScript' },
            ].map((repo, i) => (
              <FadeIn key={repo.name} delay={i * 0.08}>
                <Link href="/developers/open-source" className="block">
                  <div className="card p-6 h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <GitBranch size={14} className="text-[#06B6D4]" strokeWidth={1.5} />
                        <span className="text-[12px] font-[family-name:var(--font-space-mono)] text-[#06B6D4]">{repo.name}</span>
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
              <Link href="/developers/open-source" className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors">
                View All Open Source Projects <ArrowRight size={14} />
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
                <Users size={20} className="text-[#06B6D4] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">Join the Engineering Team</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  We&apos;re hiring distributed systems engineers, ML infrastructure specialists, and security engineers across Casablanca, Dakar, and remote. Build systems that matter.
                </p>
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] group-hover:text-white transition-colors">
                  View Open Roles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <Rss size={20} className="text-[#06B6D4] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">Engineering RSS Feed</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  Subscribe to the engineering blog RSS feed. New posts, architecture decision records, and post-mortems — delivered straight to your reader.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] group-hover:text-white transition-colors">
                  Copy Feed URL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
