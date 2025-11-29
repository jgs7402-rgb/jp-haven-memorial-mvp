// app/(public)/jangji/page.tsx
import JangjiSection from '@/components/public/JangjiSection';
import { fetchCemeteries } from '@/src/lib/cemeteries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function JangjiPage() {
  const cemeteries = await fetchCemeteries();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JangjiSection cemeteries={cemeteries} />
    </main>
  );
}
