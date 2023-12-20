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
      <div key={firstStation.user_id}>
        <div>
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
        </div>
        <p>CardStats Sample</p>
      </div>    
    </>
  );
};

export default FilteredStation;
