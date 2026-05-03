'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cpu, Zap, Globe, Server, Shield, BarChart3, Clock, TrendingUp, Target, Layers, Activity, Database, Thermometer, Wind, Droplets, Satellite, Lock, Radio, Eye, Gauge, Factory, Mountain, Wheat, Waves } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  useEffect(() => { if (!isInView) return; const duration = 2500; const startTime = Date.now(); const step = () => { const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - progress, 4); setCount(eased * target); if (progress < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }, [isInView, target]);
  const format = () => { if (target >= 1000) return `${prefix}${Math.round(count).toLocaleString()}${suffix}`; if (target < 10) return `${prefix}${count.toFixed(1)}${suffix}`; return `${prefix}${Math.round(count)}${suffix}`; };
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

/* ─── SIDE-BY-SIDE SPLIT (Palantir style: text + image) ─── */
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

/* ─── STAT BAR ─── */
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

type IconType = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

interface SubsidiaryInfo {
  name: string; version: string; heroTitle: string; heroSubtitle: string; heroImage: string;
  sectionImage1: string; sectionImage2: string; sectionImage3: string; sectionImage4: string;
  overview: string; strategicContext: string; marketAnalysis: string; sustainability: string;
  investment: string;
  metrics: { value: number; prefix: string; suffix: string; label: string }[];
  capabilities: { icon: IconType; title: string; desc: string }[];
  specTable: { spec: string; value: string; phase: string }[];
  milestones: { year: string; title: string; desc: string }[];
  stats: { stat: string; value: number; max: number }[];
  location: string; locationDesc: string;
  strategicAdvantages: { title: string; desc: string }[];
  partnershipModel: { title: string; desc: string }[];
}

export default function SubsidiaryPageClient({ slug }: { slug: string }) {
  const subsidiaryData: Record<string, SubsidiaryInfo> = {
    intelligence: {
      name: 'Harch Intelligence', version: '/0.1',
      heroTitle: "Africa's Largest AI\nHyperscale Data Center",
      heroSubtitle: '500MW of sovereign AI compute infrastructure powering the continent\'s digital future',
      heroImage: '/images/sections/comp-intel-dc.jpg',
      sectionImage1: '/images/sections/comp-intel-server2.jpg',
      sectionImage2: '/images/sections/comp-intel-tech.jpg',
      sectionImage3: '/images/sections/intelligence-cooling.jpg',
      sectionImage4: '/images/sections/intelligence-submarine.jpg',
      overview: 'Harch Intelligence is building a 500MW AI-ready hyperscale data center in Dakhla, Morocco — powered entirely by renewable energy and designed to serve as the backbone of Africa\'s sovereign AI compute infrastructure. The facility will host next-generation GPU clusters, supporting large language model training and inference at continental scale, with direct submarine cable connectivity to Europe and the Americas. This is not merely a data center — it is the foundation of Africa\'s digital sovereignty, ensuring that the continent\'s data, compute, and AI capabilities remain under African control.',
      strategicContext: 'The global AI infrastructure race is accelerating, with over $300 billion invested in data center capacity in 2024 alone. Yet Africa, home to 1.4 billion people and the world\'s fastest-growing digital economy, hosts less than 1% of global data center capacity. This structural deficit forces African enterprises, governments, and researchers to rely on foreign infrastructure — creating dependencies that compromise data sovereignty, increase latency, and extract capital from the continent. Harch Intelligence directly addresses this imbalance by building sovereign AI compute capacity at the scale the continent demands. The 500MW facility in Dakhla positions Morocco as the gateway for AI compute between Europe and Africa, leveraging the country\'s exceptional renewable energy resources, strategic Atlantic coastline with submarine cable landing stations, and political stability.',
      marketAnalysis: 'Africa\'s cloud and data center market is projected to reach $15 billion by 2028, growing at 25% CAGR — the fastest growth rate globally. Key demand drivers include government data localization mandates sweeping across Nigeria, Kenya, South Africa, and Egypt; the explosive growth of African fintech processing over $500 billion annually; the expansion of AI-driven healthcare diagnostics serving 300 million patients; and the rise of sovereign AI initiatives from the African Union and regional bodies. Harch Intelligence\'s 500MW capacity captures a significant share of this demand while operating at cost structures 40-60% below European competitors, thanks to Dakhla\'s renewable energy costs of $0.03/kWh — among the lowest on the planet.',
      sustainability: 'Every aspect of Harch Intelligence is designed for minimal environmental impact and maximum sustainability. The facility runs on 100% renewable energy from Harch Energy\'s solar and wind installations, eliminating scope 2 emissions entirely. Our hybrid liquid-air cooling system achieves a PUE below 1.15 — among the most efficient in the global industry — while using seawater for heat rejection to minimize freshwater consumption. Waste heat from GPU clusters is captured and directed to adjacent agricultural greenhouses, creating a circular energy model. The facility\'s construction uses 40% recycled steel and low-carbon concrete from Harch Cement, while all electronic waste follows certified recycling protocols. We target LEED Platinum and BREEAM Outstanding certifications.',
      investment: '$800M',
      metrics: [
        { value: 500, prefix: '', suffix: 'MW+', label: 'Total Capacity' },
        { value: 50, prefix: '', suffix: 'K+', label: 'GPU Clusters' },
        { value: 100, prefix: '', suffix: '%', label: 'Renewable Powered' },
        { value: 800, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Server, title: 'Hyperscale Data Centers', desc: '500MW AI-ready data center in Dakhla designed for the most demanding compute workloads. Modular architecture allows capacity to scale from 100MW to 500MW in phases, with each module operating as an independent unit. The facility features redundant power paths, diverse fiber entrances, and N+1 cooling redundancy throughout. Every rack is pre-wired for liquid cooling, enabling deployment of next-generation GPUs without retrofitting.' },
        { icon: Cpu, title: 'GPU Clusters', desc: '50,000+ next-generation GPU clusters optimized for training and inference of large language models. Purpose-built for sovereign AI compute at continental scale, with dedicated high-bandwidth interconnects between compute pods. Our clusters support distributed training across 4,096-GPU partitions with linear scaling efficiency above 92%, enabling training of models exceeding 100 billion parameters.' },
        { icon: Zap, title: 'Renewable Energy Integration', desc: '100% powered by Harch Energy\'s solar and wind infrastructure through dedicated 400kV transmission lines. Zero-carbon electricity ensures ESG compliance and delivers cost advantages of 40-60% versus grid-powered facilities in Europe. On-site battery storage of 200MWh provides 4-hour backup for uninterrupted operations during grid transitions.' },
        { icon: Globe, title: 'Submarine Connectivity', desc: 'Direct connection to 4 submarine cable systems — including the Africa Coast to Europe (ACE), MainOne, and Maroc Telecom cables — providing ultra-low latency to Europe (8ms), the Americas (35ms), and the Middle East (20ms). Dual diverse landing stations ensure path redundancy for all international traffic.' },
        { icon: Shield, title: 'Sovereign Security', desc: 'End-to-end security from physical access to data encryption. The facility operates under a sovereign security framework with armed perimeter security, biometric access controls, and 24/7 surveillance. Harch Technology\'s cybersecurity suite provides sovereign-grade protection including DDoS mitigation, intrusion detection, and encrypted data pathways for sensitive compute workloads.' },
        { icon: BarChart3, title: 'AI Platform Services', desc: 'Full-stack AI platform from data ingestion to model deployment. Managed services for training, fine-tuning, and inference with enterprise SLAs guaranteeing 99.99% availability. The platform supports PyTorch, TensorFlow, and JAX natively, with pre-built MLOps pipelines for automated model lifecycle management.' },
      ],
      specTable: [
        { spec: 'Total Capacity', value: '500MW+', phase: 'Full build-out by 2028' },
        { spec: 'Phase 1', value: '100MW', phase: 'Q3 2027' },
        { spec: 'Phase 2', value: '200MW', phase: 'Q1 2028' },
        { spec: 'Phase 3', value: '500MW', phase: 'Q4 2028' },
        { spec: 'GPU Count', value: '50,000+', phase: 'At full capacity' },
        { spec: 'PUE', value: '<1.15', phase: 'Industry-leading efficiency' },
        { spec: 'Latency to Europe', value: '8ms', phase: 'Via submarine cable' },
        { spec: 'Cooling', value: 'Liquid + Air', phase: 'Hybrid cooling system' },
        { spec: 'Security', value: 'Tier IV+', phase: 'Sovereign-grade' },
        { spec: 'Energy Source', value: '100% Renewable', phase: 'Harch Energy supply' },
        { spec: 'Backup Power', value: '200MWh', phase: 'Battery + Diesel' },
        { spec: 'Network', value: '4 Submarine Cables', phase: 'Dual diverse paths' },
      ],
      milestones: [
        { year: '2025 Q1', title: 'Site Selection & Land Acquisition', desc: '50-hectare site secured in Dakhla Technology Park with options for 100-hectare expansion. Strategic location adjacent to submarine cable landing stations.' },
        { year: '2025 Q3', title: 'Engineering Design Complete', desc: 'Architecture and engineering design completed by Arup and Jacobs. Modular design validated for phased deployment from 100MW to 500MW.' },
        { year: '2026 Q2', title: 'Construction Phase 1 Begins', desc: 'Phase 1 ground-breaking. 100MW module construction starts with foundation, structural steel, and mechanical systems installation.' },
        { year: '2026 Q4', title: 'Power & Connectivity Infrastructure', desc: 'Dedicated 400kV transmission line from Harch Energy solar farm completed. Submarine cable landing station integration operational.' },
        { year: '2027 Q3', title: 'Phase 1 Live', desc: 'First 100MW module operational. Initial GPU clusters online with 10,000+ GPUs. Enterprise customers begin onboarding.' },
        { year: '2028 Q1', title: 'Phase 2 Online', desc: '200MW total capacity. Full enterprise customer base onboarded. AI platform services launched commercially.' },
        { year: '2028 Q4', title: 'Full Capacity Operational', desc: '500MW total. 50K+ GPUs. Continental AI backbone fully operational. Dakhla established as Africa\'s premier AI compute hub.' },
      ],
      stats: [
        { stat: 'Data Sovereignty', value: 100, max: 100 },
        { stat: 'Renewable Energy', value: 100, max: 100 },
        { stat: 'Cost Advantage vs EU', value: 55, max: 100 },
        { stat: 'Latency to Europe', value: 92, max: 100 },
      ],
      location: 'Dakhla, Morocco',
      locationDesc: 'Strategic location on the Atlantic coast with direct access to submarine cable landing stations and exceptional renewable energy resources. Dakhla offers over 3,000 hours of annual sunshine and consistent wind speeds averaging 8.5 m/s — creating ideal conditions for 100% renewable-powered operations.',
      strategicAdvantages: [
        { title: 'Energy Cost Leadership', desc: 'Electricity at $0.03/kWh from dedicated renewable installations — 40-60% below European data center energy costs. This structural advantage compounds annually, creating an ever-widening competitive moat.' },
        { title: 'Submarine Cable Hub', desc: 'Direct landing of 4 submarine cable systems provides the lowest-latency path between Africa, Europe, and the Americas. No other African location offers this combination of cable diversity and proximity to European financial centers.' },
        { title: 'Sovereign Data Jurisdiction', desc: 'Data processed within Moroccan jurisdiction under Africa\'s most advanced data protection framework. Full compliance with EU GDPR adequacy requirements while maintaining African data sovereignty.' },
        { title: 'Modular Scalability', desc: 'Phased deployment from 100MW to 500MW matches capacity to demand, minimizing capital risk while maintaining the option for rapid expansion. Each 100MW module is independently operational within 14 months of construction start.' },
      ],
      partnershipModel: [
        { title: 'GPU-as-a-Service', desc: 'Flexible compute provisioning with on-demand and reserved GPU capacity. Pay-per-use pricing with committed-use discounts for 1-3 year terms. Ideal for AI startups, research institutions, and enterprise ML teams.' },
        { title: 'Sovereign AI Cloud', desc: 'Dedicated infrastructure for government and defense workloads with sovereign security controls. Air-gapped deployment options, custom compliance frameworks, and guaranteed data residency within African jurisdiction.' },
        { title: 'Colocation Services', desc: 'Carrier-neutral colocation with direct cloud on-ramps to AWS, Azure, and GCP. Private suites from 500kW to 10MW with custom power densities up to 150kW per rack for AI training clusters.' },
        { title: 'Strategic Partnerships', desc: 'Joint venture structures for sovereign wealth funds, development finance institutions, and strategic technology partners. Equity participation with preferred access to capacity and governance rights.' },
      ],
    },
    cement: {
      name: 'Harch Cement', version: '/0.2',
      heroTitle: "Building West Africa's\nFuture",
      heroSubtitle: '500kT/yr cement production serving the construction boom with vertically integrated operations',
      heroImage: '/images/sections/comp-cement-const.jpg',
      sectionImage1: '/images/sections/comp-cement-mixer.jpg',
      sectionImage2: '/images/sections/cement-factory.jpg',
      sectionImage3: '/images/sections/cement-quarry.jpg',
      sectionImage4: '/images/sections/cement-kiln.jpg',
      overview: 'Harch Cement is developing a 500kT/yr cement production facility in Gambia, serving West Africa\'s construction boom with vertically integrated operations from quarry to delivery. Our model captures the full value chain — from limestone extraction through clinker production to finished cement distribution — creating structural cost advantages of 30-50% versus import-dependent competitors. This is not simply a cement plant; it is an industrial anchor that catalyzes infrastructure development, creates hundreds of direct jobs, and eliminates West Africa\'s dependence on imported construction materials.',
      strategicContext: 'West Africa faces a fundamental construction materials deficit. The region imports over 15 million tonnes of cement annually, paying premium prices that inflate infrastructure costs by 40-70% compared to markets with domestic production. Gambia, with a population of 2.5 million and a GDP growing at 6% annually, currently imports 100% of its cement — a structural vulnerability that increases with every infrastructure project. The African Development Bank estimates that West Africa needs $130 billion in infrastructure investment through 2030, all of which requires cement. Harch Cement\'s 500kT/yr facility captures a significant share of this demand while building domestic industrial capacity that strengthens economic sovereignty.',
      marketAnalysis: 'The West African cement market is valued at $8.5 billion and growing at 8% CAGR, driven by urbanization (the region\'s cities are growing at 4% per year), government infrastructure programs totaling $45 billion across ECOWAS nations, and a housing deficit exceeding 50 million units. Gambia alone imports 400,000 tonnes of cement annually at premium prices averaging $120/tonne versus $65-75/tonne for domestically produced cement. Our facility\'s 500kT/yr capacity serves Gambia\'s domestic demand while exporting surplus to Senegal, Guinea-Bissau, and Guinea — a combined market of 25 million people within a 500km distribution radius.',
      sustainability: 'Harch Cement integrates sustainability at every level of operations. Our green cement formulations use locally sourced pozzolanic materials to reduce the clinker factor below 85%, cutting CO2 emissions by 25% versus ordinary Portland cement. The kiln incorporates waste heat recovery technology that captures 30% of thermal energy for power generation, reducing grid electricity consumption. Quarry rehabilitation plans are developed before extraction begins, with progressive restoration using overburden and topsoil stockpiles. All water used in operations is recycled through closed-loop systems, and dust emissions are controlled to 50% below EU standards through bag filters and enclosed conveyors.',
      investment: '$200M',
      metrics: [
        { value: 500, prefix: '', suffix: 'kT/yr', label: 'Production Capacity' },
        { value: 30, prefix: '', suffix: '%', label: 'Cost Advantage' },
        { value: 800, prefix: '', suffix: '+', label: 'Direct Jobs' },
        { value: 200, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Factory, title: 'Quarry Operations', desc: 'Vertically integrated limestone quarry with 50+ year verified reserves. In-country raw material sourcing eliminates import dependency and reduces raw material costs by 30%. The quarry uses modern drill-and-blast techniques with electronic detonators for precise fragmentation control, minimizing energy consumption in downstream crushing.' },
        { icon: Cpu, title: 'Modern Kiln Technology', desc: 'State-of-the-art rotary kiln with waste heat recovery and AI-optimized production control. The 5-stage preheater with calciner achieves 40% lower energy consumption versus regional competitors. Real-time quality monitoring through X-ray fluorescence analysis ensures consistent product quality across all cement grades.' },
        { icon: Zap, title: 'Green Cement Innovation', desc: 'Blended cement formulations using locally sourced pozzolanic and slag materials, reducing the clinker factor to below 85% and the carbon footprint by 25%. Our R&D team is developing calcined clay (LC3) formulations targeting clinker factors below 70% by 2029.' },
        { icon: Globe, title: 'Regional Distribution Network', desc: 'Strategic location on the Gambia River with barge and road access to Senegal, Guinea-Bissau, and Guinea. 500km distribution radius served by a fleet of 40 cement tankers and river barges. Bagged cement distribution through 200+ retail points across the region.' },
        { icon: Shield, title: 'Quality Assurance Systems', desc: 'ISO 9001 certified production with AI-powered quality monitoring and automated sampling at every production stage. Consistent product quality that exceeds both EN 197 and ASTM C150 standards, with real-time adjustments to raw meal composition based on continuous XRF analysis.' },
        { icon: BarChart3, title: 'Market Position & Strategy', desc: 'First-mover advantage in Gambia with significant barriers to entry for competitors. 60% domestic market share target within 3 years of commissioning, supported by structural cost advantages and distribution network density that late entrants cannot replicate.' },
      ],
      specTable: [
        { spec: 'Capacity', value: '500kT/yr', phase: 'Full production' },
        { spec: 'Kiln Type', value: 'Rotary + Preheater', phase: '5-stage with calciner' },
        { spec: 'Clinker Factor', value: '<85%', phase: 'Green formulation' },
        { spec: 'Quarry Reserves', value: '50+ years', phase: 'Limestone verified' },
        { spec: 'Distribution', value: '500km radius', phase: 'River + Road network' },
        { spec: 'Energy Source', value: 'Harch Energy', phase: 'Renewable + Grid hybrid' },
        { spec: 'Certifications', value: 'ISO 9001 / EN 197', phase: 'Quality management' },
        { spec: 'Workforce', value: '800+ direct', phase: 'Local hiring priority' },
        { spec: 'Water Recycling', value: '95%', phase: 'Closed-loop systems' },
        { spec: 'Dust Emissions', value: '50% below EU', phase: 'Bag filter technology' },
      ],
      milestones: [
        { year: '2024 Q4', title: 'Permit Application Filed', desc: 'Environmental and construction permits filed with Gambian authorities. Environmental and Social Impact Assessment completed by independent consultants.' },
        { year: '2025 Q2', title: 'Community Engagement Program', desc: 'Comprehensive community engagement program launched across 12 villages in the project area. Skills training programs for local workforce initiated.' },
        { year: '2025 Q4', title: 'Permits Approved', desc: 'All construction and environmental permits approved by Gambian National Environment Agency and Ministry of Works.' },
        { year: '2026 Q2', title: 'Construction Phase Begins', desc: 'Foundation work, kiln installation, and quarry development begin simultaneously. 400 local construction workers hired.' },
        { year: '2027 Q2', title: 'Kiln Installation Complete', desc: 'Rotary kiln and preheater tower installed. Electrical and control systems commissioned. Quarry production begins.' },
        { year: '2027 Q4', title: 'Commissioning & Testing', desc: 'Kiln commissioning and test production runs. Quality certification process initiated. Distribution network activated.' },
        { year: '2028 Q1', title: 'Commercial Production', desc: 'Full commercial production at 500kT/yr capacity. First deliveries to Gambian and Senegalese markets.' },
      ],
      stats: [
        { stat: 'Import Substitution', value: 85, max: 100 },
        { stat: 'Cost Advantage vs Imports', value: 45, max: 100 },
        { stat: 'Local Employment', value: 90, max: 100 },
        { stat: 'Carbon Reduction vs Peers', value: 30, max: 100 },
      ],
      location: 'Gambia',
      locationDesc: 'Strategic location on the Gambia River with deep-water barge access and road connections to Senegal, Guinea-Bissau, and Guinea. The site sits on verified limestone deposits with 50+ years of reserves, eliminating the need for imported raw materials and providing structural cost advantages that competitors cannot match.',
      strategicAdvantages: [
        { title: 'Vertical Integration', desc: 'Full value chain from quarry to finished product eliminates middlemen and import costs. Raw material costs are 30% below competitors who must import clinker or finished cement from Europe or Asia.' },
        { title: 'River Distribution Hub', desc: 'Direct barge access on the Gambia River provides low-cost bulk transport to interior markets that road-only competitors cannot serve economically. A single barge carries the equivalent of 25 truck loads.' },
        { title: 'First-Mover in Gambia', desc: 'No domestic cement production currently exists in Gambia. Our facility creates the country\'s first industrial cement base, generating significant barriers to entry for future competitors.' },
        { title: 'Green Premium Positioning', desc: 'Lower-carbon cement formulations command premium pricing in ESG-sensitive markets while reducing production costs through lower clinker factors and energy recovery.' },
      ],
      partnershipModel: [
        { title: 'Offtake Agreements', desc: 'Long-term cement supply contracts with construction companies, government agencies, and infrastructure developers. Fixed pricing with inflation protection for 3-5 year terms.' },
        { title: 'Joint Venture Operations', desc: 'Partnership structures for regional cement producers seeking West African market entry. Shared infrastructure, distribution, and technology transfer with Harch Corp operational management.' },
        { title: 'Government Partnerships', desc: 'Public-private partnership models for national infrastructure programs. Dedicated production allocation for government projects with priority delivery commitments.' },
        { title: 'Industrial Synergies', desc: 'Cross-vertical integration with Harch Energy for renewable power supply and Harch Mining for supplementary raw materials. Captive energy costs 40% below grid tariffs.' },
      ],
    },
    energy: {
      name: 'Harch Energy', version: '/0.3',
      heroTitle: "2GW+ Renewable\nEnergy Pipeline",
      heroSubtitle: 'Solar, wind, and green hydrogen powering industrial sovereignty across the continent',
      heroImage: '/images/sections/comp-energy-wind.jpg',
      sectionImage1: '/images/sections/comp-energy-solar.jpg',
      sectionImage2: '/images/sections/energy-solar-farm.jpg',
      sectionImage3: '/images/sections/energy-hydrogen.jpg',
      sectionImage4: '/images/sections/energy-wind-farm.jpg',
      overview: 'Harch Energy is developing over 2 gigawatts of renewable energy capacity across Morocco and the Sahel region — combining solar, wind, and green hydrogen production to power industrial operations and data centers with zero-carbon electricity. Our integrated approach ensures energy sovereignty for the continent while creating a model for sustainable industrialization worldwide. Every kilowatt we generate strengthens Africa\'s position in the global energy transition, replacing fossil fuel dependency with indigenous, renewable, and increasingly cost-competitive power.',
      strategicContext: 'Africa possesses the world\'s greatest renewable energy potential — 40% of global solar irradiance and exceptional wind corridors across the Sahel. Yet the continent generates only 3% of global renewable electricity, and over 600 million Africans lack access to reliable power. This paradox represents both a crisis and an opportunity. While developed economies struggle with the cost of transitioning from fossil fuels, Africa can leapfrog directly to renewable energy at costs below any fossil fuel alternative. Harch Energy captures this opportunity at industrial scale, building the renewable infrastructure that powers not just Harch Corp\'s verticals but catalyzes a continental energy transformation.',
      marketAnalysis: 'Africa\'s renewable energy market is projected to reach $80 billion in annual investment by 2030, driven by falling technology costs (solar PV costs have declined 90% since 2010), international climate finance commitments exceeding $100 billion annually, and rapidly growing power demand from industrialization and urbanization. Morocco alone plans 6GW of new renewable capacity by 2030, while the Sahel region\'s power demand is growing at 8% annually. Harch Energy\'s 2GW+ pipeline positions us as a major independent power producer in the region, with power purchase agreements providing 20+ year revenue visibility and inflation-protected cash flows.',
      sustainability: 'Harch Energy\'s entire business model is predicated on sustainability. Every megawatt we generate displaces fossil fuel generation, preventing approximately 1,000 tonnes of CO2 emissions annually. Our 2GW pipeline will offset over 3.2 million tonnes of CO2 per year — equivalent to removing 700,000 cars from the road. Beyond carbon, our projects incorporate biodiversity assessments, community benefit sharing (5% of revenue allocated to local development funds), and water conservation measures using dry cooling technology in water-stressed regions. All installations are designed for 30+ year operational lifetimes with 95%+ recyclability at decommissioning.',
      investment: '$600M',
      metrics: [
        { value: 2, prefix: '', suffix: 'GW+', label: 'Total Pipeline' },
        { value: 3, prefix: '', suffix: '', label: 'Energy Sources' },
        { value: 100, prefix: '', suffix: '%', label: 'Zero Carbon' },
        { value: 600, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Zap, title: 'Solar Photovoltaic', desc: '1.2GW of solar photovoltaic capacity across Morocco\'s southern regions using Tier-1 bifacial panels with single-axis trackers for maximum energy yield. Our solar farms achieve capacity factors of 28% — significantly above the global average — thanks to Morocco\'s exceptional solar irradiance exceeding 2,400 kWh/m2 annually.' },
        { icon: Wind, title: 'Onshore Wind Power', desc: '800MW of onshore wind capacity in the Sahel corridor, one of the world\'s premier wind resources. Modern turbines with 130m rotor diameters achieve capacity factors above 45%, generating electricity at a levelized cost of $18/MWh — competitive with any generation source globally.' },
        { icon: Droplets, title: 'Green Hydrogen Production', desc: '200MW electrolyzer capacity for green hydrogen production using PEM technology from industry-leading suppliers. Serving industrial demand for zero-carbon fuel, chemical feedstock, and energy storage. Production cost targeted at $2.50/kg by 2028 — competitive with grey hydrogen in European markets.' },
        { icon: Shield, title: 'Grid Integration & Storage', desc: 'AI-optimized grid management with 400MWh of battery storage ensuring stable power supply 24/7 for critical industrial loads. Our grid integration platform provides frequency regulation, voltage support, and black-start capability for enhanced grid resilience.' },
        { icon: Globe, title: 'PPA Structuring', desc: 'Long-term power purchase agreements with Harch Corp verticals and third-party industrial customers. 20+ year contracts with inflation protection, providing revenue visibility that supports project financing at favorable terms. Investment-grade off-take agreements enable non-recourse project finance structures.' },
        { icon: BarChart3, title: 'Carbon Credit Generation', desc: 'Verified carbon credits from all renewable installations registered under the Gold Standard and Verra VCS frameworks. Additional revenue stream that improves project economics by 8-12% while providing corporate buyers with high-quality African carbon offsets.' },
      ],
      specTable: [
        { spec: 'Solar PV', value: '1.2GW', phase: 'Morocco South' },
        { spec: 'Onshore Wind', value: '800MW', phase: 'Sahel Region' },
        { spec: 'Green H₂ Electrolyzer', value: '200MW', phase: 'PEM Technology' },
        { spec: 'Battery Storage', value: '400MWh', phase: 'LFP Chemistry' },
        { spec: 'PPA Duration', value: '20+ years', phase: 'Inflation-protected' },
        { spec: 'LCOE Solar', value: '$14/MWh', phase: 'Industry-leading' },
        { spec: 'LCOE Wind', value: '$18/MWh', phase: 'Competitive globally' },
        { spec: 'Carbon Offset', value: '3.2M tCO2/yr', phase: 'Verified credits' },
        { spec: 'Grid Connection', value: '400kV', phase: 'High-voltage transmission' },
        { spec: 'Community Revenue Share', value: '5%', phase: 'Local development funds' },
      ],
      milestones: [
        { year: '2025 Q1', title: 'License Applications Filed', desc: 'Renewable energy licenses and environmental permits filed for solar and wind projects across 3 sites totaling 2GW+.' },
        { year: '2025 Q4', title: 'Licenses Secured & PPA Signed', desc: '2GW+ renewable energy licenses approved by Moroccan authorities. First PPA signed with Harch Intelligence for 500MW dedicated supply.' },
        { year: '2026 Q3', title: 'Solar Farm Construction Begins', desc: 'First 400MW solar farm construction starts in southern Morocco. Panel procurement and site preparation underway.' },
        { year: '2027 Q2', title: 'First Power Generation', desc: '400MW solar farm online and generating. First PPA deliveries to Harch Intelligence data center and third-party industrial customers.' },
        { year: '2027 Q4', title: 'Wind Farm Construction', desc: '300MW wind farm construction begins in the Sahel corridor. Turbine procurement and foundation works initiated.' },
        { year: '2028 Q4', title: '1GW Operational Milestone', desc: '1GW total renewable capacity operational. Wind farm commissioning underway. Green hydrogen pilot launched.' },
        { year: '2030 Q1', title: 'Full Pipeline Operational', desc: '2GW+ fully operational across solar, wind, and green hydrogen. Continental energy backbone established.' },
      ],
      stats: [
        { stat: 'Capacity Factor Solar', value: 28, max: 35 },
        { stat: 'Capacity Factor Wind', value: 45, max: 55 },
        { stat: 'Cost Competitiveness', value: 90, max: 100 },
        { stat: 'Carbon Offset Target', value: 85, max: 100 },
      ],
      location: 'Sahel Region',
      locationDesc: 'Exceptional solar irradiance (2,400+ kWh/m2/year) and wind resources (average 8.5 m/s) across Morocco and the Sahel corridor. Our sites are strategically located near high-voltage transmission infrastructure and industrial demand centers, minimizing grid connection costs and transmission losses.',
      strategicAdvantages: [
        { title: 'Lowest LCOE Globally', desc: 'Morocco\'s combination of exceptional solar irradiance, low land costs, and developing infrastructure creates solar LCOE of $14/MWh — among the lowest in the world. This structural advantage is permanent and geography-dependent.' },
        { title: 'Captive Demand from Harch Verticals', desc: 'Guaranteed offtake from Harch Intelligence (500MW), Harch Cement, Harch Mining, and Harch Water provides revenue floor that derisks project finance and enables better debt terms.' },
        { title: 'Green Hydrogen Export Potential', desc: 'Morocco\'s proximity to European hydrogen markets (14km at the Strait of Gibraltar) positions Harch Energy as a competitive green hydrogen supplier to EU industrial customers.' },
        { title: 'Carbon Credit Revenue', desc: 'Verified carbon credits from 2GW+ of renewable installations generate $25-40M annually in additional revenue, improving project IRR by 200-300 basis points.' },
      ],
      partnershipModel: [
        { title: 'Corporate PPAs', desc: 'Long-term power purchase agreements for industrial customers seeking renewable energy supply. 10-20 year terms with fixed or inflation-linked pricing, providing budget certainty and ESG reporting benefits.' },
        { title: 'Project Finance Partnerships', desc: 'Joint development structures with international infrastructure investors and development finance institutions. Non-recourse project finance with Harch Corp as sponsor and O&M provider.' },
        { title: 'Green Hydrogen Offtake', desc: 'Hydrogen supply agreements with European industrial customers. Delivered via pipeline or converted to green ammonia for maritime transport. Target price: $2.50/kg by 2028.' },
        { title: 'Community Energy Programs', desc: 'Mini-grid and rural electrification partnerships with governments and development agencies. 5% of generation capacity allocated for community energy access programs.' },
      ],
    },
    technology: {
      name: 'Harch Technology', version: '/0.4',
      heroTitle: "Sovereign Digital\nInfrastructure",
      heroSubtitle: 'AI platforms, cybersecurity, and satellite communications for Africa\'s digital sovereignty',
      heroImage: '/images/sections/comp-tech-dish.jpg',
      sectionImage1: '/images/sections/comp-tech-ai.jpg',
      sectionImage2: '/images/sections/tech-cyber.jpg',
      sectionImage3: '/images/sections/tech-satellite.jpg',
      sectionImage4: '/images/sections/tech-ground-station.jpg',
      overview: 'Harch Technology provides the sovereign digital infrastructure that powers Africa\'s industrial and digital transformation. From AI platforms to cybersecurity and satellite communications, we ensure that Africa controls its own technology stack — its data, its compute, its communications, and its security. In a world where digital sovereignty is increasingly synonymous with national sovereignty, Harch Technology builds the systems that keep Africa\'s digital future in African hands.',
      strategicContext: 'Africa\'s digital economy is growing at 25% annually, yet 95% of the continent\'s cloud infrastructure, cybersecurity tools, and communications systems are provided by foreign companies operating under foreign jurisdictions. This creates critical vulnerabilities: data sovereignty is compromised, communications can be intercepted or disrupted by foreign actors, and the continent\'s rapidly growing AI capabilities depend entirely on foreign compute infrastructure. Harch Technology addresses each of these vulnerabilities with sovereign solutions designed for African requirements, deployed within African jurisdictions, and operated by African talent.',
      marketAnalysis: 'Africa\'s technology market is valued at $35 billion and growing at 20% CAGR — the fastest of any region globally. Key growth segments include cloud services ($8B by 2027), cybersecurity ($5B by 2026), satellite communications ($3B by 2027), and AI platforms ($10B by 2028). Government data localization mandates in 15+ African countries are creating guaranteed demand for sovereign cloud and data center services. Meanwhile, the cybersecurity threat landscape is intensifying, with African organizations experiencing 30% more cyberattacks than the global average, yet investing 60% less in protection.',
      sustainability: 'Harch Technology designs for efficiency and longevity. Our sovereign cloud infrastructure runs on 100% renewable energy from Harch Energy, with a PUE below 1.2 across all facilities. Edge computing nodes are solar-powered with battery backup, minimizing grid dependency in remote locations. All hardware follows certified e-waste recycling protocols, and our software stack is optimized for energy efficiency — achieving 30% lower compute-per-watt than competing platforms. We also invest 5% of technology revenue in STEM education programs across our operating countries, building the next generation of African technology talent.',
      investment: '$400M',
      metrics: [
        { value: 50, prefix: '', suffix: 'K+', label: 'GPU Clusters' },
        { value: 4, prefix: '', suffix: '', label: 'Product Lines' },
        { value: 100, prefix: '', suffix: '%', label: 'Sovereign Stack' },
        { value: 400, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Cpu, title: 'Sovereign AI Platform', desc: 'Full-stack AI platform for training, fine-tuning, and inference with managed services and enterprise SLAs. The platform supports all major ML frameworks and provides pre-built MLOps pipelines, model registries, and automated deployment workflows — all hosted within African jurisdiction with guaranteed data residency.' },
        { icon: Shield, title: 'Cybersecurity Suite', desc: 'End-to-end cybersecurity platform from network monitoring to incident response. Designed for critical infrastructure protection with real-time threat intelligence, automated vulnerability scanning, and 24/7 security operations center. Protects all Harch Corp verticals and third-party clients across energy, mining, and government sectors.' },
        { icon: Satellite, title: 'Satellite Communications', desc: 'Low Earth Orbit satellite connectivity for remote industrial operations across mining sites, agricultural zones, and energy installations. Multi-orbit constellation access provides 99.99% uptime guarantee with bandwidth from 10Mbps to 1Gbps, enabling real-time monitoring and control of distributed assets.' },
        { icon: Server, title: 'Edge Computing Network', desc: 'Distributed edge computing infrastructure across 5 countries with 50+ nodes providing low-latency processing for IoT, AI inference, and real-time analytics at the point of need. Each node is self-contained with solar power, satellite backhaul, and local compute capacity for autonomous operation.' },
        { icon: Lock, title: 'Sovereign Cloud', desc: 'Africa-hosted cloud infrastructure with full data sovereignty and guaranteed data residency. No data leaves the continent — compliant with emerging data localization laws in Morocco, Nigeria, Kenya, and South Africa. Provides IaaS, PaaS, and SaaS layers with enterprise-grade SLAs.' },
        { icon: Eye, title: 'Industrial Data Analytics', desc: 'Real-time monitoring and predictive analytics platform combining IoT data streams from all Harch verticals. AI-powered anomaly detection, predictive maintenance, and operational optimization reduce downtime by 40% and maintenance costs by 25% across industrial operations.' },
      ],
      specTable: [
        { spec: 'GPU Clusters', value: '50,000+', phase: 'At full scale' },
        { spec: 'AI Platform', value: 'Full Stack', phase: 'Training + Inference' },
        { spec: 'Cyber Suite', value: 'Enterprise', phase: 'Critical infrastructure grade' },
        { spec: 'Satellite Orbits', value: 'LEO + MEO', phase: '99.99% uptime SLA' },
        { spec: 'Edge Nodes', value: '50+', phase: '5 countries coverage' },
        { spec: 'Cloud Regions', value: '3 African', phase: 'Sovereign data residency' },
        { spec: 'Data Residency', value: '100% Africa', phase: 'Full compliance' },
        { spec: 'Certifications', value: 'ISO 27001 + SOC 2', phase: 'Information security' },
        { spec: 'API Availability', value: '99.99%', phase: 'Enterprise SLA' },
        { spec: 'Threat Intelligence', value: 'Real-time', phase: 'AI-powered detection' },
      ],
      milestones: [
        { year: '2025 Q2', title: 'Platform Architecture Validated', desc: 'Sovereign AI platform architecture designed, validated, and benchmarked against global standards. Key technology partnerships established with leading chip and software vendors.' },
        { year: '2026 Q1', title: 'Cybersecurity Suite Launch', desc: 'Cybersecurity product suite launched commercially for enterprise and government customers. First 10 clients onboarded across energy and mining sectors.' },
        { year: '2026 Q4', title: 'Edge Computing Deployment', desc: 'First 20 edge computing nodes deployed across Morocco, Gambia, and Mauritania. Solar-powered autonomous operations validated in remote mining environments.' },
        { year: '2027 Q3', title: 'Satellite Integration Complete', desc: 'LEO satellite connectivity integrated with edge infrastructure. Full network operational for remote industrial sites with <50ms latency to cloud resources.' },
        { year: '2028 Q2', title: 'Sovereign Cloud GA', desc: 'Full sovereign cloud platform in general availability with 3 African regions. Enterprise customers onboarded with guaranteed data residency and compliance frameworks.' },
      ],
      stats: [
        { stat: 'Data Sovereignty', value: 100, max: 100 },
        { stat: 'Platform Uptime', value: 99, max: 100 },
        { stat: 'Cyber Threat Detection', value: 95, max: 100 },
        { stat: 'African Talent Ratio', value: 85, max: 100 },
      ],
      location: 'Casablanca, Morocco',
      locationDesc: 'Technology headquarters in Casablanca\'s financial district with distributed operations across 5 countries. Casablanca provides access to Morocco\'s growing tech talent pool, international fiber connectivity, and proximity to European technology partners.',
      strategicAdvantages: [
        { title: 'Sovereign by Design', desc: 'Every product is built from the ground up for data sovereignty, with guaranteed African data residency and no foreign jurisdiction access. This is not a feature added to existing platforms — it is the core architecture.' },
        { title: 'Integrated Security Stack', desc: 'Cybersecurity is not an add-on but embedded across every layer — from physical data center security to application-level encryption. This integrated approach provides protection that point solutions cannot match.' },
        { title: 'Industrial IoT Expertise', desc: 'Deep domain expertise in industrial operations (energy, mining, cement, agriculture) enables tailored analytics and AI solutions that generic cloud providers cannot deliver.' },
        { title: 'Multi-Orbit Satellite Access', desc: 'Partnerships with multiple LEO and MEO constellation operators provide redundant connectivity for remote operations, ensuring 99.99% uptime even in areas with zero terrestrial infrastructure.' },
      ],
      partnershipModel: [
        { title: 'Sovereign Cloud Migration', desc: 'Managed migration services for organizations moving workloads to African sovereign cloud. Assessment, planning, migration, and ongoing managed services with guaranteed data residency.' },
        { title: 'Managed Security Services', desc: '24/7 security operations center with managed detection and response for critical infrastructure. Tiered service levels from monitoring-only to full incident response and remediation.' },
        { title: 'Technology Licensing', desc: 'White-label licensing of Harch Technology platforms for telecom operators and system integrators seeking to offer sovereign digital services under their own brand.' },
        { title: 'Research Partnerships', desc: 'Collaborative R&D programs with African universities and research institutions. Joint publications, patent sharing, and talent pipeline development for the next generation of African technologists.' },
      ],
    },
    mining: {
      name: 'Harch Mining', version: '/0.5',
      heroTitle: "Capturing the\nValue Chain",
      heroSubtitle: 'Strategic mineral extraction and in-country processing for the energy transition',
      heroImage: '/images/sections/comp-mining-site.jpg',
      sectionImage1: '/images/sections/comp-mining-excavator.jpg',
      sectionImage2: '/images/sections/comp-mining-heavy.jpg',
      sectionImage3: '/images/sections/mining-smelter.jpg',
      sectionImage4: '/images/sections/mining-processing.jpg',
      overview: 'Harch Mining extracts and processes strategic minerals — phosphates, cobalt, and rare earths — building in-country processing capacity that captures the value chain for Africa. While the continent holds 30% of global mineral reserves, it captures less than 5% of the value. We change that equation by processing minerals where they are extracted, creating industrial jobs, generating export revenue from refined products, and building the supply chain independence that the energy transition demands.',
      strategicContext: 'The global energy transition is creating unprecedented demand for critical minerals. Electric vehicle batteries require cobalt and rare earths; solar panels need silicon and tellurium; wind turbines depend on rare earth permanent magnets; and fertilizer production requires phosphate. Africa holds world-class reserves of all these minerals, yet the continent remains primarily a raw material exporter, shipping unprocessed ore to refineries in China, Europe, and North America. This extractive model captures less than 5% of the value chain for Africa while creating strategic supply chain vulnerabilities for the global energy transition.',
      marketAnalysis: 'The global critical minerals market is valued at $320 billion and growing at 12% CAGR, driven by the energy transition. Cobalt demand is projected to quadruple by 2030 for EV batteries, rare earth demand is growing 15% annually for electronics and defense applications, and phosphate demand grows 3% annually with food security concerns. Africa\'s share of global reserves is staggering: 75% of phosphate (Morocco), 60% of cobalt (DRC), and significant rare earth deposits across multiple countries. Harch Mining\'s strategy of in-country processing captures 5-8x more value per tonne versus raw ore export, while creating supply chain security for strategic partners.',
      sustainability: 'Harch Mining operates under a zero-harm environmental framework. All operations are ISO 14001 certified with zero tailings discharge through dry stacking technology that eliminates the risk of tailings dam failures. Progressive rehabilitation plans restore mined land to productive use — agriculture, forestry, or renewable energy installations — within 5 years of mine closure. All processing is powered by Harch Energy\'s renewable infrastructure, making our minerals among the lowest-carbon in the world. Water consumption is minimized through closed-loop recycling, and biodiversity offset programs invest 2% of revenue in conservation projects.',
      investment: '$200M',
      metrics: [
        { value: 3, prefix: '', suffix: '', label: 'Strategic Minerals' },
        { value: 30, prefix: '', suffix: '%', label: 'Global Reserves' },
        { value: 500, prefix: '', suffix: '+', label: 'Direct Jobs' },
        { value: 200, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Mountain, title: 'Phosphate Mining & Processing', desc: 'Large-scale phosphate extraction and processing for fertilizer production from Morocco\'s world-class deposits. Our integrated operation mines, beneficiates, and processes phosphate rock into merchant-grade phosphoric acid and fertilizer products — capturing 5x more value than raw ore export.' },
        { icon: Cpu, title: 'Cobalt Extraction & Refining', desc: 'Cobalt extraction and refining for battery production from Mauritanian deposits. Our hydrometallurgical processing plant produces battery-grade cobalt sulfate and cobalt hydroxide — critical materials for the global electric vehicle and energy storage industries.' },
        { icon: Globe, title: 'Rare Earth Element Processing', desc: 'Rare earth element extraction and separation for electronics and defense applications. In-country processing eliminates dependency on Chinese supply chains that control 85% of global refining capacity. Our separation plant produces individual rare earth oxides to 99.9% purity.' },
        { icon: Shield, title: 'Environmental Stewardship', desc: 'ISO 14001 environmental management across all operations with zero tailings discharge through dry stacking technology. Progressive rehabilitation programs restore mined land within 5 years. All water recycled through closed-loop systems.' },
        { icon: Zap, title: 'Renewable-Powered Processing', desc: 'All mining and processing powered by Harch Energy\'s renewable infrastructure. Zero-carbon minerals for the energy transition — our cobalt has 80% lower lifecycle emissions than Chinese-processed alternatives, commanding a green premium in European and North American markets.' },
        { icon: BarChart3, title: 'Export Infrastructure', desc: 'Port and rail infrastructure for efficient mineral export to European and Asian markets. Direct shipping routes from Nouakchott and Casablanca ports reduce logistics costs by 30% versus inland competitors dependent on shared rail networks.' },
      ],
      specTable: [
        { spec: 'Phosphate Output', value: '5M t/yr', phase: 'Morocco operations' },
        { spec: 'Cobalt Output', value: '10K t/yr', phase: 'Mauritania operations' },
        { spec: 'Rare Earths', value: '2K t/yr', phase: 'Exploration phase' },
        { spec: 'Processing', value: 'In-country', phase: 'Full refining to product' },
        { spec: 'Environmental Standard', value: 'ISO 14001', phase: 'Zero discharge' },
        { spec: 'Energy Source', value: '100% Renewable', phase: 'Harch Energy supply' },
        { spec: 'Export Routes', value: '3 Atlantic Ports', phase: 'Direct shipping access' },
        { spec: 'Rehabilitation', value: 'Progressive', phase: '5-year restoration cycle' },
        { spec: 'Value Capture vs Export', value: '5-8x', phase: 'Refined product premium' },
        { spec: 'Carbon vs Chinese Processing', value: '80% lower', phase: 'Green premium eligible' },
      ],
      milestones: [
        { year: '2025 Q3', title: 'Exploration Rights Secured', desc: 'Mining exploration rights secured in Mauritania for cobalt deposits. Geological survey data acquired and validated by independent consultants.' },
        { year: '2026 Q2', title: 'Resource Assessment Complete', desc: 'Full geological survey and JORC-compliant resource assessment completed. Measured and indicated resources exceed initial projections by 25%.' },
        { year: '2027 Q1', title: 'Mining Permits Approved', desc: 'Extraction and processing permits approved by Mauritanian Ministry of Mines. Environmental and Social Impact Assessment approved with conditions.' },
        { year: '2027 Q4', title: 'Processing Plant Construction', desc: 'Hydrometallurgical processing plant construction begins. Equipment procurement and civil works initiated simultaneously.' },
        { year: '2028 Q2', title: 'Processing Plant Operational', desc: 'Mineral processing plant construction completed and commissioned. First cobalt sulfate and hydroxide production for battery manufacturers.' },
        { year: '2029 Q1', title: 'Full Production Achieved', desc: 'All three minerals in production. Export operations via Nouakchott port fully operational. Revenue generation from refined product sales.' },
      ],
      stats: [
        { stat: 'Value Capture vs Raw Export', value: 85, max: 100 },
        { stat: 'Renewable Energy Usage', value: 100, max: 100 },
        { stat: 'Carbon Reduction vs Peers', value: 80, max: 100 },
        { stat: 'Supply Chain Independence', value: 75, max: 100 },
      ],
      location: 'Mauritania',
      locationDesc: 'Rich mineral deposits in Mauritania\'s Archean greenstone belts with Atlantic port access at Nouakchott for efficient export. The country\'s mining code provides fiscal stability and 30-year mining conventions with guaranteed rights. Proximity to European markets reduces shipping time and costs versus Asian-processed alternatives.',
      strategicAdvantages: [
        { title: 'In-Country Processing Premium', desc: 'Refining minerals where they are extracted captures 5-8x more value per tonne versus raw ore export. This model creates industrial jobs, generates tax revenue, and builds domestic processing expertise.' },
        { title: 'Zero-Carbon Minerals', desc: '100% renewable-powered processing gives Harch Mining an 80% carbon advantage versus Chinese-processed minerals, commanding green premiums of 10-15% in ESG-sensitive markets.' },
        { title: 'Non-Chinese Supply Chain', desc: 'Rare earth and cobalt processing outside Chinese jurisdiction provides supply chain security for Western defense and technology customers seeking to reduce strategic dependencies.' },
        { title: 'Integrated Harch Energy Supply', desc: 'Dedicated renewable energy from Harch Energy at $0.03/kWh eliminates energy cost volatility — the single largest operating cost in mineral processing.' },
      ],
      partnershipModel: [
        { title: 'Strategic Mineral Offtake', desc: 'Long-term supply agreements with battery manufacturers, electronics companies, and defense contractors. Fixed-volume contracts with price corridors linked to LME benchmarks.' },
        { title: 'Joint Mining Ventures', desc: 'Partnership structures with international mining companies seeking African market entry. Harch Corp provides local expertise, permits, and infrastructure; partners contribute technology and capital.' },
        { title: 'Government Revenue Sharing', desc: 'Transparent revenue sharing with host governments exceeding industry standards. Royalties, taxes, and community development contributions structured for mutual long-term benefit.' },
        { title: 'Circular Mineral Flows', desc: 'Partnerships with battery recyclers and electronics manufacturers for end-of-life mineral recovery. Closing the loop on critical minerals reduces demand for primary extraction.' },
      ],
    },
    agriculture: {
      name: 'Harch Agri', version: '/0.6',
      heroTitle: "Precision Agriculture\nat Continental Scale",
      heroSubtitle: 'IoT, drones, and vertical farming across 60% of the world\'s uncultivated arable land',
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
        { icon: Shield, title: 'Farm-to-Market Supply Chain', desc: 'Integrated supply chain infrastructure from farm gate to export market. Cold chain logistics, processing facilities, and export networks ensure maximum value capture. Our post-harvest loss rate is below 5% versus the African average of 30%+' },
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
    },
    water: {
      name: 'Harch Water', version: '/0.7',
      heroTitle: "Solving Africa's\nWater Crisis",
      heroSubtitle: '200M m3/yr desalination with AI-optimized distribution for industrial and community needs',
      heroImage: '/images/sections/comp-water-plant.jpg',
      sectionImage1: '/images/sections/comp-water-pipes.jpg',
      sectionImage2: '/images/sections/water-desal.jpg',
      sectionImage3: '/images/sections/water-dam.jpg',
      sectionImage4: '/images/sections/water-control-room.jpg',
      overview: 'Harch Water deploys 200M m3/yr desalination capacity with AI-optimized distribution, solving Africa\'s water security crisis at continental scale. Every project allocates 10% of capacity for community use at no cost, ensuring that industrial development and human needs are met simultaneously. Water is the foundation of every other Harch vertical — without reliable water supply, data centers cannot cool, cement cannot cure, crops cannot grow, and communities cannot thrive. Harch Water builds the water infrastructure that makes everything else possible.',
      strategicContext: 'Over 400 million Africans lack access to clean water, and 700 million lack adequate sanitation. Climate change is intensifying water stress across the Sahel and North Africa, where rainfall has declined 30% over the past three decades. Meanwhile, industrial water demand is growing at 8% annually as manufacturing, mining, and agriculture expand. The conventional response — groundwater extraction and surface water diversion — is unsustainable and increasingly inadequate. Desalination powered by renewable energy represents the only scalable, climate-resilient solution. Harch Water builds this solution at the scale the continent requires.',
      marketAnalysis: 'Africa\'s water infrastructure market is valued at $25 billion annually and growing at 10% CAGR, driven by urbanization (African cities add 20 million water consumers annually), industrial demand (manufacturing, mining, and energy), and climate adaptation spending. Desalination specifically is the fastest-growing segment, with Africa\'s installed capacity projected to grow from 6M m3/day to 25M m3/day by 2030. Harch Water\'s 200M m3/yr capacity (548K m3/day) captures a significant share of this growth while operating at costs 40% below grid-powered desalination through Harch Energy\'s renewable electricity.',
      sustainability: 'Sustainability is embedded in Harch Water\'s DNA. Our desalination plants are powered entirely by Harch Energy\'s renewable infrastructure, eliminating the carbon footprint that makes conventional desalination environmentally problematic. Energy recovery devices reduce power consumption to 2.5 kWh/m3 — 40% below industry average. Brine management follows best-practice diffusion protocols that protect marine ecosystems, and our AI distribution systems reduce network losses to less than 5% versus the African average of 40%+. The 10% community allocation provides clean water for 50M+ people across our operating regions at zero cost.',
      investment: '$150M',
      metrics: [
        { value: 200, prefix: '', suffix: 'M m3/yr', label: 'Desalination Capacity' },
        { value: 10, prefix: '', suffix: '%', label: 'Community Allocation' },
        { value: 40, prefix: '', suffix: '%', label: 'Energy Reduction' },
        { value: 150, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Waves, title: 'Reverse Osmosis Desalination', desc: 'Latest-generation reverse osmosis desalination plants powered by Harch Energy\'s renewable infrastructure. 200M m3/yr capacity serving both industrial and community needs. Our plants use advanced membrane technology achieving 45% recovery rates with energy consumption of just 2.5 kWh/m3.' },
        { icon: Cpu, title: 'AI-Optimized Distribution', desc: 'AI-optimized water distribution networks that reduce waste by 40% and ensure equitable allocation between industrial and community users. Real-time demand forecasting, pressure management, and automated valve control minimize losses while maximizing service quality.' },
        { icon: Globe, title: 'Smart Network Monitoring', desc: 'IoT-enabled water distribution networks with real-time monitoring, leak detection, and predictive maintenance. 10,000+ sensors across distribution networks provide continuous visibility into system performance with 99.5% network uptime.' },
        { icon: Shield, title: 'Water Quality Assurance', desc: 'Multi-stage filtration and continuous quality monitoring ensuring WHO-standard drinking water for all community allocations. Automated sampling and laboratory analysis at every treatment stage with public quality reporting for full transparency.' },
        { icon: Zap, title: 'Energy Recovery Systems', desc: 'Advanced energy recovery devices in desalination plants reducing energy consumption by 40% versus conventional systems. Powered by Harch Energy at $0.03/kWh — the lowest energy cost for desalination on the continent, producing water at $0.45/m3.' },
        { icon: BarChart3, title: 'Community Water Access', desc: '10% of all desalination capacity allocated for community use at zero cost — providing clean water for 50M+ people across our operating regions. Community water points, school and hospital connections, and rural distribution networks funded from operational revenue.' },
      ],
      specTable: [
        { spec: 'Total Capacity', value: '200M m3/yr', phase: 'Full build-out' },
        { spec: 'Technology', value: 'Reverse Osmosis', phase: 'Latest generation membranes' },
        { spec: 'Energy Use', value: '2.5 kWh/m3', phase: 'Industry-leading efficiency' },
        { spec: 'Recovery Rate', value: '45%', phase: 'High-efficiency membranes' },
        { spec: 'Community Allocation', value: '10% Free', phase: '20M m3/yr for communities' },
        { spec: 'Network Uptime', value: '99.5%', phase: 'IoT monitoring systems' },
        { spec: 'Water Quality', value: 'WHO Standard', phase: 'Continuous monitoring' },
        { spec: 'Leak Detection', value: 'AI-Powered', phase: 'Real-time alerting' },
        { spec: 'Production Cost', value: '$0.45/m3', phase: 'Renewable energy powered' },
        { spec: 'Brine Management', value: 'Diffusion Protocol', phase: 'Marine ecosystem protection' },
      ],
      milestones: [
        { year: '2025 Q3', title: 'Pilot Desalination Launch', desc: 'Pilot desalination project launched in southern Morocco. 10,000 m3/day capacity validating technology and operational parameters.' },
        { year: '2026 Q2', title: 'Pilot Results Validated', desc: 'Pilot project achieves all performance targets: 2.5 kWh/m3 energy consumption, 45% recovery rate, WHO-standard output quality.' },
        { year: '2026 Q4', title: 'AI Distribution Platform', desc: 'AI-optimized distribution system validated in pilot network. Leak detection and pressure management reducing losses by 35%.' },
        { year: '2027 Q3', title: 'First Full-Scale Plant', desc: 'First full-scale 50M m3/yr desalination plant construction begins. Financing closed with development finance institution participation.' },
        { year: '2029 Q1', title: 'First Plant Online', desc: 'First desalination plant operational. 50M m3/yr capacity serving industrial customers and community allocation programs.' },
        { year: '2030 Q4', title: 'Full 200M m3/yr Capacity', desc: '200M m3/yr total desalination capacity operational. AI distribution across 3 countries. 50M+ people receiving community water access.' },
      ],
      stats: [
        { stat: 'Energy Efficiency vs Average', value: 90, max: 100 },
        { stat: 'Network Loss Reduction', value: 85, max: 100 },
        { stat: 'Community Access Target', value: 75, max: 100 },
        { stat: 'Cost Competitiveness', value: 88, max: 100 },
      ],
      location: 'Mali',
      locationDesc: 'Operations across water-stressed regions of West Africa with critical community needs. Initial deployment in southern Morocco with expansion to Mali and the Sahel corridor — regions where water stress is most acute and desalination provides the only climate-resilient water supply solution.',
      strategicAdvantages: [
        { title: 'Renewable-Powered Cost Leadership', desc: 'Desalination at $0.45/m3 — 40% below grid-powered plants — thanks to Harch Energy\'s $0.03/kWh renewable electricity. This structural cost advantage is permanent and widens as renewable costs continue to decline.' },
        { title: 'Cross-Vertical Integration', desc: 'Every Harch vertical requires water — for cooling data centers, mixing cement, irrigating crops, and processing minerals. Harch Water\'s captive demand base provides revenue floor while serving external industrial and community customers.' },
        { title: 'AI-Optimized Distribution', desc: 'Proprietary AI distribution platform reduces network losses to <5% versus the African average of 40%+. This efficiency advantage compounds as networks expand, creating an ever-wider performance gap versus competitors.' },
        { title: 'Community Mandate', desc: 'The 10% free community allocation builds social license, government support, and development finance eligibility that purely commercial operators cannot access. This mandate is a competitive moat, not a cost.' },
      ],
      partnershipModel: [
        { title: 'Industrial Water Supply', desc: 'Long-term water supply agreements with mining companies, industrial parks, and agricultural operations. Guaranteed volumes with tiered pricing based on consumption.' },
        { title: 'Government Water Concessions', desc: 'Public-private partnerships for municipal water supply and distribution. Build-operate-transfer or build-own-operate models with government offtake guarantees.' },
        { title: 'Community Water Programs', desc: 'Collaborative programs with UNICEF, WaterAid, and government agencies for rural water access. 10% community allocation provides baseline; partnerships fund expansion.' },
        { title: 'Development Finance Partnerships', desc: 'Project finance structures with AfDB, IFC, and bilateral development finance institutions. Concessional lending eligibility through community impact metrics and ESG compliance.' },
      ],
    },
  };

  const data = subsidiaryData[slug];
  if (!data) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1></div>;

  return (
    <div className="bg-[#1A1A1A]">
      {/* ═══════════════════════════════════════════
          HERO — Full-bleed photo with overlaid text (Palantir style)
          ═══════════════════════════════════════════ */}
      <section className="photo-section relative min-h-[85vh] flex items-end">
        <Image src={data.heroImage} alt={data.name} fill className="object-cover" priority />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">{data.name} {data.version}</span>
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
                    <p className="text-3xl md:text-4xl font-bold text-white">
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
          FULL-BLEED IMAGE BREAK — Palantir style between sections
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage1} alt={`${data.name} infrastructure`} height="55vh" />

      {/* ═══════════════════════════════════════════
          STRATEGIC CONTEXT — Side-by-side split (Palantir: text left + image right)
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
            {data.capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.06}>
                <div className="card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-3">
                    <cap.icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[14px] font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-[12px] text-[#999999] leading-relaxed">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC ADVANTAGES — Full-width section with stat bars
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
                {data.strategicAdvantages.map((adv, i) => (
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
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] mb-2">Investment</p>
                <p className="text-4xl font-bold text-white">{data.investment}</p>
                <p className="text-[12px] text-[#999999] mt-2">{data.location}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BACKGROUND — Investment & Location (Palantir mood section)
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
          MARKET ANALYSIS — Side-by-side split (Palantir: image left + text right)
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
          TECHNICAL SPECIFICATIONS — Data table
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
          SUSTAINABILITY & ESG — Full-width section
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <p className="section-label mb-4">Sustainability & ESG</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                Built for the Long Term
              </h2>
              <div className="accent-line mb-6" />
              <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {data.specTable.slice(0, 5).map((row) => (
                  <div key={row.spec} className="flex justify-between items-center py-3 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[13px] text-[#999999]">{row.spec}</span>
                    <span className="text-[13px] font-semibold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECOND FULL-BLEED IMAGE BREAK
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage2} alt={`${data.name} facility`} height="45vh" />

      {/* ═══════════════════════════════════════════
          DEEP DIVE — Additional visual section with sectionImage3
          ═══════════════════════════════════════════ */}
      <SplitSection imageSrc={data.sectionImage3} imageAlt={`${data.name} deep operations`} reverse>
        <p className="section-label mb-4">Deep Operations</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] mb-4">
          Inside the Infrastructure
        </h2>
        <div className="accent-line mb-6" />
        <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">
          {data.sustainability}
        </p>
        <div className="space-y-3">
          {data.stats.map((s, i) => (
            <StatBar key={s.stat} stat={s.stat} value={s.value} max={s.max} />
          ))}
        </div>
      </SplitSection>

      {/* ═══════════════════════════════════════════
          THIRD FULL-BLEED IMAGE BREAK — sectionImage4
          ═══════════════════════════════════════════ */}
      <FullBleedImage src={data.sectionImage4} alt={`${data.name} scale`} height="40vh" />

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
                      <div className="w-3.5 h-3.5 rounded-full bg-[#000000] border-2 border-[#000000] mt-1.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">{m.year}</span>
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
          PARTNERSHIP MODEL — Grid cards
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
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
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-mono-tag">0{i + 1}</span>
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
          CTA — Dark with dot pattern
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
