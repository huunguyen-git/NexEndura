import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { validateEnv } from '@/lib/validate-env'

export async function middleware(request: NextRequest) {
  validateEnv()
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Protect /admin, /account, and /checkout routes
  if (!user && (url.pathname.startsWith('/admin') || url.pathname.startsWith('/account') || url.pathname.startsWith('/checkout'))) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('next', url.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // RBAC for /admin: Require admin role
  // SECURITY: Only use app_metadata — it can only be set by the service role key.
  // user_metadata is writable by authenticated users and must NOT be trusted for
  // privilege checks (privilege escalation vulnerability).
  if (user && url.pathname.startsWith('/admin')) {
    const role = user.app_metadata?.role
    if (role !== 'admin') {
      const redirectUrl = new URL('/account', request.url)
      redirectUrl.searchParams.set('error', 'admin_access_required')
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
