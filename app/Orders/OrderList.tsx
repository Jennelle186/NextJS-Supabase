'use client'
import { OrderListProps } from "@/app/lib/definitions";
import SubmitButton from "@/components/Reusables/SubmitButton";

const OrderList: React.FC<OrderListProps> = ({ orders }) => {

  const handleClick = (order_id: string) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    console.log('clicked', order_id);
    // Additional logic related to the button click
  };


  return (
    <div>
      <h1>Pending Order List</h1>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
         <p>Created At:{new Date(order.created_at).toDateString()}</p>
          <p>
            Customer: {order.customers.firstName} {order.customers.lastName}
          </p>
          <p>Address: {order.customers.address}</p>
          <ul>
            {order.order_items.map((item, index) => (
              <li key={index}>
                Quantity: {item.quantity}, Water Type: {item.water_type.name}
              </li>
            ))}
          </ul>
          {/* <SubmitButton customProp="special" pending={false} onClick={handleClick(order.order_id)}>
              On-Delivery
          </SubmitButton>
          */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
