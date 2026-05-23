import { MetadataRoute } from 'next';
import { blogArticles } from '@/data/blog-articles';
import { seoArticles } from '@/data/seo-articles';
import { articles } from '@/data/articles';
import { caseStudies } from '@/data/case-studies';
import { engArticles } from '@/data/eng-articles';

const allBlogArticles = [...blogArticles, ...seoArticles];

// French URL path mappings (en → fr)
const frPathMap: Record<string, string> = {
  '/about': '/a-propos',
  '/platform': '/plateforme',
  '/thesis': '/these',
  '/strategy': '/strategie',
  '/subsidiaries': '/filiales',
  '/esg': '/rse',
  '/careers': '/carrieres',
  '/careers/hiring-process': '/carrieres/processus-de-recrutement',
  '/case-studies': '/etudes-de-cas',
  '/contact': '/contact',
  '/quote': '/devis',
  '/partners': '/partenaires',
  '/investors': '/investisseurs',
  '/newsroom': '/salle-de-presse',
  '/intelligence': '/intelligence',
  '/intelligence/harchos': '/intelligence/harchos',
  '/faq': '/faq',
  '/press': '/presse',
  '/trust': '/confiance',
  '/trust/security': '/confiance/securite',
  '/trust/compliance': '/confiance/conformite',
  '/trust/ai-ethics': '/confiance/ethique-ia',
  '/trust/vulnerability-disclosure': '/confiance/divulgation-vulnerabilites',
  '/legal': '/juridique',
  '/legal/hub': '/juridique/hub',
  '/legal/cookies': '/juridique/cookies',
  '/legal/gdpr': '/juridique/rgpd',
  '/legal/ccpa': '/juridique/ccpa',
  '/legal/dpa': '/juridique/dpa',
  '/legal/sla': '/juridique/sla',
  '/legal/accessibility': '/juridique/accessibilite',
  '/legal/code-of-conduct': '/juridique/code-de-conduite',
  '/legal/modern-slavery': '/juridique/esclavage-moderne',
  '/legal/trademark': '/juridique/marque-deposee',
  '/privacy': '/confidentialite',
  '/terms': '/conditions',
  '/docs': '/docs',
  '/docs/api': '/docs/api',
  '/docs/sdks': '/docs/sdks',
  '/docs/guides': '/docs/guides',
  '/docs/quickstarts': '/docs/demarrage-rapide',
  '/docs/architecture': '/docs/architecture',
  '/docs/changelog': '/docs/journal-des-modifications',
  '/developers': '/developpeurs',
  '/developers/playground': '/developpeurs/bac-a-sable',
  '/developers/open-source': '/developpeurs/open-source',
  '/pricing': '/tarifs',
  '/pricing/calculator': '/tarifs/calculateur',
  '/customers': '/clients',
  '/customers/advisory-board': '/clients/conseil-consultatif',
  '/support': '/support',
  '/startup-program': '/programme-startup',
  '/company/leadership': '/entreprise/direction',
  '/company/dei': '/entreprise/diversite',
  '/company/ventures': '/entreprise/ventures',
  '/blog': '/blog',
  '/engineering-blog': '/blog-ingenierie',
  '/community': '/communaute',
  '/events': '/evenements',
  '/learn': '/apprendre',
  '/glossary': '/glossaire',
  '/status': '/statut',
};

// Subsidiary slug French mappings
const frVerticalMap: Record<string, string> = {
  intelligence: 'intelligence',
  cement: 'ciment',
  energy: 'energie',
  technology: 'technologie',
  mining: 'mines',
  agriculture: 'agriculture',
  water: 'eau',
  finance: 'finance',
};

function getFrPath(enPath: string): string {
  return frPathMap[enPath] || `/fr${enPath}`;
}

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
    'finance',
  ];

  const staticPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0, images: [`${baseUrl}/images/og-harch-corp.png`, `${baseUrl}/logo-512x512.png`] },
    { path: '/platform', changeFrequency: 'monthly' as const, priority: 0.95 },
    { path: '/thesis', changeFrequency: 'monthly' as const, priority: 0.95 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/strategy', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/subsidiaries', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/esg', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/careers', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/careers/hiring-process', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/case-studies', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/quote', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/partners', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/investors', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/newsroom', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/intelligence', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/intelligence/harchos', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/press', changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const trustPages = [
    { path: '/trust', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/trust/security', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/trust/compliance', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/trust/ai-ethics', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/trust/vulnerability-disclosure', changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  const legalPages = [
    { path: '/legal', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/hub', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/cookies', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/legal/gdpr', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/ccpa', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/dpa', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/sla', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/legal/accessibility', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/legal/code-of-conduct', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/legal/modern-slavery', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/legal/trademark', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const docsPages = [
    { path: '/docs', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/docs/api', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/docs/sdks', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/docs/guides', changeFrequency: 'weekly' as const, priority: 0.75 },
    { path: '/docs/quickstarts', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/docs/architecture', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/docs/changelog', changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  const devPages = [
    { path: '/developers', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/developers/playground', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/developers/open-source', changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  const businessPages = [
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/pricing/calculator', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/customers', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/customers/advisory-board', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/support', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/startup-program', changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  const companyPages = [
    { path: '/company/leadership', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/company/dei', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/company/ventures', changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  const resourcePages = [
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.75, images: [`${baseUrl}/images/blog/sovereign-ai-infrastructure.jpg`] },
    { path: '/engineering-blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/community', changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/events', changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/learn', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/glossary', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/status', changeFrequency: 'daily' as const, priority: 0.6 },
  ];

  const verticalImages: Record<string, string> = {
    intelligence: 'comp-intel-dc',
    cement: 'comp-cement-mixer',
    energy: 'comp-energy-solar',
    technology: 'comp-tech-ai',
    mining: 'comp-mining-heavy',
    agriculture: 'comp-agri-aerial',
    water: 'comp-water-plant',
    finance: 'finance-corporate',
  };

  // ═══ Generate entries for both EN and FR locales ═══
  function generateEntries(pages: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly' | 'daily'; priority: number; images?: string[] }[]) {
    const entries: MetadataRoute.Sitemap = [];

    for (const page of pages) {
      const enUrl = `${baseUrl}${page.path === '/' ? '' : page.path}`;
      const frPath = page.path === '/' ? '/fr' : `/fr${getFrPath(page.path)}`;
      const frUrl = `${baseUrl}${frPath}`;

      // English entry with alternates
      entries.push({
        url: enUrl,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        images: page.images,
        alternates: {
          languages: {
            en: enUrl,
            fr: frUrl,
            'x-default': enUrl,
          },
        },
      });

      // French entry with alternates
      entries.push({
        url: frUrl,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority * 0.95, // Slightly lower priority for translated pages
        images: page.images,
        alternates: {
          languages: {
            en: enUrl,
            fr: frUrl,
            'x-default': enUrl,
          },
        },
      });
    }

    return entries;
  }

  // Blog article pages with images for Google Image indexing
  const blogPages = allBlogArticles.map((article) => {
    const enUrl = `${baseUrl}/blog/${article.slug}`;
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${baseUrl}${article.image}`],
      alternates: {
        languages: {
          en: enUrl,
          fr: `${baseUrl}/fr/blog/${article.slug}`,
          'x-default': enUrl,
        },
      },
    };
  });

  // Newsroom article pages
  const newsroomPages = articles.map((article) => {
    const enUrl = `${baseUrl}/newsroom/${article.slug}`;
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
      images: [`${baseUrl}${article.image}`],
      alternates: {
        languages: {
          en: enUrl,
          fr: `${baseUrl}/fr/salle-de-presse/${article.slug}`,
          'x-default': enUrl,
        },
      },
    };
  });

  // Engineering blog article pages
  const engBlogPages = engArticles.map((article) => {
    const enUrl = `${baseUrl}/engineering-blog/${article.slug}`;
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${baseUrl}${article.image}`],
      alternates: {
        languages: {
          en: enUrl,
          fr: `${baseUrl}/fr/blog-ingenierie/${article.slug}`,
          'x-default': enUrl,
        },
      },
    };
  });

  // Vertical/subsidiary pages with alternates
  const verticalPages = verticals.map((v) => {
    const enUrl = `${baseUrl}/subsidiaries/${v}`;
    const frSlug = frVerticalMap[v] || v;
    const frUrl = `${baseUrl}/fr/filiales/${frSlug}`;
    return {
      url: enUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      images: [`${baseUrl}/images/sections/${verticalImages[v]}.jpg`],
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
          'x-default': enUrl,
        },
      },
    };
  });

  // Also add French vertical pages
  const frVerticalPages = verticals.map((v) => {
    const enUrl = `${baseUrl}/subsidiaries/${v}`;
    const frSlug = frVerticalMap[v] || v;
    const frUrl = `${baseUrl}/fr/filiales/${frSlug}`;
    return {
      url: frUrl,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${baseUrl}/images/sections/${verticalImages[v]}.jpg`],
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
          'x-default': enUrl,
        },
      },
    };
  });

  // Agriculture dedicated page
  const agriculturePages = [
    {
      url: `${baseUrl}/subsidiaries/agriculture`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      images: [`${baseUrl}/images/sections/comp-agri-aerial.jpg`],
      alternates: {
        languages: {
          en: `${baseUrl}/subsidiaries/agriculture`,
          fr: `${baseUrl}/fr/filiales/agriculture`,
          'x-default': `${baseUrl}/subsidiaries/agriculture`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/filiales/agriculture`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${baseUrl}/images/sections/comp-agri-aerial.jpg`],
      alternates: {
        languages: {
          en: `${baseUrl}/subsidiaries/agriculture`,
          fr: `${baseUrl}/fr/filiales/agriculture`,
          'x-default': `${baseUrl}/subsidiaries/agriculture`,
        },
      },
    },
  ];

  // Case study pages
  const caseStudyPages = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    images: [`${baseUrl}${cs.heroImage}`],
  }));

  return [
    ...generateEntries(staticPages),
    ...generateEntries(trustPages),
    ...generateEntries(legalPages),
    ...generateEntries(docsPages),
    ...generateEntries(devPages),
    ...generateEntries(businessPages),
    ...generateEntries(companyPages),
    ...generateEntries(resourcePages),
    ...blogPages,
    ...newsroomPages,
    ...engBlogPages,
    ...verticalPages,
    ...frVerticalPages,
    ...agriculturePages,
    ...caseStudyPages,
  ];
}
