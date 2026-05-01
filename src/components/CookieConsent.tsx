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
      <div className="max-w-[1400px] mx-auto bg-white border border-[rgba(0,0,0,0.08)] rounded-lg p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg shadow-black/5">
        <div className="flex-1">
          <p className="text-sm text-[#6B7280] leading-relaxed">
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-[#101820] underline underline-offset-2 hover:text-[#C9A84C]">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs tracking-[0.05em] text-[#6B7280] hover:text-[#101820] border border-[rgba(0,0,0,0.08)] rounded-md transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs tracking-[0.05em] bg-[#101820] text-white rounded-md font-medium hover:bg-[#1f2937] transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="p-1 text-[#9CA3AF] hover:text-[#101820] transition-colors sm:hidden"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
