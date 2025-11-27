// src/lib/supabase/client.ts
'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

console.log('DEBUG SUPABASE_URL:', supabaseUrl);
console.log('DEBUG SUPABASE_KEY:', supabaseKey && supabaseKey.slice(0, 15));

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    `Supabase env missing: url=${String(supabaseUrl)}, key=${String(
      supabaseKey && supabaseKey.slice(0, 5)
    )}`
  );
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
