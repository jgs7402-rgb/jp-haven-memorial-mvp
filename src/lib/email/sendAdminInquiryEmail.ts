// src/lib/email/sendAdminInquiryEmail.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type AdminInquiryEmailPayload = {
  name: string;
  phone: string;
  budget?: string | null;
  note?: string | null;
};

export async function sendAdminInquiryEmail(payload: AdminInquiryEmailPayload) {
  const { name, phone, budget, note } = payload;

  // TODO: from 주소는 Resend에서 인증한 도메인으로 변경 필요
  // 예: 'JP Haven <no-reply@yourdomain.com>' 또는 'no-reply@yourdomain.com'
  // 테스트용으로는 'delivered@resend.dev' 사용 가능
  const from = 'delivered@resend.dev'; // 테스트용 - 운영 시 실제 인증된 도메인으로 변경
  const to = ['jgs7402@gmail.com']; // 실제로 받는 어드민 메일

  const subject = `[JP Haven] 새로운 문의: ${name}`;
  const html = `
    <h2>JP Haven - 새로운 문의가 도착했습니다.</h2>
    <p><strong>이름:</strong> ${name}</p>
    <p><strong>전화번호:</strong> ${phone}</p>
    <p><strong>예산:</strong> ${budget ?? '-'}</p>
    <p><strong>메모:</strong></p>
    <p>${(note ?? '').replace(/\n/g, '<br />')}</p>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('[sendAdminInquiryEmail] Resend error =', error);
    throw error;
  }

  console.log('[sendAdminInquiryEmail] Resend response =', data);
  return data;
}
