import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { WaterStationType } from "../lib/definitions";
import WaterStationInfo from "./waterStationInfo";


export default async function WaterStationPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login'); // Add return here
  }

  const response = await supabase.from("water_refilling_station").select().eq('user_id', user?.id);
  
  if (response.data) {
    const water_station: WaterStationType[] = response.data;
    
    return (
      <div>
        {water_station.length === 0 ? (
          <>
           <p>No water station profile found</p>
           <Link href="/water_station/new">
            Add a water station
           </Link>
          </>
        ) : (

          <WaterStationInfo data={water_station}/>
          // water_station.map((station) => (
          //   <ul key={station.id}>
          //     <li>ID: {station.id}</li>
          //     <li>Name: {station.station_name}</li>
          //     <li>Address: {station.address}</li>
          //     <li>Barangay: {station.barangay}</li>
          //     <li>Remarks: {station?.remarks}</li>
          //     <li>Contact No: {station?.contact_no}</li>
          //     <li>Tel No: {station?.tel_no}</li>
          //     <li>Delivery mode: {station.delivery_mode}</li>
          //     <li>Landmark: {station?.landmark}</li>
          //     <Link
          //         href={{
          //           pathname: `/water_station/edit/${station.id}`,
          //           query: {stationId: station.id},
          //           // query: { station: JSON.stringify(station) },
          //         }}
          //       >
          //         Edit  
          //       </Link>
          //   </ul>

          // ))
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Water Station Profile</h1>
        <Link href="/water_station/new">Edit your profile</Link>
        <p>No water station profile found</p>
      </div>
    );
  }
}
