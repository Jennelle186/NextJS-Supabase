import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OrderList from "./OrderList";

export default async function ViewOrdersByWaterStation({}) {
    const cookieStore = cookies()
    const supabase : any = createServerComponentClient({ cookies: () => cookieStore })
    const {data: {session }} = await supabase.auth.getSession();

      const {data : orders, error} = await supabase
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
      
        
    return ( 
        <div>
          {/* error message here */}
          {error && error.message} 
          {/* Component for the orderList */}
         <OrderList orders={orders} />
        </div>
     );
}


