'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';

const benefits = [
  { title: 'Mission-Driven Work', description: 'Every project you work on directly contributes to Africa\'s industrial sovereignty. This isn\'t just a job — it\'s a movement.' },
  { title: 'World-Class Projects', description: '500MW data centers, 2GW renewable farms, continental-scale infrastructure. Work on projects that would be ambitious anywhere in the world.' },
  { title: 'Competitive Compensation', description: 'Market-leading salaries, equity participation, and comprehensive benefits including health, education, and relocation support.' },
  { title: 'Growth & Development', description: 'Cross-vertical exposure, international assignments, and leadership development programs. Grow as fast as the company grows.' },
];

const jobs = [
  {
    title: 'Senior Data Center Engineer',
    vertical: 'Harch Intelligence',
    location: 'Dakhla, Morocco',
    type: 'Full-time',
  },
  {
    title: 'Renewable Energy Project Manager',
    vertical: 'Harch Energy',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
  },
  {
    title: 'Mining Operations Director',
    vertical: 'Harch Mining',
    location: 'Rabat, Morocco',
    type: 'Full-time',
  },
  {
    title: 'AI/ML Research Scientist',
    vertical: 'Harch Technology',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
  },
  {
    title: 'Cement Plant Operations Manager',
    vertical: 'Harch Ciment',
    location: 'Banjul, The Gambia',
    type: 'Full-time',
  },
  {
    title: 'Agricultural Data Scientist',
    vertical: 'Harch Agri',
    location: 'Dakar, Senegal',
    type: 'Full-time',
  },
  {
    title: 'Water Infrastructure Engineer',
    vertical: 'Harch Water',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
  },
  {
    title: 'ESG & Sustainability Manager',
    vertical: 'Corporate',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
  },
];

export default function CareersPageClient() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Careers</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-8">
            Build Africa&apos;s<br/>Industrial Future
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/50 leading-relaxed">
            Harch Corp is assembling a world-class team of engineers, operators, and strategists 
            to build the infrastructure Africa needs. If you want your work to matter — this is where you belong.
          </p>
        </div>
      </section>

      {/* Why Harch */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Why Harch</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {benefits.map((benefit) => (
              <div key={benefit.title}>
                <h3 className="text-xl font-medium text-white mb-3">{benefit.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Open Positions</p>
          <div className="space-y-0">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/[0.06] gap-4 group"
              >
                <div>
                  <h3 className="text-base font-medium text-white group-hover:text-white/90 transition-colors mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-white/35">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} />
                      {job.vertical}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white border border-white/[0.1] hover:border-white/30 px-5 py-2 rounded-md transition-colors shrink-0 self-start md:self-center">
                  Apply
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
            Don&apos;t See Your Role?
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 mb-10">
            We&apos;re always looking for exceptional people. Submit a general application and tell us 
            how you can contribute to building Africa&apos;s industrial sovereignty.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
          >
            General Application
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
