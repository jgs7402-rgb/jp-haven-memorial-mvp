// app/(public)/page.tsx

import { getRegionHeroImage } from '@/components/public/jangjiImages';
import { InquiryForm } from '@/components/public/InquiryForm';
import { SiteHeader } from '@/components/public/SiteHeader';
import { TestimonialsCarousel } from '@/components/public/TestimonialsCarousel';
import Footer from '@/components/public/Footer';
import type { Region, Cemetery } from '@/src/lib/cemeteries';
import { fetchFeaturedCemeteriesForHome } from '@/src/lib/cemeteries';
import { getSiteSettings } from '@/src/lib/siteSettings';
import { getHomepageTestimonialsForPublic } from '@/src/lib/homepageTestimonials';

export const revalidate = 0;

const FALLBACK_TESTIMONIALS = [
  {
    quote:
      'Gia đình tôi được hỗ trợ rất tận tình, biết trước chi phí nên đỡ lo lắng.',
    meta: 'Con trai, 35 tuổi · TP.HCM',
  },
  {
    quote:
      'Tư vấn rõ ràng, có so sánh giữa các nghĩa trang nên quyết định nhanh hơn.',
    meta: 'Em gái, 29 tuổi · Hà Nội',
  },
  {
    quote:
      'Dịch vụ chuyên nghiệp, người Hàn vận hành nên cảm giác tin cậy.',
    meta: 'Bạn bè, 32 tuổi · Đà Nẵng',
  },
  {
    quote:
      'Có hotline hỗ trợ giờ hành chính, mọi thắc mắc đều được giải đáp.',
    meta: 'Người thân, 41 tuổi · Bình Dương',
  },
  {
    quote:
      'Biết trước ngân sách và khu vực phù hợp nên không tốn nhiều thời gian.',
    meta: 'Cháu gái, 27 tuổi · Huế',
  },
  {
    quote:
      'Trang web đơn giản, dễ để lại thông tin và nhận tư vấn nhanh.',
    meta: 'Con trai, 38 tuổi · Cần Thơ',
  },
  {
    quote:
      'Có so sánh ưu/nhược điểm từng nghĩa trang, giúp gia đình lựa chọn minh bạch.',
    meta: 'Anh họ, 36 tuổi · Hải Phòng',
  },
  {
    quote:
      'Phục vụ thân thiện, hỗ trợ cả tiếng Hàn và tiếng Việt.',
    meta: 'Bạn bè, 34 tuổi · TP.HCM',
  },
];

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  const dynamicTestimonials = await getHomepageTestimonialsForPublic();

  const testimonials =
    dynamicTestimonials.length > 0
      ? dynamicTestimonials
      : FALLBACK_TESTIMONIALS;
  const featuredCemeteries = await fetchFeaturedCemeteriesForHome();

  const siteName = siteSettings?.siteNameVi ?? 'JP Haven';

  const heroTitle =
    siteSettings?.heroTitleVi ??
    'Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.';
  const heroSubtitle =
    siteSettings?.heroSubtitleVi ??
    'Dịch vụ tư vấn do người Hàn Quốc vận hành, hỗ trợ gia đình Việt Nam hiểu rõ chi phí và lựa chọn trước khi ra nghĩa trang.';

  const hotlineNumber = siteSettings?.hotlineNumber ?? '0xx xxx xxxx';
  const hotlineHref = hotlineNumber
    ? `tel:${hotlineNumber.replace(/\s+/g, '')}`
    : '#inquiry';
  const businessHours =
    siteSettings?.businessHoursText ?? '08:00 – 21:00 (Giờ Việt Nam)';

  const heroCtaPrimary =
    siteSettings?.heroCtaPrimaryVi ?? 'Gọi tư vấn ngay';
  const heroCtaSecondary =
    siteSettings?.heroCtaSecondaryVi ?? 'Để lại thông tin tư vấn';
  const heroCtaTertiary =
    siteSettings?.heroCtaTertiaryVi ?? 'Chat qua Zalo';

  const zaloUrl = siteSettings?.zaloUrl ?? '#';

  return (
    <main>
      {/* 헤더 */}
      <SiteHeader siteName={siteName} />

      {/* ========================= */}
      {/* Hero 섹션 */}
      {/* ========================= */}
      <section className="container mx-auto pt-10 pb-12 md:pt-12 md:pb-14">
        <div className="max-w-md md:max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">{heroTitle}</h1>
          <p className="text-lg text-gray-600">{heroSubtitle}</p>

          <div className="flex gap-4 justify-center">
            {heroCtaPrimary ? (
              <a
                href={hotlineHref}
                className="px-6 py-3 bg-sky-600 text-white rounded-lg"
              >
                {heroCtaPrimary}
              </a>
            ) : null}

            {heroCtaSecondary ? (
              <a
                href="#inquiry"
                className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg"
              >
                {heroCtaSecondary}
              </a>
            ) : null}

            {heroCtaTertiary ? (
              <a
                href="https://zalo.me/3258467487025854421"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg"
              >
                {heroCtaTertiary}
              </a>
            ) : null}
          </div>

          <p className="text-sm text-gray-500">
            Hotline: {hotlineNumber} · {businessHours}
          </p>

          {siteSettings?.hotlineNoticeVi ? (
            <div className="mt-4 section-card py-6 px-5 text-left">
              <p className="text-base md:text-lg text-slate-700 whitespace-pre-line leading-relaxed">
                {siteSettings.hotlineNoticeVi}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* ========================= */}
      {/* 장지 티저 섹션 */}
      {/* ========================= */}
      <section className="container mx-auto py-12 mt-0 md:mt-2">
        <h2 className="text-2xl font-bold mb-6">Nghĩa trang nổi bật</h2>
        <FeaturedCemeteries cemeteries={featuredCemeteries} />
        <div className="text-center">
          <a
            href="/jangji"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg inline-block"
          >
            Xem tất cả
          </a>
        </div>
      </section>

      {/* ========================= */}
      {/* 후기 섹션 */}
      {/* ========================= */}
      <section className="bg-white py-12 shadow-soft">
        <div className="container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Khách hàng nói gì</h2>
              <p className="text-muted text-sm">
                Carousel hiển thị 3/8 đánh giá (tự động trượt).
              </p>
            </div>
            <div className="text-xs text-muted">
              Tự động trượt mỗi 4 giây (mock)
            </div>
          </div>

          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* ========================= */}
      {/* 문의 섹션 */}
      {/* ========================= */}
      <section
        id="inquiry"
        className="container grid gap-8 lg:grid-cols-2 py-12"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-sky-600">Liên hệ</p>
          <h2 className="text-2xl font-bold">
            Để lại thông tin để được tư vấn
          </h2>
          <p className="text-muted text-sm">
            Thông tin sẽ được lưu vào bảng inquiries. Hiện tại là mock submit.
          </p>
        </div>

        <InquiryForm />
      </section>

      {/* ========================= */}
      {/* 푸터 섹션 */}
      {/* ========================= */}
      <Footer settings={siteSettings} />
    </main>
  );
}

type FeaturedCemetery = {
  id: string;
  region: Region;
  nameVi: string;
  typeVi: string;
  addressVi: string;
  image: string;
};

function regionLabel(region: Region) {
  if (region === 'Bắc') return 'Miền Bắc';
  if (region === 'Trung') return 'Miền Trung';
  return 'Miền Nam';
}

function FeaturedCemeteries({ cemeteries }: { cemeteries: Cemetery[] }) {
  const items: FeaturedCemetery[] =
    cemeteries.length > 0
      ? cemeteries.map((c) => ({
          id: String(c.id),
          region: c.region,
          nameVi: c.nameVi,
          typeVi: c.typeCode,
          addressVi: c.addressShortVi || c.addressVi,
          image: c.imageUrl || getRegionHeroImage(c.region),
        }))
      : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 mb-6">
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
        {items.map((cemetery) => (
          <div
            key={cemetery.id}
            className="snap-center shrink-0 w-[260px] sm:w-auto section-card overflow-hidden p-6"
          >
            <div className="w-full h-40 bg-gray-100 rounded mb-4 overflow-hidden">
              <img
                src={cemetery.image}
                alt={cemetery.nameVi}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">
              {cemetery.nameVi}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {cemetery.typeVi}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {regionLabel(cemetery.region)}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Địa chỉ: {cemetery.addressVi}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
