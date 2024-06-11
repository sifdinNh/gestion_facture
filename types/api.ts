import { User as AuthUser, AuthError, Pagination } from '@supabase/supabase-js'
import { User } from '@/types/database'


export type UserAPI =
  | { data: User | null; error: null }
  | { data: null; error: Error }

export type UsersAPI =
  | { data: { users: User[]; aud: string } & Pagination; error: null }
  | { data: { users: [] }; error: AuthError }