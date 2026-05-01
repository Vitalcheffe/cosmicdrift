'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Sovereignty',
    description: 'We build infrastructure that Africa owns, operates, and controls — ensuring self-reliance for generations.',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'We move with urgency. The continent cannot afford to wait. Every project is executed with precision and pace.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'World-class standards in every vertical. From engineering to governance, we accept nothing less than the best.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'We see what others don\'t — the infrastructure gaps that, when filled, unlock exponential growth for the continent.',
  },
];

const leadership = [
  {
    name: 'Amine Harch El Korane',
    title: 'Founder & CEO',
    image: '/images/team/ceo.jpg',
    bio: 'Serial entrepreneur with deep expertise in infrastructure finance and African industrial development. Founded Harch Corp to build the continent\'s sovereign industrial base.',
  },
  {
    name: 'Chief Technology Officer',
    title: 'CTO',
    image: '/images/team/cto.jpg',
    bio: 'Former senior engineer at a leading hyperscale cloud provider. Leads Harch\'s technology strategy across AI infrastructure and sovereign compute.',
  },
  {
    name: 'Chief Financial Officer',
    title: 'CFO',
    image: '/images/team/cfo.jpg',
    bio: 'Ex-investment banker with 15+ years in emerging market infrastructure finance. Oversees Harch Corp\'s $2.4B+ investment pipeline.',
  },
  {
    name: 'Strategic Advisor',
    title: 'Advisor',
    image: '/images/team/advisor.jpg',
    bio: 'Former government minister and international development leader. Provides strategic counsel on regulatory frameworks and sovereign partnerships.',
  },
];

export default function AboutPageClient() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">About Harch Corp</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#101820] tracking-tight mb-8">
            Building the<br />Infrastructure<br />Africa Needs
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-[#6B7280] leading-relaxed">
            Harch Corp S.A. is a Moroccan multi-sector industrial conglomerate founded in 2023 with a single mission: 
            to build the critical infrastructure that enables Africa&apos;s self-reliance — from AI data centers and 
            cement plants to renewable energy and water desalination.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="section-label mb-6">Our Story</p>
              <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                Africa has long been a continent of untapped potential — rich in resources, talent, and ambition, 
                yet held back by a fundamental infrastructure deficit. While the world debates Africa&apos;s future, 
                Harch Corp is building it.
              </p>
              <p className="text-base text-[#6B7280] leading-relaxed">
                Founded by Amine Harch El Korane in Casablanca, Harch Corp was created with a clear thesis: 
                Africa does not need aid, it needs infrastructure. It does not need charity, it needs 
                partnership on equal terms. Across seven verticals spanning AI, energy, mining, agriculture, 
                cement, technology, and water, we are constructing the industrial backbone of a self-sufficient continent.
              </p>
            </div>
            <div>
              <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                Our approach is vertically integrated — we own the entire value chain from raw materials to 
                finished infrastructure. This allows us to move faster, control quality, and ensure that the 
                economic value generated stays on the continent.
              </p>
              <p className="text-base text-[#6B7280] leading-relaxed">
                With a $2.4B+ investment pipeline spanning five countries, Harch Corp is not a speculative venture. 
                It is an industrial movement — one that is already breaking ground, creating jobs, and proving 
                that world-class infrastructure can be built by Africans, for Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="section-label mb-6">Mission</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#101820] tracking-tight mb-6">
                To build the critical infrastructure that enables Africa&apos;s industrial sovereignty.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed">
                Every project we undertake — from a 500MW data center to a regional cement plant — serves one purpose: 
                ensuring that Africa can produce, process, and power what it needs, on its own terms.
              </p>
            </div>
            <div>
              <p className="section-label mb-6">Vision</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#101820] tracking-tight mb-6">
                An Africa that is self-reliant, industrially sovereign, and globally competitive.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed">
                We envision a continent where critical infrastructure — energy, compute, materials, food, and water — 
                is owned and operated by Africans, serving African needs and fueling African innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Our Values</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16">
            {values.map((value) => (
              <div key={value.title}>
                <value.icon size={20} className="text-[#9CA3AF] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-medium text-[#101820] mb-3">{value.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-12">Leadership</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {leadership.map((person) => (
              <div key={person.name} className="group">
                <div className="relative w-full aspect-[3/4] mb-5 overflow-hidden rounded-sm bg-[#F7F7F8]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-base font-medium text-[#101820] mb-1">{person.name}</h3>
                <p className="text-xs tracking-[0.05em] text-[#9CA3AF] mb-3">{person.title}</p>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#101820] tracking-tight mb-6">
            Join the Mission
          </h2>
          <p className="max-w-xl mx-auto text-base text-[#9CA3AF] mb-10">
            Whether as an investor, partner, or team member — help us build the infrastructure 
            that Africa needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 bg-[#101820] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-[#1f2937] transition-colors"
            >
              Investor Relations
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 border border-[rgba(0,0,0,0.12)] text-[#101820] px-8 py-3.5 rounded-md text-sm font-medium hover:border-[rgba(0,0,0,0.25)] transition-colors"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
