import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/supabase/server'

export async function DELETE(request: NextRequest) {
    const supabaseAdmin = await createAdminClient();
    const { userId } = await request.json();
  
    const { error } = await supabaseAdmin.deleteUser(userId);
  
    if (error) {
      return NextResponse.json({ data: null, error }, { status: 400 });
    }
  
    return NextResponse.json({ data: 'User deleted successfully', error: null });
  }