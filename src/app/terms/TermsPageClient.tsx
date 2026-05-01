'use client';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Harch Corp website (harchcorp.com), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our website. These terms apply to all visitors, users, and others who access or use the Website.`,
  },
  {
    title: '2. Use of the Website',
    content: `You may use our Website only for lawful purposes and in accordance with these Terms. You agree not to:

• Use the Website in any way that violates any applicable national or international law or regulation
• Attempt to gain unauthorized access to any portion of the Website or any systems or networks connected to the Website
• Use the Website to transmit any malware, viruses, or other harmful code
• Interfere with or disrupt the Website or servers or networks connected to the Website
• Use any automated means (including bots, scrapers, or spiders) to access the Website for any purpose without our express written permission
• Impersonate any person or entity or misrepresent your affiliation with any person or entity`,
  },
  {
    title: '3. Intellectual Property',
    content: `The Website and its entire contents, features, and functionality — including but not limited to text, graphics, photos, videos, logos, and software — are owned by Harch Corp S.A., its subsidiaries, or its licensors and are protected by international copyright, trademark, patent, and other intellectual property laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any materials from the Website without our prior written consent, except as permitted by law.`,
  },
  {
    title: '4. User-Provided Content',
    content: `By submitting any content to us through the Website (such as contact form submissions or job applications), you grant Harch Corp S.A. a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and process such content for the purposes of responding to your inquiry or evaluating your application.

You represent and warrant that you own or control all rights to the content you submit and that the content is accurate and not misleading.`,
  },
  {
    title: '5. Disclaimer of Warranties',
    content: `THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

Harch Corp S.A. does not warrant that the Website will be uninterrupted, timely, secure, or error-free, that defects will be corrected, or that the Website is free of viruses or other harmful components.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `IN NO EVENT SHALL HARCH CORP S.A., ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE WEBSITE.`,
  },
  {
    title: '7. Third-Party Links',
    content: `The Website may contain links to third-party websites or services that are not owned or controlled by Harch Corp S.A. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You access such sites at your own risk.`,
  },
  {
    title: '8. Changes to Terms',
    content: `We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Website after any changes constitutes acceptance of the new Terms.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms shall be governed and construed in accordance with the laws of the Kingdom of Morocco, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts of Casablanca, Morocco.

For questions about these Terms, please contact us at legal@harchcorp.com.`,
  },
];

export default function TermsPageClient() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <p className="section-label mb-6">Terms</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#101820] tracking-tight mb-4">
            Terms of Use
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
