import { Metadata } from 'next';
import TrustPageClient from './TrustPageClient';

export const metadata: Metadata = {
  title: 'Trust Center — Harch Corp',
  description: "Harch Corp's Trust Center: Security, compliance, and transparency. SOC 2 Type II, ISO 27001, GDPR compliant. Building trust through sovereign infrastructure.",
};

export default function TrustPage() {
  return <TrustPageClient />;
}
