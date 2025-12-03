// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { createInquiry } from '@/src/lib/inquiries';
import { sendInquiryEmail } from '@/src/lib/email/sendInquiryEmail';

export async function POST(req: Request) {
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
        { ok: false, error: '이름, 전화번호, 문의 내용은 필수 입력 항목입니다.' },
        { status: 400 },
      );
    }

    // DB에 저장
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
        { ok: false, error: result.error },
        { status: 500 },
      );
    }

    // 이메일 전송 (실패해도 DB 저장은 성공으로 처리)
    const emailResult = await sendInquiryEmail({
      name,
      phone,
      email: email || null,
      region: null,
      budget: null,
      note: null,
      message: message || null,
      source: source || 'contact-modal',
    });

    if (!emailResult.ok) {
      console.warn(
        '[api/contact] Email send failed, but inquiry saved:',
        emailResult.error,
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất có thể.',
    });
  } catch (error: any) {
    console.error('[api/contact] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}


