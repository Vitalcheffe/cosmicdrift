import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog — Harch Corp',
  description: 'Engineering insights, thought leadership, and technical deep-dives from Harch Corp — building Africa\'s sovereign industrial infrastructure.',
  openGraph: {
    title: 'Blog — Harch Corp',
    description: 'Engineering insights, thought leadership, and technical deep-dives from Harch Corp.',
    url: 'https://harchcorp.com/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
