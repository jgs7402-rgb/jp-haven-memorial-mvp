'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/inquiries', label: '문의 관리' },
  { href: '/admin/cemeteries', label: '장지 데이터' },
  { href: '/admin/hotline', label: 'Hotline 설정' },
  { href: '/admin/homepage-images', label: '메인 이미지' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 로그인 페이지는 별도 레이아웃(사이드바 없음)
  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 shadow-soft transition-transform ${
            open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="px-6 py-5 border-b border-slate-200">
            <p className="text-lg font-bold">JP Haven Admin</p>
            <p className="text-xs text-slate-500">관리 콘솔</p>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main area */}
        <div className="flex-1 md:ml-64">
          <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <button
                type="button"
                className="md:hidden rounded-lg border border-slate-200 px-3 py-2 text-sm"
                onClick={() => setOpen((v) => !v)}
              >
                메뉴
              </button>
              <div className="hidden md:block text-sm text-slate-500">
                admin님 환영합니다.
              </div>
              <button
                type="button"
                className="rounded-lg bg-sky-600 px-4 py-2 text-white text-sm font-semibold shadow-soft hover:bg-sky-700"
              >
                로그아웃
              </button>
            </div>
          </header>

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
