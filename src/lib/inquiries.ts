// src/lib/inquiries.ts

import { supabaseServer, supabaseUrl } from '@/src/lib/supabase/server';

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

export type CreateInquiryResult = {
  ok: boolean;
  data: InquiryRow | null;
  error: string | null;
};

export async function createInquiry(
  input: CreateInquiryInput,
): Promise<CreateInquiryResult> {
  const supabase = supabaseServer; // 👈 여기 괄호 없음

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

export async function debugSingleInquiry() {
  const supabase = supabaseServer;
  console.log('[debugSingleInquiry] ===== Starting debug query =====');
  console.log('[debugSingleInquiry] querying public.inquiries...');
  console.log('[debugSingleInquiry] supabase URL:', supabaseUrl);
  
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('id', { ascending: false })
    .limit(5);

  console.log('[debugSingleInquiry] data =', data);
  console.log('[debugSingleInquiry] error =', error);
  console.log('[debugSingleInquiry] data type =', typeof data);
  console.log('[debugSingleInquiry] is array =', Array.isArray(data));
  console.log('[debugSingleInquiry] data length =', data?.length ?? 0);
  if (error) {
    console.error('[debugSingleInquiry] error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }
  console.log('[debugSingleInquiry] ===== Debug query finished =====');
  return { data, error };
}

export async function getInquiries(): Promise<InquiryRow[]> {
  const supabase = supabaseServer;

  console.log('[getInquiries] ===== Starting query =====');
  console.log('[getInquiries] Using supabaseServer (service role key)');
  console.log('[getInquiries] Target: public.inquiries table');
  console.log('[getInquiries] supabase URL:', supabaseUrl);

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('[getInquiries] error =', error);
    console.log('[getInquiries] ===== Query finished (error) =====');
    return [];
  }

  console.log('[getInquiries] Query completed');
  console.log('[getInquiries] row count =', Array.isArray(data) ? data.length : 0);
  console.log('[getInquiries] sample row =', Array.isArray(data) ? data[0] : undefined);
  console.log('[getInquiries] Raw data array length:', Array.isArray(data) ? data.length : 0);
  console.log('[getInquiries] ===== Query finished =====');

  return (Array.isArray(data) ? data : []) as InquiryRow[];
}

export type InquiryStatus = 'new' | 'in_progress' | 'done';

export async function updateInquiryStatus(
  id: number,
  status: InquiryStatus,
): Promise<{ ok: true; data: InquiryRow } | { ok: false; error: string }> {
  const supabase = supabaseServer;

  console.log('[updateInquiryStatus] updating inquiry', id, 'to status', status);

  const { data, error } = await supabase
    .from('inquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) {
    console.error('[updateInquiryStatus] error =', error);
    return {
      ok: false,
      error: error?.message ?? 'Failed to update inquiry status',
    };
  }

  console.log('[updateInquiryStatus] success, updated row =', data);
  return { ok: true, data: data as InquiryRow };
}
