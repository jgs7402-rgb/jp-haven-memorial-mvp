// app/(public)/jangji/[id]/page.tsx
import { notFound } from 'next/navigation';
import { fetchCemeteryById } from '@/src/lib/cemeteries';
import JangjiDetail from '@/components/public/JangjiDetail';
import SiteHeader from '@/components/public/SiteHeader';

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

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
