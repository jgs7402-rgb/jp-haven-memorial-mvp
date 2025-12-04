// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { createInquiry } from '@/src/lib/inquiries';
import { sendAdminInquiryEmail } from '@/src/lib/email/sendAdminInquiryEmail';

export async function POST(req: Request) {
  let emailSent = false;
  let error: string | null = null;

  try {
    const formData = await req.formData();

    const name = formData.get('name')?.toString().trim() ?? '';
    const phone = formData.get('phone')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';
    const source = formData.get('source')?.toString().trim() ?? 'contact-modal';

    // 필수값 검증
    if (!name || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          message: '이름, 전화번호, 문의 내용은 필수 입력 항목입니다.',
          error: 'VALIDATION_FAILED',
        },
        { status: 400 },
      );
    }

    // 1) DB에 저장
    const result = await createInquiry({
      name,
      phone,
      email: email || null,
      region: null,
      budget: null,
      note: null,
      message: message || null,
      source: source || 'contact-modal',
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          message: '저장 중 오류가 발생했습니다.',
          error: result.error,
        },
        { status: 500 },
      );
    }

    console.log('[api/contact] inquiry saved, id =', result.data?.id);

    // 2) Resend로 이메일 발송
    try {
      await sendAdminInquiryEmail({
        name: result.data!.name,
        phone: result.data!.phone,
        budget: null, // contact-modal에서는 budget이 없음
        note: result.data!.message || result.data!.note || null,
      });
      emailSent = true;
      console.log('[api/contact] admin email sent via Resend');
    } catch (emailError) {
      console.error('[api/contact] email send failed =', emailError);
      emailSent = false;
      error = 'EMAIL_SEND_FAILED';
      // 문의 저장은 성공했으므로 여기서 throw 하지 않는다.
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: 'Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất có thể.',
      error,
    });
  } catch (err: any) {
    console.error('[api/contact] unexpected error =', err);
    return NextResponse.json(
      {
        success: false,
        emailSent: false,
        message: 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.',
        error: 'UNEXPECTED_ERROR',
      },
      { status: 500 },
    );
  }
}



