import { Metadata } from 'next';
import NewsroomPageClient from './NewsroomPageClient';

export const metadata: Metadata = {
  title: 'Newsroom  | Harch Corp',
  description: "Latest news, press releases, and announcements from Harch Corp — Africa's multi-sector industrial conglomerate building sovereign infrastructure across 7 verticals.",
  alternates: {
    canonical: 'https://www.harchcorp.com/newsroom',
  },
};

export default function NewsroomPage() {
  return <NewsroomPageClient />;
}
