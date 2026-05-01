'use client';

import { useState } from 'react';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const offices = [
  {
    city: 'Casablanca',
    country: 'Morocco',
    type: 'Headquarters',
    address: '123 Boulevard Mohammed V',
    email: 'info@harchcorp.com',
    phone: '+212 5 22 00 00 00',
  },
  {
    city: 'Dakar',
    country: 'Senegal',
    type: 'Regional Office',
    address: '45 Rue Carnot, Plateau',
    email: 'dakar@harchcorp.com',
    phone: '+221 33 800 00 00',
  },
  {
    city: 'Banjul',
    country: 'The Gambia',
    type: 'Operations',
    address: 'Kairaba Avenue, Serrekunda',
    email: 'gambia@harchcorp.com',
    phone: '+220 400 0000',
  },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Contact</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#101820] tracking-tight mb-8">
            Get in Touch
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-[#6B7280] leading-relaxed">
            Whether you&apos;re an investor, partner, or talent — we&apos;d like to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="py-24 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <div>
              <p className="section-label mb-8">Send a Message</p>
              {submitted ? (
                <div className="py-12">
                  <h3 className="text-2xl font-semibold text-[#101820] mb-3">Message Sent</h3>
                  <p className="text-sm text-[#6B7280]">
                    Thank you for reaching out. Our team will respond within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-[0.05em] text-[#9CA3AF] mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-sm text-[#101820] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.05em] text-[#9CA3AF] mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-sm text-[#101820] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-[0.05em] text-[#9CA3AF] mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-sm text-[#101820] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.05em] text-[#9CA3AF] mb-2">Inquiry Type</label>
                      <select
                        value={formData.inquiry}
                        onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                        className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-sm text-[#6B7280] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="general" className="bg-[#F7F7F8]">General Inquiry</option>
                        <option value="investment" className="bg-[#F7F7F8]">Investment</option>
                        <option value="partnership" className="bg-[#F7F7F8]">Partnership</option>
                        <option value="careers" className="bg-[#F7F7F8]">Careers</option>
                        <option value="media" className="bg-[#F7F7F8]">Media / Press</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.05em] text-[#9CA3AF] mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] py-3 text-sm text-[#101820] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[rgba(0,0,0,0.25)] transition-colors resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#101820] text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-[#1f2937] transition-colors"
                  >
                    Send Message
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Offices */}
            <div>
              <p className="section-label mb-8">Our Offices</p>
              <div className="space-y-10">
                {offices.map((office) => (
                  <div key={office.city}>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-[#9CA3AF]" />
                      <h3 className="text-lg font-medium text-[#101820]">{office.city}</h3>
                      <span className="text-xs text-[#9CA3AF]">· {office.type}</span>
                    </div>
                    <div className="space-y-1 text-sm text-[#9CA3AF]">
                      <p>{office.address}, {office.country}</p>
                      <p className="flex items-center gap-2">
                        <Mail size={12} /> {office.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={12} /> {office.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
