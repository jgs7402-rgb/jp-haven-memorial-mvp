// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'JP Haven Memorial',
  description:
    'JP Haven Memorial là nền tảng tang lễ số, giúp gia đình tìm kiếm thông tin nghĩa trang và dịch vụ an táng một cách minh bạch và nhân văn.',
};

// 🔹 GA4 측정 ID를 환경변수에서 읽어옴 (반드시 함수 위에 선언)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="google-site-verification" content="google709ab9074511a275.html" />
        {GA_MEASUREMENT_ID && (
          <>
            {/* GA4 gtag.js 로더 */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            {/* GA4 초기 설정 */}
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
