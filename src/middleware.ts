import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create response and initialize supabase client
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Get session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Handle public routes
    const publicRoutes = ['/auth/login', '/auth/signup', '/auth/callback', '/']
    const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))

    // If user is not signed in and trying to access protected route
    if (!session && !isPublicRoute) {
      const redirectUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is signed in and trying to access auth routes
    if (session && (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/signup'))) {
      const redirectUrl = new URL('/dashboard', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Auth middleware error:', error)
    // On error, allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
