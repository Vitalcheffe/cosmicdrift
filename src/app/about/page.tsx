import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Harch Corp is a Moroccan multi-sector industrial conglomerate building Africa\'s industrial sovereignty across 7 verticals.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
