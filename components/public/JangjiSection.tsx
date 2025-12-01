'use client';

import { useState } from 'react';
import { JangjiList } from './JangjiList';
import { JangjiRegionSlider } from './JangjiRegionSlider';
import Footer from './Footer';
import { SiteHeader } from '@/components/public/SiteHeader';
import type { Cemetery, Region } from '@/src/lib/cemeteries';
import type { SiteSettings } from '@/src/lib/siteSettings';

type JangjiSectionProps = {
  cemeteries: Cemetery[];
  siteSettings: SiteSettings; // 방법 A: 필수, non-null
};

export default function JangjiSection({
  cemeteries,
  siteSettings,
}: JangjiSectionProps) {
  const [region, setRegion] = useState<Region>('Bắc');

  const filtered = cemeteries.filter((c) => c.region === region);

  // siteNameVi가 비어 있으면 기본값 사용
  const siteName = siteSettings.siteNameVi || 'JP Haven Memorial';

  return (
    <>
      {/* 헤더 (홈과 동일 스타일) */}
      <SiteHeader siteName={siteName} />

      <section className="pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Thông tin nghĩa trang</h1>
            <p className="text-lg text-gray-600">
              Chọn khu vực để xem danh sách nghĩa trang
            </p>
          </div>

          {/* 지역 선택 슬라이더 */}
          <div className="mx-auto w-full max-w-[900px] px-4">
            <JangjiRegionSlider region={region} onRegionChange={setRegion} />
          </div>

          {/* 카드 리스트 */}
          <JangjiList cemeteries={filtered} />
        </div>
      </section>

      {/* 푸터 (메인 페이지와 동일) */}
      <Footer settings={siteSettings} />
    </>
  );
}
