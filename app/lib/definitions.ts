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

  //view where water station and water type are grouped by user_id
  export type UserWaterStationView = {
    user_id: string;
    station_name: string;
    address: string;
    barangay: string;
    remarks: string;
    contact_no: number;
    tel_no: number | null;
    delivery_mode: string;
    landmark: string;
    water_type: string; //used when separate columns
    water_type_price: number; //used when separate columns
    // water_types_with_prices: { name: string; price: number }[]; //if JSON oject with name and price
  };
  