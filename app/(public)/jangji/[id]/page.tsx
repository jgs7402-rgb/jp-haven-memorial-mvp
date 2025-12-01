// app/(public)/jangji/[id]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCemeteryById } from '@/src/lib/cemeteries';
import JangjiDetail from '@/components/public/JangjiDetail';
import SiteHeader from '@/components/public/SiteHeader';
import { getSiteSettings } from '@/src/lib/siteSettings';

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = Number(params.id);
  const [cemetery, settings] = await Promise.all([
    Number.isNaN(id) ? Promise.resolve(null) : fetchCemeteryById(id),
    getSiteSettings(),
  ]);

  const baseSiteName = settings.siteNameVi || 'JP Haven Memorial';
  const fallbackTitle =
    settings.seoDefaultTitleVi || settings.siteNameVi || 'JP Haven Memorial';
  const fallbackDescription =
    settings.seoDefaultDescriptionVi ||
    'JP Haven Memorial là nền tảng trung gian kết nối dịch vụ nghĩa trang và lưu tro cốt.';

  if (!cemetery) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const location = cemetery.locationShortVi || cemetery.addressShortVi || cemetery.addressVi || '';
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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

  const cemetery = await fetchCemeteryById(id);

  if (!cemetery) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* 상단 공통 헤더 */}
      <SiteHeader />

      {/* 상세 내용 */}
      <JangjiDetail cemetery={cemetery} />
    </main>
  );
}
