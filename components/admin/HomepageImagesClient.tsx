// components/admin/HomepageImagesClient.tsx
'use client';

import { useMemo, useState } from 'react';

export type AdminTestimonial = {
  id: number | null;
  quoteVi: string;
  metaVi: string;
  sortOrder: number;
  isActive: boolean;
};

type InternalTestimonial = AdminTestimonial & { clientKey: string };

type HomepageImagesClientProps = {
  initialTestimonials: AdminTestimonial[];
};

export default function HomepageImagesClient({
  initialTestimonials,
}: HomepageImagesClientProps) {
  const seeded: InternalTestimonial[] = (initialTestimonials ?? []).map(
    (t, idx) => ({
      ...t,
      clientKey:
        t.id !== null && t.id !== undefined
          ? String(t.id)
          : `new-${idx}-${Date.now()}`,
    }),
  );

  const [testimonials, setTestimonials] = useState<InternalTestimonial[]>(
    seeded,
  );
  const [baseSnapshots, setBaseSnapshots] = useState<InternalTestimonial[]>(
    seeded,
  );

  const maxSortOrder = useMemo(
    () => testimonials.reduce((max, t) => Math.max(max, t.sortOrder), 0),
    [testimonials],
  );

  function handleChange(
    clientKey: string,
    key: keyof AdminTestimonial,
    value: string | number | boolean,
  ) {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.clientKey === clientKey ? { ...t, [key]: value as never } : t,
      ),
    );
  }

  function handleReset(clientKey: string) {
    const original = baseSnapshots.find((t) => t.clientKey === clientKey);
    const fallback =
      testimonials.find((t) => t.clientKey === clientKey) ??
      ({
        id: null,
        quoteVi: '',
        metaVi: '',
        sortOrder: maxSortOrder + 1,
        isActive: true,
        clientKey,
      } as InternalTestimonial);

    const resetValue = original ?? fallback;

    setTestimonials((prev) =>
      prev.map((t) => (t.clientKey === clientKey ? { ...resetValue } : t)),
    );
  }

  async function handleSave(item: InternalTestimonial) {
    try {
      const payload: AdminTestimonial = {
        id: item.id,
        quoteVi: item.quoteVi,
        metaVi: item.metaVi,
        sortOrder: item.sortOrder,
        isActive: item.isActive,
      };

      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert('저장 중 오류가 발생했습니다.');
        return;
      }

      const data = (await res.json()) as {
        testimonial?: AdminTestimonial;
        error?: string;
      };

      if (!data.testimonial) {
        alert(data.error ?? '저장에 실패했습니다.');
        return;
      }

      setTestimonials((prev) =>
        prev.map((t) =>
          t.clientKey === item.clientKey
            ? { ...t, ...data.testimonial, clientKey: item.clientKey }
            : t,
        ),
      );

      setBaseSnapshots((prev) => {
        const exists = prev.some((t) => t.clientKey === item.clientKey);
        if (exists) {
          return prev.map((t) =>
            t.clientKey === item.clientKey
              ? { ...t, ...data.testimonial, clientKey: item.clientKey }
              : t,
          );
        }
        return [
          ...prev,
          { ...data.testimonial, clientKey: item.clientKey } as InternalTestimonial,
        ];
      });

      alert('저장되었습니다.');
    } catch (err) {
      console.error('[HomepageImagesClient] save error =', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  }

  async function handleDeactivate(item: InternalTestimonial) {
    await handleSave({ ...item, isActive: false });
  }

  function handleAdd() {
    const clientKey = `new-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
    const newItem: InternalTestimonial = {
      id: null,
      quoteVi: '',
      metaVi: '',
      sortOrder: maxSortOrder + 1,
      isActive: true,
      clientKey,
    };
    setTestimonials((prev) => [...prev, newItem]);
    setBaseSnapshots((prev) => [...prev, newItem]);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              메인 타이틀: 고객 후기 관리
            </h2>
            <p className="text-sm text-slate-500">
              Trang quản lý testimonial (VI)
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
            onClick={handleAdd}
          >
            후기 추가
          </button>
        </div>
      </section>

      <div className="space-y-4">
        {testimonials.map((item, idx) => (
          <article
            key={item.clientKey}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  후기 {idx + 1}{' '}
                  {!item.isActive ? (
                    <span className="text-xs text-rose-500">(비활성화됨)</span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-500">
                  Vietnamese only · 고객 인용구 + 간단한 정보
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
                  onClick={() => handleReset(item.clientKey)}
                >
                  초기화
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  onClick={() => handleDeactivate(item)}
                >
                  삭제(비활성)
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-soft hover:bg-sky-700"
                  onClick={() => handleSave(item)}
                >
                  저장
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block space-y-1 text-sm font-medium text-slate-700">
                후기 내용 (VI)
                <textarea
                  value={item.quoteVi}
                  onChange={(e) =>
                    handleChange(item.clientKey, 'quoteVi', e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  placeholder="Nội dung câu nói của khách hàng"
                />
              </label>

              <label className="block space-y-1 text-sm font-medium text-slate-700">
                메타 정보 (VI)
                <input
                  type="text"
                  value={item.metaVi}
                  onChange={(e) =>
                    handleChange(item.clientKey, 'metaVi', e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  placeholder="Ví dụ: Con trai, 35 tuổi · TP.HCM"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="block space-y-1 text-sm font-medium text-slate-700">
                  정렬 순서
                  <input
                    type="number"
                    value={item.sortOrder}
                    onChange={(e) =>
                      handleChange(
                        item.clientKey,
                        'sortOrder',
                        Number(e.target.value || 0),
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    placeholder="1"
                  />
                  <p className="text-xs text-slate-500">
                    숫자가 작을수록 상단에 노출됩니다.
                  </p>
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={item.isActive}
                    onChange={(e) =>
                      handleChange(item.clientKey, 'isActive', e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>홈에 노출</span>
                  <span className="text-xs text-slate-500">
                    체크된 후기만 메인 페이지에 노출됩니다.
                  </span>
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
