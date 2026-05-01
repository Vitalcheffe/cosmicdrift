import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Harch Corp — a Moroccan multi-sector industrial conglomerate founded by Amine Harch El Korane, building Africa\'s industrial sovereignty across 7 verticals.',
  openGraph: {
    title: 'About Harch Corp',
    description: 'A Moroccan multi-sector industrial conglomerate building Africa\'s industrial sovereignty.',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
