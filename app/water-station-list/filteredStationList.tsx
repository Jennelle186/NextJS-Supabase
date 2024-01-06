import Link from "next/link";
import SubmitButton from "@/components/Reusables/SubmitButton";
import { UserWaterStationView } from "../lib/definitions";
import { Button } from "@/components/ui/button";

type UserWaterStationViewProps = {
  filteredStation: UserWaterStationView[];
}

const FilteredStation: React.FC<UserWaterStationViewProps> = ({ filteredStation }) => {
  const firstStation = filteredStation[0];

  return (
    <>
      <ul key={firstStation.user_id} className="divide-y divide-slate-100">
        <article className="flex items-start space-x-6 p-6">
          <div className="min-w-0 relative flex-auto">
            <h2 className="font-semibold text-slate-900 truncate pr-20">{firstStation.station_name}</h2>
            <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
              <div className="absolute top-0 right-0 flex items-center space-x-1">
              <dd>
                <Link
                  href={{
                    pathname: `/Orders`,
                    query: { id: firstStation.user_id },
                  }}
                >
                  <Button>Order</Button>
                </Link>
              </dd>
                
              </div>
              <div>
                <dt className="sr-only">Barngay</dt>
                <dd className="px-1.5 ring-1 ring-slate-200 rounded">{firstStation.barangay}</dd>
              </div>
              <div className="ml-2">
                <dt className="sr-only">Contact Number</dt>
                <dd>{firstStation.contact_no} {firstStation.tel_no ? <>| {firstStation.tel_no}</>:<></>}</dd>
              </div>
              <div>
                <dt className="sr-only">Address</dt>
                <dd className="flex items-center">
                  <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  Address: {firstStation.address + ", " + firstStation.barangay + ", Landmark:" + firstStation.landmark}
                </dd>
              </div>
              <div className="flex-none w-full mt-2 font-normal">
                <dt className="sr-only">Remarks</dt>
                <dd className="text-slate-400 text-justify">{firstStation.remarks}</dd>
              </div>
              <div className="flex-none w-full mt-2 font-normal">
                <dt className="text-sm font-medium leading-6 text-cyan-600">Available Water:</dt>
                <dd className="text-slate-700">
                  {filteredStation.map((station, stationIndex) => (
                    <li key={stationIndex}>
                      <p>
                        {station.water_type} - Php {station.water_type_price}
                      </p>
                    </li>
                  ))}

                </dd>
              </div>
            </dl>
          </div>
    </article>
        {/* <div>
          <h2>
            <b>Water Station Name: {firstStation.station_name}</b>
          </h2>
          <p>Address: {firstStation.address}</p>
          <p>Barangay: {firstStation.barangay}</p>
          <p>Landmark: {firstStation.landmark}</p>
          <p>Delivery Mode: {firstStation.delivery_mode}</p>
          <p>Contact: {firstStation.contact_no}</p>
          {firstStation.tel_no && <p>Tel No: {firstStation.tel_no}</p>}
          <p>Water Available:</p>
          <ul>
            {filteredStation.map((station, stationIndex) => (
              <li key={stationIndex}>
                <p>
                  {station.water_type} - Php {station.water_type_price}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href={{
              pathname: `/Orders`,
              query: { id: firstStation.user_id },
            }}
          >
            <Button>Order</Button>
          </Link>
        </div> */}
      </ul>    
    </>
  );
};

export default FilteredStation;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

