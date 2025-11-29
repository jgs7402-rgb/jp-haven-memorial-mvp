'use client';

import { useState } from 'react';
import type { Cemetery, Region } from '@/src/lib/cemeteries';

type Props = {
  initialCemeteries: Cemetery[];
};

export default function CemeteriesAdminClient({ initialCemeteries }: Props) {
  const [rows, setRows] = useState(initialCemeteries);
  const [savingId, setSavingId] = useState<number | null>(null);

  async function handleSave(id: number, form: HTMLFormElement) {
    const formData = new FormData(form);

    const payload = {
      id,
      nameVi: String(formData.get('nameVi') ?? ''),
      region: formData.get('region') as Region,
      typeCode: String(formData.get('typeCode') ?? ''),
      addressVi: String(formData.get('addressVi') ?? ''),
      prosVi: String(formData.get('prosVi') ?? ''),
      extraInfoVi: String(formData.get('extraInfoVi') ?? ''),
      isActive: formData.get('isActive') === 'on',
      isFeaturedMain: formData.get('isFeaturedMain') === 'on',
      featuredOrderMain: (formData.get('featuredOrderMain') ?? '')
        .toString()
        .trim(),
      imageUrl: (formData.get('imageUrl') ?? '').toString().trim(),
    };

    const featuredOrderMain =
      payload.featuredOrderMain === ''
        ? null
        : Number(payload.featuredOrderMain);
    const imageUrl = payload.imageUrl === '' ? null : payload.imageUrl;

    try {
      setSavingId(id);

      const res = await fetch('/api/admin/cemeteries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          featuredOrderMain,
          imageUrl,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        console.error('Save failed', json);
        alert('저장에 실패했습니다. 콘솔을 확인하세요.');
        return;
      }

      setRows((prev) =>
        prev.map((row) =>
          row.id === id
            ? {
                ...row,
                nameVi: payload.nameVi,
                region: payload.region,
                typeCode: payload.typeCode,
                addressVi: payload.addressVi,
                prosVi: payload.prosVi,
                extraInfoVi: payload.extraInfoVi,
                isActive: payload.isActive,
                isFeaturedMain: payload.isFeaturedMain,
                featuredOrderMain,
                imageUrl,
              }
            : row
        )
      );
    } catch (err) {
      console.error('Save error', err);
      alert('저장 중 오류가 발생했습니다. 콘솔을 확인하세요.');
    } finally {
      setSavingId(null);
    }
  }

  if (rows.length === 0) {
    return <p className="text-sm text-slate-600">등록된 장지가 없습니다.</p>;
  }

  return (
    <section className="space-y-4">
      {rows.map((cemetery) => (
        <form
          key={cemetery.id}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSave(cemetery.id, e.currentTarget);
          }}
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">이름 (VI)</label>
              <input
                name="nameVi"
                defaultValue={cemetery.nameVi}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">지역</label>
              <input
                name="region"
                defaultValue={cemetery.region}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">타입 코드</label>
              <input
                name="typeCode"
                defaultValue={cemetery.typeCode}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">주소 (VI)</label>
              <input
                name="addressVi"
                defaultValue={cemetery.addressVi}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">장점 (VI)</label>
              <textarea
                name="prosVi"
                defaultValue={cemetery.prosVi}
                rows={2}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-3 items-start md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">추가 설명 (VI)</label>
              <textarea
                name="extraInfoVi"
                defaultValue={cemetery.extraInfoVi}
                rows={4}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={cemetery.isActive}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span>활성</span>
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="isFeaturedMain"
                    defaultChecked={cemetery.isFeaturedMain}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span>메인 추천</span>
                </label>
                <div className="flex items-center gap-1">
                  <span>추천 순서</span>
                  <input
                    type="number"
                    name="featuredOrderMain"
                    defaultValue={cemetery.featuredOrderMain ?? ''}
                    className="w-20 rounded-md border border-slate-300 px-2 py-1 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600">이미지 URL</label>
                <input
                  name="imageUrl"
                  defaultValue={cemetery.imageUrl ?? ''}
                  placeholder="https://... (이미지 URL)"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 text-xs text-slate-500">
                  {cemetery.imageUrl ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600">이미지 있음</span>
                      <img
                        src={cemetery.imageUrl}
                        alt={cemetery.nameVi}
                        className="h-10 w-16 rounded object-cover border border-slate-200"
                      />
                    </div>
                  ) : (
                    <span className="text-slate-400">이미지 없음</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={savingId === cemetery.id}
                  className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                >
                  {savingId === cemetery.id ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ))}
    </section>
  );
}
