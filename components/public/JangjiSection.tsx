'use client';

import { useState } from 'react';
import { JangjiMap } from './JangjiMap';
import { JangjiList } from './JangjiList';
import type { Cemetery, Region } from '@/src/lib/cemeteries';

type JangjiSectionProps = {
  cemeteries: Cemetery[];
};

export function JangjiSection({ cemeteries }: JangjiSectionProps) {
  const [region, setRegion] = useState<Region>('Bắc');

  const filtered = cemeteries.filter((c) => c.region === region);

  return (
    <section className="space-y-10 py-10">
      {/* 메인 페이지와 동일한 헤더 레이아웃 */}
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">JP Haven Memorial</div>
          <nav className="flex gap-6">
            <a href="/">Trang chủ</a>
            <a href="/jangji">장지 안내</a>
            <a href="/company">회사 소개</a>
          </nav>
          <div className="text-sm">Hotline: 0xx xxx xxxx</div>
        </div>
      </header>

      <div className="container mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Thông tin nghĩa trang</h1>
          <p className="text-lg text-gray-600">
            Chọn khu vực để xem danh sách nghĩa trang
          </p>
        </div>

        {/* 지도 + 지역 카테고리 통합 영역 */}
        <div className="mx-auto w-full max-w-[820px] px-4">
          <JangjiMap region={region} onRegionChange={setRegion} />
        </div>

        {/* 카드 리스트 */}
        <JangjiList cemeteries={filtered} />
      </div>
    </section>
  );
}
