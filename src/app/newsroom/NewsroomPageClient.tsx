'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const articles = [
  {
    date: 'March 15, 2026',
    category: 'Press Release',
    title: 'Harch Corp Breaks Ground on Africa\'s Largest AI Data Center in Dakhla',
    excerpt: 'The 500MW hyperscale facility, powered entirely by renewable energy, will serve as the backbone of Africa\'s sovereign AI compute infrastructure.',
  },
  {
    date: 'February 28, 2026',
    category: 'Press Release',
    title: 'Harch Ciment Reaches 50% Construction Milestone in The Gambia',
    excerpt: 'The $200M cement plant in Banjul is on track for full operational capacity by Q3 2026, creating 1,200+ direct jobs.',
  },
  {
    date: 'January 10, 2026',
    category: 'Media Coverage',
    title: 'Financial Times: "The Moroccan Conglomerate Betting on Africa\'s Industrial Future"',
    excerpt: 'FT profiles Harch Corp\'s vertically integrated model and $2.4B investment pipeline across seven industrial verticals.',
  },
  {
    date: 'December 5, 2025',
    category: 'Press Release',
    title: 'Harch Energy Secures 500MW Solar PPA with Moroccan Government',
    excerpt: 'Long-term power purchase agreement marks the first phase of Harch Energy\'s 2GW+ renewable pipeline in Morocco.',
  },
  {
    date: 'November 18, 2025',
    category: 'Announcement',
    title: 'Harch Corp Opens Applications for 2026 Graduate Program',
    excerpt: 'The 18-month rotational program offers cross-vertical exposure across all seven subsidiaries in Morocco, Senegal, and The Gambia.',
  },
  {
    date: 'October 2, 2025',
    category: 'Media Coverage',
    title: 'Bloomberg: "Africa\'s Data Center Race Heats Up as Harch Corp Plans 500MW Facility"',
    excerpt: 'Bloomberg reports on the growing competition to build AI infrastructure on the African continent, with Harch Corp\'s Dakhla project leading the charge.',
  },
];

export default function NewsroomPageClient() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Newsroom</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-8">
            Latest News
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/50 leading-relaxed">
            Press releases, media coverage, and announcements from Harch Corp.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="space-y-0">
            {articles.map((article) => (
              <div
                key={article.title}
                className="py-8 border-b border-white/[0.06] group cursor-pointer hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={12} className="text-white/20" />
                  <span className="text-xs font-mono text-white/25">{article.date}</span>
                  <span className="text-xs tracking-[0.08em] uppercase text-white/25">· {article.category}</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-white/90 transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-2xl mb-3">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                  Read More <ArrowRight size={10} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <p className="section-label mb-6">Media Contact</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
                Press Inquiries
              </h2>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                For press inquiries, interview requests, and media kits, please contact our 
                communications team.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                <p>press@harchcorp.com</p>
                <p>+212 5 22 00 00 01</p>
              </div>
            </div>
            <div className="flex items-start md:items-end justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
