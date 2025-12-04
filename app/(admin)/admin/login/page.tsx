'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLoginAction } from './actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await adminLoginAction(formData);

    if (!result || !result.ok) {
      setError(result?.error ?? '로그인에 실패했습니다.');
      setIsSubmitting(false);
      return;
    }

    // 성공 시 클라이언트에서 리다이렉트
    router.push('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft border border-slate-200 p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-sky-600">Admin</p>
          <h1 className="text-xl font-bold">로그인</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            아이디
            <input
              name="id"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            비밀번호
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </label>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-sky-600 px-4 py-2 text-white text-sm font-semibold shadow-soft hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
