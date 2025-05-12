import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validToken } from './utils/jwt'

// Lista de caminhos públicos (acesso sem login)
const publicPaths = ['/login', '/cadastrar', '/favicon.ico', '/imgporta.jpg', '/_next', '/api']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    if (pathname === '/' && token && validToken(token)) {
        return NextResponse.redirect(new URL('/painel', request.url));
    }

    if (isPublic) {
        return NextResponse.next();
    }    

    if (!token || !validToken(token)) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }    
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'], 
}