import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/logo-512x512.png', '/favicon-96x96.png', '/favicon-192x192.png', '/favicon-512x512.png'],
      },
    ],
    sitemap: 'https://www.harchcorp.com/sitemap.xml',
  };
}
