// src/lib/email/sendInquiryEmail.ts
import nodemailer from 'nodemailer';
import type { InquiryInput } from '@/src/lib/inquiries';

type EmailResult = {
  ok: boolean;
  error: string | null;
};

export async function sendInquiryEmail(
  inquiry: InquiryInput,
): Promise<EmailResult> {
  // 환경 변수에서 이메일 설정 확인
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail =
    process.env.INQUIRY_NOTIFICATION_EMAIL || 'jgs7402@gmail.com';

  // 이메일 설정이 없으면 스킵 (DB 저장은 계속 진행)
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn(
      '[sendInquiryEmail] Email configuration not set, skipping send',
    );
    return { ok: false, error: 'Email not configured' };
  }

  // 이메일 본문 구성 (베트남어 형식)
  const lines = [
    `Họ và tên: ${inquiry.name}`,
    `Số điện thoại: ${inquiry.phone}`,
    `Email: ${inquiry.email || '-'}`,
    `Khu vực mong muốn: ${inquiry.region || '-'}`,
    `Ngân sách dự kiến: ${inquiry.budget || '-'}`,
    `Nguồn: ${inquiry.source || 'unknown'}`,
    '',
    'Ghi chú / Nội dung bổ sung:',
    inquiry.note || inquiry.message || '(không có)',
    '',
    `Thời gian tiếp nhận: ${new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })}`,
  ];

  const textBody = lines.join('\n');

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: smtpPort === '465', // 465는 SSL, 587은 TLS
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"JP Haven" <${smtpUser}>`,
    to: notificationEmail,
    subject: `[JP Haven] 문의가 접수되었습니다 - ${inquiry.name}`,
    text: textBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('[sendInquiryEmail] Email sent successfully to', notificationEmail);
    return { ok: true, error: null };
  } catch (err: any) {
    console.error('[sendInquiryEmail] error =', err);
    // 이메일 전송 실패해도 DB 저장은 계속 진행되도록 에러만 반환
    return {
      ok: false,
      error: err?.message ?? 'Failed to send email',
    };
  }
}
