
import { User as AuthUser } from '@supabase/supabase-js';
import { Tables } from '@/types/supabase'

export type User = AuthUser & {
  first_name?: string
  last_name?: string
}

export type Invoice = Tables<'invoices'> 
export type Payment = Tables<'payments'> & { invoice? : Invoice}