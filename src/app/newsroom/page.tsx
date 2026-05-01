import type { Metadata } from 'next';
import NewsroomPageClient from './NewsroomPageClient';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Latest news, press releases, and media coverage from Harch Corp — Africa\'s leading multi-sector industrial conglomerate.',
  openGraph: {
    title: 'Newsroom | Harch Corp',
    description: 'Latest news and press releases from Harch Corp.',
  },
};

export default function NewsroomPage() {
  return <NewsroomPageClient />;
}
