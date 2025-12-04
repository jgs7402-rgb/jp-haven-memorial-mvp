'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Cemetery, CemeteryImage, Region } from '@/src/lib/cemeteries';
import { createCemeteryAction, deleteCemeteryAction } from './actions';

type Props = {
  initialCemeteries: Cemetery[];
};

type ExtraImageForm = {
  id?: number;
  imageUrl: string;
  sortOrder: number | null;
  isMain: boolean;
};

export default function CemeteriesAdminClient({ initialCemeteries }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(initialCemeteries);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [extraImages, setExtraImages] = useState<
    Record<number, ExtraImageForm[]>
  >(() => {
    const initial: Record<number, ExtraImageForm[]> = {};
    for (const c of initialCemeteries) {
      if (c.images && c.images.length > 0) {
        initial[c.id] = c.images.map((img: CemeteryImage) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          sortOrder: img.sortOrder,
          isMain: img.isMain,
        }));
      }
    }
    return initial;
  });

  const handleAddImageRow = (cemeteryId: number) => {
    setExtraImages((prev) => ({
      ...prev,
      [cemeteryId]: [
        ...(prev[cemeteryId] ?? []),
        { imageUrl: '', sortOrder: null, isMain: false },
      ],
    }));
  };

  const handleRemoveImageRow = (cemeteryId: number, index: number) => {
    setExtraImages((prev) => {
      const list = prev[cemeteryId] ?? [];
      return { ...prev, [cemeteryId]: list.filter((_, i) => i !== index) };
    });
  };

  const handleChangeImageRow = (
    cemeteryId: number,
    index: number,
    field: keyof ExtraImageForm,
    value: string | number | boolean | null,
  ) => {
    setExtraImages((prev) => {
      const list = prev[cemeteryId] ?? [];
      const updated = list.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      );
      return { ...prev, [cemeteryId]: updated };
    });
  };

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

      // 추가 이미지 저장
      const extra = extraImages[id] ?? [];
      const imagesPayload = extra
        .filter((img) => img.imageUrl.trim() !== '')
        .map((img) => ({
          imageUrl: img.imageUrl.trim(),
          sortOrder: img.sortOrder,
          isMain: img.isMain,
        }));

      const resImages = await fetch('/api/admin/cemetery-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cemeteryId: id,
          images: imagesPayload,
        }),
      });

      const jsonImages = await resImages.json();
      if (!resImages.ok || !jsonImages.ok) {
        console.error('Save extra images failed', jsonImages);
        alert('부가 이미지를 저장하는 중 오류가 발생했습니다.');
      }

      // 로컬 상태 동기화 (id는 알 수 없지만 현재 입력값을 유지)
      setExtraImages((prev) => ({
        ...prev,
        [id]: imagesPayload.map((img) => ({
          imageUrl: img.imageUrl,
          sortOrder: img.sortOrder,
          isMain: img.isMain,
        })),
      }));

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
                images: imagesPayload.map((img, idx) => ({
                  id: idx, // placeholder id; real ids will load on refresh
                  cemeteryId: id,
                  imageUrl: img.imageUrl,
                  sortOrder: img.sortOrder,
                  isMain: img.isMain,
                  createdAt: '',
                })),
              }
            : row,
        ),
      );
    } catch (err) {
      console.error('Save error', err);
      alert('저장 중 오류가 발생했습니다. 콘솔을 확인하세요.');
    } finally {
      setSavingId(null);
    }
  }

  async function handleCreate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const result = await createCemeteryAction(formData);

    if (!result.ok) {
      alert(result.error ?? '장지 생성에 실패했습니다.');
      return;
    }

    setIsCreating(false);
    form.reset();
    router.refresh();
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      '정말 이 장지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCemeteryAction(id);

      if (!result.ok) {
        alert(result.error ?? '장지 삭제에 실패했습니다.');
        return;
      }

      router.refresh();
    });
  }

  return (
    <section className="space-y-4">
      {/* 장지 추가 버튼 및 폼 */}
      <div className="flex items-center justify-between">
        <div></div>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-soft hover:bg-sky-700"
        >
          {isCreating ? '취소' : '장지 추가'}
        </button>
      </div>

      {isCreating && (
        <form
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreate(e.currentTarget);
          }}
        >
          <h2 className="text-lg font-semibold text-slate-900">새 장지 추가</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">
                이름 (VI) <span className="text-red-500">*</span>
              </label>
              <input
                name="nameVi"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">
                지역 <span className="text-red-500">*</span>
              </label>
              <select
                name="region"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              >
                <option value="">선택하세요</option>
                <option value="Bắc">Bắc</option>
                <option value="Trung">Trung</option>
                <option value="Nam">Nam</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">
                타입 코드 <span className="text-red-500">*</span>
              </label>
              <input
                name="typeCode"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">주소 (VI)</label>
              <input
                name="addressVi"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-600">장점 (VI)</label>
              <textarea
                name="prosVi"
                rows={2}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-600">추가 설명 (VI)</label>
            <textarea
              name="extraInfoVi"
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-600">이미지 URL</label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {isPending ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      )}

      {rows.length === 0 && !isCreating && (
        <p className="text-sm text-slate-600">등록된 장지가 없습니다.</p>
      )}
      {rows.map((cemetery) => (
        <form
          key={cemetery.id}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSave(cemetery.id, e.currentTarget);
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              ID: {cemetery.id} - {cemetery.nameVi}
            </h3>
            <button
              type="button"
              onClick={() => handleDelete(cemetery.id)}
              disabled={isPending || savingId === cemetery.id}
              className="text-xs text-red-500 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
            >
              삭제
            </button>
          </div>
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

          {/* 부가 이미지 관리 섹션 */}
          <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                부가 이미지 (cemetery_image)
              </span>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
                onClick={() => handleAddImageRow(cemetery.id)}
              >
                + 이미지 추가
              </button>
            </div>

            {(extraImages[cemetery.id] ?? []).length === 0 && (
              <p className="text-xs text-slate-500">
                부가 이미지가 없습니다. 이미지를 추가해 주세요.
              </p>
            )}

            <div className="space-y-2">
              {(extraImages[cemetery.id] ?? []).map((img, idx) => (
                <div
                  key={`${cemetery.id}-extra-${idx}-${img.id ?? 'new'}`}
                  className="flex flex-col gap-2 rounded-md border border-slate-200 p-3 text-xs"
                >
                  <div className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                    <label className="space-y-1">
                      <span className="text-slate-600">이미지 URL</span>
                      <input
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        value={img.imageUrl}
                        onChange={(e) =>
                          handleChangeImageRow(
                            cemetery.id,
                            idx,
                            'imageUrl',
                            e.target.value,
                          )
                        }
                        placeholder="https://... (image_url)"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-600">정렬</span>
                      <input
                        type="number"
                        className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm"
                        value={img.sortOrder ?? ''}
                        onChange={(e) =>
                          handleChangeImageRow(
                            cemetery.id,
                            idx,
                            'sortOrder',
                            e.target.value === '' ? null : Number(e.target.value),
                          )
                        }
                        placeholder="예: 1"
                      />
                    </label>

                    <label className="inline-flex items-center gap-2 text-slate-700">
                      <input
                        type="checkbox"
                        checked={img.isMain}
                        onChange={(e) =>
                          handleChangeImageRow(
                            cemetery.id,
                            idx,
                            'isMain',
                            e.target.checked,
                          )
                        }
                      />
                      <span>대표</span>
                    </label>

                    <div className="flex items-center justify-end md:justify-start">
                      <button
                        type="button"
                        className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                        onClick={() => handleRemoveImageRow(cemetery.id, idx)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>

                  {img.imageUrl && (
                    <div className="h-24 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <img
                        src={img.imageUrl}
                        alt={`preview-${idx}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      ))}
    </section>
  );
}
