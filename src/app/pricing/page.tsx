import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — Transparent GPU Compute Pricing',
  description: 'Transparent, predictable pricing for HarchOS sovereign AI infrastructure. Start free with 10 GPU hours/month. No hidden fees. 40-60% cheaper than AWS, GCP, and Azure.',
  keywords: [
    'HarchOS pricing',
    'GPU cloud pricing',
    'AI compute cost',
    'sovereign infrastructure pricing',
    'H100 pricing',
    'A100 pricing',
    'affordable GPU cloud',
  ],
  openGraph: {
    title: 'Pricing — Transparent GPU Compute Pricing',
    description: 'Start free with 10 GPU hours/month. No hidden fees. 40-60% cheaper than AWS, GCP, and Azure.',
    url: 'https://harchcorp.com/pricing',
    siteName: 'Harch Corp',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Transparent GPU Compute Pricing',
    description: 'Start free with 10 GPU hours/month. No hidden fees. 40-60% cheaper than AWS, GCP, and Azure.',
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
