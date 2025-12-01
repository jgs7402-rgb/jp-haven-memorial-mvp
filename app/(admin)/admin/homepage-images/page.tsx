import type { AdminTestimonial } from '@/components/admin/HomepageImagesClient';
import HomepageImagesClient from '@/components/admin/HomepageImagesClient';
import { getHomepageTestimonialsForAdmin } from '@/src/lib/homepageTestimonials';

// 🔥 이 줄 추가: Admin 페이지도 항상 최신 데이터 가져오게
export const revalidate = 0;
// 필요하면 더 강하게:
// export const dynamic = 'force-dynamic';

function buildFallbackTestimonials(): AdminTestimonial[] {
  return [
    { id: null, quoteVi: '', metaVi: '', sortOrder: 1, isActive: true },
    { id: null, quoteVi: '', metaVi: '', sortOrder: 2, isActive: true },
    { id: null, quoteVi: '', metaVi: '', sortOrder: 3, isActive: true },
  ];
}

export default async function AdminHomepageImagesPage() {
  const testimonialsFromDb = await getHomepageTestimonialsForAdmin();

  const initialTestimonials: AdminTestimonial[] =
    testimonialsFromDb.length > 0
      ? testimonialsFromDb
      : buildFallbackTestimonials();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">메인 이미지</p>
        <h1 className="text-2xl font-bold">고객 후기 관리</h1>
        <p className="text-sm text-slate-500">
          Trang quản lý testimonial (VI). Supabase에 저장된 후기를 불러와 관리합니다.
        </p>
      </div>

      <HomepageImagesClient initialTestimonials={initialTestimonials} />
    </div>
  );
}
