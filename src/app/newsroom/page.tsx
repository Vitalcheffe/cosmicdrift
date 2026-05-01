import { Metadata } from 'next';
import NewsroomPageClient from './NewsroomPageClient';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Latest news, press releases, and media coverage from Harch Corp — Africa\'s industrial infrastructure conglomerate.',
};

export default function NewsroomPage() {
  return <NewsroomPageClient />;
}
