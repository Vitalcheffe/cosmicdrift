'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const offices = [
  {
    city: 'Casablanca',
    label: 'Headquarters',
    address: '123 Boulevard Mohammed V, Casablanca, Morocco',
    phone: '+212 5 22 00 00 00',
    email: 'info@harchcorp.com',
  },
  {
    city: 'Dakhla',
    label: 'Intelligence & Energy',
    address: 'Dakhla Technology Park, Dakhla, Morocco',
    phone: '+212 5 28 00 00 00',
    email: 'dakhla@harchcorp.com',
  },
  {
    city: 'Banjul',
    label: 'West Africa Operations',
    address: '5 Marina Parade, Banjul, Gambia',
    phone: '+220 00 000 0000',
    email: 'gambia@harchcorp.com',
  },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with the Harch Corp team"
      />

      {/* Contact Form & Offices */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <FadeIn>
              <h2 className="text-2xl font-bold text-harch-text uppercase tracking-tight">
                Send a Message
              </h2>
              <div className="w-12 h-0.5 bg-harch-gold mt-4 mb-8" />

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-lg border border-harch-gold/30 bg-harch-gold/5 text-sm text-harch-gold">
                  Thank you for your message. Our team will respond within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-harch-muted mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-harch-border bg-[#0A0E18] text-harch-text text-sm placeholder:text-harch-muted/50 focus:outline-none focus:border-harch-gold/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-harch-muted mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-harch-border bg-[#0A0E18] text-harch-text text-sm placeholder:text-harch-muted/50 focus:outline-none focus:border-harch-gold/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-harch-muted mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-harch-border bg-[#0A0E18] text-harch-text text-sm placeholder:text-harch-muted/50 focus:outline-none focus:border-harch-gold/50 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-harch-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-harch-border bg-[#0A0E18] text-harch-text text-sm placeholder:text-harch-muted/50 focus:outline-none focus:border-harch-gold/50 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </FadeIn>

            {/* Offices */}
            <div>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl font-bold text-harch-text uppercase tracking-tight">
                  Our Offices
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mt-4 mb-8" />
              </FadeIn>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <FadeIn key={office.city} delay={0.1 + index * 0.1}>
                    <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-harch-gold" />
                        <h3 className="text-base font-semibold text-harch-text">{office.city}</h3>
                        <span className="text-xs text-harch-gold uppercase tracking-wider">— {office.label}</span>
                      </div>
                      <p className="text-sm text-harch-muted">{office.address}</p>
                      <div className="mt-3 flex flex-col sm:flex-row gap-3">
                        <a href={`mailto:${office.email}`} className="flex items-center gap-1.5 text-xs text-harch-gold hover:text-harch-gold/80 transition-colors">
                          <Mail className="w-3 h-3" />
                          {office.email}
                        </a>
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-xs text-harch-muted hover:text-harch-text transition-colors">
                          <Phone className="w-3 h-3" />
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Map Placeholder */}
              <FadeIn delay={0.4}>
                <div className="mt-6 h-48 rounded-xl border border-harch-border bg-[#0A0E18] flex items-center justify-center">
                  <p className="text-sm text-harch-muted">Interactive Map — Coming Soon</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
