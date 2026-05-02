import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Harch Corp — Our Mission',
  description: "Learn about Harch Corp's mission to build Africa's industrial sovereignty through vertically integrated operations across 7 strategic verticals.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
