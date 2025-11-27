'use client';

type Region = 'Bắc' | 'Trung' | 'Nam';

type JangjiMapProps = {
  region: Region;
  onRegionChange: (region: Region) => void;
};

export function JangjiMap({ region, onRegionChange }: JangjiMapProps) {
  const handleRegionClick = (target: Region) => {
    onRegionChange(target);
  };

  const isActive = (target: Region) => region === target;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Bản đồ Việt Nam (SVG)</h2>

        {/* SVG 지도 영역 */}
        <div className="w-full aspect-[16/9] flex items-center justify-center mb-4">
          <svg
            viewBox="0 0 200 400"
            className="max-h-[320px] w-auto drop-shadow-sm"
          >
            {/* 전체 배경 */}
            <defs>
              <linearGradient id="vn-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            <rect
              x="30"
              y="10"
              width="140"
              height="380"
              rx="70"
              fill="url(#vn-bg)"
              stroke="#cbd5f5"
              strokeWidth="1"
            />

            {/* 북부 영역 */}
            <g
              className="transition-all duration-300 cursor-pointer"
              onClick={() => handleRegionClick('Bắc')}
            >
              <path
                d="M70 40 C 40 60, 40 100, 70 120 C 100 140, 130 140, 150 120 C 170 100, 170 70, 150 50 C 130 30, 100 30, 70 40 Z"
                fill={isActive('Bắc') ? '#2563eb' : '#e5e7eb'}
                stroke={isActive('Bắc') ? '#1d4ed8' : '#cbd5f5'}
                strokeWidth={isActive('Bắc') ? 2 : 1}
              />
              {isActive('Bắc') && (
                <ellipse
                  cx="110"
                  cy="85"
                  rx="55"
                  ry="35"
                  fill="rgba(37,99,235,0.18)"
                />
              )}
              {/* 하노이 마커 */}
              <circle cx="105" cy="75" r="3" fill="#1d4ed8" />
              <text
                x="112"
                y="78"
                fontSize="8"
                fill="#0f172a"
              >
                Hà Nội
              </text>
            </g>

            {/* 중부 영역 */}
            <g
              className="transition-all duration-300 cursor-pointer"
              onClick={() => handleRegionClick('Trung')}
            >
              <path
                d="M75 135 C 60 150, 55 180, 65 210 C 75 240, 90 260, 110 270 C 130 280, 145 270, 150 250 C 155 230, 150 200, 140 175 C 130 150, 100 130, 75 135 Z"
                fill={isActive('Trung') ? '#059669' : '#e5e7eb'}
                stroke={isActive('Trung') ? '#047857' : '#cbd5f5'}
                strokeWidth={isActive('Trung') ? 2 : 1}
              />
              {isActive('Trung') && (
                <ellipse
                  cx="110"
                  cy="200"
                  rx="45"
                  ry="35"
                  fill="rgba(5,150,105,0.18)"
                />
              )}
              {/* 다낭 마커 */}
              <circle cx="115" cy="190" r="3" fill="#047857" />
              <text
                x="122"
                y="193"
                fontSize="8"
                fill="#0f172a"
              >
                Đà Nẵng
              </text>
            </g>

            {/* 남부 영역 */}
            <g
              className="transition-all duration-300 cursor-pointer"
              onClick={() => handleRegionClick('Nam')}
            >
              <path
                d="M85 260 C 70 275, 65 295, 70 315 C 75 335, 90 355, 110 360 C 130 365, 145 355, 150 340 C 155 325, 152 305, 145 290 C 138 275, 115 255, 85 260 Z"
                fill={isActive('Nam') ? '#f97316' : '#e5e7eb'}
                stroke={isActive('Nam') ? '#ea580c' : '#cbd5f5'}
                strokeWidth={isActive('Nam') ? 2 : 1}
              />
              {isActive('Nam') && (
                <ellipse
                  cx="115"
                  cy="310"
                  rx="40"
                  ry="32"
                  fill="rgba(249,115,22,0.18)"
                />
              )}
              {/* HCMC 마커 */}
              <circle cx="118" cy="300" r="3" fill="#ea580c" />
              <text
                x="125"
                y="303"
                fontSize="8"
                fill="#0f172a"
              >
                HCMC
              </text>
            </g>
          </svg>
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
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">Trung (중부)</span>
          </button>
          <button
            onClick={() => onRegionChange('Nam')}
            className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
              region === 'Nam'
                ? 'bg-orange-500 text-white'
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
