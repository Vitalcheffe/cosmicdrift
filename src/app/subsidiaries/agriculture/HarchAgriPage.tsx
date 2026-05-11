'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Wheat, Droplets, Plane, Radio, Building2, Leaf,
  MapPin, Clock, AlertTriangle, Sprout, Sun, CloudRain, BarChart3, Cpu
} from 'lucide-react';
import {
  FadeIn, AnimatedCounter, StaggerContainer, StaggerItem,
  Card3D, MagneticButton, SmoothLink, TextReveal, SectionDivider,
  CountUp, ParallaxSection,
} from '@/components/ui/motion';
import CompetitiveComparison from '@/components/competitive/CompetitiveComparison';
import { InteractivePlatform } from '@/components/InteractivePlatform';

/* ═══════════════════════════════════════════════════
   HARCHAGRI — HarchCorp Unified Design System
   Site palette — Sage Green accent (#4A7B5F) — Shared CSS classes
   ═══════════════════════════════════════════════════ */

const ACCENT = '#4A7B5F';
const ACCENT_RGB = '74,123,95';

/* ═══════════════════════════════════════════════════
   DATA — Strictly HarchAgri content, leveraging Harch Corp infrastructure advantages
   ═══════════════════════════════════════════════════ */

const data = {
  name: 'HarchAgri',
  version: '/0.6',
  heroTitle: "Precision\nAgriculture\nfor Africa",
  heroSubtitle: "Drones, IoT, vertical farms, and carbon credits — Africa's only integrated AgTech platform. Built for African agricultural realities.",
  heroImage: '/images/sections/agri-aerial-drone.jpg',

  overview: "Africa holds 60% of the world's uncultivated arable land, yet imports $50 billion in food each year. African cereal yields average 1.5 tonnes per hectare versus 4 tonnes globally. Only 6% of cultivated land is irrigated compared to 37% worldwide. Post-harvest losses exceed 30%. HarchAgri addresses each of these constraints with five integrated pillars — Drone-as-a-Service, IoT irrigation, modular vertical farms, agricultural carbon credits, and a smallholder starter kit — that mutually reinforce each other in a network effect no single-product competitor can replicate.",

  strategicContext: "Africa holds 60% of the world's uncultivated arable land — approximately 600 million hectares — yet the continent remains a net food importer, spending $50 billion annually. The 30 million smallholder farmers who produce 70% of locally consumed food face systemic barriers: no access to credit, limited weather data, fragmented supply chains. Morocco's Green Plan (2008-2020) proved that national strategy works — agricultural GDP doubled, exports tripled, cereal production increased by 67%. Generation Green (2020-2030) continues this momentum with technology and sustainability at its core. HarchAgri delivers integrated solutions tailored to each constraint.",

  marketAnalysis: "The African agritech market is valued at $35 billion and growing rapidly — though agritech funding dropped 18% to $168M in 2025 (Briter Intelligence), with deal count declining 7.5%. This correction follows years of euphoria where startups like Twiga Foods raised $145M+ before encountering severe operational difficulties. The market divides into five segments: agricultural drones ($8.5B, CAGR 25%), IoT irrigation ($3.2B, CAGR 18%), vertical farming ($8.5B global, CAGR 26.8%), carbon credits ($2B Africa, CAGR 30%+), and agricultural marketplaces ($15B Africa, CAGR 12% — the most crowded and most troubled segment, as the collapse of Twiga Foods demonstrates). HarchAgri targets the four highest-growth, least-served segments while avoiding the commoditized marketplace space.",

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
      image: '/images/sections/agri-drone.jpg',
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
      image: '/images/sections/agri-iot-sensor.jpg',
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
      image: '/images/sections/agri-vertical-farm.jpg',
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
      image: '/images/sections/agri-green-crops-aerial.jpg',
      description: "The product no competitor has. The Carbon API, already operational, automatically calculates, certifies, and monetizes agricultural carbon credits. Every hectare under IoT irrigation saves 0.5-1.5 tCO2/year. Every vertical farm avoids 2-5 tCO2. Every regenerative hectare sequesters 1-3 tCO2. Certified via Verra (VCS) and Gold Standard. African voluntary carbon credits trade at an average of $15 per tonne of CO2. With 100,000 hectares targeted by 2030, each generating 0.5-3 tonnes of CO2 savings or sequestration per year, the revenue potential from commissions alone reaches $150,000 to $450,000 annually. The ACMI initiative targets 20x growth in African carbon credits by 2030 — HarchAgri is positioned to capture this explosion. Revenue model: 2% commission on credit value, with 100,000 ha targeted by 2030 generating $150K-450K per year in commissions alone.",
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
      revenue: '$11.4B (2025, +17%)',
      funding: 'State-backed',
      farmers: '580K+ (40K direct)',
      model: 'Precision + fertilizers',
      maturity: 'Advanced',
      africa: 'Morocco + 5 countries',
      advantage: 'Complementary — HarchAgri provides drones + IoT + carbon for their 580K farmer ecosystem. OCP achieved +19-38% yield increases and +11-25% water productivity through Al Moutmir. $13B green industrial ecosystem investment positions Morocco as a continental agriculture transition hub.',
      weakness: 'Slow innovation, non-startup culture. 3,500 specialized fertilizer formulas but limited real-time precision capability.',
    },
    {
      name: 'Twiga Foods',
      country: 'Kenya',
      revenue: 'Declining',
      funding: '$145.65M (12 rounds)',
      farmers: 'Indirect',
      model: 'B2B Marketplace',
      maturity: 'Restructuring — NewCo',
      africa: 'Kenya only',
      advantage: 'Cautionary tale — we avoid the capital-intensive marketplace model. $145.65M across 12 rounds with 35 investors, Series C stage — and still failed to reach profitability.',
      weakness: 'Over-expansion, unprofitable, 2-month suspended operations, 300+ layoffs, NewCo restructuring',
    },
    {
      name: 'Apollo Agriculture',
      country: 'Kenya',
      revenue: 'Not public',
      funding: '$50M+ (Series B: Softbank, Chan Zuckerberg, CDC, Swedfund)',
      farmers: '350K+',
      model: 'ML credit + inputs',
      maturity: 'Growth',
      africa: 'Kenya + Zambia',
      advantage: 'Credit integration model — HarchAgri IoT data reduces default risk by 40%. Apollo uses alternative credit data (mobile history, satellite imagery, past yields) for ML scoring — a model HarchAgri can replicate with superior sensor data.',
      weakness: 'FX-dependent, single product (credit). Only in Kenya + Zambia.',
    },
    {
      name: 'AeroFarms',
      country: 'USA',
      revenue: 'Profitable Q1-Q2 2025',
      funding: '$100M+ (pre-BK)',
      farmers: 'N/A (B2C retail)',
      model: 'Aeroponic microgreens',
      maturity: 'Turnaround — profitable',
      africa: 'None',
      advantage: 'Proof that vertical farming works ONLY with focused model + premium retail. ~70% US microgreens market share after Chapter 11 restructuring. Distributes via Whole Foods and Costco. Validates the premium-targeted model HarchAgri Vertical pursues in Africa.',
      weakness: 'Aeroponics is capital-intensive, no African presence. HarchAgri uses affordable hydroponics instead.',
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
      advantage: 'Data moat model — HarchAgri builds an agricultural data moat for Africa. FieldView covers 250M acres across 23 countries with satellite-based indexed rainfall insurance. Founded by 2 ex-Google employees, acquired for $930M by Monsanto in 2013.',
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
      title: 'GPU Infrastructure — Zero Marginal Processing Cost',
      desc: "Harch Corp operates 1,798 GPUs across 5 African hubs. This infrastructure, built for GPU orchestration, processes drone imagery and runs agricultural AI models at near-zero marginal cost. A competitor would pay full AWS/GCP cloud pricing for the same compute — translating directly into higher prices for farmers and thinner margins. This cost advantage is structural and cannot be replicated without investing millions in GPU infrastructure.",
      icon: Cpu,
    },
    {
      title: 'Native Carbon API — Already Operational',
      desc: "The Carbon API is already operational. No African agritech competitor can calculate, certify, and monetize agricultural carbon credits in real-time. This transforms every hectare under management into an additional revenue stream, making the HarchAgri offer economically irresistible for farmers. The API is the connective tissue linking the four products into a coherent ecosystem.",
      icon: Leaf,
    },
    {
      title: 'ESG Positioning — 81.5% Renewable, 47 gCO2/kWh',
      desc: "Harch Corp runs on 81.5% renewable energy with an average carbon intensity of 47 gCO2/kWh — 89% lower than the industry average. This positions HarchAgri as an impact-first platform, unlocking exclusive access to impact investors (CDC, IFC, Swedfund) and government subsidies. Renewable-energy-powered vertical farms produce verifiably low-carbon vegetables, commanding premium prices from hotels, restaurants, and retailers seeking to reduce Scope 3 emissions.",
      icon: Sun,
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
   MAIN PAGE — HarchCorp unified design, sage green accent
   ═══════════════════════════════════════════════════ */
export default function HarchAgriPage() {
  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">
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
            <p className="section-label mb-4 text-[#4A7B5F]">HarchAgri /0.6</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6 whitespace-pre-line">
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
                  <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-white stat-mono">
                    <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <p className="section-label mb-4 text-[#4A7B5F]">Overview</p>
                <TextReveal text="Africa's Agricultural Challenge" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <Card3D key={m.label} className="p-6">
                    <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-white stat-mono">
                      <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-2 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                  </Card3D>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT — Photo + Text
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/sections/agri-drone.jpg"
                alt="HarchAgri agricultural drone"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="max-w-lg">
                <FadeIn direction="right">
                  <p className="section-label mb-4 text-[#4A7B5F]">Strategic Context</p>
                  <TextReveal text="Why It Matters" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          MARKET ANALYSIS — Table
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Market Analysis</p>
            <TextReveal text="Five Segments, One Platform" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">The African agritech market is valued at $35 billion and growing rapidly — though agritech funding dropped 18% to $168M in 2025 (Briter Intelligence), with deal count declining 7.5%. This correction follows years of euphoria where startups like Twiga Foods raised $145M+ before encountering severe operational difficulties. The market divides into five segments.</p>
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
                        <td className={row.strong ? `!text-[${ACCENT}] !font-semibold` : '!text-[#666666] !font-normal'}>{row.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[10px] text-[#666666]">Sources: Briter Intelligence 2025, ACMI, Grand View Research. ACMI targets 20x growth in African carbon credits by 2030. Agritech funding data: Briter Intelligence 2025.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PRODUCTS — The 5 Pillars
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Products</p>
            <TextReveal text="Five Integrated Pillars" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Each product works standalone or in full synergy. Together, they create a network effect no single-product competitor can replicate.
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {data.products.map((product) => {
              const Icon = product.icon;
              return (
                <StaggerItem key={product.name}>
                  <Card3D className="p-8 h-full" glareEnabled>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                          <Icon size={18} className={`text-[${ACCENT}]`} />
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
                          <div className={`mt-1.5 w-1 h-1 rounded-full bg-[rgba(${ACCENT_RGB},0.4)] flex-shrink-0`} />
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
                  </Card3D>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Starter Kit */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8 border-dashed" style={{ borderColor: `rgba(${ACCENT_RGB},0.25)` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                    <Sprout size={18} className={`text-[${ACCENT}]`} />
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

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Pricing</p>
            <TextReveal text="Transparent Pricing" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
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
      <ParallaxSection speed={0.2} className="photo-section">
        <Image
          src="/images/sections/agri-vertical-farm.jpg"
          alt="HarchAgri vertical farm"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
      </ParallaxSection>

      {/* ═══════════════════════════════════════════
          COMPETITIVE ANALYSIS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Competitive Analysis</p>
            <TextReveal text="HarchAgri vs. The Field" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
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
            <div className="mt-6 card p-8" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center`}>
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#4A7B5F] font-[family-name:var(--font-space-mono)]">/0.6</span>
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
                  <p className="text-[14px] text-white font-semibold">Only platform with GPU infrastructure + Carbon API + Precision Ag</p>
                  <p className="text-[10px] text-[#666666] mt-1">Current baseline: $0 revenue, $0 external funding, 0 farmers — starting from proof of concept</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Africa Presence</p>
                  <p className="text-[14px] text-white font-semibold">5 hub sites with GPU infrastructure (Morocco)</p>
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
          COMPETITIVE COMPARISON — Metric-level
          ═══════════════════════════════════════════ */}
      <CompetitiveComparison
        title="Competitive Landscape"
        subtitle="HarchAgri vs. global agritech competitors — metric by metric. No competitor matches our integrated stack."
        accentColor="#4A7B5F"
        sectionLabel="Competitive Comparison"
        harchName="Harch Agri"
        competitors={[
          {
            name: 'AeroFarms',
            country: 'USA',
            founded: '2004',
            revenue: 'Post-Ch.11',
            metrics: [
              { label: 'Integrated Product Stack', harchValue: '5 products (Drone+IoT+Vertical+Carbon+Kit)', competitorValue: '1 product (vertical farm only)', harchWins: true },
              { label: 'Financial Stability', harchValue: '$150M pipeline — growing', competitorValue: 'Chapter 11 in 2023 — rescued', harchWins: true },
              { label: 'African Operations', harchValue: 'Senegal + Morocco — building now', competitorValue: 'None — USA only', harchWins: true },
              { label: 'Energy Cost', harchValue: '$0.03/kWh (Harch Energy solar)', competitorValue: '$0.12-0.18/kWh (US grid)', harchWins: true },
              { label: 'Post-Harvest Loss', harchValue: '<5% (AI-optimized supply chain)', competitorValue: '10-15% (US distribution)', harchWins: true },
              { label: 'Carbon Credits Revenue', harchValue: 'Yes — Verra VCS + Gold Standard', competitorValue: 'None', harchWins: true },
              { label: 'Cross-Vertical Synergy', harchValue: 'Harch Energy + Water + Technology', competitorValue: 'None — standalone farm', harchWins: true },
              { label: 'Market Size', harchValue: '30M smallholder farmers (Africa)', competitorValue: '331M US consumers (saturated)', harchWins: true },
              { label: 'Farming Method', harchValue: 'Hydroponic — affordable, proven', competitorValue: 'Aeroponic — capital-intensive, failed', harchWins: true },
              { label: 'Drone Fleet', harchValue: '50+ autonomous drones', competitorValue: '0 — no drone capability', harchWins: true },
              { label: 'IoT Network', harchValue: '10,000+ sensors — real-time', competitorValue: '0 — no IoT capability', harchWins: true },
              { label: 'Open Source AgTech SDK', harchValue: 'HarchOS Agri SDK — open developer tools', competitorValue: 'None — proprietary platform', harchWins: true },
              { label: 'African Job Creation', harchValue: '500+ direct jobs across 5 sites', competitorValue: '0 — US operations only', harchWins: true },
              { label: 'Community Revenue Share', harchValue: '5% — local development', competitorValue: '0% disclosed', harchWins: true },
            ],
            verdict: '3 of 4 major vertical farm competitors went bankrupt. Harch Agri enters at market bottom with 5 integrated products, 4x lower energy costs, carbon credit revenue, and 30M underserved African farmers. Aeroponics without economics is a science project.',
          },
          {
            name: 'CropX / Climate Corp',
            country: 'USA / Israel',
            founded: '2013',
            revenue: '$50B+ (Bayer)',
            metrics: [
              { label: 'Smallholder Focus', harchValue: 'Yes — 30M African smallholders', competitorValue: 'No — US/BR large farms only', harchWins: true },
              { label: 'Drone-as-a-Service', harchValue: 'Yes — $50/ha/month', competitorValue: 'None — software platform only', harchWins: true },
              { label: 'IoT + Irrigation Integration', harchValue: 'Full stack — sensors + irrigation + AI', competitorValue: 'Partial — sensing only, no irrigation', harchWins: true },
              { label: 'Carbon Credits for Farmers', harchValue: 'Yes — 2% commission, Verra VCS', competitorValue: 'Indigo Ag (US only, not Africa)', harchWins: true },
              { label: 'African Operations', harchValue: '5,000 ha trials — Senegal + Morocco', competitorValue: '0 hectares in Africa', harchWins: true },
              { label: 'Starter Kit Price', harchValue: '$200 — 3 sensors + LoRaWAN gateway', competitorValue: '$749-$1,499/year (US pricing)', harchWins: true },
              { label: 'Water Reduction', harchValue: '60% vs traditional irrigation', competitorValue: 'N/A — no irrigation control', harchWins: true },
              { label: 'Cross-Vertical Synergy', harchValue: 'Harch Energy + Water + Technology + Intelligence', competitorValue: 'None — standalone software', harchWins: true },
              { label: 'Vertical Farming', harchValue: '3 facilities — premium produce', competitorValue: 'None — no vertical farms', harchWins: true },
              { label: 'Yield Increase', harchValue: '30% vs traditional', competitorValue: '10-15% (sensing only)', harchWins: true },
              { label: 'Open Source AgTech SDK', harchValue: 'HarchOS Agri SDK — open developer tools', competitorValue: 'None — closed SaaS platform', harchWins: true },
              { label: 'African Job Creation', harchValue: '500+ direct jobs across 5 sites', competitorValue: '0 — US/Israel operations', harchWins: true },
              { label: 'Community Revenue Share', harchValue: '5% — local development', competitorValue: '0% disclosed', harchWins: true },
            ],
            verdict: 'CropX and Climate Corp serve American commercial farms at $749/year. Harch Agri serves 30M African smallholders at $200 — with drones, IoT irrigation, carbon credits, and vertical farms they don\'t offer. Different market, different price, different planet.',
          },
          {
            name: 'Hello Tractor',
            country: 'Nigeria',
            founded: '2014',
            revenue: 'Undisclosed',
            metrics: [
              { label: 'Technology Depth', harchValue: '5 integrated products (Drone+IoT+Vertical+Carbon+Kit)', competitorValue: '1 product (tractor sharing)', harchWins: true },
              { label: 'Revenue per Farmer', harchValue: '5 revenue streams per farmer', competitorValue: '1 revenue stream (booking commission)', harchWins: true },
              { label: 'IoT Sensor Network', harchValue: '10,000+ sensors — real-time data', competitorValue: 'GPS on tractors only', harchWins: true },
              { label: 'Carbon Credit Revenue', harchValue: 'Yes — farmer earns from carbon', competitorValue: 'None', harchWins: true },
              { label: 'Water Management', harchValue: '60% reduction — AI irrigation', competitorValue: 'None — no water tech', harchWins: true },
              { label: 'Yield Increase', harchValue: '30% vs traditional', competitorValue: '227% income boost (via mechanization)', harchWins: true },
              { label: 'Cross-Vertical Integration', harchValue: 'Harch Energy + Water + Technology + Intelligence', competitorValue: 'None — standalone platform', harchWins: true },
              { label: 'Drone Surveillance', harchValue: '50+ autonomous drones', competitorValue: 'None', harchWins: true },
              { label: 'Vertical Farming', harchValue: '3 facilities under development', competitorValue: 'None', harchWins: true },
              { label: 'Open Source AgTech SDK', harchValue: 'HarchOS Agri SDK — open developer tools', competitorValue: 'None — no developer tools', harchWins: true },
              { label: 'African Job Creation', harchValue: '500+ direct jobs across 5 sites', competitorValue: '~100 — Nigerian operations', harchWins: true },
              { label: 'Community Revenue Share', harchValue: '5% — local development', competitorValue: '0% disclosed', harchWins: true },
            ],
            verdict: 'Hello Tractor connects 2.5M farmers to tractors. Harch Agri connects farmers to the entire precision agriculture stack — drones, IoT, irrigation, vertical farms, and carbon credits — backed by 4 other Harch subsidiaries. Tractor sharing is one feature. We are the platform.',
          },
          {
            name: 'OCP Group / Al Moutmir',
            country: 'Morocco',
            founded: '1920',
            revenue: '$11.4B (2025)',
            metrics: [
              { label: 'Integrated Product Stack', harchValue: '5 products (Drone+IoT+Vertical+Carbon+Kit)', competitorValue: '1 product (precision fertilization)', harchWins: true },
              { label: 'Drone-as-a-Service', harchValue: 'Yes — $50/ha/month DaaS', competitorValue: 'None — no drone service', harchWins: true },
              { label: 'Carbon Credit Revenue', harchValue: 'Native Carbon API — real-time', competitorValue: 'None — no carbon capability', harchWins: true },
              { label: 'Vertical Farming', harchValue: '3 facilities — premium produce', competitorValue: 'None — no vertical farms', harchWins: true },
              { label: 'IoT Irrigation', harchValue: 'Full stack — sensors + AI + LoRaWAN', competitorValue: 'Limited — fertilizer advisory only', harchWins: true },
              { label: 'Cross-Vertical Synergy', harchValue: 'Harch Energy + Water + Technology + Intelligence', competitorValue: 'Fertilizer + advisory — no tech stack', harchWins: true },
              { label: 'Starter Kit Price', harchValue: '$200 — eliminates adoption barrier', competitorValue: 'Free — but fertilizer-dependent', harchWins: true },
              { label: 'Innovation Speed', harchValue: 'Startup agility — ship fast', competitorValue: 'State-owned — slow iteration', harchWins: true },
              { label: 'Open Source AgTech SDK', harchValue: 'HarchOS Agri SDK — open developer tools', competitorValue: 'None — state-owned, no SDK', harchWins: true },
              { label: 'African Job Creation', harchValue: '500+ direct jobs across 5 sites', competitorValue: '20,000+ — OCP workforce', harchWins: true },
              { label: 'Community Revenue Share', harchValue: '5% — local development', competitorValue: '0% disclosed', harchWins: true },
            ],
            verdict: 'OCP is a partner, not a competitor. They have 580K farmers and the world\'s best phosphate. HarchAgri brings drones, IoT, carbon credits, and vertical farms that OCP cannot build. Together we are unstoppable. Separate, OCP lacks tech. We complement.',
          },
          {
            name: 'Apollo Agriculture',
            country: 'Kenya',
            founded: '2016',
            revenue: 'Not public',
            metrics: [
              { label: 'Technology Depth', harchValue: '5 integrated products', competitorValue: '1 product (agricultural credit)', harchWins: true },
              { label: 'Carbon Credits', harchValue: 'Native API — Verra VCS + Gold Standard', competitorValue: 'None — no carbon capability', harchWins: true },
              { label: 'Drone-as-a-Service', harchValue: 'Yes — $50/ha/month', competitorValue: 'None', harchWins: true },
              { label: 'IoT Irrigation', harchValue: 'Full stack — 10,000+ sensors', competitorValue: 'None — credit platform only', harchWins: true },
              { label: 'Vertical Farming', harchValue: '3 facilities — premium produce', competitorValue: 'None', harchWins: true },
              { label: 'Cross-Vertical Synergy', harchValue: '4 Harch subsidiaries', competitorValue: 'None — standalone credit', harchWins: true },
              { label: 'Credit Default Risk', harchValue: 'IoT data reduces default 40%', competitorValue: 'Mobile/satellite ML scoring', harchWins: true },
              { label: 'Geographic Reach', harchValue: '5 countries — Morocco + West Africa', competitorValue: '2 countries — Kenya + Zambia', harchWins: true },
              { label: 'Open Source AgTech SDK', harchValue: 'HarchOS Agri SDK — open developer tools', competitorValue: 'None — credit platform only', harchWins: true },
              { label: 'African Job Creation', harchValue: '500+ direct jobs across 5 sites', competitorValue: '~50 — Kenya/Zambia ops', harchWins: true },
              { label: 'Community Revenue Share', harchValue: '5% — local development', competitorValue: '0% disclosed', harchWins: true },
            ],
            verdict: 'Apollo validates ML credit scoring for African farmers. HarchAgri validates the entire precision agriculture stack — with IoT sensor data that makes credit scoring 40% more accurate than Apollo\'s mobile-based model. Better data, better credit, better farming.',
          },
        ]}
      />

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          COMPETITIVE ADVANTAGE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Competitive Advantage</p>
            <TextReveal text="Three Structural Moats" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-12" />
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {data.moats.map((moat) => {
              const Icon = moat.icon;
              return (
                <StaggerItem key={moat.title}>
                  <Card3D className="p-8 h-full">
                    <div className={`w-10 h-10 rounded-lg bg-[rgba(${ACCENT_RGB},0.08)] flex items-center justify-center mb-5`}>
                      <Icon size={18} className={`text-[${ACCENT}]`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{moat.title}</h3>
                    <div className="accent-line mb-4" />
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{moat.desc}</p>
                  </Card3D>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          SUSTAINABILITY & ESG
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center px-8 md:px-16 py-20 order-2 lg:order-1">
              <div className="max-w-lg">
                <FadeIn direction="right">
                  <p className="section-label mb-4 text-[#4A7B5F]">Sustainability &amp; ESG</p>
                  <TextReveal text="Sustainability Is the Business Model" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
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

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          PARTNERSHIPS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Partnerships</p>
            <TextReveal text="Strategic Partners" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Selective, symbiotic partnerships — each partner brings a capability HarchAgri lacks; HarchAgri brings the technology and carbon credits they don&apos;t have.
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {data.partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <Card3D className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                      <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold ${
                      partner.status === 'Active' ? `bg-[rgba(${ACCENT_RGB},0.08)] text-[${ACCENT}]` : 'bg-[rgba(255,255,255,0.04)] text-[#666666]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.status === 'Active' ? `bg-[${ACCENT}]` : 'bg-[#666666]'}`} />
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
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Roadmap</p>
            <TextReveal text="Four Phases to Continental Leadership" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
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
                      <div className={`w-[7px] h-[7px] rounded-full bg-[${ACCENT}]`} />
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
                              <CountUp to={phase.hectares} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Hectares</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-white stat-mono">
                              <CountUp to={phase.farmers} />
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
                                <div className={`mt-1.5 w-1 h-1 rounded-full bg-[rgba(${ACCENT_RGB},0.4)] flex-shrink-0`} />
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

          {/* Phase 1 Budget Detail */}
          <FadeIn delay={0.5}>
            <div className="mt-12 card overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">Phase 1</span>
                  <span className="text-[10px] text-[#666666]">—</span>
                  <span className="text-[13px] font-bold text-white">Detailed Action Plan & Budget</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Timeline</th>
                      <th>Budget</th>
                      <th>KPI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { action: 'Deploy 2 DJI Agras drones', timeline: 'Q1 2026', budget: '$16,000', kpi: '2 drones operational' },
                      { action: 'Install 30 IoT sensors', timeline: 'Q1 2026', budget: '$15,000', kpi: '5 pilot plots connected' },
                      { action: 'Recruit 3 agronomists', timeline: 'Q1 2026', budget: '$36,000/yr', kpi: 'Field operations team' },
                      { action: 'Integrate Carbon API', timeline: 'Q2 2026', budget: 'Internal', kpi: 'Auto CO2 calculation' },
                      { action: 'Deploy 5 vertical farm containers', timeline: 'Q3 2026', budget: '$250,000', kpi: '5 containers operational' },
                      { action: 'Obtain Verra certification', timeline: 'Q4 2026', budget: '$20,000', kpi: 'Methodology approved' },
                      { action: 'Measure impact & report', timeline: 'Q4 2026', budget: '$10,000', kpi: 'NPS > 70, ROI > 100%' },
                    ].map((row) => (
                      <tr key={row.action}>
                        <td>{row.action}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.timeline}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.budget}</td>
                        <td className="!text-[#999999] !font-normal">{row.kpi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
                <span className="text-[11px] text-[#666666]">Total Phase 1 investment: ~$347,000 — Self-funded by Harch Corp</span>
                <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">AUTO-FINANCED</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          RISKS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Risk Analysis</p>
            <TextReveal text="Identified Risks & Mitigations" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
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

      <SectionDivider />

      {/* ═══════════════════════════════════════════
          DEPLOYMENTS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#4A7B5F]">Deployments</p>
            <TextReveal text="Five Sites in Morocco" className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4" />
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Each site covers a 100km radius for drone and IoT operations. Morocco&apos;s Generation Green strategy (2020-2030) provides institutional support, OCP&apos;s Al Moutmir program brings a 580K farmer ecosystem. Expansion to Senegal, Kenya, and Ghana in Phase 3.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.06}>
            {data.locations.map((loc) => (
              <StaggerItem key={loc.city}>
                <Card3D className="p-5 text-center">
                  <MapPin size={14} className={`text-[${ACCENT}] mx-auto mb-2`} />
                  <p className="text-[13px] font-semibold text-white">{loc.city}</p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{loc.region}</p>
                  <p className="text-[9px] text-[#999999] mt-1">{loc.crops}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

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
            <p className="section-label mb-4 text-[#4A7B5F]">Phase 1 Investment</p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
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
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-[-0.01em] mb-6">Let&apos;s Build Together</h2>
            <p className="max-w-xl mx-auto text-[15px] text-[#666666] leading-[1.7] mb-12">Partnership inquiries, investment, and pilot programs. HarchAgri is looking for farmers, governments, and investors who share our vision for African agricultural sovereignty.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all min-h-[44px]">
                  Get Started <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/investors" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all min-h-[44px]">
                  Investor Details
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
      <InteractivePlatform slug="agriculture" />
    </div>
  );
}
