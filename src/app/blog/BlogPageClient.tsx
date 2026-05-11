'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar, Clock, Mail, Rss, PenLine, Search, Code2, Brain, Building2, Zap, Wheat, Cpu } from 'lucide-react';
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

type Category = 'All' | 'Engineering' | 'AI & ML' | 'Infrastructure' | 'Energy' | 'Agriculture' | 'Company';

const categories: Category[] = ['All', 'Engineering', 'AI & ML', 'Infrastructure', 'Energy', 'Agriculture', 'Company'];

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Engineering: Code2,
  'AI & ML': Brain,
  Infrastructure: Building2,
  Energy: Zap,
  Agriculture: Wheat,
  Company: Cpu,
};

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  readTime: string;
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Why Sovereign AI Infrastructure Is the Most Important Infrastructure of the 21st Century',
    excerpt: 'Nations that cannot train and run their own AI models will be dependent on foreign infrastructure for the most transformative technology since electricity. We explain why sovereign compute is a matter of national security.',
    date: 'March 2026',
    category: 'Engineering',
    readTime: '14 min read',
    slug: 'sovereign-ai-infrastructure-21st-century',
    featured: true,
  },
  {
    title: 'Building HarchOS: Architecture Decisions Behind Africa\'s Sovereign Compute Platform',
    excerpt: 'From distributed scheduling to GPU-aware orchestration, we walk through the key technical choices that shaped HarchOS and why we rejected conventional cloud architectures.',
    date: 'March 2026',
    category: 'Engineering',
    readTime: '18 min read',
    slug: 'building-harchos-architecture-decisions',
  },
  {
    title: 'The Economics of Renewable-Powered Data Centers in North Africa',
    excerpt: 'Solar irradiance, wind corridors, and proximity to European fiber make North Africa uniquely positioned for green compute. We ran the numbers on a 200MW facility outside Tangier.',
    date: 'February 2026',
    category: 'Infrastructure',
    readTime: '12 min read',
    slug: 'economics-renewable-data-centers-north-africa',
  },
  {
    title: 'How We Achieved 23% Water Loss Reduction with AI-Optimized Distribution',
    excerpt: 'Using the SENSE layer to ingest real-time pressure and flow data from 12,000 sensors, our ACT system reduced non-revenue water in Casablanca by nearly a quarter in six months.',
    date: 'January 2026',
    category: 'AI & ML',
    readTime: '10 min read',
    slug: '23-percent-water-loss-reduction-ai',
  },
  {
    title: 'From Raw Ore to Refined Value: Our Model for African Mineral Processing',
    excerpt: 'Exporting raw minerals is a colonial-era extractive model. Harch Mining is building processing capacity that keeps value creation on the continent — and the economics are compelling.',
    date: 'January 2026',
    category: 'Company',
    readTime: '9 min read',
    slug: 'raw-ore-to-refined-value-african-mineral-processing',
  },
  {
    title: 'Training African Language Models: Challenges and Breakthroughs',
    excerpt: 'Most LLMs perform poorly on African languages. We discuss the data scarcity problem, our synthetic augmentation approach, and early results on Amazigh, Wolof, and Swahili benchmarks.',
    date: 'December 2025',
    category: 'AI & ML',
    readTime: '16 min read',
    slug: 'training-african-language-models-challenges-breakthroughs',
  },
  {
    title: 'The Green Hydrogen Play: Morocco\'s Strategic Position in the European Energy Transition',
    excerpt: 'With the EU targeting 10Mt of green hydrogen imports by 2030, Morocco\'s solar resources and geographic proximity make it the natural supplier. Here\'s our project pipeline.',
    date: 'November 2025',
    category: 'Energy',
    readTime: '11 min read',
    slug: 'green-hydrogen-morocco-european-energy-transition',
  },
  {
    title: 'Precision Agriculture at Scale: Lessons from 5,000 Hectares in Senegal',
    excerpt: 'IoT sensors, satellite imagery, and drone-based intervention across 5,000 hectares of millet and groundnut fields. Yields increased 31% while water usage dropped 18%.',
    date: 'October 2025',
    category: 'Agriculture',
    readTime: '13 min read',
    slug: 'precision-agriculture-scale-senegal-5000-hectares',
  },
];

export default function BlogPageClient() {
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
            <p className="section-label mb-4 text-[#C7923E]">Blog</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Engineering.<br/>Insights.<br/>Thought Leadership.
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Deep technical writing, strategic analysis, and operational learnings from the teams building Africa&apos;s sovereign industrial infrastructure. No marketing fluff — just signal.
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
              <p className="section-label mb-6 text-[#C7923E]">Featured</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative card p-8 md:p-12 lg:p-16 overflow-hidden group cursor-pointer">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#C7923E]" />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(199,146,62,0.08)] border border-[rgba(199,146,62,0.15)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#C7923E]">
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
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C7923E] group-hover:text-white transition-colors">
                      Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-[rgba(199,146,62,0.06)] border border-[rgba(199,146,62,0.12)] shrink-0">
                    <ArrowUpRight size={24} className="text-[#C7923E] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ BLOG POSTS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">All Articles</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-12">
              {activeCategory === 'All' ? 'Latest Posts' : `${activeCategory}`}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => {
              const Icon = categoryIcons[post.category];
              return (
                <FadeIn key={post.slug} delay={i * 0.06}>
                  <div className="card p-6 h-full flex flex-col group cursor-pointer">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[rgba(199,146,62,0.06)] border border-[rgba(199,146,62,0.1)] text-[9px] font-bold tracking-[0.12em] uppercase text-[#C7923E]">
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
              <Mail size={32} className="text-[#C7923E] mx-auto mb-6" strokeWidth={1.5} />
              <p className="section-label mb-4 text-[#C7923E]">Newsletter</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">Stay in the Loop</h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                Get engineering insights, product updates, and technical deep-dives delivered to your inbox. No spam. Unsubscribe anytime.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              {subscribed ? (
                <div className="card p-6 text-center">
                  <p className="text-white font-semibold">You&apos;re subscribed.</p>
                  <p className="text-[13px] text-[#999999] mt-1">Look for our next dispatch in your inbox.</p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] placeholder-[#666666] focus:outline-none focus:border-[rgba(199,146,62,0.3)] transition-colors font-[family-name:var(--font-space-mono)]"
                  />
                  <button
                    onClick={() => { if (email) setSubscribed(true); }}
                    className="px-6 py-3 rounded-lg bg-white text-black text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#CCCCCC] transition-colors shrink-0"
                  >
                    Subscribe
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
                <PenLine size={20} className="text-[#C7923E] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">Write for Us</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  Have a technical perspective on sovereign infrastructure, distributed systems, or African industrial development? We accept guest contributions from engineers, researchers, and operators.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C7923E] group-hover:text-white transition-colors">
                  Submit a Pitch <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-8 md:p-10 h-full group cursor-pointer">
                <Rss size={20} className="text-[#C7923E] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">RSS Feed</h3>
                <p className="text-[14px] text-[#999999] leading-relaxed mb-6">
                  Prefer a reader? Subscribe to our RSS feed and never miss a post. Full content, no tracking, no middleman — the way the web was meant to work.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C7923E] group-hover:text-white transition-colors">
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
