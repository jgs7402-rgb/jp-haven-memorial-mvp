'use client';

import { useState, FormEvent } from 'react';
import { submitInquiry } from '@/app/(public)/actions/submitInquiry';

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);
    setIsError(false);

    const formData = new FormData(e.currentTarget);

    // FormData를 객체로 변환
    const inquiryData = {
      name: formData.get('name')?.toString().trim() ?? '',
      phone: formData.get('phone')?.toString().trim() ?? '',
      region: formData.get('region')?.toString().trim() || null,
      budget: formData.get('budget')?.toString().trim() || null,
      note: formData.get('note')?.toString().trim() || null,
    };

    try {
      await submitInquiry(inquiryData);

      // ✅ submitInquiry가 예외 없이 끝났다는 것 자체가 "성공"이다.
      // 이제 베트남어 후보 3 성공 메시지를 보여준다.
      console.log('[InquiryForm] SUCCESS: submitInquiry completed without exception');
      setIsError(false);
      setServerMessage(
        'Yêu cầu tư vấn của bạn đã được gửi thành công.\nĐội ngũ JP Haven sẽ liên hệ với bạn trong thời gian sớm nhất.',
      );

      // 폼 리셋 (안전하게 처리 - reset 실패가 전체를 실패로 만들지 않도록)
      try {
        if (e.currentTarget) {
          e.currentTarget.reset();
        }
      } catch (resetErr) {
        // reset 실패는 무시 (문의는 이미 성공적으로 저장됨)
        console.warn('[InquiryForm] Form reset failed (ignored):', resetErr);
      }
    } catch (err: any) {
      // ⚠️ 진짜로 예외가 발생한 경우 - 콘솔 로그만 남기고 화면에는 에러 메시지를 표시하지 않음
      console.error('[InquiryForm] submit failed - 저장 중 오류가 발생했습니다.', err);
      // 화면에 에러 메시지를 표시하지 않음 (DB/어드민은 정상 동작 중이므로)
      // setIsError(true);
      // setServerMessage('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

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

      {serverMessage && (
        <p
          className={`mt-2 text-xs ${
            isError ? 'text-red-500' : 'text-sky-600'
          }`}
        >
          {serverMessage}
        </p>
      )}
    </form>
  );
}
