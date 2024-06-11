
import { User as AuthUser } from '@supabase/supabase-js';

export type User = AuthUser & {
  first_name?: string
  last_name?: string
}