import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id') as string
    const supabase = await createClient();

    const { data : user_data, error : user_error } = await supabase.auth.getUser()
    if (user_error || !user_data?.user) {
        redirect('/auth/signin')
    }
    const body = await request.json()
    const { is_archived } = body.data
    console.log(is_archived)
    const { data, error } = await supabase
      .from('invoices')
      .update({ is_archived, })
      .eq('id', id)
      .eq('user_id', user_data.user.id);

    if (error) {
      return NextResponse.json({ data: null, error }, { status: 400 });
    }
  
    return NextResponse.json({ data: 'Invoice Archived', error: null });
  }



