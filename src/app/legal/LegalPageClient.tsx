'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';

export default function LegalPageClient() {
  return (
    <>
      <PageHero title="Legal Mentions" subtitle="Company information and legal notices" />

      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="space-y-12">
              {/* Company Information */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  Company Information
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <div className="space-y-3 text-sm text-harch-muted">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Company</span>
                    <span>Harch Corp S.A.</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Legal Form</span>
                    <span>Société Anonyme</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Capital Social</span>
                    <span>100,000,000 MAD</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">RCS</span>
                    <span>Casablanca XXX XXX XXX</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">VAT Number</span>
                    <span>MAXXXXXXXX</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Registered Office</span>
                    <span>123 Boulevard Mohammed V, Casablanca, Morocco</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Publication Director</span>
                    <span>Amine Harch El Korane</span>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  Data Protection
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <div className="space-y-3 text-sm text-harch-muted">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Data Protection Officer</span>
                    <span>dpo@harchcorp.com</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span className="text-harch-text font-medium shrink-0 w-48">Host</span>
                    <span>To be defined</span>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  Intellectual Property
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  The entire content of this website (text, images, graphics, logos, icons, sounds,
                  software, etc.) is the exclusive property of Harch Corp S.A. or its licensors and is
                  protected by Moroccan and international intellectual property laws. Any reproduction,
                  representation, modification, publication, adaptation, or exploitation of all or part
                  of the content of this website, by any means whatsoever, is strictly prohibited without
                  the prior written consent of Harch Corp S.A.
                </p>
                <p className="mt-4 text-sm text-harch-muted leading-relaxed">
                  The trademarks, logos, and trade names displayed on this website are the property of
                  Harch Corp S.A. or its subsidiaries. Any use of these marks without prior written
                  authorization is strictly prohibited.
                </p>
              </div>

              {/* Liability */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  Limitation of Liability
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  Harch Corp S.A. makes every effort to provide accurate and up-to-date information on
                  this website. However, the company cannot guarantee the completeness, accuracy, or
                  timeliness of the information provided. Harch Corp S.A. shall not be held liable for
                  any direct or indirect damages resulting from access to or use of this website or the
                  information contained herein.
                </p>
                <p className="mt-4 text-sm text-harch-muted leading-relaxed">
                  This website may contain links to third-party websites. Harch Corp S.A. does not
                  control and is not responsible for the content, privacy policies, or practices of
                  any third-party websites. The inclusion of any link does not imply endorsement by
                  Harch Corp S.A.
                </p>
              </div>

              {/* Applicable Law */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  Applicable Law
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  These legal mentions are governed by Moroccan law. Any disputes arising from the use
                  of this website shall be subject to the exclusive jurisdiction of the courts of
                  Casablanca, Morocco.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
