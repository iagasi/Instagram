import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookieName } from '../constants';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 // return NextResponse.redirect(new URL('/home', request.url))

 if(
  request.cookies.get(cookieName)==="undefined"||
  !request.cookies.get(cookieName)
 ){
    console.log("hete");
    
    return NextResponse.redirect(new URL('/auth', request.url))
 }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/',"/profile/:path*", "/messenger/:path*","/explore/:path*"],
}