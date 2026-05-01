'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3, Megaphone, Settings } from 'lucide-react';

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('harch-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('harch-cookie-consent', JSON.stringify(prefs));
    setIsVisible(false);
    setShowCustomize(false);
  };

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4"
        >
          <div className="max-w-4xl mx-auto frosted-glass border border-harch-border rounded-xl p-6">
            {!showCustomize ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-harch-text mb-1">
                    We use cookies to enhance your experience.
                  </p>
                  <p className="text-xs text-harch-muted">
                    By continuing to visit this site you agree to our use of cookies.{' '}
                    <Link href="/privacy" className="text-harch-gold hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="text-xs uppercase tracking-wider text-harch-muted hover:text-harch-text transition-colors px-3 py-2"
                  >
                    Customize
                  </button>
                  <button
                    onClick={rejectAll}
                    className="text-xs uppercase tracking-wider text-harch-muted hover:text-harch-text border border-harch-border rounded-lg px-4 py-2 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={acceptAll}
                    className="text-xs uppercase tracking-wider text-harch-dark bg-harch-gold hover:bg-harch-gold/90 rounded-lg px-4 py-2 font-medium transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-harch-text">Cookie Preferences</h3>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="text-harch-muted hover:text-harch-text transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  {/* Essential */}
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-harch-gold shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-harch-text font-medium">Essential</p>
                        <span className="text-xs text-harch-gold uppercase tracking-wider">Always On</span>
                      </div>
                      <p className="text-xs text-harch-muted mt-1">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                  </div>
                  {/* Analytics */}
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-harch-muted shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-harch-text font-medium">Analytics</p>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-10 h-5 rounded-full transition-colors relative ${preferences.analytics ? 'bg-harch-gold' : 'bg-harch-border'}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${preferences.analytics ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                      <p className="text-xs text-harch-muted mt-1">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                  </div>
                  {/* Marketing */}
                  <div className="flex items-start gap-3">
                    <Megaphone className="w-5 h-5 text-harch-muted shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-harch-text font-medium">Marketing</p>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-10 h-5 rounded-full transition-colors relative ${preferences.marketing ? 'bg-harch-gold' : 'bg-harch-border'}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${preferences.marketing ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                      <p className="text-xs text-harch-muted mt-1">
                        Used to track visitors across websites for advertising purposes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="text-xs uppercase tracking-wider text-harch-muted hover:text-harch-text transition-colors px-3 py-2"
                  >
                    Back
                  </button>
                  <button
                    onClick={saveCustom}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-harch-dark bg-harch-gold hover:bg-harch-gold/90 rounded-lg px-4 py-2 font-medium transition-colors"
                  >
                    <Settings className="w-3 h-3" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
