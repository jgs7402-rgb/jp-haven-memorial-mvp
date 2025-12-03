'use client';

import { useState, FormEvent } from 'react';
import { submitInquiry } from '@/app/(public)/actions/submitInquiry';
import type { SubmitInquiryResult } from '@/app/(public)/actions/submitInquiry';

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitInquiryResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    // 🔹 reset은 완전히 제거. form 요소만 FormData에 사용.
    const formData = new FormData(e.currentTarget);

    try {
      const r = await submitInquiry(formData);
      setResult(r);
      // 🔹 여기서 아무 reset도 하지 않는다.
    } catch (err) {
      console.error('[InquiryForm] submit error =', err);
      setResult({
        success: false,
        emailSent: false,
        message: 'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSuccess = result?.success === true;
  const isError = result?.success === false;

  return (
    <form onSubmit={handleSubmit} className="section-card p-6 space-y-4">
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
        disabled={isSubmitting}
        className="w-full sm:w-auto rounded-xl bg-sky-600 px-5 py-3 text-white text-sm font-semibold shadow-soft hover:bg-sky-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
      </button>

      {isSuccess && (
        <p className="mt-2 text-xs text-sky-600">
          Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất có thể.
        </p>
      )}

      {isError && (
        <p className="mt-2 text-xs text-red-500">
          {result?.message ||
            'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.'}
        </p>
      )}

      {result && (
        <pre className="mt-2 whitespace-pre-wrap text-[10px] text-slate-500">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
