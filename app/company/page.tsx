// app/company/page.tsx

import { getSiteSettings, type SiteSettings } from '@/src/lib/siteSettings';
import CompanyPageClient from './CompanyPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Giới thiệu công ty | JP Haven',
  description:
    'JP Haven Memorial là nền tảng tang lễ số, kết hợp kinh nghiệm quản lý tang lễ Hàn Quốc với văn hoá tang lễ tại Việt Nam.',
};

export default async function CompanyPage() {
  const settings: SiteSettings = await getSiteSettings();

  const hotline = settings.hotlineNumber ?? '';
  const email = settings.supportEmail ?? '';

  return (
    <>
      <CompanyPageClient hotline={hotline} email={email} />
    </>
  );
}
