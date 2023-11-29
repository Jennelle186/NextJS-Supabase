'use client'

import Link from "next/link";
import { UserWaterStationView, WaterStationType, WaterType } from "../lib/definitions";
import { useState } from "react";
import Submitbtn from "@/components/Reusables/SubmitButton";
type UserWaterStationViewProps = {
  data: UserWaterStationView[]; // Assuming data is an array of WaterStationType objects
};

type GroupedData = {
  [userStationKey: string]: UserWaterStationView[];
};

export default function ViewAllWaterStation({ data }: UserWaterStationViewProps) {
  // console.log(data, 'data from the ViewAllWaterStation');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UserWaterStationView[]>([]);

  const groupedData: GroupedData = {};

  data.forEach(item => {
    const userStationKey = `${item.user_id}_${item.station_name}`;
    if (!groupedData[userStationKey]) {
      groupedData[userStationKey] = [];
    }
    groupedData[userStationKey].push(item);
  });

  return (
    <>
      {Object.values(groupedData).map((stations, index) => {
        const firstStation = stations[0]; // Get the first station details

        return (
          <div key={index}>
            <div>
            <h2><b>Water Station Name: {firstStation.station_name}</b></h2>
            <p>Address: {firstStation.address}</p>
            <p>Barangay: {firstStation.barangay}</p>
            <p>Landmark: {firstStation.landmark}</p>
            <p>Delivery Mode: {firstStation.delivery_mode}</p>
            <p>Contact: {firstStation.contact_no}</p>
            {firstStation.tel_no && (
              <p>Tel No: {firstStation.tel_no}</p>
            )}
            <p>Water Available:</p>
            <ul>
              {stations.map((station, stationIndex) => (
                <li key={stationIndex}>
                  <p>{station.water_type} - Php {station.water_type_price}</p>
                </li>
              ))}
            </ul>
            <Link
              href={{
                pathname: `/Orders`,
                query: { id: firstStation.user_id },
              }}
              //className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Submitbtn/>
            </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}


{/**

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by station name, barangay, address, or water type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* Filtered data }

      
      {filteredData.map((station: UserWaterStationView, index) => (
        <div key={index}>
          <h2><b>Water Station Name: {station.station_name}</b></h2>
          <p>Address: {station.address}</p>
          <p>Barangay: {station.barangay}</p>
          {/* Add the rest of your rendering logic for each station here }
        </div>
      ))}




*/}
