// app/(admin)/admin/inquiries/page.tsx

import { getInquiries } from '@/src/lib/inquiries';
import { AdminInquiriesClient } from './AdminInquiriesClient';

export default async function AdminInquiriesPage() {
  console.log('[AdminInquiriesPage] Fetching inquiries...');
  const inquiries = await getInquiries();
  console.log('[AdminInquiriesPage] Received inquiries:', inquiries.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">문의 관리</h1>
        <p className="mt-1 text-sm text-slate-600">
          문의 내역을 확인하고 상태를 변경하거나 메모를 추가할 수 있습니다.
        </p>
      </div>

      <AdminInquiriesClient inquiries={inquiries} />
    </div>
  );
}
