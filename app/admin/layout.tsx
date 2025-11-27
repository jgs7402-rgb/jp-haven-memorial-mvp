'use client';

import type { ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
    // TODO: Add Supabase signOut later
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="text-sm font-semibold md:text-base">JP Haven Admin</div>
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
            <span>admin님</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded border border-gray-300 bg-white px-3 py-1 text-xs md:text-sm hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
