import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const sign_in_url = "/auth/sign-in";
  console.log(url)
  if (url.pathname === sign_in_url) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(sign_in_url, request.url))
}
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)','/auth/:path*',]
};