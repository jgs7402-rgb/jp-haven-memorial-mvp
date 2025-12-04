'use server';

import { cookies } from 'next/headers';

export type AdminLoginResult = {
  ok: boolean;
  error?: string | null;
};

export async function adminLoginAction(
  formData: FormData,
): Promise<AdminLoginResult> {
  const id = formData.get('id')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString().trim() ?? '';

  // 환경 변수에서 관리자 인증 정보 확인
  const adminId = process.env.ADMIN_ID ?? 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'cho342020';

  const isValid = id === adminId && password === adminPassword;

  if (!isValid) {
    return {
      ok: false,
      error: '아이디 또는 비밀번호가 올바르지 않습니다.',
    };
  }

  // ✅ 로그인 성공: admin_session 쿠키 설정
  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  });

  // 클라이언트에서 리다이렉트 처리
  return {
    ok: true,
    error: null,
  };
}

