'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { FadeIn } from '@/components/ui/motion';

const executives = [
  {
    name: 'Amine Harch El Korane',
    title: 'Founder & CEO',
    bio: 'Visionary entrepreneur building Africa\'s sovereign industrial backbone. Founded Harch Corp with the thesis that the continent needs vertically integrated infrastructure — from AI compute to energy generation — owned and operated by Africans. Former McKinsey consultant and MIT graduate.',
    image: '/images/team/ceo.jpg',
    linkedin: '#',
  },
  {
    name: 'Fatima Zahra El Mansouri',
    title: 'Chief Operating Officer',
    bio: 'Operational architect who has scaled industrial operations across three continents. Former VP of Operations at OCP Group, where she managed a $2B portfolio spanning mining, chemicals, and logistics. Brings 18 years of execution discipline to Harch Corp\'s 7-vertical operation.',
    image: '/images/team/coo.jpg',
    linkedin: '#',
  },
  {
    name: 'Karim Benjelloun',
    title: 'Chief Technology Officer',
    bio: 'Systems architect and distributed computing expert. Previously led infrastructure engineering at Google Cloud, where he managed hyperscale data center deployments across EMEA. Holds 12 patents in GPU orchestration and sovereign computing architectures.',
    image: '/images/team/cto.jpg',
    linkedin: '#',
  },
  {
    name: 'Aisha Diop',
    title: 'Chief Financial Officer',
    bio: 'Investment strategist with deep expertise in African capital markets and development finance. Former Managing Director at the African Development Bank, where she structured $4B+ in infrastructure financing. CPA and Harvard Business School graduate.',
    image: '/images/team/cfo.jpg',
    linkedin: '#',
  },
  {
    name: 'Youssef Alaoui',
    title: 'VP, Harch Intelligence',
    bio: 'AI and data center pioneer who designed Harch Corp\'s Carbon-Aware GPU Cloud Strategy. Former head of AI infrastructure at a leading sovereign cloud provider. Led the deployment of HarchOS across 3 data center regions with 1,798 carbon-optimized GPUs under management.',
    image: '/images/team/vp-intelligence.jpg',
    linkedin: '#',
  },
  {
    name: 'Mariama Diallo',
    title: 'VP, Sustainability & ESG',
    bio: 'Environmental scientist and sustainability leader who ensures every Harch Corp vertical operates at the highest ESG standards. Former UN Environment Programme advisor for West Africa. Architected the company\'s 2GW+ Renewable Pipeline integration strategy and net-zero roadmap.',
    image: '/images/team/vp-sustainability.jpg',
    linkedin: '#',
  },
];

const advisors = [
  {
    name: 'Dr. Hassan Bennani',
    title: 'Senior Advisor, Energy & Infrastructure',
    affiliation: 'Former Minister of Energy, Kingdom of Morocco',
    bio: 'Three-decade career in African energy policy and infrastructure development. Advises Harch Corp on regulatory strategy and government partnerships across North and West Africa.',
  },
  {
    name: 'Sarah Okonkwo',
    title: 'Advisor, Technology & Innovation',
    affiliation: 'Partner, TLcom Capital',
    bio: 'Leading African venture capital investor with portfolio companies across 14 countries. Provides strategic guidance on technology investments and startup ecosystem development.',
  },
  {
    name: 'General (Ret.) Jean-Pierre Ndiaye',
    title: 'Advisor, Security & Sovereignty',
    affiliation: 'Former Chief of Staff, Senegalese Armed Forces',
    bio: 'Distinguished military career focused on cybersecurity and national sovereignty. Advises on sovereign infrastructure security, data residency compliance, and defense partnerships.',
  },
  {
    name: 'Prof. Amira El-Sayed',
    title: 'Advisor, AI Ethics & Research',
    affiliation: 'Director, African AI Institute',
    bio: 'Renowned AI researcher and ethics scholar. Ensures Harch Corp\'s AI systems align with African values, cultural contexts, and the continent\'s unique sovereignty requirements.',
  },
];

export default function LeadershipPageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Leadership</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              The Team Behind<br />the Mission
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Experienced operators, builders, and strategists united by one conviction: Africa must own its industrial infrastructure. Our leadership combines decades of execution across energy, technology, finance, and sovereignty.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Executive Team</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Leadership
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec, i) => (
              <FadeIn key={exec.name} delay={i * 0.06}>
                <div className="card p-8 h-full group">
                  <div className="relative w-20 h-20 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/[0.08] overflow-hidden mb-5">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover industrial-image"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exec.name}</h3>
                  <p className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-4">{exec.title}</p>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7] mb-5">{exec.bio}</p>
                  {/* LinkedIn link removed — no verified profiles exist yet */}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Advisors */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Advisory Board</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Strategic Advisors
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-16">
              Leaders from government, finance, defense, and academia who provide strategic counsel on Harch Corp&apos;s mission to build Africa&apos;s sovereign infrastructure.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisors.map((advisor, i) => (
              <FadeIn key={advisor.name} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-white/40" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
                      <p className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{advisor.title}</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-[#666666] uppercase tracking-wider mb-3">{advisor.affiliation}</p>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{advisor.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">
              Join Our Team
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              Building the impossible requires the best minds. If you share our conviction that Africa must own its infrastructure, we want to hear from you.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/careers" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                View Open Positions <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
