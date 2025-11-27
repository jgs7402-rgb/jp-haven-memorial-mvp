'use client';

import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="w-full border-b border-transparent">
      <div className="container mx-auto flex flex-col items-center gap-2 py-3 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-base sm:text-lg md:text-2xl font-bold tracking-tight text-center"
        >
          JP Haven Memorial
        </Link>

        {/* Navigation - always visible, centered */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs sm:text-sm md:text-base text-gray-700">
          <Link href="/" className="hover:text-sky-600">
            Trang chủ
          </Link>
          <Link href="/jangji" className="hover:text-sky-600">
            Nghĩa trang
          </Link>
          <Link href="/company" className="hover:text-sky-600">
            Giới thiệu công ty
          </Link>
        </nav>
      </div>
    </header>
  );
}
