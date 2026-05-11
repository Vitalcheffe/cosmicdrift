'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin, Clock, Zap, Users, Heart, GraduationCap, Globe, TrendingUp, Building2 } from 'lucide-react';
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

const positions = [
  { title: 'Senior Data Center Engineer', department: 'Intelligence', location: 'Dakhla, Morocco', type: 'Full-time', level: 'Senior' },
  { title: 'AI/ML Infrastructure Lead', department: 'Technology', location: 'Casablanca, Morocco', type: 'Full-time', level: 'Lead' },
  { title: 'Renewable Energy Project Manager', department: 'Energy', location: 'Sahel Region', type: 'Full-time', level: 'Senior' },
  { title: 'Cement Plant Operations Director', department: 'Cement', location: 'Gambia', type: 'Full-time', level: 'Director' },
  { title: 'Mining Geologist', department: 'Mining', location: 'Mauritania', type: 'Full-time', level: 'Mid' },
  { title: 'Precision Agriculture Specialist', department: 'Agri', location: 'Senegal', type: 'Full-time', level: 'Mid' },
  { title: 'Water Desalination Engineer', department: 'Water', location: 'Morocco', type: 'Full-time', level: 'Senior' },
  { title: 'Cybersecurity Architect', department: 'Technology', location: 'Casablanca, Morocco', type: 'Full-time', level: 'Lead' },
  { title: 'Corporate Finance Analyst', department: 'Corporate', location: 'Casablanca, Morocco', type: 'Full-time', level: 'Mid' },
  { title: 'ESG & Sustainability Manager', department: 'Corporate', location: 'Casablanca, Morocco', type: 'Full-time', level: 'Senior' },
  { title: 'Construction Site Manager', department: 'Cement', location: 'Gambia', type: 'Full-time', level: 'Senior' },
  { title: 'Satellite Communications Engineer', department: 'Technology', location: 'Casablanca, Morocco', type: 'Full-time', level: 'Mid' },
];

const benefits = [
  { icon: TrendingUp, title: 'Competitive Compensation', desc: 'Market-leading salaries with performance bonuses and equity participation for senior roles.' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance, mental health support, and wellness programs for all employees.' },
  { icon: GraduationCap, title: 'Learning & Development', desc: 'Annual training budget, conference attendance, and mentorship from industry leaders.' },
  { icon: Globe, title: 'Global Mobility', desc: 'Opportunities to work across 5 countries and 7 verticals. Relocation support for international moves.' },
  { icon: Zap, title: 'Impact-Driven Work', desc: 'Every project directly contributes to Africa\'s industrial sovereignty. Purpose is built into the job.' },
  { icon: Building2, title: 'World-Class Facilities', desc: 'Modern offices, state-of-the-art equipment, and the best tools for every role.' },
];

export default function CareersPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Careers</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Build the Future<br />of Africa
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Building the impossible requires the best minds. Join the team engineering Africa&apos;s industrial backbone — 3,200+ positions across 7 verticals and 5 countries. Every role directly contributes to the continent&apos;s sovereignty.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why Harch */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Why Harch Corp</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Not Just a Job.<br />A Mission.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: '3,200+', label: 'Positions by 2028', desc: 'Direct employment across all verticals with aggressive growth trajectory.' },
              { value: '7', label: 'Industrial Verticals', desc: 'From AI compute to water security — diverse career paths under one roof.' },
              { value: '5', label: 'Countries', desc: 'Morocco, Gambia, Senegal, Mauritania, Mali — with expansion to 12+ by 2030.' },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div className="card p-8 h-full text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">{item.value}</p>
                  <div className="accent-line mx-auto mb-4" />
                  <p className="text-[14px] font-semibold text-white mb-2">{item.label}</p>
                  <p className="text-[13px] text-[#999999] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Open Positions</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Current Openings
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Join our team and help build Africa&apos;s industrial sovereignty.</p>
          </FadeIn>
          <div className="space-y-2">
            {positions.map((pos, i) => (
              <FadeIn key={pos.title} delay={i * 0.03}>
                <div className="vertical-row group flex flex-col md:flex-row md:items-center justify-between py-5 px-4 cursor-pointer">
                  <div className="flex-1 min-w-0 mb-2 md:mb-0">
                    <h3 className="text-[15px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors">{pos.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[11px] text-[#666666] font-semibold uppercase tracking-wide">{pos.department}</span>
                      <span className="text-[11px] text-[#666666] flex items-center gap-1"><MapPin size={10} />{pos.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">{pos.type}</span>
                    <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[10px] font-semibold text-[#999999] tracking-wide">{pos.level}</span>
                    <ArrowRight size={14} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Our Culture</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              How We Work
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Urgency with Precision', desc: 'The continent cannot wait. We move fast but never cut corners. Speed and quality are not trade-offs — they\'re requirements.' },
              { title: 'Sovereign Mindset', desc: 'We think like owners. Every decision is made with long-term sovereignty in mind, not short-term optimization. Africa first, always.' },
              { title: 'Cross-Vertical Collaboration', desc: 'Our 7 verticals are designed to reinforce each other. Engineers in Energy work with teams in Intelligence. Mining collaborates with Technology. The whole is greater than the sum.' },
              { title: 'Meritocratic Excellence', desc: 'The best idea wins, regardless of title or tenure. We hire the best, give them autonomy, and hold them to world-class standards.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Benefits</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              What We Offer
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.06}>
                <div className="card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-3">
                    <b.icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{b.title}</h4>
                  <p className="text-[12px] text-[#999999] leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Ready to Build?</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-4">Your next career move could reshape a continent. Join Harch Corp.</p>
            <p className="text-[13px] text-[#666666] font-[family-name:var(--font-space-mono)] mb-12">General applications: <a href="mailto:careers@harchcorp.com" className="text-[rgba(139,157,175,0.7)] hover:text-[#8B9DAF] transition-colors">careers@harchcorp.com</a></p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">Apply Now <ArrowRight size={14} /></Link>
              <Link href="/about" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">About Harch Corp</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
