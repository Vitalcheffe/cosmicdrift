import { Metadata } from 'next';
import SecurityPageClient from './SecurityPageClient';

export const metadata: Metadata = {
  title: 'Security — Trust Center — Harch Corp',
  description: "Harch Corp security architecture: infrastructure security, data protection, identity & access management, incident response, and security bulletins.",
};

export default function SecurityPage() {
  return <SecurityPageClient />;
}
