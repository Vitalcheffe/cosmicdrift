import { Metadata } from 'next';
import CompliancePageClient from './CompliancePageClient';

export const metadata: Metadata = {
  title: 'Compliance — Trust Center  | Harch Corp',
  description: "Harch Corp compliance certifications and audit reports: SOC 2 Type II, ISO 27001, GDPR, Moroccan DPA, and more. Download DPAs and compliance documentation.",
};

export default function CompliancePage() {
  return <CompliancePageClient />;
}
