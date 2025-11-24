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
          <p className="text-gray-500 text-sm">지도 placeholder</p>
        </div>

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

