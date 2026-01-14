import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { Database } from '../types/database.types';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase is not configured. Please check your app.json or .env.local file.');
  console.error('URL:', supabaseUrl);
  console.error('Key:', supabaseAnonKey ? 'Present' : 'Missing');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
