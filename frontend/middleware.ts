import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 // return NextResponse.redirect(new URL('/home', request.url))
 console.log(request.nextUrl.pathname)

 if(request.cookies.get("Instagram_Cookie")==="undefined"
 ){
    console.log("hete");
    
    return NextResponse.redirect(new URL('/auth', request.url))
 }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/',"/profile/:path*", "/messenger/:path*","/explore/:path*"],
}