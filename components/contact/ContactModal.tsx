// components/contact/ContactModal.tsx
'use client';

import { MouseEvent, FormEvent, useState } from 'react';
import { trackEvent } from '@/src/lib/ga';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
  action?: string;       // 기본값: '/api/contact'
  source?: string;       // hidden 필드에 들어갈 source 값, 기본값: 'contact-modal'
};

export default function ContactModal({
  isOpen,
  onClose,
  defaultEmail,
  action = '/api/contact',
  source = 'contact-modal',
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // JSON payload 구성
    const payload = {
      name: formData.get('name')?.toString().trim() ?? '',
      phone: formData.get('phone')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      region: formData.get('region')?.toString().trim() || null,
      message: formData.get('message')?.toString().trim() ?? '',
      source: formData.get('source')?.toString().trim() ?? 'contact-modal',
    };

    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as
        | {
            success: boolean;
            emailSent?: boolean;
            message?: string;
            error?: string | null;
          }
        | null;

      if (!res.ok || !data?.success) {
        console.error('[ContactModal] submit error response =', data);
        throw new Error(data?.error ?? data?.message ?? '전송 중 오류가 발생했습니다.');
      }

      trackEvent('문의하기_제출완료', {
        source,
      });

      console.log('[ContactModal] SUCCESS: contact submitted', data);
      setMessage(data.message ?? 'Thông tin đã được ghi nhận.');
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch (err: any) {
      console.error('[ContactModal] submit error =', err);
      setMessage(err?.message ?? '전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={handleContentClick}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Gửi yêu cầu liên hệ
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Họ và tên
            </label>
            <input
              name="name"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Số điện thoại
              </label>
              <input
                name="phone"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Ví dụ: 09xx xxx xxx"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="you@example.com"
                defaultValue={defaultEmail ?? ''}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Khu vực mong muốn
            </label>
            <input
              name="region"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Bắc / Trung / Nam"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Nội dung cần tư vấn
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Hãy mô tả ngắn gọn nhu cầu của gia đình (nghĩa trang, ngân sách, khu vực ...)"
              required
            />
          </div>

          <input type="hidden" name="source" value={source} />

          {message && (
            <div
              className={`rounded-lg border px-3 py-2 text-xs ${
                message.includes('오류')
                  ? 'border-rose-200 bg-rose-50 text-rose-800'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-800'
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
