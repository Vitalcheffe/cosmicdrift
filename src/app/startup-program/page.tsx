import { Metadata } from 'next';
import StartupProgramPageClient from './StartupProgramPageClient';

export const metadata: Metadata = {
  title: 'Startup Program  | Harch Corp',
  description: 'Empowering African startups with $50,000 in HarchOS credits, technical mentorship, and go-to-market support. Build on sovereign infrastructure.',
};

export default function StartupProgramPage() {
  return <StartupProgramPageClient />;
}
