import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}

//Note that we really only need this to run on authenticated routes, 
//so we're using path matcher to ensure this code runs only for Home and Profile pages.
// export const config = {
//   matcher: ['/', '/waterTypes'],
// };