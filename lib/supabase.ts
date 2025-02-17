import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://xgtqzbuclnoamrestvbr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndHF6YnVjbG5vYW1yZXN0dmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MTM3MjksImV4cCI6MjA1NTI4OTcyOX0.-mRdVuP5KO4eNGcbWMRlu1C1MQPIX6P3giaWrWTW58o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 