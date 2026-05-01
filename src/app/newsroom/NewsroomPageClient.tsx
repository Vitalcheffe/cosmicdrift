'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Calendar, Tag, Mail, Phone } from 'lucide-react';

const articles = [
  {
    date: 'February 2026',
    category: 'Intelligence',
    title: 'Harch Corp Announces 500MW AI Data Center in Dakhla',
    summary: 'Harch Corp unveils Africa\'s largest AI-ready hyperscale data center campus in the Dakhla corridor, powered entirely by renewable energy. The $1.2B facility will serve sovereign AI compute needs across the continent and provide sub-100ms connectivity to European markets.',
  },
  {
    date: 'January 2026',
    category: 'Energy',
    title: 'Harch Energy Secures 2GW Solar-Wind Pipeline',
    summary: 'Harch Energy confirms development rights for a 2GW+ renewable energy portfolio spanning solar, wind, and hybrid installations across Morocco and the Sahel region. The pipeline will power Harch Corp\'s industrial operations and contribute to regional grid stability.',
  },
  {
    date: 'December 2025',
    category: 'Partnership',
    title: 'Strategic Partnership with National Mining Office',
    summary: 'Harch Mining signs strategic partnership agreement with Morocco\'s National Mining Office for the exploration and sustainable extraction of phosphate and cobalt reserves. The partnership includes technology transfer commitments and local community development programs.',
  },
  {
    date: 'November 2025',
    category: 'Cement',
    title: 'Harch Ciment: Building Gambia\'s Industrial Future',
    summary: 'Harch Ciment breaks ground on a state-of-the-art 500kT/year cement manufacturing facility in Gambia, addressing West Africa\'s critical infrastructure deficit. The project includes an integrated quarry and sustainable production processes.',
  },
  {
    date: 'October 2025',
    category: 'Corporate',
    title: 'Harch Corp Raises $2.4B for African Industrial Sovereignty',
    summary: 'Harch Corp announces the closing of a $2.4B+ investment round to fund its seven-vertical industrial conglomerate. The investment pipeline spans AI infrastructure, renewable energy, cement manufacturing, mining, agriculture, water treatment, and sovereign technology.',
  },
  {
    date: 'September 2025',
    category: 'Recognition',
    title: 'Amine Harch El Korane Named in Africa\'s Top 50 Industrial Leaders',
    summary: 'Harch Corp Founder & CEO Amine Harch El Korane is recognized among Africa\'s Top 50 Industrial Leaders for 2025, cited for his vision of integrated industrial sovereignty and the transformative scale of Harch Corp\'s investment pipeline.',
  },
];

export default function NewsroomPageClient() {
  return (
    <>
      <PageHero
        title="Newsroom"
        subtitle="Latest news and press releases"
      />

      {/* Articles */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {articles.map((article, index) => (
              <FadeIn key={article.title} delay={index * 0.08}>
                <article className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs text-harch-muted">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-harch-gold uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-harch-text hover:text-harch-gold transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-harch-muted leading-relaxed">{article.summary}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Media Contact
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 p-6 rounded-xl border border-harch-border bg-[#0A0E18]">
              <p className="text-harch-text font-semibold">Communications Department</p>
              <p className="mt-2 text-sm text-harch-muted">Harch Corp S.A.</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <a href="mailto:press@harchcorp.com" className="flex items-center gap-2 text-sm text-harch-gold hover:text-harch-gold/80 transition-colors">
                  <Mail className="w-4 h-4" />
                  press@harchcorp.com
                </a>
                <span className="flex items-center gap-2 text-sm text-harch-muted">
                  <Phone className="w-4 h-4" />
                  +212 5 22 00 00 00
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
