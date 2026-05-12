import { Metadata } from 'next';
import { engArticles } from '@/data/eng-articles';
import EngArticlePageClient from './EngArticlePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = engArticles.find(a => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found — Harch Corp',
    };
  }

  return {
    title: `${article.title} — Harch Corp Engineering Blog`,
    description: article.excerpt,
    keywords: article.seoKeywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
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
  return engArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function EngArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <EngArticlePageClient slug={slug} />;
}
