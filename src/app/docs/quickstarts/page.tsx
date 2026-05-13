import type { Metadata } from 'next';
import QuickstartsPageClient from './QuickstartsPageClient';

export const metadata: Metadata = {
  title: 'Quickstart Guides — HarchOS',
  description: 'Get started with HarchOS in 5 minutes. Quickstart guides for deploying AI models, setting up data pipelines, creating dashboards, and configuring access control.',
  keywords: [
    'HarchOS quickstart',
    'get started',
    '5 minute quickstart',
    'deploy AI model',
    'data pipeline tutorial',
  ],
  openGraph: {
    title: 'Quickstart Guides — HarchOS',
    description: 'Go from zero to production in 5 minutes. Quickstart guides for every HarchOS use case.',
    url: 'https://www.harchcorp.com/docs/quickstarts',
    siteName: 'Harch Corp',
    type: 'website',
  },
};

export default function QuickstartsPage() {
  return <QuickstartsPageClient />;
}
