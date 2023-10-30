import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";

interface WaterType {
  id: string;
  name: string;
  price: number;
  user_id: string;
}

interface WaterStation {
  id: string;
  station_name: string;
  user_id: string;
  address: string;
  barangay: string;
  delivery_mode: string;
  contact_no: number;
  tel_no: number;
  remarks: string;
}

export default async function ViewAllWaterStation() {
  const supabase = createServerComponentClient({ cookies });

  //fetch ll of the water refilling station
  let { data: water_refilling_station } = await supabase
  .from('water_refilling_station')
  .select('*')

  // Fetch all water types
  const { data: water_types, error } = await supabase.from('water_type').select('*');

  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  // Create a data structure to group water types by user_id
  const groupedWaterTypes: Record<string, WaterType[]> = {};

  water_types.forEach((waterType) => {
    if (!groupedWaterTypes[waterType.user_id]) {
      groupedWaterTypes[waterType.user_id] = [];
    }
    groupedWaterTypes[waterType.user_id].push(waterType);
  });

  return (
<div>
<Link href="/">Home</Link>
      <h1>List of water refilling stations</h1>
      {water_refilling_station?.map((station: WaterStation) => (
        <div key={station.id}>
          <h2><b>Water Station Name: {station.station_name}</b></h2>
          <h3>The Water types available:</h3>
          <ul>
            {groupedWaterTypes[station.user_id]?.map((waterType) => (
              <li key={waterType.id}>
                Name: {waterType.name} - Php. {waterType.price} per liter
              </li>
            ))}
          </ul>
          <h3>Address: {station.address + " " + station.barangay}</h3>
          <h3>Available delivery mode: {station.delivery_mode}</h3>
          <h3>Contact Number: {station.contact_no}</h3>
          <h3>Telephone Number: {station.tel_no}</h3>
          {station.remarks ? <>Description: {station.remarks}</> : <></>}
        </div>
      ))}
</div>
  );
}
