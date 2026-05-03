'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Activity, BarChart3, Brain, Cpu, Database,
  Gauge, Globe, Layers, Leaf, Lock, Monitor, Network, Radio,
  Server, Shield, Thermometer, Wifi, Wind, Zap, Code2, Key,
  CloudCog, FileCode2, GitBranch, Boxes, Eye, Rocket, CheckCircle2,
  Sun, Droplets, MapPin
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── ANIMATION HELPERS ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

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

/* ─── DATA ─── */
const hubs = [
  {
    id: 'alpha', name: 'Harch Alpha', location: 'Dakhla', energy: 'Offshore Wind',
    power: '50MW', latency: '<12ms to Europe', color: '#3B82F6',
    icon: Wind, image: '/images/intelligence/harchos-tanger.png',
    description: 'Primary hub connected to submarine cables. Offshore wind 24/7, the Europe-Africa compute gateway.',
  },
  {
    id: 'beta', name: 'Harch Beta', location: 'Tanger', energy: 'Wind + Tidal',
    power: '50MW', latency: '<5ms to Europe', color: '#06B6D4',
    icon: Droplets, image: '/images/intelligence/harchos-facility-night.png',
    description: 'Lowest latency to Europe. Wind-tidal combo for maximum availability.',
  },
  {
    id: 'gamma', name: 'Harch Gamma', location: 'Ouarzazate', energy: 'Solar CSP+PV',
    power: '50MW', latency: 'Continental', color: '#F59E0B',
    icon: Sun, image: '/images/intelligence/harchos-energy-mix.png',
    description: 'Heart of the Saharan desert. CSP solar with thermal storage for nighttime inference.',
  },
  {
    id: 'delta', name: 'Harch Delta', location: 'Casablanca', energy: 'Grid Mix + Solar',
    power: '50MW', latency: 'Urban hub', color: '#8B5CF6',
    icon: Network, image: '/images/intelligence/harchos-mesh-map.png',
    description: 'Urban hub connected to the national backbone. Proximity to enterprise and government clients.',
  },
  {
    id: 'epsilon', name: 'Harch Epsilon', location: 'Benguerir', energy: 'Solar + Wind',
    power: '50MW', latency: 'R&D cluster', color: '#10B981',
    icon: Leaf, image: '/images/intelligence/harchos-architecture.png',
    description: 'Greenfield R&D next to Mohammed VI Polytechnic. AI innovation and training hub.',
  },
];

const architectureLayers = [
  {
    id: 'sense', name: 'SENSE', tag: 'Perception Layer',
    icon: Eye, color: '#06B6D4',
    description: '50,000+ data points per second. Real-time IoT monitoring, weather/energy forecasting, infrared sensors, satellite data and API ingestion. The SENSE layer is the eyes and ears of the mesh — capturing every signal before it becomes critical.',
    specs: [
      { label: 'Data ingestion', value: '50K+ pts/sec' },
      { label: 'Sensor types', value: 'IoT, Satellite, API' },
      { label: 'Forecast window', value: '4h ahead' },
      { label: 'Resolution', value: '1-second granularity' },
    ],
  },
  {
    id: 'think', name: 'THINK', tag: 'Intelligence Layer',
    icon: Brain, color: '#8B5CF6',
    description: 'Proprietary ML models for multi-objective optimization. Predictive workload placement 4 hours ahead, autoscaling based on demand and energy production forecasts. The THINK layer decides where, when, and how every compute job runs across the mesh.',
    specs: [
      { label: 'Prediction horizon', value: '4 hours' },
      { label: 'Model types', value: 'RL, Transformer, GNN' },
      { label: 'Optimization', value: 'Multi-objective' },
      { label: 'Decision latency', value: '<50ms' },
    ],
  },
  {
    id: 'act', name: 'ACT', tag: 'Execution Layer',
    icon: Zap, color: '#10B981',
    description: 'Live container migration between hubs, real-time GPU context switching, automatic zero-downtime failover. The ACT layer executes THINK decisions in under 200ms — moving entire workloads between data centers without service interruption.',
    specs: [
      { label: 'Container migration', value: 'Live, <200ms' },
      { label: 'Failover', value: 'Zero-downtime' },
      { label: 'GPU switching', value: 'Real-time context' },
      { label: 'SLA guarantee', value: '99.999%' },
    ],
  },
];

const capabilities = [
  {
    icon: Boxes, title: 'Workload Orchestration',
    desc: 'Intelligent workload placement across all 5 hubs. Real-time optimization of energy cost, latency, and data sovereignty. Every job is routed to the optimal hub based on 47 simultaneous parameters.',
  },
  {
    icon: Brain, title: 'ML Predictive Scheduling',
    desc: 'Reinforcement learning algorithms that predict compute demand 4 hours ahead and adjust GPU distribution accordingly. 35% reduction in energy costs compared to static scheduling.',
  },
  {
    icon: Leaf, title: 'Carbon-Aware Scheduling',
    desc: 'Every workload is timestamped and geo-located to maximize renewable energy utilization. Batch jobs are shifted to solar hubs during the day and wind hubs at night.',
  },
  {
    icon: Shield, title: 'Data Sovereignty Engine',
    desc: 'Data sovereignty policies built into the orchestrator. Sensitive data never leaves Moroccan jurisdiction. Automatic GDPR and Law 09-08 compliance.',
  },
  {
    icon: CloudCog, title: 'Green GPU Cloud',
    desc: 'On-demand GPU access, 100% powered by renewable energy. Competitive pricing with traditional cloud providers, with no compromise on sustainability. H100/A100 available.',
  },
  {
    icon: Key, title: 'HarchOS Licensing',
    desc: 'HarchOS licensing for third-party operators. Deploy the AI sovereignty OS in your own data centers. Support, updates, and access to the Harch Corp partner ecosystem.',
  },
];

const specs = [
  { category: 'Compute', items: [
    { spec: 'Total GPU Capacity', value: '25,000+ GPUs' },
    { spec: 'GPU Types', value: 'H100, A100, MI300X' },
    { spec: 'Interconnect', value: 'NVLink + InfiniBand' },
    { spec: 'Max Partition', value: '4,096 GPUs' },
    { spec: 'Scaling Efficiency', value: '>92% linear' },
  ]},
  { category: 'Power & Energy', items: [
    { spec: 'Total Installed', value: '250MW' },
    { spec: 'SLA Guaranteed', value: '200MW' },
    { spec: 'Floating Reserve', value: '50MW' },
    { spec: 'Energy Source', value: '100% Renewable' },
    { spec: 'PUE', value: '<1.15' },
  ]},
  { category: 'Network', items: [
    { spec: 'Backbone', value: '400Gbps' },
    { spec: 'Inter-hub', value: '100Gbps dedicated' },
    { spec: 'Submarine Cables', value: '4 systems' },
    { spec: 'Latency EU', value: '<5-12ms' },
    { spec: 'Latency US', value: '<35ms' },
  ]},
  { category: 'Reliability', items: [
    { spec: 'Uptime SLA', value: '99.999%' },
    { spec: 'Failover', value: '<200ms' },
    { spec: 'Data Durability', value: '11 nines' },
    { spec: 'Backup Strategy', value: '3-2-1 + geo-redundant' },
    { spec: 'Disaster Recovery', value: 'RPO <1min, RTO <5min' },
  ]},
];

const securityFeatures = [
  { icon: Lock, title: 'Sovereign Encryption', desc: 'End-to-end encryption with locally managed keys. No backdoors, no third-party access. FIPS 140-2 Level 3 HSMs in every hub.' },
  { icon: Shield, title: 'Zero Trust Architecture', desc: 'Every request is authenticated and authorized, including between internal services. Mandatory mTLS, micro-granular network segmentation.' },
  { icon: Eye, title: 'Continuous Monitoring', desc: '24/7 SIEM monitoring with ML-powered anomaly detection. Automated incident response in under 30 seconds.' },
  { icon: FileCode2, title: 'Compliance Automation', desc: 'Automatic GDPR, ISO 27001, SOC 2 Type II, and Moroccan Law 09-08 compliance. Continuous auditing, not point-in-time.' },
];

const devPlatform = [
  { icon: Code2, title: 'REST & gRPC APIs', desc: 'Complete APIs for provisioning, monitoring, and orchestration. Native SDKs for Python, Go, Rust, and TypeScript. Interactive OpenAPI 3.1 documentation.' },
  { icon: GitBranch, title: 'HarchOS CLI', desc: 'Command-line interface for workload deployment and management. Native integration with CI/CD pipelines, Terraform provider, and Kubernetes operator.' },
  { icon: Monitor, title: 'Observability Suite', desc: 'Integrated Grafana dashboards, Prometheus metrics, Jaeger distributed tracing. Structured logs with full-text search and intelligent alerting.' },
  { icon: Database, title: 'Data Pipeline SDK', desc: 'Petabyte-scale dataset ingestion, transformation, and versioning. Native connectors for S3, GCS, Azure Blob, and Hadoop.' },
];

const roadmap = [
  { phase: 'Q1 2025', title: 'Foundation', items: ['HarchOS kernel v0.1', 'SENSE layer MVP', 'Hub Alpha (Dakhla) design complete'] },
  { phase: 'Q3 2025', title: 'First Hub Live', items: ['Hub Alpha operational', 'SENSE + THINK layers active', 'First customer workloads'] },
  { phase: 'Q1 2026', title: 'Mesh Expansion', items: ['Hub Beta (Tanger) online', 'ACT layer deployment', 'Live container migration'] },
  { phase: 'Q3 2026', title: 'Full Mesh', items: ['Hub Gamma + Delta online', '400Gbps backbone complete', 'HarchOS Licensing beta'] },
  { phase: 'Q1 2027', title: 'Continental Scale', items: ['Hub Epsilon (Benguerir) online', 'HarchOS Licensing GA', 'Carbon-aware scheduling v2'] },
  { phase: 'Q4 2027', title: 'Sovereign AI Platform', items: ['25,000+ GPUs operational', 'Full developer platform', 'Pan-African sovereignty mesh'] },
];

/* ─── MAIN COMPONENT ─── */
export default function HarchOSPageClient() {
  const [activeArchTab, setActiveArchTab] = useState('sense');
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const activeArch = architectureLayers.find(l => l.id === activeArchTab)!;

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <Image
          src="/images/intelligence/harchos-hero.png"
          alt="HarchOS Data Center Infrastructure"
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-transparent to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Harch Intelligence /0.1</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6">
              HarchOS<span className="text-[#06B6D4]">™</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">
              The Operating System for Sovereign AI Infrastructure
            </p>
            <p className="text-[15px] text-[#999999] max-w-xl leading-[1.7] mb-8">
              5 AI compute hubs. 250MW installed. 100% renewable energy. A distributed mesh orchestrating Africa\'s sovereign compute — from perception to execution.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="#architecture" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                Explore Architecture <ArrowRight size={14} />
              </Link>
              <Link href="#capabilities" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                View Capabilities
              </Link>
            </div>
          </FadeIn>
          {/* Floating stats */}
          <FadeIn delay={0.5}>
            <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
              {[
                { value: 250, suffix: 'MW', label: 'Installed' },
                { value: 5, suffix: '', label: 'Hubs' },
                { value: 400, suffix: 'Gbps', label: 'Backbone' },
                { value: 100, suffix: '%', label: 'Renewable' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: MANIFESTO
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-8 text-[#06B6D4]">Manifesto</p>
            <blockquote className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[1.15] tracking-[-0.01em] max-w-4xl">
              &ldquo;Your compute infrastructure is the weapons system of the 21st century. Sovereignty is not negotiable.&rdquo;
            </blockquote>
            <div className="accent-line mt-8 mb-6" />
            <p className="text-[15px] text-[#999999] max-w-2xl leading-[1.7]">
              HarchOS is not a product — it is a doctrine. Every line of code, every GPU rack, every kWh of renewable energy is designed for one thing: ensuring Africa&apos;s compute remains under African control.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: INFRASTRUCTURE PHOTO BREAK
          ═══════════════════════════════════════════ */}
      <section className="py-0 bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <FadeIn>
              <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
                <Image src="/images/intelligence/harchos-facility-night.png" alt="Data Center Infrastructure" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-space-mono)]">Infrastructure</p>
                  <p className="text-xl font-bold text-white mt-1">Hyperscale Facilities</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
                <Image src="/images/intelligence/harchos-energy-mix.png" alt="Renewable Energy Infrastructure" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-space-mono)]">Energy</p>
                  <p className="text-xl font-bold text-white mt-1">100% Renewable Power</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: ARCHITECTURE — SENSE / THINK / ACT
          ═══════════════════════════════════════════ */}
      <section id="architecture" className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Architecture</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Three Layers.<br/>One System.
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              HarchOS operates on three interconnected layers: SENSE captures signals, THINK makes decisions, ACT executes in real-time. A complete perception-decision-action cycle in under 200ms.
            </p>
          </FadeIn>

          {/* Architecture Tabs */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <FadeIn>
              <div className="flex lg:flex-col gap-2">
                {architectureLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveArchTab(layer.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-lg border transition-all text-left min-w-[180px] ${
                      activeArchTab === layer.id
                        ? 'bg-[rgba(255,255,255,0.06)] border-white/15 text-white'
                        : 'border-transparent text-[#999999] hover:text-white hover:bg-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <layer.icon size={18} style={{ color: layer.color }} />
                    <div>
                      <p className="text-sm font-bold">{layer.name}</p>
                      <p className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">{layer.tag}</p>
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activeArch.color}15` }}>
                        <activeArch.icon size={20} style={{ color: activeArch.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{activeArch.name}</h3>
                        <p className="text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">{activeArch.tag}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                      {activeArch.description}
                    </p>
                    <div className="space-y-4">
                      {activeArch.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                          <span className="text-[13px] text-[#999999]">{spec.label}</span>
                          <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[300px] lg:h-full min-h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/intelligence/harchos-gpu-cluster.png"
                      alt={`${activeArch.name} Layer`}
                      fill
                      className="object-cover industrial-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: DISTRIBUTED MESH — Interactive Hub Map
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/intelligence/harchos-energy-mix.png" alt="" fill className="object-cover" style={{ filter: 'brightness(0.2) saturate(0)' }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Distributed Mesh</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Five Hubs.<br/>One Mesh.
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              The Harch Intelligence Distributed Mesh spans 5 strategic sites across Morocco — each hub powered by local renewable energy, connected by a 400Gbps backbone.
            </p>
          </FadeIn>

          {/* Hub Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubs.map((hub, i) => (
              <FadeIn key={hub.id} delay={i * 0.08}>
                <div
                  onClick={() => setActiveHub(activeHub === hub.id ? null : hub.id)}
                  className={`card cursor-pointer overflow-hidden group ${activeHub === hub.id ? 'ring-1' : ''}`}
                  style={activeHub === hub.id ? { ringColor: hub.color, borderColor: `${hub.color}30` } : {}}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={hub.image} alt={hub.name} fill className="object-cover industrial-image group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hub.color }} />
                        <span className="text-[10px] text-white/70 font-[family-name:var(--font-space-mono)] uppercase tracking-wider">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <hub.icon size={16} style={{ color: hub.color }} />
                      <h3 className="text-lg font-bold text-white">{hub.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[rgba(255,255,255,0.04)] text-[#999999]">
                        <MapPin size={10} className="inline mr-1" />{hub.location}
                      </span>
                      <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[rgba(255,255,255,0.04)] text-[#999999]">
                        <Zap size={10} className="inline mr-1" />{hub.power}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#666666] leading-[1.6] mb-2">
                      {hub.energy}
                    </p>
                    <p className="text-[10px] text-[#06B6D4] font-[family-name:var(--font-space-mono)]">
                      {hub.latency}
                    </p>
                    {activeHub === hub.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-white/[0.04]"
                      >
                        <p className="text-[13px] text-[#999999] leading-[1.7]">{hub.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mesh Summary Stats */}
          <FadeIn>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Installed', value: '250MW', accent: '#06B6D4' },
                { label: 'SLA Guaranteed', value: '200MW', accent: '#8B5CF6' },
                { label: 'Floating Reserve', value: '50MW', accent: '#10B981' },
                { label: 'Backbone', value: '400Gbps', accent: '#F59E0B' },
              ].map((stat) => (
                <div key={stat.label} className="card p-6 text-center">
                  <p className="text-2xl font-bold text-white stat-mono mb-1">{stat.value}</p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: OPS CENTER DASHBOARD
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <p className="section-label mb-4 text-[#06B6D4]">Operations Center</p>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                  Real-Time<br/>Command & Control
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                  The HarchOS Operations Center provides real-time visibility across the entire mesh. Energy consumption monitoring, GPU distribution, inter-hub latency, and workload health — all in a unified dashboard.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 250, suffix: 'MW', label: 'Total Power' },
                    { value: 200, suffix: 'MW', label: 'SLA Power' },
                    { value: 50, suffix: 'MW', label: 'Reserve' },
                    { value: 400, suffix: 'Gbps', label: 'Backbone' },
                  ].map((stat) => (
                    <div key={stat.label} className="card p-5">
                      <p className="text-2xl font-bold text-white stat-mono">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative rounded-xl overflow-hidden h-[500px] lg:h-[600px]">
                <Image src="/images/intelligence/harchos-ops-center.png" alt="HarchOS Operations Center" fill className="object-cover industrial-image" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1A1A1A]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: CAPABILITIES
          ═══════════════════════════════════════════ */}
      <section id="capabilities" className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Capabilities</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              What HarchOS<br/>Delivers
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Six foundational capabilities that transform AI compute from a cost center into a sovereign strategic advantage.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.08}>
                <div className="card p-8 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.08)] flex items-center justify-center mb-5">
                    <cap.icon size={18} className="text-[#06B6D4]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: TECHNICAL SPECS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Specifications</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Technical Deep Dive
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specs.map((category) => (
              <FadeIn key={category.category}>
                <div className="card p-8">
                  <h3 className="text-lg font-bold text-white mb-1">{category.category}</h3>
                  <div className="accent-line mb-6" />
                  <div className="space-y-0">
                    {category.items.map((item) => (
                      <div key={item.spec} className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-0">
                        <span className="text-[13px] text-[#999999]">{item.spec}</span>
                        <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{item.value}</span>
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
          SECTION 9: SECURITY & COMPLIANCE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Security</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Sovereign Security<br/>by Design
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Security is not an add-on in HarchOS — it is architectural. Every layer, every API, every workload is secure by default.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.08)] flex items-center justify-center">
                      <feat.icon size={18} className="text-[#06B6D4]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Compliance Badges */}
          <FadeIn>
            <div className="mt-12 flex flex-wrap gap-3">
              {['GDPR', 'ISO 27001', 'SOC 2 Type II', 'Law 09-08', 'FIPS 140-2 L3', 'TLS 1.3'].map((cert) => (
                <span key={cert} className="px-4 py-2 rounded-lg bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.15)] text-[11px] font-semibold text-[#06B6D4] font-[family-name:var(--font-space-mono)]">
                  {cert}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10: DEVELOPER PLATFORM
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Developer Platform</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Build on<br/>HarchOS
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              APIs, SDKs, and CLI tools to integrate the HarchOS mesh into your existing workflows. Deploy, monitor, and orchestrate — programmatically.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devPlatform.map((tool, i) => (
              <FadeIn key={tool.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.08)] flex items-center justify-center">
                      <tool.icon size={18} className="text-[#06B6D4]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                  </div>
                  <div className="accent-line mb-4" />
                  <p className="text-[14px] text-[#999999] leading-[1.7]">{tool.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Code Snippet Preview */}
          <FadeIn>
            <div className="mt-12 card overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                <span className="ml-4 text-[11px] text-[#666666] font-[family-name:var(--font-space-mono)]">deploy-workload.ts</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.8]">
                <p><span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">HarchOS</span> <span className="text-[#C678DD]">from</span> <span className="text-[#98C379]">&apos;@harchos/sdk&apos;</span>;</p>
                <p className="mt-2"><span className="text-[#C678DD]">const</span> <span className="text-[#61AFEF]">client</span> = <span className="text-[#C678DD]">await</span> <span className="text-[#E5C07B]">HarchOS</span>.<span className="text-[#61AFEF]">create</span>({'{'}</p>
                <p className="ml-4"><span className="text-[#E06C75]">region</span>: <span className="text-[#98C379]">&apos;morocco&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">sovereignty</span>: <span className="text-[#98C379]">&apos;strict&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">carbonAware</span>: <span className="text-[#D19A66]">true</span>,</p>
                <p>{'}'});</p>
                <p className="mt-2"><span className="text-[#C678DD]">const</span> <span className="text-[#61AFEF]">job</span> = <span className="text-[#C678DD]">await</span> <span className="text-[#61AFEF]">client</span>.<span className="text-[#61AFEF]">deploy</span>({'{'}</p>
                <p className="ml-4"><span className="text-[#E06C75]">gpu</span>: <span className="text-[#98C379]">&apos;H100&apos;</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">count</span>: <span className="text-[#D19A66]">256</span>,</p>
                <p className="ml-4"><span className="text-[#E06C75]">schedule</span>: <span className="text-[#98C379]">&apos;carbon-optimal&apos;</span>,</p>
                <p>{'}'});</p>
                <p className="mt-1 text-[#5C6370]">// Deployed to Hub Alpha — wind energy at 98% capacity</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11: NETWORK INFRASTRUCTURE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            <FadeIn>
              <div className="flex items-center px-8 md:px-16 lg:px-24 py-20">
                <div className="max-w-xl">
                  <p className="section-label mb-4 text-[#06B6D4]">Network</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-6">
                    400Gbps<br/>Continental Backbone
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                    Four submarine cables, 100Gbps dedicated inter-hub links, and a 400Gbps backbone connecting the HarchOS mesh to Europe in under 5ms and the Americas in under 35ms. Triple redundancy on every path.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: 'Latency to Europe', value: '<5-12ms' },
                      { label: 'Latency to Americas', value: '<35ms' },
                      { label: 'Submarine Cables', value: '4 systems' },
                      { label: 'Inter-hub Links', value: '100Gbps each' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                        <span className="text-[13px] text-[#999999]">{item.label}</span>
                        <span className="text-[13px] font-bold text-white font-[family-name:var(--font-space-mono)]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative min-h-[40vh] lg:min-h-0 overflow-hidden">
                <Image src="/images/intelligence/harchos-fibre.png" alt="Network Infrastructure" fill className="object-cover industrial-image" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12: ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-4">
              Deployment Timeline
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-12">
              {roadmap.map((phase, i) => (
                <FadeIn key={phase.phase} delay={i * 0.08}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-2 h-2 bg-[#06B6D4] rounded-full -translate-x-1/2 mt-2" />

                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-10 md:pl-0`}>
                      <p className="text-[11px] text-[#06B6D4] font-[family-name:var(--font-space-mono)] font-bold mb-1">{phase.phase}</p>
                      <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className={`flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <CheckCircle2 size={12} className="text-[#06B6D4] shrink-0" />
                            <span className="text-[13px] text-[#999999]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 13: CTA + BACK
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-100" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Deploy Now</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.01em] mb-6">
              Ready for Sovereign Compute?
            </h2>
            <p className="max-w-xl mx-auto text-[15px] text-white/30 leading-relaxed mb-12">
              HarchOS is the only AI infrastructure OS that combines sovereignty, sustainability, and performance. Deploy your workloads on the greenest mesh on the planet.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                Request Access <ArrowRight size={14} />
              </Link>
              <Link href="/subsidiaries/intelligence" className="inline-flex items-center gap-2.5 border border-white/12 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                <ArrowLeft size={14} /> Back to Intelligence
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
