import type { Cemetery } from '@/src/lib/cemeteries';
import { fetchCemeteries } from '@/src/lib/cemeteries';
import CemeteriesAdminClient from './CemeteriesAdminClient';

export const runtime = 'nodejs';

export default async function AdminCemeteriesPage() {
  // 관리자 페이지에서는 비활성 장지도 포함하여 조회
  const cemeteries: Cemetery[] = await fetchCemeteries(true);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">장지 관리 (Cemeteries)</h1>
          <p className="text-sm text-slate-600">
            장지 이름, 지역, 타입, 노출 여부, 메인 추천, 이미지 URL 등을 한 화면에서 관리합니다.
          </p>
        </div>
      </header>

      <CemeteriesAdminClient initialCemeteries={cemeteries} />
    </main>
  );
}
