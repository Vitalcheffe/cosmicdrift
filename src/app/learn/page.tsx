import { Metadata } from 'next';
import LearnPageClient from './LearnPageClient';

export const metadata: Metadata = {
  title: 'Learn — Harch Corp',
  description: 'Master HarchOS and sovereign AI infrastructure. Training paths, certifications, and hands-on labs for developers, architects, and engineers building Africa\'s digital backbone.',
};

export default function LearnPage() {
  return <LearnPageClient />;
}
