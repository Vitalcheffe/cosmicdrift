import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://harchcorp.com';

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
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/thesis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/strategy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/investors`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const verticalPages = verticals.map((v) => ({
    url: `${baseUrl}/subsidiaries/${v}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...verticalPages];
}
