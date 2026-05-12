import { Metadata } from 'next';
import CaseStudiesPageClient from './CaseStudiesPageClient';

export const metadata: Metadata = {
  title: 'Case Studies — Harch Corp',
  description: 'Hyper-realistic proof of impact. See how Harch Corp delivers measurable results across industrial, government, and infrastructure deployments in Africa.',
  alternates: {
    canonical: 'https://www.harchcorp.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
