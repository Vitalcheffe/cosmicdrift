import { Metadata } from 'next';
import CommunityPageClient from './CommunityPageClient';

export const metadata: Metadata = {
  title: 'Community | Harch Corp',
  description: 'Join the Harch Corp developer community — Discord, GitHub, Stack Overflow, and our community forum. Connect with 2,500+ engineers building on sovereign infrastructure.',
  alternates: {
    canonical: 'https://www.harchcorp.com/community',
  },
  openGraph: {
    title: 'Community | Harch Corp',
    description: 'Join the Harch Corp developer community — Discord, GitHub, and more.',
    url: 'https://www.harchcorp.com/community',
  },
};

export default function CommunityPage() {
  return <CommunityPageClient />;
}
