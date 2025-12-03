// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';


export const supabaseUrl = 'https://mgqnadogbqjmemzneprt.supabase.co'; 
const serviceRoleKey = 'sb_secret_EA1KZomeB2imR4-4cIhjPQ_W7pBdNID';    // service_role key

console.log('[supabaseServer] url:', supabaseUrl);
console.log('[supabaseServer] service role key exists:', !!serviceRoleKey);

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase env not configured');
}

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
