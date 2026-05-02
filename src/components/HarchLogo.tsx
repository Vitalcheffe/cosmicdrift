import Link from "next/link";

export function HarchLogo() {
  return (
    <Link href="/" className="flex items-center gap-0 group">
      <span className="text-xl font-bold tracking-[0.25em] text-[#C9A84C] uppercase">
        HARCH
      </span>
      <span className="text-white/30 mx-2 text-xl font-light">|</span>
      <span className="text-xl font-light tracking-[0.25em] text-white uppercase">
        CORP
      </span>
    </Link>
  );
}
