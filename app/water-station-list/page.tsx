import { cookies } from "next/headers";
import ViewAllWaterStation from "./ViewAllWaterStation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserWaterStationView } from "../lib/definitions";

const WaterStationList = async () => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
    const {data : view, error: viewError} = await supabase.from('water_station_view').select('*');
    const dataView = view as UserWaterStationView[];
  


    return <ViewAllWaterStation data={dataView}/>
}
 
export default WaterStationList;