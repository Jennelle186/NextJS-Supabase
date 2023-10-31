import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface WaterStation {
    id: number;
    station_name: string;
    address: string;
    barangay: string;
    remarks: string | null;
    contact_no: number | null;
    tel_no: number | null;
    delivery_mode: string;
    landmark: string | null;
  }

  interface EditWaterStationInformationProps {
    station: WaterStation;
    params: {id: number};
}

export default async function EditWaterStationInformation (props: EditWaterStationInformationProps) {
    console.log(props.params.id, "params")
    const supabase = createServerComponentClient({ cookies });
    const {data: {session}} = await supabase.auth.getSession();

    //if not in session, direct user to the login page
    if(!session){
      redirect('/login')
    }

    //fetching the water station
    const {data: station} = await supabase.from("water_refilling_station").select().eq('id', props.params.id)
   
    return (
      <div>
        {station?.map((station) => (
          <ul key={station.id}>
            <li>{station.station_name}</li>
          </ul>
        ))}
      </div>
    )
  
}