'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/**
 * Palantir-style language switcher — clean, minimal, dark aesthetic.
 * Appears as a subtle button showing current locale (EN | FR).
 * On click, toggles between English and French using next-intl routing.
 */
export function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'sidebar' }) {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const nextLocale = locale === 'en' ? 'fr' : 'en';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const switchLocale = () => {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  };

  if (variant === 'sidebar') {
    return (
      <button
        onClick={switchLocale}
        className="flex items-center gap-2 w-full px-4 py-2 text-[11px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(139,157,175,0.06)] rounded-r-md transition-all duration-200"
        aria-label={t('switchLanguage')}
      >
        <Globe size={13} strokeWidth={1.5} className="shrink-0" />
        <span className="font-[family-name:var(--font-space-mono)] tracking-[0.12em] uppercase">
          {locale === 'en' ? 'EN → FR' : 'FR → EN'}
        </span>
      </button>
    );
  }

  return (
    <div ref={ref} className="fixed top-5 right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-space-mono)] text-[rgba(255,255,255,0.5)] hover:text-white bg-[#111111]/90 backdrop-blur-md border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] rounded-lg shadow-lg transition-all duration-200"
        aria-label={t('switchLanguage')}
        aria-expanded={open}
      >
        <Globe size={12} strokeWidth={1.5} />
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-[120px] bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded shadow-2xl overflow-hidden z-50">
          {(['en', 'fr'] as const).map((loc) => (
            <button
              key={loc}
              onClick={() => {
                if (loc !== locale) {
                  router.replace(pathname, { locale: loc });
                }
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-[11px] font-medium transition-colors ${
                loc === locale
                  ? 'text-white bg-[rgba(139,157,175,0.08)]'
                  : 'text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(139,157,175,0.05)]'
              }`}
            >
              <span className="font-[family-name:var(--font-space-mono)] tracking-[0.1em] uppercase">{loc}</span>
              <span className="text-[10px] text-[rgba(255,255,255,0.3)]">
                {loc === 'en' ? 'English' : 'Français'}
              </span>
              {loc === locale && (
                <span className="ml-auto w-1 h-1 rounded-full bg-[#4A7B5F]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
