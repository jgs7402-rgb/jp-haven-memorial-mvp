import type { Cemetery } from '@/app/(public)/jangji/page';

type JangjiListProps = {
  cemeteries: Cemetery[];
};

export function JangjiList({ cemeteries }: JangjiListProps) {
  if (cemeteries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">선택한 지역에 장지 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Nghĩa trang ({cemeteries.length}개)
      </h2>
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {cemeteries.map((cemetery) => (
          <div
            key={cemetery.id}
            className="section-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6"
          >
            {/* 대표 이미지 placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">이미지 placeholder</span>
            </div>

            {/* 장지 이름 */}
            <h3 className="text-xl font-semibold mb-2">{cemetery.name}</h3>

            {/* 지역 */}
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">지역:</span> {cemetery.region}
            </p>

            {/* 장지 종류 */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                {cemetery.type}
              </span>
            </div>

            {/* 주소 */}
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Địa chỉ:</span> {cemetery.address}
            </p>

            {/* 장점/단점 요약 */}
            <div className="space-y-2 text-sm">
              {cemetery.pros && (
                <div>
                  <span className="font-medium text-green-700">✓ 장점:</span>{' '}
                  <span className="text-gray-700">{cemetery.pros}</span>
                </div>
              )}
              {cemetery.cons && (
                <div>
                  <span className="font-medium text-orange-700">⚠ 단점:</span>{' '}
                  <span className="text-gray-700">{cemetery.cons}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

