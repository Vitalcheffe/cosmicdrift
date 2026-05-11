import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.harchcorp.com';

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
      lastModified: new Date(), 
      changeFrequency: 'weekly' as const, 
      priority: 1.0,
      images: [`${baseUrl}/images/og-harch-corp.png`],
    },
    { url: `${baseUrl}/thesis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/strategy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/esg`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers/hiring-process`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/investors`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/newsroom`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/intelligence`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/intelligence/harchos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/aegis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
  ];

  // Trust Center
  const trustPages = [
    { url: `${baseUrl}/trust`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/trust/security`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/trust/compliance`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/trust/ai-ethics`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/trust/vulnerability-disclosure`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Legal Pages
  const legalPages = [
    { url: `${baseUrl}/legal`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/hub`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/gdpr`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/ccpa`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/dpa`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/sla`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/accessibility`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/code-of-conduct`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/modern-slavery`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/legal/trademark`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  // Documentation
  const docsPages = [
    { url: `${baseUrl}/docs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/docs/api`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/docs/sdks`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/docs/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/quickstarts`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/architecture`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/docs/changelog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  // Developer Pages
  const devPages = [
    { url: `${baseUrl}/developers`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/developers/playground`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/open-source`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Business Pages
  const businessPages = [
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/pricing/calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/customers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/customers/advisory-board`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/support`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/startup-program`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  // Company Pages
  const companyPages = [
    { url: `${baseUrl}/company/leadership`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/company/dei`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/company/ventures`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // Resource Pages
  const resourcePages = [
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/engineering-blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/status`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 },
  ];

  const verticalPages = verticals.map((v) => ({
    url: `${baseUrl}/subsidiaries/${v}`,
    lastModified: new Date(),
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
