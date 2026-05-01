'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { AnimatedCounter, FadeIn } from '@/components/Animations';

const verticals = [
  { name: 'Harch Intelligence', tagline: '500MW AI Hyperscale Data Center', slug: 'intelligence', image: '/images/verticals/intelligence.jpg' },
  { name: 'Harch Ciment', tagline: '500,000 Tons/Year Production Capacity', slug: 'cement', image: '/images/verticals/cement.jpg' },
  { name: 'Harch Energy', tagline: '2GW+ Renewable Energy Portfolio', slug: 'energy', image: '/images/verticals/energy.jpg' },
  { name: 'Harch Technology', tagline: 'Sovereign Technology Solutions', slug: 'technology', image: '/images/verticals/technology.jpg' },
  { name: 'Harch Mining', tagline: 'Strategic Mineral Extraction', slug: 'mining', image: '/images/verticals/mining.jpg' },
  { name: 'Harch Agri', tagline: 'Climate-Resilient Agriculture at Scale', slug: 'agriculture', image: '/images/verticals/agriculture.jpg' },
  { name: 'Harch Water', tagline: 'Water Security for Africa', slug: 'water', image: '/images/verticals/water.jpg' },
];

const stats = [
  { value: 2.4, prefix: '$', suffix: 'B+', label: 'Investment Pipeline' },
  { value: 7, prefix: '', suffix: '', label: 'Verticals' },
  { value: 3200, prefix: '', suffix: '+', label: 'Jobs Created' },
  { value: 5, prefix: '', suffix: '', label: 'Countries' },
];

const milestones = [
  { year: '2023', title: 'Founded', description: 'Harch Corp established in Casablanca with a vision for African industrial sovereignty.' },
  { year: '2024', title: 'Intelligence Division Launch', description: 'Launch of Harch Intelligence, Africa\'s largest AI-ready data center project in Dakhla.' },
  { year: '2025', title: 'Energy & Mining Expansion', description: 'Major expansion into renewable energy and strategic mining operations across Morocco and West Africa.' },
  { year: '2026', title: 'Pan-African Scale', description: 'Operations spanning 5 countries, 7 verticals, and $2.4B+ in active investment pipeline.' },
];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Aerial view of industrial infrastructure"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#05080F]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080F]/50 via-transparent to-[#05080F]" />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-harch-text uppercase">
            HARCH <span className="gradient-text-gold">CORP</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl lg:text-2xl text-harch-muted tracking-wide max-w-2xl mx-auto"
        >
          Building Africa&apos;s Industrial Sovereignty
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/about"
            className="group flex items-center gap-2 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all duration-200"
          >
            Discover Our Vision
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/investors"
            className="flex items-center gap-2 px-8 py-3.5 border border-harch-gold/30 text-harch-gold text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:border-harch-gold/60 hover:bg-harch-gold/5 transition-all duration-200"
          >
            Investor Relations
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-harch-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function VerticalsSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#05080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
              Our Verticals
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {verticals.map((vertical, index) => (
            <FadeIn key={vertical.slug} delay={index * 0.08}>
              <Link href={`/subsidiaries/${vertical.slug}`} className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden border border-harch-border card-glow">
                  <Image
                    src={vertical.image}
                    alt={vertical.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080F] via-[#05080F]/50 to-transparent" />
                  <div className="absolute inset-0 bg-harch-gold/0 group-hover:bg-harch-gold/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-base font-semibold text-harch-text tracking-wide uppercase">
                      {vertical.name}
                    </h3>
                    <p className="mt-1 text-xs text-harch-muted">
                      {vertical.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#070B14] border-y border-harch-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-gold">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm text-harch-muted uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="py-20 lg:py-32 bg-[#05080F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
              Our Philosophy
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="space-y-6 text-center">
            <p className="text-lg text-harch-muted leading-relaxed">
              Africa does not need aid — it needs infrastructure. It does not need pity — it needs
              partnership on equal terms. At Harch Corp, we believe that true sovereignty begins
              with economic independence: the ability to build, power, feed, and secure a continent
              on its own terms.
            </p>
            <p className="text-lg text-harch-muted leading-relaxed">
              Our philosophy is rooted in self-reliance. Every vertical we operate — from the
              500MW AI data center in Dakhla to the solar-powered desalination plants along the
              Atlantic coast — is designed to reduce dependency on external systems and create
              lasting, sovereign capability for African nations.
            </p>
            <p className="text-lg text-harch-gold leading-relaxed font-medium">
              We are not building for the next quarter. We are building for the next century.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#070B14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
              Key Milestones
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
          </div>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-harch-border lg:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <FadeIn key={milestone.year} delay={index * 0.15}>
                <div className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-harch-gold rounded-full -translate-x-1.5 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <span className="text-sm font-bold text-harch-gold tracking-wider">{milestone.year}</span>
                    <h3 className="mt-1 text-xl font-semibold text-harch-text">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-harch-muted leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-[#05080F] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
            Join the Movement
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
          <p className="mt-6 text-lg text-harch-muted max-w-2xl mx-auto">
            Whether you are an investor seeking transformative returns, an engineer ready to
            build the future, or a partner looking to make an impact — Harch Corp is where
            Africa&apos;s industrial future takes shape.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="group flex items-center gap-2 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all duration-200"
            >
              View Careers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/investors"
              className="flex items-center gap-2 px-8 py-3.5 border border-harch-gold/30 text-harch-gold text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:border-harch-gold/60 hover:bg-harch-gold/5 transition-all duration-200"
            >
              Investor Relations
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <VerticalsSection />
      <StatsSection />
      <PhilosophySection />
      <TimelineSection />
      <CTASection />
    </>
  );
}
