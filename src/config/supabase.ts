// config/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Cấu hình auth
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // OAuth settings
    flowType: 'pkce', // Recommended for OAuth
  },
});