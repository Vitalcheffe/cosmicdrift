import { Metadata } from 'next';
import NewsroomPageClient from './NewsroomPageClient';

export const metadata: Metadata = {
  title: 'Newsroom — Press & Media',
  description: 'Latest news and press releases from Harch Corp — AI Data Center Dakhla, Renewable Energy Morocco, Sovereign Infrastructure, and Africa\'s industrial transformation.',
};

export default function NewsroomPage() {
  return <NewsroomPageClient />;
}
