import Link from "next/link";

export function HarchLogo() {
  return (
    <Link href="/" className="flex items-center gap-0 group">
      <span className="text-xl font-bold tracking-[0.25em] text-harch-gold uppercase">
        HARCH
      </span>
      <span className="text-harch-muted mx-2 text-xl font-light">|</span>
      <span className="text-xl font-light tracking-[0.25em] text-harch-text uppercase">
        CORP
      </span>
    </Link>
  );
}
