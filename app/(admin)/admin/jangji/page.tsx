import { redirect } from 'next/navigation';

export const runtime = 'nodejs';

export default function AdminJangjiRedirectPage() {
  redirect('/admin/cemeteries');
}
