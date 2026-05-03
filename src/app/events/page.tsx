import { Metadata } from 'next';
import EventsPageClient from './EventsPageClient';

export const metadata: Metadata = {
  title: 'Events — Harch Corp',
  description: 'Harch Summit, workshops, webinars, and developer days. Join us in Casablanca, Dakar, and online for events on sovereign AI, green infrastructure, and African industrial development.',
  openGraph: {
    title: 'Events — Harch Corp',
    description: 'Harch Summit, workshops, webinars, and developer days.',
    url: 'https://harchcorp.com/events',
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
