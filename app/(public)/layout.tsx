// app/(public)/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getSiteSettings, type SiteSettings } from '@/src/lib/siteSettings';
import Footer from '@/components/public/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'JP Haven',
  description: 'JP Haven Memorial web app MVP built with Next.js 14',
};

type PublicLayoutProps = {
  children: ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const settings: SiteSettings = await getSiteSettings();

  return (
    <>
      {children}
      <Footer settings={settings} />
    </>
  );
}
