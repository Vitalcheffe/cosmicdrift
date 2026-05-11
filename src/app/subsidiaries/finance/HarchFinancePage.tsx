'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Landmark, TrendingUp, Shield, Globe, FileText,
  Leaf, Handshake, Building2, Scale, PiggyBank, BarChart3,
  Clock, AlertTriangle, DollarSign, Wallet, Target, Lock,
  Banknote, CreditCard, Coins, ShieldCheck, MapPin, Users,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   HARCH FINANCE — HarchCorp Unified Design System
   Site palette — Amber accent (#8B9DAF) — Shared CSS classes
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
   DATA — Strictly Harch Finance content
   ═══════════════════════════════════════════════════ */

const data = {
  name: 'Harch Finance',
  version: '/0.8',
  heroTitle: "Financing Africa's\nIndustrial\nTransformation",
  heroSubtitle: "Structuring capital flows for sovereign infrastructure — from green bonds to project finance across 7 verticals",
  heroImage: '/images/sections/comp-finance-const.jpg',

  overview: "Africa's infrastructure financing gap exceeds $100 billion annually. Traditional development finance institutions and commercial banks struggle to structure instruments that match the continent's unique risk profiles — political volatility, currency exposure, and long project horizons deter conventional capital. Harch Finance exists to bridge this gap. As the financial engine of Harch Corp's 7-vertical industrial conglomerate, we structure capital flows that transform sovereign ambition into built reality — from green bonds funding renewable energy installations to sukuk instruments mobilizing Islamic capital for cement plants. Our cross-vertical integration enables risk management no standalone financial institution can replicate: revenue streams from energy, mining, cement, agriculture, and water operations create natural hedges that de-risk individual projects and attract capital at lower cost.",

  investmentPhilosophy: "Our philosophy is rooted in a single principle: sovereign capital for sovereign infrastructure. Africa does not need charity — it needs financial architecture that respects national sovereignty while attracting global capital at competitive rates. Harch Finance structures every instrument around this principle: local currency financing where possible, sovereign wealth fund partnerships that align interests, and ECA-backed structures that reduce political risk without surrendering control. The result is a financing model where capital serves infrastructure, not the other way around. Every bond we issue, every trade facility we structure, every sukuk we originate creates productive assets on African soil — generating returns for investors while building the industrial base the continent requires.",

  metrics: [
    { value: 2.4, prefix: '$', suffix: 'B', label: 'Investment Pipeline' },
    { value: 7, prefix: '', suffix: '', label: 'Verticals Covered' },
    { value: 5, prefix: '', suffix: '', label: 'Countries Active' },
    { value: 25000, prefix: '', suffix: '+', label: 'Jobs Target' },
  ],

  financialInstruments: [
    {
      icon: Leaf,
      name: 'Green Bonds',
      tagline: 'Climate-Linked Debt Origination',
      description: "IGB-certified green bonds funding renewable energy, sustainable cement, and low-carbon agriculture across Harch Corp's verticals. Each bond is backed by verifiable ESG metrics — from Harch Energy's 81.5% renewable generation to HarchAgri's carbon credit revenue. Our green bond framework aligns with ICMA Green Bond Principles and is verified by independent second-party opinions, enabling access to the $500+ billion global green bond market at favorable spreads.",
      features: [
        'ICMA Green Bond Principles aligned',
        'Independent second-party verification',
        'ESG-linked coupon step-downs',
        'Cross-vertical revenue backing',
        'Annual impact reporting with KPIs',
      ],
      stats: [
        { label: 'Market Size', value: '$500B+' },
        { label: 'Spread Advantage', value: '15-25bps' },
        { label: 'Tenor', value: '5-15yr' },
      ],
    },
    {
      icon: Landmark,
      name: 'Project Finance',
      tagline: 'Non-Recourse Structured Finance',
      description: "Non-recourse and limited-recourse project finance structures for Harch Corp's capital-intensive verticals — cement plants, mining operations, data centers, and water infrastructure. Each SPV is ring-fenced with dedicated revenue streams, off-take agreements, and insurance wraps. Our project finance expertise spans the full lifecycle: from financial modeling and due diligence through syndication, closing, and post-financing covenant management.",
      features: [
        'Non-recourse SPV structures',
        'Off-take agreement backing',
        'MIGA political risk insurance',
        'Phased drawdown mechanisms',
        'Dedicated escrow and reserve accounts',
      ],
      stats: [
        { label: 'Avg Tenor', value: '7-12yr' },
        { label: 'LTV Ratio', value: '60-75%' },
        { label: 'DSCR Target', value: '>1.3x' },
      ],
    },
    {
      icon: CreditCard,
      name: 'Trade Finance',
      tagline: 'Cross-Border Commodity Finance',
      description: "End-to-end trade finance facilities for Harch Corp's import and export operations — from cement and clinker shipments to agricultural commodity flows. Letters of credit, documentary collections, and supply chain financing structured through Moroccan and international banking partners. Morocco's double taxation treaties with 60+ countries and its growing network of free trade agreements create unique structural advantages for trade finance origination.",
      features: [
        'LC issuance and confirmation',
        'Supply chain financing programs',
        'Commodity hedging integration',
        '60+ DTA network leverage',
        'Morocco FTA advantages',
      ],
      stats: [
        { label: 'DTA Network', value: '60+' },
        { label: 'Facility Size', value: '$50-200M' },
        { label: 'Settlement', value: 'T+1' },
      ],
    },
    {
      icon: Coins,
      name: 'Islamic Finance (Sukuk)',
      tagline: 'Sharia-Compliant Capital Markets',
      description: "Sukuk structures that mobilize Islamic capital — an estimated $4 trillion global pool — for African infrastructure. Ijarah (lease-backed), Musharakah (joint venture), and Murabahah (cost-plus) sukuk tailored to each vertical's cash flow profile. Morocco's 2015 Islamic finance legislation and the establishment of participatory banks create a domestic regulatory framework for sukuk origination, positioning Harch Finance as a bridge between Gulf Islamic capital and African industrial opportunity.",
      features: [
        'Ijarah, Musharakah, Murabahah structures',
        'Sharia supervisory board oversight',
        'Morocco participatory bank framework',
        'GCC investor roadshow capability',
        'Dual-listing (Casablanca + Dubai)',
      ],
      stats: [
        { label: 'Global Pool', value: '$4T' },
        { label: 'Target Coupon', value: '5-7%' },
        { label: 'Tenor', value: '5-10yr' },
      ],
    },
    {
      icon: Target,
      name: 'Impact Investment',
      tagline: 'SDG-Aligned Return Optimization',
      description: "Impact-first investment vehicles that generate measurable social and environmental returns alongside competitive financial returns. Every Harch Finance impact vehicle is mapped to specific UN Sustainable Development Goals — SDG 7 (Clean Energy), SDG 8 (Decent Work), SDG 9 (Industry & Infrastructure), SDG 13 (Climate Action) — with quarterly impact reporting and independent verification. Our 25,000+ jobs target is not aspirational; it is a covenant in every impact vehicle we structure.",
      features: [
        'SDG-aligned impact frameworks',
        'Quarterly impact reporting',
        'IMP/NLP impact measurement',
        'Jobs covenant — 25,000+ target',
        'Independent impact verification',
      ],
      stats: [
        { label: 'SDGs Mapped', value: '4' },
        { label: 'Jobs Covenant', value: '25K+' },
        { label: 'IRR Target', value: '15-20%' },
      ],
    },
    {
      icon: Banknote,
      name: 'Carbon Credit Monetization',
      tagline: 'Emissions-to-Revenue Pipeline',
      description: "Forward monetization of carbon credits generated across Harch Corp's verticals — from Harch Energy's renewable generation offsets to HarchAgri's agricultural sequestration credits. The Carbon API calculates, certifies, and tokenizes credits via Verra (VCS) and Gold Standard registries, enabling forward sale agreements and carbon-backed securitization. With the ACMI initiative targeting 20x growth in African carbon credits by 2030, Harch Finance's carbon credit monetization desk transforms emissions reductions into upfront capital for project development.",
      features: [
        'Native Carbon API integration',
        'Verra VCS + Gold Standard certified',
        'Forward sale agreements',
        'Carbon-backed securitization',
        'ACMI-aligned — 20x growth by 2030',
      ],
      stats: [
        { label: 'Credit Value/yr', value: '$2M+' },
        { label: 'Growth Target', value: '20x' },
        { label: 'Standards', value: 'VCS+GS' },
      ],
    },
  ],

  partnershipModels: [
    {
      icon: Handshake,
      title: 'Co-Investment',
      desc: "Joint investment alongside strategic partners — sovereign wealth funds, DFIs, and institutional investors — with Harch Finance as anchor originator and co-investor. Our co-investment model aligns interests: Harch Corp contributes operational expertise and cross-vertical synergies, while partners bring capital and global networks. Profit-sharing mechanisms ensure that returns are distributed proportionally to risk and contribution.",
    },
    {
      icon: Shield,
      title: 'ECA-Backed Financing',
      desc: "Export credit agency-backed financing structures that de-risk projects for commercial lenders and investors. ECA coverage — from institutions like Euler Hermes, SACE, and COFACE — provides political risk insurance and payment guarantees that reduce spreads by 50-100 basis points and extend tenors to 12+ years. Morocco's strategic relationships with European ECAs create a privileged channel for originating ECA-backed facilities.",
    },
    {
      icon: Building2,
      title: 'Sovereign Wealth Fund Partnerships',
      desc: "Strategic partnerships with Gulf and Asian sovereign wealth funds seeking African infrastructure exposure. Long-duration, patient capital that matches the 10-20 year horizon of industrial infrastructure. Harch Finance structures dedicated co-investment vehicles with preferred return waterfalls, governance rights, and quarterly reporting. Target partners include UAE (Mubadala/ADIA), Saudi Arabia (PIF), and Singapore (GIC/Temasek).",
    },
    {
      icon: Globe,
      title: 'DFI Partnerships',
      desc: "Development finance institution partnerships that provide concessional capital, technical assistance, and catalytic first-loss tranches. IFC, AfDB, EBRD, FMO, and CDC/British International Investment each bring unique advantages — from IFC's global network to AfDB's African mandate. Harch Finance layers DFI capital beneath commercial tranches to optimize the capital stack and reduce blended cost of capital by 200-400 basis points.",
    },
  ],

  strategicAdvantages: [
    {
      icon: Scale,
      title: "Morocco's Regulatory Framework",
      desc: "Morocco's financial regulatory environment is Africa's most advanced for structured finance. The country's 2015 Islamic finance legislation created a legal framework for participatory banks and sukuk origination. AMMC (Autorité Marocaine du Marché des Capitaux) securities regulation aligns with EU standards, enabling dual-listing on Casablanca and European exchanges. Bank Al-Maghrib's prudent supervision provides investor confidence without the over-regulation that stifles innovation in other jurisdictions.",
    },
    {
      icon: FileText,
      title: 'Double Taxation Treaties',
      desc: "Morocco maintains double taxation agreements with 60+ countries — the most extensive network in North Africa. These treaties eliminate withholding tax on interest and dividend payments, creating significant tax efficiency for international investors. For a green bond issued through a Moroccan SPV, the DTA network can reduce investor tax drag by 15-30%, translating directly into lower coupon requirements and reduced cost of capital for Harch Corp's projects.",
    },
    {
      icon: ShieldCheck,
      title: 'MIGA Coverage',
      desc: "World Bank MIGA (Multilateral Investment Guarantee Agency) political risk insurance is available for projects in Morocco and across our target markets. MIGA coverage eliminates political risk — expropriation, currency inconvertibility, war & civil disturbance — that otherwise adds 200-400 basis points to the cost of capital. Harch Finance integrates MIGA applications into every project finance structure, converting political risk premium into lower borrowing costs.",
    },
    {
      icon: Landmark,
      title: 'OHI Compliance',
      desc: "Compliance with the Organisation for Islamic Cooperation's (OIC) Islamic finance standards positions Harch Finance to access the $4 trillion global Islamic capital pool. Morocco's membership in the OIC and its domestic Islamic finance legislation create a compliant origination platform. OHI compliance is not merely regulatory — it is a market access strategy that unlocks Gulf and Southeast Asian institutional capital unavailable to conventional-only financial institutions.",
    },
  ],

  riskManagement: [
    {
      icon: Shield,
      title: 'Political Risk Insurance',
      desc: "Comprehensive political risk coverage through MIGA, sovereign guarantee programs, and private market insurers (AXA XL, Chubb). Coverage includes expropriation, currency inconvertibility, political violence, and breach of contract. Every cross-border investment is wrapped in political risk insurance appropriate to the jurisdiction, reducing the risk premium embedded in required returns by 200-400 basis points.",
      riskLevel: 'Covered',
    },
    {
      icon: BarChart3,
      title: 'Currency Hedging',
      desc: "Structured hedging programs that mitigate FX exposure across our 5-country operating footprint. Forward contracts, cross-currency swaps, and natural hedging through local revenue generation in each operating currency. Morocco's pegged dirham (to a euro-dollar basket) provides a stable base currency, while NDF markets for West African currencies (CFA franc is already euro-pegged) reduce hedging costs versus floating-rate African currencies.",
      riskLevel: 'Actively Managed',
    },
    {
      icon: FileText,
      title: 'Off-Take Agreements',
      desc: "Binding off-take agreements with creditworthy counterparties that guarantee revenue streams for project-financed SPVs. Cement off-take with government infrastructure agencies, energy PPAs with utility counterparts, agricultural purchase agreements with food processors — each off-take agreement converts projected revenue into contractual cash flows, enabling non-recourse financing at lower spreads and higher LTV ratios.",
      riskLevel: 'Contracted',
    },
    {
      icon: Lock,
      title: 'Cross-Vertical Risk Diversification',
      desc: "Harch Finance's unique advantage: revenue diversification across 7 verticals creates a natural hedge no standalone financial institution can replicate. When commodity prices fall, infrastructure demand rises. When energy costs increase, our own renewable generation offsets the impact. When currency depreciates in one market, exports from another become more competitive. This cross-vertical diversification reduces portfolio volatility by 30-40% versus single-sector investment.",
      riskLevel: 'Structural Advantage',
    },
  ],

  pipeline: [
    { vertical: 'Harch Intelligence', instrument: 'Green Bond', amount: '$400M', status: 'Structuring', country: 'Morocco' },
    { vertical: 'Harch Cement', instrument: 'Project Finance', amount: '$200M', status: 'Mandated', country: 'Gambia' },
    { vertical: 'Harch Energy', instrument: 'Sukuk (Ijarah)', amount: '$350M', status: 'Pre-mandate', country: 'Morocco' },
    { vertical: 'HarchAgri', instrument: 'Impact Vehicle', amount: '$50M', status: 'Fundraising', country: 'Morocco + Senegal' },
    { vertical: 'Harch Mining', instrument: 'ECA-Backed', amount: '$180M', status: 'Pre-mandate', country: 'Morocco' },
    { vertical: 'Harch Water', instrument: 'DFI Blended Finance', amount: '$120M', status: 'Concept', country: 'Kenya' },
    { vertical: 'Cross-Vertical', instrument: 'Carbon Credit Securitization', amount: '$100M', status: 'Concept', country: 'Multi-country' },
  ],

  roadmap: [
    {
      phase: 'Phase 1', period: '2026', title: 'Foundation & First Origination',
      pipelineTarget: '$200M',
      actions: [
        'Establish Harch Finance as a registered financial advisory entity in Casablanca Finance City',
        'Originate first green bond for Harch Intelligence ($400M pipeline entry)',
        'Structure ECA-backed financing for Harch Cement Gambia project',
        'Build relationships with 5 DFI partners (IFC, AfDB, EBRD, FMO, BII)',
        'Hire core team: 8 professionals across origination, structuring, and risk',
        'Obtain AMMC license for securities origination and advisory',
      ],
    },
    {
      phase: 'Phase 2', period: '2027-2028', title: 'Scale & Diversification',
      pipelineTarget: '$800M',
      actions: [
        'Close Harch Intelligence green bond — first African AI infrastructure green bond',
        'Originate first sukuk for Harch Energy renewable portfolio',
        'Launch impact investment vehicle for HarchAgri with 25,000 jobs covenant',
        'Establish carbon credit monetization desk with forward sale capability',
        'Expand team to 20 professionals; open representative office in Dubai (DIFC)',
        'Cross-vertical pipeline reaches $800M across 5 instrument types',
      ],
    },
    {
      phase: 'Phase 3', period: '2028-2029', title: 'Capital Markets Integration',
      pipelineTarget: '$1.6B',
      actions: [
        'List first green bond on Casablanca Stock Exchange with dual-listing on Euronext',
        'Originate cross-vertical blended finance facility with DFI first-loss tranche',
        'Launch carbon credit securitization vehicle — first of its kind in Africa',
        'Establish sovereign wealth fund co-investment program with 3 GCC partners',
        'Expand to Kenya and Ghana with locally-structured financing vehicles',
        'Portfolio AUM crosses $1B; team scales to 35 professionals',
      ],
    },
    {
      phase: 'Phase 4', period: '2029-2031', title: 'Continental Financial Platform',
      pipelineTarget: '$2.4B+',
      actions: [
        'Full capital markets platform: bonds, sukuk, trade finance, impact, carbon — all verticals',
        'Harch Finance becomes the reference African infrastructure financing institution',
        'Cross-vertical integration enables 200-400bps cost of capital advantage vs. standalone competitors',
        'Carbon credit portfolio generates $10M+ annual revenue from monetization desk',
        'Positioning for independent listing or strategic partnership with global investment bank',
        '10 countries, 7 verticals, $2.4B+ pipeline — the financial engine of African industrialization',
      ],
    },
  ],

  risks: [
    { risk: 'Regulatory changes in Islamic finance frameworks', probability: 'Low', impact: 'High', mitigation: 'Proactive engagement with AMMC and Bank Al-Maghrib. Legal opinions from two independent Sharia supervisory boards. Diversified instrument portfolio reduces dependency on any single regulatory regime.' },
    { risk: 'Currency depreciation in operating markets', probability: 'Medium', impact: 'High', mitigation: 'Natural hedging through local revenue generation. CFA franc peg to euro provides stability in Senegal and Gambia. Forward contracts and cross-currency swaps for non-pegged currencies.' },
    { risk: 'Political risk in cross-border operations', probability: 'Medium', impact: 'Critical', mitigation: 'MIGA political risk insurance for all cross-border investments. Sovereign guarantee programs. Diversified country portfolio reduces concentration risk.' },
    { risk: 'Green bond / sukuk market liquidity', probability: 'Low', impact: 'Medium', mitigation: 'Dual-listing on Casablanca and European exchanges. Market-making arrangements with primary dealers. Strong ESG credentials attract buy-and-hold institutional investors.' },
    { risk: 'Carbon credit market volatility', probability: 'High', impact: 'Medium', mitigation: 'Forward sale agreements lock in pricing. Verra and Gold Standard certification provides premium pricing. Carbon credit revenue is supplementary, not primary — no dependency.' },
    { risk: 'Talent acquisition in structured finance', probability: 'Medium', impact: 'Medium', mitigation: 'Casablanca Finance City status enables competitive hiring. Partnership with Moroccan business schools. Flexible work arrangements attract diaspora talent from London and Paris.' },
  ],
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE — HarchCorp unified design, amber accent
   ═══════════════════════════════════════════════════ */
export default function HarchFinancePage() {
  return (
    <div className="bg-[#1A1A1A] text-white">
      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt="Harch Finance — Financing Africa's Industrial Transformation"
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Harch Finance /0.8</p>
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
                <p className="section-label mb-4 text-[#8B9DAF]">Overview</p>
                <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                  Bridging Africa&apos;s<br />Financing Gap
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
          INVESTMENT PHILOSOPHY — Photo + Text
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/sections/comp-finance-const.jpg"
                alt="Harch Finance investment philosophy"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="max-w-lg">
                <FadeIn>
                  <p className="section-label mb-4 text-[#8B9DAF]">Investment Philosophy</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                    Sovereign Capital for Sovereign Infrastructure
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.investmentPhilosophy}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINANCIAL INSTRUMENTS — The 6 Pillars
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Financial Instruments</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Six Capital Architecture Pillars
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Each instrument serves a distinct capital need. Together, they create a comprehensive financing platform that no standalone financial institution on the continent can match — powered by cross-vertical integration and Morocco&apos;s regulatory advantages.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.financialInstruments.map((instrument, i) => {
              const Icon = instrument.icon;
              return (
                <FadeIn key={instrument.name} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                          <Icon size={18} className="text-[#8B9DAF]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{instrument.name}</h3>
                          <p className="text-[11px] text-[#666666]">{instrument.tagline}</p>
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">{instrument.description}</p>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {instrument.stats.map((stat, j) => (
                        <div key={j} className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                          <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
                          <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {instrument.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-[#8B9DAF]/40 flex-shrink-0" />
                          <span className="text-[12px] text-[#999999]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PIPELINE TABLE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Pipeline</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">$2.4B Investment Pipeline</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Seven live opportunities across Harch Corp&apos;s verticals — each structured with the optimal instrument for its risk profile, cash flow characteristics, and capital requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vertical</th>
                      <th>Instrument</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pipeline.map((row) => (
                      <tr key={row.vertical + row.instrument}>
                        <td>{row.vertical}</td>
                        <td>{row.instrument}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.amount}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${
                            row.status === 'Structuring' || row.status === 'Mandated'
                              ? 'bg-[rgba(139,157,175,0.12)] text-[#8B9DAF]'
                              : row.status === 'Fundraising' || row.status === 'Pre-mandate'
                              ? 'bg-[rgba(255,255,255,0.06)] text-[#999999]'
                              : 'bg-[rgba(255,255,255,0.03)] text-[#666666]'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              row.status === 'Structuring' || row.status === 'Mandated'
                                ? 'bg-[#8B9DAF]'
                                : row.status === 'Fundraising' || row.status === 'Pre-mandate'
                                ? 'bg-[#999999]'
                                : 'bg-[#666666]'
                            }`} />
                            {row.status}
                          </span>
                        </td>
                        <td className="!text-[#666666] !font-normal">{row.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[10px] text-[#666666]">Pipeline values are indicative and subject to market conditions, regulatory approvals, and counterparty negotiations. Updated Q1 2026.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNERSHIP MODELS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Partnership Models</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Four Paths to Co-Investment
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Harch Finance structures partnerships that align incentives, share risk, and optimize returns — from sovereign wealth fund co-investments to DFI-blended facilities that catalyze commercial capital.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.partnershipModels.map((model, i) => {
              const Icon = model.icon;
              return (
                <FadeIn key={model.title} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                        <Icon size={18} className="text-[#8B9DAF]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{model.title}</h3>
                    </div>
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{model.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC ADVANTAGES
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Strategic Advantages</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Morocco&apos;s Financial Infrastructure
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Four structural advantages that no other African jurisdiction can replicate — creating a financing platform with built-in cost of capital reductions of 200-400 basis points.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.strategicAdvantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <FadeIn key={adv.title} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                        <Icon size={18} className="text-[#8B9DAF]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{adv.title}</h3>
                    </div>
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{adv.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Cross-Vertical Integration Highlight */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8 border-dashed" style={{ borderColor: 'rgba(139,157,175,0.25)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} className="text-[#8B9DAF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Cross-Vertical Integration — Unique Risk Management</h3>
                  <p className="text-[14px] text-[#999999] leading-[1.7]">
                    Harch Finance&apos;s key differentiator is cross-vertical integration. Revenue streams from energy, mining, cement, agriculture, technology, and water operations create natural hedges that de-risk individual projects and attract capital at lower cost. When commodity prices fall, infrastructure demand rises. When energy costs increase, our own renewable generation offsets the impact. This diversification reduces portfolio volatility by 30-40% versus single-sector investment — a structural advantage no standalone financial institution can replicate.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RISK MANAGEMENT
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Risk Management</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Four-Layer Risk Architecture
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Every Harch Finance instrument is protected by four layers of risk management — from political risk insurance to cross-vertical diversification. The result: capital protection that matches the best global standards while operating in markets others consider too risky.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.riskManagement.map((rm, i) => {
              const Icon = rm.icon;
              return (
                <FadeIn key={rm.title} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center">
                          <Icon size={18} className="text-[#8B9DAF]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{rm.title}</h3>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded bg-[rgba(139,157,175,0.08)] text-[#8B9DAF] font-[family-name:var(--font-space-mono)]">
                        {rm.riskLevel}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{rm.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              From Foundation to Platform
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Four phases, six years — from first green bond origination to becoming Africa&apos;s reference infrastructure financing institution.
            </p>
          </FadeIn>
          <div className="space-y-6">
            {data.roadmap.map((phase, i) => (
              <FadeIn key={phase.phase} delay={i * 0.08}>
                <div className="card p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.08)] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#8B9DAF] stat-mono">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                        <p className="text-[11px] text-[#666666]">{phase.phase} · {phase.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#666666] uppercase tracking-wider">Pipeline Target</p>
                      <p className="text-xl font-bold text-white stat-mono">{phase.pipelineTarget}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {phase.actions.map((action, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-[#8B9DAF]/40 flex-shrink-0" />
                        <span className="text-[12px] text-[#999999]">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RISK REGISTER
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Risk Register</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Identified Risks & Mitigations
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Prudent risk management requires transparent identification and mitigation. Every risk in Harch Finance&apos;s register has a specific, actionable mitigation strategy.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {data.risks.map((r, i) => (
              <FadeIn key={r.risk} delay={i * 0.06}>
                <div className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={14} className="text-[#8B9DAF]" />
                        <h3 className="font-bold text-white text-[15px]">{r.risk}</h3>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Probability</p>
                        <span className={`text-[11px] font-semibold ${
                          r.probability === 'High' ? 'text-red-400' :
                          r.probability === 'Medium' ? 'text-[#8B9DAF]' : 'text-green-400'
                        }`}>{r.probability}</span>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Impact</p>
                        <span className={`text-[11px] font-semibold ${
                          r.impact === 'Critical' ? 'text-red-400' :
                          r.impact === 'High' ? 'text-[#8B9DAF]' : 'text-green-400'
                        }`}>{r.impact}</span>
                      </div>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-[13px] text-[#999999] leading-[1.6]">
                        <span className="text-[10px] text-[#8B9DAF] uppercase tracking-wider font-bold">Mitigation:</span>{' '}
                        {r.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="section-label mb-4 text-[#8B9DAF]">Partner With Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Structure Africa&apos;s Next<br />Infrastructure Investment
            </h2>
            <div className="accent-line mx-auto mb-6" />
            <p className="max-w-xl mx-auto text-[15px] text-[#999999] leading-[1.7] mb-10">
              Whether you represent a sovereign wealth fund, development finance institution, ECA, or institutional investor — Harch Finance offers structured access to Africa&apos;s most compelling infrastructure investment pipeline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(139,157,175,0.4)] bg-[rgba(139,157,175,0.06)] text-[#8B9DAF] text-[11px] tracking-[0.1em] uppercase px-6 py-3 rounded-md font-semibold hover:bg-[rgba(139,157,175,0.12)] hover:border-[rgba(139,157,175,0.6)] transition-colors font-[family-name:var(--font-space-mono)]"
              >
                Partner With Us
                <ArrowRight size={12} />
              </Link>
              <Link
                href="/investors"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(255,255,255,0.5)] text-[11px] tracking-[0.1em] uppercase px-6 py-3 rounded-md font-semibold hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors font-[family-name:var(--font-space-mono)]"
              >
                Investor Relations
                <ArrowRight size={12} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
