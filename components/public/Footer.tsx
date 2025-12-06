// components/public/Footer.tsx
'use client';

import type { SiteSettings } from '@/src/lib/siteSettings';
import { trackEvent } from '@/src/lib/ga';

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
        {/* 상단 3컬럼 */}
        <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3">
          {/* Menu */}
          <div>
            <h3 className="mb-4 font-bold">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="/jangji">Nghĩa trang</a>
              </li>
              <li>
                <a href="/company">Giới thiệu công ty</a>
              </li>
              {/* 🔹 약관 / 개인정보 링크 추가 */}
              <li>
                <a href="/terms">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="/privacy">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="mb-4 font-bold">Liên hệ</h3>
            <p className="text-sm">
              Hotline:{' '}
              {hotlineNumber ? (
                <a
                  href={`tel:${hotlineNumber.replace(/\s+/g, '')}`}
                  onClick={() => {
                    trackEvent('전화걸기_클릭', { 위치: 'footer_hotline' });
                  }}
                >
                  {hotlineNumber}
                </a>
              ) : (
                hotlineNumber
              )}
            </p>
            <p className="text-sm">Email: {supportEmail}</p>
            <p className="text-sm">{businessHours}</p>
          </div>

          {/* SNS */}
          <div>
            <h3 className="mb-4 font-bold">Mạng xã hội</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={zaloUrl || '#'}
                  onClick={() => {
                    trackEvent('Zalo상담_클릭', { 위치: 'footer_zalo' });
                  }}
                >
                  Zalo
                </a>
              </li>
              <li>
                <a href={facebookUrl || '#'}>Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 서비스 성격 안내 + 산통부 문구 */}
        <div className="pt-6 mb-6 border-t border-gray-300">
          <div className="space-y-2 text-xs text-center text-gray-600">
            <p>
              Website cung cấp thông tin và kết nối dịch vụ nghĩa trang, không
              trực tiếp bán sản phẩm/dịch vụ tang lễ.
            </p>
            <p>
              Website đang trong quá trình thông báo/đăng ký với Bộ Công
              Thương.
            </p>
          </div>
        </div>

        {/* 하단 메시지 / 사이트명 */}
        <div className="text-sm text-center text-gray-600">
          <p>{footerMessage}</p>
          <p className="mt-1 text-xs text-gray-500">{siteName}</p>
        </div>

        {/* 인증 로고 placeholder */}
        <div className="mt-8 text-center">
          <div className="inline-block px-4 py-2 rounded bg-blue-100 text-blue-700">
            {footerCertLabel}
          </div>
        </div>
      </div>
    </footer>
  );
}
