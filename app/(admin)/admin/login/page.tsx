'use client';

import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue="admin"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            비밀번호
            <input
              name="password"
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue="cho342020"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 px-4 py-2 text-white text-sm font-semibold shadow-soft hover:bg-sky-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
