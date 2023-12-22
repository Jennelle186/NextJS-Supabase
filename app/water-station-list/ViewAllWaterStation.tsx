'use client'

import { GroupedData, UserWaterStationViewProps} from "../lib/definitions";
import { useState } from "react";
import FilteredStation from "./filteredStationList";
import { Input } from "@/components/ui/input";


export default function ViewAllWaterStation({ data }: UserWaterStationViewProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const groupedData: GroupedData = {};

  data?.forEach(item => {
    // Check if the water_type property exists in the item
    if (item.water_type) {
      const userStationKey = `${item.user_id}_${item.station_name}`;
      if (!groupedData[userStationKey]) {
        groupedData[userStationKey] = [];
      }
      groupedData[userStationKey].push(item);
    }
  });
  

    // Filter stations based on search input
    const filteredStations = Object.values(groupedData).filter((stations) =>
    stations.some(
      (station) =>
        (!searchInput ||
          station.station_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.barangay?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.landmark?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.delivery_mode?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.water_type?.toLowerCase().includes(searchInput.toLowerCase()) ||
          station.water_type_price?.toString().includes(searchInput)
        )
    )
  );
  return (
    <>
    <br/>
    <form className="group relative">
      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
      </svg>
      <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" 
         id="searchInput"
         name="name"
         value={searchInput}
         placeholder="Search by water station name, type of water, and address"
         onChange={(e) => setSearchInput(e.target.value)}
         type="text"
      />
    </form>

    
    {filteredStations.map((station,index) => (
      <div key={index} className="divide-y divide-slate-100">
        <ul className="divide-y divide-slate-100">
          <FilteredStation filteredStation={station} />
        </ul>
      </div>
    ))}
    </>
  );
}

