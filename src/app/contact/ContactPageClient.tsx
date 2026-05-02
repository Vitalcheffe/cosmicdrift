'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail, Phone, Building2, Send, MessageSquare } from 'lucide-react';
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

const offices = [
  { city: 'Casablanca', country: 'Morocco', type: 'Global Headquarters', address: '123 Boulevard Mohammed V, Casablanca 20000', email: 'hq@harchcorp.com', phone: '+212 5 22 00 00 00' },
  { city: 'Dakhla', country: 'Morocco', type: 'Intelligence Operations', address: 'Dakhla Technology Park, Dakhla 73000', email: 'intelligence@harchcorp.com', phone: '+212 5 28 00 00 00' },
  { city: 'Banjul', country: 'Gambia', type: 'Ciment Operations', address: '14 Kairaba Avenue, Banjul, Gambia', email: 'cement@harchcorp.com', phone: '+220 00 000 0000' },
];

const teamContacts = [
  { name: 'Investor Relations', email: 'investors@harchcorp.com', desc: 'Fund structure, co-investment, and reporting inquiries.' },
  { name: 'Partnerships', email: 'partners@harchcorp.com', desc: 'Strategic partnerships, government relations, and joint ventures.' },
  { name: 'Careers', email: 'careers@harchcorp.com', desc: 'Job applications, internships, and talent inquiries.' },
  { name: 'Media', email: 'press@harchcorp.com', desc: 'Press inquiries, interviews, and media resources.' },
];

export default function ContactPageClient() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', company: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Contact</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Get in Touch
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7]">
              Whether you&apos;re an investor, partner, or future team member — we&apos;d love to hear from you. Reach out and we&apos;ll respond within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeIn>
              <p className="section-label mb-4">Send a Message</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
                How Can We Help?
              </h2>
              {submitted ? (
                <div className="card p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-[14px] text-[#999999]">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666] mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[#000000] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666] mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[#000000] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666] mb-2">Company</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[#000000] transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666] mb-2">Subject</label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[#000000] transition-colors"
                      >
                        <option value="">Select subject</option>
                        <option value="investment">Investment Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="careers">Careers</option>
                        <option value="media">Media & Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-[#666666] mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] rounded-lg text-[14px] text-white focus:outline-none focus:border-[#000000] transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-[#000000] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0A0F1A]/90 transition-all"
                  >
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.15}>
              <p className="section-label mb-4">Offices</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
                Our Locations
              </h2>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.city} className="card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin size={16} className="text-white shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="text-[15px] font-bold text-white">{office.city}, {office.country}</h3>
                        <p className="text-[11px] font-semibold text-white uppercase tracking-[0.08em]">{office.type}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#999999] mb-2 ml-7">{office.address}</p>
                    <div className="flex items-center gap-4 ml-7">
                      <a href={`mailto:${office.email}`} className="text-[12px] text-[#999999] hover:text-white transition-colors flex items-center gap-1"><Mail size={10} />{office.email}</a>
                      <a href={`tel:${office.phone}`} className="text-[12px] text-[#999999] hover:text-white transition-colors flex items-center gap-1"><Phone size={10} />{office.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Contacts */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4">Direct Contacts</p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-[-0.01em] mb-16">
              Reach the Right Team
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamContacts.map((contact, i) => (
              <FadeIn key={contact.name} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center mb-3">
                    <MessageSquare size={16} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[14px] font-bold text-white mb-1">{contact.name}</h3>
                  <a href={`mailto:${contact.email}`} className="text-[12px] text-white hover:text-[#CCCCCC] transition-colors font-medium">{contact.email}</a>
                  <p className="text-[12px] text-[#666666] leading-relaxed mt-2">{contact.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
