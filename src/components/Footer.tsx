'use client';

import Link from 'next/link';

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Investors', href: '/investors' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Contact', href: '/contact' },
  { name: 'Legal', href: '/legal' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.08em] text-white/40 hover:text-white/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link
            href="/"
            className="text-[13px] font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            HARCH CORP
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/25">
            © 2026 Harch Corp S.A. All rights reserved.{' '}
            <Link href="/privacy" className="hover:text-white/50 transition-colors">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link href="/terms" className="hover:text-white/50 transition-colors">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
