'use server';

import { createInquiry } from '@/src/lib/inquiries';
import { sendInquiryEmail } from '@/src/lib/email/sendInquiryEmail';

export type SubmitInquiryResult = {
  success: boolean;
  emailSent: boolean;
  message: string;
  error: string | null;
};

export async function submitInquiry(
  formData: FormData,
): Promise<SubmitInquiryResult> {
  try {
    const name = formData.get('name')?.toString().trim() ?? '';
    const phone = formData.get('phone')?.toString().trim() ?? '';
    const region = formData.get('region')?.toString().trim() ?? '';
    const budget = formData.get('budget')?.toString().trim() ?? '';
    const note = formData.get('note')?.toString().trim() ?? '';

    if (!name || !phone) {
      return {
        success: false,
        emailSent: false,
        message: '이름과 전화번호는 필수 입력 항목입니다.',
        error: 'Validation failed: name and phone are required',
      };
    }

    // 1) DB 저장
    const result = await createInquiry({
      name,
      phone,
      email: null,
      region: region || null,
      budget: budget || null,
      note: note || null,
      message: null,
      source: 'inquiry-form',
    });

    if (!result.ok) {
      console.error('[submitInquiry] createInquiry failed:', result.error);
      return {
        success: false,
        emailSent: false,
        message: '저장 중 오류가 발생했습니다.',
        error: result.error,
      };
    }

    console.log(
      '[submitInquiry] Inquiry saved successfully to DB, id:',
      result.data.id,
    );

    // 2) 이메일 (실패해도 전체 성공)
    let emailSent = false;
    try {
      const emailResult = await sendInquiryEmail({
        name,
        phone,
        email: null,
        region: region || null,
        budget: budget || null,
        note: note || null,
        message: null,
        source: 'inquiry-form',
      });

      emailSent = !!emailResult?.ok;

      if (!emailResult?.ok) {
        console.warn(
          '[submitInquiry] Email send failed, but inquiry saved successfully:',
          emailResult?.error,
        );
      } else {
        console.log('[submitInquiry] Email sent successfully');
      }
    } catch (emailErr) {
      console.warn('[submitInquiry] Email send exception (ignored):', emailErr);
      emailSent = false;
    }

    // ✅ DB 성공이면 무조건 success = true
    return {
      success: true,
      emailSent,
      message:
        'Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất có thể.',
      error: null,
    };
  } catch (err) {
    console.error('[submitInquiry] unexpected error =', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    return {
      success: false,
      emailSent: false,
      message: '저장 중 오류가 발생했습니다.',
      error: errorMessage,
    };
  }
}
