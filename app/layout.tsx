// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/src/lib/siteSettings';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();

  const title =
    s.seoDefaultTitleVi || s.siteNameVi || 'JP Haven Memorial';

  const description =
    s.seoDefaultDescriptionVi ||
    'JP Haven Memorial là nền tảng trung gian kết nối dịch vụ nghĩa trang và lưu tro cốt.';

  return {
    title: {
      default: title,
      template: `%s | ${s.siteNameVi || 'JP Haven Memorial'}`,
    },
    description,
    openGraph: {
      title: s.ogDefaultTitleVi || title,
      description: s.ogDefaultDescriptionVi || description,
      siteName: s.siteNameVi || 'JP Haven Memorial',
      images: s.ogDefaultImageUrl
        ? [
            {
              url: s.ogDefaultImageUrl,
              alt:
                s.ogDefaultImageAltVi ||
                'Hình ảnh đại diện của JP Haven Memorial',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: s.ogDefaultTitleVi || title,
      description: s.ogDefaultDescriptionVi || description,
      images: s.ogDefaultImageUrl ? [s.ogDefaultImageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="text-slate-900">{children}</body>
    </html>
  );
}
