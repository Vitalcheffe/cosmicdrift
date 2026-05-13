import { Metadata } from 'next';
import GlossaryPageClient from './GlossaryPageClient';

export const metadata: Metadata = {
  title: 'Glossary  | Harch Corp',
  description: 'Cloud and technology glossary — definitions for AI inference, sovereign cloud, GPU computing, data sovereignty, and 30+ more terms relevant to Harch Corp\'s infrastructure platform.',
  openGraph: {
    title: 'Glossary  | Harch Corp',
    description: 'Cloud and technology glossary with 30+ definitions.',
    url: 'https://www.harchcorp.com/glossary',
  },
};

export default function GlossaryPage() {
  return <GlossaryPageClient />;
}
