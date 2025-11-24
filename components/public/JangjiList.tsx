type Cemetery = {
  id: number;
  region: 'Bắc' | 'Trung' | 'Nam';
  name: string;
  type: string;
  address: string;
  mainImage: string;
  images: string[];
  pros: string;
  cons: string;
};

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
            className="section-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* 대표 사진 */}
            <div className="relative w-full h-48 bg-gray-200">
              <img
                src={cemetery.mainImage}
                alt={cemetery.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            </div>

            <div className="p-6">
              {/* 장지 이름 */}
              <h3 className="text-xl font-semibold mb-2">{cemetery.name}</h3>

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

              {/* 추가 사진 그리드 */}
              {cemetery.images && cemetery.images.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {cemetery.images.slice(0, 6).map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`${cemetery.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
          </div>
        ))}
      </div>
    </div>
  );
}

