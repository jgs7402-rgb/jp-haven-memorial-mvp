import { notFound } from 'next/navigation';
import { InquiryForm } from '@/components/public/InquiryForm';
import { getJangjiImages } from '@/components/public/jangjiImages';
import { fetchCemeteryById } from '@/src/lib/cemeteries';

type PageProps = {
  params: { id: string };
};

export default async function CemeteryDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return notFound();

  const cemetery = await fetchCemeteryById(id);
  if (!cemetery) return notFound();
  const images = getJangjiImages(id);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    cemetery.addressVi || cemetery.nameVi
  )}&output=embed`;

  return (
    <main className="bg-slate-50 text-slate-900">
      {/* 상단 헤더 (메인과 동일) */}
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

      <section className="container mx-auto px-4 py-10 space-y-10">
        {/* 대표 이미지 */}
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-200">
          <img
            src={images.main}
            alt={cemetery.nameVi}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 추가 이미지 갤러리 (3열) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.extras.map((url, idx) => (
            <div
              key={idx}
              className="aspect-video w-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-500"
            >
              <img src={url} alt={`${cemetery.nameVi} 추가 이미지 ${idx + 1}`} className="h-full w-full object-cover rounded-lg" />
            </div>
          ))}
        </div>

        {/* 기본 정보 */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{cemetery.nameVi}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {cemetery.region}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {cemetery.typeCode}
            </span>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Địa chỉ: </span>
            {cemetery.addressVi}
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold text-green-700">장점: </span>
              <span className="text-gray-800">{cemetery.prosVi || cemetery.prosKo}</span>
            </p>
            <p className="text-gray-800">
              {cemetery.extraInfoVi || cemetery.extraInfoKo}
            </p>
          </div>
        </div>

        {/* 구글맵 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Google Map</h2>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 shadow-soft">
            <iframe
              src={mapSrc}
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* 문의하기 폼 */}
        <section id="inquiry" className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-sky-600">Liên hệ</p>
            <h2 className="text-2xl font-bold">Để lại thông tin để được tư vấn</h2>
            <p className="text-muted text-sm">
              Thông tin sẽ được lưu vào bảng inquiries. Hiện tại là mock submit.
            </p>
          </div>
          <InquiryForm />
        </section>
      </section>

      {/* 푸터 (메인과 동일) */}
      <footer className="bg-gray-100 py-12 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">메뉴</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/jangji">장지 안내</a>
                </li>
                <li>
                  <a href="/company">회사 소개</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">연락처</h3>
              <p className="text-sm">Hotline: 0xx xxx xxxx</p>
              <p className="text-sm">Email: info@jphaven.com</p>
              <p className="text-sm">08:00 – 21:00 (Giờ Việt Nam)</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">소셜</h3>
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
              공공기관 인증 로고 (placeholder)
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
