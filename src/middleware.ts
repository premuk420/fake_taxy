import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protect dashboard routes
  if ((pathname.startsWith('/accountant') || pathname.startsWith('/client')) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from login/register
  if ((pathname === '/login' || pathname === '/register') && user) {
    // Check role from user metadata to redirect correctly
    const role = user.user_metadata?.role
    if (role === 'ACCOUNTANT') return NextResponse.redirect(new URL('/accountant', request.url))
    return NextResponse.redirect(new URL('/client', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/accountant/:path*', '/client/:path*', '/login', '/register'],
}
