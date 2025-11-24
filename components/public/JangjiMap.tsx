'use client';

type Region = 'Bắc' | 'Trung' | 'Nam';

type JangjiMapProps = {
  region: Region;
  onRegionChange: (region: Region) => void;
};

export function JangjiMap({ region, onRegionChange }: JangjiMapProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Bản đồ Việt Nam</h2>
        
        {/* SVG 지도 placeholder */}
        <div className="w-full aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
          <div className="text-center text-gray-500">
            <svg
              className="w-24 h-24 mx-auto mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-sm">SVG 지도 placeholder</p>
            <p className="text-xs mt-1">나중에 실제 SVG 지도를 연결합니다</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          지도를 클릭하거나 아래 버튼을 선택하여 지역을 변경할 수 있습니다.
        </p>

        {/* 지역 버튼 */}
        <div className="space-y-2">
          <button
            onClick={() => onRegionChange('Bắc')}
            className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
              region === 'Bắc'
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Bắc (북부)</span>
          </button>
          <button
            onClick={() => onRegionChange('Trung')}
            className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
              region === 'Trung'
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Trung (중부)</span>
          </button>
          <button
            onClick={() => onRegionChange('Nam')}
            className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
              region === 'Nam'
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Nam (남부)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

