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
      <div className="space-y-6">
        {/* 섹션 타이틀 */}
        <h2 className="text-2xl font-semibold mb-4">
          Nghĩa trang ({cemeteries.length}개)
        </h2>
  
        {/* 카드 리스트 */}
        // TODO: B/C 기능(문의 폼 서버 액션, 후기 캐러셀) 구현 완료 후,
        // 장지 카드 레이아웃을 메인 페이지 티저 섹션처럼 3열 그리드로 변경 예정.
        // 예: <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"> ... </div>
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
              <h3 className="text-xl font-semibold mb-2">
                {cemetery.nameVi || cemetery.nameKo}
              </h3>
  
              {/* 지역 */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">지역:</span> {cemetery.region}
              </p>
  
              {/* 장지 종류 */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                  {cemetery.typeCode}
                </span>
              </div>
  
              {/* 주소 */}
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Địa chỉ:</span> {cemetery.addressVi}
              </p>
  
              {/* 장점 / 부가 설명 */}
              <div className="space-y-2 text-sm">
                {cemetery.prosVi && (
                  <div>
                    <span className="font-medium text-green-700">✓ 장점:</span>{' '}
                    <span className="text-gray-700">{cemetery.prosVi}</span>
                  </div>
                )}
                {cemetery.extraInfoVi && (
                  <div>
                    {/* cons를 "부가 설명"으로 쓰는 버전 */}
                    <span className="font-medium text-sky-700">ℹ 부가 설명:</span>{' '}
                    <span className="text-gray-700">{cemetery.extraInfoVi}</span>
                  </div>
                )}
              </div>
  
              {/* 상세보기 버튼 */}
              <div className="mt-4">
                <Link
                  href={`/jangji/${cemetery.id}`}
                  className="text-sm text-sky-600 underline"
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
  
