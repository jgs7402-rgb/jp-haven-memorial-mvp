'use client';

import { useState, useTransition } from 'react';
import { submitInquiry } from '@/app/(public)/actions/submitInquiry';

export function InquiryForm() {
  const [pending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  async function handleAction(formData: FormData) {
    setServerMessage(null);
    startTransition(async () => {
      const result = await submitInquiry(formData);
      setServerMessage(result.message);
    });
  }

  return (
    <form action={handleAction} className="section-card p-6 space-y-4">
      {/* 기존 app/(public)/page.tsx 문의 폼의 필드 구조를 그대로 사용하되,
          name 속성을 아래와 같이 정확히 매핑해줘. */}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Họ và tên*
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="Nhập tên"
          />
        </label>
        <label className="text-sm font-medium">
          Số điện thoại*
          <input
            name="phone"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="0xx xxx xxxx"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Khu vực mong muốn
          <input
            name="region"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="Bắc / Trung / Nam"
          />
        </label>
        <label className="text-sm font-medium">
          Ngân sách dự kiến
          <input
            name="budget"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            placeholder="Ví dụ: 50-100 triệu"
          />
        </label>
      </div>

      <label className="text-sm font-medium">
        Ghi chú khác
        <textarea
          name="note"
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          placeholder="Nội dung cần trao đổi thêm"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto rounded-xl bg-sky-600 px-5 py-3 text-white text-sm font-semibold shadow-soft hover:bg-sky-700 disabled:opacity-60"
      >
        {pending ? 'Đang gửi...' : 'Gửi thông tin'}
      </button>

      {serverMessage && (
        <p className="text-xs text-sky-600 mt-2">
          {serverMessage}
        </p>
      )}
    </form>
  );
}
