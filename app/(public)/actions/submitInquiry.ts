// app/(public)/actions/submitInquiry.ts
'use server';

import { revalidatePath } from 'next/cache';
import { supabaseServer } from '@/src/lib/supabase/server';
import { sendAdminInquiryEmail } from '@/src/lib/email/sendAdminInquiryEmail';

// InquiryFormInput 타입 정의 (폼 필드에 맞춤)
type InquiryFormInput = {
  name: string;
  phone: string;
  region?: string | null;
  budget?: string | null;
  note?: string | null;
};

export async function submitInquiry(formData: InquiryFormInput) {
  const supabase = supabaseServer;

  try {
    // 1) DB INSERT
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: formData.name,
        phone: formData.phone,
        email: null,
        region: formData.region || null,
        budget: formData.budget || null,
        note: formData.note || null,
        message: null,
        source: 'inquiry-form',
      })
      .select()
      .single();

    if (error) {
      console.error('[submitInquiry] insert error =', error);
      throw new Error('INQUIRY_INSERT_FAILED');
    }

    console.log('[submitInquiry] DB insert success, id =', data.id);

    // 2) 어드민 페이지 캐시 무효화
    revalidatePath('/admin/inquiries');

    // 3) 어드민 이메일 전송 (Resend)
    try {
      await sendAdminInquiryEmail({
        name: data.name,
        phone: data.phone,
        budget: data.budget,
        note: data.note,
      });
      console.log('[submitInquiry] Admin email sent via Resend');
    } catch (emailError) {
      // 이메일은 실패해도 문의 접수는 성공이니까 throw 하지 않음
      console.error(
        '[submitInquiry] Email send failed, but inquiry saved successfully',
        emailError,
      );
    }

    // 4) 최종 성공 응답 (프론트는 이걸로만 성공/실패 판단)
    return {
      success: true as const,
    };
  } catch (err) {
    console.error('[submitInquiry] unexpected error =', err);
    return {
      success: false as const,
    };
  }
}
