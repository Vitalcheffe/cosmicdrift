'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { HarchLogo } from '@/components/HarchLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface TopNavBarProps {
  onToggleSidebar: () => void;
}

export function TopNavBar({ onToggleSidebar }: TopNavBarProps) {
  const t = useTranslations('topNav');

  const centerLinks = [
    { label: t('platform'), href: '/platform' },
    { label: t('subsidiaries'), href: '/subsidiaries' },
    { label: t('intelligence'), href: '/subsidiaries/intelligence' },
    { label: t('about'), href: '/about' },
    { label: t('pricing'), href: '/pricing' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/[0.06]"
      aria-label="Primary navigation"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <HarchLogo />
        </div>

        {/* Center: Key links (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-6">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium text-white/50 hover:text-white transition-colors nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Language switcher + Contact + Sidebar toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="navbar" />
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded border border-white/[0.12] text-white text-[11px] font-semibold hover:border-white/25 hover:bg-white/[0.04] transition-colors"
          >
            {t('contact')}
          </Link>
          <button
            onClick={onToggleSidebar}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu size={16} strokeWidth={1.5} className="text-white/60" />
          </button>
        </div>
      </div>
    </nav>
  );
}
