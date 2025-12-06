// app/(admin)/admin/settings/AdminSiteSettingsClient.tsx
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { SiteSettings } from '@/src/lib/siteSettings';

type Props = {
  initialSettings: SiteSettings;
};

export default function AdminSiteSettingsClient({ initialSettings }: Props) {
  const [form, setForm] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleChange<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    setStatus('idle');
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; data?: SiteSettings; error?: string }
        | null;

      if (!res.ok) {
        const errorMessage =
          json?.error ?? '설정을 저장하는 중 오류가 발생했습니다.';
        throw new Error(errorMessage);
      }

      if (json?.data) {
        setForm(json.data);
      }

      setStatus('success');
      setMessage('설정이 저장되었습니다.');
    } catch (err: any) {
      console.error('[AdminSiteSettingsClient] save error =', err);
      setStatus('error');
      setMessage(err?.message ?? '설정을 저장하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {status !== 'idle' && message ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            status === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
          role="status"
        >
          {message}
        </div>
      ) : null}

      {/* 연락처 */}
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">연락처</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Hotline 번호
            </label>
            <input
              type="text"
              value={form.hotlineNumber ?? ''}
              onChange={(e) => handleChange('hotlineNumber', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              영업 시간 텍스트
            </label>
            <input
              type="text"
              value={form.businessHoursText ?? ''}
              onChange={(e) =>
                handleChange('businessHoursText', e.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            문의 이메일
          </label>
          <input
            type="email"
            value={form.supportEmail ?? ''}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Hotline 안내문구 (VI)
          </label>
          <textarea
            value={form.hotlineNoticeVi ?? ''}
            onChange={(e) => handleChange('hotlineNoticeVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={4}
          />
          <p className="text-xs text-slate-500">
            Hotline 아래에 표시될 베트남어 안내문구입니다. 여러 줄로 작성할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 메인 히어로 */}
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">메인 히어로</h2>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            히어로 제목 (VI)
          </label>
          <textarea
            value={form.heroTitleVi ?? ''}
            onChange={(e) => handleChange('heroTitleVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={2}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            히어로 부제목 (VI)
          </label>
          <textarea
            value={form.heroSubtitleVi ?? ''}
            onChange={(e) => handleChange('heroSubtitleVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              1차 CTA 문구 (VI)
            </label>
            <input
              type="text"
              value={form.heroCtaPrimaryVi ?? ''}
              onChange={(e) =>
                handleChange('heroCtaPrimaryVi', e.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              2차 CTA 문구 (VI)
            </label>
            <input
              type="text"
              value={form.heroCtaSecondaryVi ?? ''}
              onChange={(e) =>
                handleChange('heroCtaSecondaryVi', e.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              3차 CTA 문구 (VI)
            </label>
            <input
              type="text"
              value={form.heroCtaTertiaryVi ?? ''}
              onChange={(e) =>
                handleChange('heroCtaTertiaryVi', e.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Footer & SNS */}
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Footer & SNS</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Footer 메시지 (VI)
          </label>
          <textarea
            value={form.footerMessageVi ?? ''}
            onChange={(e) => handleChange('footerMessageVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={2}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Zalo URL
            </label>
            <input
              type="text"
              value={form.zaloUrl ?? ''}
              onChange={(e) => handleChange('zaloUrl', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Facebook URL
            </label>
            <input
              type="text"
              value={form.facebookUrl ?? ''}
              onChange={(e) => handleChange('facebookUrl', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            사이트 이름 (헤더 표시용, VI)
          </label>
          <input
            type="text"
            value={form.siteNameVi ?? ''}
            onChange={(e) => handleChange('siteNameVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </section>

      {/* SEO & 공유 설정 */}
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">SEO & 공유 설정</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            기본 메타 타이틀 (VI)
          </label>
          <input
            type="text"
            value={form.seoDefaultTitleVi ?? ''}
            onChange={(e) => handleChange('seoDefaultTitleVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="JP Haven Memorial"
          />
          <p className="text-xs text-slate-500">
            검색 결과에 기본으로 사용될 제목입니다.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            기본 메타 설명 (VI)
          </label>
          <textarea
            value={form.seoDefaultDescriptionVi ?? ''}
            onChange={(e) =>
              handleChange('seoDefaultDescriptionVi', e.target.value)
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={3}
            placeholder="JP Haven Memorial là nền tảng..."
          />
          <p className="text-xs text-slate-500">
            검색 결과에 표시될 사이트 설명입니다. (약 120–160자)
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            기본 OG 타이틀 (VI)
          </label>
          <input
            type="text"
            value={form.ogDefaultTitleVi ?? ''}
            onChange={(e) => handleChange('ogDefaultTitleVi', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            기본 OG 설명 (VI)
          </label>
          <textarea
            value={form.ogDefaultDescriptionVi ?? ''}
            onChange={(e) =>
              handleChange('ogDefaultDescriptionVi', e.target.value)
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            기본 OG 이미지 URL
          </label>
          <input
            type="text"
            value={form.ogDefaultImageUrl ?? ''}
            onChange={(e) => handleChange('ogDefaultImageUrl', e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <p className="text-xs text-slate-500">
            브랜드 대표 이미지를 Supabase Storage 등에 업로드 후 URL을 입력하세요.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            OG 이미지 대체 텍스트 (VI)
          </label>
          <input
            type="text"
            value={form.ogDefaultImageAltVi ?? ''}
            onChange={(e) =>
              handleChange('ogDefaultImageAltVi', e.target.value)
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </section>

      {/* 약관 및 개인정보 처리방침 */}
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">
          약관 및 개인정보 처리방침
        </h2>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Điều khoản sử dụng (nội dung tiếng Việt)
          </label>
          <textarea
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={6}
            value={form.termsContentVi ?? ''}
            onChange={(e) => handleChange('termsContentVi', e.target.value)}
            placeholder="Nhập toàn bộ nội dung điều khoản sử dụng..."
          />
          <p className="text-xs text-slate-400">
            Nếu để trống, website sẽ hiển thị nội dung mặc định trong code.
          </p>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Chính sách bảo mật (nội dung tiếng Việt)
          </label>
          <textarea
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={6}
            value={form.privacyContentVi ?? ''}
            onChange={(e) => handleChange('privacyContentVi', e.target.value)}
            placeholder="Nhập toàn bộ nội dung chính sách bảo mật..."
          />
          <p className="text-xs text-slate-400">
            Nếu để trống, website sẽ hiển thị nội dung mặc định trong code.
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}