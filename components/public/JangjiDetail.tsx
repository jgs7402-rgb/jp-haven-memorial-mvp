// components/public/JangjiDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import type { Cemetery } from '@/src/lib/cemeteries';
import { getJangjiImages } from './jangjiImages';
import { InquiryForm } from './InquiryForm';
import { trackEvent } from '@/src/lib/ga';
import CemeteryContactButtons from '@/components/public/CemeteryContactButtons';

type Props = {
  cemetery: Cemetery;
  hotlineNumber?: string | null;
  zaloUrl?: string | null;
  phoneLabel?: string;
  zaloLabel?: string;
};

export default function JangjiDetail({
  cemetery,
  hotlineNumber,
  zaloUrl,
  phoneLabel,
  zaloLabel,
}: Props) {
  // 기본 fallback 이미지 (장지 ID 기준 고정 이미지)
  const fallbackImage = getJangjiImages(cemetery.id).main;
  const mapQuery = encodeURIComponent(cemetery.addressVi || cemetery.nameVi);

  // Supabase cemetery_image + 단일 imageUrl + fallback까지 포함해서
  // 실제로 사용할 이미지 리스트를 만든다.
  const sortedImages =
    cemetery.images && cemetery.images.length > 0
      ? [...cemetery.images].sort((a, b) => {
          const sa = a.sortOrder ?? 999;
          const sb = b.sortOrder ?? 999;
          return sa - sb;
        })
      : cemetery.imageUrl
      ? [
          {
            id: 0,
            cemeteryId: cemetery.id,
            imageUrl: cemetery.imageUrl,
            sortOrder: 1,
            isMain: true,
            createdAt: '',
          },
        ]
      : [
          {
            id: 0,
            cemeteryId: cemetery.id,
            imageUrl: fallbackImage,
            sortOrder: 1,
            isMain: true,
            createdAt: '',
          },
        ];

  // 대표 이미지, 썸네일, 전체 리스트
  const heroImage = sortedImages[0]?.imageUrl ?? fallbackImage;
  const thumbImages = sortedImages.slice(1, 5).map((img) => img.imageUrl);
  const allImages = sortedImages.map((img) => img.imageUrl);

  // 모달 상태
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + allImages.length) % allImages.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % allImages.length);
  };

  useEffect(() => {
    trackEvent('장지상세_페이지뷰', {
      cemeteryId: cemetery.id,
      nameVi: cemetery.nameVi,
      region: cemetery.region,
    });
  }, [cemetery.id, cemetery.nameVi, cemetery.region]);

  return (
    <article className="space-y-8">
      {/* 상단 이미지 그리드 */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* 대표 이미지 */}
        <div className="md:col-span-1 overflow-hidden rounded-2xl">
          <div className="aspect-[4/3] w-full">
            <img
              src={heroImage}
              alt={cemetery.nameVi}
              className="h-full w-full object-cover cursor-pointer"
              onClick={() => openModal(0)}
              role="button"
            />
          </div>
        </div>

        {/* 부가 이미지 썸네일 */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-4">
          {thumbImages.map((src, idx) => (
            <div
              key={`${cemetery.id}-thumb-${idx}`}
              className="overflow-hidden rounded-2xl bg-slate-200"
            >
              <div className="aspect-square w-full">
                <img
                  src={src}
                  alt={`${cemetery.nameVi} phụ ${idx + 1}`}
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={() => openModal(idx + 1)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {cemetery.nameVi}
        </h1>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700">
            {cemetery.region === 'Bắc'
              ? 'Miền Bắc'
              : cemetery.region === 'Trung'
              ? 'Miền Trung'
              : 'Miền Nam'}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {cemetery.typeCode}
          </span>
        </div>

        <p className="text-sm text-slate-700">
          <span className="font-semibold">Địa chỉ:&nbsp;</span>
          {cemetery.addressVi}
        </p>

        <p className="text-sm text-slate-700">
          <span className="font-semibold">Ưu điểm:&nbsp;</span>
          {cemetery.prosVi}
        </p>

        {cemetery.extraInfoVi && (
          <p className="text-sm text-slate-700 whitespace-pre-line">
            {cemetery.extraInfoVi}
          </p>
        )}
      </div>

      {/* Google Map */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Bản đồ</h2>
        <div className="h-72 w-full overflow-hidden rounded-2xl bg-slate-200">
          <iframe
            title={`Bản đồ ${cemetery.nameVi}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed&hl=vi&region=VN`}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* 연락 버튼 (지도 아래 / 문의 위) */}
      <CemeteryContactButtons
        phone={hotlineNumber}
        zaloUrl={zaloUrl}
        phoneLabel={phoneLabel}
        zaloLabel={zaloLabel}
      />

      {/* 문의 폼 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Liên hệ tư vấn
        </h2>
        <InquiryForm />
      </section>

      {/* 이미지 확대 모달 */}
      {activeIndex !== null && allImages[activeIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-white text-slate-800 shadow-lg"
              onClick={closeModal}
            >
              ×
            </button>

            {/* 큰 이미지 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={allImages[activeIndex]}
                alt={`${cemetery.nameVi} phóng to`}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            </div>

            {/* 이전/다음 버튼 */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 shadow-lg"
                  onClick={showPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 shadow-lg"
                  onClick={showNext}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
