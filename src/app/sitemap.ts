import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.harchcorp.com';
  const now = new Date();

  const verticals = [
    'intelligence',
    'cement',
    'energy',
    'technology',
    'mining',
    'agriculture',
    'water',
  ];

  const staticPages = [
    { 
      url: baseUrl, 
      lastModified: now, 
      changeFrequency: 'weekly' as const, 
      priority: 1.0,
      images: [`${baseUrl}/images/og-harch-corp.png`, `${baseUrl}/logo-512x512.png`],
    },
    { url: `${baseUrl}/thesis`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/strategy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/esg`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers/hiring-process`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/investors`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/newsroom`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/intelligence`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/intelligence/harchos`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/aegis`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Trust Center
  const trustPages = [
    { url: `${baseUrl}/trust`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/trust/security`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/trust/compliance`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/trust/ai-ethics`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/trust/vulnerability-disclosure`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Legal Pages
  const legalPages = [
    { url: `${baseUrl}/legal`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/hub`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/cookies`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/gdpr`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/ccpa`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/dpa`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/sla`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/accessibility`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/code-of-conduct`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/modern-slavery`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/trademark`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  // Documentation
  const docsPages = [
    { url: `${baseUrl}/docs`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/docs/api`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/docs/sdks`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/docs/guides`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/quickstarts`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/architecture`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/changelog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  // Developer Pages
  const devPages = [
    { url: `${baseUrl}/developers`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/developers/playground`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/open-source`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Business Pages
  const businessPages = [
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/pricing/calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/customers`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/customers/advisory-board`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/startup-program`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Company Pages
  const companyPages = [
    { url: `${baseUrl}/company/leadership`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/company/dei`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/company/ventures`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Resource Pages
  const resourcePages = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/engineering-blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${baseUrl}/learn`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/status`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.6 },
  ];

  const verticalPages = verticals.map((v) => ({
    url: `${baseUrl}/subsidiaries/${v}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    images: [`${baseUrl}/images/sections/comp-${v === 'intelligence' ? 'intel-dc' : v === 'agriculture' ? 'agri-aerial' : v}-const.jpg`],
  }));

  return [
    ...staticPages,
    ...trustPages,
    ...legalPages,
    ...docsPages,
    ...devPages,
    ...businessPages,
    ...companyPages,
    ...resourcePages,
    ...verticalPages,
  ];
}
