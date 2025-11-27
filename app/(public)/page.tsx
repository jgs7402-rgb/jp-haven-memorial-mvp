console.log('[RUNTIME CHECK] typeof window =', typeof window);
console.log('[RUNTIME CHECK] process.versions =', process.versions);
console.log('[RUNTIME CHECK] process.release =', process.release);

import { getRegionHeroImage } from '@/components/public/jangjiImages';
import { InquiryForm } from '@/components/public/InquiryForm';
import { TestimonialsCarousel } from '@/components/public/TestimonialsCarousel';
import type { Region } from '@/src/lib/cemeteries';

const testimonials = [
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

export default function HomePage() {
  return (
    <main>
      {/* 헤더 */}
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">JP Haven Memorial</div>
          <nav className="flex gap-6">
            <a href="/jangji">Nghĩa trang</a>
            <a href="/company">Giới thiệu công ty</a>
          </nav>
          <div className="text-sm">Hotline: 0xx xxx xxxx</div>
        </div>
      </header>

      {/* ========================= */}
      {/* Hero 섹션 */}
      {/* ========================= */}
      <section className="container mx-auto pt-12 pb-16 md:pt-16 md:pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Dịch vụ tư vấn do người Hàn Quốc vận hành, hỗ trợ gia đình Việt Nam
          hiểu rõ chi phí và lựa chọn trước khi ra nghĩa trang.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="tel:0xxxxxxxxx"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg"
          >
            Gọi tư vấn ngay
          </a>
          <a
            href="#inquiry"
            className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg"
          >
            Để lại thông tin tư vấn
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg"
          >
            Chat qua Zalo
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Hotline: 0xx xxx xxxx · 08:00 – 21:00 (Giờ Việt Nam)
        </p>
      </section>

      {/* ========================= */}
      {/* 장지 티저 섹션 */}
      {/* ========================= */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Nghĩa trang nổi bật</h2>
        <FeaturedCemeteries />
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
            <div className="text-xs text-muted">Tự động trượt mỗi 4 giây (mock)</div>
          </div>

          {/* 캐러셀 컴포넌트 */}
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* ========================= */}
      {/* 문의 섹션 */}
      {/* ========================= */}
      <section id="inquiry" className="container grid gap-8 lg:grid-cols-2 py-12">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-sky-600">Liên hệ</p>
          <h2 className="text-2xl font-bold">Để lại thông tin để được tư vấn</h2>
          <p className="text-muted text-sm">
            Thông tin sẽ được lưu vào bảng inquiries. Hiện tại là mock submit.
          </p>
        </div>

        {/* 기존 form 대신에 InquiryForm 사용 */}
        <InquiryForm />
      </section>

      {/* ========================= */}
      {/* 푸터 섹션 */}
      {/* ========================= */}
      <footer className="bg-gray-100 py-12 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
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
            {/* FooterBadge placeholder */}
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded">
              Logo chứng nhận (placeholder)
            </div>
          </div>
        </div>
      </footer>
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

const FEATURED_CEMETERIES: FeaturedCemetery[] = [
  {
    id: 'north',
    region: 'Bắc',
    nameVi: 'Công viên nghĩa trang Hà Nội – Hòa Bình',
    typeVi: 'Công viên nghĩa trang',
    addressVi: 'Ngoại ô Hà Nội, Việt Nam',
    image: getRegionHeroImage('Bắc'),
  },
  {
    id: 'central',
    region: 'Trung',
    nameVi: 'Nghĩa trang biển Đà Nẵng',
    typeVi: 'Nghĩa trang ven biển',
    addressVi: 'Đà Nẵng, Việt Nam',
    image: getRegionHeroImage('Trung'),
  },
  {
    id: 'south',
    region: 'Nam',
    nameVi: 'Nghĩa trang gia đình TP.HCM',
    typeVi: 'Nhà lưu tro cốt',
    addressVi: 'TP. Hồ Chí Minh, Việt Nam',
    image: getRegionHeroImage('Nam'),
  },
];

function regionLabel(region: Region) {
  if (region === 'Bắc') return 'Miền Bắc';
  if (region === 'Trung') return 'Miền Trung';
  return 'Miền Nam';
}

function FeaturedCemeteries() {
  return (
    <div className="mt-4 mb-6">
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
        {FEATURED_CEMETERIES.map((cemetery) => (
          <div
            key={cemetery.id}
            className="snap-center shrink-0 w-[260px] sm:w-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6"
          >
            <div className="w-full h-40 bg-gray-100 rounded mb-4 overflow-hidden">
              <img
                src={cemetery.image}
                alt={cemetery.nameVi}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{cemetery.nameVi}</h3>
            <p className="text-sm text-gray-600 mb-2">{cemetery.typeVi}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {regionLabel(cemetery.region)}
              </span>
            </div>
            <p className="text-xs text-gray-600">Địa chỉ: {cemetery.addressVi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
