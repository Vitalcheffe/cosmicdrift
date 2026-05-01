import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

const divisions = [
  { name: 'Harch Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', href: '/subsidiaries/water' },
];

export function Footer() {
  return (
    <footer className="bg-[#030509] border-t border-harch-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-harch-gold font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  About Harch Corp
                </Link>
              </li>
              <li>
                <Link href="/strategy" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Strategy
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="/esg" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  ESG
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/newsroom" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-harch-gold font-semibold mb-4">
              Divisions
            </h3>
            <ul className="space-y-3">
              {divisions.map((div) => (
                <li key={div.name}>
                  <Link href={div.href} className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-harch-gold font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Legal Mentions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-harch-muted hover:text-harch-text transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-harch-gold font-semibold mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-harch-muted">
                123 Boulevard Mohammed V
                <br />
                Casablanca, Morocco
              </p>
              <p className="text-sm text-harch-muted">
                info@harchcorp.com
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://linkedin.com/company/harchcorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-harch-muted hover:text-harch-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/harchcorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-harch-muted hover:text-harch-gold transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-harch-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-harch-muted">
            &copy; 2026 Harch Corp S.A. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/legal" className="text-xs text-harch-muted hover:text-harch-text transition-colors">
              Legal
            </Link>
            <Link href="/privacy" className="text-xs text-harch-muted hover:text-harch-text transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-harch-muted hover:text-harch-text transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
