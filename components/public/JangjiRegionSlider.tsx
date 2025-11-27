'use client';

import { useRef } from 'react';
import type { Region } from '@/src/lib/cemeteries';

type JangjiRegionSliderProps = {
  region: Region;
  onRegionChange: (region: Region) => void;
};

const REGIONS: {
  id: Region;
  labelVi: string;
  labelKo: string;
  descVi: string;
  descKo: string;
}[] = [
  {
    id: 'Bắc',
    labelVi: 'Miền Bắc',
    labelKo: '북부',
    descVi: 'Khu vực miền Bắc bao gồm Hà Nội và vùng lân cận',
    descKo: '하노이와 하롱베이를 포함한 북부 권역',
  },
  {
    id: 'Trung',
    labelVi: 'Miền Trung',
    labelKo: '중부',
    descVi: 'Khu vực miền Trung như Đà Nẵng, Huế, v.v.',
    descKo: '다낭·후에 등 중부 주요 도시권',
  },
  {
    id: 'Nam',
    labelVi: 'Miền Nam',
    labelKo: '남부',
    descVi: 'Khu vực miền Nam, bao gồm TP. Hồ Chí Minh',
    descKo: '호치민 인근 접근성 좋은 남부 권역',
  },
];

export function JangjiRegionSlider({
  region,
  onRegionChange,
}: JangjiRegionSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>('[data-region-card]');
    const cardWidth = firstCard?.offsetWidth ?? 200;
    const gap = 16; // matches Tailwind gap-4
    const amount = cardWidth + gap;

    track.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative bg-white shadow-lg rounded-2xl border border-gray-200 px-4 py-6 md:px-6">
      {/* Gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent" />

      {/* Arrow controls (desktop only) */}
      <button
        type="button"
        aria-label="Scroll regions left"
        onClick={() => scrollByCard('left')}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full border border-gray-200 bg-white shadow-lg text-gray-700 hover:bg-gray-50 active:scale-95 transition"
      >
        &lt;
      </button>
      <button
        type="button"
        aria-label="Scroll regions right"
        onClick={() => scrollByCard('right')}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full border border-gray-200 bg-white shadow-lg text-gray-700 hover:bg-gray-50 active:scale-95 transition"
      >
        &gt;
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-1"
      >
        {REGIONS.map((item) => {
          const isActive = item.id === region;
          return (
            <button
              key={item.id}
              type="button"
              data-region-card
              aria-pressed={isActive}
              onClick={() => onRegionChange(item.id)}
              className={`snap-start shrink-0 min-w-[180px] sm:min-w-[220px] md:min-w-[260px] rounded-xl border transition duration-200 text-left px-3 py-2 sm:px-4 sm:py-3 ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xl scale-[1.02]'
                  : 'bg-white text-gray-700 border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm sm:text-base">
                    {item.labelVi}
                  </span>
                  <span className="text-[11px] sm:text-xs opacity-80">
                    {isActive ? 'Đang chọn' : 'Chạm để chọn'}
                  </span>
                </div>
                <span
                  className={`text-[11px] sm:text-xs ${
                    isActive ? 'text-white/90' : 'text-gray-500'
                  }`}
                >
                  {item.descVi}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
