'use client';

import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';

export default function PrivacyPageClient() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your data" />

      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="space-y-12">
              <p className="text-sm text-harch-muted">Last updated: February 2026</p>

              {/* 1. Data Controller */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  1. Data Controller
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  The data controller responsible for your personal data is Harch Corp S.A., a
                  Société Anonyme registered in Casablanca, Morocco, with a share capital of
                  100,000,000 MAD, registered under RCS Casablanca XXX XXX XXX, with registered
                  office at 123 Boulevard Mohammed V, Casablanca, Morocco.
                </p>
              </div>

              {/* 2. Data Collected */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  2. Data Collected and Purposes
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed mb-4">
                  We may collect and process the following categories of personal data:
                </p>
                <div className="space-y-3">
                  {[
                    { category: 'Identity Data', purpose: 'First name, last name, title — used to address you and provide requested services.' },
                    { category: 'Contact Data', purpose: 'Email address, phone number, postal address — used to respond to inquiries and communicate with you.' },
                    { category: 'Professional Data', purpose: 'Job title, company name, industry — used to tailor our services and communications to your professional context.' },
                    { category: 'Usage Data', purpose: 'IP address, browser type, pages visited, time spent — used to improve website performance and user experience.' },
                    { category: 'Cookie Data', purpose: 'Browser cookies and similar technologies — used for analytics and marketing purposes (with your consent).' },
                  ].map((item) => (
                    <div key={item.category} className="p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                      <p className="text-sm font-semibold text-harch-text">{item.category}</p>
                      <p className="mt-1 text-xs text-harch-muted leading-relaxed">{item.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Legal Basis */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  3. Legal Basis for Processing
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  We process your personal data under the following legal bases: (a) your consent,
                  where you have provided it; (b) the necessity of processing for the performance
                  of a contract; (c) compliance with a legal obligation; (d) our legitimate
                  interests, such as improving our services and communicating with you, provided
                  such interests are not overridden by your rights and freedoms.
                </p>
              </div>

              {/* 4. Retention */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  4. Data Retention
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes
                  for which it was collected. Contact form submissions are retained for up to 3 years
                  from the date of last contact. Usage data is retained for 13 months. Cookie data
                  is retained according to the preferences you set in our cookie consent tool. Upon
                  expiration of the retention period, your data will be securely deleted or anonymized.
                </p>
              </div>

              {/* 5. User Rights */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  5. Your Rights
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed mb-4">
                  Under applicable data protection laws, including the EU General Data Protection
                  Regulation (GDPR) and Moroccan Law 09-08, you have the following rights:
                </p>
                <div className="space-y-2">
                  {[
                    'Right of Access: You may request a copy of the personal data we hold about you.',
                    'Right to Rectification: You may request correction of inaccurate or incomplete data.',
                    'Right to Erasure: You may request deletion of your personal data, subject to legal obligations.',
                    'Right to Data Portability: You may request your data in a structured, machine-readable format.',
                    'Right to Object: You may object to the processing of your data based on legitimate interests.',
                    'Right to Restrict Processing: You may request that we limit how we use your data.',
                    'Right to Withdraw Consent: Where processing is based on consent, you may withdraw it at any time.',
                  ].map((right) => (
                    <div key={right} className="flex items-start gap-2 text-sm text-harch-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-harch-gold mt-2 shrink-0" />
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-harch-muted leading-relaxed">
                  To exercise any of these rights, please contact our Data Protection Officer at
                  dpo@harchcorp.com. We will respond to your request within 30 days.
                </p>
              </div>

              {/* 6. Cookies */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  6. Cookies Policy
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. We use essential
                  cookies that are necessary for the website to function, as well as analytics and
                  marketing cookies that require your consent. You can manage your cookie preferences
                  at any time through our cookie consent tool. For more details, please refer to our
                  cookie banner upon your next visit.
                </p>
              </div>

              {/* 7. Third-Party Sharing */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  7. Third-Party Sharing
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  We do not sell your personal data to third parties. We may share your data with
                  trusted service providers who assist us in operating our website, conducting our
                  business, or serving our users, provided they agree to keep this information
                  confidential. We may also disclose your data when required by law or to protect
                  our rights.
                </p>
              </div>

              {/* 8. Data Security */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  8. Data Security
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your
                  personal data against unauthorized access, alteration, disclosure, or destruction.
                  These measures include encryption, access controls, secure server infrastructure,
                  and regular security assessments. However, no method of transmission over the
                  Internet or electronic storage is 100% secure.
                </p>
              </div>

              {/* 9. DPO Contact */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  9. Data Protection Officer
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  For any questions or concerns regarding your personal data, please contact our
                  Data Protection Officer at: dpo@harchcorp.com or by post at: Data Protection
                  Officer, Harch Corp S.A., 123 Boulevard Mohammed V, Casablanca, Morocco.
                </p>
              </div>

              {/* 10. Complaint */}
              <div>
                <h2 className="text-xl font-bold text-harch-text uppercase tracking-tight mb-4">
                  10. Right to Lodge a Complaint
                </h2>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-sm text-harch-muted leading-relaxed">
                  If you believe that the processing of your personal data infringes applicable data
                  protection laws, you have the right to lodge a complaint with the Commission
                  Nationale de contrôle de la protection des Données à caractère Personnel (CNDP) in
                  Morocco, or, if you are in the European Union, with the Commission Nationale de
                  l&apos;Informatique et des Libertés (CNIL) or your local data protection authority.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
