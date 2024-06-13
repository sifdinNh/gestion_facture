import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = +((searchParams.get('page') as string) ?? '1')
    const perPage = +((searchParams.get('perPage') as string) ?? '50')
    const supabase = await createClient();
    const { data : user_data, error : user_error } = await supabase.auth.getUser()
    if (user_error || !user_data?.user) {
        redirect('/auth/signin')
    }
    try {
        const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user_data?.user.id);

        if (invoicesError) throw invoicesError;

        // Extract invoice IDs
        const invoiceIds = invoices.map(invoice => invoice.id);


        const { data: payments, error: paymentsError } = await supabase
            .from('payments')
            .select('*')
            .in('invoice_id', invoiceIds);

        if (paymentsError) throw paymentsError;
        const paymentsWithInvoices = payments.map(payment => ({
            ...payment,
            invoice: invoices.find(invoice => invoice.id === payment.invoice_id)
        }));
        console.log(paymentsWithInvoices)
        return NextResponse.json({ data: paymentsWithInvoices, error: null })
    } catch (error) {
        return NextResponse.json({ data: null, error }, { status: 400 })
    }

    
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const invoiceId = +((searchParams.get('invoiceId') as string) ?? null)
    if(invoiceId == null){
        return NextResponse.json({ data: null, error:"facature id required" }, { status: 400 })
    }
    const supabase = await createClient();
    const body = await request.json();
    const {
        no,
        penalty,
        ttc,
        penalty_ttc
    } = body.data
    const { data : user_data, error : user_error } = await supabase.auth.getUser()
    if (user_error || !user_data?.user) {
      redirect('/auth/signin')
    }
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({ 
        invoice_id : invoiceId,
        no : no,
        penalty : penalty,
        penalty_ttc : penalty_ttc,
        ttc : ttc,
      })
      .select('*')
      .single()

    if (error) {
        return NextResponse.json({ data: null, error }, { status: 400 })
    }
    
    const {data : invoice, error : invoice_error } = await supabase
    .from("invoices")
    .update({
        is_paid : true
    })
    .eq('id', invoiceId)

    if (invoice_error) {
        return NextResponse.json({ data: null, invoice_error }, { status: 400 })
    }


    return NextResponse.json({ data: "Payment is created", error: null });
  }