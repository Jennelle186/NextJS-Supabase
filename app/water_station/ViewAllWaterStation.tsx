'use client'

import Link from "next/link";
import { WaterStationType, WaterType } from "../lib/definitions";

interface ViewAllWaterStationProps {
  water_refilling_station: WaterStationType[]; // Define the type for water_refilling_station
  water_types: WaterType[]; // Define the type for water_types
}


export default async function ViewAllWaterStation({ water_refilling_station, water_types }: ViewAllWaterStationProps) {
  // Handle the case where water_refilling_station is null
   if (water_refilling_station === null) {
    // You can initialize it as an empty array or handle it as appropriate for your application
    water_refilling_station = [];
  }

  // Create a data structure to group water types by user_id
  const groupedWaterTypes: Record<string, WaterType[]> = {};

  water_types.forEach((waterType) => {
    if (!groupedWaterTypes[waterType.id]) {
      groupedWaterTypes[waterType.id] = [];
    }
    groupedWaterTypes[waterType.id].push(waterType);
  });

  return (
<div>
<Link href="/">Home</Link>
      <h1>List of water refilling stations</h1>
      {water_refilling_station?.map((station: WaterStationType) => (
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
          <br/>
          <Link
                  href={{
                    pathname: `/Orders`,
                    query: {id: station.id},
                    // query: { station: JSON.stringify(station) },
                  }}
                >
                Order
            </Link>
        </div>
      ))}
</div>
  );
}
