'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Eye, Building2, Users, Landmark, Cpu, CheckCircle2, AlertTriangle, Fingerprint, Radio } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const inquiryTypes = [
  {
    id: 'government',
    label: 'Government / Defense',
    code: 'GOV',
    icon: Landmark,
    desc: 'Sovereign data infrastructure, national security platforms, intelligence systems, and government partnerships.',
    clearance: 'LEVEL 3',
  },
  {
    id: 'industrial',
    label: 'Industrial Partner',
    code: 'IND',
    icon: Building2,
    desc: 'Predictive maintenance, AI optimization, cement, energy, mining, and agricultural technology deployments.',
    clearance: 'LEVEL 2',
  },
  {
    id: 'investor',
    label: 'Investor',
    code: 'INV',
    icon: Cpu,
    desc: 'Institutional investment, co-investment opportunities, and strategic capital allocation across 8 verticals.',
    clearance: 'LEVEL 2',
  },
  {
    id: 'talent',
    label: 'Talent',
    code: 'TLN',
    icon: Users,
    desc: 'Engineering, research, operations, and leadership roles. We recruit builders, not employees.',
    clearance: 'LEVEL 1',
  },
];

// Simulated encrypted connection status
function EncryptedConnectionIndicator() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[rgba(74,123,95,0.08)] border border-[rgba(74,123,95,0.2)] rounded-lg">
      <div className="flex items-center gap-2">
        <Lock size={12} className="text-[#4A7B5F]" />
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#4A7B5F]">Encrypted Connection</span>
      </div>
      <div className="w-px h-3 bg-[rgba(255,255,255,0.1)]" />
      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A7B5F] animate-pulse" />
        <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">AES-256</span>
      </div>
      <div className="w-px h-3 bg-[rgba(255,255,255,0.1)]" />
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">SESSION {formatTime(uptime)}</span>
      </div>
    </div>
  );
}

export default function ContactPageClient() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    designation: '',
    country: '',
    message: '',
    nda: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [transmitStep, setTransmitStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    // Simulate secure transmission
    setTransmitStep(1);
    setTimeout(() => setTransmitStep(2), 800);
    setTimeout(() => setTransmitStep(3), 1600);
    setTimeout(() => {
      setSubmitted(true);
      setTransmitStep(0);
    }, 2400);
  };

  const selectedInquiry = inquiryTypes.find(t => t.id === selectedType);

  return (
    <div className="bg-[#0C0F1A]">
      {/* ═══ HERO — SECURE BRIEFING TERMINAL ═══ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#0C0F1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            {/* Classification marker */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(184,150,90,0.08)] border border-[rgba(184,150,90,0.2)] rounded">
                <Shield size={10} className="text-[#B8965A]" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#B8965A]">Secure Channel</span>
              </div>
              <EncryptedConnectionIndicator />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Request a Briefing
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#8B9DAF] leading-[1.7]">
              Harch Corp operates on a need-to-know basis. Select your inquiry type, and your request will be routed through our secure intake system. All transmissions are encrypted end-to-end.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INQUIRY TYPE SELECTOR — CLEARANCE LEVELS ═══ */}
      <section className="py-20 md:py-28 bg-[#0C0F1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <Fingerprint size={14} className="text-[#8B9DAF]" />
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF]">Select Inquiry Type</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inquiryTypes.map((type, i) => (
              <FadeIn key={type.id} delay={i * 0.08}>
                <button
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 h-full ${
                    selectedType === type.id
                      ? 'bg-[rgba(184,150,90,0.06)] border-[rgba(184,150,90,0.3)] shadow-[0_0_30px_rgba(184,150,90,0.05)]'
                      : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedType === type.id
                        ? 'bg-[rgba(184,150,90,0.12)]'
                        : 'bg-[rgba(255,255,255,0.06)]'
                    }`}>
                      <type.icon size={18} className={selectedType === type.id ? 'text-[#B8965A]' : 'text-white'} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] px-2 py-1 rounded ${
                      selectedType === type.id
                        ? 'bg-[rgba(184,150,90,0.12)] text-[#B8965A]'
                        : 'bg-[rgba(255,255,255,0.04)] text-[#666666]'
                    }`}>
                      {type.clearance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] font-bold tracking-[0.15em] font-[family-name:var(--font-space-mono)] ${
                      selectedType === type.id ? 'text-[#B8965A]' : 'text-[#666666]'
                    }`}>
                      [{type.code}]
                    </span>
                    <h3 className={`text-[15px] font-bold ${selectedType === type.id ? 'text-white' : 'text-[#999999]'}`}>
                      {type.label}
                    </h3>
                  </div>
                  <p className="text-[12px] text-[#666666] leading-relaxed">{type.desc}</p>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECURE BRIEFING FORM ═══ */}
      <section className="py-20 md:py-28 bg-[#0A0D17]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — 3 columns */}
            <div className="lg:col-span-3">
              {!selectedType ? (
                <FadeIn>
                  <div className="card p-12 text-center">
                    <div className="w-16 h-16 rounded-xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center mx-auto mb-4">
                      <Eye size={24} className="text-[#666666]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Select Inquiry Type</h3>
                    <p className="text-[14px] text-[#666666]">Choose your clearance level above to access the secure briefing form.</p>
                  </div>
                </FadeIn>
              ) : submitted ? (
                <FadeIn>
                  <div className="card p-12 text-center border-[rgba(74,123,95,0.2)]">
                    <div className="w-16 h-16 rounded-full bg-[rgba(74,123,95,0.1)] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-[#4A7B5F]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Briefing Request Transmitted</h3>
                    <p className="text-[14px] text-[#999999] max-w-md mx-auto mb-6">
                      Your encrypted briefing request has been received. Our team will respond within 24 hours through a secure channel.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(74,123,95,0.08)] border border-[rgba(74,123,95,0.15)] rounded-lg">
                      <Lock size={12} className="text-[#4A7B5F]" />
                      <span className="text-[11px] text-[#4A7B5F] font-[family-name:var(--font-space-mono)]">REF-{Math.random().toString(36).substring(2, 8).toUpperCase()}-{new Date().getTime().toString(36).toUpperCase()}</span>
                    </div>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn>
                  {/* Transmission header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Radio size={14} className={transmitStep > 0 ? 'text-[#B8965A] animate-pulse' : 'text-[#666666]'} />
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF]">
                        {selectedInquiry?.label} Briefing Request
                      </p>
                    </div>
                    <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">
                      [{selectedInquiry?.code}] {selectedInquiry?.clearance}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all font-[family-name:var(--font-space-mono)]"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all font-[family-name:var(--font-space-mono)]"
                          placeholder="secure@domain.com"
                        />
                      </div>
                    </div>

                    {/* Row 2: Organization + Designation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Organization</label>
                        <input
                          type="text"
                          required
                          value={formState.organization}
                          onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all font-[family-name:var(--font-space-mono)]"
                          placeholder="Organization name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Designation</label>
                        <input
                          type="text"
                          value={formState.designation}
                          onChange={(e) => setFormState({ ...formState, designation: e.target.value })}
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all font-[family-name:var(--font-space-mono)]"
                          placeholder="Title / Role"
                        />
                      </div>
                    </div>

                    {/* Row 3: Country */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Country</label>
                      <input
                        type="text"
                        value={formState.country}
                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                        className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all font-[family-name:var(--font-space-mono)]"
                        placeholder="Country of operation"
                      />
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2">Briefing Description</label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[rgba(184,150,90,0.3)] focus:bg-[rgba(255,255,255,0.04)] transition-all resize-none font-[family-name:var(--font-space-mono)]"
                        placeholder="Describe the nature of your inquiry. Be as specific as possible."
                      />
                    </div>

                    {/* NDA checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formState.nda}
                        onChange={(e) => setFormState({ ...formState, nda: e.target.checked })}
                        className="mt-1 accent-[#B8965A]"
                        id="nda-check"
                      />
                      <label htmlFor="nda-check" className="text-[12px] text-[#666666] leading-relaxed">
                        I understand that Harch Corp may share confidential information during the briefing process. I agree to treat all disclosed materials as confidential.
                      </label>
                    </div>

                    {/* Transmission progress */}
                    {transmitStep > 0 && (
                      <div className="px-4 py-3 bg-[rgba(184,150,90,0.04)] border border-[rgba(184,150,90,0.12)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Radio size={12} className="text-[#B8965A] animate-pulse" />
                          <span className="text-[11px] text-[#B8965A] font-[family-name:var(--font-space-mono)]">
                            {transmitStep === 1 && 'Encrypting payload...'}
                            {transmitStep === 2 && 'Routing through secure channel...'}
                            {transmitStep === 3 && 'Transmitting to Harch Corp secure intake...'}
                          </span>
                        </div>
                        <div className="mt-2 w-full h-1 rounded-full bg-[rgba(255,255,255,0.06)]">
                          <div
                            className="h-full rounded-full bg-[#B8965A] transition-all duration-700"
                            style={{ width: `${transmitStep * 33}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2.5 bg-[#B8965A] text-black px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#C9A84C] transition-all"
                      >
                        Transmit Briefing Request <ArrowRight size={14} />
                      </button>
                      <div className="flex items-center gap-2">
                        <Lock size={10} className="text-[#666666]" />
                        <span className="text-[10px] text-[#666666] font-[family-name:var(--font-space-mono)]">End-to-end encrypted</span>
                      </div>
                    </div>
                  </form>
                </FadeIn>
              )}
            </div>

            {/* Right sidebar — 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sovereign data disclaimer */}
              <FadeIn delay={0.1}>
                <div className="card p-6 border-[rgba(74,123,95,0.15)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={14} className="text-[#4A7B5F]" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#4A7B5F]">Data Sovereignty</span>
                  </div>
                  <p className="text-[13px] text-[#999999] leading-relaxed">
                    Your data is processed on sovereign infrastructure within Moroccan borders. We do not share your information with third parties. All communications are encrypted with AES-256 at rest and TLS 1.3 in transit.
                  </p>
                </div>
              </FadeIn>

              {/* Secure intake process */}
              <FadeIn delay={0.15}>
                <div className="card p-6">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-4">Intake Process</p>
                  <div className="space-y-4">
                    {[
                      { step: '01', title: 'Submission', desc: 'Your encrypted request enters our secure intake queue.' },
                      { step: '02', title: 'Verification', desc: 'Our team verifies identity and organizational credentials.' },
                      { step: '03', title: 'Classification', desc: 'Request is classified and routed to the appropriate division.' },
                      { step: '04', title: 'Briefing', desc: 'A secure briefing channel is established within 24 hours.' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[9px] font-bold text-[#666666] font-[family-name:var(--font-space-mono)]">
                          {item.step}
                        </span>
                        <div>
                          <h4 className="text-[13px] font-bold text-white">{item.title}</h4>
                          <p className="text-[12px] text-[#666666] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Classification levels */}
              <FadeIn delay={0.2}>
                <div className="card p-6">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-4">Clearance Levels</p>
                  <div className="space-y-3">
                    {[
                      { level: 'LEVEL 1', label: 'Open Inquiry', desc: 'General information and career inquiries', color: '#8B9DAF' },
                      { level: 'LEVEL 2', label: 'Partner Access', desc: 'Investment and industrial partnership details', color: '#B8965A' },
                      { level: 'LEVEL 3', label: 'Classified Briefing', desc: 'Government and defense sovereign infrastructure', color: '#C9A84C' },
                    ].map((item) => (
                      <div key={item.level} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold tracking-[0.12em] font-[family-name:var(--font-space-mono)]" style={{ color: item.color }}>{item.level}</span>
                            <span className="text-[13px] font-semibold text-white">{item.label}</span>
                          </div>
                          <p className="text-[11px] text-[#666666]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Compliance badges */}
              <FadeIn delay={0.25}>
                <div className="card p-6">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-4">Compliance</p>
                  <div className="flex flex-wrap gap-2">
                    {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'Moroccan DPA', 'AES-256', 'TLS 1.3'].map((badge) => (
                      <span key={badge} className="px-3 py-1.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded text-[10px] font-semibold text-[#999999] tracking-wide">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOVEREIGN INFRASTRUCTURE DISCLAIMER ═══ */}
      <section className="py-16 bg-[#0C0F1A] border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-start gap-4 max-w-3xl">
              <Lock size={16} className="text-[#4A7B5F] shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <p className="text-[14px] text-[#999999] leading-[1.7] mb-3">
                  Your data is processed on sovereign infrastructure. We do not share with third parties. All briefing requests are encrypted end-to-end and stored within Moroccan jurisdiction under Law 09-08.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/trust/security" className="text-[12px] text-[#8B9DAF] hover:text-white transition-colors flex items-center gap-1">
                    Security Overview <ArrowRight size={10} />
                  </Link>
                  <Link href="/trust/compliance" className="text-[12px] text-[#8B9DAF] hover:text-white transition-colors flex items-center gap-1">
                    Compliance <ArrowRight size={10} />
                  </Link>
                  <Link href="/privacy" className="text-[12px] text-[#8B9DAF] hover:text-white transition-colors flex items-center gap-1">
                    Privacy Policy <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
