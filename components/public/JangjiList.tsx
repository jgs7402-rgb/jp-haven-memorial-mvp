// components/public/JangjiList.tsx
import Link from 'next/link';
import type { Cemetery } from '@/src/lib/cemeteries';

type JangjiListProps = {
  cemeteries: Cemetery[];
};

export function JangjiList({ cemeteries }: JangjiListProps) {
  // 선택한 지역에 장지가 하나도 없을 때
  if (cemeteries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">선택한 지역에 장지 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 섹션 타이틀 */}
      <h2 className="text-2xl font-semibold">
        Nghĩa trang ({cemeteries.length}개)
      </h2>

      {/* 카드 그리드 */}
      <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cemeteries.map((cemetery) => (
          <div
            key={cemetery.id}
            className="section-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6"
          >
            {/* 대표 이미지 placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">이미지 placeholder</span>
            </div>

            {/* 이름 */}
            <h3 className="text-lg font-semibold mb-1">
              {cemetery.nameVi}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {cemetery.nameKo}
            </p>

            {/* 지역 + 타입 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {cemetery.region}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {cemetery.typeCode}
              </span>
            </div>

            {/* 주소 */}
            <p className="text-xs text-gray-600 mb-3">
              Địa chỉ: {cemetery.addressVi}
            </p>

            {/* 장점/설명 요약 */}
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-semibold text-green-700">✓ 장점:</span>{' '}
                <span className="text-gray-800">{cemetery.prosVi}</span>
              </p>
              <p className="text-gray-700 line-clamp-3">
                {cemetery.extraInfoVi}
              </p>
            </div>

            <div className="pt-4">
              <Link
                href={`/jangji/${cemetery.id}`}
                className="inline-flex items-center rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-soft hover:bg-sky-700"
              >
                상세보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
