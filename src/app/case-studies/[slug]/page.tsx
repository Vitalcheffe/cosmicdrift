import { Metadata } from 'next';
import { caseStudies } from '@/data/case-studies';
import CaseStudyPageClient from './CaseStudyPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find(c => c.slug === slug);

  if (!cs) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${cs.title} — Harch Corp Case Studies`,
    description: cs.subtitle,
    openGraph: {
      title: cs.title,
      description: cs.subtitle,
      type: 'article',
      images: [
        {
          url: cs.heroImage,
          width: 1200,
          height: 630,
          alt: cs.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.subtitle,
      images: [cs.heroImage],
    },
  };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyPageClient slug={slug} />;
}
