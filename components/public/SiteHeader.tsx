'use client';

import Link from 'next/link';

type SiteHeaderProps = {
  siteName?: string;
};

function SiteHeader({ siteName = 'JP Haven' }: SiteHeaderProps) {
  return (
    <header className="w-full border-b border-transparent">
      <div className="container mx-auto flex flex-col items-center gap-3 py-4 md:py-5 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-center"
        >
          {siteName}
        </Link>

        {/* Navigation - always visible, centered */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
          <Link href="/" className="hover:text-sky-600 px-3 py-1 rounded-md hover:bg-sky-50">
            Trang chủ
          </Link>
          <Link href="/jangji" className="hover:text-sky-600 px-3 py-1 rounded-md hover:bg-sky-50">
            Nghĩa trang
          </Link>
          <Link href="/company" className="hover:text-sky-600 px-3 py-1 rounded-md hover:bg-sky-50">
            Giới thiệu công ty
          </Link>
        </nav>
      </div>
    </header>
  );
}

export { SiteHeader };
export default SiteHeader;
