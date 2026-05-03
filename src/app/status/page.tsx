import { Metadata } from 'next';
import StatusPageClient from './StatusPageClient';

export const metadata: Metadata = {
  title: 'System Status — Harch Corp',
  description: 'Real-time system status and uptime monitoring for all Harch Corp services including HarchOS, SENSE, THINK, ACT, and Developer Portal.',
};

export default function StatusPage() {
  return <StatusPageClient />;
}
