// app/(admin)/admin/inquiries/actions.ts

'use server';

import { updateInquiryStatus, type InquiryStatus } from '@/src/lib/inquiries';
import { revalidatePath } from 'next/cache';

export async function updateInquiryStatusAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const status = String(formData.get('status')) as InquiryStatus;

  if (!id || !status) {
    console.error('[updateInquiryStatusAction] missing id or status');
    return;
  }

  if (!['new', 'in_progress', 'done'].includes(status)) {
    console.error('[updateInquiryStatusAction] invalid status:', status);
    return;
  }

  const result = await updateInquiryStatus(id, status);

  if (!result.ok) {
    console.error('[updateInquiryStatusAction] error =', result.error);
    return;
  }

  // 페이지를 다시 검증하여 최신 데이터를 표시
  revalidatePath('/admin/inquiries');
}

