'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollRevealSection from '@/components/ScrollRevealSection';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ThesisClient() {
  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══ HERO ═══ */}
      <section className="photo-section relative min-h-[70vh] flex items-end">
        <Image
          src="/images/hero-intelligence.jpg"
          alt="Africa's Path to Industrial Sovereignty"
          fill
          className="object-cover industrial-image"
          priority
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">Harch Corp Manifesto</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6">
              The Thesis: Africa&apos;s Path to Industrial Sovereignty
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
              Why the continent must stop exporting raw materials and start building its own industrial backbone — and how Harch Corp is making it happen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Scroll Reveal Sections */}
      <ScrollRevealSection
        imageSrc="/images/section-energy-1.jpg"
        imageAlt="Renewable energy"
        heading="The Extractive Model Has Failed"
        description="For over a century, Africa has been the world's quarry. The continent holds 30% of the planet's mineral reserves — including 80% of global cobalt, 50% of manganese, and vast deposits of phosphates, lithium, and rare earth elements essential to the energy transition. Yet Africa captures less than 5% of the value chain. This is not a market failure — it is a structural design flaw that the current global system has no incentive to fix."
        variant="diagonal-left"
      />

      <ScrollRevealSection
        imageSrc="/images/section-intelligence-1.jpg"
        imageAlt="AI infrastructure"
        heading="Sovereign Compute"
        description="The flagship of Harch Intelligence is a carbon-aware GPU cloud platform across Morocco — the largest sovereign AI compute infrastructure on African soil. Five hubs host 1,798 carbon-optimized GPUs with an average carbon intensity of ~47 gCO2/kWh, enabling African nations and enterprises to train and deploy AI models without routing data through foreign jurisdictions."
        variant="diagonal-right"
      />

      {/* ═══ ARTICLE BODY ═══ */}
      <article className="prose-article max-w-[800px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* ── Section 1: The Problem ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            The Extractive Model Has Failed Africa
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            For over a century, Africa has been the world&apos;s quarry. The continent holds 30% of the planet&apos;s mineral reserves — including 80% of global cobalt, 50% of manganese, and vast deposits of phosphates, lithium, and rare earth elements essential to the energy transition. Yet Africa captures less than 5% of the value chain. Raw materials are extracted, shipped overseas, processed into batteries and electronics, and sold back at 100x the original price. This is not a market failure — it is a structural design flaw that the current global system has no incentive to fix.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The same pattern repeats across every sector. Africa possesses 60% of the world&apos;s uncultivated arable land but imports $35 billion in food annually. The continent receives 40% of global solar radiation yet generates less than 2% of the world&apos;s solar electricity. Over 400 million Africans lack access to clean water despite sitting atop some of the planet&apos;s largest aquifer systems. The problem is never the absence of resources — it is the absence of industrial infrastructure to convert those resources into sovereign value.
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 2: The Sovereignty Gap ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            The Sovereignty Gap: Why Independence Requires Infrastructure
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Political independence without industrial independence is an illusion. When a nation cannot generate its own electricity, process its own minerals, grow its own food, or host its own data, it remains a colony in everything but name. Decisions about pricing, supply, and access are made in boardrooms thousands of miles away. National budgets are held hostage to commodity price fluctuations. Critical infrastructure is owned by foreign entities with different strategic priorities.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The emergence of AI has created a new dimension of dependency. Today, 95% of AI compute capacity is concentrated in the United States and China. When an African researcher trains a language model, the data often traverses submarine cables to GPU clusters in Virginia or Frankfurt. When an African fintech runs inference, it rents compute from AWS or Azure at prices set in Seattle. The continent that will have the largest workforce on Earth by 2050 — 1.2 billion people of working age — does not control the infrastructure of the 21st century&apos;s most important technology. This is the sovereignty gap, and it is widening every year.
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-energy-1.jpg" alt="Renewable energy infrastructure in Africa" fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 3: The Harch Model ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            The Harch Model: Vertically Integrated Sovereignty
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Harch Corp was founded on a single conviction: Africa does not need aid — it needs infrastructure. Not the infrastructure of the 20th century (ports and railways built to export raw materials), but the infrastructure of the 21st century: AI compute, renewable energy, sovereign technology, and vertically integrated industrial chains that capture value where the resources exist.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Our model is deliberately vertical. Each Harch subsidiary is designed to feed the others. Harch Energy generates zero-carbon electricity that powers Harch Intelligence&apos;s data centers. Harch Mining extracts strategic minerals that Harch Technology processes into components. Harch Water provides the desalination capacity that enables Harch Cement and Harch Agri to operate in water-stressed regions. This is not diversification for its own sake — it is an industrial ecosystem where each vertical strengthens the others, creating compounding efficiency and strategic resilience that standalone operators cannot match.
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 4: Intelligence ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            Sovereign Compute: Carbon-Aware GPU Cloud
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The flagship of Harch Intelligence is a carbon-aware GPU cloud platform across Morocco — the largest sovereign AI compute infrastructure on African soil. Five hubs were chosen with surgical precision: Ouarzazate (800 GPUs, 97.2% renewable), Dakhla (400 GPUs, 94.8% renewable), Benguerir (350 GPUs, 88.5% renewable), Tanger (200 GPUs, 82.1% renewable), and Casablanca (48 GPUs, latency-sensitive). Together they host 1,798 carbon-optimized GPUs with an average carbon intensity of ~47 gCO2/kWh, enabling African nations and enterprises to train and deploy AI models without routing data through foreign jurisdictions.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            This is not just a commercial project — it is a strategic asset. In the same way that submarine cables became critical national infrastructure in the 2000s, sovereign AI compute will define which nations control their digital destiny in the 2030s. Our 500MW Pipeline in Dakhla ensures that Africa has a seat at that table, with the compute capacity to match. Every large language model trained on Harch GPUs is a model that Africa controls. Every inference run on African soil is data that does not leave the continent. This is sovereignty by architecture, not by legislation.
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-intelligence-1.jpg" alt="AI data center infrastructure" fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 5: Energy ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            Energy Independence: 2GW+ Pipeline of Zero-Carbon Power
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Industrial sovereignty begins with energy sovereignty. Harch Energy is developing a 2GW+ Pipeline of renewable energy capacity across Morocco and the Sahel, combining solar photovoltaic, onshore wind, and green hydrogen production. This is not clean energy for its own sake — it is the power source that makes every other vertical economically viable. When your data center runs on electricity that costs $0.02/kWh instead of $0.08/kWh, your AI compute becomes the most competitive on the planet. When your cement plant runs on solar instead of diesel, your cost basis drops by 40% and your product becomes eligible for green building certifications across Europe.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The green hydrogen component is especially strategic. Europe will need to import 10 million tonnes of green hydrogen annually by 2030 to meet its decarbonization targets. Morocco — with its proximity to European markets via the existing gas pipeline network and its world-class solar irradiance — is geographically positioned to become the continent&apos;s primary supplier. Harch Energy intends to capture a meaningful share of this market, converting Moroccan sunlight into European energy currency and reinvesting the proceeds into continental infrastructure.
          </p>
        </FadeIn>

        <div className="my-12 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── Section 6: Mining & Value Chain ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            Capturing the Value Chain: From Extraction to Refinement
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The Democratic Republic of Congo produces 70% of the world&apos;s cobalt — the mineral that makes electric vehicle batteries possible. Yet the DRC captures roughly 3% of the cobalt value chain. The ore is mined in Kolwezi, shipped to refineries in China, processed into battery-grade cobalt sulfate, and sold to automakers in Detroit and Stuttgart at prices that generate margins the producing country never sees. This is the extractive model in its purest form: wealth leaves at the rate of container ships, poverty remains at the rate of artisanal mines.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Harch Mining exists to break this cycle. By building processing and refining capacity in-country — starting with phosphates in Morocco and expanding to cobalt and rare earths across the Sahel — we capture the margin that currently accrues to overseas processors. In-country processing does not just generate revenue; it creates skilled jobs, transfers technology, builds industrial ecosystems, and gives producing nations leverage in global commodity negotiations. When you can refine your own cobalt, you set your own price. That is the difference between a resource economy and an industrial one.
          </p>
        </FadeIn>

        {/* ── Section 7: Water & Agriculture ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            Water Security and Agricultural Sovereignty
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Water is the foundation upon which every other vertical depends. Without reliable water supply, cement plants cannot operate, data centers cannot cool, and farmland cannot produce. Yet 400 million Africans lack access to clean water, and climate change is accelerating desertification across the Sahel at a rate that threatens continental food security. Harch Water addresses this not as a charity project but as industrial infrastructure: 200 million cubic meters per year of desalination capacity, paired with AI-optimized distribution networks that minimize waste and maximize reach.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Harch Agri converts water security into food sovereignty. Across Africa, 60% of the world&apos;s uncultivated arable land sits idle — not because the soil is poor, but because the infrastructure to farm at scale does not exist. Precision agriculture changes the equation. IoT sensors monitor soil moisture in real time. Drone surveillance detects pest outbreaks before they spread. Vertical farming produces year-round crops with 95% less water than traditional agriculture. These are not futuristic concepts — they are deployed technologies that Harch Agri is bringing to African soil at industrial scale, turning untapped potential into food security and export revenue.
          </p>
        </FadeIn>

        {/* ── Image Break ── */}
        <FadeIn>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl my-12 image-reveal">
            <Image src="/images/section-agriculture-1.jpg" alt="Agricultural infrastructure in Africa" fill className="object-cover industrial-image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </FadeIn>

        {/* ── Section 8: The Path Forward ── */}
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-6">
            The Path Forward: From Vision to Infrastructure
          </h2>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            The thesis is simple: Africa cannot sovereign by declaration. It must be sovereign by construction — by building the infrastructure that makes independence not just aspirational but operational. This means AI compute facilities that keep African data on African soil. It means renewable energy plants that free African economies from fossil fuel imports. It means mineral processing that captures value at the source. It means water and food systems that make climate adaptation an engineering problem rather than an existential threat.
          </p>
          <p className="text-[15px] text-[#BBBBBB] leading-[1.8] mb-6">
            Harch Corp has committed $2.4 billion to this vision across 7 verticals and 5 countries. Our first data center module goes live in 2027. Our cement plant reaches full capacity in 2028. By 2030, we intend to be operating at continental scale — not as a foreign investor extracting returns, but as an African company building the industrial backbone that the continent has always deserved. The world is watching. The question is no longer whether Africa will industrialize, but whether it will industrialize on its own terms. Harch Corp exists to ensure that it does.
          </p>
        </FadeIn>

        <div className="my-16 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* ── CTA ── */}
        <FadeIn>
          <div className="card p-8 md:p-12 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-4">Join the Mission</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Build Africa&apos;s Industrial Sovereignty
            </h3>
            <p className="text-[14px] text-[#999999] leading-relaxed mb-8 max-w-lg mx-auto">
              Whether you&apos;re an investor seeking continental impact, a partner looking for strategic alignment, or an engineer ready to build — we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-md hover:bg-white/90 transition-colors"
              >
                Partner With Us <ArrowRight size={14} />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.2)] text-white/60 text-sm font-semibold rounded-md hover:text-white hover:border-white/40 transition-colors"
              >
                Join the Team <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>

      </article>
    </div>
  );
}
