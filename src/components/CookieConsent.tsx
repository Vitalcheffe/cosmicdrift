'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Shield } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('harch-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
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
      <div className="max-w-[1400px] mx-auto bg-white border border-[rgba(0,0,0,0.06)] rounded-xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl shadow-black/[0.06]">
        <div className="flex items-start gap-3 flex-1">
          <Shield size={18} className="text-[#9CA3AF] shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-[13px] text-[#6B7280] leading-relaxed">
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-[#0A0F1A] font-medium underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={decline} className="px-5 py-2 text-[11px] font-semibold tracking-[0.05em] text-[#6B7280] hover:text-[#0A0F1A] border border-[rgba(0,0,0,0.08)] rounded-lg transition-colors">
            Decline
          </button>
          <button onClick={accept} className="px-5 py-2 text-[11px] font-semibold tracking-[0.05em] bg-[#0A0F1A] text-white rounded-lg hover:bg-[#1a1f2e] transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
