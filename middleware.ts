import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })
//   await supabase.auth.getSession()
//   return res
// }

// Note that we really only need this to run on authenticated routes, 
// so we're using path matcher to ensure this code runs only for Home and Profile pages.
// export const config = {
//   matcher: ['/', '/waterTypes'],
// };



export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/account', req.url))
  // }

  // if user is not signed in and the current path is not /login redirect the user to /
  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/water_station:path', '/waterTypes:path',],
}