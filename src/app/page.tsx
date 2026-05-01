'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';

const offerings = [
  { name: 'Harch Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', href: '/subsidiaries/water' },
];

const impactSectors = [
  { name: 'AI & Data Infrastructure', href: '/subsidiaries/intelligence' },
  { name: 'Construction & Materials', href: '/subsidiaries/cement' },
  { name: 'Renewable Energy', href: '/subsidiaries/energy' },
  { name: 'Sovereign Technology', href: '/subsidiaries/technology' },
  { name: 'Mining & Critical Minerals', href: '/subsidiaries/mining' },
  { name: 'Climate-Resilient Agriculture', href: '/subsidiaries/agriculture' },
  { name: 'Water Security', href: '/subsidiaries/water' },
];

export default function HomePage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Harch Corp Infrastructure"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="section-label mb-6 animate-fade-in-up">
            Building Africa&apos;s Industrial Sovereignty
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-semibold text-white leading-[1.1] tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Infrastructure for<br />the Next Century
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/50 leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From 500MW AI data centers to 2GW renewable energy — Harch Corp builds the critical infrastructure that enables Africa&apos;s self-reliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/[0.2] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:border-white/40 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Scroll to Explore</span>
          <ChevronDown size={16} className="text-white/30 animate-bounce-slow" />
        </div>
      </section>

      {/* Section 2: Offerings - Two Column Layout */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Left Column - Offerings */}
            <div>
              <p className="section-label mb-10">Offerings</p>
              <nav className="space-y-5">
                {offerings.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link block text-xl md:text-2xl font-light text-white/60"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Vertical Divider - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" style={{ position: 'relative', left: '0', top: '0' }} />

            {/* Right Column - Impact Sectors */}
            <div>
              <p className="section-label mb-10">Impact Sectors</p>
              <nav className="space-y-5">
                {impactSectors.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link block text-xl md:text-2xl font-light text-white/60"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* View All Link */}
          <div className="mt-16 flex justify-end">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="divider" />
      </div>

      {/* Section 3: Stats Bar */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '$2.4B+', label: 'Investment Pipeline' },
              { value: '7', label: 'Verticals' },
              { value: '3,200+', label: 'Jobs Created' },
              { value: '5', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs tracking-[0.1em] uppercase text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="divider" />
      </div>

      {/* Section 4: Featured Impact Study */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-8">Impact Study // Harch Intelligence</p>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-10 overflow-hidden rounded-sm">
            <Image
              src="/images/verticals/intelligence.jpg"
              alt="Harch Intelligence AI Data Center"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Africa&apos;s Largest AI Hyperscale Data Center
          </h2>
          <p className="max-w-2xl text-base text-white/50 leading-relaxed mb-8">
            Harch Intelligence is building a 500MW AI-ready hyperscale data center in Dakhla, Morocco — 
            powered entirely by renewable energy and designed to serve as the backbone of Africa&apos;s 
            sovereign AI compute infrastructure. The facility will host next-generation GPU clusters, 
            supporting large language model training and inference at continental scale.
          </p>
          <Link
            href="/subsidiaries/intelligence"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            Read More
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="divider" />
      </div>

      {/* Section 5: Second Impact Study */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-8">Impact Study // Harch Energy</p>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-10 overflow-hidden rounded-sm">
            <Image
              src="/images/verticals/energy.jpg"
              alt="Harch Energy Renewable Infrastructure"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            2GW+ of Renewable Energy Pipeline
          </h2>
          <p className="max-w-2xl text-base text-white/50 leading-relaxed mb-8">
            Harch Energy is developing over 2 gigawatts of renewable energy capacity across Morocco and 
            the Sahel region — combining solar, wind, and green hydrogen production to power industrial 
            operations and data centers with zero-carbon electricity. Our integrated approach ensures 
            energy sovereignty for the continent.
          </p>
          <Link
            href="/subsidiaries/energy"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            Read More
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="divider" />
      </div>

      {/* Section 6: Quote / Testimonial */}
      <section className="py-24 md:py-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="divider mb-12" />
          <span className="text-6xl md:text-8xl text-white/[0.06] leading-none font-serif">&ldquo;</span>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed -mt-6 mb-8">
            Africa doesn&apos;t need aid — it needs infrastructure. It doesn&apos;t need pity — it needs partnership on equal terms.
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-white/[0.15]" />
            <div>
              <p className="text-sm text-white/80 font-medium">Amine Harch El Korane</p>
              <p className="text-xs text-white/40 mt-0.5">Founder & CEO, Harch Corp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA Section */}
      <section className="py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Ready to Build the Future?
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 mb-10">
            Join the consortium building Africa&apos;s industrial sovereignty. From investment to partnership, 
            the next century starts now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3.5 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/[0.2] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:border-white/40 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
