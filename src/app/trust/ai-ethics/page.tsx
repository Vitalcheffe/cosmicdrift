import { Metadata } from 'next';
import AIEthicsPageClient from './AIEthicsPageClient';

export const metadata: Metadata = {
  title: 'AI Ethics — Trust Center  | Harch Corp',
  description: "Harch Corp AI Ethics framework: fairness, transparency, accountability, and human oversight in artificial intelligence. Public AI ethics dashboard and review board.",
};

export default function AIEthicsPage() {
  return <AIEthicsPageClient />;
}
