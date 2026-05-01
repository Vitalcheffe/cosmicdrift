'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { MapPin, Building2, Clock, Mail, Zap, Globe, GraduationCap, Heart } from 'lucide-react';

const benefits = [
  { icon: Zap, title: 'Mission-Driven Work', description: 'Every project has direct impact on Africa\'s industrial sovereignty and economic future.' },
  { icon: Globe, title: 'Pan-African Scope', description: 'Work across Morocco, Gambia, and the Sahel region with opportunities for international exposure.' },
  { icon: GraduationCap, title: 'Continuous Learning', description: 'Sponsored education, certifications, and leadership development programs for all team members.' },
  { icon: Heart, title: 'Competitive Benefits', description: 'Comprehensive health coverage, housing assistance, and performance-based equity participation.' },
];

const jobs = [
  {
    title: 'Senior Data Center Engineer',
    department: 'Harch Intelligence',
    location: 'Dakhla, Morocco',
    type: 'Full-time',
    description: 'Lead the design and commissioning of Tier IV AI-ready data center infrastructure. 8+ years experience in hyperscale data center engineering, power systems, and cooling optimization.',
  },
  {
    title: 'Renewable Energy Project Manager',
    department: 'Harch Energy',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    description: 'Manage the development and execution of multi-hundred MW solar and wind projects. Experience with EPC contracts, grid connection, and African energy markets required.',
  },
  {
    title: 'Mining Operations Director',
    department: 'Harch Mining',
    location: 'West Africa',
    type: 'Full-time',
    description: 'Oversee mining operations across multiple concessions with focus on phosphate and cobalt extraction. 15+ years in mining operations with African experience preferred.',
  },
  {
    title: 'AI/ML Research Scientist',
    department: 'Harch Technology',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    description: 'Develop sovereign AI models and platforms for industrial applications. PhD in ML/AI with experience in large-scale model training and deployment.',
  },
  {
    title: 'Agricultural Technology Specialist',
    department: 'Harch Agri',
    location: 'Marrakech, Morocco',
    type: 'Full-time',
    description: 'Implement precision agriculture systems, drone-based monitoring, and IoT sensor networks across 50,000+ hectares. Experience with agritech and arid climate farming.',
  },
  {
    title: 'Water Systems Engineer',
    department: 'Harch Water',
    location: 'Dakhla, Morocco',
    type: 'Full-time',
    description: 'Design and optimize solar-powered desalination and water treatment systems. Background in membrane technology, zero liquid discharge, and renewable-powered water infrastructure.',
  },
  {
    title: 'Financial Analyst',
    department: 'Corporate Finance',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    description: 'Support investment analysis, financial modeling, and reporting for Harch Corp\'s $2.4B+ investment pipeline. CFA preferred with infrastructure finance experience.',
  },
  {
    title: 'ESG Compliance Officer',
    department: 'Corporate ESG',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    description: 'Develop and monitor ESG compliance frameworks across all Harch Corp operations. Experience with GRI standards, carbon accounting, and African regulatory environments.',
  },
];

export default function CareersPageClient() {
  return (
    <>
      <PageHero
        title="Join Harch Corp"
        subtitle="Build Africa's industrial future with us"
      />

      {/* Why Harch */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
                Why Harch Corp
              </h2>
              <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={index * 0.1}>
                <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow h-full text-center">
                  <benefit.icon className="w-8 h-8 text-harch-gold mx-auto mb-4" />
                  <h3 className="text-base font-semibold text-harch-text mb-2">{benefit.title}</h3>
                  <p className="text-sm text-harch-muted leading-relaxed">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 lg:py-32 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Open Positions
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 space-y-4">
            {jobs.map((job, index) => (
              <FadeIn key={job.title} delay={index * 0.06}>
                <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-harch-text">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-harch-muted">
                          <Building2 className="w-3 h-3" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-harch-muted">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-harch-muted">
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-harch-muted leading-relaxed">{job.description}</p>
                    </div>
                    <a
                      href={`mailto:careers@harchcorp.com?subject=Application: ${job.title}`}
                      className="shrink-0 inline-flex items-center gap-1 px-5 py-2.5 bg-harch-gold text-harch-dark text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
                    >
                      <Mail className="w-3 h-3" />
                      Apply
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="py-20 bg-[#05080F] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Don&apos;t See Your Role?
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-xl mx-auto">
              We are always looking for exceptional talent. Send us your resume and tell us how
              you can contribute to Africa&apos;s industrial transformation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="mailto:careers@harchcorp.com?subject=General Application"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
            >
              <Mail className="w-4 h-4" />
              Send Your Resume
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
