import { User , AuthError, Pagination } from '@supabase/supabase-js'
import { Payment, Invoice } from '@/types/database'

export type UserAPI =
  | { data: User | null; error: null }
  | { data: null; error: Error }

export type UsersAPI =
  | { data: { users: User[]; aud: string } & Pagination; error: null }
  | { data: { users: [] }; error: AuthError }


export type PaymentAPI =
  | { data: Payment; error: null }
  | { data: null; error: Error }

  export type PaymentsAPI =
  | { data: Payment[]; error: null }
  | { data: null; error: Error }


export type InvoiceAPI =
  | { data: Invoice; error: null }
  | { data: null; error: Error }

  export type InvoicesAPI =
  | { data: Invoice[]; error: null }
  | { data: null; error: Error }