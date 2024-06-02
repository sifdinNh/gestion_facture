import { createClient } from '@/supabase/server'

export async function getAuth() {
  const supabase = await createClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  return error || !session
    ? { session: null, user: null }
    : { session, user: session?.user }
}

export async function authenticate() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return error || !user
    ? { authenticated: false, user: null }
    : { authenticated: true, user }
}