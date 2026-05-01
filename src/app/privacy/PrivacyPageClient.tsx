'use client';

const sections = [
  {
    title: '1. Introduction',
    content: `Harch Corp S.A. ("Harch Corp", "we", "us", or "our") is committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website harchcorp.com (the "Website"), including any other media form, media channel, mobile website, or mobile application related or connected thereto.

This policy applies to all personal data processed by Harch Corp, both online and offline, and is compliant with the EU General Data Protection Regulation (GDPR) and Moroccan Law 09-08 on the protection of personal data.`,
  },
  {
    title: '2. Data We Collect',
    content: `We collect information that you provide directly to us, information collected automatically when you use our Website, and information from third-party sources.

Information you provide: Name, email address, phone number, company name, job title, and any other information you choose to provide when contacting us, applying for jobs, or subscribing to our communications.

Automatically collected information: IP address, browser type, operating system, referring URLs, pages viewed, links clicked, time spent on pages, and device information when you visit our Website.

Cookies and tracking: We use essential cookies for website functionality and analytics cookies to understand how visitors interact with our Website. You can manage cookie preferences at any time.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

• To respond to your inquiries and provide customer support
• To process job applications and manage recruitment
• To send you communications you have opted into (newsletters, event invitations)
• To analyze and improve our Website and services
• To comply with legal obligations
• To protect our rights, privacy, safety, and property
• To detect and prevent fraud or other illegal activities`,
  },
  {
    title: '4. Legal Basis for Processing',
    content: `We process your personal data only when we have a lawful basis to do so, including:

• Consent: When you have given us explicit consent to process your data for specific purposes
• Contract: When processing is necessary to fulfill a contract with you
• Legitimate Interest: When processing is necessary for our legitimate business interests, provided such interests are not overridden by your rights
• Legal Obligation: When processing is necessary to comply with applicable laws and regulations`,
  },
  {
    title: '5. Data Sharing and Disclosure',
    content: `We do not sell your personal data. We may share your information with:

• Subsidiaries and affiliates within the Harch Corp group for the purposes described in this policy
• Service providers who perform services on our behalf (hosting, analytics, email delivery)
• Professional advisors (lawyers, accountants) when necessary for legal compliance
• Law enforcement or government authorities when required by law
• Business transferees in connection with any merger, acquisition, or sale of assets`,
  },
  {
    title: '6. International Data Transfers',
    content: `Harch Corp operates primarily in Morocco with operations across multiple African countries. Your personal data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers, including:

• Standard contractual clauses approved by the European Commission
• Adequacy decisions for countries recognized as providing adequate data protection
• Explicit consent where required by applicable law`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Specific retention periods include:

• Contact form submissions: 2 years from last interaction
• Job applications: 1 year from application date
• Newsletter subscriptions: Until you unsubscribe
• Website analytics: 26 months (anonymized after 14 months)
• Legal and compliance records: As required by applicable law`,
  },
  {
    title: '8. Your Rights',
    content: `Under GDPR and Moroccan Law 09-08, you have the following rights regarding your personal data:

• Right of Access: Request a copy of the personal data we hold about you
• Right to Rectification: Request correction of inaccurate or incomplete data
• Right to Erasure: Request deletion of your personal data ("right to be forgotten")
• Right to Restriction: Request restriction of processing in certain circumstances
• Right to Data Portability: Request transfer of your data in a structured, machine-readable format
• Right to Object: Object to processing based on legitimate interest or for direct marketing
• Right to Withdraw Consent: Withdraw consent at any time where processing is based on consent

To exercise any of these rights, please contact our Data Protection Officer at dpo@harchcorp.com.`,
  },
  {
    title: '9. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:

• SSL/TLS encryption for all data in transit
• Encrypted storage for sensitive data at rest
• Access controls and authentication mechanisms
• Regular security assessments and penetration testing
• Employee training on data protection and security
• Incident response procedures for data breaches`,
  },
  {
    title: '10. Contact and Complaints',
    content: `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact:

Data Protection Officer
Harch Corp S.A.
123 Boulevard Mohammed V, Casablanca, Morocco
Email: dpo@harchcorp.com

If you are not satisfied with our response, you have the right to lodge a complaint with the Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) in Morocco or with the relevant supervisory authority in your EU member state of residence.

We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`,
  },
];

export default function PrivacyPageClient() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Privacy</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#101820] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#9CA3AF] mb-12">Last Updated: January 1, 2026</p>

          <div className="space-y-10 text-sm text-[#6B7280] leading-relaxed">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-medium text-[#101820] mb-4">{section.title}</h2>
                <div className="whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
