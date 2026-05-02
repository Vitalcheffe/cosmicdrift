'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cpu, Zap, Globe, Server, Shield, BarChart3, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { WorldMap } from '@/components/WorldMap';

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

const metrics = [
  { value: 500, prefix: '', suffix: 'MW+', label: 'Total Capacity' },
  { value: 50, prefix: '', suffix: 'K+', label: 'GPU Clusters' },
  { value: 100, prefix: '', suffix: '%', label: 'Renewable Powered' },
  { value: 800, prefix: '$', suffix: 'M', label: 'Investment' },
];

const capabilities = [
  { icon: Server, title: 'Hyperscale Data Centers', desc: '500MW AI-ready data center in Dakhla designed for the most demanding compute workloads. Modular architecture allows capacity to scale from 100MW to 500MW in phases.' },
  { icon: Cpu, title: 'GPU Clusters', desc: '50,000+ next-generation GPU clusters optimized for training and inference of large language models. Purpose-built for sovereign AI compute at continental scale.' },
  { icon: Zap, title: 'Renewable Energy', desc: '100% powered by Harch Energy\'s solar and wind infrastructure. Zero-carbon electricity ensures ESG compliance and cost advantages of 40-60% versus grid-powered facilities.' },
  { icon: Globe, title: 'Submarine Connectivity', desc: 'Direct connection to 4 submarine cable systems providing ultra-low latency to Europe (8ms), the Americas (35ms), and the Middle East (20ms).' },
  { icon: Shield, title: 'Sovereign Security', desc: 'End-to-end security from physical access to data encryption. Harch Technology\'s cybersecurity suite provides sovereign-grade protection for sensitive compute workloads.' },
  { icon: BarChart3, title: 'AI Platform', desc: 'Full-stack AI platform from data ingestion to model deployment. Managed services for training, fine-tuning, and inference with enterprise SLAs.' },
];

const specTable = [
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
];

const milestones = [
  { year: '2025 Q1', title: 'Site Selection', desc: '50-hectare site secured in Dakhla Technology Park.' },
  { year: '2025 Q3', title: 'Engineering Design', desc: 'Architecture and engineering design completed by Arup and Jacobs.' },
  { year: '2026 Q2', title: 'Construction Begins', desc: 'Phase 1 ground-breaking. 100MW module construction starts.' },
  { year: '2027 Q3', title: 'Phase 1 Live', desc: 'First 100MW module operational. GPU clusters online.' },
  { year: '2028 Q1', title: 'Phase 2 Online', desc: '200MW total capacity. Enterprise customers onboarded.' },
  { year: '2028 Q4', title: 'Full Capacity', desc: '500MW total. 50K+ GPUs. Continental AI backbone operational.' },
];

export default function SubsidiaryPageClient({ slug }: { slug: string }) {
  const subsidiaryData: Record<string, {
    name: string; version: string; heroTitle: string; heroSubtitle: string; heroImage: string; overview: string; investment: string;
    metrics: { value: number; prefix: string; suffix: string; label: string }[];
    capabilities: { icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; title: string; desc: string }[];
    specTable: { spec: string; value: string; phase: string }[];
    milestones: { year: string; title: string; desc: string }[];
    location: string; locationDesc: string;
  }> = {
    intelligence: {
      name: 'Harch Intelligence', version: '/0.1', heroTitle: "Africa's Largest AI\nHyperscale Data Center", heroSubtitle: '500MW of sovereign AI compute infrastructure', heroImage: '/images/hero-intelligence.jpg',
      overview: 'Harch Intelligence is building a 500MW AI-ready hyperscale data center in Dakhla, Morocco — powered entirely by renewable energy and designed to serve as the backbone of Africa\'s sovereign AI compute infrastructure. The facility will host next-generation GPU clusters, supporting large language model training and inference at continental scale, with direct submarine cable connectivity to Europe and the Americas.',
      investment: '$800M', metrics, capabilities, specTable, milestones, location: 'Dakhla, Morocco', locationDesc: 'Strategic location on the Atlantic coast with direct access to submarine cable landing stations and exceptional renewable energy resources.',
    },
    cement: {
      name: 'Harch Ciment', version: '/0.2', heroTitle: "Building West Africa's\nFuture", heroSubtitle: '500kT/yr cement production serving the construction boom', heroImage: '/images/hero-cement.jpg',
      overview: 'Harch Ciment is developing a 500kT/yr cement production facility in Gambia, serving West Africa\'s construction boom with vertically integrated operations from quarry to delivery. Our model captures the full value chain, creating structural cost advantages of 30-50% versus import-dependent competitors.',
      investment: '$200M',
      metrics: [
        { value: 500, prefix: '', suffix: 'kT/yr', label: 'Production Capacity' },
        { value: 30, prefix: '', suffix: '%', label: 'Cost Advantage' },
        { value: 800, prefix: '', suffix: '+', label: 'Direct Jobs' },
        { value: 200, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Server, title: 'Quarry Operations', desc: 'Vertically integrated limestone quarry with 50+ year reserves. In-country raw material sourcing eliminates import dependency and reduces costs by 30%.' },
        { icon: Cpu, title: 'Modern Kiln Technology', desc: 'State-of-the-art rotary kiln with waste heat recovery and AI-optimized production. 40% lower energy consumption versus regional competitors.' },
        { icon: Zap, title: 'Green Cement', desc: 'Blended cement formulations using locally sourced pozzolanic materials, reducing the clinker factor and carbon footprint by 25%.' },
        { icon: Globe, title: 'Regional Distribution', desc: 'Strategic location on the Gambia River with barge and road access to Senegal, Guinea-Bissau, and Guinea. 500km distribution radius.' },
        { icon: Shield, title: 'Quality Assurance', desc: 'ISO 9001 certified production with AI-powered quality monitoring. Consistent product quality that exceeds regional standards.' },
        { icon: BarChart3, title: 'Market Position', desc: 'First-mover advantage in Gambia with barriers to entry for competitors. 60% market share target within 3 years of commissioning.' },
      ],
      specTable: [
        { spec: 'Capacity', value: '500kT/yr', phase: 'Full production' },
        { spec: 'Kiln Type', value: 'Rotary', phase: 'State-of-the-art' },
        { spec: 'Clinker Factor', value: '<85%', phase: 'Green formulation' },
        { spec: 'Quarry Reserves', value: '50+ years', phase: 'Limestone' },
        { spec: 'Distribution', value: '500km radius', phase: 'River + Road' },
        { spec: 'Energy Source', value: 'Harch Energy', phase: 'Renewable + Grid' },
        { spec: 'Certifications', value: 'ISO 9001', phase: 'Quality management' },
        { spec: 'Workforce', value: '800+', phase: 'Direct employees' },
      ],
      milestones: [
        { year: '2024 Q4', title: 'Permit Application', desc: 'Environmental and construction permits filed with Gambian authorities.' },
        { year: '2025 Q4', title: 'Permits Approved', desc: 'All construction and environmental permits approved.' },
        { year: '2026 Q2', title: 'Construction Begins', desc: 'Foundation work and kiln installation begins.' },
        { year: '2027 Q4', title: 'Commissioning', desc: 'Kiln commissioning and test production.' },
        { year: '2028 Q1', title: 'Commercial Production', desc: 'Full commercial production at 500kT/yr capacity.' },
      ],
      location: 'Gambia', locationDesc: 'Strategic location on the Gambia River with access to West African markets.',
    },
    energy: {
      name: 'Harch Energy', version: '/0.3', heroTitle: "2GW+ Renewable\nEnergy Pipeline", heroSubtitle: 'Solar, wind, and green hydrogen powering industrial sovereignty', heroImage: '/images/hero-energy.jpg',
      overview: 'Harch Energy is developing over 2 gigawatts of renewable energy capacity across Morocco and the Sahel region — combining solar, wind, and green hydrogen production to power industrial operations and data centers with zero-carbon electricity. Our integrated approach ensures energy sovereignty for the continent while creating a model for sustainable industrialization worldwide.',
      investment: '$600M',
      metrics: [
        { value: 2, prefix: '', suffix: 'GW+', label: 'Total Pipeline' },
        { value: 3, prefix: '', suffix: '', label: 'Energy Sources' },
        { value: 100, prefix: '', suffix: '%', label: 'Zero Carbon' },
        { value: 600, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Zap, title: 'Solar PV', desc: '1.2GW of solar photovoltaic capacity across Morocco\'s southern regions. Tier-1 panels with bifacial technology for maximum energy yield.' },
        { icon: Globe, title: 'Onshore Wind', desc: '800MW of onshore wind capacity in the Sahel. Modern turbines with 60%+ capacity factors in this exceptional wind corridor.' },
        { icon: Server, title: 'Green Hydrogen', desc: '200MW electrolyzer capacity for green hydrogen production. Serving industrial demand for zero-carbon fuel and chemical feedstock.' },
        { icon: Shield, title: 'Grid Integration', desc: 'AI-optimized grid management and storage systems. Battery storage ensures stable power supply 24/7 for critical industrial loads.' },
        { icon: Cpu, title: 'PPA Structuring', desc: 'Long-term power purchase agreements with Harch Corp verticals and third-party industrial customers. 20+ year contracts with inflation protection.' },
        { icon: BarChart3, title: 'Carbon Credits', desc: 'Verified carbon credits from all renewable installations. Additional revenue stream that improves project economics by 8-12%.' },
      ],
      specTable: [
        { spec: 'Solar PV', value: '1.2GW', phase: 'Morocco South' },
        { spec: 'Onshore Wind', value: '800MW', phase: 'Sahel Region' },
        { spec: 'Green H₂', value: '200MW', phase: 'Electrolyzer' },
        { spec: 'Battery Storage', value: '400MWh', phase: 'Grid stability' },
        { spec: 'PPA Duration', value: '20+ years', phase: 'Inflation-protected' },
        { spec: 'LCOE', value: '$18/MWh', phase: 'Industry-leading' },
        { spec: 'Carbon Offset', value: '3.2M tCO₂/yr', phase: 'Verified credits' },
        { spec: 'Grid Connection', value: '400kV', phase: 'High-voltage' },
      ],
      milestones: [
        { year: '2025 Q1', title: 'License Applications', desc: 'Renewable energy licenses filed for solar and wind projects.' },
        { year: '2025 Q4', title: 'Licenses Secured', desc: '2GW+ renewable energy licenses approved by Moroccan authorities.' },
        { year: '2026 Q3', title: 'Solar Construction', desc: 'First 400MW solar farm construction begins.' },
        { year: '2027 Q2', title: 'First Power', desc: '400MW solar farm online. First PPA deliveries.' },
        { year: '2028 Q4', title: '1GW Milestone', desc: '1GW total capacity operational. Wind farm commissioning.' },
        { year: '2030 Q1', title: 'Full Pipeline', desc: '2GW+ fully operational. Green hydrogen production begins.' },
      ],
      location: 'Sahel Region', locationDesc: 'Exceptional solar irradiance and wind resources across Morocco and the Sahel corridor.',
    },
    technology: {
      name: 'Harch Technology', version: '/0.4', heroTitle: "Sovereign Digital\nInfrastructure", heroSubtitle: 'AI platforms, cybersecurity, and satellite communications', heroImage: '/images/hero-technology.jpg',
      overview: 'Harch Technology provides the sovereign digital infrastructure that powers Africa\'s industrial and digital transformation. From AI platforms to cybersecurity and satellite communications, we ensure that Africa controls its own technology stack.',
      investment: '$400M',
      metrics: [
        { value: 50, prefix: '', suffix: 'K+', label: 'GPU Clusters' },
        { value: 4, prefix: '', suffix: '', label: 'Product Lines' },
        { value: 100, prefix: '', suffix: '%', label: 'Sovereign Stack' },
        { value: 400, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Cpu, title: 'AI Platform', desc: 'Full-stack AI platform for training, fine-tuning, and inference. Managed services with enterprise SLAs and sovereign data handling.' },
        { icon: Shield, title: 'Cybersecurity', desc: 'End-to-end cybersecurity suite from network monitoring to incident response. Designed for critical infrastructure protection.' },
        { icon: Globe, title: 'Satellite Communications', desc: 'Low Earth Orbit satellite connectivity for remote industrial operations. 99.99% uptime guarantee for critical sites.' },
        { icon: Server, title: 'Edge Computing', desc: 'Distributed edge computing infrastructure across 5 countries. Low-latency processing for IoT, AI inference, and real-time analytics.' },
        { icon: Zap, title: 'Sovereign Cloud', desc: 'Africa-hosted cloud infrastructure with full data sovereignty. No data leaves the continent — compliant with emerging data localization laws.' },
        { icon: BarChart3, title: 'Data Analytics', desc: 'Industrial data analytics platform combining real-time monitoring with predictive AI. Optimizing operations across all Harch verticals.' },
      ],
      specTable: [
        { spec: 'GPU Clusters', value: '50,000+', phase: 'At full scale' },
        { spec: 'AI Platform', value: 'Full Stack', phase: 'Training + Inference' },
        { spec: 'Cyber Suite', value: 'Enterprise', phase: 'Critical infrastructure' },
        { spec: 'Satellite', value: 'LEO + MEO', phase: '99.99% uptime' },
        { spec: 'Edge Nodes', value: '50+', phase: '5 countries' },
        { spec: 'Cloud', value: 'Sovereign', phase: 'Africa-hosted' },
        { spec: 'Data Residency', value: '100% Africa', phase: 'Full compliance' },
        { spec: 'Certifications', value: 'ISO 27001', phase: 'Information security' },
      ],
      milestones: [
        { year: '2025 Q2', title: 'Platform Architecture', desc: 'Sovereign AI platform architecture designed and validated.' },
        { year: '2026 Q1', title: 'Cyber Suite Launch', desc: 'Cybersecurity product suite launched for enterprise customers.' },
        { year: '2026 Q4', title: 'Edge Deployment', desc: 'First 20 edge computing nodes deployed across Morocco and Gambia.' },
        { year: '2027 Q3', title: 'Satellite Integration', desc: 'LEO satellite connectivity integrated with edge infrastructure.' },
        { year: '2028 Q2', title: 'Sovereign Cloud', desc: 'Full sovereign cloud platform operational. Enterprise customers onboarded.' },
      ],
      location: 'Casablanca, Morocco', locationDesc: 'Technology headquarters in Casablanca with distributed operations across 5 countries.',
    },
    mining: {
      name: 'Harch Mining', version: '/0.5', heroTitle: "Capturing the\nValue Chain", heroSubtitle: 'Strategic mineral extraction for the energy transition', heroImage: '/images/hero-mining.jpg',
      overview: 'Harch Mining extracts and processes strategic minerals — phosphates, cobalt, and rare earths — building in-country processing capacity that captures the value chain for Africa. While the continent holds 30% of global reserves, it captures less than 5% of the value. We change that equation.',
      investment: '$200M',
      metrics: [
        { value: 3, prefix: '', suffix: '', label: 'Strategic Minerals' },
        { value: 30, prefix: '', suffix: '%', label: 'Global Reserves' },
        { value: 500, prefix: '', suffix: '+', label: 'Direct Jobs' },
        { value: 200, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Server, title: 'Phosphate Mining', desc: 'Large-scale phosphate extraction and processing for fertilizer production. Morocco holds 75% of global phosphate reserves.' },
        { icon: Cpu, title: 'Cobalt Processing', desc: 'Cobalt extraction and refining for battery production. Critical mineral for the electric vehicle and energy storage industries.' },
        { icon: Globe, title: 'Rare Earth Extraction', desc: 'Rare earth element extraction for electronics and defense applications. In-country processing eliminates dependency on Chinese supply chains.' },
        { icon: Shield, title: 'Environmental Compliance', desc: 'ISO 14001 environmental management across all operations. Zero tailings discharge and progressive rehabilitation programs.' },
        { icon: Zap, title: 'Renewable Processing', desc: 'All mining and processing powered by Harch Energy\'s renewable infrastructure. Zero-carbon minerals for the energy transition.' },
        { icon: BarChart3, title: 'Export Infrastructure', desc: 'Port and rail infrastructure for efficient mineral export. Direct shipping routes to European and Asian markets.' },
      ],
      specTable: [
        { spec: 'Phosphates', value: '5M t/yr', phase: 'Morocco operations' },
        { spec: 'Cobalt', value: '10K t/yr', phase: 'Mauritania operations' },
        { spec: 'Rare Earths', value: '2K t/yr', phase: 'Exploration phase' },
        { spec: 'Processing', value: 'In-country', phase: 'Full refining' },
        { spec: 'Environmental', value: 'ISO 14001', phase: 'Zero discharge' },
        { spec: 'Energy', value: '100% Renewable', phase: 'Harch Energy' },
        { spec: 'Export Routes', value: '3 Ports', phase: 'Atlantic access' },
        { spec: 'Rehabilitation', value: 'Progressive', phase: 'Ongoing' },
      ],
      milestones: [
        { year: '2025 Q3', title: 'Exploration Rights', desc: 'Mining exploration rights secured in Mauritania.' },
        { year: '2026 Q2', title: 'Resource Assessment', desc: 'Full geological survey and resource assessment completed.' },
        { year: '2027 Q1', title: 'Mining Permits', desc: 'Extraction and processing permits approved.' },
        { year: '2028 Q2', title: 'Processing Plant', desc: 'Mineral processing plant construction completed.' },
        { year: '2029 Q1', title: 'Full Production', desc: 'All three minerals in production. Export operations begin.' },
      ],
      location: 'Mauritania', locationDesc: 'Rich mineral deposits in Mauritania with Atlantic port access for export.',
    },
    agriculture: {
      name: 'Harch Agri', version: '/0.6', heroTitle: "Precision Agriculture\nat Continental Scale", heroSubtitle: 'IoT, drones, and vertical farming across 60% of uncultivated arable land', heroImage: '/images/verticals/agriculture.jpg',
      overview: 'Harch Agri deploys precision farming, IoT sensors, and vertical farming technology across Africa\'s 60% of the world\'s uncultivated arable land. Our approach combines cutting-edge technology with deep local knowledge to convert untapped potential into food security and export revenue.',
      investment: '$150M',
      metrics: [
        { value: 35, prefix: '$', suffix: 'B', label: 'Market Access' },
        { value: 60, prefix: '', suffix: '%', label: 'Uncultivated Land' },
        { value: 5, prefix: '', suffix: 'K ha', label: 'Active Trials' },
        { value: 150, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Cpu, title: 'Precision Farming', desc: 'IoT sensor networks and AI-optimized crop management. Real-time monitoring of soil health, water usage, and crop growth across thousands of hectares.' },
        { icon: Globe, title: 'Drone Monitoring', desc: 'Autonomous drone fleets for crop surveillance, pest detection, and precision spraying. 10x faster than traditional methods with 90% less chemical usage.' },
        { icon: Server, title: 'Vertical Farming', desc: 'Indoor vertical farming facilities for high-value crops. 95% less water usage, 10x yield per square meter, year-round production.' },
        { icon: Shield, title: 'Supply Chain', desc: 'Farm-to-market supply chain infrastructure. Cold chain logistics, processing facilities, and export networks for maximum value capture.' },
        { icon: Zap, title: 'Smart Irrigation', desc: 'AI-optimized irrigation systems reducing water usage by 60% while increasing yields by 30%. Powered by Harch Water desalination infrastructure.' },
        { icon: BarChart3, title: 'Market Intelligence', desc: 'AI-powered commodity pricing and demand forecasting. Enabling farmers to time sales for maximum revenue and plan crops for optimal market conditions.' },
      ],
      specTable: [
        { spec: 'Trial Area', value: '5,000 ha', phase: 'Senegal' },
        { spec: 'IoT Sensors', value: '10,000+', phase: 'Deployed' },
        { spec: 'Drone Fleet', value: '50+', phase: 'Autonomous' },
        { spec: 'Vertical Farms', value: '3 Facilities', phase: 'Planned' },
        { spec: 'Water Reduction', value: '60%', phase: 'vs. traditional' },
        { spec: 'Yield Increase', value: '30%', phase: 'vs. traditional' },
        { spec: 'Export Crops', value: '12 Types', phase: 'High-value' },
        { spec: 'Processing', value: 'In-country', phase: 'Value-added' },
      ],
      milestones: [
        { year: '2025 Q2', title: 'Trial Launch', desc: '5,000-hectare precision farming trial launched in Senegal.' },
        { year: '2026 Q1', title: 'IoT Deployment', desc: '10,000+ IoT sensors deployed across trial farms.' },
        { year: '2027 Q2', title: 'Drone Fleet', desc: 'Autonomous drone fleet operational for crop monitoring.' },
        { year: '2028 Q1', title: 'Vertical Farms', desc: 'First vertical farming facility commissioned.' },
        { year: '2029 Q2', title: 'Full Operations', desc: 'All Agri systems operational. Export revenue flowing.' },
      ],
      location: 'Senegal', locationDesc: 'Prime agricultural land in Senegal with access to regional and export markets.',
    },
    water: {
      name: 'Harch Water', version: '/0.7', heroTitle: "Solving Africa's\nWater Crisis", heroSubtitle: '200M m³/yr desalination with AI-optimized distribution', heroImage: '/images/verticals/water.jpg',
      overview: 'Harch Water deploys 200M m³/yr desalination capacity with AI-optimized distribution, solving Africa\'s water security crisis at continental scale. Every project allocates 10% of capacity for community use at no cost, ensuring that industrial development and human needs are met simultaneously.',
      investment: '$150M',
      metrics: [
        { value: 200, prefix: '', suffix: 'M m³/yr', label: 'Desalination Capacity' },
        { value: 10, prefix: '', suffix: '%', label: 'Community Allocation' },
        { value: 40, prefix: '', suffix: '%', label: 'Energy Reduction' },
        { value: 150, prefix: '$', suffix: 'M', label: 'Investment' },
      ],
      capabilities: [
        { icon: Server, title: 'Desalination Plants', desc: 'Reverse osmosis desalination plants powered by Harch Energy\'s renewable infrastructure. 200M m³/yr capacity serving industrial and community needs.' },
        { icon: Cpu, title: 'AI Distribution', desc: 'AI-optimized water distribution networks that reduce waste by 40% and ensure equitable allocation between industrial and community users.' },
        { icon: Globe, title: 'Smart Networks', desc: 'IoT-enabled water distribution networks with real-time monitoring, leak detection, and predictive maintenance. 99.5% network uptime.' },
        { icon: Shield, title: 'Water Quality', desc: 'Multi-stage filtration and continuous quality monitoring. WHO-standard drinking water for all community allocations.' },
        { icon: Zap, title: 'Energy Recovery', desc: 'Energy recovery devices in desalination plants reducing energy consumption by 40%. Powered by Harch Energy at $0.03/kWh — the lowest cost on the continent.' },
        { icon: BarChart3, title: 'Community Access', desc: '10% of all desalination capacity allocated for community use at zero cost. Clean water for 50M+ people across our operating regions.' },
      ],
      specTable: [
        { spec: 'Capacity', value: '200M m³/yr', phase: 'Full build-out' },
        { spec: 'Technology', value: 'Reverse Osmosis', phase: 'Latest generation' },
        { spec: 'Energy Use', value: '2.5 kWh/m³', phase: 'Industry-leading' },
        { spec: 'Recovery Rate', value: '45%', phase: 'High-efficiency' },
        { spec: 'Community', value: '10% Free', phase: '20M m³/yr' },
        { spec: 'Network Uptime', value: '99.5%', phase: 'IoT monitoring' },
        { spec: 'Water Quality', value: 'WHO Standard', phase: 'Continuous monitoring' },
        { spec: 'Leak Detection', value: 'AI-Powered', phase: 'Real-time' },
      ],
      milestones: [
        { year: '2025 Q3', title: 'Pilot Launch', desc: 'Pilot desalination project launched in southern Morocco.' },
        { year: '2026 Q4', title: 'AI Distribution', desc: 'AI-optimized distribution system validated in pilot.' },
        { year: '2027 Q3', title: 'First Plant', desc: 'First full-scale desalination plant construction begins.' },
        { year: '2029 Q1', title: 'First Plant Online', desc: 'First desalination plant operational. 50M m³/yr capacity.' },
        { year: '2030 Q4', title: 'Full Capacity', desc: '200M m³/yr total. AI distribution across 3 countries.' },
      ],
      location: 'Mali', locationDesc: 'Operations across water-stressed regions of West Africa with critical community needs.',
    },
  };

  const data = subsidiaryData[slug];
  if (!data) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold">Page not found</h1></div>;

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero with full-bleed photo */}
      <section className="photo-section relative min-h-[70vh] flex items-end">
        <Image src={data.heroImage} alt={data.name} fill className="object-cover" priority />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
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

      {/* Overview */}
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

      {/* Capabilities */}
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

      {/* Data Table */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Technical Specifications</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">Key Metrics</h2>
            <p className="max-w-xl text-[15px] text-[#999999] leading-relaxed mb-12">Detailed specifications and performance targets for {data.name}.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-[#121212] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
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

      {/* Photo Background Section */}
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

      {/* Milestones */}
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

      {/* CTA */}
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
