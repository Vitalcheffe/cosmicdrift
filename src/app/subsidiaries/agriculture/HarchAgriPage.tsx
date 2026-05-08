'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Cpu, Zap, Globe, Shield, BarChart3, Wheat, Droplets } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const HeroScene = dynamic(() => import('@/components/harchagri/HeroScene'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/harchagri/ParticleField'), { ssr: false });
const AfricaMap = dynamic(() => import('@/components/harchagri/AfricaMap'), { ssr: false });
const IoTDashboard = dynamic(() => import('@/components/harchagri/IoTDashboard'), { ssr: false });
const ProductCards = dynamic(() => import('@/components/harchagri/ProductCards'), { ssr: false });
const CompetitorComparison = dynamic(() => import('@/components/harchagri/CompetitorComparison'), { ssr: false });
const PartnershipsSection = dynamic(() => import('@/components/harchagri/PartnershipsSection'), { ssr: false });

/* ─── FADE IN — Palantir standard animation ─── */
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

/* ─── ANIMATED COUNTER — Palantir stat counter ─── */
function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  const format = () => {
    if (target >= 1000) return `${prefix}${Math.round(count).toLocaleString()}${suffix}`;
    if (target < 10) return `${prefix}${count.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(count)}${suffix}`;
  };
  return <span ref={ref}>{format()}</span>;
}

/* ─── FULL-BLEED IMAGE BREAK (Palantir style) ─── */
function FullBleedImage({ src, alt, height = '50vh' }: { src: string; alt: string; height?: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <Image src={src} alt={alt} fill className="object-cover industrial-image" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
    </div>
  );
}

/* ─── SPLIT SECTION (Palantir: text + image) ─── */
function SplitSection({ children, imageSrc, imageAlt, reverse = false }: { children: React.ReactNode; imageSrc: string; imageAlt: string; reverse?: boolean }) {
  return (
    <section className="bg-[#1A1A1A]">
      <div className="max-w-[1800px] mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] ${reverse ? 'lg:dir-rtl' : ''}`}>
          <div className={`flex items-center px-8 md:px-16 lg:px-24 py-20 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className={`max-w-xl ${reverse ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'}`}>
              {children}
            </div>
          </div>
          <div className={`relative min-h-[40vh] lg:min-h-0 overflow-hidden ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover industrial-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STAT BAR (Palantir style) ─── */
function StatBar({ stat, value, max }: { stat: string; value: number; max: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-[12px] text-[#999999]">{stat}</span>
        <span className="text-[12px] font-bold text-white">{value}%</span>
      </div>
      <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
        <div className="h-full bg-white/60 rounded-full transition-all duration-[2s] ease-out" style={{ width: isInView ? `${(value / max) * 100}%` : '0%' }} />
      </div>
    </div>
  );
}

/* ─── AGRICULTURE DATA (from SubsidiaryPageClient) ─── */
const agriData = {
  name: 'Harch Agri',
  version: '/0.6',
  heroTitle: "Precision Agriculture\nfor Africa",
  heroSubtitle: 'IoT, drones, vertical farms, and carbon credits — 5 countries, 11,800+ sensors, 25,000+ hectares of data-driven agriculture',
  heroImage: '/images/sections/comp-agri-aerial.jpg',
  sectionImage1: '/images/sections/comp-agri-green.jpg',
  sectionImage2: '/images/sections/agri-drone.jpg',
  sectionImage3: '/images/sections/agri-vertical-farm.jpg',
  sectionImage4: '/images/sections/agri-drone-field.jpg',
  overview: 'Harch Agri deploys precision farming, IoT sensors, and vertical farming technology across Africa\'s 60% of the world\'s uncultivated arable land. Our approach combines cutting-edge technology with deep local knowledge to convert untapped potential into food security and export revenue. This is not traditional agriculture — it is data-driven, technology-enabled food production at continental scale, designed to feed Africa\'s growing population and supply global markets with premium produce.',
  strategicContext: 'Africa holds 60% of the world\'s uncultivated arable land — approximately 600 million hectares — yet the continent remains a net food importer, spending $35 billion annually on food imports. This paradox results from low yields (African cereal yields average 1.5 tonnes/hectare versus 4 tonnes/hectare globally), limited irrigation (only 6% of cultivated land is irrigated versus 37% globally), and post-harvest losses exceeding 30%. Harch Agri addresses each of these constraints with technology-driven solutions that multiply yields while reducing resource consumption.',
  marketAnalysis: 'Africa\'s agriculture and food market is valued at $280 billion and growing at 6% CAGR. The addressable opportunity includes $35 billion in current food import substitution, $50 billion in export potential for high-value crops, and $20 billion in agricultural technology services. Precision agriculture alone represents a $5 billion opportunity in Africa by 2028, growing at 25% CAGR. The Senegal River Valley, Harch Agri\'s initial deployment zone, offers ideal conditions with year-round growing seasons, reliable water access, and proximity to European export markets.',
  sustainability: 'Sustainability is foundational to Harch Agri\'s business model. Our precision irrigation systems reduce water usage by 60% versus traditional flood irrigation while increasing yields by 30%. Drone-enabled precision spraying reduces chemical usage by 90% compared to conventional methods. Vertical farming operations use 95% less water and 99% less land than field agriculture. All energy for irrigation, processing, and cold chain is supplied by Harch Energy\'s renewable infrastructure. We practice regenerative soil management, building soil carbon and fertility rather than depleting it, and allocate 10% of farmland for biodiversity corridors.',
  investment: '$150M',
  metrics: [
    { value: 35, prefix: '$', suffix: 'B', label: 'Market Access' },
    { value: 60, prefix: '', suffix: '%', label: 'Uncultivated Land' },
    { value: 5, prefix: '', suffix: 'K ha', label: 'Active Trials' },
    { value: 150, prefix: '$', suffix: 'M', label: 'Investment' },
  ],
  capabilities: [
    { icon: Cpu, title: 'Precision Farming Platform', desc: 'IoT sensor networks and AI-optimized crop management across thousands of hectares. Real-time monitoring of soil health, moisture levels, nutrient status, and crop growth enables precision application of water, fertilizer, and crop protection — reducing inputs by 40% while increasing yields by 30%.' },
    { icon: Globe, title: 'Autonomous Drone Fleet', desc: 'Autonomous drone fleets for crop surveillance, pest detection, and precision spraying. Our 50+ drone fleet covers 5,000 hectares daily with multispectral imaging for early disease detection and targeted intervention. Drone spraying is 10x faster than traditional methods with 90% less chemical usage.' },
    { icon: Wheat, title: 'Vertical Farming Facilities', desc: 'Indoor vertical farming facilities for high-value crops including herbs, leafy greens, and pharmaceutical plants. 95% less water, 10x yield per square meter, year-round production independent of weather or season. Our first 3 facilities target European export markets with premium organic produce.' },
    { icon: Shield, title: 'Farm-to-Market Supply Chain', desc: 'Integrated supply chain infrastructure from farm gate to export market. Cold chain logistics, processing facilities, and export networks ensure maximum value capture. Our post-harvest loss rate is below 5% versus the African average of 30%+.' },
    { icon: Droplets, title: 'AI-Optimized Irrigation', desc: 'Smart irrigation systems reducing water usage by 60% while increasing yields by 30%. Powered by Harch Water desalination infrastructure and solar-powered pumps from Harch Energy. Soil moisture sensors and weather forecasting enable predictive irrigation scheduling.' },
    { icon: BarChart3, title: 'Market Intelligence Platform', desc: 'AI-powered commodity pricing and demand forecasting enabling farmers to time sales for maximum revenue and plan crops for optimal market conditions. Real-time market data from 15 African and European commodity exchanges with predictive analytics for price trends.' },
  ],
  specTable: [
    { spec: 'Trial Area', value: '5,000 ha', phase: 'Senegal River Valley' },
    { spec: 'IoT Sensors', value: '10,000+', phase: 'Soil + weather + crop' },
    { spec: 'Drone Fleet', value: '50+ units', phase: 'Autonomous operations' },
    { spec: 'Vertical Farms', value: '3 Facilities', phase: 'Under development' },
    { spec: 'Water Reduction', value: '60%', phase: 'vs. traditional irrigation' },
    { spec: 'Yield Increase', value: '30%', phase: 'vs. traditional farming' },
    { spec: 'Chemical Reduction', value: '90%', phase: 'Drone precision spraying' },
    { spec: 'Export Crops', value: '12 Types', phase: 'High-value organic' },
    { spec: 'Post-Harvest Loss', value: '<5%', phase: 'vs. 30% African average' },
    { spec: 'Energy Source', value: '100% Renewable', phase: 'Harch Energy supply' },
  ],
  milestones: [
    { year: '2025 Q2', title: 'Precision Farming Trial Launch', desc: '5,000-hectare precision farming trial launched in Senegal River Valley. IoT sensor deployment and baseline data collection initiated.' },
    { year: '2026 Q1', title: 'IoT Network Fully Deployed', desc: '10,000+ IoT sensors deployed across trial farms. Data pipeline and AI analytics platform operational with first crop management recommendations.' },
    { year: '2026 Q4', title: 'First Harvest Results', desc: 'First precision farming harvest demonstrates 25% yield improvement and 50% water savings versus control plots. Investor and partner confidence validated.' },
    { year: '2027 Q2', title: 'Drone Fleet Operational', desc: 'Autonomous drone fleet operational for crop monitoring and precision spraying. Aerial survey coverage of 5,000 hectares every 48 hours.' },
    { year: '2028 Q1', title: 'Vertical Farm Commissioning', desc: 'First vertical farming facility commissioned and producing. European export contracts for premium organic produce signed.' },
    { year: '2029 Q2', title: 'Full Agricultural Operations', desc: 'All Agri systems operational at scale. Export revenue flowing. Second phase expansion to 20,000 hectares initiated.' },
  ],
  stats: [
    { stat: 'Yield Improvement', value: 75, max: 100 },
    { stat: 'Water Efficiency', value: 85, max: 100 },
    { stat: 'Chemical Reduction', value: 90, max: 100 },
    { stat: 'Post-Harvest Loss Reduction', value: 83, max: 100 },
  ],
  location: 'Senegal',
  locationDesc: 'Prime agricultural land in the Senegal River Valley with year-round growing seasons, reliable irrigation water from the Senegal River, and proximity to Dakar port for European export. The region offers 300+ growing days annually and established agricultural infrastructure.',
  strategicAdvantages: [
    { title: 'Technology-Driven Yield Gap Closure', desc: 'Africa\'s yield gap represents the largest untapped agricultural opportunity globally. Precision farming technology can close 60-80% of this gap within 3 growing seasons, creating immediate value from underperforming land.' },
    { title: 'Integrated Water-Energy-Agri Nexus', desc: 'Harch Water provides desalinated irrigation water, Harch Energy supplies solar-powered pumps, and Harch Technology delivers IoT and AI analytics — an integrated stack no standalone agri company can replicate.' },
    { title: 'European Export Proximity', desc: 'Senegal\'s location provides 4-day shipping to European markets versus 14+ days from Asian and South American competitors, enabling premium pricing for fresh produce.' },
    { title: 'Food Security Mandate', desc: 'Government food security programs across West Africa provide guaranteed offtake and subsidy support for domestic food production, derisking agricultural investment.' },
  ],
  partnershipModel: [
    { title: 'Contract Farming', desc: 'Managed farming services for landowners and investors. Harch Agri provides technology, expertise, and market access; partners provide land and capital. Guaranteed minimum returns with profit sharing above threshold.' },
    { title: 'AgTech Licensing', desc: 'Precision farming platform licensing for agricultural cooperatives and development organizations. SaaS model with per-hectare pricing and technical support packages.' },
    { title: 'Export Joint Ventures', desc: 'Partnerships with European food distributors and retailers for premium African produce. Shared branding, quality assurance, and supply chain management.' },
    { title: 'Development Finance Partnerships', desc: 'Collaborative programs with IFAD, AfDB, and bilateral development agencies for smallholder farmer technology transfer and capacity building.' },
  ],
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function HarchAgriPage() {
  const data = agriData;

  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══════════════════════════════════════════
          HERO — Full-bleed photo + subtle Three.js particle overlay
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[85vh] flex items-end">
        <Image src={data.heroImage} alt={data.name} fill className="object-cover" priority />
        {/* Three.js particle overlay — subtle background effect */}
        <div className="absolute inset-0 z-[1] opacity-30">
          <HeroScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[2]" />
        <div className="relative z-[3] max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 font-[family-name:var(--font-space-mono)]">{data.name} {data.version}</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-4 whitespace-pre-line">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl">{data.heroSubtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW — Text left + Metrics right (Palantir split)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <p className="section-label mb-4">Overview</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                {data.name}
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <div key={m.label} className="card p-6 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white stat-mono">
                      <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FULL-BLEED IMAGE BREAK
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage1} alt={`${data.name} infrastructure`} height="55vh" />

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT — Side-by-side split
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage2} imageAlt={`${data.name} operations`}>
        <FadeIn>
          <p className="section-label mb-4">Strategic Context</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Why This Matters
          </h2>
          <div className="accent-line mb-6" />
          <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
        </FadeIn>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          CAPABILITIES — Grid cards
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              What We Build
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <FadeIn key={cap.title} delay={i * 0.06}>
                  <div className="card p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-3">
                      <Icon size={18} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[14px] font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-[12px] text-[#999999] leading-relaxed">{cap.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE MAP — D3.js Africa map in .card container
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] relative overflow-hidden">
        <ParticleField />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-label mb-4">Deployments / Real-Time</p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em]">
                Operating Across<br />Africa
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-[15px] text-[#999999] leading-relaxed">
                From Senegal to Kenya — our IoT network spans the continent&apos;s most strategic agricultural corridors. Hover each hub for details.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="card overflow-hidden" style={{ height: '520px' }}>
              <AfricaMap />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SPEC TABLE — Data table (Palantir style)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Technical Specifications</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">Key Metrics</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Detailed specifications and performance targets for {data.name}.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#1A1A1A] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Value</th>
                      <th>Phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.specTable.map((row) => (
                      <tr key={row.spec}>
                        <td>{row.spec}</td>
                        <td className="font-semibold">{row.value}</td>
                        <td className="text-[#999999]">{row.phase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BREAK — Full-bleed image section
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage3} alt={`${data.name} vertical farming`} height="50vh" />

      {/* ═══════════════════════════════════════════
          IoT DASHBOARD — Recharts live monitoring in .card containers
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] relative overflow-hidden">
        <ParticleField />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <p className="section-label mb-4">Live Monitoring</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              IoT Dashboard
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              Real-time sensor data updated every 2 seconds. Temperature, soil moisture, crop health, and carbon credits — all in one view.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <IoTDashboard />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCT CARDS — Interactive cards with .card style
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Products</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Four Integrated Solutions
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              From drones to vertical farms, IoT to carbon credits. Each product works standalone or in full synergy.
            </p>
          </FadeIn>
          <ProductCards />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC ADVANTAGES — Full-width with stat bars
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <p className="section-label mb-4">Strategic Advantages</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                Competitive Positioning
              </h2>
              <div className="accent-line mb-8" />
              <div className="space-y-8">
                {data.strategicAdvantages.map((adv) => (
                  <div key={adv.title}>
                    <h3 className="text-[15px] font-bold text-white mb-2">{adv.title}</h3>
                    <p className="text-[13px] text-[#999999] leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-2 mt-8 lg:mt-0">
                {data.stats.map((s) => (
                  <StatBar key={s.stat} stat={s.stat} value={s.value} max={s.max} />
                ))}
              </div>
              <div className="mt-12 p-6 card">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)] mb-2">Investment</p>
                <p className="text-4xl font-bold text-white stat-mono">{data.investment}</p>
                <p className="text-[12px] text-[#999999] mt-2">{data.location}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BACKGROUND — Investment & Location
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[50vh] flex items-center">
        <Image src={data.heroImage} alt={data.name} fill className="object-cover" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              {data.investment} Investment<br />in {data.location}
            </h2>
            <p className="max-w-lg text-[15px] text-white/60 leading-relaxed">{data.locationDesc}</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET ANALYSIS — Side-by-side split (reversed)
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage1} imageAlt={`${data.name} market`} reverse>
        <FadeIn>
          <p className="section-label mb-4">Market Analysis</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            The Opportunity
          </h2>
          <div className="accent-line mb-6" />
          <p className="text-[15px] text-[#999999] leading-[1.7]">{data.marketAnalysis}</p>
        </FadeIn>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          SUSTAINABILITY — Split section
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage4} imageAlt={`${data.name} sustainability`}>
        <FadeIn>
          <p className="section-label mb-4">Sustainability & ESG</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Built for the Long Term
          </h2>
          <div className="accent-line mb-6" />
          <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
        </FadeIn>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          TIMELINE — Milestones
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Timeline</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">Key Milestones</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-10">
              {data.milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-12 relative">
                    <div className="relative z-10 shrink-0 w-10 md:w-20 flex justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#1A1A1A] border-2 border-[rgba(255,255,255,0.15)] mt-1.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white font-[family-name:var(--font-space-mono)]">{m.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-1">{m.title}</h3>
                      <p className="text-[13px] text-[#999999] leading-relaxed max-w-lg">{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITOR TABLE — .data-table with competitor data
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Competitive Analysis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Harch Agri vs. The Field
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              How Harch Agri positions against the leading AgTech players across Africa and globally.
            </p>
          </FadeIn>
          <CompetitorComparison />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNERSHIP MODEL — Grid cards
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Partnership</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              How to Work With Us
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.partnershipModel.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">0{i + 1}</span>
                    <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-[13px] text-[#999999] leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC PARTNERS — Using PartnershipsSection
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Ecosystem</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Strategic Partners
            </h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">
              Governments, research institutions, and AgTech ecosystems — Harch Agri builds Africa&apos;s agricultural infrastructure with the best.
            </p>
          </FadeIn>
          <PartnershipsSection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Dark with dot pattern (Palantir standard)
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">Learn More</h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">Interested in {data.name}? Let&apos;s discuss partnership and investment opportunities.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">Get Started <ArrowRight size={14} /></Link>
              <Link href="/investors" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">Investor Details</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
