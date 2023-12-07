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
  
  //cartItemType
  export type CartItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    user_id: string; //user_id of the water-refilling-station
    total: number;
  };

//to be used on the ViewOrderByWaterStations component
  export interface Order {
    order_id: string;
    created_at: Date;
    delivery_mode: string;
    customers: {
      firstName: string;
      lastName: string;
      address: string;
    };
    order_items: {
      quantity: number;
      water_type: {
        name: string;
      };
    }[];
  }


export interface OrderListProps {
  orders: Order[];
}

export interface HomeProps {
  orders: Order[];
}

//types in ViewAllWaterStation
export type UserWaterStationViewProps = {
  data: UserWaterStationView[]; // Assuming data is an array of WaterStationType objects
};

export type GroupedData = {
  [userStationKey: string]: UserWaterStationView[];
};

//email templates
// Define a type for the item in the cart
export type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

// Define a type for the invoice email data
export type InvoiceEmailData = {
  firstName: string|null;
  lastName: string | null;
  address: string;
  water_station_name: string;
  contact_no: string;
  delivery_mode: string
  order_id: string;
  cart: CartItem[];
  total: number;
  remarks: string | null;
};