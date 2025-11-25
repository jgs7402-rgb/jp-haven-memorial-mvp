// app/(admin)/admin/jangji/page.tsx
export const runtime = 'nodejs';

import type { Cemetery } from '@/src/lib/cemeteries';
import { fetchCemeteries } from '@/src/lib/cemeteries';
import Link from 'next/link';

export default async function AdminJangjiPage() {
  const cemeteries: Cemetery[] = await fetchCemeteries();

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">북/중/남 장지 관리 (Supabase)</h1>
          <p className="text-sm text-slate-600">
            KO/VI 필드와 자동 번역, 저장 버튼 자리가 있습니다. 현재는 읽기 전용 mock UI입니다.
          </p>
        </div>
        {/* 나중에 new 페이지 만들면 주석 풀기 */}
        {/* <Link
          href="/admin/jangji/new"
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-sky-700"
        >
          + 장지 등록
        </Link> */}
      </div>

      {cemeteries.length === 0 ? (
        <p className="text-sm text-slate-600">등록된 장지가 없습니다.</p>
      ) : (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">장지 목록</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cemeteries.map((cemetery) => (
              <div
                key={cemetery.id}
                className="section-card p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {cemetery.nameKo}
                    </p>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                      {cemetery.region}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    VI: {cemetery.nameVi}
                  </p>
                  <p className="text-xs text-slate-600">
                    유형: {cemetery.typeCode}
                  </p>
                  <p className="text-xs text-slate-600">
                    주소(VI): {cemetery.addressVi}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-green-700">장점(KO): </span>
                    <span className="text-slate-800">{cemetery.prosKo}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">장점(VI): </span>
                    <span className="text-slate-800">{cemetery.prosVi}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sky-700">설명(KO): </span>
                    <span className="text-slate-800">{cemetery.extraInfoKo}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sky-700">설명(VI): </span>
                    <span className="text-slate-800">{cemetery.extraInfoVi}</span>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 mt-2">
                  <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs shadow-soft">
                    자동 번역(mock)
                  </button>
                  <button className="rounded-lg bg-sky-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
                    저장(mock)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
