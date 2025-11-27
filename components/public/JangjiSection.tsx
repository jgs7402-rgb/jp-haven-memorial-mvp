'use client';

import Link from 'next/link';
import { useState } from 'react';
import { JangjiList } from './JangjiList';
import { JangjiRegionSlider } from './JangjiRegionSlider';
import type { Cemetery, Region } from '@/src/lib/cemeteries';

type JangjiSectionProps = {
  cemeteries: Cemetery[];
};

export function JangjiSection({ cemeteries }: JangjiSectionProps) {
  const [region, setRegion] = useState<Region>('Bắc');

  const filtered = cemeteries.filter((c) => c.region === region);

  return (
    <>
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            JP Haven Memorial
          </Link>
          <nav className="flex gap-6">
            <a href="/">Trang chủ</a>
            <a href="/jangji">Nghĩa trang</a>
            <a href="/company">Giới thiệu công ty</a>
          </nav>
          <div className="text-sm">Hotline: 0xx xxx xxxx</div>
        </div>
      </header>

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
      <footer className="bg-gray-100 py-12 mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/jangji">Nghĩa trang</a>
                </li>
                <li>
                  <a href="/company">Giới thiệu công ty</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <p className="text-sm">Hotline: 0xx xxx xxxx</p>
              <p className="text-sm">Email: info@jphaven.com</p>
              <p className="text-sm">08:00 – 21:00 (Giờ Việt Nam)</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Mạng xã hội</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#">Zalo</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>Dịch vụ tư vấn do người Hàn Quốc vận hành</p>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded">
              Logo chứng nhận (placeholder)
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
