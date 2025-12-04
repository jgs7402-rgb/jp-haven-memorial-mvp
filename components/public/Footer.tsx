'use client';

import type { SiteSettings } from '@/src/lib/siteSettings';

type FooterProps = {
  settings?: SiteSettings | null;
};

export default function Footer({ settings }: FooterProps) {
  const hotlineNumber = settings?.hotlineNumber ?? '0xx xxx xxxx';
  const supportEmail = settings?.supportEmail ?? 'info@jphaven.com';
  const businessHours =
    settings?.businessHoursText ?? '08:00 – 21:00 (Giờ Việt Nam)';
  const footerMessage =
    settings?.footerMessageVi ?? 'Dịch vụ tư vấn do người Hàn Quốc vận hành';
  const zaloUrl = settings?.zaloUrl ?? '#';
  const facebookUrl = settings?.facebookUrl ?? '#';
  const siteName = settings?.siteNameVi ?? 'JP Haven';
  const footerCertLabel =
    settings?.footerCertLabelVi ?? 'Logo chứng nhận (placeholder)';

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="/jangji">Nghĩa trang</a>
              </li>
              <li>
                <a href="/company">Giới thiệu công ty</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Liên hệ</h3>
            <p className="text-sm">Hotline: {hotlineNumber}</p>
            <p className="text-sm">Email: {supportEmail}</p>
            <p className="text-sm">{businessHours}</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Mạng xã hội</h3>
            <ul className="space-y-2">
              <li>
                <a href={zaloUrl || '#'}>Zalo</a>
              </li>
              <li>
                <a href={facebookUrl || '#'}>Facebook</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>{footerMessage}</p>
          <p className="mt-1 text-xs text-gray-500">{siteName}</p>
        </div>
        <div className="mt-8 text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded">
            {footerCertLabel}
          </div>
        </div>
      </div>
    </footer>
  );
}
