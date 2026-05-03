import { Metadata } from 'next';
import LeadershipPageClient from './LeadershipPageClient';

export const metadata: Metadata = {
  title: 'Leadership — Harch Corp',
  description: 'Meet the leadership team driving Harch Corp\'s mission to build Africa\'s sovereign industrial backbone across 7 verticals and 5 countries.',
};

export default function LeadershipPage() {
  return <LeadershipPageClient />;
}
