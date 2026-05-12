'use client';

import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';

/**
 * ClientLayout — Thin client wrapper that provides PageTransition
 * around the main content area. Required because the root layout
 * is a server component and cannot use hooks like usePathname().
 */
export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
}
