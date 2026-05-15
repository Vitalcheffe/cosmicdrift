'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, X, ChevronRight, Languages } from 'lucide-react';
import { routing } from '@/i18n/routing';

const SUPPORTED_LOCALES: Record<string, { name: string; code: string }> = {
  fr: { name: 'Francais', code: 'fr' },
  ar: { name: 'Arabe', code: 'ar' },
  es: { name: 'Espanol', code: 'es' },
  pt: { name: 'Portugais', code: 'pt' },
};

const COUNTRY_LANGUAGE: Record<string, string> = {
  MA: 'fr',
  SN: 'fr',
  CI: 'fr',
  ML: 'fr',
  BF: 'fr',
  GN: 'fr',
  NE: 'fr',
  BJ: 'fr',
  TG: 'fr',
  GM: 'en',
  NG: 'en',
  GH: 'en',
  KE: 'en',
  EG: 'ar',
  TN: 'ar',
  DZ: 'ar',
  MR: 'ar',
  LY: 'ar',
  SD: 'ar',
};

function getPathForLocale(pathname: string, currentLocale: string, targetLocale: string): string {
  if (targetLocale === 'fr') {
    // For French, we need to navigate to /fr/ path
    if (currentLocale === 'en') {
      // Currently on English (no prefix), add /fr prefix
      if (pathname === '/') return '/fr';
      return `/fr${pathname}`;
    }
    return pathname;
  }
  return pathname;
}

export function LanguageDetector() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Don't show if already on French version
    if (locale === 'fr') return;

    const dismissedAt = sessionStorage.getItem('lang-banner-dismissed');
    if (dismissedAt) {
      setDismissed(true);
      return;
    }

    // Don't show if Google Translate is already active for other languages
    if (document.cookie.includes('googtrans=/en/')) {
      return;
    }

    const browserLang = navigator.language.split('-')[0];
    const browserRegion = navigator.language.split('-')[1];

    let targetLang: string | null = null;

    if (browserRegion && COUNTRY_LANGUAGE[browserRegion]) {
      targetLang = COUNTRY_LANGUAGE[browserRegion];
    } else if (SUPPORTED_LOCALES[browserLang]) {
      targetLang = browserLang;
    }

    if (targetLang && targetLang !== 'en') {
      setDetectedLang(targetLang);
      // Delay showing for smooth page load
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [locale]);

  const handleSwitch = useCallback(() => {
    if (!detectedLang) return;

    if (detectedLang === 'fr') {
      // Use next-intl routing for French (proper native translation)
      const targetPath = getPathForLocale(pathname, locale, 'fr');
      setIsLeaving(true);
      setTimeout(() => {
        router.push(targetPath);
      }, 300);
    } else {
      // Use Google Translate for other languages (ar, es, pt)
      document.cookie = `/en/${detectedLang}; path=/; domain=.harchcorp.com; max-age=31536000`;
      document.cookie = `/en/${detectedLang}; path=/; max-age=31536000`;
      window.location.reload();
    }
  }, [detectedLang, pathname, locale, router]);

  const handleDismiss = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setShowBanner(false);
      setDismissed(true);
      sessionStorage.setItem('lang-banner-dismissed', 'true');
    }, 250);
  }, []);

  if (!showBanner || dismissed || !detectedLang) return null;

  const langInfo = SUPPORTED_LOCALES[detectedLang];
  const isFrench = detectedLang === 'fr';

  return (
    <div
      className={`fixed bottom-5 left-5 z-[100] transition-all duration-300 ${
        isLeaving ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      <div className="relative max-w-[340px]">
        {/* Ambient glow effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#4A7B5F]/20 via-[#4A7B5F]/5 to-[#4A7B5F]/20 rounded-xl blur-sm" />

        {/* Main card */}
        <div className="relative bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
          {/* Top accent line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#4A7B5F]/60 to-transparent" />

          <div className="p-4">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 text-white/15 hover:text-white/40 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Icon + Text */}
            <div className="flex items-start gap-3.5">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-lg bg-[#4A7B5F]/10 border border-[#4A7B5F]/20 flex items-center justify-center">
                  <Languages className="h-4 w-4 text-[#4A7B5F]" />
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-[13px] text-white/90 font-medium leading-snug tracking-tight">
                  Ce site est aussi disponible en {langInfo?.name || detectedLang.toUpperCase()}
                </p>
                <p className="text-[11px] text-white/30 mt-1.5 leading-relaxed">
                  {isFrench
                    ? 'Version complete traduite en francais'
                    : 'Traduction automatique via Google'}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-3.5">
                  <button
                    onClick={handleSwitch}
                    className="group flex items-center gap-1.5 px-3.5 py-2 bg-[#4A7B5F] hover:bg-[#5A9B7F] text-white text-[11px] font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(74,123,95,0.3)]"
                  >
                    <Globe className="h-3 w-3" />
                    Voir en {langInfo?.name || detectedLang.toUpperCase()}
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-2 text-white/25 hover:text-white/50 text-[11px] font-medium rounded-lg hover:bg-white/[0.03] transition-all duration-200"
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Google Translate widget component — only loaded for non-French languages
 * (ar, es, pt) since French is handled natively by next-intl
 */
export function GoogleTranslateScript() {
  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'ar,es,pt,en',
                autoDisplay: false,
                multilanguagePage: true,
                gaTrack: true,
                gaId: 'UA-HARCHCORP-1'
              }, 'google_translate_element');
            }
          `,
        }}
      />
      <script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        async
      />
    </>
  );
}
