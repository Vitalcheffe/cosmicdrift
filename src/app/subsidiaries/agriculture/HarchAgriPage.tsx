'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Wheat, Droplets, Plane, Radio, Building2, Leaf,
  MapPin, Clock, AlertTriangle, CheckCircle2, Sprout, Sun, CloudRain, BarChart3
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   HARCHAGRI — HarchCorp Unified Design System
   Site palette — Green accent (#22C55E) — Shared CSS classes
   ═══════════════════════════════════════════════════ */

/* ─── FadeIn — framer-motion, matches HarchOS ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── AnimatedCounter — matches HarchOS ─── */
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

/* ═══════════════════════════════════════════════════
   DATA — Strictly HarchAgri, ZERO GPU/hub references
   ═══════════════════════════════════════════════════ */

const data = {
  name: 'HarchAgri',
  version: '/0.6',
  heroTitle: "Precision\nAgriculture\nfor Africa",
  heroSubtitle: "Drones, IoT, vertical farms, and carbon credits — Africa's only integrated AgTech platform. Built for African agricultural realities.",
  heroImage: '/images/sections/agri-aerial-drone.jpg',

  overview: "Africa holds 60% of the world's uncultivated arable land, yet imports $50 billion in food each year. African cereal yields average 1.5 tonnes per hectare versus 4 tonnes globally. Only 6% of cultivated land is irrigated compared to 37% worldwide. Post-harvest losses exceed 30%. HarchAgri addresses each of these constraints with five integrated pillars — Drone-as-a-Service, IoT irrigation, modular vertical farms, agricultural carbon credits, and a smallholder starter kit — that mutually reinforce each other in a network effect no single-product competitor can replicate.",

  strategicContext: "Africa holds 60% of the world's uncultivated arable land — approximately 600 million hectares — yet the continent remains a net food importer, spending $50 billion annually. The 30 million smallholder farmers who produce 70% of locally consumed food face systemic barriers: no access to credit, limited weather data, fragmented supply chains. Morocco's Green Plan (2008-2020) proved that national strategy works — agricultural GDP doubled, exports tripled, cereal production increased by 67%. Generation Green (2020-2030) continues this momentum with technology and sustainability at its core. HarchAgri delivers integrated solutions tailored to each constraint.",

  marketAnalysis: "The African agritech market is valued at $35 billion and growing rapidly. The market divides into five segments: agricultural drones ($8.5B, CAGR 25%), IoT irrigation ($3.2B, CAGR 18%), vertical farming ($8.5B global, CAGR 26.8%), carbon credits ($2B Africa, CAGR 30%+), and agricultural marketplaces ($15B Africa, CAGR 12% — the most crowded and most troubled segment, as the collapse of Twiga Foods demonstrates). HarchAgri targets the four highest-growth, least-served segments while avoiding the commoditized marketplace space.",

  sustainability: "Sustainability is not an add-on — it is HarchAgri's business model. Every hectare under IoT irrigation saves 0.5 to 1.5 tonnes of CO2 per year. Every vertical farm avoids 2 to 5 tonnes of CO2 versus conventional agriculture. Every hectare in regenerative agriculture sequesters 1 to 3 tonnes of CO2 in the soil. The Carbon API calculates and certifies these credits automatically via Verra (VCS) and Gold Standard. Renewable-energy-powered vertical farms produce certified low-carbon vegetables, commanding premium prices from hotels, restaurants, and distributors seeking to reduce their Scope 3 emissions.",

  investment: '$250K',
  metrics: [
    { value: 600, prefix: '', suffix: 'M ha', label: 'Uncultivated Arable Land' },
    { value: 30, prefix: '', suffix: 'M', label: 'Smallholder Farmers' },
    { value: 50, prefix: '$', suffix: 'B', label: 'Food Imports/year' },
    { value: 30, prefix: '', suffix: '%', label: 'Post-Harvest Losses' },
  ],

  products: [
    {
      icon: Plane,
      name: 'HarchAgri Drone',
      tagline: 'Drone-as-a-Service Surveillance',
      price: '$50',
      unit: '/hectare/month',
      roi: '6-8 months',
      target: 'Farms >5ha',
      description: "Autonomous drones equipped with multispectral sensors for NDVI analysis, early disease detection 48 hours before visible symptoms, precision irrigation mapping, and yield prediction 2 weeks out. Unlike Western solutions that require drone purchase ($15,000+), HarchAgri operates a DaaS model — the farmer pays a monthly subscription and HarchAgri manages flights, data processing, and delivers recommendations directly to their phone.",
      features: [
        'NDVI analysis — stress detection 48h before visible symptoms',
        'Yield prediction 2 weeks in advance, 90%+ accuracy',
        'DaaS model — no drone purchase required',
        '1 drone covers 40 ha/day, 150% ROI year 1',
        'Actionable recommendations sent directly to mobile',
      ],
      stats: [
        { label: 'Coverage/day', value: '40 ha' },
        { label: 'Year 1 ROI', value: '150%' },
        { label: 'Early detection', value: '48h' },
      ],
    },
    {
      icon: Radio,
      name: 'HarchAgri IoT',
      tagline: 'Smart Irrigation Network',
      price: '$500',
      unit: '/hectare/year',
      roi: '12-18 months',
      target: 'Farms >2ha',
      description: "Solar-powered sensor networks monitoring soil moisture, temperature, pH, and nutrient levels continuously. Data transmitted via LoRaWAN (15km range) to servers where AI optimizes irrigation schedules based on weather forecasts, growth stage, and water quotas. Reduces water consumption by 30-50% while increasing yields by 15-25%. Pay-as-you-grow model: start with a $200 starter kit (3 sensors + LoRaWAN gateway).",
      features: [
        'Solar sensors: moisture, temperature, pH, NPK',
        'LoRaWAN network — 15 km range, solar-powered',
        'AI-optimized irrigation based on weather and growth stage',
        'Automatic Carbon API integration — CO2 savings calculated',
        'Pay-as-you-grow: $200 starter kit',
      ],
      stats: [
        { label: 'Water savings', value: '30-50%' },
        { label: 'Yield increase', value: '15-25%' },
        { label: 'Starter kit', value: '$200' },
      ],
    },
    {
      icon: Building2,
      name: 'HarchAgri Vertical',
      tagline: 'Modular Vertical Farms',
      price: '$50,000',
      unit: '/container (500m\u00B2)',
      roi: '12-18 months',
      target: 'Hotels, restaurants, retail',
      description: "A 20-foot container transformed into a hydroponic vertical farm equivalent to 500m\u00B2 — LED lighting, hydroponic circulation, IoT sensors, and cloud connectivity included. Produces 2 tonnes of vegetables/month (lettuce, basil, mint, cherry tomatoes) generating $4,000-6,000/month in revenue. Unlike AeroFarms' failed aeroponic model, HarchAgri uses affordable hydroponics adapted to African markets, targeting premium buyers and integrating carbon credit revenue.",
      features: [
        '500m\u00B2 equivalent in a 20-foot container',
        '2 tonnes/month — herbs, leafy greens, cherry tomatoes',
        'Cloud-connected for real-time climate optimization',
        'Generates verified carbon credits per container',
        'Renewable energy — certified low-carbon production',
      ],
      stats: [
        { label: 'Revenue/month', value: '$4-6K' },
        { label: 'Water savings', value: '95%' },
        { label: 'ROI', value: '12-18mo' },
      ],
    },
    {
      icon: Leaf,
      name: 'HarchAgri Carbon',
      tagline: 'Agricultural Carbon Credits',
      price: '2%',
      unit: 'commission on credits',
      roi: 'Immediate',
      target: 'All HarchAgri clients',
      description: "The product no competitor has. The Carbon API, already operational, automatically calculates, certifies, and monetizes agricultural carbon credits. Every hectare under IoT irrigation saves 0.5-1.5 tCO2/year. Every vertical farm avoids 2-5 tCO2. Every regenerative hectare sequesters 1-3 tCO2. Certified via Verra (VCS) and Gold Standard. The ACMI initiative targets 20x growth in African carbon credits by 2030 — HarchAgri is positioned to capture this explosion. Revenue model: 2% commission on credit value, with 100,000 ha targeted by 2030 generating $150K-450K per year in commissions alone.",
      features: [
        'Native Carbon API — already operational, zero build required',
        'Automatic certification via Verra VCS + Gold Standard',
        'Real-time CO2 calculation from IoT sensor data',
        'Integrated into all HarchAgri products by default',
        'ACMI-aligned — 20x market growth by 2030',
      ],
      stats: [
        { label: 'Credits/ha/yr', value: '0.5-3 tCO2' },
        { label: '2030 target', value: '100K ha' },
        { label: 'Commission', value: '2%' },
      ],
    },
  ],

  starterKit: {
    price: '$200',
    contents: '3 solar sensors + LoRaWAN gateway',
    roi: '3-6 months',
    target: 'Smallholder farmers',
  },

  competitors: [
    {
      name: 'OCP Group / Al Moutmir',
      country: 'Morocco',
      revenue: '$11.4B (2025)',
      funding: 'State-backed',
      farmers: '580K+ (40K direct)',
      model: 'Precision + fertilizers',
      maturity: 'Advanced',
      africa: 'Morocco + 5 countries',
      advantage: 'Complementary — HarchAgri brings drones + IoT + carbon for their 580K farmer ecosystem',
      weakness: 'Slow innovation, non-startup culture',
    },
    {
      name: 'Twiga Foods',
      country: 'Kenya',
      revenue: 'Declining',
      funding: '$145.65M (12 rounds)',
      farmers: 'Indirect',
      model: 'B2B Marketplace',
      maturity: 'Crisis — restructuring',
      africa: 'Kenya only',
      advantage: 'Cautionary tale — we avoid the capital-intensive marketplace model',
      weakness: 'Over-expansion, unprofitable, 300+ layoffs, suspended ops',
    },
    {
      name: 'Apollo Agriculture',
      country: 'Kenya',
      revenue: 'Not public',
      funding: '$50M+ (Series B)',
      farmers: '350K+',
      model: 'ML credit + inputs',
      maturity: 'Growth',
      africa: 'Kenya + Zambia',
      advantage: 'Credit integration model — HarchAgri IoT data reduces default risk by 40%',
      weakness: 'FX-dependent, single product (credit)',
    },
    {
      name: 'AeroFarms',
      country: 'USA',
      revenue: 'Post-bankruptcy',
      funding: '$100M+ (pre-BK)',
      farmers: 'N/A (B2C retail)',
      model: 'Aeroponic microgreens',
      maturity: 'Post-failure pivot',
      africa: 'None',
      advantage: 'Proof that vertical farming only works with a focused model + premium retail',
      weakness: 'Capital-intensive aeroponics, no Africa presence',
    },
    {
      name: 'Climate Corp / FieldView',
      country: 'USA (Bayer)',
      revenue: '$50B+ (Bayer total)',
      funding: '$930M acquisition',
      farmers: '250M acres, 23 countries',
      model: 'Insurance + data platform',
      maturity: 'Mature',
      africa: 'Indirect only',
      advantage: 'Data moat model — HarchAgri is building an agricultural data moat for Africa',
      weakness: 'Not present in Africa, requires massive data volumes',
    },
  ],

  pricing: [
    { product: 'HarchAgri Drone', price: '$50/ha/month', unit: 'DaaS Subscription', roi: '6-8 months', target: 'Farms >5ha' },
    { product: 'HarchAgri IoT', price: '$500/ha/year', unit: 'Annual Subscription', roi: '12-18 months', target: 'Farms >2ha' },
    { product: 'HarchAgri Vertical', price: '$50,000/container', unit: '500m\u00B2 Module', roi: '12-18 months', target: 'Hotels, restaurants, retail' },
    { product: 'HarchAgri Carbon', price: '2% commission', unit: 'On carbon credits', roi: 'Immediate', target: 'All HarchAgri clients' },
    { product: 'Starter Kit', price: '$200', unit: '3 sensors + LoRaWAN', roi: '3-6 months', target: 'Smallholder farmers' },
  ],

  partners: [
    { name: 'Green Plan Morocco', type: 'Government', country: 'Morocco', priority: 'P1 — Critical', harchContribution: 'Agriculture tech', partnerContribution: 'Subsidies, certifications, regulatory framework', status: 'Active' as const },
    { name: 'OCP / Al Moutmir', type: 'Strategic', country: 'Morocco', priority: 'P1 — Critical', harchContribution: 'Drones + IoT + Carbon API', partnerContribution: '580K farmer ecosystem, agronomy, distribution', status: 'Active' as const },
    { name: 'FAO Morocco', type: 'Institutional', country: 'Morocco', priority: 'P1 — Critical', harchContribution: 'Carbon API + data platform', partnerContribution: 'Certification standards, international credibility', status: 'In Negotiation' as const },
    { name: 'ISRA Senegal', type: 'Research', country: 'Senegal', priority: 'P2 — Important', harchContribution: 'Technology transfer', partnerContribution: 'R&D, local adaptation, farmer networks', status: 'Prospect' as const },
    { name: 'AgriTech Kenya', type: 'Ecosystem', country: 'Kenya', priority: 'P2 — Important', harchContribution: 'Platform + data', partnerContribution: 'Market entry, mature ecosystem', status: 'Prospect' as const },
    { name: 'Ghana MoFA', type: 'Government', country: 'Ghana', priority: 'P3 — Future', harchContribution: 'IoT solutions', partnerContribution: 'Planting for Food and Jobs program', status: 'Prospect' as const },
  ],

  roadmap: [
    {
      phase: 'Phase 1', period: '2026', title: 'Proof of Concept',
      hectares: 100, farmers: 50, revenue: '$0.1M',
      funding: 'Self-funded ($250K)',
      actions: [
        'Deploy 2 DJI Agras drones across 5 pilot sites',
        'Install 30 IoT sensors on 5 pilot plots',
        'Recruit 3 agronomists for field operations',
        'Integrate Carbon API for automatic CO2 calculation',
        'Deploy 5 vertical farm containers (1 per site)',
        'Obtain Verra certification for carbon methodology',
        'Measure impact: NPS > 70, ROI > 100%',
      ],
    },
    {
      phase: 'Phase 2', period: '2027-2028', title: 'Scale in Morocco',
      hectares: 5000, farmers: 1000, revenue: '$2.5M ARR',
      funding: 'Series A ($3-5M)',
      actions: [
        'Scale to 1,000 farmers and 5,000 hectares in Morocco',
        'Leverage OCP/Al Moutmir partnership for 580K farmer access',
        'Expand vertical farms from 5 to 25 units',
        'Launch HarchAgri Marketplace v1 for urban market access',
        'Achieve operational break-even by end of 2028',
        'Secure government subsidies via Green Plan certification',
      ],
    },
    {
      phase: 'Phase 3', period: '2028-2029', title: 'African Expansion',
      hectares: 25000, farmers: 5000, revenue: '$10M ARR',
      funding: 'Series B ($15-20M)',
      actions: [
        'Expand to Senegal (ISRA partnership), Kenya (AgriTech ecosystem), Ghana (MoFA/PFJ)',
        'Same playbook: 5 pilots per country, measure, then scale',
        '4 countries, 5,000 farmers, 25,000 hectares under management',
        'Target investors: CDC, Swedfund, IFC — Africa-focused DFIs',
        'Launch indexed crop insurance (inspired by Climate Corp, adapted for Africa)',
      ],
    },
    {
      phase: 'Phase 4', period: '2029-2031', title: 'Continental Leadership',
      hectares: 100000, farmers: 50000, revenue: '$50M ARR',
      funding: 'Pre-IPO / Strategic',
      actions: [
        '50,000 farmers, 100,000 hectares, 10 countries',
        'Full platform: drones + IoT + vertical + carbon + marketplace + insurance',
        'HarchAgri becomes the reference precision agriculture platform in Africa',
        'Virtuous cycle: more data improves AI models, more carbon credits attract ESG investors',
        'Positioning for IPO or strategic acquisition',
      ],
    },
  ],

  moats: [
    {
      title: 'DaaS Model — Zero Upfront Investment',
      desc: "Unlike Western competitors that require drone purchase at $15,000+, HarchAgri operates a Drone-as-a-Service model. The farmer pays a monthly subscription and HarchAgri manages everything. This approach eliminates the most critical barrier to entry for African farmers: the upfront hardware cost.",
      icon: Sprout,
    },
    {
      title: 'Integrated Ecosystem — Network Effect',
      desc: "Four products that mutually reinforce each other: drones generate data that improves IoT irrigation, which produces carbon credits, which makes vertical farms more profitable. Every product added increases the value of the whole. No single-product competitor can replicate this network effect.",
      icon: Wheat,
    },
    {
      title: 'Native Carbon API — Integrated Carbon Revenue',
      desc: "Already operational. No African agritech competitor can calculate, certify, and monetize agricultural carbon credits in real-time. This transforms every hectare under management into an additional revenue stream, making HarchAgri's offer economically irresistible for farmers. The Carbon API is the connective tissue linking the four products into a coherent ecosystem.",
      icon: Leaf,
    },
  ],

  risks: [
    { risk: 'Over-expansion (Twiga mistake)', probability: 'Medium', impact: 'Critical', mitigation: 'Lean startup: validate before scaling. Threshold of 100 paying farmers before expansion.' },
    { risk: 'Vertical farm failure (AeroFarms mistake)', probability: 'Medium', impact: 'High', mitigation: 'Start with DaaS/IoT (low capex). Vertical farms only in Phase 2 after proof of concept.' },
    { risk: 'Agritech funding downturn', probability: 'High', impact: 'Medium', mitigation: 'Self-funded from day 1. Break-even in Phase 2. Carbon credits = recurring revenue.' },
    { risk: 'Farmer tech adoption barrier', probability: 'High', impact: 'Critical', mitigation: 'Mobile-first UX. OCP partnership for trust. $200 starter kit eliminates price barrier.' },
    { risk: 'Carbon credit regulation', probability: 'Low', impact: 'Medium', mitigation: 'Verra certification in Phase 1. FAO partnership for legitimacy.' },
    { risk: 'OCP enters drone market', probability: 'Low', impact: 'High', mitigation: 'Partnership over competition. OCP lacks startup tech culture.' },
  ],

  locations: [
    { city: 'Casablanca', region: 'Central-West', crops: 'Market gardening, cereals' },
    { city: 'Marrakech', region: 'South', crops: 'Citrus, olives, market gardening' },
    { city: 'Tangier', region: 'North', crops: 'Cereals, livestock' },
    { city: 'Rabat', region: 'North-West', crops: 'Market gardening, arboriculture' },
    { city: 'Agadir', region: 'South-West', crops: 'Citrus, tomatoes, argan' },
  ],
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE — HarchCorp unified design, green accent
   ═══════════════════════════════════════════════════ */
export default function HarchAgriPage() {
  return (
    <div className="bg-[#1A1A1A] text-white">
      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt="HarchAgri — Precision Agriculture"
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">HarchAgri /0.6</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6 whitespace-pre-line">
              {data.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">{data.heroSubtitle}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
              {data.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="section-label mb-4 text-[#22C55E]">Overview</p>
                <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                  Africa&apos;s Agricultural Challenge
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <div key={m.label} className="card p-6">
                    <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                      <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-2 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT — Photo + Text
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/sections/agri-drone-field.jpg"
                alt="HarchAgri agricultural drone"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="max-w-lg">
                <FadeIn>
                  <p className="section-label mb-4 text-[#22C55E]">Strategic Context</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                    Why It Matters
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET ANALYSIS — Table
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Market Analysis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Five Segments, One Platform</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">The African agritech market divides into five segments. HarchAgri targets the four with the highest growth and least competition — avoiding the commoditized marketplace space.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>Market Size</th>
                      <th>CAGR</th>
                      <th>Africa Maturity</th>
                      <th>Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { segment: 'Agricultural Drones', size: '$8.5B', cagr: '25%', maturity: 'Nascent', opportunity: 'Very High', strong: true },
                      { segment: 'IoT Irrigation', size: '$3.2B', cagr: '18%', maturity: 'Low', opportunity: 'High', strong: true },
                      { segment: 'Vertical Farming', size: '$8.5B global', cagr: '26.8%', maturity: 'Non-existent', opportunity: 'Medium', strong: false },
                      { segment: 'Carbon Credits', size: '$2B Africa', cagr: '30%+', maturity: 'Emerging', opportunity: 'Very High', strong: true },
                      { segment: 'Marketplace', size: '$15B Africa', cagr: '12%', maturity: 'Crowded', opportunity: 'Low (avoid)', strong: false },
                    ].map((row) => (
                      <tr key={row.segment}>
                        <td>{row.segment}</td>
                        <td>{row.size}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.cagr}</td>
                        <td className="!text-[#666666] !font-normal">{row.maturity}</td>
                        <td className={row.strong ? '!text-[#22C55E] !font-semibold' : '!text-[#666666] !font-normal'}>{row.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[10px] text-[#666666]">Sources: Briter Intelligence 2025, ACMI, Grand View Research. ACMI targets 20x growth in African carbon credits by 2030.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCTS — The 5 Pillars
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Products</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Five Integrated Pillars
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Each product works standalone or in full synergy. Together, they create a network effect no single-product competitor can replicate.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.products.map((product, i) => {
              const Icon = product.icon;
              return (
                <FadeIn key={product.name} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                          <Icon size={18} className="text-[#22C55E]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{product.name}</h3>
                          <p className="text-[11px] text-[#666666]">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white stat-mono">{product.price}</p>
                        <p className="text-[10px] text-[#666666]">{product.unit}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">{product.description}</p>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {product.stats.map((stat, j) => (
                        <div key={j} className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                          <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
                          <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                          <span className="text-[12px] text-[#999999]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.04)]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[#666666]" />
                        <span className="text-[10px] text-[#666666]">ROI: {product.roi}</span>
                      </div>
                      <span className="text-[10px] text-[#666666]">{product.target}</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Starter Kit */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8 border-dashed" style={{ borderColor: 'rgba(34,197,94,0.25)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                    <Sprout size={18} className="text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Starter Kit</h3>
                    <p className="text-[12px] text-[#999999]">{data.starterKit.contents}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white stat-mono">{data.starterKit.price}</p>
                  <p className="text-[10px] text-[#666666]">ROI: {data.starterKit.roi}</p>
                </div>
              </div>
              <p className="text-[12px] text-[#666666] mt-3">For {data.starterKit.target} — eliminates the price barrier to technology adoption.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Transparent Pricing</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">Simple, transparent pricing designed for African agricultural economies. No hidden fees. Carbon credit revenue included by default.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>ROI</th>
                      <th>Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pricing.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.price}</td>
                        <td className="!text-[#666666] !font-normal">{row.unit}</td>
                        <td>{row.roi}</td>
                        <td className="!text-[#666666] !font-normal">{row.target}</td>
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
          PHOTO BREAK — Vertical Farms
          ═══════════════════════════════════════════ */}
      <section className="photo-section">
        <Image
          src="/images/sections/agri-vertical-farm.jpg"
          alt="HarchAgri vertical farm"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITIVE ANALYSIS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Competitive Analysis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              HarchAgri vs. The Field
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Five competitors, five market entry points. None have integrated carbon credits + IoT irrigation + drones + vertical farms on the African continent.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {data.competitors.map((comp, i) => (
              <FadeIn key={comp.name} delay={i * 0.06}>
                <div className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <h3 className="font-bold text-white text-[15px]">{comp.name}</h3>
                      <p className="text-[11px] text-[#666666]">{comp.country} · {comp.maturity}</p>
                      <p className="text-[11px] text-[#999999] mt-1">{comp.model}</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenue</p>
                        <p className="text-[13px] text-white stat-mono">{comp.revenue}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Funding</p>
                        <p className="text-[13px] text-white stat-mono">{comp.funding}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Farmers</p>
                        <p className="text-[13px] text-white">{comp.farmers}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Africa</p>
                        <p className="text-[13px] text-white">{comp.africa}</p>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">HarchAgri Advantage</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.advantage}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Key Weakness</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.weakness}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Highlight HarchAgri */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#22C55E] font-[family-name:var(--font-space-mono)]">/0.6</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">HarchAgri</h4>
                  <p className="text-[11px] text-[#666666]">Africa's only integrated AgTech platform with native carbon credits</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Model</p>
                  <p className="text-[14px] text-white font-semibold">SaaS + Hardware + Carbon</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Differentiator</p>
                  <p className="text-[14px] text-white font-semibold">Only integrated AgTech + Carbon</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Africa Presence</p>
                  <p className="text-[14px] text-white font-semibold">5 operational sites (Morocco)</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">2031 Target</p>
                  <p className="text-[14px] text-white font-semibold stat-mono">50K farmers / $50M ARR</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITIVE ADVANTAGE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Competitive Advantage</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Three Unreplicable Advantages
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {data.moats.map((moat, i) => {
              const Icon = moat.icon;
              return (
                <FadeIn key={moat.title} delay={i * 0.1}>
                  <div className="card p-8 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center mb-5">
                      <Icon size={18} className="text-[#22C55E]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{moat.title}</h3>
                    <div className="accent-line mb-4" />
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{moat.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SUSTAINABILITY & ESG
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center px-8 md:px-16 py-20 order-2 lg:order-1">
              <div className="max-w-lg">
                <FadeIn>
                  <p className="section-label mb-4 text-[#22C55E]">Sustainability &amp; ESG</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                    Sustainability Is the Business Model
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
                </FadeIn>
              </div>
            </div>
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/sections/agri-green-crops-aerial.jpg"
                alt="HarchAgri sustainable agriculture"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-r lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNERSHIPS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Partnerships</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Strategic Partners
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Selective, symbiotic partnerships — each partner brings a capability HarchAgri lacks; HarchAgri brings the technology and carbon credits they don&apos;t have.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.partners.map((partner, i) => (
              <FadeIn key={partner.name} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                      <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold ${
                      partner.status === 'Active' ? 'bg-[rgba(34,197,94,0.08)] text-[#22C55E]' : 'bg-[rgba(255,255,255,0.04)] text-[#666666]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.status === 'Active' ? 'bg-[#22C55E]' : 'bg-[#666666]'}`} />
                      {partner.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">We bring</p>
                    <p className="text-[11px] text-white">{partner.harchContribution}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">They bring</p>
                    <p className="text-[11px] text-[#999999]">{partner.partnerContribution}</p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.04)]">
                    <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">{partner.priority}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Four Phases to Continental Leadership</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">Lean startup philosophy: validate with an MVP before scaling. Avoid Twiga Foods&apos; fatal mistake — over-investing before proving the model.</p>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

            <div className="space-y-10">
              {data.roadmap.map((phase, i) => (
                <FadeIn key={phase.phase} delay={i * 0.1}>
                  <div className="relative pl-10 md:pl-14">
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1 top-1 w-[23px] md:w-[31px] h-[23px] md:h-[31px] rounded-full border-2 border-[rgba(255,255,255,0.06)] bg-[#1E1E1E] flex items-center justify-center">
                      <div className="w-[7px] h-[7px] rounded-full bg-[#22C55E]" />
                    </div>

                    <div className="card p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{phase.phase}</span>
                          <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                          <p className="text-[12px] text-[#666666] mt-1">{phase.period}</p>
                          <p className="text-[11px] text-[#666666] mt-0.5">{phase.funding}</p>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-3 gap-2">
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-white stat-mono">
                              <AnimatedCounter target={phase.hectares} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Hectares</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-white stat-mono">
                              <AnimatedCounter target={phase.farmers} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Farmers</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-sm font-bold text-white stat-mono">{phase.revenue}</p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenue</p>
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <div className="space-y-2">
                            {phase.actions.map((action, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                <span className="text-[12px] text-[#999999] leading-relaxed">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RISKS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Risk Analysis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Identified Risks &amp; Mitigations</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">Prudence is not optional — it is essential. The failures of Twiga Foods, AeroFarms, and the volatile agritech funding environment in 2025 teach us this.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Risk</th>
                      <th>Probability</th>
                      <th>Impact</th>
                      <th>Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.risks.map((r) => (
                      <tr key={r.risk}>
                        <td>{r.risk}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 text-[11px] ${
                            r.probability === 'High' ? 'text-white/80' : r.probability === 'Medium' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.probability === 'High' && <AlertTriangle size={10} />}
                            {r.probability}
                          </span>
                        </td>
                        <td>
                          <span className={`text-[11px] ${
                            r.impact === 'Critical' ? 'text-white font-semibold' : r.impact === 'High' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.impact}
                          </span>
                        </td>
                        <td className="!text-[#999999] !font-normal max-w-md text-[12px]">{r.mitigation}</td>
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
          DEPLOYMENTS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Deployments</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Five Sites in Morocco</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Each site covers a 100km radius for drone and IoT operations. Morocco&apos;s Generation Green strategy (2020-2030) provides institutional support, OCP&apos;s Al Moutmir program brings a 580K farmer ecosystem. Expansion to Senegal, Kenya, and Ghana in Phase 3.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.locations.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.06}>
                <div className="card p-5 text-center">
                  <MapPin size={14} className="text-[#22C55E] mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-white">{loc.city}</p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{loc.region}</p>
                  <p className="text-[9px] text-[#999999] mt-1">{loc.crops}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INVESTMENT — Photo + CTA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/sections/agri-iot-sensor.jpg"
          alt="HarchAgri IoT sensors"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Phase 1 Investment</p>
            <h2 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
              {data.investment}
            </h2>
            <p className="text-[15px] text-[#999999] max-w-lg leading-[1.7]">Self-funded to prove the model before raising. Operational break-even targeted by end of Phase 2.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white tracking-[-0.01em] mb-6">Let&apos;s Build Together</h2>
            <p className="max-w-xl mx-auto text-[15px] text-[#666666] leading-[1.7] mb-12">Partnership inquiries, investment, and pilot programs. HarchAgri is looking for farmers, governments, and investors who share our vision for African agricultural sovereignty.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                Get Started <ArrowRight size={14} />
              </Link>
              <Link href="/investors" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                Investor Details
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
