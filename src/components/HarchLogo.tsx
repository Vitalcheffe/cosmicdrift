import Link from "next/link";

export function HarchLogo() {
  return (
    <Link href="/" className="flex items-center gap-0 group min-w-0">
      <span className="text-base sm:text-xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase truncate">
        HARCH
      </span>
      <span className="text-[rgba(255,255,255,0.15)] mx-1 sm:mx-2 text-base sm:text-xl font-light">
        |
      </span>
      <span className="text-base sm:text-xl font-light tracking-[0.15em] sm:tracking-[0.25em] text-[#999999] uppercase truncate">
        CORP
      </span>
    </Link>
  );
}
