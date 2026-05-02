import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://harchcorp.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date('2026-02-01'), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/strategy`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/investors`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/esg`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date('2026-02-01'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/newsroom`, lastModified: new Date('2026-02-01'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/partners`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/legal`, lastModified: new Date('2026-02-01'), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-02-01'), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-02-01'), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const subsidiarySlugs = ['intelligence', 'cement', 'energy', 'technology', 'mining', 'agriculture', 'water'];
  const subsidiaryPages = subsidiarySlugs.map((slug) => ({
    url: `${baseUrl}/subsidiaries/${slug}`,
    lastModified: new Date('2026-02-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...subsidiaryPages];
}
