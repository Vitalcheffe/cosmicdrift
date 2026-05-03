import type { Metadata } from 'next';
import CalculatorPageClient from './CalculatorPageClient';

export const metadata: Metadata = {
  title: 'Cost Calculator — HarchOS Pricing',
  description: 'Calculate your HarchOS infrastructure costs. Compare GPU compute pricing against AWS, GCP, and Azure. See 40-60% savings with 100% renewable sovereign infrastructure.',
  keywords: [
    'HarchOS cost calculator',
    'GPU pricing calculator',
    'AI compute cost estimator',
    'cloud pricing comparison',
    'H100 cost',
    'A100 pricing',
  ],
  openGraph: {
    title: 'Cost Calculator — HarchOS Pricing',
    description: 'Calculate and compare GPU compute costs. See 40-60% savings vs AWS, GCP, Azure.',
    url: 'https://harchcorp.com/pricing/calculator',
    siteName: 'Harch Corp',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cost Calculator — HarchOS Pricing',
    description: 'Calculate and compare GPU compute costs. See 40-60% savings vs AWS, GCP, Azure.',
  },
};

export default function CalculatorPage() {
  return <CalculatorPageClient />;
}
