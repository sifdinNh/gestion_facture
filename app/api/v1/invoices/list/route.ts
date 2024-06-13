import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'



export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = +((searchParams.get('page') as string) ?? '1')
    const perPage = +((searchParams.get('perPage') as string) ?? '50')
    const isArchived = Boolean(((searchParams.get('isArchived') as string) ?? false))
    const isPaid = Boolean(((searchParams.get('isPaid') as string) ?? false))
    const supabase = await createClient();
    const { data : user_data, error : user_error } = await supabase.auth.getUser()
    if (user_error || !user_data?.user) {
        redirect('/auth/signin')
    }
    const { data: list, error } = await supabase.from("invoices").select("*").match({user_id: user_data?.user.id , is_archived: isArchived, is_paid : isPaid})


    if (error) {
      return NextResponse.json({ data: null, error }, { status: 400 })
    }
  
    return NextResponse.json({ data: list, error: null })
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const body = await request.json();
    const {
        no,
        total_ttc,
        date_emission,
        date_echeance,
        receiver_name,
        receiver_address,
        receiver_zip_code,
        receiver_country
    } = body.data
    const { data : user_data, error : user_error } = await supabase.auth.getUser()
    if (user_error || !user_data?.user) {
      redirect('/auth/signin')
    }
    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({ 
        user_id : user_data?.user.id,
        no : no,
        date_echeance : date_echeance,
        date_emission : date_emission,
        receiver_name : receiver_name,
        receiver_address : receiver_address,
        receiver_zip_code : receiver_zip_code,
        receiver_country : receiver_country,
        total_ttc : total_ttc
      })
      .select('*')
      .single()
    if (error) {
        return NextResponse.json({ data: null, error }, { status: 400 })
    }

    return NextResponse.json({ data: invoice, error: null });
  }