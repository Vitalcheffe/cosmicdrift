'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';

export default function TermsPageClient() {
  return (
    <>
      <PageHero title="Terms of Use" subtitle="Conditions governing the use of this website" />

      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="space-y-12">
              <p className="text-sm text-harch-muted">Last updated: February 2026</p>

              {/* 1. Acceptance */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  By accessing and using the Harch Corp website (harchcorp.com), you accept and agree
                  to be bound by these Terms of Use. If you do not agree with any part of these terms,
                  you must not use this website. Your continued use of the website following the posting
                  of any changes constitutes acceptance of those changes.
                </p>
              </div>

              {/* 2. Intellectual Property */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  2. Intellectual Property
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos,
                  images, audio clips, digital downloads, data compilations, and software, is the
                  property of Harch Corp S.A. or its content suppliers and is protected by Moroccan
                  and international copyright, trademark, and other intellectual property laws. You
                  may not reproduce, distribute, modify, create derivative works of, publicly display,
                  publicly perform, republish, download, store, or transmit any of the material on
                  our website without prior written consent.
                </p>
              </div>

              {/* 3. Use Restrictions */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  3. Use Restrictions
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed mb-3">
                  You agree not to use this website:
                </p>
                <div className="space-y-2">
                  {[
                    'In any way that violates any applicable national or international law or regulation.',
                    'To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.',
                    'To impersonate or attempt to impersonate Harch Corp, a Harch Corp employee, another user, or any other person or entity.',
                    'To engage in any other conduct that restricts or inhibits anyone\'s use or enjoyment of the website, or which may harm Harch Corp or users of the website.',
                    'To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website, the server on which the website is hosted, or any server, computer, or database connected to the website.',
                    'To use any automated system, including robots, spiders, or scrapers, to access the website for any purpose without our express written permission.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-harch-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-harch-gold mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Disclaimer */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  4. Disclaimer of Warranties
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Harch Corp S.A.
                  makes no representations or warranties of any kind, express or implied, as to the
                  operation of the website or the information, content, materials, or products included
                  on the website. To the full extent permissible by applicable law, Harch Corp S.A.
                  disclaims all warranties, express or implied, including but not limited to implied
                  warranties of merchantability and fitness for a particular purpose. Harch Corp S.A.
                  does not warrant that the website, its servers, or email sent from the website are
                  free of viruses or other harmful components.
                </p>
              </div>

              {/* 5. Limitation of Liability */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  5. Limitation of Liability
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  In no event shall Harch Corp S.A., its directors, employees, partners, agents,
                  suppliers, or affiliates be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without limitation, loss of profits,
                  data, use, goodwill, or other intangible losses, resulting from (a) your access to
                  or use of or inability to access or use the website; (b) any conduct or content of
                  any third party on the website; (c) any content obtained from the website; or (d)
                  unauthorized access, use, or alteration of your transmissions or content, whether
                  based on warranty, contract, tort, or any other legal theory, whether or not we
                  have been informed of the possibility of such damage.
                </p>
              </div>

              {/* 6. Governing Law */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  6. Governing Law
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  These Terms of Use shall be governed by and construed in accordance with the laws
                  of the Kingdom of Morocco, without regard to its conflict of law provisions. Any
                  disputes arising under or in connection with these terms shall be subject to the
                  exclusive jurisdiction of the courts of Casablanca, Morocco.
                </p>
              </div>

              {/* 7. Modifications */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  7. Modifications
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  Harch Corp S.A. reserves the right to revise and update these Terms of Use at any
                  time. Any changes will be posted on this page with an updated revision date. Your
                  continued use of the website following the posting of changes constitutes your
                  acceptance of such changes. We encourage you to review these terms periodically.
                </p>
              </div>

              {/* 8. Severability */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  8. Severability
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  If any provision of these Terms of Use is held to be unlawful, void, or unenforceable,
                  such provision shall nonetheless be enforceable to the fullest extent permitted by
                  applicable law, and the unenforceable portion shall be deemed severed from these
                  terms. The remaining provisions of these terms shall remain in full force and effect.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  9. Contact
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us at:
                  legal@harchcorp.com or by post at: Legal Department, Harch Corp S.A., 123 Boulevard
                  Mohammed V, Casablanca, Morocco.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
