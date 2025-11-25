'use server';

import { supabaseServer } from '@/src/lib/supabase/server';

export type SubmitInquiryResult = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  formData: FormData
): Promise<SubmitInquiryResult> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const region = formData.get('region')?.toString().trim() ?? '';
  const budget = formData.get('budget')?.toString().trim() ?? '';
  const note = formData.get('note')?.toString().trim() ?? '';

  // 필수값 검증 (이름/전화)
  if (!name || !phone) {
    return {
      ok: false,
      message: '이름과 전화번호는 필수 입력 항목입니다.',
    };
  }

  // TODO: 나중에 Supabase inquiries 테이블 insert 로직 추가 예정
  // 예시 (지금은 주석 처리만):
  // const { error } = await supabaseServer.from('inquiries').insert({
  //   name,
  //   phone,
  //   region,
  //   budget,
  //   note,
  // });
  // if (error) {
  //   console.error('Insert error', error);
  //   return { ok: false, message: '저장 중 오류가 발생했습니다.' };
  // }

  console.log('inquiry mock:', { name, phone, region, budget, note });

  return {
    ok: true,
    message: 'Thông tin đã được ghi nhận (mock).',
  };
}
