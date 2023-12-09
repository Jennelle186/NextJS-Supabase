import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OrderList from "./OrderList";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import TabsDemo from "./OrderTab";

import * as Tabs from '@radix-ui/react-tabs';
import OrderTab from "./OrderTab";

export default async function ViewOrdersByWaterStation({}) {
    const cookieStore = cookies()
    const supabase : any = createServerActionClient({ cookies: () => cookieStore })
    const {data: {session }} = await supabase.auth.getSession();

      const {data : receivedOrder} = await supabase
        .from('orders')
        .select(
          `order_id, created_at, remarks, delivery_mode, total, order_status,
            customers(firstName, lastName, address, contact_no, email),
            order_items(
              quantity,
              water_type(name)
            )
          `
        )
        .eq('water_station_user_id', session?.user.id)
        .order('created_at',{ascending: false})
        .eq('order_status', 'Received Order')

        const {data: deliveredOrders} = await supabase  
          .from('orders')
          .select(
            `order_id, created_at, remarks, delivery_mode, total, order_status,
              customers(firstName, lastName, address, contact_no, email),
              order_items(
                quantity,
                water_type(name)
              )
            `
          )
          .eq('water_station_user_id', session?.user.id)
          .order('created_at',{ascending: false})
          .eq('order_status', 'Delivered')

        
        const {data: cancelledOrders} = await supabase  
          .from('orders')
          .select(
            `order_id, created_at, remarks, delivery_mode, total, order_status,
              customers(firstName, lastName, address, contact_no, email),
              order_items(
                quantity,
                water_type(name)
              )
            `
          )
          .eq('water_station_user_id', session?.user.id)
          .order('created_at',{ascending: false})
          .eq('order_status', 'Cancelled')

      
    return ( 
        <div>
          {/* <DataTable columns={columns} data={orders}/> */}
          <OrderTab orders={receivedOrder || []} deliveredOrders ={deliveredOrders || []} cancelledOrders={cancelledOrders}/>
        </div>
     );
}


