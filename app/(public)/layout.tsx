
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JP Haven Memorial',
  description: 'JP Haven Memorial web app MVP built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="text-slate-900">
        {children}
      </body>
    </html>
  );
}
