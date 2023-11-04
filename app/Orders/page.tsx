import MyInput from "@/components/Reusables/MyInput";
import OrderComponent from "./OrderComponent";

interface OrdersProps {
    searchParams: {
      id: string;
    };
  }
  
  export default function Orders({ searchParams }: OrdersProps) {
    console.log(searchParams.id, "station id here from the orders page")

    return  <OrderComponent/>
  }