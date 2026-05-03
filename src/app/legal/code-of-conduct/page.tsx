import { Metadata } from 'next';
import CodeOfConductPageClient from './CodeOfConductPageClient';

export const metadata: Metadata = {
  title: 'Code of Conduct — Harch Corp',
  description: 'Harch Corp\'s Code of Business Conduct outlining our ethical standards, policies, and reporting mechanisms.',
};

export default function CodeOfConductPage() {
  return <CodeOfConductPageClient />;
}
