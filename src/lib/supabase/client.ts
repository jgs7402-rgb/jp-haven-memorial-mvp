// src/lib/supabase/client.ts
'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('[WEB Supabase][DEBUG] NEXT_PUBLIC_SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('[WEB Supabase][DEBUG] NEXT_PUBLIC_SUPABASE_ANON_KEY length =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
  throw new Error(
    '[WEB Supabase] NEXT_PUBLIC_SUPABASE_URL 값이 잘못되었습니다. 환경변수 설정을 다시 확인해 주세요.'
  );
}

if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string') {
  throw new Error(
    '[WEB Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY 값이 없습니다. 환경변수 설정을 다시 확인해 주세요.'
  );
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
