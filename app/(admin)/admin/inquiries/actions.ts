// app/(admin)/admin/inquiries/actions.ts

'use server';

import { updateInquiryStatus, type InquiryStatus } from '@/src/lib/inquiries';
import { supabaseServer } from '@/src/lib/supabase/server';
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

export async function deleteInquiryAction(id: number) {
  if (!id || isNaN(id)) {
    console.error('[deleteInquiryAction] invalid id:', id);
    throw new Error('DELETE_INQUIRY_FAILED: Invalid ID');
  }

  const { error } = await supabaseServer
    .from('inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteInquiryAction] error =', error);
    throw new Error('DELETE_INQUIRY_FAILED');
  }

  console.log('[deleteInquiryAction] inquiry deleted, id =', id);

  // 페이지를 다시 검증하여 최신 데이터를 표시
  revalidatePath('/admin/inquiries');
}


