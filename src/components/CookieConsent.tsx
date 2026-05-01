'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('harch-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('harch-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('harch-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto bg-[#111111] border border-white/[0.08] rounded-lg p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-white/70 leading-relaxed">
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-white/90 underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs tracking-[0.05em] text-white/50 hover:text-white border border-white/[0.1] rounded-md transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs tracking-[0.05em] bg-white text-[#0A0A0A] rounded-md font-medium hover:bg-white/90 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="p-1 text-white/30 hover:text-white/60 transition-colors sm:hidden"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
