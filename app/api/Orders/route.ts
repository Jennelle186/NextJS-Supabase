// NOT BEING USED - WILL BE DELETED LATER

import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const {data: {session }} = await supabase.auth.getSession();

  const {data, error } = await supabase
  .from('orders')
  .select(
    `
      order_id,
      created_at,
      customers(firstName, lastName, address),
      order_items(
        quantity,

        water_type(name)
      )
    `
  )
  .eq('water_station_user_id', session?.user.id)


  return NextResponse.json(data)

}
