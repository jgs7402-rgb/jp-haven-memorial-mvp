// components/contact/ContactModal.tsx
'use client';

import { MouseEvent } from 'react';

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
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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

        <form method="POST" action={action} className="space-y-3 text-sm">
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

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
