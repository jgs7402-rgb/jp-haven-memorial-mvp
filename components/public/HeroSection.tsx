// components/public/HeroSection.tsx
'use client';

import { trackEvent } from '@/src/lib/ga';

type HeroSectionProps = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string | null;
  heroCtaSecondary: string | null;
  heroCtaTertiary: string | null;
  hotlineNumber: string;
  hotlineHref: string;
  businessHours: string;
  zaloUrl: string;
  hotlineNoticeVi?: string | null;
};

export default function HeroSection({
  heroTitle,
  heroSubtitle,
  heroCtaPrimary,
  heroCtaSecondary,
  heroCtaTertiary,
  hotlineNumber,
  hotlineHref,
  businessHours,
  zaloUrl,
  hotlineNoticeVi,
}: HeroSectionProps) {
  return (
    <section className="container mx-auto pt-6 pb-12 md:pt-10 md:pb-14">
      <div className="max-w-md md:max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">{heroTitle}</h1>
        <p className="text-lg text-gray-600">{heroSubtitle}</p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center">
          {heroCtaPrimary ? (
            <a
              href={hotlineHref}
              onClick={() => {
                trackEvent('전화걸기_클릭', { 위치: 'hero_hotline' });
                trackEvent('핫라인_클릭', { 위치: 'hero_button' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-lg shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
            >
              {heroCtaPrimary}
            </a>
          ) : null}

          {heroCtaSecondary ? (
            <a
              href="#inquiry"
              className="w-full sm:w-auto px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
            >
              {heroCtaSecondary}
            </a>
          ) : null}

          {heroCtaTertiary ? (
            <a
              href={zaloUrl && zaloUrl !== '#' ? zaloUrl : 'https://zalo.me/3258467487025854421'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('Zalo상담_클릭', { 위치: 'hero_zalo' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
            >
              {heroCtaTertiary}
            </a>
          ) : null}
        </div>

        <p className="text-sm text-gray-500">
          Hotline: {hotlineNumber} · {businessHours}
        </p>

        {hotlineNoticeVi ? (
          <div className="mt-4 section-card py-6 px-5 text-left">
            <p className="text-base md:text-lg text-slate-700 whitespace-pre-line leading-relaxed">
              {hotlineNoticeVi}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}


