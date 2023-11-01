'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";

type WaterStationType  = {
    id: string;
    station_name: string;
    address: string;
    barangay: string;
    remarks: string | null;
    contact_no: number | null;
    tel_no: number | null;
    delivery_mode: string;
    landmark: string | null;
    user_id: string;
    created_at: string;
  };

const EditWaterStationInformation: React.FC<{ id: number }> = ({ id }) => {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [station, setStation] = useState<WaterStationType[] | null>(null);

//   const {data: station} = await supabase.from("water_refilling_station").select().eq('id', id)


  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('water_refilling_station')
        .select()
        .eq('id', id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setStation(data)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getProfile()
  },[getProfile])

  return (
    <div>
      {loading ? 'Loading...' : 'Not loading anymore'}
        {station?.map((station) => (
            <ul key={station.id}>
                <li>{station.station_name}</li>
                <li>{station.address + " " + station.barangay}</li>
            </ul>
        ))}
    </div>
  );
}

export default EditWaterStationInformation;
