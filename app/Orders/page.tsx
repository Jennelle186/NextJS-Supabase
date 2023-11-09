import OrderComponent from "./OrderComponent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserWaterStationView, WaterStationType, WaterType } from "../lib/definitions";

interface OrdersProps {
    searchParams: {
      id: string;
    };
  }

  export default async function Orders({ searchParams }: OrdersProps) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    
      const {data, error} = await supabase  
      .from('profiles')
      .select(`
        id,
        water_type(
          *
        ),
        water_refilling_station(
         *
        )
      `)
      .eq('id', searchParams.id)

      // const {data, error} = await supabase.from('water_station_view').select('*').eq('user_id', searchParams.id);

      const {data : view} = await supabase.from('water_station_view').select('*').eq('user_id', searchParams.id);
      console.log(JSON.stringify(view, null, 2), "view")
      // console.log(error?.message,'error')
  
      const dataView = data as unknown as UserWaterStationView[];
      console.log(JSON.stringify(data, null, 2),"dataView from the orders")
      
      if (data) {
        const water_types = data[0]?.water_type as WaterType[] | null;
        const water_refilling_station = data[0]?.water_refilling_station as unknown as WaterStationType | null;

        // Include the desired JSX rendering based on the data
        return (
          <OrderComponent
            error={error}
            waterTypes={water_types}
            refillingStation={water_refilling_station}
          />
        );
      }
      
  }