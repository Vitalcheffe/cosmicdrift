'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cpu, Server, Zap, Globe, Shield, BarChart3 } from 'lucide-react';
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

const products = [
  {
    name: 'HarchOS',
    tag: 'Operating System',
    version: '/0.1',
    href: '/intelligence/harchos',
    desc: 'The OS that orchestrates the Harch Intelligence Distributed Mesh — 5 hubs, 1,798 GPUs, carbon-aware scheduling. SENSE, THINK, ACT architecture for sovereign AI compute.',
    icon: Cpu,
    color: '#8B9DAF',
  },
  {
    name: 'Hyperscale Data Centers',
    tag: 'Infrastructure',
    version: '/0.2',
    href: '/subsidiaries/intelligence',
    desc: '1,798 Carbon-Optimized GPUs across 5 hubs with carbon-aware scheduling, submarine cable connectivity, and sovereign security framework.',
    icon: Server,
    color: '#8B5CF6',
  },
  {
    name: 'Green GPU Cloud',
    tag: 'Cloud Services',
    version: '/0.3',
    href: '/subsidiaries/intelligence',
    desc: 'GPU-as-a-Service 100% powered by renewable energy. H100/A100 clusters with carbon-aware scheduling (~47 gCO2/kWh), sovereign data residency, and pricing from $1.40-$2.35/gpu-hr.',
    icon: Zap,
    color: '#10B981',
  },
];

export default function IntelligencePageClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Harch Intelligence /0.1</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Sovereign AI<br/>Infrastructure
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Harch Intelligence builds Africa&apos;s sovereign AI compute infrastructure — from the operating system to the data centers, from the GPU clusters to the submarine cables. Every layer owned, controlled, and operated from Africa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Products</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-12">
              The Intelligence Stack
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {products.map((product, i) => (
              <FadeIn key={product.name} delay={i * 0.08}>
                <Link href={product.href} className="vertical-row group block p-6 md:p-8 cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${product.color}12` }}>
                        <product.icon size={20} style={{ color: product.color }} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#CCCCCC] transition-colors">{product.name}</h3>
                          <span className="version-tag">{product.version}</span>
                        </div>
                        <p className="text-[12px] font-semibold" style={{ color: product.color }}>{product.tag}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-[#999999] leading-relaxed">{product.desc}</p>
                    </div>
                    <ArrowRight size={16} className="vertical-arrow text-[rgba(255,255,255,0.1)] group-hover:text-white transition-all shrink-0 mt-2" />
                  </div>
                </Link>
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
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Deploy Sovereign AI</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">The future of AI compute is sovereign, green, and distributed. HarchOS makes it operational.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/intelligence/harchos" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                Explore HarchOS <ArrowRight size={14} />
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
