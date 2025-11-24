'use client';

import { useState } from 'react';
import { JangjiMap } from './JangjiMap';
import { JangjiList } from './JangjiList';

type Region = 'Bắc' | 'Trung' | 'Nam';

type Cemetery = {
  id: number;
  region: Region;
  name: string;
  type: string;
  address: string;
  mainImage: string;
  images: string[];
  pros: string;
  cons: string;
};

type JangjiSectionProps = {
  cemeteries: Cemetery[];
};

export function JangjiSection({ cemeteries }: JangjiSectionProps) {
  const [region, setRegion] = useState<Region>('Bắc');

  const filtered = cemeteries.filter((c) => c.region === region);

  return (
    <section className="container space-y-12 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Thông tin nghĩa trang</h1>
        <p className="text-lg text-gray-600">
          Chọn khu vực để xem danh sách nghĩa trang
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setRegion('Bắc')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            region === 'Bắc'
              ? 'bg-sky-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Bắc (북부)
        </button>
        <button
          onClick={() => setRegion('Trung')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            region === 'Trung'
              ? 'bg-sky-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Trung (중부)
        </button>
        <button
          onClick={() => setRegion('Nam')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            region === 'Nam'
              ? 'bg-sky-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Nam (남부)
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <JangjiMap region={region} onRegionChange={setRegion} />
        <JangjiList cemeteries={filtered} />
      </div>
    </section>
  );
}

