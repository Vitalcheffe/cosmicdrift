'use client';

import { useState, useEffect } from 'react';
import { Globe, X } from 'lucide-react';

const LANGUAGE_MAP: Record<string, { name: string; flag: string; code: string }> = {
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
  ar: { name: 'العربية', flag: '🇲🇦', code: 'ar' },
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  pt: { name: 'Português', flag: '🇵🇹', code: 'pt' },
};

const COUNTRY_LANGUAGE: Record<string, string> = {
  MA: 'fr', // Morocco — French (business language)
  SN: 'fr', // Senegal
  CI: 'fr', // Côte d'Ivoire
  ML: 'fr', // Mali
  BF: 'fr', // Burkina Faso
  GN: 'fr', // Guinea
  NE: 'fr', // Niger
  BJ: 'fr', // Benin
  TG: 'fr', // Togo
  GM: 'en', // Gambia
  NG: 'en', // Nigeria
  GH: 'en', // Ghana
  KE: 'en', // Kenya
  EG: 'ar', // Egypt
  TN: 'ar', // Tunisia
  DZ: 'ar', // Algeria
  MR: 'ar', // Mauritania
  LY: 'ar', // Libya
  SD: 'ar', // Sudan
};

export function LanguageDetector() {
  const [showBanner, setShowBanner] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed
    const dismissedAt = sessionStorage.getItem('lang-banner-dismissed');
    if (dismissedAt) {
      setDismissed(true);
      return;
    }

    // Check if Google Translate is already active
    if (document.cookie.includes('googtrans=/en/')) {
      return;
    }

    // Detect browser language
    const browserLang = navigator.language.split('-')[0]; // e.g. "fr" from "fr-FR"
    const browserRegion = navigator.language.split('-')[1]; // e.g. "MA" from "fr-MA"

    let targetLang: string | null = null;

    // First check region (more accurate for Africa)
    if (browserRegion && COUNTRY_LANGUAGE[browserRegion]) {
      targetLang = COUNTRY_LANGUAGE[browserRegion];
    }
    // Then check browser language
    else if (LANGUAGE_MAP[browserLang]) {
      targetLang = browserLang;
    }

    // If user's language is not English, show banner
    if (targetLang && targetLang !== 'en') {
      setDetectedLang(targetLang);
      setShowBanner(true);
    }
  }, []);

  const handleTranslate = () => {
    if (!detectedLang) return;
    // Set Google Translate cookie
    document.cookie = `/en/${detectedLang}; path=/; domain=.harchcorp.com; max-age=31536000`;
    document.cookie = `/en/${detectedLang}; path=/; max-age=31536000`;
    // Reload with Google Translate
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem('lang-banner-dismissed', 'true');
  };

  if (!showBanner || dismissed || !detectedLang) return null;

  const langInfo = LANGUAGE_MAP[detectedLang];

  return (
    <div className="fixed bottom-4 left-4 z-[100] max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-lg shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Globe className="h-5 w-5 text-[#4A7B5F]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-white/90 font-medium leading-snug">
              Ce site est aussi disponible en {langInfo?.name || detectedLang.toUpperCase()}
            </p>
            <p className="text-[11px] text-white/40 mt-1">
              Translate this site automatically
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleTranslate}
                className="px-3 py-1.5 bg-[#4A7B5F] hover:bg-[#5A9B7F] text-white text-[11px] font-medium rounded transition-colors"
              >
                {langInfo?.flag} Voir en {langInfo?.name || detectedLang.toUpperCase()}
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-white/30 hover:text-white/60 text-[11px] transition-colors"
              >
                Keep English
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-white/20 hover:text-white/50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Google Translate widget component — adds the GT script
 * and a hidden trigger element for automatic translation
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
                includedLanguages: 'fr,ar,es,pt,en',
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
