import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('organizer_session')
    const { pathname } = request.nextUrl

    // Public paths that don't require auth
    const publicPaths = ['/login', '/register']
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path)) || pathname === '/'

    // If trying to access dashboard without session, redirect to login
    if (pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If logged in and trying to access login, redirect to dashboard
    if (pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
