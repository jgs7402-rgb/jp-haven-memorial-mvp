import { JangjiSection } from '@/components/public/JangjiSection';
import { fetchCemeteries } from '@/src/lib/cemeteries';

export default async function JangjiPage() {
  const cemeteries = await fetchCemeteries();

  return <JangjiSection cemeteries={cemeteries} />;
}
