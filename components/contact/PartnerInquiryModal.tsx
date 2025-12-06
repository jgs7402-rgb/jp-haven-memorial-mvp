// components/contact/PartnerInquiryModal.tsx
'use client';

import { MouseEvent, FormEvent, useState } from 'react';
import { trackEvent } from '@/src/lib/ga';

type PartnerInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action?: string; // 기본값: '/api/contact'
  source?: string; // 기본값: 'partner-inquiry-modal'
};

export default function PartnerInquiryModal({
  isOpen,
  onClose,
  action = '/api/contact',
  source = 'partner-inquiry-modal',
}: PartnerInquiryModalProps) {
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

    // 🔹 폼 필드 값 꺼내기
    const contactName =
      formData.get('contactName')?.toString().trim() ?? '';
    const position = formData.get('position')?.toString().trim() ?? '';
    const cemeteryName =
      formData.get('cemeteryName')?.toString().trim() ?? '';
    const cemeteryType =
      formData.get('cemeteryType')?.toString().trim() ?? '';
    const province = formData.get('province')?.toString().trim() ?? '';
    const district = formData.get('district')?.toString().trim() ?? '';
    const phone = formData.get('phone')?.toString().trim() ?? '';
    const zalo = formData.get('zalo')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const preferredContact =
      formData.get('preferredContact')?.toString().trim() ?? '';
    const notes = formData.get('notes')?.toString().trim() ?? '';

    // 🔹 /api/contact가 기대하는 필드에 맞게 payload 구성
    // name / phone / email / region / message / source 그대로 유지
    const payload = {
      name: contactName,
      phone,
      email,
      region: province || null,
      message:
      [
        '[B2B 문의]', // 🔹 이메일 맨 위에 한글 소제목
        '',
        'Đăng ký đối tác nghĩa trang',
        `Tên đơn vị / nghĩa trang: ${cemeteryName || '-'}`,
        `Loại hình: ${cemeteryType || '-'}`,
        `Tỉnh/Thành phố: ${province || '-'}`,
        `Quận/Huyện: ${district || '-'}`,
        `Chức vụ người liên hệ: ${position || '-'}`,
        `Số điện thoại: ${phone || '-'}`,
        `Zalo: ${zalo || '-'}`,
        `Email: ${email || '-'}`,
        `Hình thức liên hệ ưu tiên: ${preferredContact || '-'}`,
        '',
        `Ghi chú thêm: ${notes || '-'}`,
        ].join('\n'),
      source: formData.get('source')?.toString().trim() ?? source,
    };

    try {
      trackEvent('파트너문의_제출시도');

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
        console.error('[PartnerInquiryModal] submit error response =', data);
        throw new Error(
          data?.error ?? data?.message ?? '전송 중 오류가 발생했습니다.',
        );
      }

      console.log('[PartnerInquiryModal] SUCCESS: partner inquiry submitted', data);
      trackEvent('파트너문의_제출완료', {
        source,
      });

      setMessage(
        data.message ??
          'Yêu cầu đăng ký đối tác của anh/chị đã được gửi thành công. Đội ngũ JP Haven sẽ liên hệ trong thời gian sớm nhất.',
      );
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch (err: any) {
      console.error('[PartnerInquiryModal] submit error =', err);
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
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={handleContentClick}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Đăng ký đối tác nghĩa trang
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

        <p className="mb-4 text-xs text-slate-600">
          Vui lòng để lại thông tin cơ bản về đơn vị của anh/chị. JP Haven sẽ
          liên hệ trong thời gian sớm nhất để trao đổi chi tiết về hợp tác.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Họ và tên người liên hệ
            </label>
            <input
              name="contactName"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Nhập họ tên người liên hệ"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Chức vụ
            </label>
            <input
              name="position"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Giám đốc, Quản lý..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Tên nghĩa trang / cơ sở
            </label>
            <input
              name="cemeteryName"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ví dụ: Công viên nghĩa trang ABC"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Loại hình
            </label>
            <select
              name="cemeteryType"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Chọn loại hình
              </option>
              <option value="Nghĩa trang">Nghĩa trang</option>
              <option value="Công viên nghĩa trang">
                Công viên nghĩa trang
              </option>
              <option value="Nhà lưu tro cốt">Nhà lưu tro cốt</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Tỉnh/Thành phố
              </label>
              <input
                name="province"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Ví dụ: TP. Hồ Chí Minh"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Quận/Huyện
              </label>
              <input
                name="district"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Ví dụ: Quận Bình Thạnh"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Số điện thoại
              </label>
              <input
                name="phone"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Ví dụ: 09xx xxx xxx"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Zalo (nếu khác số điện thoại)
              </label>
              <input
                name="zalo"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Số Zalo (nếu có)"
              />
            </div>
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
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Hình thức liên hệ ưu tiên
            </label>
            <select
              name="preferredContact"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Chọn hình thức
              </option>
              <option value="Điện thoại">Điện thoại</option>
              <option value="Zalo">Zalo</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Ghi chú thêm
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Thời gian liên hệ phù hợp, nhu cầu hợp tác cụ thể..."
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
              {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
