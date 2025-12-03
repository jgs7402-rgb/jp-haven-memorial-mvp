// src/lib/email/sendInquiryEmail.ts
import type { InquiryInput } from '@/src/lib/inquiries';

export async function sendInquiryEmail(
  inquiry: InquiryInput,
): Promise<{ ok: boolean; error?: string }> {
  // 환경 변수에서 이메일 설정 확인
  const emailApiKey = process.env.EMAIL_API_KEY;
  const emailSmtpHost = process.env.EMAIL_SMTP_HOST;
  const emailSmtpPort = process.env.EMAIL_SMTP_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // 이메일 설정이 없으면 스킵 (DB 저장은 계속 진행)
  if (!emailApiKey && !emailSmtpHost) {
    console.warn(
      '[sendInquiryEmail] Email configuration not found, skipping email send',
    );
    return { ok: false, error: 'Email not configured' };
  }

  const recipientEmail = 'jgs7402@gmail.com';
  const subject = '[JP Haven] 새 문의가 접수되었습니다';

  // 이메일 본문 구성
  const body = `
새로운 문의가 접수되었습니다.

=== 문의 정보 ===
이름: ${inquiry.name}
전화번호: ${inquiry.phone}
이메일: ${inquiry.email || '(미입력)'}
희망 지역: ${inquiry.region || '(미입력)'}
예산: ${inquiry.budget || '(미입력)'}
문의 내용: ${inquiry.message || inquiry.note || '(미입력)'}
출처: ${inquiry.source || 'unknown'}

접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
`;

  try {
    // 외부 이메일 서비스 API 사용 (예: Resend, SendGrid 등)
    if (emailApiKey) {
      // Resend API 예시 (실제 사용 시 Resend SDK 설치 필요)
      // const response = await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${emailApiKey}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     from: 'noreply@jphaven.com',
      //     to: recipientEmail,
      //     subject,
      //     text: body,
      //   }),
      // });
      // if (!response.ok) throw new Error('Email API failed');

      // 임시: 환경 변수만 확인하고 실제 전송은 나중에 구현
      console.log('[sendInquiryEmail] Would send email:', {
        to: recipientEmail,
        subject,
        body,
      });
      return { ok: true };
    }

    // SMTP 사용 (Nodemailer 필요)
    if (emailSmtpHost && emailUser && emailPass) {
      // Nodemailer 사용 예시 (실제 사용 시 nodemailer 패키지 설치 필요)
      // const nodemailer = require('nodemailer');
      // const transporter = nodemailer.createTransport({
      //   host: emailSmtpHost,
      //   port: parseInt(emailSmtpPort || '587'),
      //   secure: emailSmtpPort === '465',
      //   auth: {
      //     user: emailUser,
      //     pass: emailPass,
      //   },
      // });
      // await transporter.sendMail({
      //   from: emailUser,
      //   to: recipientEmail,
      //   subject,
      //   text: body,
      // });

      // 임시: 환경 변수만 확인하고 실제 전송은 나중에 구현
      console.log('[sendInquiryEmail] Would send email via SMTP:', {
        to: recipientEmail,
        subject,
        body,
      });
      return { ok: true };
    }

    return { ok: false, error: 'Email configuration incomplete' };
  } catch (err) {
    console.error('[sendInquiryEmail] error =', err);
    // 이메일 전송 실패해도 DB 저장은 계속 진행되도록 에러만 반환
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}


