'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield, Zap, Target, Radar, Eye, Crosshair,
  DollarSign, Gauge, ChevronRight, ArrowRight,
  ZapOff, Scan, RadioTower, Flame, Radiation, Wifi
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   AEGIS DEFENSE SYSTEMS — HarchCorp Unified Design System
   Site palette — Amber accent (#C7923E) — Shared CSS classes
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
   DATA — Aegis Counter-UAS Defense System
   ═══════════════════════════════════════════════════ */

const ACCENT = '#C7923E';

const keyMetrics = [
  { value: 4200, prefix: '$', suffix: '', label: 'Cost per Unit' },
  { value: 50, prefix: '', suffix: ' Hz', label: 'Processing Speed' },
  { value: 500, prefix: '', suffix: '', label: 'Drone Swarm Capacity' },
  { value: 10, prefix: '', suffix: ' Outperformed', label: 'Competitors' },
];

const threatData = [
  { value: 350, prefix: '', suffix: '+', label: 'Drone Incursions (2024)' },
  { value: 100, prefix: '', suffix: '', label: 'US Military Bases Affected' },
  { value: 2.4, prefix: '$', suffix: 'B', label: 'DoD Counter-UAS Budget FY25' },
  { value: 0, prefix: '', suffix: '', label: 'Deployed Aegis-Level Systems', special: true },
];

const techSegments = [
  { name: 'Radar', range: '5-12km', icon: Radar, desc: 'Long-range detection and tracking of UAS threats across extended perimeters', color: 'rgba(199,146,62,0.8)' },
  { name: 'RF Passive', range: '5-15km', icon: RadioTower, desc: 'Silent spectrum surveillance — detect without revealing defensive posture', color: 'rgba(199,146,62,0.7)' },
  { name: 'EO/IR', range: '2-5km', icon: Eye, desc: 'Electro-optical and infrared thermal imaging for visual confirmation', color: 'rgba(199,146,62,0.6)' },
  { name: 'RF/GPS Jamming', range: '1-5km', icon: ZapOff, desc: 'Non-kinetic disruption of drone command and navigation links', color: 'rgba(199,146,62,0.5)' },
  { name: 'DEW Laser', range: '1-5km', icon: Flame, desc: 'Directed energy weapons for precision kinetic neutralization', color: 'rgba(199,146,62,0.4)' },
  { name: 'HPM', range: '0.5-3km', icon: Radiation, desc: 'High-power microwave pulses for swarm-level electronic defeat', color: 'rgba(199,146,62,0.35)' },
  { name: 'Protocol Manipulation', range: '1-5km', icon: Wifi, desc: 'Commandeer and land hostile drones through protocol exploitation', color: 'rgba(199,146,62,0.3)' },
];

const competitors = [
  { name: 'Aegis', score: 30, cost: '$4,200', speed: '50 Hz', swarm: '500', filter: 'Byzantine MAD', tracking: 'UKF (+30-50%)', isAegis: true },
  { name: 'BlueHalo/AV', score: 23, cost: '$50K-150K', speed: '1-5 Hz', swarm: '50-100', filter: 'None', tracking: 'EKF', isAegis: false },
  { name: 'Rafael', score: 23, cost: '$80K-200K', speed: '1-5 Hz', swarm: '100-200', filter: 'None', tracking: 'EKF', isAegis: false },
  { name: 'Anduril', score: 22, cost: '$40K-120K', speed: '5-10 Hz', swarm: '100-200', filter: 'Basic', tracking: 'EKF', isAegis: false },
  { name: 'Dedrone (Axon)', score: 21, cost: '$30K-80K', speed: '1-5 Hz', swarm: '50-100', filter: 'None', tracking: 'EKF', isAegis: false },
  { name: 'Fortem', score: 19, cost: '$50K-100K', speed: '1-5 Hz', swarm: '50-100', filter: 'None', tracking: 'EKF', isAegis: false },
];

const allCompetitors = [
  { name: 'Aegis', score: 30, isAegis: true },
  { name: 'BlueHalo/AV', score: 23, isAegis: false },
  { name: 'Rafael', score: 23, isAegis: false },
  { name: 'Anduril', score: 22, isAegis: false },
  { name: 'Dedrone (Axon)', score: 21, isAegis: false },
  { name: 'Fortem', score: 19, isAegis: false },
  { name: 'DroneShield', score: 17, isAegis: false },
  { name: 'Lockheed', score: 16, isAegis: false },
  { name: 'Robin Radar', score: 16, isAegis: false },
  { name: 'Department 13', score: 15, isAegis: false },
  { name: 'Echodyne', score: 12, isAegis: false },
];

const differentiators = [
  {
    title: 'Cost: $4,200 vs $25K-100K+',
    desc: '6-8x cheaper than DroneShield DroneGun ($25K-35K). 12-24x cheaper than Fortem DroneHunter ($50K-100K). Mass deployment becomes economically viable for the first time.',
    icon: DollarSign,
  },
  {
    title: 'Speed: 50 Hz vs 1-5 Hz',
    desc: '10-50x faster processing than the industry standard. Real-time threat response where competitors operate on perceptible delay. In swarm defense, milliseconds determine survival.',
    icon: Gauge,
  },
  {
    title: 'Swarm Capacity: 500 Drones',
    desc: 'Simultaneously track and neutralize 500 drones. Robin Radar caps at 200+. Most competitors handle 50-100. Aegis was engineered for the swarm era from day one.',
    icon: Target,
  },
  {
    title: 'UKF Tracking: +30-50% Precision',
    desc: 'Unscented Kalman Filter delivers 30-50% better tracking accuracy than the Extended Kalman Filter used by every competitor. Superior prediction means fewer missed intercepts.',
    icon: Crosshair,
  },
  {
    title: 'Byzantine MAD Filter: Exclusive',
    desc: 'No competitor has Byzantine fault-tolerant sensor fusion. The Median Absolute Deviation filter detects and isolates compromised sensors in real-time — essential when adversaries spoof your own data.',
    icon: Shield,
  },
  {
    title: 'Decoy Detection: Anti-Deception',
    desc: 'Integrated anti-deception layer identifies decoy drones, spoofed signals, and feint attacks. Prevents adversary from exhausting defensive resources on false targets.',
    icon: Scan,
  },
  {
    title: 'Energy Management: Extended Autonomy',
    desc: 'Optimized power consumption for sustained autonomous operation in field conditions. Critical for forward operating bases and austere deployment environments.',
    icon: Zap,
  },
];

const marketData = {
  tam2025: '$2.5-5.1B',
  tam2030: '$14.5-28B',
  cagr: '20-26.5%',
  dodBudget: '$2.4B',
  sam: '$800M-1.6B',
  som: '$40-80M',
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE — Aegis Defense Systems
   ═══════════════════════════════════════════════════ */
export default function AegisPageClient() {
  return (
    <div className="bg-[#1A1A1A] text-white">
      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Radial grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(199,146,62,0.06) 0%, transparent 60%),
            linear-gradient(rgba(199,146,62,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,146,62,0.02) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <p className="section-label mb-4" style={{ color: ACCENT }}>Aegis Defense Systems /0.9</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6">
              Aegis<br />Defense<br />Systems
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">
              Real-time counter-UAS defense at $4,200/unit — 6-8x cheaper, 10-50x faster than competitors. 500-drone swarm capacity with Byzantine fault-tolerant sensor fusion.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
              {keyMetrics.map((m) => (
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
          PROBLEM STATEMENT — The Drone Threat
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="section-label mb-4" style={{ color: ACCENT }}>Threat Assessment</p>
                <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                  The Drone Threat Is Here
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7] mb-6">
                  In 2024, over 350 drone incursions were recorded across 100 US military installations. The Pentagon&apos;s FY2025 Counter-UAS budget reached $2.4 billion — yet deployed systems remain slow, expensive, and incapable of handling swarm attacks. Current solutions process at 1-5 Hz, cost $25K-200K per unit, and max out at 50-200 simultaneous tracks.
                </p>
                <p className="text-[15px] text-[#999999] leading-[1.7]">
                  The gap between threat capability and defensive technology is widening. Swarm drones are no longer theoretical — they are deployed. Aegis closes this gap with an order-of-magnitude improvement in every dimension that matters: cost, speed, capacity, and resilience.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {threatData.map((m, i) => (
                  <div key={m.label} className="card p-6 relative overflow-hidden">
                    <p className="text-2xl md:text-3xl font-bold stat-mono" style={m.special ? { color: ACCENT } : { color: '#FFFFFF' }}>
                      {m.special ? (
                        <span className="stat-jitter">ACTIVE</span>
                      ) : (
                        <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                      )}
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-2 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                    {m.special && (
                      <div className="absolute top-2 right-2">
                        <span className="led-indicator led-green" style={{ width: 6, height: 6 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECHNOLOGY OVERVIEW — 7 Capability Segments
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4" style={{ color: ACCENT }}>Technology</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Seven-Layer Defense Stack
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              From long-range radar detection to protocol-level drone capture — Aegis integrates seven complementary technology segments into a unified, real-time kill chain operating at 50 Hz.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techSegments.map((seg, i) => {
              const Icon = seg.icon;
              return (
                <FadeIn key={seg.name} delay={i * 0.06}>
                  <div className="card p-6 h-full group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(199,146,62,0.08)' }}>
                        <Icon size={18} style={{ color: ACCENT }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{seg.name}</h3>
                        <p className="text-[11px] stat-mono" style={{ color: ACCENT }}>{seg.range}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#999999] leading-[1.7]">{seg.desc}</p>
                    <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                      <div className="flex items-center gap-2">
                        <div className="h-1 rounded-full" style={{ backgroundColor: seg.color, width: `${((7 - i) / 7) * 100}%` }} />
                        <span className="text-[9px] text-[#666666] stat-mono">{seg.range}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITOR COMPARISON — Scored /30
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4" style={{ color: ACCENT }}>Competitive Analysis</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Aegis vs. The Field
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Scored across cost efficiency, processing speed, swarm capacity, tracking precision, sensor fault tolerance, and operational resilience. Aegis scores 30/30. The nearest competitor scores 23.
            </p>
          </FadeIn>

          {/* Comparison Table */}
          <FadeIn delay={0.1}>
            <div className="card overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>System</th>
                      <th>Score (/30)</th>
                      <th>Cost/Unit</th>
                      <th>Processing</th>
                      <th>Swarm Cap.</th>
                      <th>Sensor Fusion</th>
                      <th>Tracking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp) => (
                      <tr key={comp.name} className={comp.isAegis ? 'bg-[rgba(199,146,62,0.04)]' : ''}>
                        <td className={comp.isAegis ? '!text-[#C7923E] !font-bold' : ''}>{comp.name}</td>
                        <td>
                          <span className="stat-mono font-bold" style={comp.isAegis ? { color: ACCENT } : {}}>{comp.score}</span>
                          <span className="text-[#666666]">/30</span>
                        </td>
                        <td className="stat-mono">{comp.cost}</td>
                        <td className="stat-mono">{comp.speed}</td>
                        <td className="stat-mono">{comp.swarm}</td>
                        <td style={comp.isAegis ? { color: ACCENT, fontWeight: 600 } : {}}>{comp.filter}</td>
                        <td style={comp.isAegis ? { color: ACCENT, fontWeight: 600 } : {}}>{comp.tracking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Score Bar Chart */}
          <FadeIn delay={0.2}>
            <div className="card p-6 md:p-8">
              <p className="section-label mb-6" style={{ color: ACCENT }}>All Competitor Scores</p>
              <div className="space-y-3">
                {allCompetitors.map((comp) => (
                  <div key={comp.name} className="flex items-center gap-4">
                    <span className={`text-[12px] w-32 text-right flex-shrink-0 ${comp.isAegis ? 'font-bold' : 'text-[#999999]'}`} style={comp.isAegis ? { color: ACCENT } : {}}>
                      {comp.name}
                    </span>
                    <div className="flex-1 h-7 bg-[rgba(255,255,255,0.02)] rounded relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(comp.score / 30) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                        className="h-full rounded"
                        style={{
                          background: comp.isAegis
                            ? `linear-gradient(90deg, rgba(199,146,62,0.6), rgba(199,146,62,0.3))`
                            : `linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`,
                        }}
                      />
                      <span className="absolute inset-0 flex items-center px-3 text-[11px] stat-mono font-bold" style={comp.isAegis ? { color: ACCENT } : { color: '#999999' }}>
                        {comp.score}/30
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STRATEGIC ADVANTAGES — 7 Differentiators
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4" style={{ color: ACCENT }}>Strategic Advantages</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Seven Unfair Advantages
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Each differentiator alone is significant. Together, they create a moat no competitor can cross without a fundamental architecture change.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {differentiators.map((diff, i) => {
              const Icon = diff.icon;
              return (
                <FadeIn key={diff.title} delay={i * 0.06}>
                  <div className="card p-6 h-full group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(199,146,62,0.08)' }}>
                        <Icon size={18} style={{ color: ACCENT }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-white mb-2">{diff.title}</h3>
                        <p className="text-[13px] text-[#999999] leading-[1.7]">{diff.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center gap-2">
                      <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">Advantage {i + 1} of 7</span>
                      <ChevronRight size={10} className="text-[#666666] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET OPPORTUNITY — TAM/SAM/SOM
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4" style={{ color: ACCENT }}>Market Opportunity</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              $14.5-28B by 2030
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              The counter-UAS market is one of the fastest-growing defense segments globally, driven by asymmetric drone warfare, swarm threats, and critical infrastructure protection mandates.
            </p>
          </FadeIn>

          {/* TAM/SAM/SOM Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FadeIn delay={0.05}>
              <div className="card p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
                <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] mb-3">Total Addressable Market</p>
                <p className="text-3xl md:text-4xl font-bold text-white stat-mono mb-2">
                  <AnimatedCounter target={14.5} prefix="$" suffix="B" />
                </p>
                <p className="text-[12px] text-[#666666]">2030 Low Estimate</p>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  <p className="text-[11px] text-[#999999]">2025: {marketData.tam2025}</p>
                  <p className="text-[11px] text-[#999999]">CAGR: {marketData.cagr}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, opacity: 0.6 }} />
                <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] mb-3">Serviceable Addressable Market</p>
                <p className="text-3xl md:text-4xl font-bold text-white stat-mono mb-2">
                  <AnimatedCounter target={1.6} prefix="$" suffix="B" />
                </p>
                <p className="text-[12px] text-[#666666]">US + Allied Defense</p>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  <p className="text-[11px] text-[#999999]">DoD Budget FY25: {marketData.dodBudget}</p>
                  <p className="text-[11px] text-[#999999]">Range: {marketData.sam}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="card p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, opacity: 0.3 }} />
                <p className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] mb-3">Serviceable Obtainable Market</p>
                <p className="text-3xl md:text-4xl font-bold text-white stat-mono mb-2">
                  <AnimatedCounter target={80} prefix="$" suffix="M" />
                </p>
                <p className="text-[12px] text-[#666666]">Year 3-5 Target</p>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  <p className="text-[11px] text-[#999999]">Range: {marketData.som}</p>
                  <p className="text-[11px]" style={{ color: ACCENT }}>5-10% SAM capture</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Market Growth Timeline */}
          <FadeIn delay={0.2}>
            <div className="card p-6 md:p-8">
              <p className="section-label mb-6" style={{ color: ACCENT }}>Market Growth Trajectory</p>
              <div className="flex items-end gap-2 md:gap-4 h-48">
                {[
                  { year: '2025', value: 5.1, pct: 18 },
                  { year: '2026', value: 6.4, pct: 23 },
                  { year: '2027', value: 8.1, pct: 29 },
                  { year: '2028', value: 10.2, pct: 36 },
                  { year: '2029', value: 12.5, pct: 45 },
                  { year: '2030', value: 14.5, pct: 52 },
                  { year: '2031', value: 21, pct: 75 },
                  { year: '2032', value: 28, pct: 100 },
                ].map((item) => (
                  <div key={item.year} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] stat-mono text-[#999999]">${item.value}B</span>
                    <div className="w-full rounded-t" style={{
                      height: `${item.pct}%`,
                      background: `linear-gradient(180deg, rgba(199,146,62,0.5), rgba(199,146,62,0.15))`,
                      minHeight: 8,
                    }} />
                    <span className="text-[9px] text-[#666666] font-[family-name:var(--font-space-mono)]">{item.year}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <p className="text-[10px] text-[#666666]">Sources: Markets and Markets, Grand View Research, Mordor Intelligence. CAGR range 20-26.5%. US DoD Counter-UAS budget FY2025: $2.4B.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Defense Partnerships
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(199,146,62,0.04) 0%, transparent 50%)`,
        }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="card p-10 md:p-16 text-center max-w-3xl mx-auto" style={{ borderColor: 'rgba(199,146,62,0.15)' }}>
              <div className="flex items-center justify-center mb-6">
                <span className="led-indicator" style={{ width: 6, height: 6 }} />
                <span className="text-[10px] text-[#666666] uppercase tracking-[0.15em] font-bold font-[family-name:var(--font-space-mono)] ml-2">Active Solicitation</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                Secure Your Perimeter
              </h2>
              <div className="accent-line mb-6 mx-auto" style={{ margin: '0 auto' }} />
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-10 max-w-xl mx-auto">
                Aegis is seeking defense partnerships, government contracts, and strategic integrators. $4,200/unit makes mass deployment viable for the first time. Let&apos;s discuss how Aegis can protect your assets.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[rgba(199,146,62,0.5)] bg-[rgba(199,146,62,0.08)] text-[rgba(199,146,62,0.9)] text-[11px] tracking-[0.1em] uppercase px-8 py-3.5 rounded-md font-semibold hover:bg-[rgba(199,146,62,0.15)] hover:border-[rgba(199,146,62,0.7)] hover:text-[#C7923E] transition-colors font-[family-name:var(--font-space-mono)]"
                >
                  Request Briefing
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/investors"
                  className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(255,255,255,0.5)] text-[10px] tracking-[0.1em] uppercase px-8 py-3 rounded-md font-semibold hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors font-[family-name:var(--font-space-mono)]"
                >
                  Investor Relations
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
