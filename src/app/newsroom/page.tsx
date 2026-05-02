import { Metadata } from 'next';
import NewsroomPageClient from './NewsroomPageClient';

export const metadata: Metadata = {
  title: 'Newsroom — Harch Corp',
  description: "Latest news, announcements, and press releases from Harch Corp — Africa's multi-sector industrial conglomerate.",
};

export default function NewsroomPage() {
  return <NewsroomPageClient />;
}
