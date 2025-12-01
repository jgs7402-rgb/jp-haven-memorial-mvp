// app/(admin)/admin/settings/page.tsx
import AdminSiteSettingsClient from './AdminSiteSettingsClient';
import { getSiteSettings } from '@/src/lib/siteSettings';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold">사이트 설정 (Settings)</h1>
      <p className="mb-6 text-sm text-slate-600">
        이 페이지에서 Hotline, 이메일, 운영시간, 메인 히어로 텍스트, Footer 문구 및
        SNS 링크를 관리할 수 있습니다.
      </p>

      <AdminSiteSettingsClient initialSettings={settings} />
    </main>
  );
}
