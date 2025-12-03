// components/public/JangjiList.tsx
import Link from 'next/link';
import type { Cemetery, Region } from '@/src/lib/cemeteries';
import { getJangjiImages } from './jangjiImages';

type JangjiListProps = {
  cemeteries: Cemetery[];
};

function regionLabel(region: Region) {
  if (region === 'Bắc') return 'Miền Bắc';
  if (region === 'Trung') return 'Miền Trung';
  return 'Miền Nam';
}

export function JangjiList({ cemeteries }: JangjiListProps) {
  if (cemeteries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không có nghĩa trang trong khu vực đã chọn.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-semibold">Nghĩa trang</h2>
        <span className="text-sm text-gray-500">
          {cemeteries.length} địa điểm
        </span>
      </div>

      <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cemeteries.map((cemetery) => (
          <div
            key={cemetery.id}
            className="section-card overflow-hidden p-6"
          >
            <div className="w-full h-48 bg-gray-100 rounded mb-4 overflow-hidden">
              <img
                src={cemetery.imageUrl ?? getJangjiImages(cemetery.id).main}
                alt={cemetery.nameVi}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <h3 className="text-lg font-semibold mb-1">{cemetery.nameVi}</h3>

            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {regionLabel(cemetery.region)}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {cemetery.typeCode}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Địa chỉ: {cemetery.addressVi}
            </p>

            <div className="space-y-1 text-xs">
              <p>
                <span className="font-semibold text-green-700">✓ Ưu điểm:</span>{' '}
                <span className="text-gray-800">{cemetery.prosVi}</span>
              </p>
              <p className="text-gray-700 line-clamp-3">{cemetery.extraInfoVi}</p>
            </div>

            <div className="pt-4">
              <Link
                href={`/jangji/${cemetery.id}`}
                className="block w-full text-center rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
