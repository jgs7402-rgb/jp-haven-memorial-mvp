// src/lib/inquiries.ts

import { supabaseServer } from '@/src/lib/supabase/server';

// 문의 한 건(row)의 타입
export type InquiryRow = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  region: string | null;
  budget: string | null;
  note: string | null;
  message: string | null;
  source: string | null;
  status: string;
  memo: string | null;
  created_at: string;
  updated_at: string | null;
};

// 상태 타입 (Admin에서 import해서 사용)
export type InquiryStatus = 'new' | 'in_progress' | 'done';

export type CreateInquiryInput = {
  name: string;
  phone: string;
  email: string | null;
  region: string | null;
  budget: string | null;
  note: string | null;
  message: string | null;
  source: string | null;
};

// 🔥 기존 코드 호환을 위해 InquiryInput 이름도 같이 export
export type InquiryInput = CreateInquiryInput;

export type CreateInquiryResult = {
  ok: boolean;
  data: InquiryRow | null;
  error: string | null;
};

// 공개 사이트 폼에서 호출하는 insert 함수
export async function createInquiry(
  input: CreateInquiryInput,
): Promise<CreateInquiryResult> {
  const supabase = supabaseServer;

  console.log('[createInquiry] inserting into public.inquiries input =', input);

  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email,
      region: input.region,
      budget: input.budget,
      note: input.note,
      message: input.message,
      source: input.source,
      // status, memo, created_at, updated_at → DB 기본값 사용
    })
    .select('*')
    .single();

  console.log(
    '[createInquiry] insert response data =',
    data,
    'error =',
    error,
  );

  if (error || !data) {
    return {
      ok: false,
      data: null,
      error: error?.message ?? 'Insert failed: no data returned',
    };
  }

  return {
    ok: true,
    data: data as InquiryRow,
    error: null,
  };
}

// Admin 리스트에서 사용하는 전체 조회
export async function getInquiries(): Promise<InquiryRow[]> {
  const supabase = supabaseServer;

  console.log('[getInquiries] ===== Starting query =====');

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('[getInquiries] error =', error);
    return [];
  }

  const rows = (Array.isArray(data) ? data : []) as InquiryRow[];

  console.log('[getInquiries] row count =', rows.length);
  if (rows.length > 0) {
    console.log('[getInquiries] sample row =', rows[0]);
  }
  console.log('[getInquiries] ===== Query finished =====');

  return rows;
}

// 메모 업데이트 (API route에서 import)
export async function updateInquiryMemo(
  id: number,
  memo: string | null,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = supabaseServer;

  const { error } = await supabase
    .from('inquiries')
    .update({ memo })
    .eq('id', id);

  if (error) {
    console.error('[updateInquiryMemo] error =', error);
    return { ok: false, error: error.message };
  }

  return { ok: true, error: null };
}

// 상태 업데이트 (Admin에서 상태 변경용, actions.ts / API route에서 import)
export async function updateInquiryStatus(
  id: number,
  status: InquiryStatus,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = supabaseServer;

  console.log(
    '[updateInquiryStatus] updating status for inquiry id =',
    id,
    'to',
    status,
  );

  const { error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[updateInquiryStatus] error =', error);
    return { ok: false, error: error.message };
  }

  return { ok: true, error: null };
}
