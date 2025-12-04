
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JP Haven',
  description: 'JP Haven Memorial web app MVP built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
