import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/supabase/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = +((searchParams.get('page') as string) ?? '1')
  const perPage = +((searchParams.get('perPage') as string) ?? '50')

  const supabaseAdmin = await createAdminClient()
  const { data: list, error } = await supabaseAdmin.listUsers({ page, perPage })
  if (error) {
    return NextResponse.json({ data: null, error }, { status: 400 })
  }

  return NextResponse.json({ data: list, error: null })
}