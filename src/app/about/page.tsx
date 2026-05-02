import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About — Vision & Leadership',
  description: 'Harch Corp is a Moroccan multi-sector industrial conglomerate building Africa\'s industrial sovereignty. Founded by Amine Harch El Korane, deploying $2.4B+ across AI, Energy, Mining, and 4 more verticals.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
