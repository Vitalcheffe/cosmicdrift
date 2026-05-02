'use client';

import { useRef } from 'react';
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

export default function LegalPageClient() {
  return (
    <div className="bg-black">
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-6">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.01em] mb-12">
              Legal Mentions
            </h1>
          </FadeIn>

          <div className="space-y-8 text-sm text-white/40 leading-relaxed">
            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Company Information</h2>
                <p>
                  Harch Corp S.A. is a société anonyme (SA) incorporated under the laws of the Kingdom of Morocco.
                </p>
                <ul className="mt-3 space-y-1">
                  <li><span className="text-white/20">Registered Name:</span> Harch Corp S.A.</li>
                  <li><span className="text-white/20">Capital:</span> 100,000,000 MAD</li>
                  <li><span className="text-white/20">RCS:</span> Casablanca XXX XXX XXX</li>
                  <li><span className="text-white/20">VAT Number:</span> MA XXXXXXXXXX</li>
                  <li><span className="text-white/20">Registered Office:</span> 123 Boulevard Mohammed V, Casablanca, Morocco</li>
                  <li><span className="text-white/20">Phone:</span> +212 5 22 00 00 00</li>
                  <li><span className="text-white/20">Email:</span> info@harchcorp.com</li>
                </ul>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Data Protection Officer</h2>
                <p>
                  In accordance with Moroccan Law 09-08 on the protection of personal data and the EU General Data 
                  Protection Regulation (GDPR), Harch Corp S.A. has appointed a Data Protection Officer.
                </p>
                <ul className="mt-3 space-y-1">
                  <li><span className="text-white/20">DPO Contact:</span> dpo@harchcorp.com</li>
                  <li><span className="text-white/20">Address:</span> 123 Boulevard Mohammed V, Casablanca, Morocco</li>
                </ul>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Website Publisher</h2>
                <p>
                  This website is published by Harch Corp S.A. The website director is Amine Harch El Korane, 
                  Founder & CEO.
                </p>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Hosting</h2>
                <p>
                  This website is hosted on infrastructure provided by Harch Intelligence, 
                  a subsidiary of Harch Corp S.A.
                </p>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Intellectual Property</h2>
                <p>
                  All content on this website — including text, images, graphics, logos, and software — is the 
                  property of Harch Corp S.A. or its subsidiaries and is protected by international copyright 
                  and intellectual property laws. Reproduction, distribution, or modification of any content 
                  without prior written consent is prohibited.
                </p>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Limitation of Liability</h2>
                <p>
                  The information provided on this website is for general informational purposes only. Harch Corp S.A. 
                  makes no representations or warranties of any kind, express or implied, about the completeness, 
                  accuracy, reliability, or suitability of the information. Any reliance you place on such information 
                  is strictly at your own risk.
                </p>
              </div>
            </FadeIn>

            <div className="divider" />

            <FadeIn>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Applicable Law</h2>
                <p>
                  These legal mentions are governed by and construed in accordance with the laws of the Kingdom of 
                  Morocco. Any disputes arising from the use of this website shall be subject to the exclusive 
                  jurisdiction of the courts of Casablanca, Morocco.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
