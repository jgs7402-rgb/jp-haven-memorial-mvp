'use client';

import Link from 'next/link';

type SiteHeaderProps = {
  siteName?: string;
};

function SiteHeader({ siteName = 'JP Haven' }: SiteHeaderProps) {
  return (
    <>
      {/* Header bar (Toss-style) */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4 sm:h-16 sm:justify-between sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
          >
            <span className="text-xl sm:text-2xl font-semibold text-sky-600 hover:text-sky-700 transition-colors">
              {siteName}
            </span>
          </Link>

          {/* Desktop Navigation - inside header bar */}
          <nav className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
            <Link
              href="/"
              className="font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/jangji"
              className="font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Nghĩa trang
            </Link>
            <Link
              href="/company"
              className="font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Giới thiệu công ty
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation - below header bar */}
      <nav className="flex justify-center gap-6 py-3 text-sm font-medium text-slate-600 sm:hidden border-b border-slate-50">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Trang chủ
        </Link>
        <Link
          href="/jangji"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Nghĩa trang
        </Link>
        <Link
          href="/company"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          Giới thiệu công ty
        </Link>
      </nav>
    </>
  );
}

export { SiteHeader };
export default SiteHeader;
