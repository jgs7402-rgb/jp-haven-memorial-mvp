// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://mgqnadogbqjmemzneprt.supabase.co'; 
const serviceRoleKey = 'sb_secret_EA1KZomeB2imR4-4cIhjPQ_W7pBdNID';    // service_role key

console.log('[supabaseServer] url:', supabaseUrl);
console.log('[supabaseServer] service role key exists:', !!serviceRoleKey);

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
