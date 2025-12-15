// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('[WEB Supabase][SERVER][DEBUG] NEXT_PUBLIC_SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('[WEB Supabase][SERVER][DEBUG] SUPABASE_SERVICE_ROLE_KEY length =', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);

if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
  throw new Error(
    '[WEB Supabase][SERVER] NEXT_PUBLIC_SUPABASE_URL 값이 잘못되었습니다. 환경변수 설정을 다시 확인해 주세요.'
  );
}

if (!serviceRoleKey || typeof serviceRoleKey !== 'string') {
  throw new Error(
    '[WEB Supabase][SERVER] SUPABASE_SERVICE_ROLE_KEY 값이 없습니다. 환경변수 설정을 다시 확인해 주세요.'
  );
}

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
