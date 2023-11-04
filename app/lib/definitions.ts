export type WaterType = {
    name: string;
    price: number;
    id: string;
}

//type used when retrieving the water station data
export type WaterStationType  = {
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

  //types used when creating the water station
  export type WaterStationFormData = {
    name: string;
    buildingNumber: string;
    street: string;
    zone: string;
    landmark: string;
    barangay: string;
    delivery_mode: string;
    contact_no: number | null;
    tel_no: number | null;
    remarks: string | null;
  }

  //types used when submitting the order form
  export type orderFormData = {
    created_at : string;
    first_name: string;
    last_name: string;
    address: string;
    contact_no: number;
    remarks: string;
    water_station_id: string;
  }