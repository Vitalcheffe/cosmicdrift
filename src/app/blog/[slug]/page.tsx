import { Metadata } from 'next';
import { blogArticles } from '@/data/blog-articles';
import BlogArticlePageClient from './BlogArticlePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found — Harch Corp',
    };
  }

  return {
    title: `${article.title} — Harch Corp Blog`,
    description: article.excerpt,
    keywords: article.seoKeywords,
    alternates: {
      canonical: `https://www.harchcorp.com/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `https://www.harchcorp.com/blog/${slug}`,
      siteName: 'Harch Corp',
      publishedTime: article.date,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
      tags: article.seoKeywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = blogArticles.find(a => a.slug === slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.harchcorp.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.harchcorp.com/blog' },
      { '@type': 'ListItem', position: 3, name: article?.title || 'Article', item: `https://www.harchcorp.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogArticlePageClient slug={slug} />
    </>
  );
}
