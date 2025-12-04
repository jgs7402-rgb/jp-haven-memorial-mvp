// app/(public)/jangji/[id]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCemeteryById } from '@/src/lib/cemeteries';
import JangjiDetail from '@/components/public/JangjiDetail';
import { SiteHeader } from '@/components/public/SiteHeader';
import { getSiteSettings } from '@/src/lib/siteSettings';

type PageProps = {
  params: { id: string };
};

// 장지 상세는 항상 최신 데이터를 보는 게 좋으니까 dynamic 유지
export const dynamic = 'force-dynamic';

// SEO / OG 메타데이터
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = Number(params.id);

  const [cemetery, settings] = await Promise.all([
    Number.isNaN(id) ? Promise.resolve(null) : fetchCemeteryById(id),
    getSiteSettings(),
  ]);

  const baseSiteName = settings.siteNameVi || 'JP Haven';
  const fallbackTitle =
    settings.seoDefaultTitleVi || settings.siteNameVi || 'JP Haven';
  const fallbackDescription =
    settings.seoDefaultDescriptionVi ||
    'JP Haven Memorial là nền tảng trung gian kết nối dịch vụ nghĩa trang và lưu tro cốt.';

  // 잘못된 id 또는 cemetery 없음 → 전역 기본 메타로 처리
  if (!cemetery) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const location =
    cemetery.locationShortVi ||
    cemetery.addressShortVi ||
    cemetery.addressVi ||
    '';

  const title = `${cemetery.nameVi}${
    location ? ` – ${location}` : ''
  } | ${baseSiteName}`;

  const description =
    cemetery.metaDescriptionVi ||
    `Thông tin chi tiết về ${cemetery.nameVi}${
      location ? ` tại ${location}` : ''
    }: hình ảnh, vị trí và dịch vụ nghĩa trang liên kết.`;

  const imageUrl =
    cemetery.mainImageUrl ||
    cemetery.imageUrl ||
    settings.ogDefaultImageUrl ||
    undefined;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/jangji/${cemetery.id}`,
      siteName: baseSiteName,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: `Hình ảnh nghĩa trang ${cemetery.nameVi}${
                location ? ` tại ${location}` : ''
              }`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function JangjiDetailPage({ params }: PageProps) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  // 상세 페이지 본문에서도 cemetery + siteSettings 함께 가져오기
  const [cemetery, settings] = await Promise.all([
    fetchCemeteryById(id),
    getSiteSettings(),
  ]);

  if (!cemetery) {
    notFound();
  }

  const siteName = settings.siteNameVi || 'JP Haven';

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* 상단 공통 헤더 (홈과 동일 스타일) */}
      <SiteHeader siteName={siteName} />

      {/* 상세 내용 */}
      <JangjiDetail cemetery={cemetery} />
    </main>
  );
}
