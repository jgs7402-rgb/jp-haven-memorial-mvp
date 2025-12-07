// app/(public)/jangji/page.tsx
import type { Metadata } from 'next';
import JangjiSection from '@/components/public/JangjiSection';
import { SiteHeader } from '@/components/public/SiteHeader';
import { fetchCemeteries } from '@/src/lib/cemeteries';
import { getSiteSettings } from '@/src/lib/siteSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// /jangji 전용 SEO 메타데이터
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();

  const siteName = s.siteNameVi || 'JP Haven';

  const title = `Thông tin nghĩa trang theo khu vực | ${siteName}`;
  const description =
    'Xem danh sách nghĩa trang theo Miền Bắc, Miền Trung, Miền Nam với hình ảnh, ưu điểm và mô tả chi tiết để gia đình dễ dàng so sánh và lựa chọn.';

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/jangji`,
    },
  };
}

export default async function JangjiPage() {
  const cemeteries = await fetchCemeteries();
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.siteNameVi ?? 'JP Haven';

  return (
    <>
      <SiteHeader siteName={siteName} />
      <main className="mx-auto max-w-6xl px-4">
        <JangjiSection cemeteries={cemeteries} siteSettings={siteSettings} />
      </main>
    </>
  );
}
