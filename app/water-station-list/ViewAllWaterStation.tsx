'use client'

import { GroupedData, UserWaterStationViewProps} from "../lib/definitions";
import { useState } from "react";
import MyInput from "@/components/Reusables/MyInput";
import FilteredStation from "./filteredStationList";


export default function ViewAllWaterStation({ data }: UserWaterStationViewProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const groupedData: GroupedData = {};

  data.forEach(item => {
    const userStationKey = `${item.user_id}_${item.station_name}`;
    if (!groupedData[userStationKey]) {
      groupedData[userStationKey] = [];
    }
    groupedData[userStationKey].push(item);
  });

    // Filter stations based on search input
    const filteredStations = Object.values(groupedData).filter((stations) =>
    stations.some(
      (station) =>
        (!searchInput ||
          station.station_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.address.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.barangay.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.landmark.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.delivery_mode.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.water_type.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.water_type_price.toString().includes(searchInput)
        )
    )
  );

  return (
    <>
    <br/>
     <MyInput
        id="searchInput"
        label="Search Input" 
        name="name"
        value={searchInput}
        placeholder="Search by water station name, type of water, and address"
        onChange={(e) => setSearchInput(e.target.value)}
        type="text" 
        errors={"Enter a valid search input"}
      /> 
    {/* {Object.values(groupedData).map((stations, index) -- before */}

    {filteredStations.map((stations, index) => (
        <FilteredStation key={index} filteredStation={stations} />
      ))}
    </>
  );
}

